var app = require('./index')
const http = require('http')
var port = normalizePort(process.env.PORT || '443') 
var express = require('express')
var router = express.Router()

const server = http.createServer(app).listen(3000, () => {
   console.log('http server running at ' + 80)
})

/**
 * 443 https port & redirection of http to https
 */
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
app.set('port', (process.env.PORT || 443));


function normalizePort(val) {
  var port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {

  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
  //console.log("server started on port" + addr.port)
}
