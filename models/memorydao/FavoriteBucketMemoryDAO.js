const FavoriteBucketDAO = require("../dao/FavoriteBucketDAO");

class FavoriteBucketMemoryDAO extends FavoriteBucketDAO {

    static favorites = [];

    findAll() {
        return new Promise(FavoriteBucketMemoryDAO.favorites);
    }

    findFavoritesByUser(user) {
        return new Promise((resolve, reject) => {
            let buckets = FavoriteBucketMemoryDAO.favorites.find(bucket => bucket.getUser.equals(user));
            let bucketArray = [];
            bucketArray.push(buckets);
            console.log(bucketArray)
            resolve(bucketArray);
        });
    }

    save(bucket) {
        return new Promise(() => {
            let ack = 0;
            let foundBucket = FavoriteBucketMemoryDAO.favorites.filter(list => list.getUser.equals(bucket.getUser));
            if (foundBucket.length === 0) {
                ack++;
                FavoriteBucketMemoryDAO.favorites.push(bucket);
            }
            return ack;
        })
        
    }

    delete(bucket) {
    }
}

module.exports = FavoriteBucketMemoryDAO;
