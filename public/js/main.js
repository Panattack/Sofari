// Fetch data

generalUrl = "https://wiki-ads.onrender.com/"

let myHeaders = new Headers();
myHeaders.append('Accept', 'application/json');

let init = {
    method: "GET",
    headers: myHeaders
}

// index.html

window.addEventListener('load', fillTemplate);

function fillTemplate() {
    // Fetch all categories
    let url = generalUrl + "categories"

    fetch(url, init)
        .then(response => response.json())
        .then(categoriesList => {

            // Fetch all subcategories
            let url = generalUrl + "subcategories"
            return fetch(url, init)
                .then(response => response.json())
                .then(subcategoriesList => {

                    // For each category, include an attribute for its subcategories
                    categoriesList.forEach(category => {
                        category["subcategories"] = subcategoriesList.filter(item => item["category_id"] === category.id)
                    })

                    // Load the template
                    let categories = document.getElementById('index-template').textContent;
                    window.templates = {};
                    window.templates.categories = Handlebars.compile(categories);

                    // Fill the template
                    let contentTemplate = document.getElementById("example");

                    let htmlContent = templates.categories({
                        array: categoriesList
                    });
                    contentTemplate.innerHTML = htmlContent;

                })
        })
        .catch(error => {
            console.log(error);
        });
}
