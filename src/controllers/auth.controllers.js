const { encryptPassword } = require('../utils/password.utils');
const { registerUserInDb, checkUserInDb } = require('../services/auth.services');
const { errorHandler } = require('../utils/errorHandler.utils');
const { generateAccessJwt, verifyAccessJwt } = require('../utils/jwt.utils');
const { storeTokenInRedis, verifyTokenInRedis } = require('../utils/redis.utils');

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log('email', email);
            const hashedPassword = await encryptPassword(password);
            const newUser = {
                email,
                password: hashedPassword
            };
            await registerUserInDb(newUser);
            // const token = await generateAccessJwt({ email });
            // await storeTokenInRedis(token);

            res.status(201).json({
                data: {
                    message: `${email} registered successfully!`,
                    // token: token
                }
            });
            // makeRequest(REG_USER, {}, navigate).then((data) => {
            //     console.log('data', data);
            //     navigate(LOGIN_ROUTE);
            // });
            // makeRequest(LOGIN_ROUTE, {}, navigate).then((data) => {
            //     console.log('data', data);
            //     localStorage.setItem('token', data.token);
            //     navigate(HOME_ROUTE);
            // });
        } catch (error) {
            errorHandler(error, res);
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            await checkUserInDb({ email, password });
            const token = await generateAccessJwt({ email });
            storeTokenInRedis(token).then(() => {
                res.status(200).json({
                    data: {
                        message: `${email} logged in successfully!`,
                        token: token
                    }
                });
            });
        }
        catch (error) {
            errorHandler(error, res);
        }
    },

    validateUser: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const payload = await verifyAccessJwt(token);
            verifyTokenInRedis(token).then(() => {
                res.status(200).json({
                    data: {
                        message: 'Token is valid, welcome to the app!',
                        payload: payload
                    }
                });
            });
        }
        catch (error) {
            errorHandler(error, res);
        }
    }
};

