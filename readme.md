[![Build Status](https://travis-ci.org/ngerritsen/inject.js.svg?branch=master)](https://travis-ci.org/ngerritsen/inject.js)

# inject.js

A lightweight dependency injector for Javascript

## Guide

```bash
npm install inject.js
```

**Registering dependencies**

Register a dependency with `injector.register`. The name must be a valid string, the dependency itself can by *anything*. You cannot register the same name twice.

```js
var injector = require('inject.js')
var someDependency = require('./some-dependency')

injector.register('someDependency', someDependency)
```

*It's recommended to use valid variable names as a name. This is handy when resolving multiple dependencies.*

**Resolving dependencies**

Elsewhere import the injector and get the dependency with `injector.resolve(name)`

```js
var injector = require('inject.js')

var someDependency = injector.resolve('someDependency')
```

**Resolving multiple dependencies**

Providing an array to `injector.resolve` will return an object with the dependency names as keys and dependencies as values.

```js
var injector = require('inject.js')

var dependencies = injector.resolve([ 'someDependency', 'otherDependency' ])
/**
dependencies = {
  someDependency: someDependency,
  otherDependency: otherDependency
}
**/

// Using ES6

const { someDependency, otherDependency } = injector.resolve([
  'someDependency',
  'otherDependency'
])
```

**Resetting**

Run `injector.reset()` to remove all dependencies.

```js
var injector = require('inject.js')

injector.reset()
```

**Mocking** *(Only use for unit testing!)*

With `injector.mock(name, mockDependency)` you can mock a dependency for unit testing. It works almost the same as `injector.register`. If a dependency already exists, `injector.mock` will override it.

*If process.env.NODE_ENV is set to production, mock will not be available by design.*

```js
//my unit test

var injector = require('inject.js')

injector.mock('someDependency', { test: 'test' })
```

## Api reference

### `injector.register(name: String, dependency: Any)`
### `injector.resolve(name(s): String|Array) => dependency: Any|Object`
### `injector.reset()`
### `injector.mock(name: String, mockDependency: Any)`
