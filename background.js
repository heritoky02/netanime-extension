chrome.tabs.onUpdated.addListener((tabId, tabInfo, tab) => {
    if (tabInfo.status === "complete" && tab.url && tab.url.includes("fusevideo.net") && tab.url.includes("?ref")) {
        console.log("URL found: ", tab.url)
        const queryParameter = tab.url.split("?")[1];
        const urlParameter = new URLSearchParams(queryParameter);

        console.log("Ref: ", urlParameter.get("ref"))
        chrome.tabs.sendMessage(tabId, {
            type: "BLOCK_ADS",
            videoId: urlParameter.get("ref")
        });

    } else {
        console.log("URL not found: ", tab.url)
    }
})
