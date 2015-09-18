/**
 * Created by aashish on 18/8/15.
 */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var mongo = require('../mongo');
var db = mongo();

module.exports = function() {

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
            console.log(email+""+password);

            db.userData.findOne({emailid:email},function (err, user) {

             if(err)
             return done(err);

                if (!user) {
                    return done(null, false, {message: 'Unknown user'});
                }

                if (user.password != password) {
                    return done(null, false, {message: 'Invalid password'});
                }

                return done(null, user);
           });

        }));

};