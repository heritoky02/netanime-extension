function remove_links() {
    let links = document.getElementsByTagName('a');
    console.log(links.length);
    console.log(links);
    for (let i = 0; i < links.length; i++) {
        links[i].remove();
    }
}

function remove_all_links() {
    console.log("Window charge");
    let links = document.getElementsByTagName('a');
    while (links.length != 0) {
        remove_links();
    }
    return links.length
}

(
    () => {
        chrome.runtime.onMessage.addListener((msg, sender, response) => {
            const { type } = msg;
            if (type === "BLOCK_ADS") {
                const state = remove_all_links();
                // if (state === 0) {
                //     response({message: "ADS_DELETED"})
                // }
            }
        })
    }
)();
