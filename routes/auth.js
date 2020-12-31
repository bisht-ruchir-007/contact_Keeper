const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const auth = require('../middleware/auth');

// @route  GET api/auth
// @desc   Get logged in user
// @access Private
// auth - middleware to validate the token
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/auth
// @desc   Auth user and get token - User Login
// @access Public
router.post(
	'/',
	[
		check('email', 'Please enter a valid Email-ID').isEmail(),
		check('password', 'Please enter a Password').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		// user did not enter the valid data
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}
		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			// if user doesn't exist
			if (!user) {
				return res.status(400).json({
					msg: 'Invalid Credentials'
				});
			}

			//check the password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({
					msg: 'Invalid Password'
				});
			}

			const payload = {
				user: {
					id: user.id
				}
			};

			// expires after some time - 36000 sec
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.err(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
