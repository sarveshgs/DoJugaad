// app/routes.js
module.exports = function(app, passport,db,mongojs) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================

    app.get('/', function(req, res) {
        res.render('index.ejs', {
            data : req.user, // get the user out of session and pass to template
            message:null
        });
    });


    app.get('/data', function(req, res){
      var msg=null;
        if(req.session.posted){
            msg = 'posted';
        }
        res.json({'data':req.user,'message':msg});
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
            data : req.user, // get the user out of session and pass to template
            title : 'Ask Jugaad',
            id: 'j'
        });
    });




    /* Database code for inserting posts */
    app.post('/posts', function (req, res) {

        var svc = req.body;
        console.log(svc);
        req.session.posted = true;
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


    // =======================================
    // ADMIN =================================
    // =======================================
    app.get('/admin',function(req, res){
        res.render('admin_index.ejs');
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();;
        res.redirect('/');
    });



    /* Getting all post data */
    app.get('/posts', function (req, res) {
        console.log('I received a GET request');

        db.postData.find(function (err, docs) {
            //console.log(docs);
            res.json(docs);
        });
    });

    /* Getting all users data */
    app.get('/users', function (req, res) {
        console.log('I received a GET request');

        db.userData.find(function (err, docs) {
            //console.log(docs);
            res.json(docs);
        });
    });



    app.get('/check', function(req,res){
        if(req.isAuthenticated()){
            res.json({'connected':true,'uid':req.user._id});
          }

        res.send(false);
    });




    /*Deleting Post data*/
    app.delete("/posts/:id", function (req, res) {
        var anID = req.params.id;

        db.postData.remove({_id : mongojs.ObjectId(anID)},
            function (err, doc){
                res.json(doc);
            });
        //res.json(anID);
    });

    /*Deleting User data*/
    app.delete("/users/:id", function (req, res) {
        var anID = req.params.id;

        db.userData.remove({_id : mongojs.ObjectId(anID)},
            function (err, doc){
                res.json(doc);
            });
    });




};/* End of module */






// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


