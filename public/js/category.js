let headers = new Headers();
headers.append('Accept', 'application/json');

let init = {
    method: "GET",
    headers: headers
}

let advertisements = undefined;

window.addEventListener('load', fillTemplate);

function fillTemplate() {

    // Add handler for click event on submit of login form
    let loginBtn = document.getElementById("login-btn");
    loginBtn.addEventListener('click', postTheForm);

    // Get the category id from the url of the page
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    // Get the category name from the url of the page
    const categoryName = urlParams.get('category');

    // Set the title of the document
    document.title = `Sofari: ${categoryName}`

    let urlSubcategories = `${generalUrl}categories/${categoryId}/subcategories`;


    // Fetch the subcategories of the specified category
    fetch(urlSubcategories, init)
        .then(response => response.json())
        .then(subcategoriesList => {

            //Fill the template for the filters
            templateHandler = new TemplateHandler("subcategory-filter-template", "subcategory-filter");
            templateHandler.fillTemplate({ array: subcategoriesList });

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });


    let urlCategory = `${generalUrl}ads?category=${categoryId}`;

    // Fetch the advertisements of the specified category
    fetch(urlCategory, init)
        .then(response => response.json())
        .then(adsList => {
            advertisements = adsList;

            //Fill the template for the advertisements of the specified category
            templateHandler = new TemplateHandler("category-template", "ads-category-products");
            templateHandler.fillTemplate({
                array: advertisements,
                empty: advertisements.length == 0
            });

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // tips_trendsJSON is a global variable loaded from data/js/tips_trends.js script
    let tips_trends = JSON.parse(tips_trendsJSON).find(item => item["category_id"] == categoryId);

    if (!tips_trends) {
        tips_trends = { "trends": [], "tips": [] };
    }

    // Fill the templates for tips and trends
    templateHandler = new TemplateHandler("tips-template", "tips");
    templateHandler.fillTemplate({
        array: tips_trends["tips"],
        empty: !tips_trends || !tips_trends["tips"] || tips_trends["tips"].length === 0
    });

    templateHandler = new TemplateHandler("trends-template", "trends");
    templateHandler.fillTemplate({
        array: tips_trends["trends"],
        empty: !tips_trends || !tips_trends["trends"] || tips_trends["trends"].length === 0
    });

    templateHandler = new TemplateHandler("category-link-template", "category");
    templateHandler.fillTemplate({ category: categoryName });
}

// Filter the ads according to the selected subcategory
document.addEventListener("DOMContentLoaded", filterAds);

function filterAds() {
    let div = document.getElementById('subcategory-filter');

    div.addEventListener('click', function (event) {
        let clickedElement = event.target;

        if (clickedElement.type === "radio" && clickedElement.name === "subcategory") {
            let clickedId = clickedElement.id;
            console.log('Clicked Radio Button ID:', clickedId);

            if (advertisements !== undefined) {

                // Use a regex to extract the number of the subcategory, given that it is in the form x...xd...d where x: letters, d: digits
                clickedId = clickedId.match(/\d+/g)[0]

                advertisementsToReturn = clickedId != 0 ? advertisements.filter(item => item["subcategory_id"] == clickedId) : advertisements

                templateHandler = new TemplateHandler("category-template", "ads-category-products");
                templateHandler.fillTemplate({
                    array: advertisementsToReturn,
                    empty: advertisementsToReturn.length == 0
                })
            }
        }
    });
};

function postTheForm(event) {
    event.preventDefault();

    let form = document.getElementById("login");
    let formData = new FormData(form);

    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    let formStr = new URLSearchParams(formData).toString();

    console.log(formStr)

    let init = {
        method: "POST",
        "headers": headers,
        body: formStr
    }

    fetch('/ls', init)
        .then(response => response.json())
        .then(sessionId => {console.log(sessionId)})
        .catch(error => { console.log(error) })
}