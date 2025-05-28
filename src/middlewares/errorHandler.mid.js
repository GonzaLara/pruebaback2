const errorHandler = (error, req, res, next) => {
  console.log(error);
  const message = error.message || "Error Servidor";
  const data = {
    method: req.originalUrl,
    error: message,
  };
  res.status(error.statusCode || 500).json(data);
};

export default errorHandler;
