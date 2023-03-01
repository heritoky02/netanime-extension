// Attendre que la page soit complètement chargée
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.url.includes('example.com')) {
      // Récupérer le contenu de la page
      chrome.tabs.executeScript(tabId, { code: 'document.body.innerHTML' }, function(result) {
        // Supprimer tous les éléments 'a'
        var newHTML = result[0].replace(/<a.*?>/gi, '');
        // Mettre à jour le contenu de la page
        chrome.tabs.executeScript(tabId, { code: 'document.body.innerHTML = \'' + newHTML + '\'' });
      });
    }
  });
  