const DAOFactory = require("../dao/DAOFactory");
const UserMongoDAO = require("../mongodao/UserMongoDAO");
const FavoriteBucketMongoDAO = require("../mongodao/FavoriteBucketMongoDAO");

class MongoDAOFactory extends DAOFactory {
    constructor() {
        super();
        this.userDAO = new UserMongoDAO();
        this.favoriteDAO = new FavoriteBucketMongoDAO();
            
    }

    get getUserDAO() {
        return this.userDAO;
    }

    get getFavoriteBucketDAO() {
        return this.favoriteDAO;
    }
}

module.exports = MongoDAOFactory;