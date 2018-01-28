'use strict';

var express = require('express');
var app = express(); //creates server
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000; //Luodaan PORT enviroment variable jos ei ole olemassa ja asetetaan se 3000

var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

app.set('view engine','ejs'); //toka param: mikä engine

app.post('/', function(req,res)
{
    res.send('<html><body><h1> Post :P <h1></body></html>');
}); 


app.use('/',function(req,res,next)
{
    console.log("request url:" + req.url);
    next(); //ajaa seuraavan middlewaren
});

//parsetaan Post url mukaan, urlencodedParser
app.post('/person',urlencodedParser,function(req,res){
    res.send("Thanks!");
    console.log(req.body.firstname);
    console.log(req.body.lastname);
});

app.post('/personjson',jsonParser,function(req,res)
{
    res.send("Thanks for the data :P!");
    console.log(req.body.firstname);
    console.log(req.body.lastname);
});


app.use('/assets', express.static(__dirname + '/public')); 


app.get('/person/:id',function(req,res) 
{
    //query object vaikka url GET, ?qstr=asd
    res.render('person',{ID: req.params.id, Qstr: req.query.qstr});
});


app.get('/api',function(req,res)
{
    res.json({firstname: 'lasse', lastname: 'laukkan'});
});

app.get('/',function(req,res)
{
    //mitä renderöidää views kansiosta
    res.render('index',{ ID: req.params.id   }); 
});

app.get('/',function(req,res)
{
    res.send('<html><head> <link href=assets/style.css type=text/css rel=stylesheet></head<body><h1>Jee<h1></body></html>'); 
});



app.listen(port);