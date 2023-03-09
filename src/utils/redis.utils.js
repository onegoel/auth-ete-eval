const createHttpError = require('http-errors');
const { client } = require('../../redis.config');

module.exports = {
    storeTokenInRedis: async (token) => {
        await client.set(token, 'true', 'EX', 3600);
    },

    verifyTokenInRedis: async (token) => {
        const isTokenInRedis = await client.GET(token);
        if (!isTokenInRedis) {
            throw new createHttpError(498, 'Token invalid/expired');
        }
        return true;
    }
};

