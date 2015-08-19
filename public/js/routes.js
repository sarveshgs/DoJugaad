// app/routes.js
module.exports = function(app, passport,db) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================

    app.get('/', function(req, res) {
        res.render('index.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });


    app.get('/data', function(req, res){
        res.json(req.user);
    });


    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the local login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the social login

    //Facebook
    app.get('/auth/facebook', passport.authenticate('facebook', {
            scope: ['read_stream', 'publish_actions']
        }
    ));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/login',
        successRedirect: '/'
    }));

    //Google
    app.get('/auth/google',passport.authenticate('google', { scope:
                [ 'https://www.googleapis.com/auth/plus.login',
                    , 'https://www.googleapis.com/auth/plus.profile.emails.read' ]
        }
    ));


    app.get( '/auth/google/callback',passport.authenticate( 'google', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));



    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/signup', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SUBMIT SECTION =========================
    // =====================================

    app.get('/jugaad', function(req, res) {
        res.render('submit.ejs', {
            user : req.user, // get the user out of session and pass to template
            title : 'Ask Jugaad',
            id: 'j'
        });
    });

    /* Database code for inserting posts */
    app.post('/posts', function (req, res) {

        var svc = req.body;
        console.log(svc);

        db.postData.insert(req.body, function (err, doc) {
            res.json(doc);
        });

    });

    app.get('/idea', function(req, res) {
        res.render('submit.ejs', {
            user : req.user, // get the user out of session and pass to template
            title : 'Submit Idea',
            id: 'i'
        });
    });

    app.get('/product', function(req, res) {
        res.render('submit.ejs', {
            user : req.user, // get the user out of session and pass to template
            title : 'Submit Product',
            id: 'p'
        });
    });




    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();;
        res.redirect('/');
    });



    /* Getting all data */
    app.get('/posts', function (req, res) {
        console.log('I received a GET request');

        db.postData.find(function (err, docs) {
            console.log(docs);
            res.json(docs);
        });
    });

};






// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


