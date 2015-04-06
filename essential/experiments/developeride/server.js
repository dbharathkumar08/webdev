var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());                             // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded
app.use(multer());                                      // for parsing multipart/form-data



//---------------------------EXP1: Developer App----------------------------------------
app.put("/developer/:index", function (req, res) {

    var idx = req.params.index;
    developers[idx] = req.body;
    res.json(developers);
});

app.get("/developer", function (req, res) {
    res.json(developers);
});

app.get("/developer/:index", function (req, res) {
    var idx = req.params.index;
    res.json(developers[idx]);
});

app.delete("/developer/:index", function (req, res) {
    var idx = req.params.index;
    developers.splice(idx, 1);
    res.json(developers);
});

app.post("/developer", function (req, res) {
    var obj = req.body;
    developers.push(obj);
    res.json(developers);

});



var developers = [
    { name: "alice", lang: "java", experience: "2 years" },
    { name: "abc", lang: "c", experience: "5 years" },
    { name: "xyz", lang: "c++", experience: "4 years" },
    { name: "pqr", lang: "python", experience: "1 years" },
    { name: "def", lang: "javascript", experience: "1 years" },
    { name: "hij", lang: "nodejs", experience: "0.5 years" },
]
//----------------------------------------------------EXP-2: User Login------------------------------------------------
var users = [
       { username: "isha", password: "isha", email: "shah.is@husky.neu.edu", firstName: "Isha", lastName: "Shah", photo: "" },
       { username: "admin", password: "admin", email: "admin@gmail.com", firstName: "Admin", lastName: "Admin", photo: "" }
];
app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var currentUser = null;

    for (var index in users) {
        if (users[index].username == username && users[index].password == password) {
            currentUser = users[index];
        }
    }
    res.json(currentUser);
});


//-----------------------------------------------EXP-3: User Profile Edit---------------------------------------------------
app.post('/update', function (req, res) {

    var user = req.body;
    var currentUser = null;

    for (var index in users) {
        if (users[index].username == user.username) {
            users[index].firstName = user.firstName;
            users[index].lastName = user.lastName;
            users[index].email = user.email;
            users[index].password = user.password;
            users[index].photo = user.photo;
            currentUser = users[index];
        }
    }

    res.json(currentUser);
});
//-----------------------------------------------------EXP-4: Upload Photo----------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------------------
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);