chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ darkThemeEnabled: false });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get("darkThemeEnabled", (data) => {
    const darkThemeEnabled = !data.darkThemeEnabled;

    if (darkThemeEnabled) {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["dark-theme.css"],
      });
    } else {
      chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: ["dark-theme.css"],
      });
    }

    chrome.storage.sync.set({ darkThemeEnabled });
  });
});
