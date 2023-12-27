const DAOFactory = require("../dao/DAOFactory");
const UserMemoryDAO = require("../memorydao/UserMemoryDAO");
const FavoriteBucketMemoryDAO = require("../memorydao/FavoriteBucketMemoryDAO");
const AdvertisementMemoryDAO = require("../memorydao/AdvertisementMemoryDAO")

class MemoryDAOFactory extends DAOFactory {
    constructor() {
        super();
        this.userDAO = new UserMemoryDAO();
        this.favoriteDAO = new FavoriteBucketMemoryDAO();
        this.advertisementDAO = new AdvertisementMemoryDAO();
    }

    get getUserDAO() {
        return this.userDAO;
    }

    get getAdvertisementDAO() {
        return this.advertisementDAO;
    }

    get getFavoriteBucketDAO() {
        return this.favoriteDAO;
    }
}

module.exports = MemoryDAOFactory;