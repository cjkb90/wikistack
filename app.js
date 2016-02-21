var express = require('express');
var morgan = require('morgan');
var app = express();
var swig = require('swig'); //templating engine
require('./filters')(swig);
var path = require('path');
var bodyParser = require('body-parser');
var wikiRouter = require('./routes/wiki.js');

var models = require('./models/');
var Page = models.Page; 
var User = models.User; 

app.use(morgan('dev')); //logging middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/wiki', wikiRouter);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine','html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache:false}); //Since we're developing and refreshing browser constantly

app.get('/', function(req,res){
	Page.find()
	.then(function(pages){
		res.render('index',{pages:pages})
	});
});

app.listen(3000, function(){
	console.log("I'm listening at port 3000");
});

