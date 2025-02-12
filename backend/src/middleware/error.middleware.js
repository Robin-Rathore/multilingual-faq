// src/middleware/error.middleware.js
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
  };
  
  module.exports = errorHandler;
  
  // In server.js
  app.use(errorHandler);