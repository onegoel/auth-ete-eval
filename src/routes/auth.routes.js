const express = require('express');
const router = express.Router();
const { registerUser, loginUser, validateUser } = require('../controllers/auth.controllers');
const { inputValidator } = require('../middlewares/validator.middleware');
const { authSchema, tokenSchema } = require('../schemas/auth.schemas');

router.get('/home', (req, res) => {
    res.json('Hello World!');
});

router.post('/register', inputValidator(authSchema, 'body'), registerUser);
router.post('/login', inputValidator(authSchema, 'body'), loginUser);
router.get('/validate', inputValidator(tokenSchema, 'headers'), validateUser);


module.exports = router;