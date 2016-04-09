var factories = require('./factories')
var resolver = require('./resolver')
var notifier = require('./notifier')

var createDependency = factories.createDependency
var mock

var dependencies = []
var registrationNotifier = notifier.createNotifier()

function getAll() {
  return dependencies
}

function register(name, module) {
  if (!name || typeof name !== 'string') {
    throw Error('A dependency needs a name, please provide a valid string!')
  }

  if (resolver.exists(dependencies, name)) {
    throw Error('Dependency "' + name + '" already exists.')
  }

  dependencies = [].concat(dependencies, createDependency(name, module))
  registrationNotifier.notify(name)
}

function on(callback) {
  registrationNotifier.on(callback)
}

if (process.env.NODE_ENV !== 'production') {
  mock = function (name, mockModule) {
    var mockDependency = createDependency(name, mockModule)

    if (!resolver.exists(dependencies, name)) {
      dependencies = [].concat(dependencies, mockDependency)
      return
    }

    dependencies = dependencies.map(function (dependency) {
      if (dependency.name === name) {
        return mockDependency
      }

      return dependency
    })
  }
}

function reset() {
  dependencies = []
}

module.exports = {
  on: on,
  register: register,
  reset: reset,
  getAll: getAll,
  mock: mock
}
