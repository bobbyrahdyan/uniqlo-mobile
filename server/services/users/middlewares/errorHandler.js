const errorHandler = (error, req, res, next) => {
    console.log(error, "<==== error");
    res.status(500).json("Internal Server Error");
};

module.exports = errorHandler;
