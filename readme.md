[![Build Status](https://travis-ci.org/ngerritsen/inject.js.svg?branch=master)](https://travis-ci.org/ngerritsen/inject.js)

# inject.js

A lightweight dependency injector for Javascript

## Guide

```bash
npm install inject.js
```

Registering dependencies:

```js
var injector = require('inject.js')
var someDependency = require('./some-dependency')

injector.register('someDependency', someDependency)
```

Resolving dependencies elsewhere:

```js
var injector = require('inject.js')

var someDependency = injector.resolve('someDependency')
```

Resolving multiple dependencies:

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

Resetting:

```js
var injector = require('inject.js')

injector.reset()

// Dependencies are now gone
```

## Api reference

### `injector.register(name: String, dependency: Any)`
### `injector.resolve(name(s): String|Array) => dependency: Any|Object`
### `injector.reset()`

#### Unit testing:

### `injector.mock(name: String, mockDependency: Any)`
