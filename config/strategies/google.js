/**
 * Created by aashish on 18/8/15.
 */
var passport = require('passport'),
    config = require('../config'),
    GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

var mongo = require('../mongo');
var db = mongo();

module.exports = function() {


    passport.use('google',new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL,
            passReqToCallback: true
        },
        function(request, accessToken, refreshToken, profile, done) {
            //console.log(profile);
            var email=null;

            if(profile.emails[0].value!=undefined||profile.emails[0].value!=null){
                email = profile.emails[0].value;
            }

            db.userData.findOne({profileid:profile.id},function (err, user) {

                if(err)
                    return done(err);

                if (!user) {
                    var User = {
                        "profileid" : profile.id,
                        "name": profile.name.givenName,
                        "fullname":profile.name.givenName+' '+profile.name.familyName,
                        "emailid" : email,
                        "password": null,
                        "gender":profile.gender,
                        "googlephotourl" : profile.photos[0].value,
                        "facebookphotourl" : null,
                        "facebookConected" : false,
                        "googleConnected" : true,
                        "avatar":null
                    };
                    console.log('No such User found');
                    db.userData.insert(User,function(err, value){
                        if(err){
                            console.log("Some error occured while insertion\n");
                        }
                    });
                    return done(null,User);
                }
                else{
                   return done(null,user);
                }


            });
        }));

};


