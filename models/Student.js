var mongoose = require( 'mongoose' )

var studentSchema = new mongoose.Schema({
  rollNo: Number,
  firstName: String,
  lastName: String,
  class: Number,
  address: [{ type: mongoose.Schema.ObjectId, ref: 'Address' }],
  countryCode: String,
  contactNo: Number,
  createdAt: Date,
  updatedAt: Date
})

module.exports = mongoose.model('Student', studentSchema)
