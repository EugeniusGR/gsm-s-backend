const socketHandler = (io) => {
  console.log('socket stared');
  io.on('connection', (socket) => {
    console.log('set up connection');
    const username = socket.id;

    socket.on('update', (data) => {
      console.log(data);
    });

    socket.on('disconnect', function () {
      console.warn('disconnect');
      socket.disconnect();
    });
  });
};

module.exports = { socketHandler };
