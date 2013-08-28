# grunt-xmlpoke

> Updates values in XML files based on XPath queries.  Similar to the `xmlpoke` task in NAnt.

## Getting Started
This plugin requires Grunt `~0.4.1`

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
    options: {
      xpath: '//title',
      value: 'The Good Parts'
    },
    files: {
      'dest.xml': 'src.xml'
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
Type: `String`
Default value: `''`

A string value to which the value of any matched node is set.

#### options.replacements
Type: `Array`
Default value: `undefined`

An array of replacement options (i.e. objects with `xpath` and `value` properties)

### Usage Examples

#### Basic Usage
In this example, the text content of an element is set to a static value. So if the `testing.xml` file has the content `<abc></abd>`, the generated result would be `<abc>123</abc>`.

```js
grunt.initConfig({
  xmlpoke: {
    options: {
      xpath: '/abc',
      value: '123'
    },
    files: {
      'dest/basic_usage.xml': 'src/testing.xml',
    },
  },
})
```

#### Attribute Example
In this example, the value of an attribute is cleared. So if the `testing.xml` file has the content `<x y="999" />`, the generated result in this case would be `<x y="" />`.

```js
grunt.initConfig({
  xmlpoke: {
    options: {
      xpath: '/x/@y',
      value: ''
    },
    files: {
      'dest/attribute_example.xml': 'src/testing.xml',
    },
  },
})
```

#### Multiple Replacements
In this example, multiple replacements take place at once. So if the `testing.xml` file has the content `<x y="999" />`, the generated result in this case would be `<x y="111">M</x>`.

```js
grunt.initConfig({
  xmlpoke: {
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
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 - 0.1.0 &mdash; Initial release
