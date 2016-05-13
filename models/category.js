var Bookshelf = require('../lib/connectMySQL');
var Post = require('./post').post;
var Posts = require('./post').posts;

// Category model
var Category = Bookshelf.Model.extend({
    tableName: 'categories',
    posts: function () {
        return this.hasMany('Post');
        //return this.hasMany(Posts);
    }
});

// Categories Collections
var Categories = Bookshelf.Collection.extend({
    model: Category
});

module.exports.category = Bookshelf.model('Category', Category);
module.exports.categories = Bookshelf.collection('Categories', Categories);