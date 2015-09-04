// app/routes.js
module.exports = function(app, passport,db,mongojs) {


    /**
     * Page Rendering/Page path definition goes here
     */

    //==================================================================================================================
    // ==========================================   1. Home Page    ====================================================
    //==================================================================================================================
    app.get('/', function(req, res) {

        res.render('index.ejs', {
            data : req.user, // get the user out of session and pass to template
            message:null
        });
    });


    //==================================================================================================================
    // ==========================================   2. Jugaad Page    ==================================================
    //==================================================================================================================
    app.get('/jugaad', function(req, res) {
        res.render('submit.ejs', {
            data : req.user, // get the user out of session and pass to template
            title : 'Ask Jugaad',
            id: 'j'
        });
    });


    //==================================================================================================================
    // ==========================================   3. Idea Page    ==================================================
    //==================================================================================================================
    app.get('/idea', function(req, res) {
        res.render('submit.ejs', {
            user : req.user, // get the user out of session and pass to template
            title : 'Submit Idea',
            id: 'i'
        });
    });


    //==================================================================================================================
    // ==========================================   3. Product Page    ==================================================
    //==================================================================================================================
    app.get('/product', function(req, res) {
        res.render('submit.ejs', {
            user : req.user, // get the user out of session and pass to template
            title : 'Submit Product',
            id: 'p'
        });
    });


    //==================================================================================================================
    // ==========================================   4. Login Page    ===================================================
    //==================================================================================================================
    app.get('/login', function(req, res) {
      res.render('login.ejs', { message: req.flash('loginMessage') });
    });


    //==================================================================================================================
    // ==========================================   5. Signup Page    ==================================================
    //==================================================================================================================
    app.get('/signup', function(req, res) {
      res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


    //==================================================================================================================
    // ==========================================   6. Admin Page    ===================================================
    //==================================================================================================================
    app.get('/admin',function(req, res){
        res.render('admin_index.ejs');
    });

     app.get('/test',function(req, res){
        res.render('test.ejs');
    });




    /**
     * Login processing will be done here
     */
    //==================================================================================================================
    // ==========================================   1. Local Login    ==================================================
    //==================================================================================================================
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    //==================================================================================================================
    // ==========================================   2. Facebook Login    ===============================================
    //==================================================================================================================
    app.get('/auth/facebook', passport.authenticate('facebook', {
            scope: ['read_stream', 'publish_actions']
        }
    ));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/login',
        successRedirect: '/'
    }));


    //==================================================================================================================
    // ==========================================   3. Google Login    =================================================
    //==================================================================================================================
    app.get('/auth/google',passport.authenticate('google', {
            scope:[ 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read' ]
        }
    ));

    app.get( '/auth/google/callback',passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));



    /**
     * Signup form will be processed here
     */
    app.post('/signup', function(req,res){
        var email = req.body.email;
        var password = req.body.password;
        var gender = req.body.gender;
        var name = req.body.name;
        var avatar = null;

        if(gender=='male') {
            avatar = 'images/avatars/male/m1.png';
        }
        else {
            avatar = 'images/avatars/female/f3.png';
        }

        var User={
            "profileid": null,
            "name": name,
            "fullname":null,
            "emailid": email,
            "password": password,
            "gender":gender,
            "facebookConected": false,
            "googleConnected": false,
            "avatar":avatar,
            "timestamp":new Date().getTime()
        };


        db.userData.insert(User, function (err, doc) {
          res.json(doc);
        });

    });


    /**
     * User Logout function
     */
    app.get('/logout', function(req, res) {
        req.logout();;
        res.redirect('/');
    });


    /**
     * Form processing will be done here
     */
    //==================================================================================================================
    // ==========================================   1. Form Post    ====================================================
    //==================================================================================================================
    app.post('/posts', function (req, res) {

        var svc = req.body;
        req.session.posted = true;
        db.postData.insert(req.body, function (err, doc) {
            res.json(doc);
        });

    });


    //==================================================================================================================
    // ================ 2. Temp Post(When user is not logged in then save the form data)    ============================
    //==================================================================================================================
    app.post('/temp',function(req,res){
        req.session.postData = req.body;
    });


    //==================================================================================================================
    // ==========================================   3. Post Delete    ==================================================
    //==================================================================================================================
    app.delete("/posts/:id", function (req, res) {
        var anID = req.params.id;
        db.postData.remove({_id : mongojs.ObjectId(anID)},
            function (err, doc){
                res.json(doc);
            });

    });


    //==================================================================================================================
    // ==========================================   4. User Delete    ==================================================
    //==================================================================================================================
    app.delete("/users/:id", function (req, res) {
        var anID = req.params.id;

        db.userData.remove({_id : mongojs.ObjectId(anID)},
            function (err, doc){
                res.json(doc);
            });
    });




    /**
     * Data retrieval goes here
     */
    //==================================================================================================================
    // ==========================================   1. Post Data    ====================================================
    //==================================================================================================================
    app.get('/posts', function (req, res) {
        db.postData.find(function (err, docs) {
           res.json(docs);
        });
    });


    //==================================================================================================================
    // ==========================================   2. User Data    ====================================================
    //==================================================================================================================
    app.get('/users', function (req, res) {
        db.userData.find(function (err, docs) {
            res.json(docs);
        });
    });


    //==================================================================================================================
    // ==========================================   3. Internal Data    ====================================================
    //==================================================================================================================
    app.get('/data', function(req, res){
      var msg=null;
        if(req.session.posted){
            msg = 'posted';
        }
         if(req.session.postData){
             console.log(req.session.postData);
         }
        res.json({'data':req.user,'message':msg});
    });






















    app.get('/check', function(req,res){
        if(req.isAuthenticated()){
            res.json({'connected':true,'uid':req.user._id});
          }

        res.send(false);
    });



};



/**
 * Function to check if user is logged in
 */
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


