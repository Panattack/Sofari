const DAOFactory = require("../dao/DAOFactory");
const UserMongoDAO = require("../mongodao/UserMongoDAO");
const FavoriteBucketMongoDAO = require("../mongodao/FavoriteBucketMongoDAO");
const { MongoClient, ServerApiVersion } = require("mongodb");

class MongoDAOFactory extends DAOFactory {
    constructor() {
        super();

        const username = process.env.username;
        const password = process.env.password;
        const host = process.env.host;
        const uri = `mongodb+srv://${username}:${password}@${host}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, {
            serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
            },
            });

        this.userDAO = new UserMongoDAO(client);
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