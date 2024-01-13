const Advertisement = require('../model/Advertisement');
const FavoriteBucket = require('../model/FavoriteBucket')
const Initializer = require('../dao/Initializer');
const CustomError = require('../model/CustomError')
const initializer = new Initializer();

class FavoriteService {

  static addToFavorites(username, sessionId, advertisementData) {
    const promiseUser = initializer.getUserDAO.findUserByUsernameAndSessionId(username, sessionId);

    let user = null;
    return promiseUser
      .then(users => {
        if (users.length > 0) {
          user = users[0]; //One user should have been fetched as the username and sessionId pair is unique for each user
          return initializer.getFavoriteBucketDAO.findFavoritesByUsernameAndPassword(user.getUsername, user.getPassword);
        } else {
          throw new CustomError("Unauthorized: User not found", 401);
        }
      })
      .then(buckets => {
        const advertisement = new Advertisement(advertisementData.id, advertisementData.title, advertisementData.desc, advertisementData.cost, advertisementData.img);
        if (buckets.length > 0) { // The user has already a FavoriteBucket
          const bucket = buckets[0];  // Each user can only have one FavoriteBucket

          // Add the new advertisement (if it is not a duplicate of an already existing one)
          bucket.addToFavorites(advertisement);

          return initializer.getFavoriteBucketDAO.update(bucket.getUsername, bucket.getPassword, bucket.getFavorites);

        } else { // First time adding an advertisement to FavoriteBucket
          const bucket = new FavoriteBucket(user.getUsername, user.getPassword);
          bucket.addToFavorites(advertisement);

          return initializer.getFavoriteBucketDAO.save(bucket);
        }
      })
      .then(ack => {
        if (ack) {
          return ack;
        } else {
          throw new CustomError("Conflict: Error updating/saving favorites", 409);
        }
      })
      .catch(error => {
        if (error instanceof CustomError) {
          throw error;
        } else {
          throw new CustomError(error.message, 500);
        }
      });
  }

  static retrieveFavorites(username, sessionId) {
    const promiseUser = initializer.getUserDAO.findUserByUsernameAndSessionId(username, sessionId);

    return promiseUser
      .then(users => {
        if (users.length > 0) {
          let user = users[0];
          return initializer.getFavoriteBucketDAO.findFavoritesByUsernameAndPassword(username, user.getPassword);
        }
        else {
          throw new CustomError("Unauthorized: User not found", 401);
        }
      })
      .then(buckets => {
        if(buckets.length === 0) {
          throw new CustomError("Not Found: No favourites list found", 404)
        }
        let favouritesList = buckets[0].getFavorites;
        return JSON.stringify(favouritesList);
      })
      .catch(error => {throw error;})
  }

}

module.exports = FavoriteService;