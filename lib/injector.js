'use strict'

var utils = require('./utils')
var factories = require('./factories')

var createDependency = factories.createDependency
var mock

var dependencies = []

function register(name, module) {
  if (!name || typeof name !== 'string') {
    throw Error('A dependency needs a name, please provide a valid string!')
  }

  if (findDependency(name)) {
    throw Error('Dependency "' + name + '" already exists.')
  }

  dependencies = [].concat(dependencies, createDependency(name, module))
}

function resolve(name) {
  var dependency = findDependency(name)

  if (!dependency) {
    throw Error('Dependency "' + name + '" is not found.')
  }

  return dependency.module
}

function findDependency(name) {
  return utils.findIn(dependencies, function (dependency) {
    return dependency.name === name
  })
}

function reset() {
  dependencies = []
}

if (process.env.NODE_ENV !== 'production') {
  mock = function (name, mockModule) {
    var mockDependency = createDependency(name, mockModule)

    if (!findDependency(name)) {
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

module.exports = {
  register: register,
  resolve: resolve,
  reset: reset,
  mock: mock
}
