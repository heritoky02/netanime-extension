chrome.tabs.query({"active": true, "currentWindow": true}, (tabs) => {
    const currentTab = tabs[0]
})