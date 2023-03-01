chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: function () {
            const pageContent = document.getElementsByTagName();
            console.log(pageContent);
        }
    });
});
