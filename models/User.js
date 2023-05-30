const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String },
  country: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const model = mongoose.model('User', UserSchema);

module.exports = model;
