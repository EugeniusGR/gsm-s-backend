const socketHandlerClient = (io) => {
  console.log('socket stared');
  io.on('connection', (socket) => {
    console.log('set up connection');

    socket.emit('alarmUpdate', { alarm: 'alarm' });

    socket.on('update', (data) => {
      console.log('update');
      console.log(data);
    });

    socket.on('disconnect', function () {
      console.warn('disconnect');
      socket.disconnect();
    });
  });
};

module.exports = { socketHandlerClient };
