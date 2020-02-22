var express = require('express')
var router = express.Router()

router.use("/students", require("./routes/studentRoute"))

module.exports = router
