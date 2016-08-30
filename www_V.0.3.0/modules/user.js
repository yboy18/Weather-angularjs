
/*
 * GET users listing.
 */
 var express = require('express');
//var routes = require('./routes');

var app = express();
app.set('view engine', 'ejs');

var mongoose = require("mongoose");
mongoose.connect('mongodb://Ak47api:Ak47api569@ds161295.mlab.com:61295/nodejs-api', function(err){
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var usersSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    password: String,
    email: String,
    sdate: {type:Date, default: Date.now},
});

var Todo = mongoose.model('users', usersSchema);

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.registration = function(req, res){
  res.render('registration_form', { title: 'Registration' });
};

exports.registry = function(req,res){
    try{
        if(req.body.fullname ==''){
            res.render('message', { title: 'Registry' ,result : 'Fullname can not empty.'});
        }else if(req.body.username ==''){
            res.render('message', { title: 'Registry' ,result : 'User name can not empty.'});
        }else if(req.body.password ==''){
            res.render('message', { title: 'Registry' ,result : 'Password can not empty.'});
        }else if(req.body.email ==''){
            res.render('message', { title: 'Registry' ,result : 'Email can not empty.'});
        }else{
            Todo.count({username:req.body.username}, function(err, doc){
                if(doc == 0){
                    Todo.create({
                        fullname: req.body.fullname,
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email
                    }, function(err,todo){
                        if(err) {
                            res.render('message', {title: 'Registry Err 01 :' ,result : 'Err'});
                            
                        }else{
                            res.render('message', { title: 'Registry' ,result : 'Sucessfull.'});
                            
                        };
                    });
                }else{
                    res.render('message', { title: 'Registry' ,result : 'Existed username. Please try another username. '});
                }
            });
        }
        
    }catch(ex) {
        res.render('message', {title: 'Registry Err 02 :' ,result : ex});
    }
};


exports.login_temp = function(req, res){
  res.render('login_form', { title: 'Login' });
};


exports.login = function(req, res){
    try{
        //Todo.count({username:req.body.username, password: req.body.password}, function(err, doc){
        Todo.find({username:req.body.username, password: req.body.password}, function(err, doc){
            if(doc == ''){
                res.render('message', { title: 'Login' ,result : 'Wrong password or username.'});
               // res.redirect("/login");
            }else{
                res.render('message', { title: 'Login' ,result :'Welcome '+doc[0].fullname});
               //res.redirect("/weather");
            }
        });
    }catch(ex) {
        res.render('message', {title: 'Registry Err 02 :' ,result : ex});
    }
};