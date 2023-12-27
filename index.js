const express = require('express')
const path = require('path')
const app = express()
const port = 8080

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

    const usersList = JSON.parse(users);

    if (usersList.some(user => user.username === username && user.password === password)) {
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

    let id = req.body.id;

    res.status(200).send({ "id": "1" })

})



var users = `[
    {
        "username": "user1",
        "password": "Pass@123"
    },
    {
        "username": "john_doe",
        "password": "Secret_456"
    },
    {
        "username": "alice_007",
        "password": "$SecurePass!"
    },
    {
        "username": "test_user",
        "password": "MyP@ssword123"
    },
    {
        "username": "admin",
        "password": "Adm1n_P@ss"
    },
    {
        "username": "user123",
        "password": "P@ssw0rd789"
    },
    {
        "username": "demo_user",
        "password": "&DemoPass*2022"
    },
    {
        "username": "example",
        "password": "%Pass1234@"
    }
]`