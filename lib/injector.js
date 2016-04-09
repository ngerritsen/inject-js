'use strict'

var resolver = require('./resolver')
var registrator = require('./registrator')
var lazyResolver = require('./lazy-resolver')

function resolve(match) {
  return resolver.resolve(registrator.getAll(), match)
}

module.exports = {
  register: registrator.register,
  resolve: resolve,
  reset: registrator.reset,
  lazy: lazyResolver.createLazyResolver,
  mock: registrator.mock
}
