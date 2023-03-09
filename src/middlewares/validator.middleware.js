const reqProperties = {
    body: 'body',
    params: 'params',
    query: 'query',
    header: 'headers'
};

module.exports = {
    inputValidator: (schema, reqProperty) => {
        return (req, res, next) => {
            const { error: joiError } = schema.validate(req[reqProperties[reqProperty]]);
            if (joiError) {
                return res.status(422).json({
                    data: { 
                        message: joiError.details[0].message 
                    }
                });
            }
            next();
        };
    }
};

