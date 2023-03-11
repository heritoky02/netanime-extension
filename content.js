/**
 * Remove all links (balise **a**) present in the document.
 */
function removeLinks() {
  let links = document.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    links[i].remove();
  }
}

/**
 * Wait for the page to load and remove all links in the document.
 * @returns {int} Length of the links in the document, if 0 that's mean all links are removed, otherwise the length is greater than zero, that's mean failled to reomve a link.
 */
function removeAllLinks() {
  let links = document.getElementsByTagName("a");
  while (links.length != 0) {
    removeLinks();
  }
  return links.length;
}

function fetchData(videoId) {
  return new Promise((resolve) => {
    chrome.storage.local.get([videoId]).then((result) => {
      resolve(result[videoId] ? JSON.parse(result[videoId]) : null);
    });
  });
}

async function checkTimeInStorage(videoId) {
  const videos = document.getElementsByTagName("video");
  const video = videos[0];

  const value = await fetchData(videoId);
  console.log(value);
  if (value && confirm("Would you like to continue?")) {
    video.click();
    video.currentTime = value;
  }
}

// ---------------------------------------------------------------- //

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const { type } = msg;
  if (type === "BLOCK_ADS") {
    const state = removeAllLinks();
    if (state === 0) {
      console.log("All links removed");

      const videos = document.getElementsByTagName("video");
      const video = videos[0];

      checkTimeInStorage(msg.videoId);

      window.addEventListener("beforeunload", (e) => {
        const videoId = msg.videoId;
        const time = video.currentTime;
        console.log(`From ${sender.id} to store ${time} seconds in ${videoId}`);
        chrome.storage.local.set({[videoId]:JSON.stringify(time)})
      });
    }
  }
});
