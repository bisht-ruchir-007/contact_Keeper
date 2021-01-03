const express = require('express');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// Connect Database
connectDB();

// Init Middleware -- Body Parser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
	res.json({ msg: 'Welcome to the COntactKeeper ...' });
});
//Define Routers
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve Static assets in producation
if (process.env.NODE_ENV === 'production') {
	// Set the static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`Server started at Port :  ${PORT}`);
});
