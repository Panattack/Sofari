window.addEventListener('load', function () {

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const sessionId = urlParams.get('sessionId');


    let headers = new Headers();
    headers.append('Accept', 'application/json');

    let init = {
        method: "GET",
        "headers": headers,
    }

    fetch(`/favourites/retrieve?username=${username}&sessionId=${sessionId}`, init)
        .then(response => {
            // The user has logged-in and can view their favourite ads (if any added)
            if (response.ok) {
                return response.json()
            }
            // The user is not authorized to view this page (hasn't logged-in successfully)
            else if (response.status === 401) {
                showPopupMsg("fail-viewFav-pop-up-msg", " Login is required to view this page. ", null);
                throw new Error("Authentication Failed");
            }
            // Favourites list not found (has not been created yet - the user has not added anything to favourites yet)
            else if (response.status === 404){
                return []
            }
            // Some internal server error (possibly due to network or database problems etc...)
            else if (response.status === 500) {
                showPopupMsg("fail-viewFav-pop-up-msg", " Some error occured, it's our fault... Please try again later. ", null);
                throw new Error("Internal Server Error");
            }
        })
        .then(favouritesList => {

            //Fill the template for the filters
            templateHandler = new TemplateHandler("favourites-template", "ads-favourite-products");
            templateHandler.fillTemplate({
                array: favouritesList,
                empty: favouritesList.length === 0
            });

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});