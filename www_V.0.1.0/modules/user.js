
/*
 * GET users listing.
 */
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
        Todo.count({username:req.body.username}, function(err, doc){
            if(doc == 0){
                Todo.create({
                    fullname: req.body.fullname,
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                }, function(err,todo){
                    if(err) {
                        res.render('result', {title: 'Registry Err 01 :' ,result : err});
                        
                    }else{
                        res.render('result', { title: 'Registry' ,result : 'Sucessfull.'});
                        
                    };
                });
            }else{
                res.render('message', { title: 'Existed user name' ,result : 'Internal Server Error<br>'+err.message});
            }
        });
        
    }catch(ex) {
        res.render('result', {title: 'Registry Err 02 :' ,result : ex});
    }
};


exports.login_temp = function(req, res){
  res.render('login_form', { title: 'Login' });
};


exports.login = function(req, res){
    try{
        Todo.count({username:req.body.username, password: req.body.password}, function(err, doc){
            if(doc == 0){
                res.render('result', { title: 'Login' ,result : 'Wrong password or username.'});
               // res.redirect("/login");
            }else{
                res.render('result', { title: 'Login' ,result :'Welcome '+doc.fullname});
               //res.redirect("/weather");
            }
        });
    }catch(ex) {
        res.render('result', {title: 'Registry Err 02 :' ,result : ex});
    }
};