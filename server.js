#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var mongojs = require('mongojs');
var bodyParser  = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();

var FACEBOOK_APP_ID = "1593285864278038";
var FACEBOOK_APP_SECRET = "a231d50802f4290c76ff4904946aeda5";


var mongodbConnectionString = process.env.OPENSHIFT_MONGODB_DB_URL;

if (typeof mongodbConnectionString == "undefined")
{
    mongodbConnectionString = "dojugaad";
}

var db = mongojs(mongodbConnectionString, ["postData","userData","sessionData"]);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy   = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


/*Facebook Passport Strategy */
passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://www.dojugaad.in/auth/facebook/callback/"
    },
    function(accessToken, refreshToken, profile, done) {

        process.nextTick(function () {

         var email=null;
            db.userData.findOne({profileid:profile.id},function (err, users) {

                if(err){
                }
                else if(!users){
                    console.log("No such user found\n");
                    // Enter a new user in the database.
                   // if(profile.email!=undefined){
                     //   email = profile.email;
                   // }
                    db.userData.insert({
                        "profileid" : profile.id,
                        "name": profile.name.givenName,
                        "emailid" : email,
                        "googlephotourl" : null,
                        "facebookphotourl" : null,
                        "facebookConected" : true,
                        "googleConnected" : false
                    },function(err, value){
                        if(err){
                            console.log("Some error occured while insertion\n");
                        }
                    });

                }
                else{

                    /*db.sessionData.insert({
                        "username":profile.name.givenName
                    },function(err, value){
                        if(err){
                            console.log("Some error occured while insertion\n");
                        }
                    });*/
                    console.log("User exists. entering post to the database\n");
                    //Enter the post in the database.
                }
            });

            return done(null, profile);
        });
    }
));


/*Local Passport Strategy */
passport.use(new LocalStrategy(function(username,password,done){
    console.log(username);
    return done(null,{username:'admin'});
}));



app.use(cookieParser());
app.use(session({ secret: 'dojugaad' }));
app.use(passport.initialize());
app.use(passport.session());



/* Local Signup*/
app.post('/signup', passport.authenticate('local', {
    successRedirect : '/index.html', // redirect to the secure profile section
    failureRedirect : '/login.html#/register', // redirect back to the signup page if there is an error

}));





app.get('/auth/facebook',
    passport.authenticate('facebook', {  scope: ['read_stream', 'publish_actions']  }));




app.get('/auth/facebook/callback/',
    passport.authenticate('facebook', { failureRedirect: '/login.html' }),
    function(req, res) {
        console.log(req.session.lastPage);
        var lpage = req.session.lastPage;
        if(lpage == 'submit'){
        res.redirect('/submit.html#/');
        }
        else{
           res.redirect('/index.html');
        }

    });


app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


// test authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}



//======================================================================================================================
//                                  Page Status
//======================================================================================================================

app.get('/status', ensureAuthenticated, function(req, res){
    console.log(req.user);
    res.send(req.user);
});




//======================================================================================================================
//                                  Last Page id
//======================================================================================================================

app.get('/page/submit',function(req,res){
    if(req.session.lastPage) {
        res.write('Last page was: ' + req.session.lastPage + '. ');
    }

    req.session.lastPage = 'submit';
    res.send('Your Awesome.');

});








//======================================================================================================================
//                                    Post Data
//======================================================================================================================
/* Getting all data */
app.get("/posts", function (req, res) {
    console.log('I received a GET request');

    db.postData.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

/* Database code for inserting posts */
app.post("/posts", function (req, res) {

    var svc = req.body;
    console.log(svc);

    db.postData.insert(req.body, function (err, doc) {
        res.json(doc);
    });

});

app.get("/posts/:id", function (req, res) {
    var anID = req.params.id;
    //console.log(anID);
    db.postData.findOne({_id : mongojs.ObjectId(anID)},
        function (err, doc ) {
            res.json(doc );
        });

});



app.put("/posts/:id", function (req, res) {

    //console.log(req.body);

    //----------------
    var aName = req.body.name;

    db.postData.findAndModify(
        {   // Find the object by ID
            query:
            {
                _id : mongojs.ObjectId(req.params.id)
            },
            update:
            {   // new vals are in req.body, update it's name
                $set:{name: aName}
            },
            // single one
            new: true
        },
        function(err, doc, lastErrorObject)
        {   // respond with new document

            res.json(doc);

        });


});

app.delete("/posts/:id", function (req, res) {
    var anID = req.params.id;
    //console.log(anID.str);
    db.postData.remove({_id : mongojs.ObjectId(anID)},
        function (err, doc){
            res.json(doc);
        });
});
/* ===================================================================================================================== */
/* ===================================================================================================================== */




/* Database code for inserting information */

/* ===================================================================================================================== */
/* ===================================================================================================================== */



app.get('/env',function(req, res){
res.json(process.env);
});


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ipaddress);
