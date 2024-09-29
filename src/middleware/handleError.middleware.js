const errorHandler = (err, req, res, next) => {
    const messageError = err.messageObject || err.message;
    const error = {
        status: err.status || 500,
        error: messageError
    };
    const status = err.status || 500;
  
    return res.status(status).json(error);
};

export default errorHandler;