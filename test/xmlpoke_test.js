'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.xmlpoke = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    testing_attribute: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/testing_attribute.xml'),
            expected = grunt.file.read('test/expected/testing_attribute.xml');
        test.equal(actual, expected, 'should change attribute value.');

        test.done();
    },
    testing_element_text: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/testing_element_text.xml'),
            expected = grunt.file.read('test/expected/testing_element_text.xml');
        test.equal(actual, expected, 'should change element text.');

        test.done();
    },
    testing_element_encoded_text: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/testing_element_encoded_text.xml'),
            expected = grunt.file.read('test/expected/testing_element_encoded_text.xml');
        test.equal(actual, expected, 'should change element text with encoded XML.');

        test.done();
    },
    testing_element: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/testing_element.xml'),
            expected = grunt.file.read('test/expected/testing_element.xml');
        test.equal(actual, expected, 'should replace element text with new XML nodes.');

        test.done();
    },
    testing_element_append: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/testing_element_append.xml'),
            expected = grunt.file.read('test/expected/testing_element_append.xml');
        test.equal(actual, expected, 'should append new XML node without affected existing child nodes.');

        test.done();
    },
    testing_element_without : function(test){
        test.expect(1);

        var actual = grunt.file.read('tmp/element_without.xml'),
            expected = grunt.file.read('test/expected/testing_element_without.xml');
        test.equal(actual, expected, 'should remove xml element');

        test.done();
    },
    numbers_elements: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/numbers_elements.xml'),
            expected = grunt.file.read('test/expected/numbers_elements.xml');
        test.equal(actual, expected, 'should change elements\' values.');

        test.done();
    },
    numbers_no_match: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/numbers_no_match.xml'),
            expected = grunt.file.read('test/expected/numbers_no_match.xml');
        test.equal(actual, expected, 'should not change anything.');

        test.done();
    },
    default_value_is_empty: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/default_value_is_empty.xml'),
            expected = grunt.file.read('test/expected/default_value_is_empty.xml');
        test.equal(actual, expected, 'should have empty attribute.');

        test.done();
    },
    multiple_xpath_queries: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/multiple_xpath_queries.xml'),
            expected = grunt.file.read('test/expected/multiple_xpath_queries.xml');
        test.equal(actual, expected, 'should update both text and attribute values to "111".');

        test.done();
    },
    multiple_replacements: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/multiple_replacements.xml'),
            expected = grunt.file.read('test/expected/multiple_replacements.xml');
        test.equal(actual, expected, 'should update text and attribute values.');

        test.done();
    },
    value_as_function : function(test){
        test.expect(1);

        var actual = grunt.file.read('tmp/value_as_function.xml'),
            expected = grunt.file.read('test/expected/value_as_function.xml');
        test.equal(actual, expected, 'should use a function return value.');

        test.done();
    },
    value_as_function_with_callback : function(test){
        test.expect(1);

        var actual = grunt.file.read('tmp/value_as_function_with_callback.xml'),
            expected = grunt.file.read('test/expected/value_as_function_with_callback.xml');
        test.equal(actual, expected, 'should use a function return value.');

        test.done();
    },
    value_as_raw_xml : function(test){
        test.expect(1);

        var actual = grunt.file.read('tmp/value_as_raw_xml.xml'),
            expected = grunt.file.read('test/expected/value_as_raw_xml.xml');
        test.equal(actual, expected, 'should add xml child element values.');

        test.done();
    },
    namespaces : function(test){
        test.expect(1);

        var actual = grunt.file.read('tmp/namespaces.xml'),
            expected = grunt.file.read('test/expected/namespaces.xml');
        test.equal(actual, expected, 'should support namespace in xpath.');

        test.done();
    },
    default_namespace_attribute : function(test){
        test.expect(1);

        var actual = grunt.file.read('tmp/config.xml'),
            expected = grunt.file.read('test/expected/config.xml');
        test.equal(actual, expected, 'should support default namespace and attribute targeting in xpath.');

        test.done();
    },
    declaration : function(test){
        test.expect(1);

        var actual = grunt.file.read('tmp/declaration.xml'),
            expected = grunt.file.read('test/expected/declaration.xml');
        test.equal(actual, expected, 'should support declaration in XML document.');

        test.done();
    },
};