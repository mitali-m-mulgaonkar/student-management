var mongoose = require( 'mongoose' )

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
  contactNo: {
    type: Number,
    required: true,
    min: [1000000000, 'Contact number should be between 10-12 digits'],
    max: [999999999999, 'Contact number should be between 10-12 digits'],
    message: 'Contact Number is required'
  },
  createdAt: Date,
  updatedAt: Date
})


module.exports = mongoose.model('Student', studentSchema)
