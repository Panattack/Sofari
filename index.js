const express = require('express')
const path = require('path')
const app = express()
const port = 8080

const MemoryInitializer = require('./models/memorydao/MemoryInitializer')
const AuthenticationService = require('./models/services/AuthenticationService');
const FavoriteService = require('./models/services/FavoriteService');
const initializer = new MemoryInitializer();
initializer.prepareData()

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

    if (result) {
        res.status(200).send({ "sessionId": result.sessionId });
    } else {
        /*
            The HyperText Transfer Protocol (HTTP) 401 Unauthorized response status code indicates 
            that the client request has not been completed because it lacks valid authentication credentials 
            for the requested resource.
        */
        res.status(401).send();

    }
})

app.post('/afs', function (req, res) {
    const { username, sessionId, id, title, desc, cost, img } = req.body;
    
    try {
        const result = FavoriteService.addToFavorites(username, sessionId, { id, title, desc, cost, img });
        res.status(200).send(result);
    } catch (error) {
        res.status(error.getStatus).send(error.message);
    }
});

app.get('/frs', function (req, res) {
    const { username, sessionId } = req.query;
    try {
        const result = FavoriteService.retrieveFavorites(username, sessionId);
        res.status(200).send(result);
    } catch (error) {
        res.status(error.getStatus).send(error.message);
    }
});
