// // Envoyer un message au script d'arrière-plan pour obtenir l'URL de l'onglet courant
// chrome.runtime.sendMessage({command: "getCurrentUrl"}, function(response) {
//     // Supprimer les éléments <a> du DOM si l'URL contient "example.com"
//     console.log(response.url);
//     if (response.url != "") {
//         console.log("Lien trouve");
//         let links = document.getElementsByTagName('a');
//         console.log(links);
//         for (let i = 0; i < links.length; i++) {
//             links[i].remove();
//         }
//     }
// });

function remove_links() {
    let links = document.getElementsByTagName('a');
    console.log(links);
    for (let i = 0; i < links.length; i++) {
        links[i].remove();
    }
}

window.addEventListener("load", () => {
    console.log("Window charge");
    remove_links()
    document.addEventListener("load", () => {
        console.log("Document chaerge");
        remove_links()
    })
})