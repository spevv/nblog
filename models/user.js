var Bookshelf = require('../lib/connectMySQL');
// User model
var User = Bookshelf.Model.extend({
    tableName: 'users'
});
// Users Collections
var Users = Bookshelf.Collection.extend({
    model: User
});

module.exports.user = User;
module.exports.users = Users;