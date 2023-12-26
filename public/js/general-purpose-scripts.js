const generalUrl = "https://wiki-ads.onrender.com/"

function redirectToPage(pageUrl) {
    window.location.href = pageUrl
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