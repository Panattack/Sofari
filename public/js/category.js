let user = { username: undefined, sessionId: undefined }
let advertisements = undefined;


window.addEventListener('load', function () {
    // Add click event handlers for the login-form buttons (open and close)
    let loginFormBtn = document.getElementById("login-form-btn");
    loginFormBtn.addEventListener('click', openLoginForm);

    let closeLoginFormBtn = document.getElementById("close-login-form-btn");
    closeLoginFormBtn.addEventListener('click', closeLoginForm);

    // Add handler for click event on submit of login form
    let loginBtn = document.getElementById("login-submit-btn");
    loginBtn.addEventListener('click', postLoginForm);

    // Add click event handler for the view-favourites button
    let viewFavouritesBtn = document.getElementById("view-favourites-btn");
    viewFavouritesBtn.addEventListener('click', function () {
        console.log(user)
        redirectToPage(`favorite-ads.html?username=${user.username}&sessionId=${user.sessionId}`)
    });


    // Get the category id from the url of the page
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    // Get the category name from the url of the page
    const categoryName = urlParams.get('category');

    // Set the title of the document
    document.title = `Sofari: ${categoryName}`

    // Fetch the subcategories of the specified category
    let urlSubcategories = `${generalUrl}categories/${categoryId}/subcategories`;

    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: headers
    }

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
});

// Filter the ads according to the selected subcategory
document.addEventListener("DOMContentLoaded", filterAds);

// Auxilliary functions
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

function postLoginForm(event) {
    event.preventDefault();

    let form = document.getElementById("login");

    if (form.checkValidity())
    {
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
            .then(response => {
                if (response.ok) {
                    closeLoginForm()
                    showPopupMsg("success-login-pop-up-msg")
                    return response.json()
                }

                let authFail = document.querySelector(".auth-fail")
                authFail.innerHTML = `<i class="fas fa-exclamation-circle"></i> Authentication failed`
                throw new Error("Authentication Failed");
            })
            .then(sessionObj => {
                user.sessionId = sessionObj.sessionId;
                user.username = formData.get("username");
            })
            .catch(error => { console.log(error) })
    } else {
        form.reportValidity();
    }
}

function addToFavourites(button, id, title, desc, cost, imgUrl) {

    if (user.sessionId === undefined) {
        showPopupMsg("fail-addToFav-pop-up-msg");
    } else {

        let body = JSON.stringify({
            "id": id,
            "title": title,
            "desc": desc,
            "cost": cost,
            "img": imgUrl,
            "username": user.username,
            "sessionId": user.sessionId
        })

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let init = {
            method: "POST",
            "headers": headers,
            "body": body
        }

        fetch('/afs', init)
            .then(response => {
                if (response.ok) {
                    showInlinePopupMsg(`add-to-favourites-inline-pop-up-msg-${id}`, "Added!")
                }

                // Login was required, client side didn't catch it
                if (response.status === 401) {
                    showPopupMsg("fail-addToFav-pop-up-msg");
                    throw new Error("Authentication Failed");
                }
                // Conflict, advertisement already in favourites list
                else if (response.status === 409) {
                    showInlinePopupMsg(`add-to-favourites-inline-pop-up-msg-${id}`, "Already in favourites list!")
                    throw new Error("Already in favourites list");
                }
            })
            .catch(error => { console.log(error) })
    }
}

function openLoginForm() {
    document.querySelector(".overlay").style.display = 'flex';

    // Prevent scrolling
    document.body.style.overflow = 'hidden';
}

function closeLoginForm() {
    document.querySelector(".overlay").style.display = 'none';

    let loginForm = document.getElementById("login");
    loginForm.reset();

    let authFail = document.querySelector(".auth-fail");
    authFail.innerHTML = ``;

    // Enable scrolling again
    document.body.style.overflow = '';
}