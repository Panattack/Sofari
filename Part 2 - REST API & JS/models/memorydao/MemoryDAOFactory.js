const DAOFactory = require("../dao/DAOFactory");
const UserMemoryDAO = require("../memorydao/UserMemoryDAO");
const FavoriteBucketMemoryDAO = require("../memorydao/FavoriteBucketMemoryDAO");

class MemoryDAOFactory extends DAOFactory {
    constructor() {
        super();
        this.userDAO = new UserMemoryDAO();
        this.favoriteDAO = new FavoriteBucketMemoryDAO();
    }

    get getUserDAO() {
        return this.userDAO;
    }

    get getFavoriteBucketDAO() {
        return this.favoriteDAO;
    }
}

module.exports = MemoryDAOFactory;