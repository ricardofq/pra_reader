module.exports = {
	isUserAdmin : function(req, res, next){
		if (req.user.isAdmin) return next();
		return res.send({ msg: 'you do not have permission to do that!' });
	}
};
