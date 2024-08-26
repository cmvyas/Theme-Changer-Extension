document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle");

  // Using chrome.storage.local as a fallback if chrome.storage.sync is unavailable
  const storage = chrome.storage.sync || chrome.storage.local;

  // Retrieve the current status of the dark theme
  storage.get("darkThemeEnabled", (data) => {
    const darkThemeEnabled = data.darkThemeEnabled || false;
    toggleButton.checked = darkThemeEnabled;
    updateToggleAppearance(darkThemeEnabled);
  });

  // Handle the toggle button change event
  toggleButton.addEventListener("change", () => {
    const darkThemeEnabled = toggleButton.checked;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (darkThemeEnabled) {
        chrome.scripting.insertCSS({
          target: { tabId: tabs[0].id },
          files: ["dark-theme.css"],
        });
      } else {
        chrome.scripting.removeCSS({
          target: { tabId: tabs[0].id },
          files: ["dark-theme.css"],
        });
      }
    });

    storage.set({ darkThemeEnabled }, () => {
      updateToggleAppearance(darkThemeEnabled);
    });
  });

  function updateToggleAppearance(isDark) {
    const slider = document.querySelector(".slider");
    slider.style.backgroundImage = isDark
      ? "url('dark.jpg')"
      : "url('images.jpeg')";
    const circle = slider.querySelector("::before");
    circle.style.backgroundColor = isDark ? "white" : "yellow";
  }
});
