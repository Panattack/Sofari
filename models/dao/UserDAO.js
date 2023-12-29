class UserDAO {

    findAll() {};

    findUserByUsername(username) {};

    findUserByUsernameAndPassword(username, password) {};

    findUserByUsernameAndSessionId(username, sessionId) {};

    delete(user) {};

    save(user) {};
}

module.exports = UserDAO;