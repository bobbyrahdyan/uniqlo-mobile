function errorHandler(err, req, res, next) {
    console.log(err, '<=== err');
    const errName = {
      "Email is required": [400],
      "Password is required": [400],
      "Something is empty": [400],
      SequelizeValidationError: [400, err.errors?.map((el) => el.message)[0]],
      SequelizeDatabaseError: [400, "Other images cannot be empty"],
      "Invalid email or password": [401],
      "Login required": [401],
      "Invalid token": [401],
      JsonWebTokenError: [401, "Invalid token"],
      "Not found": [404],
    };

    if (!errName[err.name]) {
      return res.status(500).json({ message: "Internal server error" });
    }

    const [status, message] = errName[err.name];
    res.status(status).json({ message: message || err.name });
  }

  module.exports = errorHandler;
