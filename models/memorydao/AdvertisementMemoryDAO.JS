const AdvertisementDAO = require("../dao/AdvertisementDAO");

class AdvertisementMemoryDAO extends AdvertisementDAO {

    static ads = [];

    findAll() {
        return AdvertisementMemoryDAO.ads;
    }

    findAdsById(id) {
        foundAd = AdvertisementMemoryDAO.ads.filter(ad => id === ad.getId);
        return foundAd;
    }

    delete(ad) {
        AdvertisementMemoryDAO.ads = AdvertisementMemoryDAO.ads.filter(adEntity => !ad.equals(adEntity));
    }

    save(ad) {
        foundAd = AdvertisementMemoryDAO.ads.filter(adEntity => ad.equals(adEntity));
        if (foundAd.length === 0)
        {
            AdvertisementMemoryDAO.ads.push(ad);
        }
    }
}

module.exports = AdvertisementMemoryDAO;