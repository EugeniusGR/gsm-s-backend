const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  sensorId: { type: String },
  temperature: { type: Number },
  isMove: { type: Boolean },
  isSound: { type: Boolean },
  isGus: { type: Boolean },
  isOn: { type: Boolean },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const model = mongoose.model('SensorData', SensorDataSchema);

module.exports = model;
