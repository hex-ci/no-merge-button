chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const regex = /^https?:\/\/.*?git.*?\/merge_requests\/\d+\/conflicts$/i;

  if (changeInfo.status === 'complete' && tab.url.match(regex)) {
    chrome.tabs.sendMessage(tab.id, {
      message: 'gitlab_load'
    });
  }
});
