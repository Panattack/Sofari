const FavoriteBucketDAO = require("../dao/FavoriteBucketDAO");
const MongoClientConnector = require("../mongodao/MongoClientConnector");
const FavoriteBucket = require("../model/FavoriteBucket");
const Advertisement = require("../model/Advertisement");
const CustomError = require("../model/CustomError");

class FavoriteBucketMongoDAO extends FavoriteBucketDAO {

    findAll() {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("FavoriteBucket");
        let func = collection.find.bind(collection);
        return this._findFavoriteBucket(client, {}, func);
    }

    findFavoritesByUsernameAndPassword(username, password) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("FavoriteBucket");
        let func = collection.findOne.bind(collection);
        return this._findFavoriteBucket(client, { username: username, password: password }, func);
    }

    save(bucket) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("FavoriteBucket");

        return client
            .connect()
            .then(() => {

                return collection.insertOne(bucket);
            })
            .then(res => {
                if (res.acknowledged) {
                    let documentId = res.insertedId
                    console.log(`Created document ${documentId}`)
                }
                return res.acknowledged;
            })
            .catch(error => { throw new CustomError("Internal Server Error: Error saving favorites in Database", 500) })
            .finally(() => client.close())
    }

    update(username, password, favorites) {
        let client = MongoClientConnector.getClient();
        let collection = client.db("Sofari").collection("FavoriteBucket");

        return client
            .connect()
            .then(() => {
                let filter = {
                    username: username,
                    password: password
                }
                let update = {
                    $set: {
                        favorites: favorites
                    }
                }
                return collection.updateOne(filter, update);
            })
            .then(res => {
                if (res.acknowledged) {
                    let count = res.matchedCount;
                    console.log(`Updated ${count} documents`)
                }
                return res.matchedCount > 0;
            })
            .catch(error => { throw new CustomError("Internal Server Error: Error updating favorites in Database", 500); })
            .finally(() => client.close())
    }

    /*
    * Returns Promise. If any buckets were found, the object returned with the Promise is a list of FavoriteBucket objects, 
    * otherwise it is the empty list ([])
    */
    _findFavoriteBucket(client, query, func) {
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
            .then(buckets => {
                if (!(buckets instanceof Array)) {
                    buckets = buckets === null ? [] : [buckets];
                }

                let bucketsRes = new Array();
                buckets.forEach(fetchedBucket => {
                    const bucket = new FavoriteBucket(fetchedBucket.username, fetchedBucket.password);

                    let favoritesRes = new Array();
                    fetchedBucket.favorites.forEach(fetchedAd => {
                        const ad = new Advertisement(fetchedAd.id, fetchedAd.title, fetchedAd.description, fetchedAd.cost, fetchedAd.imageUrl)
                        favoritesRes.push(ad);
                    })
                    bucket.setFavorites = favoritesRes;
                    bucketsRes.push(bucket)
                });

                return bucketsRes;
            })
            .catch((err) => {
                console.error(err);
                throw err;
            })
            .finally(() => {
                client.close();
            });
    }
}

module.exports = FavoriteBucketMongoDAO;
