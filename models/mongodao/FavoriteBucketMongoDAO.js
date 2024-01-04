const FavoriteBucketDAO = require("../dao/FavoriteBucketDAO");
const MongoClientConnector = require("../mongodao/MongoClientConnector")

class FavoriteBucketMemoryDAO extends FavoriteBucketDAO{

    findFavoriteBucket(client, query, func) {
        return client.connect()
            .then(() => {
                const options = {
                    projection: {
                        _id: 0,
                        username: 1,
                        password: 1,
                        favorites: 1
                    }
                };
                let result = func(query, options);
                return result instanceof Promise ? result : result.toArray();
            })
            .then(users => {
                if (!(users instanceof Array)) {
                    users = users === null ? [] : [users];
                }

                users.forEach(fetchedUser => {
                    const user = new User(fetchedUser.username, fetchedUser.password);
                    user.setSessionId = fetchedUser.sessionId;
                    fetchedUser = user;
                });

                return users;
            })
            .catch((err) => {
                console.error(err);
                throw err;
            })
            .finally(() => {
                client.close();
            });
    }

    findAll() {
        return FavoriteBucketMemoryDAO.favorites;
    }

    findFavoritesByUser(user) {
        return FavoriteBucketMemoryDAO.favorites.find(bucket => bucket.getUser.equals(user));
    }

    delete(bucket) {
        FavoriteBucketMemoryDAO.favorites = FavoriteBucketMemoryDAO.favorites.filter(list => !list.getUser.equals(bucket.getUser));
    }

    save(bucket) {
        let foundBucket = FavoriteBucketMemoryDAO.favorites.filter(list => list.getUser.equals(bucket.getUser));
        if (foundBucket.length === 0) {
            FavoriteBucketMemoryDAO.favorites.push(bucket);
        }
    }
}

module.exports = FavoriteBucketMemoryDAO;
