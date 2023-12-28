const FavoriteBucketDAO = require("../dao/FavoriteBucketDAO");

class FavoriteBucketMemoryDAO extends FavoriteBucketDAO{

    static favorites = [];

    findAll() {
        return FavoriteBucketMemoryDAO.favorites;
    }

    findAdsByUser(user) {
        return FavoriteBucketMemoryDAO.favorites.filter(bucket => bucket.user.equals(user));
    }

    delete(bucket) {
        FavoriteBucketMemoryDAO.favorites = FavoriteBucketMemoryDAO.favorites.filter(list => !list.User.equals(bucket.User));
    }

    save(bucket) {
        let foundBucket = FavoriteBucketMemoryDAO.favorites.filter(list => list.User.equals(bucket.User));
        if (foundBucket.length === 0) {
            favorites.push(bucket);
        }
    }
}

module.exports = FavoriteBucketMemoryDAO;