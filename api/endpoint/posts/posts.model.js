//No spec for the model (technically not a model!!!)
//refer to post.model as to why there isnt a spec
//comment block dependency :D

var mongoose = require('mongoose'),
        
    // Just need a reference to query no point recreating the model
    // But it creates a dependency on the post model
    // Need to get access to the model without requiring post.model
    model = require('../post/post.model').model;

//query to get 20 posts that were written by {{ author }}
// sorted by views count descending
// returns author, title, views and created
var byAuthorPopularity = function(author, callback){
    var query = 
        model.where({ name: author })
             .sort('-views')
             .limit(20)
             .select('author title views created')
             .exec(callback);
};

//query to get 20 posts sorted by views count descending
// returns author, title, views and created
var byViewsPopularity = function(callback){
    var query = 
        model.find()
             .sort('-views')
             .limit(20)
             .select('author title views created')
             .exec(callback);
};

//query to get 20 posts sorted by date descending
// returns author, title, views and created
var byLatest = function(callback){
    var query = 
        model.find()
             .sort('-created')
             .limit(20)
             .select('author title views created')
             .exec(callback);
};

module.exports = {
    byAuthorPopularity : byAuthorPopularity,
    byViewsPopularity : byViewsPopularity,
    byLatest : byLatest,
};