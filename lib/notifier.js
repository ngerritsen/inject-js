function createNotifier () {
  var handlers = []

  function on(callback) {
    if (typeof callback !== 'function') {
      throw Error('Registrator on register handler must be a function!')
    }

    handlers = [].concat(handlers, callback)
  }

  function notify(name) {
    handlers.forEach(function (handler) {
      handler(name)
    })
  }

  return {
    on: on,
    notify: notify
  }
}

module.exports = {
  createNotifier: createNotifier
}
