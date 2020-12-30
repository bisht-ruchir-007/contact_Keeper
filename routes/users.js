const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

// @route  POST api/users
// @desc   Register a User
// @access Public(Open)

router.post(
	'/',
	[
		check('name', 'Please enter a name').not().isEmpty(),
		check('email', 'Please enter a valid Email-ID').isEmail(),
		check('password', 'Please enter a password with atleast 6 characters').isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		// user did not enter the valid data
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}

		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			// if user with same email already exists
			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}

			// create a instance of User
			user = new User({
				name,
				email,
				password
			});

			// hashing the password
			// 10 - how secure the salt
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

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
			console.error(err.message);
			res.send(500).send('Server error');
		}
	}
);

module.exports = router;
