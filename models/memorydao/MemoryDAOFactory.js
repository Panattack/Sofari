class MemoryDAOFactory extends DAOFactory {
    constructor() {
        this.userDAO = new UserMemoryDAO();
        this.favoriteDAO = new FavoriteBucketMemoryDAO();
        this.advertisementDAO = new AdvertisementMemoryDAO();
    }

    get getUserDAO() {
        return this.userDAO;
    }

    get getAdvertisementDAO() {
        return this.favoriteDAO;
    }

    get getFavoriteBucketDAO() {
        return this.favoriteDAO;
    }
}
