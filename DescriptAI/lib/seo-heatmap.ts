// 🎯 SEO Heatmap & Keyword Analysis Engine
// Calculates real SEO scores and keyword density

export interface SEOAnalysis {
  score: number;
  keywords: KeywordDensity[];
  suggestions: string[];
  readability: ReadabilityScore;
  wordCount: number;
  title: string;
}

export interface KeywordDensity {
  keyword: string;
  count: number;
  density: number;
  positions: number[];
  color: string;
}

export interface ReadabilityScore {
  score: number;
  level: string;
  avgSentenceLength: number;
  avgWordLength: number;
}

// Color coding for keyword density
function getKeywordColor(density: number): string {
  if (density >= 3) return '#ef4444'; // Red - over-optimized
  if (density >= 1.5) return '#22c55e'; // Green - good
  if (density >= 0.5) return '#eab308'; // Yellow - okay
  return '#94a3b8'; // Gray - low
}

// Calculate keyword density
function calculateKeywordDensity(text: string, keywords: string[]): KeywordDensity[] {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  const totalWords = words.length;
  
  return keywords.map(keyword => {
    const keywordLower = keyword.toLowerCase();
    const regex = new RegExp(keywordLower, 'gi');
    const matches = lowerText.match(regex) || [];
    
    // Find positions
    const positions: number[] = [];
    let pos = 0;
    while ((pos = lowerText.indexOf(keywordLower, pos)) !== -1) {
      positions.push(pos);
      pos += keywordLower.length;
    }
    
    const count = matches.length;
    const density = totalWords > 0 ? (count / totalWords) * 100 : 0;
    
    return {
      keyword,
      count,
      density: Math.round(density * 100) / 100,
      positions,
      color: getKeywordColor(density)
    };
  }).filter(k => k.count > 0);
}

// Calculate readability score (Flesch-Kincaid simplified)
function calculateReadability(text: string): ReadabilityScore {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  
  if (sentences.length === 0 || words.length === 0) {
    return { score: 0, level: 'N/A', avgSentenceLength: 0, avgWordLength: 0 };
  }
  
  const avgSentenceLength = words.length / sentences.length;
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
  
  // Simplified readability score (0-100)
  let score = 100;
  
  // Penalize very long sentences
  if (avgSentenceLength > 20) score -= 20;
  else if (avgSentenceLength > 15) score -= 10;
  
  // Penalize very long words
  if (avgWordLength > 6) score -= 15;
  else if (avgWordLength > 5) score -= 5;
  
  // Bonus for variety (different words / total words)
  const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
  const varietyRatio = uniqueWords / words.length;
  score += Math.round(varietyRatio * 20);
  
  score = Math.max(0, Math.min(100, score));
  
  let level: string;
  if (score >= 80) level = 'Excellent';
  else if (score >= 60) level = 'Good';
  else if (score >= 40) level = 'Fair';
  else level = 'Needs Improvement';
  
  return {
    score,
    level,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    avgWordLength: Math.round(avgWordLength * 10) / 10
  };
}

// Generate SEO suggestions
function generateSuggestions(keywords: KeywordDensity[], readability: ReadabilityScore, wordCount: number): string[] {
  const suggestions: string[] = [];
  
  // Keyword suggestions
  keywords.forEach(kw => {
    if (kw.density < 0.5) {
      suggestions.push(`Add "${kw.keyword}" more naturally (currently ${kw.density}% density)`);
    } else if (kw.density > 3) {
      suggestions.push(`Reduce "${kw.keyword}" - appears ${kw.count} times (over-optimized)`);
    }
  });
  
  // Word count suggestions
  if (wordCount < 50) {
    suggestions.push('Description is too short - aim for 100-200 words');
  } else if (wordCount > 300) {
    suggestions.push('Description is very long - consider shortening for better engagement');
  }
  
  // Readability suggestions
  if (readability.avgSentenceLength > 20) {
    suggestions.push('Shorten sentences for better readability');
  }
  
  if (readability.score < 50) {
    suggestions.push('Improve readability - use simpler words and shorter sentences');
  }
  
  return suggestions;
}

// Main SEO analysis function
export function analyzeSEO(text: string, customKeywords?: string): SEOAnalysis {
  // Default important e-commerce keywords to check
  const defaultKeywords = ['premium', 'quality', 'free', 'shipping', 'guarantee', 'best', 'top', 'new'];
  
  // Parse custom keywords from input
  let keywords: string[] = defaultKeywords;
  if (customKeywords && customKeywords.trim()) {
    keywords = [
      ...customKeywords.split(/[,;]/).map(k => k.trim()).filter(k => k.length > 0),
      ...defaultKeywords
    ];
  }
  
  const keywordDensity = calculateKeywordDensity(text, keywords);
  const readability = calculateReadability(text);
  const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
  
  // Calculate overall SEO score
  let score = 50; // Base score
  
  // Keyword coverage (30 points max)
  const coveredKeywords = keywordDensity.filter(k => k.density >= 0.3 && k.density <= 3).length;
  score += Math.min(30, coveredKeywords * 5);
  
  // Readability (20 points max)
  score += Math.round(readability.score * 0.2);
  
  // Word count bonus (10 points max)
  if (wordCount >= 100 && wordCount <= 250) {
    score += 10;
  } else if (wordCount >= 50) {
    score += 5;
  }
  
  score = Math.max(0, Math.min(99, score));
  
  const suggestions = generateSuggestions(keywordDensity, readability, wordCount);
  
  return {
    score,
    keywords: keywordDensity,
    suggestions,
    readability,
    wordCount,
    title: 'SEO Analysis'
  };
}

// Generate heatmap HTML with colored keywords
export function generateHeatmapHtml(text: string, keywords: KeywordDensity[]): string {
  let html = text;
  
  // Sort by length descending to avoid replacing substrings
  const sortedKeywords = [...keywords].sort((a, b) => b.keyword.length - a.keyword.length);
  
  sortedKeywords.forEach(kw => {
    if (kw.count > 0) {
      const regex = new RegExp(`(${kw.keyword})`, 'gi');
      html = html.replace(regex, `<span style="background-color: ${kw.color}; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;">$1</span>`);
    }
  });
  
  return html;
}

// Export for API use
export default {
  analyzeSEO,
  generateHeatmapHtml
};
