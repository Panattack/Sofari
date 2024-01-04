const UserDAO = require("../dao/UserDAO")
const User = require("../model/User")
const MongoClientConnector = require("../mongodao/MongoClientConnector")

class UserMongoDAO extends UserDAO {

    constructor() {
        super();
    }

    findAll() {
        return this.findUser({});
    }

    findUser(client, query, func) {
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

                users.forEach(fetchedUser => {
                    const user = new User(fetchedUser.username, fetchedUser.password);
                    user.setSessionId = fetchedUser.sessionId;
                    fetchedUser = user;
                });

                return users;
            })
            .catch((err) => {
                console.error(err);
                throw err;
            })
            .finally(() => {
                client.close();
            });
    }

    findUserByUsername(username) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        let fetchedUser = this.findUser(client, { username: username }, func);
        return fetchedUser;
    }

    findUserByUsernameAndPassword(username, password) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        let fetchedUser = this.findUser(client, { username: username, password: password }, func);
        return fetchedUser;
    }

    findUserByUsernameAndSessionId(username, sessionId) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        let fetchedUser = this.findUser(client, { username: username, sessionId: sessionId }, func);
        return fetchedUser;
    }

    delete(user) {

    }

    save(user) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("User");

        client
            .connect()
            .then(() => {

                return collection.insertOne(user);
            })
            .then(res => {
                if (res.acknowledged) {
                    let documentId = res.insertedId
                    console.log(`Created document ${documentId}`)
                }
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
                return res;
            })
            .catch(err => console.log(err))
    }
}

module.exports = UserMongoDAO;