const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const cors = require('cors');
const { socketHandler } = require('./socket');
const { addUser, loginUser, getUserFromDB } = require('./logic/user');
const { addSensorLog, getSensorData, getSensorIds } = require('./logic/sensor');
const { socketHandlerClient } = require('./socketClient');

const app = express();
const server = require('http').createServer(app);

const serverClient = require('http').createServer(app);

const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const ioClient = socketIO(serverClient, {
  cors: {
    origins: '*:*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

socketHandler(io);
socketHandlerClient(ioClient);

app.use(cors());

const port = 3005;
const limit = 52428800;

app.use(bodyParser.urlencoded({ extended: false, limit: limit }));
app.use(bodyParser.json({ limit: limit }));

app.post('/create-user', (req, res) => {
  addUser(req, res);
});

app.get('/login', (req, res) => {
  loginUser(req, res);
});

app.post('/log-sensor', (req, res) => {
  addSensorLog(req, res, ioClient);
});

app.get('/get-sensor-data', (req, res) => {
  getSensorData(req, res);
});

app.get('/get-devices', (req, res) => {
  getSensorIds(req, res);
});

app.get('/get-notifications-data', (req, res) => {
  getSensorData(req, res, true);
});

app.get('/get-user', async (req, res) => {
  const { userId } = req.query;
  console.log('userId to search', userId);
  const user = await getUserFromDB(userId).catch((err) => {
    console.log('err', err.message);
  });

  res.send(user);
});

const connectBD = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://eucheremisin:qweasd123@gsmsystem.qrct274.mongodb.net/test'
    );
    console.log('|                                   |');
    console.log('|   mongoose started successfully   |');
    console.log('|-----------------------------------|');
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, async () => {
  connectBD();
  console.log('|-----------------------------------|');
  console.log(`|  Listening server on port: ${port}   |`);
  console.log('|                                   |');
});

server.listen(3006, () => {
  console.log('|     Listening socket on :3006     |');
});

serverClient.listen(3007, () => {
  console.log('|     Listening socket on :3007     |');
});
