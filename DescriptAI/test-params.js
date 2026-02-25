const fs = require('fs');

try {
    const content = fs.readFileSync('.env.local', 'utf8');
    const match = content.match(/GROQ_API_KEY=(.+)/);
    const apiKey = match ? match[1].trim() : null;

    if (!apiKey) {
        console.error("No GROQ_API_KEY found in .env.local");
        process.exit(1);
    }

    async function testWithParams(tone, length) {
        console.log(`Testing Tone: ${tone}, Length: ${length}...`);
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
                    STRICT REQUIREMENTS:
                    - Tone: ${tone}.
                    - Word count: ${length === 'long' ? 'AT LEAST 1000 words' : '200 words'}.`
                            },
                            { role: "user", content: "Write a product description for a 'Cloud CRM' with features 'Auto-sync, AI-leads, dashboard'." }
                        ],
                        temperature: 0.7,
                        max_tokens: 3000,
                    }),
                }
            );

            const data = await response.json();
            const text = data.choices?.[0]?.message?.content || "";
            console.log(`Length: ${text.split(/\s+/).length} words`);
            console.log(`Snippet: ${text.substring(0, 100)}...`);
            console.log("-------------------");
        } catch (e) {
            console.error("Error:", e);
        }
    }

    (async () => {
        await testWithParams("professional", "short");
        await testWithParams("casual", "long");
    })();
} catch (err) {
    console.log("Failed", err);
}
