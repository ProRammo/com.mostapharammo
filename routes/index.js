var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Mostapha Rammo' });
});

router.get('/gui', function(req, res, next) {
	res.render('guindex', { title: 'Mostapha Rammo'})
});

router.get('/console', function(req, res, next) {
	res.render('console', { title: 'Moose Console'})
});

module.exports = router;
