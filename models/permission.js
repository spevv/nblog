var Bookshelf = require('../lib/connectMySQL');
//var User = require('./user').user;

// Permission model
var Permission = Bookshelf.Model.extend({
    tableName: 'permissions',
    user: function () {
        return this.belongsToMany('User');
    }
});

// Permission Collections
var Permissions = Bookshelf.Collection.extend({
    model: Permission
});

module.exports.permission = Bookshelf.model('Permission', Permission);
module.exports.permissions = Permissions;
