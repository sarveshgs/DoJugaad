var passport = require('passport');

module.exports = function(db) {


    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');
        //console.log(user);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        //db.userData.findOne({_id: id}, function (err, user) {
          //  console.log('deserializing user:',user);
            done(null, user);
        //});
    });

    require('./strategies/local.js')();
    require('./strategies/facebook.js')();
    require('./strategies/google.js')();
};


