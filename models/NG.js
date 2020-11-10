const mongoose = require('mongoose');

const NGSchema = new mongoose.Schema({
	number : String,
	grid   : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'ACCGrid'
	},
	dr     : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'DR'
		}
	]
});

module.exports = mongoose.model('NG', NGSchema);
