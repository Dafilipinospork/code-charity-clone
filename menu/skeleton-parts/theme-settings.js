const applyCustomTheme = () => {
    chrome.storage.sync.get(["primaryColor", "secondaryColor"], function(data) {
        if (data.primaryColor && data.secondaryColor) {
            const gradient = `linear-gradient(135deg, ${data.primaryColor}, ${data.secondaryColor})`;
            document.documentElement.style.setProperty('--primary-color', data.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', data.secondaryColor);
            document.documentElement.style.setProperty('--gradient-bg', gradient);
        } else if (data.primaryColor) {
            document.documentElement.style.setProperty('--primary-color', data.primaryColor);
            document.body.style.backgroundColor = data.primaryColor;
        }
    });
};

// Apply immediately
applyCustomTheme();

// Reapply colors when YouTube loads new content dynamically
const observer = new MutationObserver(applyCustomTheme);
observer.observe(document.body, { childList: true, subtree: true });
