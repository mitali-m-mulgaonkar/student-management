var mongoose = require( 'mongoose' )
var Address = require('./../models/Address')
var validate = require('mongoose-validator')

var studentSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    required: true,
    message: 'Roll No is required',
  },
  firstName: {
    type: String,
    required: true,
    message: 'First Name is required'
  },
  lastName: {
    type: String,
    required: true,
    message: 'Last Name is required'
  },
  class: {
    type: Number,
    required: true,
    message: 'Class is required'
  },
  //address: [{ type: mongoose.Schema.ObjectId, ref: 'Address' }],
  contactNo: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
    message: 'Contact Number is required'
  },
  createdAt: Date,
  updatedAt: Date
})


module.exports = mongoose.model('Student', studentSchema)
