class MemoryInitializer extends Initializer {
    constructor() {
        process.env.daofactory = '.MemoryDAOFactory';
    }
    eraseData() {
        allUsers = getUserDAO().findAll();
        allUsers.forEach(element => {
            this.getUserDAO().delete(element);
        });

        allAdvertisements = this.getAdvertisementDAO().findAll();
        allAdvertisements.forEach(element => {
            this.getAdvertisementDAO().delete(element);
        });

        allFavoriteBuckets = this.getFavoriteBucketDAO().findAll();
        allFavoriteBuckets.forEach(element => {
            this.getFavoriteBucketDAO().delete(element);
        });
    }

    get getUserDAO() {
        return DAOFactory.getFactory().getUserDAO();
    }

    get getAdvertisementDAO() {
        return DAOFactory.getFactory().getUserDAO();
    }

    get getFavoriteBucketDAO() {
        return DAOFactory.getFactory().getFavoriteBucketDAO();
    }
}
