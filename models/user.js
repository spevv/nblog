var bcrypt   = require('bcrypt-nodejs');


var Bookshelf = require('../lib/connectMySQL');
// User model
var User = Bookshelf.Model.extend({
    tableName: 'users',
    permissions: function () {
        return this.belongsToMany('Permission');
    }
});
// Users Collections
var Users = Bookshelf.Collection.extend({
    model: User
});


module.exports.user =  Bookshelf.model('User', User);
module.exports.users = Bookshelf.collection('Users', Users);



// methods ======================
// generating a hash
module.exports.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
module.exports.validPassword = function(password, userPassword) {
     return bcrypt.compareSync(password, userPassword);
};
