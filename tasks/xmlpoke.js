/*
 * grunt-xmlpoke
 * https://github.com/bdukes/grunt-xmlpoke
 *
 * Copyright (c) 2014 Brian Dukes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var xmldom = require('xmldom'),
        xpath = require('xpath'),
        _ = require('lodash'),
        ATTRIBUTE_NODE = 2;

    function importNode(destinationDoc, node) {
        var importedNode = destinationDoc.importNode(node);
        _(node.childNodes).map(function (child) { return importNode(destinationDoc, child); })
                          .each(function (importedChild) { importedNode.appendChild(importedChild); });
        return importedNode;
    }

    function appendXml(node, xml, options) {
        var destinationDoc = node.ownerDocument;

        var namespaceAttributes = '';
        if (options.namespaces) {
            namespaceAttributes =
                _(options.namespaces)
                    .toPairs()
                    .map(function (pair) {
                        var prefix = pair[0];
                        var namespace = pair[1];
                        return ' xmlns:' + prefix + '="' + namespace + '"';
                    })
                    .join('');
        }

        var tempDocXml = '<tempDoc' + namespaceAttributes + '>' + xml + '</tempDoc>';
        var domParser = new xmldom.DOMParser();
        var tempDoc = domParser.parseFromString(tempDocXml, 'text/xml');

        _(tempDoc.documentElement.childNodes).each(function (tempNode) {
            node.appendChild(importNode(destinationDoc, tempNode));
        });
    }

    grunt.registerMultiTask('xmlpoke', 'Updates values in XML files based on XPath queries', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options();

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            if (f.src.length > 1) {
                grunt.log.warn('Only a single src per dest is supported');
                return false;
            } else if (f.src.length === 0) {
                grunt.log.warn('No src found for ' + f.dest);
                return false;
            }

            var filepath = f.src[0];
            if (!grunt.file.exists(filepath)) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
                return false;
            }

            var src = grunt.file.read(filepath);
            var domParser = new xmldom.DOMParser({
                errorHandler: {
                    warning: function handleWarning(message) {
                        grunt.log.error('Warning while parsing XML document: ');
                        grunt.log.error(message);
                    },
                    error: function handleError(message) {
                        grunt.log.error('Error while parsing XML document: ');
                        grunt.fail.warn(message);
                    },
                    fatalError: function handleFatalError(message) {
                        grunt.log.error('Fatal error while parsing XML document: ');
                        grunt.fail.fatal(message);
                    },
                },
            });
            var doc = domParser.parseFromString(src, 'text/xml');
            var xmlSerializer = new xmldom.XMLSerializer();
            var replacements = options.replacements || [options];
            var failIfMissingOption = options.failIfMissing;

            replacements.forEach(function (replacement) {
                var queries = typeof replacement.xpath === 'string' ? [replacement.xpath] : replacement.xpath,
                    getValue = _.isFunction(replacement.value) ? replacement.value : function () { return replacement.value || ''; },
                    valueType = typeof replacement.valueType === 'string' ? replacement.valueType : 'text',
                    failIfMissing = replacement.failIfMissing || (failIfMissingOption && replacement.failIfMissing !== false);
                queries.forEach(function (query) {
                    var select = options.namespaces ? xpath.useNamespaces(options.namespaces) : xpath.select;
                    var nodes = select(query, doc);
                    if (failIfMissing && nodes.length === 0) {
                        grunt.fail.warn('No node matched the XPath expression ' + query.cyan);
                    }

                    nodes.forEach(function (node) {
                        var value = getValue(node);
                        grunt.verbose.writeln('setting value of "' + query + '" to "' + value + '"');
                        if (valueType === 'element') {
                            node.textContent = '';
                            while (node.firstChild) {
                                node.removeChild(node.firstChild);
                            }

                            appendXml(node, value, options);
                        }
                        else if (valueType === 'append') {
                            appendXml(node, value, options);
                        }
                        else if (valueType === 'remove') {
                            var parentNode = node.parentNode;
                            parentNode.removeChild(node);
                        }
                        else if (node.nodeType === ATTRIBUTE_NODE) {
                            node.value = value;
                        } else {
                            node.textContent = value;
                        }
                    });
                });
            });

            // Write the destination file.
            grunt.file.write(f.dest, xmlSerializer.serializeToString(doc));

            // Print a success message.
            grunt.log.writeln('File ' + f.dest.cyan + ' created.');
        });
    });
};
