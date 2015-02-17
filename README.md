# grunt-xmlpoke

> Updates values in XML files based on XPath queries.  Similar to the `xmlpoke` task in NAnt.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-xmlpoke --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-xmlpoke');
```

## The "xmlpoke" task

### Overview
In your project's Gruntfile, add a section named `xmlpoke` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  xmlpoke: {
    updateTitle: {
      options: {
        xpath: '//title',
        value: 'The Good Parts'
      },
      files: {
        'dest.xml': 'src.xml'
      },
    },
  },
})
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

You can also supply a function that returns the replacement value.  The first
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
        xpath: '/abc',
        value: '123'
      },
      files: {
        'dest/basic_usage.xml': 'src/testing.xml',
      },
    },
  },
})
```

#### Attribute Example
In this example, the value of an attribute is cleared. So if the `testing.xml` file has the content `<x y="999" />`, the generated result in this case would be `<x y="" />`.

```js
grunt.initConfig({
  xmlpoke: {
    updateAnAttribute: {
      options: {
        xpath: '/x/@y',
        value: ''
      },
      files: {
        'dest/attribute_example.xml': 'src/testing.xml',
      },
    },
  },
})
```

#### Element Example
In this example, an element is set as the child of an other element. So if the `testing.xml` file has the content `<x><y /></x>`, the generated result in this case would be `<x><z /></x>`.

```js
grunt.initConfig({
  xmlpoke: {
    updateAnAttribute: {
      options: {
        xpath: '/x',
        value: '<z />',
        valueType: 'element'
      },
      files: {
        'dest/element_example.xml': 'src/testing.xml',
      },
    },
  },
})
```

#### Append Example
In this example, an element is added to another element. So if the `testing.xml` file has the content `<x><y /></x>`, the generated result in this case would be `<x><y /><z /></x>`.

```js
grunt.initConfig({
  xmlpoke: {
    updateAnAttribute: {
      options: {
        xpath: '/x',
        value: '<z />',
        valueType: 'append'
      },
      files: {
        'dest/append_example.xml': 'src/testing.xml',
      },
    },
  },
})
```

#### Function Example
In this example, the value of an attribute is modified. So if the `testing.xml` file has the content `<x y="abc" />`, the generated result in this case would be `<x y="ABC" />`.

```js
grunt.initConfig({
  xmlpoke: {
    upperCaseTheY: {
      options: {
        xpath: '/x/@y',
        value: function (node) { return node.value.toUpperCase(); }
      },
      files: {
        'dest/function_example.xml': 'src/testing.xml',
      },
    },
  },
})
```

#### Multiple XPath Queries
In this example, the same value is put intp multiple locations. So if the `testing.xml` file has the content `<x y="999" />`, the generated result in this case would be `<x y="111">111</x>`.

```js
grunt.initConfig({
  xmlpoke: {
    updateAllTheThings: {
      options: {
        xpath: ['/x/@y','/x'],
        value: '111'
      },
      files: {
        'dest/multiple_xpath_queries.xml': 'src/testing.xml',
      },
    },
  },
})
```

#### Multiple Replacements
In this example, multiple replacements take place at once. So if the `testing.xml` file has the content `<x y="999" />`, the generated result in this case would be `<x y="111">M</x>`.

```js
grunt.initConfig({
  xmlpoke: {
    updateACoupleOfThings: {
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
        'dest/multiple_replacements.xml': 'src/testing.xml',
      },
    },
  },
})
```

#### Fail On Missing XPath
By default, if the providex XPath expression doesn't match any nodes, the task will silently continue.
You can override this behavior by specifying `failIfMissing` in the `options` (either at the top level of the task, or in a sub-task),
or within a single replacement.

```js
grunt.initConfig({
  xmlpoke: {
    options: {
      failIfMissing: true
    },
    updateACoupleOfThings: {
      options: {
        replacements: [{
          xpath: '/x/@y',
          value: '111',
          failIfMissing: false
        }, {
          xpath: '/x',
          value: 'M'
        }]
      },
      files: {
        'dest/element_required_attribute_optional.xml': 'src/testing.xml',
      },
    },
  },
})
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

