const express = require('express')
const path = require('path')
const app = express()
const port = 8080

const MemoryInitializer = require('./models/memorydao/MemoryInitializer')
const AuthenticationService = require('./models/services/AuthenticationService');
const FavoriteService = require('./models/services/FavoritesService');
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
    const { username, sessionId, id, title, description, cost, imageUrl } = req.body;
    try {
        const result = FavoriteService.addToFavorites(username, sessionId, { id, title, description, cost, imageUrl });
        res.status(200).send(result);
    } catch (error) {
        res.status(409).send(error.message);
    }
});

app.get('/frs', function (req, res) {
    const { username, sessionId } = req.query;
    try {
        const result = FavoriteService.retrieveFavorites(username, sessionId);
        res.status(200).send(result);
    } catch (error) {
        res.status(401).send(error.message);
    }
});

// app.post('/afs', function (req, res) {

//     let body = req.body;
//     let user = initializer.getUserDAO.findUserByUsernameAndSessionId(body.username, body.sessionId);
    
//     console.log(user);
//     if (user === undefined) {
//         res.status(401).send();
//     } else {
//         let bucket = initializer.getFavoriteBucketDAO.findFavoritesByUser(user);
//         let advertisement = new Advertisement(body.id, body.title, body.description, body.cost, body.imageUrl);

//         if (bucket === undefined) {
//             // First time adding an advertisement
//             let favorite = new FavoriteBucket(user);
//             favorite.addToFavorites(advertisement);
//             initializer.getFavoriteBucketDAO.save(favorite);
//         } else {
//             try {
//                 bucket.addToFavorites(advertisement);
//                 // If the operation is successful and no error is thrown
//                 res.status(200).send("Operation successful");
//             } catch (error) {
//                 // If an error occurs
//                 console.error("Error:", error);
//                 res.status(409).send("Conflict: Error finding favorites");
//             }
//         }
        
//     }
//     console.log("ok");
// })

// app.get('/frs', function (req, res) {

//     let user = initializer.getUserDAO.findUserByUsernameAndSessionId(req.query.username, req.query.sessionId);

//     if (user === undefined) {
//         res.status(401).send();
//     } else {
//         let bucket = initializer.getFavoriteBucketDAO.findFavoritesByUser(user);
        
//         listOfAdvertisements = JSON.stringify(bucket);
//         res.status(200).send(listOfAdvertisements);
//     }
// })
