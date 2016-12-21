/*
 * grunt-xmlpoke
 * https://github.com/bdukes/grunt-xmlpoke
 *
 * Copyright (c) 2014 Brian Dukes
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
            options : {
                failIfMissing: true
            },
            testing_attribute: {
                options: {
                    xpath: '/data/@test-value',
                    value: 'UPDATE'
                },
                files: {
                    'tmp/testing_attribute.xml': 'test/fixtures/testing.xml'
                }
            },
            testing_element_text: {
                options: {
                    xpath: '/data',
                    value: 'UPDATED information'
                },
                files: {
                    'tmp/testing_element_text.xml': 'test/fixtures/testing.xml'
                }
            },
            testing_element_encoded_text: {
                options: {
                    xpath: '/data',
                    value: '<child>UPDATED information</child>'
                },
                files: {
                    'tmp/testing_element_encoded_text.xml': 'test/fixtures/testing.xml'
                }
            },
            testing_element: {
                options: {
                    xpath: '/data',
                    value: '<child>UPDATED information</child>',
                    valueType: 'element'
                },
                files: {
                    'tmp/testing_element.xml': 'test/fixtures/testing.xml'
                }
            },
            testing_element_append: {
                options: {
                    replacements: [{
                        xpath: '/data',
                        value: '<child>UPDATED information</child>',
                        valueType: 'element'
                    }, {
                        xpath: '/data',
                        value: '<child>UPDATED information appended</child>',
                        valueType: 'append'
                    }]
                },
                files: {
                    'tmp/testing_element_append.xml': 'test/fixtures/testing.xml'
                }
            },
            testing_element_without: {
                options: {
                    xpath: '/data/without',
                    valueType: 'remove',
                },
                files: {
                    'tmp/element_without.xml': 'test/fixtures/children.xml'
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
                    value: '999',
                    failIfMissing: false
                },
                files: {
                    'tmp/numbers_no_match.xml': 'test/fixtures/numbers.xml'
                }
            },
            default_value_is_empty: {
                options: {
                    xpath: '/x/@y'
                },
                files: {
                    'tmp/default_value_is_empty.xml': 'test/fixtures/simple.xml'
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
            },
            value_as_function: {
                options: {
                    xpath: '/x/@y',
                    value: function(){
                        return 'value from a function';
                    }
                },
                files: {
                    'tmp/value_as_function.xml': 'test/fixtures/simple.xml'
                }
            },
            value_as_function_with_callback: {
                options: {
                    xpath: '/data/@test-value',
                    value: function(node){
                        return node.value.toUpperCase();
                    }
                },
                files: {
                    'tmp/value_as_function_with_callback.xml': 'test/fixtures/testing.xml'
                }
            },
            value_as_raw_xml: {
                options: {
                    namespaces: {
                        'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
                    },
                    xpath: '//rdf:Description',
                    valueType: 'element',
                    value: '\r\n<Number>1</Number><Number>2</Number><Number>3</Number>'
                },
                files: {
                    'tmp/value_as_raw_xml.xml': 'test/fixtures/namespaces.xml'
                }
            },
            namespaces: {
                dest: 'tmp/namespaces.xml',
                src: 'test/fixtures/namespaces.xml',
                options: {
                    namespaces: {
                        'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                        'em': 'http://www.mozilla.org/2004/em-rdf#'
                    },
                    xpath: '/rdf:RDF/rdf:Description/em:version',
                    value: '1.2.4'
                }
            },
            default_namespace_attribute: {
                dest: 'tmp/config.xml',
                src: 'test/fixtures/config.xml',
                options: {
                    namespaces: {
                        'w': 'http://www.w3.org/ns/widgets',
                        'cdv': 'http://cordova.apache.org/ns/1.0'
                    },
                    replacements: [{
                        xpath: '/w:widget/@version',
                        value: '0.2.1'
                    },{
                        xpath: '/w:widget/w:author',
                        value: 'Someone Else'
                    },{
                        xpath: '/w:widget/w:author/@email',
                        value: 'someone.else@example.com'
                    },{
                        xpath: '/w:widget/cdv:custom-cordova-thing',
                        value: 'new value'
                    }]
                }
            },
            declaration: {
                dest: 'tmp/declaration.xml',
                src: 'test/fixtures/declaration.xml',
                options: {
                    xpath: '/widget/title',
                    value: 'New Title'
                }
            },
            append_to_sap: {
                dest: 'tmp/append_to_sap.xml',
                src: 'test/fixtures/sap.xml',
                options: {
                    namespaces: {
                        'm': 'sap.m',
                        'l': 'sap.ui.layout',
                        'f': 'sap.ui.layout.form',
                        'core': 'sap.ui.core',
                    },
                    valueType: 'append',
                    xpath: '//m:Select[@id="mySelect"][core:Item]',
                    value: '<core:Item key="sov" text="Sovanta Theme"/>',
                },
            },
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
