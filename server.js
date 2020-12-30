const express = require('express');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => {
	res.json({ msg: 'Welcome to Contact keeper API' });
});

// Init Middleware -- Body Parser
app.use(express.json({ extended: false }));

//Define Routers
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => {
	console.log(`Server started at Port :  ${PORT}`);
});
