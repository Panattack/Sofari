const UserDAO = require("../dao/UserDAO")

class UserMemoryDAO extends UserDAO {

    static users = [];

    findAll() {
        return UserMemoryDAO.users;
    }

    findUserByUsername(username) {
        return UserMemoryDAO.users.filter(item => item.username === username);
    }

    findUserByUsernameAndPassword(username, password) {
        return UserMemoryDAO.users.find(item => item.username === username && item.password === password);
    }

    delete(user) {
        UserMemoryDAO.users = UserMemoryDAO.users.filter(userEntity => !user.equals(userEntity));
    }

    save(user) {
        let foundUser = UserMemoryDAO.users.filter(userEntity => user.equals(userEntity));
        if (foundUser.length === 0)
        {
            UserMemoryDAO.users.push(user);
        }
    }
}

module.exports = UserMemoryDAO;