import { keys } from "~/common/objects";
import {
    groupChildrenBySelector,
    groupSectionTitleAndContent,
    moveChildrenToAncestor,
    removeTwoColumnTable,
} from "~/common/layout";

const publicationWebsites = {
    "authenticus.pt": { icon: "authenticusID.png", text: "Authenticus ID" },
    "orcid.org": { icon: "orcid.png", text: "ORCID" },
    "cienciavitae.pt": { icon: "cienciaID.png", text: "Ciência ID" },
    "publons.com": { icon: "researchID.png", text: "Research-ID" },
    "scopus.com": { icon: "scopus.png", text: "Scopus" },
} as const;

export default () => {
    makeTitleBar();
    moveResearchSection();
    makePublicationWebsiteButtons();
    groupSectionTitleAndContent(".informacao-pessoal-funcoes");
    groupSectionTitleAndContent(".informacao-pessoal-dados-dados");
    makeWebsiteButtonIfExists();

    tagGroupedElements();

    //nuke the html structure, leaving only the elements that contain the information
    moveChildrenToAncestor(".informacao-pessoal-dados-dados");
    moveChildrenToAncestor(".informacao-pessoal-dados");
    moveChildrenToAncestor(".informacao-pessoal-funcoes");

    //we group the page contents to be easier to style to
    groupChildrenBySelector(
        [".se-teacher-title-bar", ".tabelasz", ".se-website-button"],
        ["se-main-info-content"],
    );

    groupChildrenBySelector(
        [".informacao-pessoal-dados-foto", ".se-main-info-content"],
        ["se-main-info-row"],
    );

    groupChildrenBySelector(
        [".se-contact-info", ".se-roles", ".se-publication-website-list"],
        ["se-extra-information-row"],
    );

    removeTwoColumnTable(".se-contact-info > table", true);

    //i hate sigarra, for some reason it nests one table inside each other
    const rolesTable = document.querySelector<HTMLTableElement>(
        ".se-roles > table > tbody > tr > td > table",
    );
    if (rolesTable !== null) {
        document.querySelector(".se-roles > table")?.remove();
        document.querySelector(".se-roles")?.appendChild(rolesTable);
        removeTwoColumnTable(".se-roles > table", true);
    }

    const investigationTable = document.querySelector<HTMLTableElement>(
        ".informacao-pessoal-outras > table > tbody > tr > td > table",
    );
    if (investigationTable !== null) {
        document.querySelector(".informacao-pessoal-outras > table")?.remove();
        document
            .querySelector(".informacao-pessoal-outras")
            ?.appendChild(investigationTable);
        removeTwoColumnTable(".informacao-pessoal-outras > table", true);
    }
};

function tagGroupedElements() {
    let contacts = document.querySelector<HTMLDivElement>(
        ".informacao-pessoal-dados-dados > div:not(.se-website-button)",
    );
    if (contacts !== null) {
        contacts.classList.add("se-contact-info");
    } else {
        contacts = document.querySelector<HTMLTableElement>(
            ".informacao-pessoal-dados-dados > table:not(.tabelasz)",
        );
        const div = document.createElement("div");
        const informacao_pessoal = document.querySelector(
            ".informacao-pessoal-dados-dados",
        );
        const h3 = document.createElement("h3");
        h3.textContent = "Contactos";
        if (contacts !== null) div.append(h3, contacts);
        div.classList.add("se-contact-info");
        informacao_pessoal?.appendChild(div);
    }
    const roles = document.querySelector(".informacao-pessoal-funcoes");
    if (roles !== null) {
        if (roles.childElementCount === 1) {
            roles.children[0].classList.add("se-roles");
        } else if (roles.childElementCount > 1) {
            roles.children[0].classList.add("se-roles");
            roles.children[1].classList.add("se-positions");
        }
    }
}

function makeWebsiteButtonIfExists() {
    const websiteIcon = document.querySelector<HTMLAnchorElement>(
        ".informacao-pessoal-dados-dados > table > tbody > tr:nth-child(1) > td:nth-child(2) > a",
    );
    const informationElement = document.querySelector(
        ".informacao-pessoal-dados-dados",
    );
    if (websiteIcon === null) return;

    const websiteLink = websiteIcon.href;
    const websiteButton = document.createElement("a");
    websiteButton.classList.add("se-website-button");
    websiteButton.href = websiteLink;
    websiteButton.textContent = "Website";

    informationElement?.append(websiteButton);
    websiteIcon.remove();
}

function makePublicationWebsiteButtons() {
    const tabelasz =
        document.querySelector<HTMLTableSectionElement>(".tabelasz > tbody");
    const informacaoPessoal = document.querySelector(
        ".informacao-pessoal-dados",
    );
    const websiteList = document.createElement("div");
    websiteList.classList.add("se-publication-website-list");
    const listOfRows = tabelasz && [...tabelasz.children];
    listOfRows?.forEach((row) => {
        const linkElement = row.querySelector<HTMLAnchorElement>(
            "td:nth-child(2) > a",
        );
        if (linkElement === null) {
            return;
        }
        const link = linkElement.href;
        let found = false;
        for (const website of keys(publicationWebsites)) {
            if (link.includes(website)) {
                found = true;
                const image = document.createElement("img");
                image.src = chrome.runtime.getURL(
                    "images/publicationWebsiteLogo/" +
                        publicationWebsites[website].icon,
                );
                const text = document.createElement("p");
                text.textContent = publicationWebsites[website].text;

                const a = document.createElement("a");
                a.appendChild(image);
                a.appendChild(text);
                a.classList.add("se-publication-website-button");
                a.href = link;
                websiteList.appendChild(a);
                break;
            }
        }

        if (found) row.remove();
    });

    informacaoPessoal?.appendChild(websiteList);
}

function moveResearchSection() {
    const researchSection = document.querySelector(
        ".informacao-pessoal-outras",
    );
    const informacaoPessoal = document.querySelector(
        ".informacao-pessoal-dados",
    );

    if (!researchSection) return;

    researchSection.remove();
    const rolesSection = document.querySelector(".informacao-pessoal-funcoes");
    informacaoPessoal?.insertBefore(researchSection, rolesSection);
}

function makeTitleBar() {
    const informacaoPessoal = document.querySelector(".informacao-pessoal");

    const titleElement = document.querySelectorAll("#conteudoinner > h1")[1];
    const title = titleElement.textContent;
    titleElement.remove();
    const siglaRow = document.querySelector(
        ".tabelasz > tbody:nth-child(1) > tr:nth-child(2)",
    );
    const sigla = document.querySelector<HTMLElement>(
        ".tabelasz > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > b:nth-child(1)",
    )?.textContent;
    siglaRow?.remove();

    const titleBar = document.createElement("div");
    titleBar.classList.add("se-teacher-title-bar");

    const newTitle = document.createElement("h1");
    newTitle.textContent = title;

    const newSigla = document.createElement("h3");
    newSigla.textContent = sigla ?? "";

    titleBar.appendChild(newTitle);
    titleBar.appendChild(newSigla);

    informacaoPessoal?.prepend(titleBar);
}
