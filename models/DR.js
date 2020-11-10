const mongoose = require('mongoose');

const DRSchema = new mongoose.Schema({
	ng     : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'NG'
	},
	number : String,
	texts  : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Text'
		}
	],
	grade  : { type: String, default: '1' }
});

module.exports = mongoose.model('DR', DRSchema);
