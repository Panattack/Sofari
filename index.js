const express = require('express')
const path = require('path')
const app = express()
const port = 8080

const MemoryInitializer = require('./models/memorydao/MemoryInitializer')
const initializer = new MemoryInitializer();
initializer.prepareData()

app.listen(port)


const { v4: uuidv4 } = require('uuid');

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

    let username = req.body.username;
    let password = req.body.password;

    let userDAO = initializer.getUserDAO;
    if (userDAO.findUserByUsernameAndPassword(username, password) !== undefined) {
        res.status(200).send({ "sessionId": uuidv4() })
    } else {
        /* 
            The HyperText Transfer Protocol (HTTP) 401 Unauthorized response status code indicates 
            that the client request has not been completed because it lacks valid authentication credentials 
            for the requested resource.
        */
        res.status(401).send()

    }
})


app.post('/afs', function (req, res) {

    let body = req.body;
    res.status(200).send({ "id": id });

})