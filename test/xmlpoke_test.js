"use strict";

var grunt = require("grunt");
var difftool = require("diff-js-xml");

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

function assertXmlDocumentsAreEqual(test, actualPath, expectedPath, message) {
  test.expect(1);

  var actualXml = grunt.file.read(actualPath);
  var expectedXml = grunt.file.read(expectedPath);
  difftool.diffAsXml(actualXml, expectedXml, {}, {}, function (result) {
    test.deepEqual(result, [], message);
    test.done();
  });
}

exports.xmlpoke = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  testing_attribute: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/testing_attribute.xml",
      "test/expected/testing_attribute.xml",
      "should change attribute value."
    );
  },
  testing_element_text: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/testing_element_text.xml",
      "test/expected/testing_element_text.xml",
      "should change element text."
    );
  },
  testing_element_encoded_text: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/testing_element_encoded_text.xml",
      "test/expected/testing_element_encoded_text.xml",
      "should change element text with encoded XML."
    );
  },
  testing_element: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/testing_element.xml",
      "test/expected/testing_element.xml",
      "should replace element text with new XML nodes."
    );
  },
  testing_element_append: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/testing_element_append.xml",
      "test/expected/testing_element_append.xml",
      "should append new XML node without affected existing child nodes."
    );
  },
  testing_element_without: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/element_without.xml",
      "test/expected/testing_element_without.xml",
      "should remove xml element"
    );
  },
  numbers_elements: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/numbers_elements.xml",
      "test/expected/numbers_elements.xml",
      "should change elements' values."
    );
  },
  numbers_no_match: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/numbers_no_match.xml",
      "test/expected/numbers_no_match.xml",
      "should not change anything."
    );
  },
  default_value_is_empty: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/default_value_is_empty.xml",
      "test/expected/default_value_is_empty.xml",
      "should have empty attribute."
    );
  },
  multiple_xpath_queries: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/multiple_xpath_queries.xml",
      "test/expected/multiple_xpath_queries.xml",
      'should update both text and attribute values to "111".'
    );
  },
  multiple_replacements: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/multiple_replacements.xml",
      "test/expected/multiple_replacements.xml",
      "should update text and attribute values."
    );
  },
  value_as_function: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/value_as_function.xml",
      "test/expected/value_as_function.xml",
      "should use a function return value."
    );
  },
  value_as_function_with_callback: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/value_as_function_with_callback.xml",
      "test/expected/value_as_function_with_callback.xml",
      "should use a function return value."
    );
  },
  value_as_raw_xml: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/value_as_raw_xml.xml",
      "test/expected/value_as_raw_xml.xml",
      "should add xml child element values."
    );
  },
  namespaces: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/namespaces.xml",
      "test/expected/namespaces.xml",
      "should support namespace in xpath."
    );
  },
  default_namespace_attribute: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/config.xml",
      "test/expected/config.xml",
      "should support default namespace and attribute targeting in xpath."
    );
  },
  declaration: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/declaration.xml",
      "test/expected/declaration.xml",
      "should support declaration in XML document."
    );
  },
  append_to_sap: function (test) {
    assertXmlDocumentsAreEqual(
      test,
      "tmp/append_to_sap.xml",
      "test/expected/append_to_sap.xml",
      "should append without additional xmlns."
    );
  },
};
