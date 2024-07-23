# grunt-xmlpoke

> Updates values in XML files based on XPath queries. Similar to the `xmlpoke` task in NAnt.

[![npm version](https://badge.fury.io/js/grunt-xmlpoke.svg)](https://badge.fury.io/js/grunt-xmlpoke) [![Build Status](https://travis-ci.org/bdukes/grunt-xmlpoke.svg?branch=master)](https://travis-ci.org/bdukes/grunt-xmlpoke)

## Getting Started

This plugin requires Grunt `>=0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-xmlpoke --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-xmlpoke");
```

## The "xmlpoke" task

### Overview

In your project's Gruntfile, add a section named `xmlpoke` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  xmlpoke: {
    updateTitle: {
      options: {
        xpath: "//title",
        value: "The Good Parts",
      },
      files: {
        "dest.xml": "src.xml",
      },
    },
  },
});
```

### Options

#### options.xpath

Type: `String`
Default value: `''`

An xpath query to select one or more nodes in the source document.

#### options.value

Type: `String` or `Function`
Default value: `''`

A string value to which the value of any matched node is set.

You can also supply a function that returns the replacement value. The first
argument supplied to the function will be the node on which the replacement is
being made.

#### options.namespaces

Type: `object`
Default value: `{}`

An object mapping between XML namespace prefixes and names (URIs).
For example, `{ 'em': 'http://example.org/XML/em' }`

#### options.valueType

Type: `String`
Default value: `'text'`

The text content of the node(s) will be set using **options.value**.

Setting to `'element'` will replace the value of the node(s) with raw xml element(s) as defined in **options.value**.
Setting to `'append'` will append the raw xml element(s) as defined in **options.value** to the end of the selected node(s).
Setting to `'remove'` will remove the node(s) from the xml (**options.value** is ignored).

#### options.replacements

Type: `Array`
Default value: `undefined`

An array of replacement options (i.e. objects with `xpath` and `value` properties)

### Usage Examples

#### Basic Usage

In this example, the text content of an element is set to a static value. So if the `testing.xml` file has the content `<abc></abd>`, the generated result would be `<abc>123</abc>`.

```js
grunt.initConfig({
  setTheNumber: {
    xmlpoke: {
      options: {
        xpath: "/abc",
        value: "123",
      },
      files: {
        "dest/basic_usage.xml": "src/testing.xml",
      },
    },
  },
});
```

#### Attribute Example

In this example, the value of an attribute is cleared. So if the `testing.xml` file has the content `<x y="999" />`, the generated result in this case would be `<x y="" />`.

```js
grunt.initConfig({
  xmlpoke: {
    updateAnAttribute: {
      options: {
        xpath: "/x/@y",
        value: "",
      },
      files: {
        "dest/attribute_example.xml": "src/testing.xml",
      },
    },
  },
});
```

#### Element Example

In this example, an element is set as the child of an other element. So if the `testing.xml` file has the content `<x><y /></x>`, the generated result in this case would be `<x><z /></x>`.

```js
grunt.initConfig({
  xmlpoke: {
    updateAnAttribute: {
      options: {
        xpath: "/x",
        value: "<z />",
        valueType: "element",
      },
      files: {
        "dest/element_example.xml": "src/testing.xml",
      },
    },
  },
});
```

#### Append Example

In this example, an element is added to another element. So if the `testing.xml` file has the content `<x><y /></x>`, the generated result in this case would be `<x><y /><z /></x>`.

```js
grunt.initConfig({
  xmlpoke: {
    updateAnAttribute: {
      options: {
        xpath: "/x",
        value: "<z />",
        valueType: "append",
      },
      files: {
        "dest/append_example.xml": "src/testing.xml",
      },
    },
  },
});
```

#### Function Example

In this example, the value of an attribute is modified. So if the `testing.xml` file has the content `<x y="abc" />`, the generated result in this case would be `<x y="ABC" />`.

```js
grunt.initConfig({
  xmlpoke: {
    upperCaseTheY: {
      options: {
        xpath: "/x/@y",
        value: function (node) {
          return node.value.toUpperCase();
        },
      },
      files: {
        "dest/function_example.xml": "src/testing.xml",
      },
    },
  },
});
```

#### Multiple XPath Queries

In this example, the same value is put intp multiple locations. So if the `testing.xml` file has the content `<x y="999" />`, the generated result in this case would be `<x y="111">111</x>`.

```js
grunt.initConfig({
  xmlpoke: {
    updateAllTheThings: {
      options: {
        xpath: ["/x/@y", "/x"],
        value: "111",
      },
      files: {
        "dest/multiple_xpath_queries.xml": "src/testing.xml",
      },
    },
  },
});
```

#### Multiple Replacements

In this example, multiple replacements take place at once. So if the `testing.xml` file has the content `<x y="999" />`, the generated result in this case would be `<x y="111">M</x>`.

```js
grunt.initConfig({
  xmlpoke: {
    updateACoupleOfThings: {
      options: {
        replacements: [
          {
            xpath: "/x/@y",
            value: "111",
          },
          {
            xpath: "/x",
            value: "M",
          },
        ],
      },
      files: {
        "dest/multiple_replacements.xml": "src/testing.xml",
      },
    },
  },
});
```

#### XML Namespace Example

In this example, the XML file contains namespaces (i.e. `xmlns` attributes). For example, an Apache Cordova `config.xml` file might look like this:

```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="io.cordova.hellocordova" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>HelloCordova</name>
    <description>A sample Apache Cordova application that responds to the deviceready event.</description>
    <author email="dev@cordova.apache.org" href="http://cordova.io">Apache Cordova Team</author>
    <content src="index.html" />
    <plugin name="cordova-plugin-whitelist" spec="1" />
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />
    <platform name="android">
        <allow-intent href="market:*" />
    </platform>
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
    </platform>
    <cdv:custom-cordova-thing>old value</cdv:custom-cordova-thing>
