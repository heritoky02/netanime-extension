// Envoyer un message au script d'arrière-plan pour obtenir l'URL de l'onglet courant
chrome.runtime.sendMessage({command: "getCurrentUrl"}, function(response) {
    // Supprimer les éléments <a> du DOM si l'URL contient "example.com"
    if (response.url.includes("https://fusevideo.net/")) {
        console.log("Lien trouve");
        let links = document.getElementsByTagName('a');
        for (let i = 0; i < links.length; i++) {
            links[i].remove();
        }
    }
});

  