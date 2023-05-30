const { default: mongoose } = require('mongoose');
const Sensor = require('../models/SensorData');

const addSensorLog = (req, res, ioClient) => {
  const { sensorId, temperature, isMove, isSound, isGus, isOn, userId } =
    req.body;
  // added new mongoose log with the user id
  const sensorData = new Sensor({
    sensorId,
    temperature,
    isMove,
    isSound,
    isGus,
    isOn,
    userId: userId,
    createdAt: new Date(),
  });

  sensorData
    .save()
    .then((result) => {
      console.log('new sensor log added', result);
      ioClient.emit('sensor', result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
const getSensorData = async (req, res, isNotification) => {
  const { userId } = req.query;
  console.log('userId', userId);
  const sensorData = await Sensor.find({ userId: userId }).exec();
  console.log('sensorData', sensorData);
  if (isNotification) {
    console.log('sending sensorData', sensorData);
    res.send(sensorData);
  } else {
    const lastSensorData = sensorData[sensorData.length - 1];
    res.send(lastSensorData);
  }
};

const getSensorIds = async (req, res) => {
  const { userId } = req.query;
  console.log('userId', userId);
  const sensorData = await Sensor.find({ userId: userId }).exec();
  console.log('sensorData', sensorData);
  const sensorIds = sensorData.map((sensor) => sensor.sensorId);
  console.log('sensorIds', sensorIds);
  const isAlreadyExist = [];
  const filteredSensorIds = sensorIds.filter((sensorId) => {
    if (isAlreadyExist.includes(sensorId)) {
      return false;
    } else {
      isAlreadyExist.push(sensorId);
      return true;
    }
  });
  res.send(filteredSensorIds);
};

module.exports = {
  addSensorLog,
  getSensorData,
  getSensorIds,
};
