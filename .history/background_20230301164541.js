chrome.tabs.query({"active": true, "currentWindow": true}, (tabs) => {
    const currentTab = tabs[0];
    const url = currentTab.url;
    console.log('====================================');
    console.log();
    console.log('====================================');
    if (url.includes("https://fusevideo.net/")){
        alert("Trouve")
    }
})
