/*
 * grunt-xmlpoke
 * https://github.com/bdukes/grunt-xmlpoke
 *
 * Copyright (c) 2013 Brian Dukes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        xmlpoke: {
            testing_attribute: {
                options: {
                    xpath: '/data/@test-value',
                    value: 'UPDATE'
                },
                files: {
                    'tmp/testing_attribute.xml': 'test/fixtures/testing.xml'
                }
            },
            testing_element: {
                options: {
                    xpath: '/data',
                    value: 'UPDATED information'
                },
                files: {
                    'tmp/testing_element.xml': 'test/fixtures/testing.xml'
                }
            },
            numbers_elements: {
                options: {
                    xpath: '//Number',
                    value: '90'
                },
                files: {
                    'tmp/numbers_elements.xml': 'test/fixtures/numbers.xml'
                }
            },
            numbers_no_match: {
                options: {
                    xpath: '//Numbering',
                    value: '999'
                },
                files: {
                    'tmp/numbers_no_match.xml': 'test/fixtures/numbers.xml'
                }
            },
            multiple_xpath_queries: {
                options: {
                    xpath: ['/x/@y','/x'],
                    value: '111'
                },
                files: {
                    'tmp/multiple_xpath_queries.xml': 'test/fixtures/simple.xml'
                }
            },
            multiple_replacements: {
                options: {
                    replacements: [{
                        xpath: '/x/@y',
                        value: '111'
                    }, {
                        xpath: '/x',
                        value: 'M'
                    }]
                },
                files: {
                    'tmp/multiple_replacements.xml': 'test/fixtures/simple.xml'
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'xmlpoke', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};