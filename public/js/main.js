// Fetch data

// generalUrl = "https://wiki-ads.onrender.com/"

let myHeaders = new Headers();
myHeaders.append('Accept', 'application/json');

let init = {
    method: "GET",
    headers: myHeaders
}

// index.html

window.addEventListener('load', fillTemplate);

function fillTemplate() {
    url = "https://wiki-ads.onrender.com/categories"
    fetch(url, init)
    .then(response => response.json())
    .then(categoriesList => {
        // Create an array of promises for fetching subcategories
        let subCategoryPromises = categoriesList.map(item => fetchSubCategory(item.id));

        /*
        The fetchSubCategory function performs an asynchronous operation (fetching data). Since fetch returns a Promise, the value of item.subCategory will be undefined at the time you access it.

        To handle asynchronous operations and ensure that the subcategory data is assigned to the correct item, you can use Promise.all to wait for all fetch requests to complete before updating the items
         */
        // Wait for all promises to resolve
        return Promise.all(subCategoryPromises)
            .then(subCategories => {
                // Assign subcategories to corresponding items
                categoriesList.forEach((item, index) => {
                    item.subCategory = subCategories[index];
                });
                return categoriesList;
            });
    })
    .then(categoriesList => {
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
    .catch(error => {
        console.log(error);
    });
}

function fetchSubCategory(id) {
    let url = `https://wiki-ads.onrender.com/categories/${id}/subcategories`;

    return fetch(url, init)
        .then(response => response.json())
        .catch(error => {
            console.log(error);
        });
}
