
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

var searchSchema = new mongoose.Schema({
    search: String,
    content: Object,
    updated_at: String,
});

var Todo = mongoose.model('searches', searchSchema);



exports.weather = function(req, res){
  res.render('weather', {title:'Weather', value: '' });
};

