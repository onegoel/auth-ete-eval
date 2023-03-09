const { isHttpError } = require('http-errors');

module.exports = {
    errorHandler: (error, res) => {
        if (isHttpError(error)) {
            res.status(error.status).json({
                data: {
                    statusCode: error.status,
                    message: error.message
                }
            });
        } else {
            res.status(500).json({
                data: {
                    statusCode: 500,
                    message: 'Something went wrong...'
                }
            });
        }
    }
};