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
        var options = this.options({
            xpath: '',
            value: ''
        });

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
                queries = typeof options.xpath === 'string' ? [options.xpath] : options.xpath;

            queries.forEach(function (query) {
                var nodes = xpath.select(query, doc);
                nodes.forEach(function (node) {
                    if (node.nodeType === ATTRIBUTE_NODE) {
                        node.value = options.value;
                    } else {
                        node.textContent = options.value;
                    }
                });
            });

            // Write the destination file.
            grunt.file.write(f.dest, xmlSerializer.serializeToString(doc));

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};