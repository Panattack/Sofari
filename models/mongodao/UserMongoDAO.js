const UserDAO = require("../dao/UserDAO")
const User = require("../model/User")

class UserMongoDAO extends UserDAO {

    constructor(client){
        super();
        this.client = client;
    }

    findAll() {
        return this.findUser({});
    }

    findUser(query, func){
        // console.log(this.client)
        this.client
            .connect()
            .then(() => {
                let collection = this.client.db("Sofari").collection("User");

                let options = {
                    projection: {
                        _id:0, username: 1, password: 1, sessionId: 1
                    }
                }
                let users = collection.find(query,options);
                return users;
            }
            )
            // .then(users => {
            //     users.forEach(fetchedUser => {
            //         let user = new User(fetchedUser.username, fetchedUser.password);
            //         user.setSessionId = fetchedUser.sessionId;
            //         fetchedUser = user;
            //     });
            //     return users;
            // })
            .catch(err => console.log(err))
            .finally(() => this.client.close())
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
        
        let collection = this.client.db("Sofari").collection("User");
        let func = collection.findOne.bind(collection);
        let fetchedUser = this.findUser({username: user.getUsername, password: user.getPassword}, func);
        console.log(fetchedUser)
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