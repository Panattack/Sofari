// favoriteService.js
const Advertisement = require('../model/Advertisement');
const FavoriteBucket = require('../model/FavoriteBucket')
const MemoryInitializer = require('../memorydao/MemoryInitializer'); 
const initializer = new MemoryInitializer();

class FavoriteService {
  static addToFavorites(username, sessionId, advertisementData) {
    const user = initializer.getUserDAO.findUserByUsernameAndSessionId(username, sessionId);

    if (user) {
      let bucket = initializer.getFavoriteBucketDAO.findFavoritesByUser(user);
      const advertisement = new Advertisement(advertisementData.id, advertisementData.title, advertisementData.description, advertisementData.cost, advertisementData.imageUrl);

      if (!bucket) {
        // First time adding an advertisement
        bucket = new FavoriteBucket(user);
        bucket.addToFavorites(advertisement);
        initializer.getFavoriteBucketDAO.save(bucket);
      } else {
        try {
          bucket.addToFavorites(advertisement);
          // If the operation is successful and no error is thrown
          return { message: "Operation successful" };
        } catch (error) {
          // If an error occurs
          console.error("Error:", error);
          throw new Error("Conflict: Error finding favorites");
        }
      }
    } else {
      // Unauthorized - User not found
      throw new Error("Unauthorized: User not found");
    }
  }

  static retrieveFavorites(username, sessionId) {
    const user = initializer.getUserDAO.findUserByUsernameAndSessionId(username, sessionId);

    if (user) {
        const bucket = initializer.getFavoriteBucketDAO.findFavoritesByUser(user);

        // Return the list of favorites
        return JSON.stringify(bucket);
      
    } else {
      // Unauthorized - User not found
      throw new Error("Unauthorized: User not found");
    }
  }

}

module.exports = FavoriteService;
