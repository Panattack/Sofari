const generalUrl = "https://wiki-ads.onrender.com/"

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
    let url = `${generalUrl}ads?category=${categoryId}`;

    window.templates = {};

    // Fetch the advertisements of the specified category
    fetch(url, init)
        .then(response => response.json())
        .then(adsList => {

            // Load the template for the categories
            let adsTemplate = document.getElementById('category-template').textContent;
            window.templates.adsTemplate = Handlebars.compile(adsTemplate);

            // Fill the template
            let adsCategoryProducts = document.getElementById("ads-category-products");
            let htmlContent = templates.adsTemplate({
                array: adsList
            });
            adsCategoryProducts.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Load the templates for tips and trends
    let tipsTemplate = document.getElementById('tips-template').textContent;
    let trendsTemplate = document.getElementById('trends-template').textContent;

    window.templates.tipsTemplate = Handlebars.compile(tipsTemplate);
    window.templates.trendsTemplate = Handlebars.compile(trendsTemplate);

    // Fill the templates
    let tips = document.getElementById("tips");
    let trends = document.getElementById("trends");

    // tips_trendsJSON is a global variable loaded from data/js/tips_trends.js script
    let tips_trends = JSON.parse(tips_trendsJSON).find(item => item["category_id"] == categoryId);

    if (!tips_trends) {
        tips_trends = { "trends": [], "tips": [] };
    }

    let trendsContent = window.templates.trendsTemplate({
        array: tips_trends["trends"],
        empty: !tips_trends || !tips_trends["trends"] || tips_trends["trends"].length === 0

    });
    trends.innerHTML = trendsContent;

    let tipsContent = window.templates.tipsTemplate({
        array: tips_trends["tips"],
        empty: !tips_trends || !tips_trends["tips"] || tips_trends["tips"].length === 0
    });
    tips.innerHTML = tipsContent;

    // Load the template for the category name
    let categoryLinkTemplate = document.getElementById("category-link-template").textContent;
    window.templates.categoryLinkTemplate = Handlebars.compile(categoryLinkTemplate)

    // Get the category name
    const categoryName = urlParams.get('category');

    // Fill the template
    let category = document.getElementById("category")
    let categoryLinkContent = window.templates.categoryLinkTemplate({
        category: categoryName
    });
    category.innerHTML = categoryLinkContent;
}