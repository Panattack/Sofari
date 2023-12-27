class DAOFactory {
    static factory = null;

    static getFactory() {
        return () => {
        if (DAOFactory.factory === null) {
            let className = null;

            if (process.env.daofactory !== undefined) {
            className = process.env.daofactory;
            }

            try {
                DAOFactory.factory = new (require(className))();
            } catch (e) {
                throw new Error(`Error initializing DAOFactory: ${e.message}`);
            }
        }

        return DAOFactory.factory;
        };
    };

    get getUserDAO() {};
    get getAdvertisementsDAO() {};
    get getFavoriteBucketDAO() {};
}
