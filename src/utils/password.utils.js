const bcrypt = require('bcrypt');

module.exports = {
    encryptPassword: async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    },
    verifyPassword: async (password, hashedPassword) => {
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        return isPasswordCorrect;
    }
};