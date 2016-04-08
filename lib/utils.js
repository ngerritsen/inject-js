'use strict'

function findIn(array, callback) {
  var result = array.filter(callback)

  if (result.length === 0) {
    return undefined
  }

  return result[0]
}

function contains(values, value) {
  return findIn(values, function (val) {
    return val === value
  })
}

function isArray(value) {
  return value.constructor === Array
}

module.exports = {
  contains: contains,
  findIn: findIn,
  isArray: isArray
}
