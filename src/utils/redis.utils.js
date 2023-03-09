const createHttpError = require('http-errors');
const { client } = require('../../db/config/redis.config');

module.exports = {
    storeTokenInRedis: async (token) => {
        await client.SET(token, 'true', 'EX', 3600);
    },

    verifyTokenInRedis: async (token) => {
        const isTokenInRedis = await client.GET(token);
        if (!isTokenInRedis) {
            throw new createHttpError(498, 'Token invalid/expired');
        }
        return true;
    }
};

