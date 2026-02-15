/**
 * DescriptAI PREMIUM KNOWLEDGE VAULT
 * This library contains elite marketing frameworks and SEO secrets for 2026
 * that are injected ONLY into Pro and Agency generations.
 */

export const KNOWLEDGE_VAULT = {
    frameworks: [
        {
            name: "PRUNE (Point, Reason, Unveil, Nail, Exit)",
            instructions: "Structure the variant using the PRUNE framework: State a sharp POINT, give a compelling REASON, UNVEIL the specific benefit, NAIL the message with a powerful punchline, and EXIT with a swift CTA."
        },
        {
            name: "PASTOR (Problem, Amplify, Solution, Testimony, Offer, Response)",
            instructions: "Inject the PASTOR framework: Identify a deep pain point (PROBLEM), AMPLIFY the consequences of ignoring it, present the product as the only true SOLUTION, use language that implies social proof (TESTIMONY), craft an irresistible OFFER, and request a specific RESPONSE."
        },
        {
            name: "BAB (Before-After-Bridge)",
            instructions: "Use the BAB storytelling model: Describe life BEFORE the product (chaotic/broken), paint a picture of life AFTER (dream state/solved), and use the product as the only BRIDGE to get there."
        },
        {
            name: "The 4 Ps (Promise, Picture, Proof, Push)",
            instructions: "Apply the 4 Ps: Lead with a bold PROMISE, paint a vivid emotional PICTURE of success, provide solid 'PROOFS' in the description, and PUSH the user towards a final action."
        }
    ],
    seo2026Secrets: [
        {
            name: "Semantic Entity Targeting",
            instructions: "SEO 2026: Focus on ENTITIES and SEMANTIC clusters. Instead of just keywords, weave in highly related concepts that signal deep topical authority to modern AI-driven search engines."
        },
        {
            name: "Conversational Intent Logic",
            instructions: "SEO 2026: Optimize for Conversational AI Overviews. Use natural-sounding 'question-to-answer' segments that AI search bots love to index and cite."
        },
        {
            name: "E-E-A-T Signal Injection",
            instructions: "SEO 2026: Inject high-authority signals (Expertise, Experience, Authoritativeness, Trust). Use phrasing that demonstrates 'first-hand usage' and 'expert knowledge' to boost Google trust rankings."
        }
    ],
    psychologicalHooks: [
        {
            name: "The Curiosity Gap",
            instructions: "PSYCHOLOGY: Exploit the 'Curiosity Gap'. Provide just enough detail to spark intense interest, making the reader feel like they MUST click/buy to learn the full secret."
        },
        {
            name: "The Belonging Factor",
            instructions: "PSYCHOLOGY: Use 'The Belonging Factor'. Group the target audience into an exclusive community (e.g., 'Modern Merchants' or 'Elite Sellers') that only this product serves."
        },
        {
            name: "Mañana Antidote (Urgency)",
            instructions: "PSYCHOLOGY: Apply the 'Mañana Antidote'. Destroy procrastination by highlighting the immediate daily cost of NOT having this product today."
        }
    ]
};

export function getRandomPremiumSecret() {
    const categories = ['frameworks', 'seo2026Secrets', 'psychologicalHooks'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)] as keyof typeof KNOWLEDGE_VAULT;
    const items = KNOWLEDGE_VAULT[randomCategory];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    return {
        category: randomCategory,
        ...randomItem
    };
}

