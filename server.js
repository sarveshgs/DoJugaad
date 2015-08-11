#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var mongojs = require('mongojs');
var bodyParser  = require('body-parser');
var app = express();

var mongodbConnectionString = process.env.OPENSHIFT_MONGODB_DB_URL;

if (typeof mongodbConnectionString == "undefined")
{
    mongodbConnectionString = "dojugaad";
}

var db = mongojs(mongodbConnectionString, ["postData","userData"]);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


//----------------------------------------------------


//app.get("/serviceClients", function (req, res) {

    // var svc1 = {
    //     name : "LinkedIn"
    // };

    // var svc2 = {
    //     name : "IMDB"
    // };

    // var svc3 = {
    //     name : "Google"
    // };

    // var service_Clients = [svc1, svc2, svc3];

    // res.json(service_Clients);
    // res.json([]);
  //  db.serviceData.find(function (err, docs) {
        //res.json(docs);
   // });
//});



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
app.post("/info", function (req, res) {

    var svc = req.body;
    console.log(svc);

    db.userData.insert(req.body, function (err, doc) {
        res.json(doc);
    });

});

app.get("/info/:id", function (req, res) {
    var anID = req.params.id;
    //console.log(anID);
    db.userData.findOne({_id : mongojs.ObjectId(anID)},
        function (err, doc ) {
            res.json(doc );
        });

});



app.put("/info/:id", function (req, res) {

    //console.log(req.body);

    //----------------
    var aName = req.body.name;

    db.userData.findAndModify(
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
    //----------------

});

app.delete("/info/:id", function (req, res) {
    var anID = req.params.id;
    //console.log(anID.str);
    db.userData.remove({_id : mongojs.ObjectId(anID)},
        function (err, doc){
            res.json(doc);
        });
});
/* ===================================================================================================================== */
/* ===================================================================================================================== */


app.get('/env',function(req, res){

    res.json(process.env);
});


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ipaddress);