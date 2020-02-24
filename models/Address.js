var mongoose = require( 'mongoose' )
var Student =  require('./../models/Student')

var addressSchema = new mongoose.Schema({
  state: String,
  district: String,
  landMark: String,
  pin: Number,
  landmark: String,
  houseName: String,
  houseNumber: Number,
  createdAt: Date,
  updatedAt: Date,
  user: { type: mongoose.Schema.ObjectId, ref: 'Student' }
})

module.exports = mongoose.model('Address', addressSchema)
