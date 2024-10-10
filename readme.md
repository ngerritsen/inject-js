# inject.js

_A lightweight dependency injector for Javascript._

Inject.js weighs just ~2kb minified and has no dependencies!

[Jump to Api Reference](#api-reference)

## Guide

- [Installation](#installation)
- [Registering dependencies](#registering-dependencies)
- [Resolving dependencies](#resolving-dependencies)
- [Lazy resolving](#lazy-resolving)
- [Resetting](#resetting)
- [Mocking (Unit testing)](#mocking)

### Installation

```bash
npm install inject.js
```

#### Usage as a module

```js
var injector = require("inject.js");
```

#### Usage directly in browser

To use directly in the browser, you can use the packaged version. This will make the injector globally available.

_Do not use this version in nodejs or when you bundle your application!_

```html
<script src="node_modules/inject.js/dist/inject.min.js"></script>

<!-- For debugging or testing -->
<script src="node_modules/inject.js/dist/inject.js"></script>
```

[Back to top ↑](#guide)

### Registering dependencies

Register a dependency with `injector.register`. The name must be a valid string, the dependency itself can by _anything_. You cannot register the same name twice.

```js
var someDependency = require("./some-dependency");

injector.register("someDependency", { someMethod: "abc" });
```

_It's recommended to use valid variable names as a name. This is handy when resolving multiple dependencies._

[Back to top ↑](#guide)

### Resolving dependencies

Elsewhere import the injector and get the dependency with `injector.resolve(name)`

```js
var someDependency = injector.resolve("someDependency");
```

#### Resolving multiple dependencies

Providing an array to `injector.resolve` will return an object with the dependency names as keys and dependencies as values.

```js
var dependencies = injector.resolve(["someDependency", "otherDependency"]);

// Accessing dependencies:
dependencies.someDependency;
dependencies.otherDependency;

// Using ES6
const { someDependency, otherDependency } = injector.resolve([
  "someDependency",
  "otherDependency",
]);
```

[Back to top ↑](#guide)

### Lazy resolving

Lazy resolving is useful when you are in an environment (like the browser) where scripts might be loaded async. Could also let your app be more flexible about the load order of scripts. You provide the dependencies you need to wait for and a callback that is called when all dependencies are resolved. The callback is called with the dependencies as arguments.

```js
injector.lazy(["depA", "depB"], runApp);

function runApp(depA, depB) {
  // Do your thing :)
}
```

[Back to top ↑](#guide)

### Resetting

Run `injector.reset()` to remove all dependencies.

```js
injector.reset();
```

[Back to top ↑](#guide)

### Mocking _(Only use for unit testing!)_

With `injector.mock(name, mockDependency)` you can mock a dependency for unit testing. It works the same as `injector.register`, only if a dependency already exists, `injector.mock` will override it.

_If process.env.NODE_ENV is set to production or in the minified packaged version, mock will not be available. This is to prevent it's usage outside of unit testing_

```js
injector.mock("someDependency", { test: "test" });
```

[Back to top ↑](#guide)

## Api reference

### `injector.register(name: String, dependency: Any)`

### `injector.resolve(name(s): String|Array) => dependency: Any|Object`

### `injector.lazy(dependencies: Array, callback: Function)`

### `injector.reset()`

### `injector.mock(name: String, mockDependency: Any)`

[Back to top ↑](#guide)
