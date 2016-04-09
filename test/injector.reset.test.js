'use strict'

var test = require('ava')
var injector = require('..')

test('resets dependencies', function (t) {
  injector.register('a', 1)
  injector.reset()

  t.throws(function () {
    injector.resolve('a')
  }, 'Dependency "a" is not found.')
})
