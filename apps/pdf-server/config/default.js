const process = require('node:process')

const { APP_NAME } = process.env

module.exports = {
  appName: APP_NAME || 'pdf-server',
}
