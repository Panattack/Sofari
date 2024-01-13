const generalUrl = "https://wiki-ads.onrender.com/"

function redirectToPage(pageUrl) {
    window.location.href = pageUrl
}

function showPopupMsg(id, messageText = undefined, delay_ms = 1000) {
    let popupList = document.querySelectorAll(".overlay")

    popup = Array.from(popupList).find(popup => popup.firstElementChild.getAttribute("id") === id)

    if (popup) {
        popup.style.display = 'flex';

        if (messageText !== undefined) {
            let span = popup.querySelector('span > span > span')

            if (span) {
                span.textContent = messageText;
            }  
        }

        // Prevent scrolling
        document.body.style.overflow = 'hidden';

        if (delay_ms !== null) {
            setTimeout(function () {
                popup.style.display = 'none';

                // Enable scrolling again
                document.body.style.overflow = '';

            }, delay_ms);
        }
    }
}

function showInlinePopupMsg(id, text, delay_ms = 1000) {
    popup = document.getElementById(id);

    if (popup) {
        popup.textContent = text;
        popup.style.display = 'block';

        if (delay_ms !== null) {
            setTimeout(function () {
                popup.textContent = '';
                popup.style.display = 'none';
            }, delay_ms);
        }
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

function preprocessingAds(advertisements) {
    advertisements.forEach(element => {
        element.title = element.title.replaceAll("'", "\'");
        element.description = element.description.replaceAll("'", "\`");
    });
    return advertisements;
}