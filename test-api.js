const fs = require('fs');

// Read .env.local manually
try {
    const content = fs.readFileSync('.env.local', 'utf8');
    const match = content.match(/GROQ_API_KEY=(.+)/);
    const apiKey = match ? match[1].trim() : null;

    if (!apiKey) {
        console.error("No GROQ_API_KEY found in .env.local");
        process.exit(1);
    }

    async function testGroq() {
        console.log("Testing Groq API...");
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
                        model: "llama-3.3-70b-versatile", // Testing stable model
                        messages: [{ role: "user", content: "Say hello!" }],
                    }),
                }
            );

            console.log("Status:", response.status);
            const data = await response.json();
            console.log("Response:", JSON.stringify(data, null, 2));
        } catch (e) {
            console.error("Error:", e);
        }
    }

    testGroq();
} catch (err) {
    console.log("Failed to testing Groq", err);
}
