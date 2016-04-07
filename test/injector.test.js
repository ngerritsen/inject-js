'use strict'

var test = require('ava')
var injector = require('..')

test.afterEach(function () {
  injector.reset()
})

test('resets dependencies', function (t) {
  injector.register('a', 1)
  injector.reset()

  t.throws(function () {
    injector.resolve('a')
  }, 'Dependency "a" is not found.')
})

test('registers and resolves dependencies', function (t) {
  injector.register('a', 1)

  var a = injector.resolve('a')

  t.is(a, 1)
})

test('fails when trying to register an existing dependency', function (t) {
  injector.register('a', 1)

  t.throws(function () {
    injector.register('a', 2)
  }, 'Dependency "a" already exists.')
})

test('fails when trying to register a dependency with an invalid name', function (t) {
  t.throws(function () {
    injector.register(1, 2)
  }, 'A dependency needs a name, please provide a valid string!')
})

test('fails when trying to resolve an unexisting dependency', function (t) {
  t.throws(function () {
    injector.resolve('a', 2)
  }, 'Dependency "a" is not found.')
})
