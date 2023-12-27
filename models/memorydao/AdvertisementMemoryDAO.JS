class AdvertisementMemoryDAO extends AdvertisementDAO {

    static ads = [];

    findAll() {
        return this.ads;
    }

    findAdsById(id) {
        foundAd = ads.filter(ad => id === ad.id);
        return foundAd;
    }

    delete(ad) {
        foundAd = ads.filter(adEntity => ad.equals(adEntity));
        if (foundAd.length != 0)
        {
            ads.delete(foundAd);
        }
    }

    save(ad) {
        foundAd = ads.filter(adEntity => ad.equals(adEntity));
        if (foundAd.length === 0)
        {
            ads.push(foundAd);
        }
    }
}
