// favoriteService.js
const Advertisement = require('../model/Advertisement');
const FavoriteBucket = require('../model/FavoriteBucket')
const MemoryInitializer = require('../memorydao/MemoryInitializer'); 
const CustomError = require('../model/CustomError')
const initializer = new MemoryInitializer();

class FavoriteService {
  static addToFavorites(username, sessionId, advertisementData) {
    const user = initializer.getUserDAO.findUserByUsernameAndSessionId(username, sessionId);

    if (user) {
        let bucket = initializer.getFavoriteBucketDAO.findFavoritesByUser(user);
        const advertisement = new Advertisement(advertisementData.id, advertisementData.title, advertisementData.desc, advertisementData.cost, advertisementData.img);
      if (!bucket) {
            // First time adding an advertisement
            bucket = new FavoriteBucket(user);
            bucket.addToFavorites(advertisement);
            console.log(1)
            initializer.getFavoriteBucketDAO.save(bucket);
            console.log(initializer.getFavoriteBucketDAO.findAll())
      } else {
        try {
            bucket.addToFavorites(advertisement);
            // If the operation is successful and no error is thrown
            return { message: "Operation successful" };
        } catch (error) {
            // If an error occurs
            throw new CustomError("Conflict: Error finding favorites", 409);
        }
      }
    } else {
      // Unauthorized - User not found
        throw new CustomError("Unauthorized: User not found", 401);
    }
  }

  static retrieveFavorites(username, sessionId) {
    const user = initializer.getUserDAO.findUserByUsernameAndSessionId(username, sessionId);

    if (user !== undefined) {
        let favouritesList = initializer.getFavoriteBucketDAO.findFavoritesByUser(user);
        favouritesList = favouritesList === undefined ? [] : favouritesList.getFavorites;

        return JSON.stringify(favouritesList);
    } else {
      // Unauthorized - User not found
      throw new CustomError("Unauthorized: User not found", 401);
    }
  }

}

module.exports = FavoriteService;
