class FavoriteBucket {
    constructor(user){
        this.user = user;
        this.favorites = [];
    }

    get getUser() {return this.user;}

    set setUser(user) {this.user = user;}

    addToFavorites(advertisement){
        foundAdv = this.favorites.some(ads => advertisement.equals(ads));
        if (foundAdv) {
            // Throw exception
            return "Problem";
        }
        else {
            this.favorites.push(advertisement);
            return "OK";
        }
    }
}
