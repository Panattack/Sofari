class UserMemoryDAO extends UserDAO {

    static users = [];

    findAll() {
        return this.entities;
    }

    findUserByUsername(username) {
        User = entities.filter(item => item.username === username);
        return User;
    }

    delete(user) {
        foundUser = entities.filter(userEntity => user.equals(userEntity));
        if (foundUser.length !== 0)
        {
            entities.delete(foundUser);
        }
    }

    save(user) {
        foundUser = entities.filter(userEntity => user.equals(userEntity));
        if (foundUser.length === 0)
        {
            entities.push(foundUser);
        }
    }
}
