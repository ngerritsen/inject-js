/* eslint-disable camelcase */

var webpack = require('webpack')

var env = process.env.NODE_ENV
var config = {
  entry: './lib/browser.js',
  output: {
    path: './dist',
    filename: 'inject.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

if (env === 'production') {
  config.output.filename = 'inject.min.js'
  config.plugins = [].concat(config.plugins, [
    new webpack.optimize.UglifyJsPlugin(new webpack.optimize.UglifyJsPlugin({
      compressor: {
        unsafe: true,
        screw_ie8: true,
        warnings: false
      }
    }))
  ])
}

module.exports = config
