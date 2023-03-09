const { User } = require('../models');
const createHttpError = require('http-errors');
const { verifyPassword } = require('../utils/password.utils');

module.exports = {
    registerUserInDb: async (newUser) => {
        console.log('newUser', newUser);
        const { email } = newUser;
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user.isNewRecord || user !== null) {
            throw new createHttpError(409, 'Email already registered');
        }
        const createUserInDb = await User.create({
            ...newUser
        });
        if (!createUserInDb) {
            throw new createHttpError(500, 'Error registering user');
        }
        return createUserInDb;
    },

    checkUserInDb: async (loginDetails) => {
        const { email, password } = loginDetails;
        const user = await User.findOne({
            where: {
                email,
            }
        });
        if (!user) {
            throw new createHttpError(401, 'Email entered is not registered');
        }
        const isPasswordCorrect = await verifyPassword(password, user.password);
        if (!isPasswordCorrect) {
            throw new createHttpError(401, 'Password entered is incorrect');
        }
        return true;
    }
};

