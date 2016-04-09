'use strict'

var test = require('ava')
var injector = require('..')

test.beforeEach(function () {
  injector.register('a', 1)
  injector.register('b', 2)
})

test.afterEach(function () {
  injector.reset()
})

test('resolves registered dependencies', function (t) {
  t.is(injector.resolve('a'), 1, 'Resolves single dependency as a single value')

  t.deepEqual(injector.resolve([ 'a', 'b' ]), {
    a: 1,
    b: 2
  }, 'Resolves multiple dependencies as an object')
})

test('fails when trying to resolve an unexisting dependency', function (t) {
  t.throws(function () {
    injector.resolve('c')
  }, 'Dependency "c" is not found.', 'Fails when trying to resolve single dependency')

  t.throws(function () {
    injector.resolve([ 'a', 'c' ], 2)
  }, 'Dependency "c" is not found.', 'Fails when trying to resolve multiple dependencies')
})
