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

    get getAdvertisementDAO() {
        return DAOFactory.getFactory().getAdvertisementDAO;
    }

    get getFavoriteBucketDAO() {
        return DAOFactory.getFactory().getFavoriteBucketDAO;
    }

    prepareData() {
        // DAOFactory.getFactory()
        this.getUserDAO.save(new User("Alviona", "1234567*"));
        this.getUserDAO.save(new User("Panos", "qwerty*"));
        this.getUserDAO.save(new User("user1", "Pass@123"));
        this.getUserDAO.save(new User("john_doe", "Secret_123"));
        this.getUserDAO.save(new User("alice_007", "$SecurePass!"));
        this.getUserDAO.save(new User("test_user", "MyP@ssword123"));
        this.getUserDAO.save(new User("admin", "Adm1n_P@ss"));
        this.getUserDAO.save(new User("user123", "Pass@123"));
        this.getUserDAO.save(new User("demo_user", "P@ssw0rd789"));
        this.getUserDAO.save(new User("example", "%Pass1234@"));
    }
}

module.exports = Initializer;