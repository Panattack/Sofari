const UserDAO = require("../dao/UserDAO")
const User = require("../model/User")

class UserMemoryDAO extends UserDAO {

    static users = [];

    findAll() {
        return new Promise(UserMemoryDAO.users);
    }

    findUserByUsername(username) {
        return new Promise(UserMemoryDAO.users.filter(item => item.getUsername === username));
    }

    findUserByUsernameAndPassword(username, password) {
        return new Promise()
            .then(UserMemoryDAO.users.find(item => item.getUsername === username && item.getPassword === password));
    }

    findUserByUsernameAndSessionId(username, sessionId) {
        return new Promise((resolve, reject) => {
            let result = UserMemoryDAO.users.find(item => item.getUsername === username && item.getSessionId === sessionId);
            let userArray = [];
            userArray.push(result);
            resolve(userArray);
        });
    }

    save(user) {
        return new Promise((resolve, reject) => {
            let ack = 0;
            let foundUser = UserMemoryDAO.users.find(userEntity => user.equals(userEntity));
            if (foundUser === undefined) {
                UserMemoryDAO.users.push(user);
                ack++;
            }
            return resolve(ack);
        });
    }

    update(username, password, sessionId) {
        return new Promise((resolve, reject) => {
            let ack = 0;
            let user = new User(username, password)
            user.setSessionId = sessionId;
            let foundUserIndex = UserMemoryDAO.users.findIndex(userEntity => user.equals(userEntity));
            if (foundUserIndex !== -1) {
                let foundUser = UserMemoryDAO.users[foundUserIndex];
                foundUser.update(user);
                ack++;
            }
            resolve(ack);
        })
        .catch(err => console.log(err));
    }

    delete(user) {
    }

}

module.exports = UserMemoryDAO;