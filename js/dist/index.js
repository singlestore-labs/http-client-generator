
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./http-sdk.cjs.production.min.js')
} else {
  module.exports = require('./http-sdk.cjs.development.js')
}
