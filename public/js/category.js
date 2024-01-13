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
        redirectToPage(`favorite-ads.html?username=${user.username}&sessionId=${user.sessionId}`);
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
            advertisements = preprocessingAds(adsList);

            //Fill the template for the advertisements of the specified category
            templateHandler = new TemplateHandler("category-template", "ads-category-products");
            templateHandler.fillTemplate({
                array: advertisements,
                empty: advertisements.length == 0
            });

            // Add click event handlers for all add-to-favourites buttons
            let addToFavouritesBtnList = document.querySelectorAll(".add-favorite-button")
            addToFavouritesBtnList.forEach(btn => btn.addEventListener('click', addToFavourites))
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
            let clickedAdId = clickedElement.dataset.adId;

            if (advertisements !== undefined) {

                // clickedAdId is undefined iff the "All" radio button was clicked
                advertisementsToReturn = clickedAdId !== undefined ? advertisements.filter(item => item["subcategory_id"] == clickedAdId) : advertisements

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

    if (form.checkValidity()) {
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

        fetch('/login', init)
            .then(response => {
                // Successful login
                if (response.ok) {
                    closeLoginForm()
                    showPopupMsg("success-login-pop-up-msg")
                    return response.json()
                }
                // Authentication Failed
                else if (response.status === 401) {
                    let authFail = document.querySelector(".auth-fail")
                    authFail.innerHTML = `<i class="fas fa-exclamation-circle"></i> Authentication failed`
                    throw new Error("Authentication Failed");

                    // Some internal server error (possibly due to network or database problems etc...)
                } else if (response.status === 500) {
                    let authFail = document.querySelector(".auth-fail")
                    authFail.innerHTML = `<i class="fas fa-exclamation-circle"></i> Please try again, it was our fault...`
                    throw new Error("Internal Server Error");
                }

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

function addToFavourites(event) {

    // In case the 'click' was caught from an inner <span> or other tag, take the corresponding button
    let button = event.target.type === "button" ? event.target : event.target.closest("button");

    const id = button.dataset.adId;
    const title = button.dataset.adTitle;
    const desc = button.dataset.adDesc;
    const cost = button.dataset.adCost;
    const imgUrl = button.dataset.adUrl;

    console.log(button)
    console.log(id, title, desc, cost, imgUrl)

    if (user.sessionId === undefined) {
        showPopupMsg("fail-addToFav-pop-up-msg");
    } else {

        console.log(user)

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

        fetch('/favourites/add', init)
            .then(response => {
                if (response.ok) {
                    console.log(response.status)
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
                // Some internal server error (possibly due to network or database problems etc...)
                else if (response.status === 500) {
                    console.log("HI")
                    showInlinePopupMsg(`add-to-favourites-inline-pop-up-msg-${id}`, "Try Again!")
                    throw new Error("Internal Server Error");
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
