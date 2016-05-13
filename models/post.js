var Bookshelf = require('../lib/connectMySQL');
var Category = require('./category').category;
var Categories = require('./category').categories;
var User = require('./user').user;
var Tag = require('./tag').tag;

// Post model
var Post = Bookshelf.Model.extend({
    tableName: 'posts',
    hasTimestamps: true,
    categories: function () {
        return this.belongsTo('Category', 'category_id');
    },
    tags: function () {
        return this.belongsToMany('Tag');
    },
    author: function () {
        return this.belongsTo('User');
    }
});

// Posts Collections
var Posts = Bookshelf.Collection.extend({
    model: Post
});

module.exports.post = Bookshelf.model('Post', Post);
module.exports.posts = Bookshelf.collection('Posts', Posts);