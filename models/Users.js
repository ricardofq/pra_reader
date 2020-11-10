const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const UsersSchema = new mongoose.Schema({
	userID      : String,
	username    : String,
	password    : String,
	name        : String,
	lname       : String,
	email       : String,
	birthday    : Date,
	telephone   : String,
	user_type   : String,
	isAdmin     : {
		type    : Boolean,
		default : false
	},
	isCandidate : {
		type    : Boolean,
		default : true
	},
	candidates  : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'User'
		}
	],
	group       : { type: mongoose.Schema.Types.ObjectId, ref: 'Groups' }
});

UsersSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UsersSchema);
