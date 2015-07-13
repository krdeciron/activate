var publicRoutes = [
	"/",
	"/login",
];

module.exports.init = function(router) {

	router.get('/*', function(req, res, next) {
		
		if (publicRoutes.indexOf(req.path) < 0 && !req.user) {
			return res.redirect('/');
		}

		return next();
	});

};
