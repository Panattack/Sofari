const FavoriteBucketDAO = require("../dao/FavoriteBucketDAO");

class FavoriteBucketMemoryDAO extends FavoriteBucketDAO {

    static favorites = [];

    findAll() {
        return FavoriteBucketMemoryDAO.favorites;
    }

    findFavoritesByUser(user) {
        return FavoriteBucketMemoryDAO.favorites.find(bucket => bucket.getUser.equals(user));
    }

    save(bucket) {
        let foundBucket = FavoriteBucketMemoryDAO.favorites.filter(list => list.getUser.equals(bucket.getUser));
        if (foundBucket.length === 0) {
            FavoriteBucketMemoryDAO.favorites.push(bucket);
        }
    }

    delete(bucket) {
        FavoriteBucketMemoryDAO.favorites = FavoriteBucketMemoryDAO.favorites.filter(list => !list.getUser.equals(bucket.getUser));
    }
}

module.exports = FavoriteBucketMemoryDAO;
