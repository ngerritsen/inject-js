[![Build Status](https://travis-ci.org/ngerritsen/inject.js.svg?branch=master)](https://travis-ci.org/ngerritsen/inject.js)

# inject.js

_A lightweight dependency injector for Javascript._

Inject.js weighs just 1kb minified and has no dependencies!

## Guide

```bash
npm install inject.js
```

**Usage as a module**

```js
var injector = require('inject.js')
```

**Usage directly in browser**

To use directly in the browser, you can use the packaged version. This will make the injector globally available.

_Do not use this version in nodejs or when you bundle your application!_

```html
<script src="node_modules/inject.js/dist/inject.min.js"></script>

<!-- For debugging or testing -->
<script src="node_modules/inject.js/dist/inject.js"></script>
```

**Registering dependencies**

Register a dependency with `injector.register`. The name must be a valid string, the dependency itself can by *anything*. You cannot register the same name twice.

```js
var someDependency = require('./some-dependency')

injector.register('someDependency', { someMethod: 'abc' })
```

*It's recommended to use valid variable names as a name. This is handy when resolving multiple dependencies.*

**Resolving dependencies**

Elsewhere import the injector and get the dependency with `injector.resolve(name)`

```js
var someDependency = injector.resolve('someDependency')
```

**Resolving multiple dependencies**

Providing an array to `injector.resolve` will return an object with the dependency names as keys and dependencies as values.

```js
var dependencies = injector.resolve([ 'someDependency', 'otherDependency' ])

// Accessing dependencies:
dependencies.someDependency
dependencies.otherDependency

// Using ES6
const { someDependency, otherDependency } = injector.resolve([
  'someDependency',
  'otherDependency'
])
```

**Resetting**

Run `injector.reset()` to remove all dependencies.

```js
injector.reset()
```

**Mocking** *(Only use for unit testing!)*

With `injector.mock(name, mockDependency)` you can mock a dependency for unit testing. It works the same as `injector.register`, only if a dependency already exists, `injector.mock` will override it.

*If process.env.NODE_ENV is set to production or in the minified packaged version, mock will not be available. This is to prevent it's usage outside of unit testing*

```js
injector.mock('someDependency', { test: 'test' })
```

## Api reference

### `injector.register(name: String, dependency: Any)`
### `injector.resolve(name(s): String|Array) => dependency: Any|Object`
### `injector.reset()`
### `injector.mock(name: String, mockDependency: Any)`
