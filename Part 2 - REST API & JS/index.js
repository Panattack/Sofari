const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

const Initializer = require('./models/dao/Initializer');
const AuthenticationService = require('./models/services/AuthenticationService');
const FavoriteService = require('./models/services/FavoriteService');

// Read from the third argument and onwards
/* 
    username : "" or "sofari"
    password : "" or "qwerty1234567"
    host : "" or "sofari.7brfe1w.mongodb.net/"
*/
const args = process.argv.slice(2);
let initializer;

if (args.length === 0) {
    initializer = new Initializer("../memorydao/MemoryDAOFactory");
} else if (args.length === 3) {
    initializer = new Initializer("../mongodao/MongoDAOFactory", args[0], args[1], args[2]);
} else {
    console.log("You have not provided the required credentials for mongoDB. You need to give the username, password and host.");
    process.exit();
}


initializer.prepareData();

app.listen(port)

/*
    Serve static content from directory "public",
    it will be accessible under path /, 
    e.g. http://localhost:8080/index.html
*/
app.use(express.static('public'))

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function (req, res) {

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function (err) {
        console.log(err)
    })
})

app.post('/login', function (req, res) {

    const { username, password } = req.body;
    const result = AuthenticationService.authenticate(username, password);
    result
        .then(sessionId => {
            if (sessionId !== null) {
                res.status(200).send({ "sessionId": sessionId });
            }
            else {
                res.status(401).send();
            }
        })
        .catch(error => {
            res.status(error.getStatus).send(error.message);
        })
})

app.post('/favourites/add', function (req, res) {
    const { username, sessionId, id, title, desc, cost, img } = req.body;
    const result = FavoriteService.addToFavorites(username, sessionId, { id, title, desc, cost, img });

    result
        .then(ack => {
            res.status(ack).send();
        })
        .catch(error => {
            res.status(error.getStatus).send(error.message);
        })
});

app.get('/favourites/retrieve', function (req, res) {
    const { username, sessionId } = req.query;
    const result = FavoriteService.retrieveFavorites(username, sessionId);

    result
        .then(favoriteList => {
            res.status(200).send(favoriteList);
        })
        .catch(error => {
            res.status(error.getStatus).send(error.message);
        })
});
