var Bookshelf = require('../lib/connectMySQL');

// Tag model
var Tag = Bookshelf.Model.extend({
    tableName: 'tags',
    posts: function () {
        return this.belongsToMany(Post);
    }
});

// Tags Collections
var Tags = Bookshelf.Collection.extend({
    model: Tag
});

module.exports.tag = Tag;
module.exports.tags = Tags;