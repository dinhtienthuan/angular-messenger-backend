var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MODEL_PATH = './';
var User = require(MODEL_PATH + 'user');

var messageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

messageSchema.post('remove', function (message) {
  User.findById(message.user, function(err, user) {
    user.messages.pull(message._id);
    user.save();
  });
});

module.exports = mongoose.model('Message', messageSchema);