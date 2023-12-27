class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.sessionId = undefined;
    }

    get getUsername() {return this.username;}

    set setUsername(name) {this.username = name;}

    get getPassword() {return this.password;}

    set setPassword(password) {this.password = password;}

    get getSessionId() {return this.sessionId;}
    
    set setSessionId(sessionId) {this.sessionId = sessionId;}

    equals(other) {
        if (other == null) {
            return false;
        }

        if (!(other instanceof User)) {
            return false;
        }

        return this.username === other.username && this.password === other.password;
    }

}

module.exports = User