const API_BASE = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", async () => {
    const productNameInput = document.getElementById("product-name");
    const featuresInput = document.getElementById("features");
    const generateBtn = document.getElementById("generate-btn");
    const resultsDiv = document.getElementById("results");
    const variantsContainer = document.getElementById("variants-container");
    const errorDiv = document.getElementById("error");
    const tierBadge = document.getElementById("tier-badge");
    const agencySuite = document.getElementById("agency-suite");
    const scraperBox = document.getElementById("scraper-box");
    const scrapedNameText = document.getElementById("scraped-name");

    // 1. Check User Status
    try {
        const res = await fetch(`${API_BASE}/user`);
        if (res.ok) {
            const user = await res.json();
            tierBadge.innerText = user.tier.toUpperCase();
            if (user.tier === "agency") {
                agencySuite.classList.remove("hidden");
            }
        } else {
            tierBadge.innerText = "LOGIN REQUIRED";
        }
    } catch {
        tierBadge.innerText = "OFFLINE";
    }


    // 2. Trigger Scrape on Active Tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && (tab.url.includes("amazon.com") || tab.url.includes("shopify.com"))) {
        chrome.tabs.sendMessage(tab.id, { action: "scrape" }, (response) => {
            if (response && response.productName) {
                productNameInput.value = response.productName;
                featuresInput.value = response.features;
                scraperBox.classList.remove("hidden");
                scrapedNameText.innerText = response.productName;
            }
        });
    }

    // 3. Handle Generation
    generateBtn.addEventListener("click", async () => {
        const productName = productNameInput.value;
        const features = featuresInput.value;
        const keywords = document.getElementById("keywords")?.value || "";

        if (!productName || !features) {
            showError("Please fill in product details!");
            return;
        }

        generateBtn.disabled = true;
        generateBtn.innerText = "🪄 Generating...";
        errorDiv.classList.add("hidden");

        try {
            const res = await fetch(`${API_BASE}/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productName,
                    features,
                    tone: "professional",
                    length: "medium",
                    customKeywords: keywords
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "API Error");

            const variants = (data.generated_text || "").split(/\[\[NEXT_VARIANT\]\]|---/g).map(v => v.trim()).filter(v => v.length > 20).slice(0, 3);

            displayVariants(variants);
        } catch (err) {
            showError(err.message);
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerText = "⚡ Generate 3 Variants";
        }
    });

    function displayVariants(variants) {
        resultsDiv.classList.remove("hidden");
        variantsContainer.innerHTML = "";
        variants.forEach((v) => {

            const div = document.createElement("div");
            div.className = "p-3 bg-white border border-purple-100 rounded-lg text-xs relative group";
            div.innerHTML = `
                <p class="text-gray-700 leading-relaxed">${v.substring(0, 200)}...</p>
                <button class="mt-2 text-purple-600 font-bold hover:underline">📋 Copy Full Copy</button>
            `;
            div.querySelector("button").onclick = () => {
                navigator.clipboard.writeText(v);
                alert("Copied to clipboard!");
            };
            variantsContainer.appendChild(div);
        });
    }

    function showError(msg) {
        errorDiv.innerText = msg;
        errorDiv.classList.remove("hidden");
    }
});
