const sigarraRegex = /.*:\/\/sigarra\.up\.pt\/feup\/.*/;

// Add default values for each option here
const popupOptions = {
  navbar: "on",
  shortcuts: "on",
  autoLogin: "off",
  font: "on",
};

const reloadFEUPSigarraPages = () => {
  chrome.tabs.query({ url: "*://sigarra.up.pt/feup/*" }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id);
    });
  });
}

chrome.runtime.onInstalled.addListener((object) => {
  if (object.reason === "install") {
    reloadFEUPSigarraPages()

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      chrome.tabs.create({
        url: chrome.runtime.getURL("html/autorize.html")
      });
    }else{
      chrome.tabs.create({
        url: chrome.runtime.getURL("html/installed.html")
      });
    }

    chrome.storage.local.set(popupOptions);
  }

  if (object.reason === "update") {
    reloadFEUPSigarraPages();
    for (const opt in popupOptions) {
      if (chrome.storage.local.get(opt) == null)
        chrome.storage.local.set({[opt]: popupOptions[opt]});
    }
  }
});


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if(!sender.tab.active){
    console.log("tab not active skipping message...")
    return;
  }
  if (message.type == "login") {
    const cookie = await chrome.cookies.get({ name: "SI_SESSION", url: sender.tab.url })
    console.log(cookie)
    if(cookie == null || cookie.value === "0"){
      sendResponse(false);
      return;
    }
    message.auto_login.verifed = true;
    await chrome.storage.local.set({ auto_login: message.auto_login });
    sendResponse(true);
  }
});

chrome.permissions.onRemoved.addListener((permissions) => {
  //TODO:
});