/**
 * DescriptAI STATIC RESOURCE FALLBACKS
 * These are "Gold Standard" templates used only when ALL AI providers fail.
 */

export const STATIC_RESOURCES = {
    templates: [
        {
            category: "General/SaaS",
            variants: [
                "Unlock the Full Potential of {{PRODUCT_NAME}}: Designed for Innovators.\n\n" +
                "Stop struggling with complex workflows. {{PRODUCT_NAME}} is the AI-powered visual workspace that helps teams scale faster and collaborate better.\n\n" +
                "Key Advantages:\n- Streamlined efficiency for {{FEATURES}}\n- Built-in analytics and performance tracking\n- Enterprise-grade security out of the box\n\n" +
                "Join thousands of professionals already dominating their niche. Start your journey with {{PRODUCT_NAME}} today.",

                "The {{PRODUCT_NAME}} Revolution: Scalable Solutions for Modern Teams.\n\n" +
                "In a world of constant noise, {{PRODUCT_NAME}} provides the clarity you need. By focusing on {{FEATURES}}, we've created a platform that doesn't just work—it inspires.\n\n" +
                "Why {{PRODUCT_NAME}}?:\n- Faster decision making\n- Direct ROI on {{FEATURES}}\n- Seamless integration into your stack\n\n" +
                "Don't get left behind. Experience the future of work."
            ]
        },
        {
            category: "Ecommerce/Product",
            variants: [
                "Experience Premium Quality with {{PRODUCT_NAME}}: Built to Last.\n\n" +
                "Elevate your daily routine with the unmatched precision of {{PRODUCT_NAME}}. Specially crafted to master {{FEATURES}}, this is the solution you've been waiting for.\n\n" +
                "Product Highlights:\n- Sustainable materials and elite craftsmanship\n- Optimized for {{FEATURES}}\n- 30-day performance guarantee\n\n" +
                "Upgrade your lifestyle. Add {{PRODUCT_NAME}} to your collection now.",

                "Why Leaders Choose {{PRODUCT_NAME}} for {{FEATURES}}.\n\n" +
                "Precision meets passion in the latest release of {{PRODUCT_NAME}}. We've combined industrial-grade power with elegant design to help you conquer {{FEATURES}} with ease.\n\n" +
                "What's Inside:\n- High-density performance modules\n- Ergonomic design for maximum comfort\n- Universal compatibility\n\n" +
                "Join the elite. Get {{PRODUCT_NAME}} while supplies last."
            ]
        },
        {
            category: "B2B/Service",
            variants: [
                "Maximize Your Output with {{PRODUCT_NAME}}: The B2B Standard.\n\n" +
                "Transform your operational capacity with {{PRODUCT_NAME}}. Our data-driven approach to {{FEATURES}} ensures your business stays agile, profitable, and ahead of the curve.\n\n" +
                "Business Benefits:\n- 40% Increase in efficiency related to {{FEATURES}}\n- Dedicated support and implementation\n- Transparent ROI tracking\n\n" +
                "Schedule your growth strategy. Let's discuss {{PRODUCT_NAME}}.",

                "The Strategic Edge: How {{PRODUCT_NAME}} Reinvents {{FEATURES}}.\n\n" +
                "Authority is built on results. {{PRODUCT_NAME}} delivers the expertise you need to dominate in {{FEATURES}}. No fluff, just performance.\n\n" +
                "Core Pillars:\n- Expert-level strategy execution\n- Automated reporting on {{FEATURES}}\n- Scalable infrastructure\n\n" +
                "Secure your competitive advantage today."
            ]
        }
    ]
};

export function getStaticFallback(productName: string, features: string) {
    const categories = STATIC_RESOURCES.templates;

    // Pick 3 unique templates (one from each category if possible)
    const variants = categories.map(cat => {
        const randomVariant = cat.variants[Math.floor(Math.random() * cat.variants.length)];
        return randomVariant
            .replace(/{{PRODUCT_NAME}}/g, productName || "Your Product")
            .replace(/{{FEATURES}}/g, features || "your key features");
    });

    return variants; // Returns array of 3 unique strings
}
