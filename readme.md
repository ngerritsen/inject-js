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

Resetting:

```js
var injector = require('inject.js')

injector.reset()

// Dependencies are now gone
```

## Api reference

### `injector.register(name: String, dependency: Any)`
### `injector.resolve(name: String) => dependency: Any`
### `injector.reset()`
