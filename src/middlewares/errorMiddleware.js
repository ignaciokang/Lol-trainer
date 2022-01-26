const errorMiddleware = (err, req, res, next) => {
  try {
    res.status(400).json({
      status: false,
      error: err,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
};

module.exports = { errorMiddleware };
