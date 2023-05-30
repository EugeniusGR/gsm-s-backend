const mongoose = require('mongoose');

const NotificationData = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const model = mongoose.model('NotificationData', NotificationData);

module.exports = model;
