var Bookshelf = require('../lib/connectMySQL');

// Post model
var Post = Bookshelf.Model.extend({
    tableName: 'posts',
    hasTimestamps: true,
    category: function () {
        return this.belongsTo(Category, 'category_id');
    },
    tags: function () {
        return this.belongsToMany(Tag);
    },
    author: function () {
        return this.belongsTo(User);
    }
});

// Posts Collections
var Posts = Bookshelf.Collection.extend({
    model: Post
});

module.exports.post = Post;
module.exports.posts = Posts;