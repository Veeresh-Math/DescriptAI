// DescriptAI Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
    console.log("DescriptAI Extension Installed!");
});

// Proxy API requests to localhost:3000 to avoid CORS issues if possible
// Note: Manifest host_permissions already allow localhost:3000
