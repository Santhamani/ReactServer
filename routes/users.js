var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../modules/database');
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('hi users...');
});



module.exports = router;