var mongoose = require( 'mongoose' )

var addressSchema = new mongoose.Schema({
  state: String,
  district: String,
  landMark: String,
  pin: Number,
  landmark: String,
  houseName: String,
  houseNumber: Number,
  createdAt: Date,
  updatedAt: Date
})

module.exports = mongoose.model('Address', addressSchema)
