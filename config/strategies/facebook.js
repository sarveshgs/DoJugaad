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
            var email,photourl=null;
            var avatar = null;
            //If email is not defined
            if(profile.emails!=undefined||profile.emails!=null){
                   email = profile.emails[0].value;
                }

            //If photourl is not defined
            if(photourl != null){
                avatar = photourl;
            }
            else{
                if(profile.gender=='male')
                avatar = 'images/avatars/male/m1.png';
                else
                avatar = 'images/avatars/female/f3.png';
            }

            process.nextTick(function() {
                db.userData.findOne({profileid: profile.id}, function (err, user) {

                    if (err)
                        return done(err);

                    if (!user) {
                        console.log('No such User found');

                        var User={
                            "profileid": profile.id,
                            "name": profile.name.givenName,
                            "fullname":profile.name.givenName+' '+profile.name.familyName,
                            "emailid": email,
                            "password": null,
                            "gender":profile.gender,
                            "facebookConected": true,
                            "googleConnected": false,
                            "avatar":avatar,
                            "timestamp":new Date().getTime()
                        };
                        db.userData.insert(User, function (err, value) {
                            if (err) {
                                console.log("Some error occured while insertion\n");
                            }
                        });

                        return done(null, User);
                    }
                    else{
                     return done(null,user);
                    }
                });
            });
        }));
};

