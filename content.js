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

/**
 * Store the last playing time of the video in seconds.
 * @param {string} videoId ID of the video from the link
 */
function storeTime(videoId) {
  const videos = document.getElementsByTagName("video");
  const video = videos[0];
  const time = video.currentTime;
  chrome.storage.local.set({ [videoId]: JSON.stringify(time) });
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
  video.click();
  if (value && confirm("Would you like to continue?")) {
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

      checkTimeInStorage(msg.videoId);

      let start = false;
      window.addEventListener("beforeunload", (e) => {
        setTimeout(() => {}, 100)
        start = true;
      });
      window.addEventListener("unload", (e) => {
        if (start) storeTime(msg.videoId);
      });
    }
  }
});
