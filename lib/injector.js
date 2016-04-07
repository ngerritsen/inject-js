'use strict'

var utils = require('./utils')

var dependencies = []

function register(name, dependency) {
  if (!name || typeof name !== 'string') {
    throw Error('A dependency needs a name, please provide a valid string!')
  }

  if (findDependency(name)) {
    throw Error('Dependency "' + name + '" already exists.')
  }

  dependencies = [].concat(dependencies, {
    name: name,
    module: dependency
  })
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

module.exports = {
  register: register,
  resolve: resolve,
  reset: reset
}
