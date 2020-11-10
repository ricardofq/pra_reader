const mongoose = require('mongoose');

const ACCGridSchema = new mongoose.Schema({
	acc       : String,
	candidate : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'User'
	},
	admins    : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'User'
		}
	],
	NG        : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'NG'
		}
	]
});

module.exports = mongoose.model('ACCGrid', ACCGridSchema);
