'use strict'

function findIn(array, callback) {
  var result = array.filter(callback)

  if (result.length === 0) {
    return undefined
  }

  return result[0]
}

module.exports = {
  findIn: findIn
}
