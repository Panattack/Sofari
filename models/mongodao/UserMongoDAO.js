const UserDAO = require("../dao/UserDAO")
const User = require("../model/User")
const MongoClientConnector = require("../mongodao/MongoClientConnector")

class UserMongoDAO extends UserDAO {

    constructor(){
        super();
        // this.client = client;
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
            .catch(err => {
                console.error(err);
                throw err;
            })
            .finally(() => client.close());
    }
    
    findUserByUsername(username) {
        let collection = this.client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        let user = this.findUser({username: username}, func);
        return user;
    }

    findUserByUsernameAndPassword(username, password) {
        let collection = this.client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        let user = this.findUser({username: username, password: password}, func);
        return user;
    }

    findUserByUsernameAndSessionId(username, sessionId) {
        
    }

    delete(user) {
        
    }

    save(user) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        let fetchedUser = this.findUser(client, {username: user.getUsername, password: user.getPassword}, func);
        // if (fetchedUser !== null){
        //     this.client.connect().then(() => {
        //             let collection = client.db("Sofari").collection("User");
        //             collection.insertOne({username: fetchedUser.getUsername, password: fetchedUser.getPassword})
        //         }
        //         )
        // }
    }
}

module.exports = UserMongoDAO;