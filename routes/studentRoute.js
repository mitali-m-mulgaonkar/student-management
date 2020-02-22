var express = require('express')
var router = express.Router()
const Student = require('./../models/Student')

async function list(req, res){
    let users = await Student.find({firstName: 'anish@arkenea.com'})
  
  }
  


router.get("/", list)

module.exports = router