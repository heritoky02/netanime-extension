// Écouter les messages envoyés par le script de contenu
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "getCurrentUrl") {
        // Obtenir l'URL de l'onglet courant
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let url = tabs[0].url;
            if ()
            sendResponse({url: url});
        });
    }
    return true;
});
