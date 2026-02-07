const fs = require('fs');

try {
    const content = fs.readFileSync('.env.local', 'utf8');
    const match = content.match(/GROQ_API_KEY=(.+)/);
    const apiKey = match ? match[1].trim() : null;

    if (!apiKey) {
        console.error("No GROQ_API_KEY found in .env.local");
        process.exit(1);
    }

    async function testEnthusiastic() {
        console.log(`Testing Enthusiastic tone...`);
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
                    - Persona: Write from the perspective of a Co-founder.
                    - Tone: enthusiastic.
                    - Word count: 200-300 words.
                    
                    Instructions:
                    1. Write 3 distinct variants.
                    2. Use a captivating headline for each.
                    3. Use bullet points for features.
                    4. End with a strong call-to-action.
                    5. SEPARATE variants with "---".`
                            },
                            { role: "user", content: "Write product descriptions for a 'New Smart Watch' with features 'Long battery, water resistant, heart monitor'." }
                        ],
                        temperature: 0.7,
                        max_tokens: 3000,
                    }),
                }
            );

            const data = await response.json();
            const text = data.choices?.[0]?.message?.content || "";
            console.log("Full Output Snapshot:");
            console.log(text.substring(0, 500) + "...");
            const parts = text.split("---");
            console.log(`Number of parts found with ---: ${parts.length}`);
            parts.forEach((p, i) => console.log(`Part ${i + 1} length: ${p.trim().length}`));
        } catch (e) {
            console.error("Error:", e);
        }
    }

    testEnthusiastic();
} catch (err) {
    console.log("Failed", err);
}
