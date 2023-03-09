require('dotenv').config();

const redis = require('redis');
const client = redis.createClient({
    socket: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST
    }
});

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('ready', () => {
    console.log('Redis client ready');
});

client.on('error', (err) => {
    console.log('Redis client error: ', err);
});

client.on('end', () => {
    console.log('Redis client disconnected');
});

process.on('SIGINT', () => {
    client.quit();
});

module.exports = { client };