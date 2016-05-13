
var ConnectRoles = require('connect-roles');


module.exports = function(app) {

    var user = new ConnectRoles({
        failureHandler: function (req, res, action) {
            // optional function to customise code that runs when
            // user fails authorisation
            var accept = req.headers.accept || '';
            res.status(403);
            if (~accept.indexOf('html')) {
                res.render('access-denied', {action: action});
            } else {
                res.send('Access Denied - You don\'t have permission to: ' + action);
            }
        }
    });

    app.use(user.middleware());

//anonymous users can only access the home page
//returning false stops any more rules from being
//considered
    /* user.use(function (req, action) {
     console.log('access home page');
     if (!req.isAuthenticated()) return action === 'access home page';
     });*/

//moderator users can access private page, but
//they might not be the only ones so we don't return
//false if the user isn't a moderator
    user.use('access private page', function (req) {
        console.log('access private page');
        return false;
        /*
         if (req.user.role === 'moderator') {
         return true;
         }*/
    });

    // is admin
    user.use('admin', function (req) {
         if (req.user.role === 'admin') {
         return true;
         }
    });

//admin users can access all pages
    user.use(function (req) {
        console.log('last function');
        console.log(req.user);
        return true;
        /*
         if (req.user.role === 'admin') {
         return true;
         }*/
    });


    return user;
};