var router = require('express').Router();

require('./api/init').init(router);
require('./webapp/webapp').init(router);

module.exports = router;
