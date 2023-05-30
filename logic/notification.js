const createNotification = async (req, res) => {
  const { userId, sensorId, message, isRead } = req.body;
  const notification = new Notification({
    userId,
    sensorId,
    message,
    isRead,
    createdAt: new Date(),
  });
  notification
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getNotification = async (req, res) => {
  const { userId } = req.query;
  const objectId = mongoose.Types.ObjectId(userId);

  Notification.find({ userId: objectId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  createNotification,
  getNotification,
};
