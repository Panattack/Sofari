let carousel_indices = new Map();
let carousel_images = new Map();

// Enum-like structure
const Codes = {
    nextSlide: 1,
    prevSlide: -1
};

window.addEventListener('load', function () {
    // Get the category id from the url of the page
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    // Get the subcategory name from the url of the page
    const subCategory = urlParams.get('subcategory');

    // Set the title of the document
    document.title = `Sofari: ${subCategory}`

    let url = `https://wiki-ads.onrender.com/ads?subcategory=${categoryId}`;

    // Fill the template for the subcategory name in the history navbar
    templateHandler = new TemplateHandler("subcategoryLink-template", "Subcategory");
    templateHandler.fillTemplate({ subcategory: subCategory });

    // Fetch the advertisements of the specified subcategory
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }

    fetch(url, init)
        .then(response => response.json())
        .then(subAds => {
            subAds.forEach(ad => {
                // Parse the features of each ad
                splitedFeatures = ad.features.split(';');
                splitedFeatures = splitedFeatures.map(str => (str.includes(':') ? str : str + " : Ναι"));
                ad.mapFeatures = splitedFeatures.map(str => str.split(':'));

                // Initialize the indices for the image carousels
                carousel_indices.set(ad.id, 0);
                carousel_images.set(ad.id, ad.images);
            });

            // Fill the template for the advertisements of the specified subcategory
            templateHandler = new TemplateHandler("subcategory-template", "ad-subcategories");
            templateHandler.fillTemplate({
                array: subAds,
                empty: subAds.length === 0
            });

            // Add click event listeners for the control buttons of each advertisement's carousel
            let nextBtnList = document.querySelectorAll(".carousel-next-btn");

            nextBtnList.forEach(btn => {
                btn.addEventListener("click", function (event) {
                    changeSlide(event, Codes.nextSlide)
                })
            })

            let prevtBtnList = document.querySelectorAll(".carousel-prev-btn");

            prevtBtnList.forEach(btn => {
                btn.addEventListener("click", function (event) {
                    changeSlide(event, Codes.prevSlide)
                })
            })
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// document.addEventListener("DOMContentLoaded", function());


function changeSlide(event, code) {
    // Reference the control button that was clicked
    let controlBtn = event.target;

    // Reference the other control button (either next or previous)
    alterControlBtn = controlBtn.previousElementSibling != null && controlBtn.previousElementSibling.classList.contains("carousel-control-btn") ? controlBtn.previousElementSibling: controlBtn.nextElementSibling;

    // Get the advertisement's id
    const id = +controlBtn.dataset.adId;

    // Get the advertisement's carousel index
    let index = carousel_indices.get(id);

    if (index + code >= 0 && index + code < carousel_images.get(id).length){
        // Make the control buttons appear if the index remains within the range
        controlBtn.style.display = "inline";
        alterControlBtn.style.display = "inline";

        // Change the displayed image and its attributes
        index += code;
        carousel_indices.set(id, index);
        let subproductImg = document.getElementById(`subproduct-img-${id}`);
        subproductImg.setAttribute("src", `https://wiki-ads.onrender.com/${carousel_images.get(id)[index]}`);
        subproductImg.setAttribute("Alt", `Photo ${++index}`);
    }else{
        // Make the control button that was clicked disappear as the index is no longer within the range
        controlBtn.style.display = "none";
    }
    
}


    // function changeSlide(event, code) {
    //     // event.target.style.display = 'none'
    //     const id = +event.target.dataset.adId;
    
    //     let index = (carousel_indices.get(id) + code) % carousel_images.get(id).length;
    //     carousel_indices.set(id, index);
    
    //     // console.log(index)
    //     // console.log(carousel_indices.get(id))
    //     // console.log(carousel_images.get(id)[index])
    //     // console.log(carousel_images.get(id).length)
    
    //     let subproductImg = document.getElementById(`subproduct-img-${id}`);
    //     subproductImg.setAttribute("src", `https://wiki-ads.onrender.com/${carousel_images.get(id)[index]}`);
    //     subproductImg.setAttribute("Alt", `Photo ${++index}`)
    // }