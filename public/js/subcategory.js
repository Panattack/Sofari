window.addEventListener('load', fillTemplate);

function fillTemplate() {
    // Get the category id from the url of the page
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    // Get the subcategory name from the url of the page
    const subCategory = urlParams.get('subcategory');

    // Set the title of the document
    document.title = `Sofari: ${subCategory}`

    let url = `https://wiki-ads.onrender.com/ads?subcategory=${categoryId}`;


    // Fill the template for the subcategory name in the history navbar
    templateHandler = new TemplateHandler("subcategoryLink-template", "Subcategory");
    templateHandler.fillTemplate({ subcategory: subCategory });

    // Fetch the advertisements of the specified subcategory
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }

    fetch(url, init)
        .then(response => response.json())
        .then(subAds => {
            // Parse the features of each ad
            subAds.forEach(ad => {
                splitedFeatures = ad.features.split(';');
                splitedFeatures = splitedFeatures.map(str => (str.includes(':') ? str : str + " : Ναι"));
                ad.mapFeatures = splitedFeatures.map(str => str.split(':'));
            });

            // Fill the template for the advertisements of the specified subcategory
            templateHandler = new TemplateHandler("subcategory-template", "ad-subcategories");
            templateHandler.fillTemplate({ array: subAds });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}