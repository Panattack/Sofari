class DAOFactory {
    static factory = null;

    constructor(){}

    get getUserDAO() { };
    get getAdvertisementsDAO() { };
    get getFavoriteBucketDAO() { };

    static getFactory() {
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
}


module.exports = DAOFactory;