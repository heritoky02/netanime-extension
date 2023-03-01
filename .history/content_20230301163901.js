chrome.tabs.query({"active": true, "currentWindow": true}, (tabs) => {
    const currentTab = tabs[0];
    const url = currentTab.url;
    if (["https://fusevideo.net/"])
})