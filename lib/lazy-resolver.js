var registrator = require('./registrator')
var resolver = require('./resolver')

function createLazyResolver(names, callback) {
  var dependencies = registrator.getAll()
  var waitingNames = filterOutExistingNames(names, dependencies)

  callIfNoWaitingNames(waitingNames, names, dependencies, callback)

  registrator.on(function (resolvedName) {
    waitingNames = removeResolvedName(waitingNames, resolvedName)
    callIfNoWaitingNames(waitingNames, names, registrator.getAll(), callback)
  })
}

function filterOutExistingNames(names, dependencies) {
  return names.filter(function (name) {
    return !resolver.exists(dependencies, name)
  })
}

function removeResolvedName(names, resolvedName) {
  return names.filter(function (name) {
    return name !== resolvedName
  })
}

function resolveNames(dependencies, names) {
  return names.map(function (name) {
    return resolver.resolve(dependencies, name)
  })
}

function callIfNoWaitingNames(waitingNames, names, dependencies, callback) {
  if (waitingNames.length === 0) {
    callback.apply(null, resolveNames(dependencies, names))
  }
}

module.exports = {
  createLazyResolver: createLazyResolver
}
