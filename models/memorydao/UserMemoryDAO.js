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

    delete(user) {
        UserMemoryDAO.users = UserMemoryDAO.users.filter(userEntity => !user.equals(userEntity));
    }

    save(user) {
        let foundUser = UserMemoryDAO.users.find(userEntity => user.equals(userEntity));
        if (foundUser === undefined)
        {
            UserMemoryDAO.users.push(user);
        }
        else
        {
            // Update the user
            foundUser.update(user);
        }
    }
}

module.exports = UserMemoryDAO;