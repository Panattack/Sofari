const User = require("../model/User");

class Initializer {
    eraseData() {};
    get getUserDAO() {};
    get getAdvertisementDAO() {};
    get getFavoriteBucketDAO() {};

    prepareData() {
        this.eraseData();

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