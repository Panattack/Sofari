class FavoriteBucket {
    constructor(user) {
        this.user = user;
        this.favorites = [];
    }

    get getUser() { return this.user; }

    set setUser(user) { this.user = user; }

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