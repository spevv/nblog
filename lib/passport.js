// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
// load up the user model
var User = require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {

        User.user.forge({id: id})
            .fetch({withRelated: ['permissions']}) //{withRelated: ['permission']}
            .then(function (user) {
                //console.log(user);
                if (!user) {
                    done(true, null);
                    //res.status(404).json({error: true, data: {}});
                }
                else {

                    // TODO create new sort permissions. Create new method
                    console.log(user.related('permissions').toJSON()[0].name);
                    if(user.related('permissions').toJSON()[0])
                    {
                        user.role = user.related('permissions').toJSON()[0].name;
                    }

                    done(null, user);
                }
            })
            .catch(function (err) {

                done(err, null);
            });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.user.forge({email: email})
                    .fetch()
                    .then(function (user) {
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        } else {

                            // if there is no user with that email
                            // create the user
                            User.user.forge({
                                    name: req.body.name,
                                    email: email,
                                    password: User.generateHash(password)
                                })
                                .save()
                                .then(function (user) {
                                    return done(null, user);
                                })
                                .catch(function (err) {
                                    throw err;
                                });
                        }
                    })
                    .catch(function (err) {
                        done(err, null);
                    });
            });
        }));
    

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            console.log('--login--');
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.user.forge({email: email})
                .fetch({withRelated: ['permissions']})
                .then(function (user) {
                    //console.log(user);
                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                    // if the user is found but the password is wrong
                     if (!User.validPassword(password, user.attributes.password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                    // TODO create new sort permissions. Create new method
                   // console.log(user.related('permissions').toJSON()[0].name);
                    if(user.related('permissions').toJSON()[0])
                    {
                        user.role = user.related('permissions').toJSON()[0].name;
                    }

                    return done(null, user);

                })
                .catch(function (err) {
                    return done(err);
                });

        }));

};