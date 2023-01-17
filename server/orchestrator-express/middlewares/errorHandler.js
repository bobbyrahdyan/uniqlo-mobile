const errorHandler = (error, req, res, next) => {
    console.log(error, '<===== error');
    if (error.response) {
      const { data, status } = error.response;
      res.status(status).json(data);
      return;
    }
    res.status(500).json({ message: "Internal server error" });
};

  module.exports = errorHandler;
