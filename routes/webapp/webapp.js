getUserHomePage = function (req, res) {
	return res.redirect('/');
};

module.exports.init = function(router) {

	router.get('/', function(req, res, next) {
		res.render('index', { user: req.user });
	});

	router.get('/login', function(req, res) {
		res.render('login'); 
	});

	router.get('/accountDetails', function(req, res) {
		res.render('partneraccountcreation');
	});

	router.post('/newuser', getUserHomePage);

	router.post('/login', getUserHomePage);
	
	router.post('/accountDetails', getUserHomePage);

};

