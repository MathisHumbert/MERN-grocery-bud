const mongoose = require('mongoose');

const grocerySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  value: {
    type: String,
    required: [true, 'Please add a grocery'],
  },
});

module.exports = mongoose.model('Grocery', grocerySchema);
