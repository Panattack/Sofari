const generalUrl = "https://wiki-ads.onrender.com/"

function redirectToPage(pageUrl) {
    window.location.href = pageUrl
}

function showPopupMsg(id) {
    let popupList = document.querySelectorAll(".overlay")

    popup = Array.from(popupList).find(popup => popup.firstElementChild.getAttribute("id") === id)

    console.log(popup)

    if (popup) {
        popup.style.display = 'flex';

        // Prevent scrolling
        document.body.style.overflow = 'hidden';

        setTimeout(function () {
            popup.style.display = 'none';

            // Enable scrolling again
            document.body.style.overflow = '';

        }, 1000);
    }
}

class TemplateHandler {
    constructor(templateId, elementId) {
        this.templateId = templateId
        this.elementId = elementId
    }

    fillTemplate(contentObject) {
        window.templates = {}
        let template = document.getElementById(this.templateId).textContent;
        window.templates.template = Handlebars.compile(template);
        let contentOfTemplate = document.getElementById(this.elementId);
        contentOfTemplate.innerHTML = templates.template(contentObject);
    }
}