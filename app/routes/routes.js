// app/routes.js
module.exports = function(app, passport,db,mongojs,nodemailer) {


    app.get('/test', function (req,res) {
        res.render('test.ejs');
    })

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
    // ==========================================   2. Submit Page    ====================================================
    //==================================================================================================================
     app.get('/submit', function(req, res) {
        res.render('submit.ejs', {
            data : req.user, // get the user out of session and pass to template
            title: 'Submit'
        });
    });



    //==================================================================================================================
    // ==========================================   3. Jugaad Page    ==================================================
    //==================================================================================================================
    app.get('/jugaad', function(req, res) {
        res.render('base.ejs', {
            data : req.user, // get the user out of session and pass to template
            head : 'Ask Jugaad',
            id: 'j'
        });
    });


    //==================================================================================================================
    // ==========================================   4. Idea Page    ==================================================
    //==================================================================================================================
    app.get('/idea', function(req, res) {
        res.render('base.ejs', {
            data : req.user, // get the user out of session and pass to template
            head : 'Submit Idea',
            id: 'i'
        });
    });


    //==================================================================================================================
    // ==========================================   5. Product Page    ==================================================
    //==================================================================================================================
    app.get('/product', function(req, res) {
        res.render('base.ejs', {
            data : req.user, // get the user out of session and pass to template
            head : 'Submit Product',
            id: 'p'
        });
    });


    //==================================================================================================================
    // ==========================================   6. Login Page    ===================================================
    //==================================================================================================================
    app.get('/login', function(req, res) {
        console.log(req.session.postData);
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });


    //==================================================================================================================
    // ==========================================   7. Signup Page    ==================================================
    //==================================================================================================================
    app.get('/signup', function(req, res) {
      res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


    //==================================================================================================================
    // ==========================================   8. Admin Page    ===================================================
    //==================================================================================================================
    //app.get('/admin',function(req, res){
      //  res.render('admin_index.ejs');
    //});


    //==================================================================================================================
    // ==========================================   9. About Page    ====================================================
    //==================================================================================================================
    app.get('/about', function(req, res) {
        res.render('about.ejs', {
            data : req.user, // get the user out of session and pass to template
        });
    });


    //==================================================================================================================
    // ==========================================   10. FAQ Page    ====================================================
    //==================================================================================================================
    app.get('/faq', function(req, res) {
        res.render('faq.ejs', {
            data : req.user, // get the user out of session and pass to template
        });
    });

    //==================================================================================================================
    // =====================================   11. How It Works Page    ================================================
    //==================================================================================================================
    app.get('/hiw', function(req, res) {
        res.render('hiw.ejs', {
            data : req.user, // get the user out of session and pass to template
        });
    });

    //==================================================================================================================
    // =====================================   12. Successful Post Page    =============================================
    //==================================================================================================================
    app.get('/success', function(req, res) {
        req.session.nextPage = null;
        res.render('success.ejs', {
            data : req.user, // get the user out of session and pass to template
        });
    });

    //==================================================================================================================
    // =====================================   13. Who we are Page    ================================================
    //==================================================================================================================
    app.get('/hwa', function(req, res) {
        res.render('team.ejs', {
            data : req.user, // get the user out of session and pass to template
        });
    });



    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "adroitinnovate@gmail.com",
            pass: "DoJug@@d"
        }
    });

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'aashishkatlam@gmail.com',
            pass: 'Ashrock_1993'
        }
    });


    app.get('/send',function(req,res){


        var mailOptions = {
            from: req.query.from, // sender address
            to: req.query.to, // list of receivers
            subject: 'DoJugaad Query', // Subject line
            text: req.query.text + ' '+ req.query.name + '( '+ req.query.from + ' )', // plaintext body

        };

        console.log(mailOptions);

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
                res.end("error");
            }
            console.log('Message sent: ' + info.response);
            res.end("sent");
        });

    });

    /**
     * Login processing will be done here
     */
    //==================================================================================================================
    // ==========================================   1. Local Login    ==================================================
    //==================================================================================================================
    app.post('/auth/local', passport.authenticate('local-login', {
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }),function(req,res){
          if(req.session.nextPage == 'success'){
              var Data = req.session.postData;
              Data.postUserId = req.user._id;
              db.postData.insert(Data, function (err, doc) {
              });
              res.redirect('/success');
          }
          else{
              res.redirect('/hiw');
          }
    });


    //==================================================================================================================
    // ==========================================   2. Facebook Login    ===============================================
    //==================================================================================================================
    app.get('/auth/facebook', passport.authenticate('facebook', {
            scope: ['read_stream', 'publish_actions']
        }
    ));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/login',
        failureFlash: true
    }),function(req,res){
        if(req.session.nextPage == 'success'){
            var Data = req.session.postData;
            Data.postUserId = req.user._id;
            db.postData.insert(Data, function (err, doc) {
            });
            res.redirect('/success');
        }
        else{
            res.redirect('/hiw');
        }
    });


    //==================================================================================================================
    // ==========================================   3. Google Login    =================================================
    //==================================================================================================================
    app.get('/auth/google',passport.authenticate('google', {
            scope:[ 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read' ]
        }
    ));

    app.get( '/auth/google/callback',passport.authenticate( 'google', {

        failureRedirect: '/login'
    }),function(req,res){
        if(req.session.nextPage == 'success'){
            var Data = req.session.postData;
            Data.postUserId = req.user._id;
            db.postData.insert(Data, function (err, doc) {
            });
            res.redirect('/success');
        }
        else{
            res.redirect('/hiw');
        }
    });



    /**
     * Signup form will be processed here
     */
    app.post('/signup', function(req,res){
        var email = req.body.email;
        var password = req.body.password;
        var gender = req.body.gender;
        var name = req.body.name;
        var avatar = null;
        var id;

        if(gender == 'male') {
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
            "timestamp": Math.floor(Date.now() / 1000)
        };


        db.userData.insert(User, function (err, doc) {
          //res.json(doc);
            id = doc._id;
        });

        req.session.lastPage = 'signup';

        if(req.session.nextPage == 'success'){

                var Data = req.session.postData;
                Data.postUserId = id;
                db.postData.insert(Data, function (err, doc) {
                });

           res.send('success');
        }
        else{
            res.send('continue');
        }
    });


    /**
     * User Logout function
     */
    app.get('/logout', function(req, res) {
        req.logout();;
        res.redirect('/');
    });



    app.get('/t',function(req,res){

        if(req.session.lastPage == 'signup'){
            req.session.lastPage = null;
            res.send('y');
        }
        else{
            res.send('n');
        }
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
        req.session.nextPage = 'success';
        res.send('Data Saved');
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


