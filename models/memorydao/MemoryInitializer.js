const Initializer = require("../dao/Initializer")
const DAOFactory = require("../dao/DAOFactory")

class MemoryInitializer extends Initializer {
    constructor() {
        super();
        process.env.daofactory = 'MemoryDAOFactory';
    }
    eraseData() {

        let allUsers = this.getUserDAO.findAll();
        allUsers.forEach(element => {
            this.getUserDAO.delete(element);
        });

        let allAdvertisements = this.getAdvertisementDAO.findAll();
        allAdvertisements.forEach(element => {
            this.getAdvertisementDAO.delete(element);
        });

        let allFavoriteBuckets = this.getFavoriteBucketDAO.findAll();
        allFavoriteBuckets.forEach(element => {
            this.getFavoriteBucketDAO.delete(element);
        });
    }

    get getUserDAO() {
        return DAOFactory.getFactory().getUserDAO;
    }

    get getAdvertisementDAO() {
        return DAOFactory.getFactory().getUserDAO;
    }

    get getFavoriteBucketDAO() {
        return DAOFactory.getFactory().getFavoriteBucketDAO;
    }
}


module.exports = MemoryInitializer;