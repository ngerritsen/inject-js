'use strict'

var test = require('ava')
var sinon = require('sinon')

var injector = require('..')

test.afterEach(function () {
  injector.reset()
})

test('lazy resolves dependencies', function (t) {
  var delayed = sinon.spy()
  var delayed2 = sinon.spy()
  var immediate = sinon.spy()

  injector.lazy(['a', 'b'], delayed)
  t.false(delayed.called, 'Does not call when initialized, but no dependencies exist yet')

  injector.register('a', 1)
  t.false(delayed.called, 'Does not call when dependency registered, but not all are complete')

  injector.lazy(['a', 'b'], delayed2)
  t.false(delayed2.called, 'Does not call when initialized, but not all dependencies exist yet')

  injector.register('c', 3)
  t.false(delayed.called, 'Does not call when unrelated dependency registered')

  injector.register('b', 2)
  t.true(delayed.calledWith(1, 2), 'Calls when dependencies are resolved')

  injector.lazy(['a', 'b'], immediate)
  t.true(immediate.calledWith(1, 2), 'Immediately resolves when all dependencies exist')
})
