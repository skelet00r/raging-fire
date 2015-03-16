//No spec for the model
//this is where supertest would come into play
//to test an actual endpoint and see if the database returned what was needed
//
//mocking the model function seems pointless because we then fall into testing mongoose itself
//and turn it into test-ception? write some tests to see if tests work?
//http://dilbert.com/strip/2011-03-24
//
//but testing the queries themselves against mock data would be valuable

var mongoose = require('mongoose'),
    //markdown = require( "markdown" ).markdown,
    //sanitizeHtml = require('sanitize-html'),
        
    // these values should be stored in a config.json to allow quick configuration
    // rather than edit the source
    database = mongoose.createConnection('localhost', 'post');

// This does nothing except log that there was an error.
// The public functions shouldnt be exported unless the connection is open
// But its an async call and exporting is sync so that complicates things a bit
// currently left as is and used in 'development mode' as such to tell
// the developer if the connection failed or not
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function (callback) {
  console.log("connected to database");
});

var postSchema = mongoose.Schema({
    title: { type: String, required : true },
    bodyMD: { type: String, required : true },
    //bodyHTMl: { type: String, required : true },
    author: { type: String, required : true },
    created: { type: Date, default : Date.now },
    updated: { type: Date },
    views: { type: Number, default : 0}
});

/*
// removed this. the client can handle to conversion process.
// Less to store and send over the wire
// Ideally the whole thing would be stored and the client would only ever recieve the html
// Unless it was an update then the markdown would be required
// Complete control over what html tag are allowed etc could be done here
// so the server has complete control, but for the scope of this project this added
// another layer of complexity

postSchema.pre('save', function (next) {
  this.bodyHTML = sanitizeHtml( markdown.toHTML(this.bodyMD, 'Maruku') );
  next();
});
*/

var Post = database.model('Post', postSchema);

//save data to be auto generates id
var save = function(data, callback){
    var post = new Post(data);
    post.save(function (err, success) {
        if(err){
            callback(err);
        } else {
            callback(false, success);
        }
    });
};

//The get query gets a post by id and increments the views count
var get = function(id, callback){
    Post.findByIdAndUpdate({ _id: id }, { $inc: { views: 1 } }, function (err, success) {
        if(err){
            callback(err);
        } else {
            callback(false, success);
        }
    });
};

//Update query only updates the bodyMD(markdown body and updated(timestamp)
//could access the _v property and see how many times it was updated
//the $inc function does not touch _v in mongo afaik
var update = function(id, post, callback){
    Post.findByIdAndUpdate({ _id: id }, { $set: { bodyMD: post.bodyMD, updated: post.updated } }, function (err, success) {
        if(err){
            callback(err);
        } else {
            callback(false, success);
        }
    });
};

//find and remove by id
//could set a deleted flag and include a check in the previous calls
var remove = function(id, callback){
    Post.findOneAndRemove({ _id: id }, function (err, success) {
        if(err){
            callback(err);
        } else {
            callback(false, success);
        }
    });
};

module.exports = {
    model : Post,
    save : save,
    get : get,
    update : update,
    remove : remove
};