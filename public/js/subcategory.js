let myHeaders = new Headers();
myHeaders.append('Accept', 'application/json');

let init = {
    method: "GET",
    headers: myHeaders
}

window.addEventListener('load', fillTemplate);

function fillTemplate() {
    // Get the category id from the url of the page
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');
    const subCategory = urlParams.get('subcategory');
    let url = `https://wiki-ads.onrender.com/ads?subcategory=${categoryId}`;

    window.templates = {}
    let SubCategoryTemplate = document.getElementById('subcategoryLink-template').textContent;
    window.templates.subCategory = Handlebars.compile(SubCategoryTemplate);
    let contentSubCategory = document.getElementById("Subcategory");
    contentSubCategory.innerHTML = templates.subCategory({
        subcategory: subCategory
    });

    fetch(url, init)
    .then(response => response.json())
    .then(subAds => {
        // Load the template
        subAds.forEach(ad => {
            splitedFeatures = ad.features.split(';');
            splitedFeatures = splitedFeatures.map(str => (str.includes(':') ? str : str + " : Nαι"));
            ad.mapFeatures = splitedFeatures.map(str => str.split(':'));
        });
        let ads = document.getElementById('subcategory-template').textContent;

        window.templates.ads = Handlebars.compile(ads);

        // Fill the template
        let contentAds = document.getElementById("ad-subcategories");
        contentAds.innerHTML = templates.ads({
            array: subAds
        });        
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}
