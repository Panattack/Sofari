const UserDAO = require("../dao/UserDAO")
const User = require("../model/User")
const MongoClientConnector = require("../mongodao/MongoClientConnector")

class UserMongoDAO extends UserDAO {

    findAll() {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("User");
        let func = collection.find.bind(collection);
        return this._findUser(client, {}, func);
    }

    findUserByUsername(username) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        return this._findUser(client, { username: username }, func);
    }

    findUserByUsernameAndPassword(username, password) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        return this._findUser(client, { username: username, password: password }, func);
    }

    findUserByUsernameAndSessionId(username, sessionId) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        return this._findUser(client, { username: username, sessionId: sessionId }, func);
    }

    delete(user) {

    }

    save(user) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("User");

        return client
            .connect()
            .then(() => {

                return collection.insertOne(user);
            })
            .then(res => {
                if (res.acknowledged) {
                    let documentId = res.insertedId
                    console.log(`Created document ${documentId}`)
                }
                return res.acknowledged;
            })
            .catch(err => console.log(err))
            .finally(() => client.close())
    }

    update(username, password, sessionId) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("User");

        return client
            .connect()
            .then(() => {
                let filter = {
                    username: username,
                    password: password
                }
                let update = {
                    $set: {
                        sessionId: sessionId
                    }
                }
                return collection.updateOne(filter, update);
            })
            .then(res => {
                if (res.acknowledged) {
                    let count = res.matchedCount;
                    console.log(`Updated ${count} documents`)
                }
                return res.matchedCount > 0;
            })
            .catch(err => console.log(err))
            .finally(() => client.close())
    }

    /*
    * Returns Promise. If any users were found, the object returned with the Promise is a list of User objects, 
    * otherwise it is the empty list ([])
    */
    _findUser(client, query, func) {
        return client.connect()
            .then(() => {
                const options = {
                    projection: {
                        _id: 0,
                        username: 1,
                        password: 1,
                        sessionId: 1
                    }
                };
                let result = func(query, options);
                return result instanceof Promise ? result : result.toArray();
            })
            .then(users => {
                if (!(users instanceof Array)) {
                    users = users === null ? [] : [users];
                }

                let usersRes = new Array();
                users.forEach(fetchedUser => {
                    const user = new User(fetchedUser.username, fetchedUser.password);
                    user.setSessionId = fetchedUser.sessionId;
                    usersRes.push(user)
                });

                return usersRes;
            })
            .catch((err) => {
                console.error(err);
                throw err;
            })
            .finally(() => {
                client.close();
            });
    }
}

module.exports = UserMongoDAO;