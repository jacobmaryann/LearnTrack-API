const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack);
    const statusCode = res.statuscode === 200 ? 500: res.statusCode;
    res.status(statusCode).json({error: err.message});
};

export default errorHandler;