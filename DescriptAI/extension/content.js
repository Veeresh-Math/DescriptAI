// DescriptAI Scraper Logic
function scrapeProduct() {
    let productName = "";
    let features = [];

    // 1. Amazon Detection
    if (window.location.hostname.includes("amazon.")) {
        productName = document.querySelector("#productTitle")?.innerText.trim() || "";
        const bulletPoints = document.querySelectorAll("#feature-bullets ul li span");
        bulletPoints.forEach(bp => {
            if (bp.innerText.trim().length > 5) features.push(bp.innerText.trim());
        });
    }

    // 2. Shopify Detection (Dynamic)
    if (document.querySelector('meta[content="Shopify"]')) {
        productName = document.querySelector("h1")?.innerText.trim() || document.title;
        // Try to find product description/features
        const desc = document.querySelector(".product-description, .product-single__description, #ProductDescription")?.innerText.trim();
        if (desc) features.push(desc);
    }

    return { productName, features: features.slice(0, 10).join("\n") };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
        sendResponse(scrapeProduct());
    }
});