</widget>
```

The `xmlns:cdv` attribute defines the namespace for the `cdv` prefix, but the `xmlns` attribute without a suffix defines
the _default_ namespace for that element and its descendants. Therefore, when targeting the `<widget>` element, your
XPath expression will need to reference that namespace. Note, however, that the namespace does not affect attributes,
only elements. In the example we define the unused `cdv` prefix for completeness, but it's not used in the XPath
expression, so it's not required to be defined. Also, while it's simplest to keep the prefixes the same, it's not
required for the prefix used in your XPath expression to match the prefix defined in the document (e.g. your XML may
have an `xmlns:cdv` attribute, and your Grunt config could reference that same namespace URL with the prefix `'c'`).

```js
grunt.initConfig({
  xmlpoke: {
    widget: {
      options: {
        namespaces: {
          w: "http://www.w3.org/ns/widgets",
          cdv: "http://cordova.apache.org/ns/1.0",
        },
        replacements: [
          {
            xpath: "/w:widget/@version",
            value: "0.2.1",
          },
          {
            xpath: "/w:widget/w:author",
            value: "Someone Else",
          },
          {
            xpath: "/w:widget/w:author/@email",
            value: "someone.else@example.com",
          },
          {
            xpath: "/w:widget/cdv:custom-cordova-thing",
            value: "new value",
          },
        ],
      },
      files: {
        "dest/config.xml": "src/config.xml",
      },
    },
  },
});
```

#### Fail On Missing XPath

By default, if the provided XPath expression doesn't match any nodes, the task will silently continue.
You can override this behavior by specifying `failIfMissing` in the `options` (either at the top level of the task, or in a sub-task),
or within a single replacement.

```js
grunt.initConfig({
  xmlpoke: {
    options: {
      failIfMissing: true,
    },
    updateACoupleOfThings: {
      options: {
        replacements: [
          {
            xpath: "/x/@y",
            value: "111",
            failIfMissing: false,
          },
          {
            xpath: "/x",
            value: "M",
          },
        ],
      },
      files: {
        "dest/element_required_attribute_optional.xml": "src/testing.xml",
      },
    },
  },
});
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- 0.1.0 &mdash; Initial release
- 0.2.0 &mdash; Multiple replacements at once
- 0.2.1 &mdash; Color filename when logged
- 0.3.0 &mdash; Allow specifying replacement value as a function (Thanks [@dimasty](https://github.com/dimasty)!)
- 0.4.0 &mdash; Allow specifying namespaces (Thanks [@j1mmie](https://github.com/j1mmie)!)
- 0.5.0 &mdash; Allow replacing with XML elements, not just text (Thanks [@kraihn](https://github.com/kraihn)!)
- 0.6.0 &mdash; Allow removing XML elements (Thanks [@mradcliffe](https://github.com/mradcliffe)!)
- 0.7.0 &mdash; Allow appending XML elements (Thanks [@njtman](https://github.com/njtman)!)
- 0.8.0 &mdash; Add option to fail if XPath expression doesn't match any nodes (Thanks [@omatrycy](https://github.com/omatrycy)!)
- 0.8.1 &mdash; Fix broken dependency (Thanks [@hbogs](https://github.com/hbogs)!)
- 0.8.2 &mdash; Update dependencies (Thanks [@greenkeeperio](https://github.com/greenkeeperio)!)
- 0.8.3 &mdash; Update dependencies (Thanks [@greenkeeperio](https://github.com/greenkeeperio)!)
- 0.9.0 &mdash; Support appending XML with namespaces (Thanks [@sebbi08](https://github.com/sebbi08)!)
- 0.10.0 &mdash; Better error messages (Thanks [@sebbi08](https://github.com/sebbi08)!)
- 1.0.0 &mdash; Bump dependencies
