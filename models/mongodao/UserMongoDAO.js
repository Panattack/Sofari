const UserDAO = require("../dao/UserDAO")

class UserMongoDAO extends UserDAO {

    constructor(client){
        this.client = client;
    }

    findAll() {
        return this.findUser({});
    }

    findUser(query, func){
        return client
            .connect()
            .then(() => {
                let collection = client.db("Sofari").collection("User");

                let options = {
                    projection: {
                        _id:0, username: 1, password: 1, sessionId: 1
                    }
                }

                let users = func(query,options).toArray();
                return users;
            }
            )
            .then(users => {
                users.forEach(fetchedUser => {
                    let user = new User(fetchedUser.username, fetchedUser.password);
                    user.setSessionId = fetchedUser.sessionId;
                    fetchedUser = user;
                });
                return users;
            })
            .catch(err => console.log(err))
            .finally(() => client.close())
    }

    findUserByUsername(username) {
        let collection = client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        let user = this.findUser({username: username}, func);
        return user;
    }

    findUserByUsernameAndPassword(username, password) {
        let collection = client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        let user = this.findUser({username: username, password: password}, func);
        return user;
    }

    findUserByUsernameAndSessionId(username, sessionId) {
        
    }

    delete(user) {
        
    }

    save(user) {
        let collection = client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        let user = this.findUser({username: user.getUsername, password: user.getPassword}, func);
        if (user !== null){
            client
                .then(() => {
                    let collection = client.db("Sofari").collection("User");
                    collection.insertOne({username: user.getUsername, password: user.getPassword})
                }
                )
        }
    }
}

module.exports = UserMongoDAO;