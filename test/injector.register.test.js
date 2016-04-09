'use strict'

var test = require('ava')
var injector = require('..')

test.afterEach(function () {
  injector.reset()
})

test('registers a valid dependency without failing', function (t) {
  t.notThrows(function () {
    injector.register('a', 1)
  })
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
