var Bookshelf = require('../lib/connectMySQL');
//var Post = require('./post').post;

// Tag model
var Tag = Bookshelf.Model.extend({
    tableName: 'tags',
    posts: function () {
        return this.belongsToMany('Post');
    }
});

// Tags Collections
var Tags = Bookshelf.Collection.extend({
    model: Tag
});

module.exports.tag = Bookshelf.model('Tag', Tag);
module.exports.tags = Bookshelf.collection('Tags', Tags);