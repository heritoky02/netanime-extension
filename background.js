chrome.tabs.onUpdated.addListener((tabId, tabInfo, tab) => {
  if (
    tabInfo.status === "complete" &&
    /^https:\/\/fusevideo\.net\/[a-zA-Z0-9]+\/\w+\/\?ref=[a-zA-Z0-9]+$/.test(
      tab.url
    )
  ) {
    console.log("URL found: ", tab.url);
    const queryParameter = tab.url.split("?")[1];
    const urlParameter = new URLSearchParams(queryParameter);

    console.log("Ref: ", urlParameter.get("ref"));
    chrome.tabs.sendMessage(tabId, {
      type: "BLOCK_ADS",
      videoId: urlParameter.get("ref"),
    });
  } else if (tabInfo.status === "loading" || tabInfo.favIconUrl) {
    console.log("Loading...");
  } else {
    console.log("URL not found: ", tab.url);
  }
});
