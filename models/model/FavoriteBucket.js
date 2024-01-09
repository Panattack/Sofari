class FavoriteBucket {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.favorites = [];
    }

    get getUsername() { return this.username; }

    set setUser(username) { this.username = username; }

    get getPassword() { return this.password; }

    set setPassword(password) { this.password = password; }

    get getFavorites() { return this.favorites; }

    set setFavorites(favorites) { this.favorites = favorites; }

    addToFavorites(advertisement) {
        const foundAdv = this.favorites.some(ads => advertisement.equals(ads));

        if (foundAdv) {
            throw new Error('Advertisement already exists in favorites');
        } else {
            this.favorites.push(advertisement);
        }
    }
}

module.exports = FavoriteBucket;