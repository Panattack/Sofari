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

    fetch(`/frs?username=${username}&sessionId=${sessionId}`, init)
        .then(response => {
            if (response.ok) {
                console.log("FETCHED")
                return response.json()
            }
            showPopupMsg("fail-viewFav-pop-up-msg", null);
            throw new Error("Authentication Failed");
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