const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const auth = require('../middleware/auth');

// model
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route  GET api/contacts
// @desc   get all users contacts
// @access Private
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
		res.json(contacts);
	} catch (err) {
		console.log(err.message);
		res.send(500).send('Server Error');
	}
});

// @route  POST api/contacts
// @desc   add new contact
// @access Private

router.post('/', (req, res) => {
	res.send('Add contact');
});

// @route  PUT api/contacts/:id
// @desc   Update contact
// @access Private

router.put('/:id', (req, res) => {
	res.send('update contact');
});

// @route  DELETE api/contacts/:id
// @desc   Delete a contact
// @access Private

router.delete('/:id', (req, res) => {
	res.send('delete contact');
});

module.exports = router;
