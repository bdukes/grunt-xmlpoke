/*
 * grunt-xmlpoke
 * https://github.com/bdukes/grunt-xmlpoke
 *
 * Copyright (c) 2013 Brian Dukes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var xmldom = require('xmldom'),
        xpath = require('xpath'),
        ATTRIBUTE_NODE = 2;

    grunt.registerMultiTask('xmlpoke', 'Updates values in XML files based on XPath queries', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options();

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            if (f.src.length > 1) {
                grunt.log.warn('Only a single src per dest is supported');
                return false;
            }
            
            var src = f.src.filter(function (filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                }).map(function (filepath) {
                    // Read file source.
                    return grunt.file.read(filepath);
                })[0],
                domParser = new xmldom.DOMParser(),
                doc = domParser.parseFromString(src),
                xmlSerializer = new xmldom.XMLSerializer(),
                replacements = options.replacements || [options];
            
            replacements.forEach(function (replacement) {
                var queries = typeof replacement.xpath === 'string' ? [replacement.xpath] : replacement.xpath;
                queries.forEach(function (query) {
                    grunt.verbose.writeln('setting value of "' + query + '" to "' + replacement.value + '"');
                    var nodes = xpath.select(query, doc);
                    nodes.forEach(function (node) {
                        if (node.nodeType === ATTRIBUTE_NODE) {
                            node.value = replacement.value;
                        } else {
                            node.textContent = replacement.value;
                        }
                    });
                });
            });

            // Write the destination file.
            grunt.file.write(f.dest, xmlSerializer.serializeToString(doc));

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });
};