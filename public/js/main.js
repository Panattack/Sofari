window.addEventListener('load', fillTemplate);

function fillTemplate() {
    // Fetch all categories
    let url = `${generalUrl}categories`

    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }

    fetch(url, init)
        .then(response => response.json())
        .then(categoriesList => {

            // Fetch all subcategories
            let url = `${generalUrl}subcategories`
            return fetch(url, init)
                .then(response => response.json())
                .then(subcategoriesList => {

                    // For each category, include an attribute for its subcategories
                    categoriesList.forEach(category => {
                        category["subcategories"] = subcategoriesList.filter(item => item["category_id"] === category.id)
                    })

                    templateHandler = new TemplateHandler("index-template", "ad-categories");
                    templateHandler.fillTemplate({ array: categoriesList });

                })
        })
        .catch(error => {
            console.log(error);
        });
}