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
    console.log(url)
    fetch(url, init)
    .then(response => response.json())
    .then(obj => {
        console.log(obj);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}