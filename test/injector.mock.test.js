'use strict'

var test = require('ava')
var injector = require('..')

test.afterEach(function () {
  injector.reset()
})

test('mocks dependencies', function (t) {
  injector.register('a', 1)

  injector.mock('a', 2)
  injector.mock('b', 3)

  t.is(injector.resolve('a'), 2, 'Mocks existing dependencies')
  t.is(injector.resolve('b'), 3, 'Mocks unexisting dependencies')
})
