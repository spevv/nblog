var bcrypt   = require('bcrypt-nodejs');


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



// methods ======================
// generating a hash
module.exports.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
module.exports.validPassword = function(password, userPassword) {
     return bcrypt.compareSync(password, userPassword);
};



module.exports.findById = function(id, cb) {
    User.forge({id: id})
        .fetch()
        .then(function (user) {
            if (!user) {
                return cb(true, null);
                //res.status(404).json({error: true, data: {}});
            }
            else {
                return cb(null, user);
                //res.json({error: false, data: user.toJSON()});
            }
        })
        .catch(function (err) {
            return cb(err, null);
           // res.status(500).json({error: true, data: {message: err.message}});
        });
};

