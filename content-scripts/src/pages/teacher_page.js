import {groupSectionTitleAndContent, groupChildrenBySelector, removeElementWithoutChildren, removeTwoColumnTable} from "../modules/utilities/pageUtils"


const publicationWebsites = {
    "authenticus.pt": { icon: "authenticusID.png", text: "Authenticus ID" },
    "orcid.org": { icon: "orcid.png", text: "ORCID" },
    "cienciavitae.pt": { icon: "cienciaID.png", text: "Ciência ID" },
    "publons.com": { icon: "researchID.png", text: "Research-ID" },
    "scopus.com": { icon: "scopus.png", text: "Scopus" }
}


export const teacherPage = () => {
    if (!document.location.href.toLowerCase().includes("func_geral.formview")) {
        return;
    }
    makeTitleBar();
    moveResearchSection();
    makePublicationWebsiteButtons();
    groupSectionTitleAndContent(".informacao-pessoal-funcoes");
    groupSectionTitleAndContent(".informacao-pessoal-dados-dados");
    makeWebsiteButtonIfExists();

    tagGroupedElements();

    //nuke the html structure, leaving only the elements that contain the information
    removeElementWithoutChildren(".informacao-pessoal-dados-dados");
    removeElementWithoutChildren(".informacao-pessoal-dados");
    removeElementWithoutChildren(".informacao-pessoal-funcoes");


    //we group the page contents to be easier to style to
    groupChildrenBySelector([".teacherTitleBar", ".tabelasz", ".websiteButton"],
        ["mainInfoContent"]);
    
    groupChildrenBySelector([".informacao-pessoal-dados-foto", ".mainInfoContent"], 
        ["mainInfoRow"]);

    groupChildrenBySelector([".contact-info", ".roles", ".publicationWebsiteList"],
        ["extaInformationRow"]);

    removeTwoColumnTable(".contact-info > table", true);

    //i hate sigarra, for some reason it nests one table inside each other
    const rolesTable = document.querySelector(".roles > table > tbody > tr > td > table");
    if(rolesTable !== null){
        document.querySelector(".roles > table").remove();
        document.querySelector(".roles").appendChild(rolesTable);
        removeTwoColumnTable(".roles > table", true);
    }

    const investigationTable = document.querySelector(".informacao-pessoal-outras > table > tbody > tr > td > table");
    if(investigationTable !== null){
        document.querySelector(".informacao-pessoal-outras > table").remove();
        document.querySelector(".informacao-pessoal-outras").appendChild(investigationTable);
        removeTwoColumnTable(".informacao-pessoal-outras > table", true);

    }




};


function tagGroupedElements(){
    const contacts = document.querySelector(".informacao-pessoal-dados-dados > div");
    if(contacts !== null){
        contacts.classList.add("contact-info")
    }
    const roles = document.querySelector(".informacao-pessoal-funcoes");
    if(roles !== null){
        if(roles.childElementCount === 1){
            roles.children[0].classList.add("roles");
        } else if (roles.childElementCount > 1){
            roles.children[0].classList.add("roles");
            roles.children[1].classList.add("positions");
        }
    }

}



function makeWebsiteButtonIfExists(){
    const websiteIcon = document
        .querySelector(".informacao-pessoal-dados-dados > table > tbody > tr:nth-child(1) > td:nth-child(2) > a");
    const informationElement = document.querySelector(".informacao-pessoal-dados-dados")
    if(websiteIcon === null) return;

    const websiteLink = websiteIcon.href;
    const websiteButton = document.createElement("div");
    websiteButton.classList.add("websiteButton");
    websiteButton.onclick = () => {location.href = websiteLink};

    const websiteText = document.createElement("p");
    websiteText.textContent = "Website";
    websiteButton.appendChild(websiteText);

    informationElement.append(websiteButton);
    websiteIcon.remove();


}



function makePublicationWebsiteButtons() {
    const tabelasz = document.querySelector(".tabelasz > tbody")
    const informacaoPessoal = document.querySelector(".informacao-pessoal-dados");
    const websiteList = document.createElement("div")
    websiteList.classList.add("publicationWebsiteList")
    const listOfRows = [...tabelasz.children]
    listOfRows.forEach((row) => {
        console.log(row)
        const linkElement = row.querySelector("td:nth-child(2) > a")
        if (linkElement === null) {
            return;
        }
        const link = linkElement.href
        console.log(link)
        var found = false;
        for (website of Object.keys(publicationWebsites)) {
            if (link.includes(website)) {
                found = true
                const image = document.createElement("img")
                image.src = chrome.runtime.getURL("images/publicationWebsiteLogo/" +
                    publicationWebsites[website].icon);
                const text = document.createElement("p")
                text.textContent = publicationWebsites[website].text

                const div = document.createElement("div")
                div.appendChild(image)
                div.appendChild(text)
                div.classList.add("publicationWebsiteButton")
                div.onclick = () => { location.href = link }
                websiteList.appendChild(div)
                break;
            }
        }

        if (found) row.remove()
    })


    informacaoPessoal.appendChild(websiteList)

}

function moveResearchSection() {
    const researchSection = document.querySelector(".informacao-pessoal-outras");
    const informacaoPessoal = document.querySelector(".informacao-pessoal-dados");
    researchSection.remove();
    const rolesSection = document.querySelector(".informacao-pessoal-funcoes");
    informacaoPessoal.insertBefore(researchSection, rolesSection);
}

function makeTitleBar() {
    const informacaoPessoal = document.querySelector(".informacao-pessoal");

    const titleElement = document.querySelectorAll("#conteudoinner > h1")[1];
    const title = titleElement.textContent;
    titleElement.remove();
    const siglaRow = document.querySelector(".tabelasz > tbody:nth-child(1) > tr:nth-child(2)");
    const sigla = document.querySelector(".tabelasz > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > b:nth-child(1)")
        .textContent;
    siglaRow.remove();

    const titleBar = document.createElement("div");
    titleBar.classList.add("teacherTitleBar");

    const newTitle = document.createElement("h1");
    newTitle.textContent = title;

    const newSigla = document.createElement("h3");
    newSigla.textContent = sigla;

    titleBar.appendChild(newTitle);
    titleBar.appendChild(newSigla);


    informacaoPessoal.prepend(titleBar);
}
