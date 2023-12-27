class FavoriteBucketMemoryDAO {

    static favorites = [];

    findAll() {
        return favorites;
    }

    findAdsByUser(user) {
        foundFavorites = favorites.filter(bucket => bucket.user.equals(user));
        return foundFavorites;
    }

    delete(bucket) {
        foundBucket = favorites.filter(list => list.User.equals(bucket.User));
        if (foundBucket.length !== 0) {
            favorites.delete(foundBucket);
        }
    }

    save(bucket) {
        foundBucket = favorites.filter(list => list.User.equals(bucket.User));
        if (foundBucket.length === 0) {
            favorites.push(foundBucket);
        }
    }
}
