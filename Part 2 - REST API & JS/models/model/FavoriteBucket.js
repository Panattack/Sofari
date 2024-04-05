const CustomError = require("./CustomError")

class FavoriteBucket {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.favorites = [];
    }

    get getUsername() { return this.username; }

    set setUsername(username) { this.username = username; }

    get getPassword() { return this.password; }

    set setPassword(password) { this.password = password; }

    get getFavorites() { return this.favorites; }

    set setFavorites(favorites) { this.favorites = favorites; }

    addToFavorites(advertisement) {
        const foundAdv = this.favorites.some(ad => advertisement.equals(ad));

        if (foundAdv) {
            throw new CustomError("Conflict: Error finding favorites", 409);
        } else {
            this.favorites.push(advertisement);
        }
    }
}

module.exports = FavoriteBucket;