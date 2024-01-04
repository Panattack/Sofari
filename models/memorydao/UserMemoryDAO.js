const UserDAO = require("../dao/UserDAO")

class UserMemoryDAO extends UserDAO {

    static users = [];

    findAll() {
        return UserMemoryDAO.users;
    }

    findUserByUsername(username) {
        return UserMemoryDAO.users.filter(item => item.getUsername === username);
    }

    findUserByUsernameAndPassword(username, password) {
        return UserMemoryDAO.users.find(item => item.getUsername === username && item.getPassword === password);
    }

    findUserByUsernameAndSessionId(username, sessionId) {
        return UserMemoryDAO.users.find(item => item.getUsername === username && item.getSessionId === sessionId);
    }

    save(user) {
        let foundUser = UserMemoryDAO.users.find(userEntity => user.equals(userEntity));
        if (foundUser === undefined) {
            UserMemoryDAO.users.push(user);
        }
        else {
            this.update(user);
        }
    }

    update(user) {
        let foundUserIndex = UserMemoryDAO.users.findIndex(userEntity => user.equals(userEntity));
        if (foundUserIndex !== undefined) {
            let foundUser = UserMemoryDAO.users[foundUserIndex];
            foundUser.update(user)
        }
    }

    delete(user) {
        UserMemoryDAO.users = UserMemoryDAO.users.filter(userEntity => !user.equals(userEntity));
    }

}

module.exports = UserMemoryDAO;