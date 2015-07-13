module.exports.init = function(router) {
	
	require('./userprotected').init(router);
	require('./public').init(router);

};
