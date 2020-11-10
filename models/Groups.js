const mongoose = require('mongoose');

const GroupsSchema = new mongoose.Schema({
	name       : String,
	candidates : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'User'
		}
	]
});

module.exports = mongoose.model('Groups', GroupsSchema);
