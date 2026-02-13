/**
 * DescriptAI CSV Utility
 * Centralized logic for generating platform-compatible CSV files.
 */

export type CSVFormat = 'general' | 'shopify' | 'amazon';

interface CSVData {
    productName: string;
    features: string;
    tone: string;
    variants: string[];
    createdAt: string;
}

export const generateCSV = (data: CSVData[], format: CSVFormat = 'general'): string => {
    let headers: string[] = [];
    let rows: string[][] = [];

    switch (format) {
        case 'shopify':
            headers = ["Handle", "Product Title", "Variant Number", "Description (HTML)", "Vendor", "Category", "Tone Tags", "Published"];
            rows = data.flatMap(item =>
                item.variants.map((v, i) => [
                    `"${item.productName.toLowerCase().replace(/\s+/g, '-')}-v${i + 1}"`,
                    `"${item.productName.replace(/"/g, '""')} (Variant ${i + 1})"`,
                    `"Variant ${i + 1} of 3"`,
                    `"${v.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
                    `"DescriptAI"`,
                    `"AI Generated"`,

                    `"${item.tone.replace(/"/g, '""')}, AI-Copy"`,
                    `"TRUE"`
                ])
            );
            break;

        case 'amazon':
            headers = ["SKU", "Product Name", "Variant Label", "Content", "Key Features", "Brand"];
            rows = data.flatMap(item =>
                item.variants.map((v, i) => [
                    `"DAI-${item.productName.substring(0, 3).toUpperCase()}-V${i + 1}"`,
                    `"${item.productName.replace(/"/g, '""')} (Variant ${i + 1})"`,
                    `"Variant ${i + 1} of 3"`,
                    `"${v.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
                    `"${item.features.replace(/"/g, '""')}"`,

                    `"DescriptAI"`
                ])
            );
            break;

        default: // General
            headers = ["ROW_MARKER", "Export Date", "Product Name", "Variant Label", "Result Content", "Selected Tone", "Input Features"];
            rows = data.flatMap(item =>
                item.variants.map((v, i) => [
                    `">>>"`, // Visual indicator for start of a row in Notepad
                    `"${new Date(item.createdAt).toLocaleDateString().replace(/"/g, '""')}"`,
                    `"${item.productName.replace(/"/g, '""')}"`,
                    `"[[ VARIANT ${i + 1} ]]"`,
                    `"--- START VARIANT ${i + 1} --- ${v.replace(/"/g, '""').replace(/\n/g, ' ')} --- END ---"`,

                    `"${item.tone.replace(/"/g, '""')}"`,
                    `"${item.features.replace(/"/g, '""')}"`
                ])
            );
            break;
    }

    // Use \r\n for better compatibility with Windows/Excel
    return [
        headers.map(h => `"${h}"`).join(","),
        ...rows.map(row => row.join(","))
    ].join("\r\n");
};

export const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
