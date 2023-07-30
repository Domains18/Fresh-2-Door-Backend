const errorHandler = (err, req, res, next) => {
    const statusCodes = res.statusCodes ? statusCodes : 500;
    res.status(statusCodes);
    res.json({
        message: err.message,
        stack: process.env === "production" ? null : err.stack
    });
};


module.exports = { errorHandler };