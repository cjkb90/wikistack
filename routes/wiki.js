var express = require('express');
var router = express.Router();

var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json())

router.get('/', function(req, res, next){
	res.redirect('/');
});

router.post('/', function(req, res, next){
  var page = new Page({
    title: req.body.title,
    content: req.body.content,
    email: req.body.email
  });
  page.save()
  .then(function(results){
  	res.redirect(results.route);
  	//this is equivalent to
  	//res.redirect("/wiki/"+results.urlTitle);
  })
  .catch(function(err){
  	console.log(err)
  });
});

router.get('/add', function(req, res, next){
	res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next){
	Page.findOne({'urlTitle':req.params.urlTitle})
	.exec()
	.then(function(result){
		res.render('wikipage',{page:result});
	})
	.catch(next);
});

module.exports = router;











