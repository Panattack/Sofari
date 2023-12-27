class User {
    constructor(username, password, sessionId) {
        this.username = username;
        this.password = password;
        this.sessionId = sessionId;
    }

    get username() {return this.username;}

    set username(username) {this.username = username;}

    get password() {return this.password;}

    set password(password) {this.password = password;}

    get sessionId() {return this.sessionId;}
    
    set sessionId(sessionId) {this.sessionId = sessionId;}

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
