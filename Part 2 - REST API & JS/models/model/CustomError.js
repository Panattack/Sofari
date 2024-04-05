class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }

    get getStatus() {return this.status;}
}

module.exports = CustomError
