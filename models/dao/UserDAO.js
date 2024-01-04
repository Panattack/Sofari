class UserDAO {

    findAll() {};

    findUserByUsername(username) {};

    findUserByUsernameAndPassword(username, password) {};

    findUserByUsernameAndSessionId(username, sessionId) {};

    save(user) {};

    update(user) {};

    delete(user) {};
}

module.exports = UserDAO;