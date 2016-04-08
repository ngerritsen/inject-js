function createDependency(name, module) {
  return {
    name: name,
    module: module
  }
}


module.exports = {
  createDependency: createDependency
}
