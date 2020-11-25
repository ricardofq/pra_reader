const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
	passport.use(
		new LocalStrategy((username, password, done) => {
			Users.findOne({ username: username }, (err, user) => {
				if (err) throw err;
				if (!user) return done(null, false);
				bcrypt.compare(password, user.password, (err, result) => {
					if (err) throw err;
					if (result) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				});
			});
		})
	);

	passport.serializeUser((user, cb) => {
		console.log('serealizeuser');
		cb(null, user);
	});
	passport.deserializeUser((id, cb) => {
		console.log('serealizeuser');
		Users.findOne({ _id: id }, (err, user) => {
			const userInformation = {
				username : user.username
			};
			cb(err, user);
		});
	});
};
