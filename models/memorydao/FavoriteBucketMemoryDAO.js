const FavoriteBucketDAO = require("../dao/FavoriteBucketDAO");

class FavoriteBucketMemoryDAO extends FavoriteBucketDAO {

    static favorites = [];

    findFavoritesByUsernameAndPassword(username, password) {
        return new Promise((resolve, reject) => {
            let buckets = FavoriteBucketMemoryDAO.favorites.find(bucket => bucket.getUsername === username && bucket.getPassword === password);
            let bucketArray = [];

            if (buckets !== undefined)
                bucketArray.push(buckets);

            resolve(bucketArray);
        });
    }

    save(bucket) {
        return new Promise((resolve, reject) => {
            let ack = 0;
            let foundBucket = FavoriteBucketMemoryDAO.favorites.filter(list => list.getPassword === bucket.getPassword && list.getUsername === list.getUsername);
            if (foundBucket.length === 0) {
                ack++;
                FavoriteBucketMemoryDAO.favorites.push(bucket);
            }
            resolve(ack);
        })
        
    }

    update(username, password, favorites) {
        return new Promise((resolve, reject) => {
            let ack = 0;
            let result = FavoriteBucketMemoryDAO.favorites.find(bucket => bucket.getUsername === username && bucket.getPassword === password);
            if (result !== undefined) {
                result.setFavorites = favorites;
                ack++;
            }

            resolve(ack);
        })
    }

}

module.exports = FavoriteBucketMemoryDAO;
