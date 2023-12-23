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
    let url = `https://wiki-ads.onrender.com/ads?category=${categoryId}`;

    fetch(url, init)
    .then(response => response.json())
    .then(obj => {
        console.log(obj);
        // Load the template
        let ads = document.getElementById('category-template').textContent;
        window.templates = {};
        window.templates.ads = Handlebars.compile(ads);

        // Fill the template
        let contentAds = document.getElementById("example");
        let htmlContent = templates.ads({
            array: obj
        });
        contentAds.innerHTML = htmlContent;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}
