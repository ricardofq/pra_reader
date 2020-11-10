if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const PORT = process.env.PORT || 5000;

const indexRouter = require('./routes/index');

const app = express();

mongoose
	.connect(process.env.DATABASEURL || 'mongodb://localhost:27017/cqcentral', {
		useNewUrlParser    : true,
		useCreateIndex     : true,
		useUnifiedTopology : true
	})
	.then(() => {
		console.log('connected to DB');
	})
	.catch((err) => {
		console.log('ERROR: ', err.message);
	});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.PASSPORT_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
		secret            : process.env.PASSPORT_SECRET,
		resave            : false,
		saveUninitialized : true
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', indexRouter);
if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'pra_readerr/build'))); // Handle React routing, return all requests to React app
	app.get('*', function(req, res){
		res.sendFile(path.join(__dirname, 'pra_readerr/build', 'index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`Server is listening on PORT ${PORT}`);
});

module.exports = app;
