'use strict';

var express = require('express');
var app = express(); //creates server
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000; //se on joko environment varialbe, jos se ei olemassa, se laitetaan 3000;

var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

app.set('view engine','ejs'); //ejs on .extension mikä template engine

//Http method = määritteleen toimminnon tyypin requesti haluaa tehä, GET, POST, DELETE jne.., "verbs"
app.post('/', function(req,res)
{
    res.send('<html><body><h1> Post :P <h1></body></html>');
}); //jos on GET, voi olla sama URL jos on POST tai delete

//oma middleware
app.use('/',function(req,res,next)
{
    console.log("request url:" + req.url);
    next(); //ajaa seuraavan middlewaren, eli toisen '/' routen
});

//parsetaan Post url mukaan, ottaa urlencodedParsersin
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

//use middleware express, ainakun nähdään /assets -> menee etsimään full filepath public, ja antaa takaisin
app.use('/assets', express.static(__dirname + '/public')); 


app.get('/person/:id',function(req,res) // asettaa : jälkeen olevan datan variable id:ksi, : on mitä tahansa
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
    //mitä renderöidää views kansiosta, render automaattisesti täyttää objectin mukaan
    //req.params.id on aikaisemmasta getistä
    res.render('index',{ ID: req.params.id   }); 
});

app.get('/',function(req,res)
{
    res.send('<html><head> <link href=assets/style.css type=text/css rel=stylesheet></head<body><h1>Jee<h1></body></html>'); //kun assets käyttää middlware use
});



app.listen(port);