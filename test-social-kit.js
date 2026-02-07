const fs = require('fs');

try {
    const content = fs.readFileSync('.env.local', 'utf8');
    const match = content.match(/GROQ_API_KEY=(.+)/);
    const apiKey = match ? match[1].trim() : null;

    if (!apiKey) {
        console.error("No GROQ_API_KEY found in .env.local");
        process.exit(1);
    }

    async function testSocialKit() {
        console.log(`Testing Social Multiplier Backend...`);
        try {
            const response = await fetch(
                "https://api.groq.com/openai/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        model: "llama-3.3-70b-versatile",
                        messages: [
                            {
                                role: "system",
                                content: `You are a high-level Co-founder and SEO Expert. 
                    Instructions:
                    1. Write 1 distinct product description variant.
                    2. Use a captivating headline.
                    3. Use bullet points for features.
                    4. End with a strong call-to-action.
                    5. Provide a "Social Kit" containing:
                       - An Instagram Caption (with hashtags)
                       - A Twitter/X Post
                       - A Facebook Ad Hook
                    6. Word count: 200 words.`
                            },
                            { role: "user", content: "Product: Wireless Headphones" }
                        ],
                        temperature: 0.7,
                        max_tokens: 1000,
                    }),
                }
            );

            const data = await response.json();
            const text = data.choices?.[0]?.message?.content || "";
            console.log("Full Output Snapshot:");
            console.log(text);
            console.log("-------------------");
            if (text.includes("Social Kit") || text.includes("Instagram")) {
                console.log("SUCCESS: Social Kit found in output.");
            } else {
                console.log("FAILURE: Social Kit markers missing.");
            }
        } catch (e) {
            console.error("Error:", e);
        }
    }

    testSocialKit();
} catch (err) {
    console.log("Failed", err);
}
