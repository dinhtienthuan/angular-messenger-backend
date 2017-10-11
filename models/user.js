var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  messages: [ {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  } ]
});

userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('User', userSchema);