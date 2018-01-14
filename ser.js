//var http = require('http');
//var fs = require('fs');
var express = require('express');
var app = express();
var fs = require('fs');

var router = express.Router();

app.use(express.static('public'));

app.get('/',function(req,res){
	res.sendFile(__dirname+'/dragdrop.html');
});

app.get('/newform/:formname/:formcontent',function(req,res){
	var formname = req.params.formname;
	var formcontent = req.params.formcontent;

	console.log(req.url);
	//console.log(formcontent);
	fs.writeFile('forms/'+formname+'.txt', formcontent, function (err) {
	  	if (err) throw err;
	 	console.log('Saved forms!');
	});

	fs.appendFile('formNames/formnames.txt',formname, function (err) {
		if (err) throw err;
		console.log('Updated formnames!');
	});
});


app.listen(3000,function(){
	console.log('listenning port 3000!');
});

app.get('/Customerforms',function(req,res){
	res.sendFile(__dirname+'/customf.html');
});


app.post('/Customerforms/:formname',function(req,res){
	var formname = req.params.formname;
	//res.sendFile(__dirname+'/forms/'+req.params.formname+'.txt');

	var output = read('forms/'+formname+'.txt', function(data) {
	    console.log("data got from "+formname);
	    res.write(data);
	    res.end();
	    console.log("response ended!")
	});
});

app.get('/Customerforms/:formname',function(req,res){
	var formname = req.params.formname;
	//res.sendFile(__dirname+'/forms/'+req.params.formname+'.txt');

	var output = read('forms/'+formname+'.txt', function(data) {
	    console.log("data got from "+formname);
	    res.setHeader("Content-Type", "text/json");
	    res.write(data);
	    res.end();
	    console.log("response ended!")
	});
});


function read(file, callback) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);

    });
}

