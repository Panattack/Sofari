const User = require("../model/User");
const DAOFactory = require("../dao/DAOFactory")

class Initializer {
    constructor(factoryPath, username = null, password = null, host = null) {
        process.env.daofactory = factoryPath;
        process.env.username = username;
        process.env.password = password;
        process.env.host = host;
    }

    get getUserDAO() {
        return DAOFactory.getFactory().getUserDAO;
    }

    get getFavoriteBucketDAO() {
        return DAOFactory.getFactory().getFavoriteBucketDAO;
    }

    prepareData() {
        let newUsers = new Array();
        newUsers.push(new User("Alviona", "1234567*"))
        newUsers.push(new User("Panos", "qwerty*"))
        newUsers.push(new User("user1", "Pass@123"))
        newUsers.push(new User("john_doe", "Secret_123"))
        newUsers.push(new User("alice_007", "$SecurePass!"))
        newUsers.push(new User("test_user", "MyP@ssword123"))
        newUsers.push(new User("admin", "Adm1n_P@ss"))
        newUsers.push(new User("user123", "Pass@123"))
        newUsers.push(new User("demo_user", "P@ssw0rd789"))
        newUsers.push(new User("example", "%Pass1234@"))
        newUsers.push(new User("Alviona", "qwerty*"))

        for (let user of newUsers) {
            this.getUserDAO.save(user)
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

module.exports = Initializer;