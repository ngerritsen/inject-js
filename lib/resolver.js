var utils = require('./utils')

function resolve(dependencies, match) {
  if (typeof match === 'string') {
    return resolveDependency(dependencies, match)
  }

  if (utils.isArray(match)) {
    return resolveDependencies(dependencies, match)
  }
}

function exists(dependencies, name) {
  return !!findDependency(dependencies, name)
}

function resolveDependency(dependencies, name) {
  var result = findDependency(dependencies, name)

  if (!result) {
    throw Error('Dependency "' + name + '" is not found.')
  }

  return result.module
}

function resolveDependencies(dependencies, names) {
  return names.reduce(function (result, name) {
    result[name] = resolveDependency(dependencies, name)
    return result
  }, {})
}

function findDependency(dependencies, name) {
  return utils.findIn(dependencies, function (dependency) {
    return dependency.name === name
  })
}

module.exports = {
  resolve: resolve,
  exists
}
