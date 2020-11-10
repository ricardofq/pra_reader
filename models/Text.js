const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema({
	dr   : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'DR'
	},
	text : {
		fullText : {
			type    : String,
			default : ''
		},
		first    : {
			type    : String,
			default : ''
		},
		last     : {
			type    : String,
			default : ''
		}
	},
	pagI : {
		type    : String,
		default : ''
	},
	pagF : {
		type    : String,
		default : ''
	}
});

module.exports = mongoose.model('Text', TextSchema);
