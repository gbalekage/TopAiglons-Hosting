const jwt = require("jsonwebtoken");
const HttpError = require("../models/errorModel");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new HttpError("Unauthorized, no token", 401)); // Pass error to next middleware
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new HttpError("Unauthorized, invalid token", 401));
    }

    req.userId = decoded.userId;
    next(); // Ensure this is here to pass control to the next middleware/handler
  } catch (error) {
    return next(new HttpError(error.message, 500)); // Send error to next middleware
  }
};

module.exports = verifyToken;
