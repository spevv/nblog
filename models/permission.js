var Bookshelf = require('../lib/connectMySQL');
//var Post = require('./post');

// Permission model
var Permission = Bookshelf.Model.extend({
    tableName: 'permissions' /*,
    posts: function () {
        return this.belongsToMany(Post);
    }*/
});

// Permission Collections
var Permissions = Bookshelf.Collection.extend({
    model: Permission
});

module.exports.permission = Bookshelf.model('Permission', Permission);
module.exports.permissions = Permissions;
