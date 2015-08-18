var passport = require('passport'),
    config = require('../config'),
    FacebookStrategy = require('passport-facebook').Strategy;
var mongo = require('../mongo');
var db = mongo();

module.exports = function() {

    passport.use('facebook',new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            //console.log(profile);
            var email=null;

             if(profile.emails!=undefined||profile.emails!=null){
                   email = profile.emails[0].value;
                }

            process.nextTick(function() {
                db.userData.findOne({profileid: profile.id}, function (err, user) {

                    if (err)
                        return done(err);

                    if (!user) {
                        console.log('No such User found');
                        db.userData.insert({
                            "profileid": profile.id,
                            "name": profile.name.givenName,
                            "emailid": email,
                            "password": null,
                            "googlephotourl": null,
                            "facebookphotourl": null,
                            "facebookConected": true,
                            "googleConnected": false
                        }, function (err, value) {
                            if (err) {
                                console.log("Some error occured while insertion\n");
                            }
                        });

                    }

                    return done(null, profile);
                });
            });

        }));

};

