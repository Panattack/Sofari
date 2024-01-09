const express = require('express')
const path = require('path')
const app = express()
const port = 8080

const Initializer = require('./models/dao/Initializer')
const AuthenticationService = require('./models/services/AuthenticationService');
const FavoriteService = require('./models/services/FavoriteService');

// Read from the third argument and onwards
/* 
    factoryPath : "../memorydao/MemoryDAOFactory" or "../mongodao/MongoDAOFactory"
    username : "" or "sofari"
    password : "" or "qwerty1234567"
    host : "" or "sofari.7brfe1w.mongodb.net/"
*/
const args = process.argv.slice(2);
const initializer = new Initializer(args[0], args[1], args[2], args[3]);
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


app.post('/ls', function (req, res) {

    const { username, password } = req.body;
    const result = AuthenticationService.authenticate(username, password);
    result
        .then(sessionId => {
            if (sessionId !== null) {
                res.status(200).send({ "sessionId": sessionId });
            }
            else {
                /*
                The HyperText Transfer Protocol (HTTP) 401 Unauthorized response status code indicates 
                that the client request has not been completed because it lacks valid authentication credentials 
                for the requested resource.
                */
                res.status(401).send();
            }
        })
})

app.post('/afs', function (req, res) {
    const { username, sessionId, id, title, desc, cost, img } = req.body;
    const result = FavoriteService.addToFavorites(username, sessionId, { id, title, desc, cost, img });

    result
        .then(message => {
            res.status(200).send(message);
        })
        .catch(error => {
            res.status(error.getStatus).send(error.message);
        })
});

app.get('/frs', function (req, res) {
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
