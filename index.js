require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;
const router = require('./src/routes/auth.routes');
const db = require('./src/models');
const cors = require('cors');
const { client } = require('./db/config/redis.config');

const connectRedis = async () => {
    await client.connect();
}
connectRedis()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8100'],
    credentials: true
}));
app.use('/auth', router);


db.sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
        console.log(`Auth server running at http://localhost:${port}`);
    });
});
