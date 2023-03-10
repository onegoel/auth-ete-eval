require('dotenv').config();
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const JWT_SECRET = process.env.SECRET_KEY;

module.exports = {
    generateAccessJwt: (payload) => {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
                if (error) {
                    console.error(error.message);
                    return reject(createHttpError(500, 'Error generating access token'));
                }
                resolve(token);
            });
        });
    },

    verifyAccessJwt: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET, (error, decoded) => {
                if (error) {
                    console.error(error.message);
                    return reject(createHttpError(401, error.message));
                }
                resolve(decoded);
            });
        });
    }
};