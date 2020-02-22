var express = require('express')
var bodyParser = require('body-parser')
var route = require('./route')
var constants = require('./config/constants')
var cors = require('cors')
const mongooseConnect = require('./helpers/database')

mongooseConnect.dbConnect()

var app = express()

app.set('view engine', 'jade');
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))

//app.use(cors({}))
app.use(cors({credentials: true, origin: constants.clientUrl}))
app.use('/v1', route);
/*app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist')))
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
})*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handlers development error handler
if (app.get('env') !== 'development') {
    app.use(function(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
          res.status(401)
          res.json({"message" : err.name + ": " + err.message})
        } else {
          res.status(err.status || 500)
          res.render('error', {
              message: err.message,
              error: err
          })
        }
    })
}

// production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})

module.exports = app
