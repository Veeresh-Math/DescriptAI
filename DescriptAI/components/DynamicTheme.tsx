// Dynamic Theme System - Premium Corporate Colors (Amazon, Rolex, Nike, Apple Style)
// Sophisticated, professional colors that convey trust and premium quality

"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";

// Create context for theme values
export const ThemeContext = createContext<ThemeColors | null>(null);
export const useTheme = () => useContext(ThemeContext);

// Premium Corporate Palettes - Based on top brands
const HOURLY_PALETTES = [
  // 12 AM - Rolex Deep Night (Premium Dark)
  { 
    name: "Rolex Night", 
    bg: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)", 
    rgb: "rgba(197, 160, 89, 0.3)",
    primary: "#C5A059", 
    secondary: "#D4AF37", 
    accent: "#E8D5A3", 
    text: "#ffffff",
    glass: "rgba(197, 160, 89, 0.08)",
    glow: "0 0 30px rgba(197, 160, 89, 0.3)",
    headline: "Midnight Excellence",
    tagline: "Precision in Every Detail",
    description: "Where luxury meets the night"
  },
  // 1 AM - Apple Midnight
  { 
    name: "Apple Midnight", 
    bg: "linear-gradient(135deg, #000000 0%, #1d1d1f 50%, #000000 100%)", 
    rgb: "rgba(255, 255, 255, 0.1)",
    primary: "#86868b", 
    secondary: "#a1a1a6", 
    accent: "#ffffff", 
    text: "#f5f5f7",
    glass: "rgba(255, 255, 255, 0.05)",
    glow: "0 0 20px rgba(255, 255, 255, 0.1)",
    headline: "Think Midnight",
    tagline: "Innovation Never Sleeps",
    description: "Dreaming in pixels"
  },
  // 2 AM - Nike Black
  { 
    name: "Nike Black", 
    bg: "linear-gradient(135deg, #111111 0%, #000000 50%, #1a1a1a 100%)", 
    rgb: "rgba(255, 255, 255, 0.15)",
    primary: "#ffffff", 
    secondary: "#e5e5e5", 
    accent: "#cccccc", 
    text: "#ffffff",
    glass: "rgba(255, 255, 255, 0.07)",
    glow: "0 0 25px rgba(255, 255, 255, 0.15)",
    headline: "Just Do It — Night",
    tagline: "Be a Dreamer",
    description: "Champion your ambitions"
  },
  // 3 AM - Deep Premium Dark
  { 
    name: "Premium Dark", 
    bg: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #0f0f0f 100%)", 
    rgb: "rgba(59, 130, 246, 0.2)",
    primary: "#1e3a5f", 
    secondary: "#3b82f6", 
    accent: "#60a5fa", 
    text: "#e5e5e5",
    glass: "rgba(59, 130, 246, 0.08)",
    glow: "0 0 25px rgba(59, 130, 246, 0.2)",
    headline: "Deep Blue Dreams",
    tagline: "Depth in Every Decision",
    description: "Where clarity emerges from darkness"
  },
  // 4 AM - Silver Elegance
  { 
    name: "Silver Elegance", 
    bg: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)", 
    rgb: "rgba(192, 192, 192, 0.2)",
    primary: "#c0c0c0", 
    secondary: "#d4d4d4", 
    accent: "#e5e5e5", 
    text: "#f0f0f0",
    glass: "rgba(192, 192, 192, 0.06)",
    glow: "0 0 20px rgba(192, 192, 192, 0.2)",
    headline: "Silver Screen Dreams",
    tagline: "Timeless Elegance",
    description: "Class never sleeps"
  },
  // 5 AM - Pre-Dawn Luxury
  { 
    name: "Luxury Dawn", 
    bg: "linear-gradient(135deg, #0d0d0d 0%, #1f1f1f 50%, #0a0a0a 100%)", 
    rgb: "rgba(255, 153, 0, 0.15)",
    primary: "#cc7a00", 
    secondary: "#ff9900", 
    accent: "#ffb84d", 
    text: "#ffffff",
    glass: "rgba(255, 153, 0, 0.06)",
    glow: "0 0 25px rgba(255, 153, 0, 0.2)",
    headline: "Golden Hour Approaches",
    tagline: "Dawn Awaits",
    description: "The future is golden"
  },
  // 6 AM - Amazon Morning
  { 
    name: "Amazon Morning", 
    bg: "linear-gradient(135deg, #232f3e 0%, #131921 50%, #232f3e 100%)", 
    rgb: "rgba(255, 153, 0, 0.25)",
    primary: "#FF9900", 
    secondary: "#ffad33", 
    accent: "#ffc266", 
    text: "#ffffff",
    glass: "rgba(255, 153, 0, 0.1)",
    glow: "0 0 30px rgba(255, 153, 0, 0.25)",
    headline: "Rise & Shine",
    tagline: "Work Hard, Have Fun",
    description: "Making history every day"
  },
  // 7 AM - Apple Morning
  { 
    name: "Apple Morning", 
    bg: "linear-gradient(135deg, #f5f5f7 0%, #ffffff 50%, #f5f5f7 100%)", 
    rgb: "rgba(0, 113, 227, 0.15)",
    primary: "#0071E3", 
    secondary: "#2997ff", 
    accent: "#5eacff", 
    text: "#1d1d1f",
    glass: "rgba(255, 255, 255, 0.7)",
    glow: "0 0 20px rgba(0, 113, 227, 0.15)",
    headline: "Good Morning",
    tagline: "Think Different",
    description: "Start your day with innovation"
  },
  // 8 AM - Nike Energy
  { 
    name: "Nike Energy", 
    bg: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #ffffff 100%)", 
    rgb: "rgba(0, 0, 0, 0.1)",
    primary: "#111111", 
    secondary: "#333333", 
    accent: "#555555", 
    text: "#111111",
    glass: "rgba(255, 255, 255, 0.8)",
    glow: "0 0 15px rgba(0, 0, 0, 0.1)",
    headline: "Morning Hustle",
    tagline: "Run Your Race",
    description: "Every moment counts"
  },
  // 9 AM - Clean Corporate
  { 
    name: "Corporate Clean", 
    bg: "linear-gradient(135deg, #ffffff 0%, #fafafa 50%, #ffffff 100%)", 
    rgb: "rgba(59, 130, 246, 0.1)",
    primary: "#2563eb", 
    secondary: "#3b82f6", 
    accent: "#60a5fa", 
    text: "#111827",
    glass: "rgba(255, 255, 255, 0.85)",
    glow: "0 0 15px rgba(59, 130, 246, 0.1)",
    headline: "Business Hours",
    tagline: "Lead the Way",
    description: "Excellence in motion"
  },
  // 10 AM - Premium White
  { 
    name: "Premium White", 
    bg: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)", 
    rgb: "rgba(0, 0, 0, 0.05)",
    primary: "#1f2937", 
    secondary: "#374151", 
    accent: "#6b7280", 
    text: "#111827",
    glass: "rgba(255, 255, 255, 0.9)",
    glow: "0 0 10px rgba(0, 0, 0, 0.05)",
    headline: "Peak Performance",
    tagline: "Pure & Simple",
    description: "Clarity is power"
  },
  // 11 AM - Fresh Professional
  { 
    name: "Professional Fresh", 
    bg: "linear-gradient(135deg, #fefefe 0%, #f0fdf4 50%, #fefefe 100%)", 
    rgb: "rgba(16, 185, 129, 0.1)",
    primary: "#059669", 
    secondary: "#10b981", 
    accent: "#34d399", 
    text: "#111827",
    glass: "rgba(255, 255, 255, 0.85)",
    glow: "0 0 12px rgba(16, 185, 129, 0.1)",
    headline: "Growing Strong",
    tagline: "Green & Growing",
    description: "Fresh ideas bloom daily"
  },
  // 12 PM - Apple Noon
  { 
    name: "Apple Noon", 
    bg: "linear-gradient(135deg, #ffffff 0%, #fbfbfd 50%, #ffffff 100%)", 
    rgb: "rgba(0, 113, 227, 0.08)",
    primary: "#1d1d1f", 
    secondary: "#424245", 
    accent: "#86868b", 
    text: "#1d1d1f",
    glass: "rgba(255, 255, 255, 0.92)",
    glow: "0 0 8px rgba(0, 113, 227, 0.08)",
    headline: "Midday Clarity",
    tagline: "Brilliant at Noon",
    description: "Perfection in the light"
  },
  // 1 PM - Clean Business
  { 
    name: "Business Clean", 
    bg: "linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #fafafa 100%)", 
    rgb: "rgba(31, 38, 49, 0.08)",
    primary: "#1e293b", 
    secondary: "#334155", 
    accent: "#64748b", 
    text: "#0f172a",
    glass: "rgba(255, 255, 255, 0.88)",
    glow: "0 0 10px rgba(31, 38, 49, 0.08)",
    headline: "Afternoon Power",
    tagline: "Drive Forward",
    description: "Momentum builds success"
  },
  // 2 PM - Corporate Blue
  { 
    name: "Corporate Blue", 
    bg: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f8fafc 100%)", 
    rgb: "rgba(59, 130, 246, 0.1)",
    primary: "#1d4ed8", 
    secondary: "#3b82f6", 
    accent: "#60a5fa", 
    text: "#1e3a8a",
    glass: "rgba(255, 255, 255, 0.85)",
    glow: "0 0 12px rgba(59, 130, 246, 0.1)",
    headline: "Blue Sky Thinking",
    tagline: "Endless Possibilities",
    description: "Dream without limits"
  },
  // 3 PM - Afternoon Premium
  { 
    name: "Premium Afternoon", 
    bg: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #fafafa 100%)", 
    rgb: "rgba(79, 70, 229, 0.08)",
    primary: "#3730a3", 
    secondary: "#4f46e5", 
    accent: "#818cf8", 
    text: "#1e1b4b",
    glass: "rgba(255, 255, 255, 0.88)",
    glow: "0 0 10px rgba(79, 70, 229, 0.08)",
    headline: "Afternoon Excellence",
    tagline: "Purple Reign",
    description: "Royal treatment awaits"
  },
  // 4 PM - Late Afternoon
  { 
    name: "Late Afternoon", 
    bg: "linear-gradient(135deg, #f5f5f5 0%, #fafafa 50%, #f0f0f0 100%)", 
    rgb: "rgba(107, 114, 128, 0.1)",
    primary: "#374151", 
    secondary: "#4b5563", 
    accent: "#9ca3af", 
    text: "#111827",
    glass: "rgba(255, 255, 255, 0.85)",
    glow: "0 0 10px rgba(107, 114, 128, 0.1)",
    headline: "Winding Down",
    tagline: "Finish Strong",
    description: "The best is yet to come"
  },
  // 5 PM - Evening Professional
  { 
    name: "Evening Professional", 
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)", 
    rgb: "rgba(59, 130, 246, 0.2)",
    primary: "#3b82f6", 
    secondary: "#60a5fa", 
    accent: "#93c5fd", 
    text: "#f1f5f9",
    glass: "rgba(59, 130, 246, 0.1)",
    glow: "0 0 25px rgba(59, 130, 246, 0.2)",
    headline: "Evening Glow",
    tagline: "After Hours Excellence",
    description: "Night owls prosper"
  },
  // 6 PM - Rolex Dusk
  { 
    name: "Rolex Dusk", 
    bg: "linear-gradient(135deg, #0d0d0d 0%, #1a1a18 50%, #0a0a0a 100%)", 
    rgb: "rgba(197, 160, 89, 0.25)",
    primary: "#C5A059", 
    secondary: "#D4AF37", 
    accent: "#E8D5A3", 
    text: "#ffffff",
    glass: "rgba(197, 160, 89, 0.08)",
    glow: "0 0 30px rgba(197, 160, 89, 0.25)",
    headline: "Golden Hour",
    tagline: "Timeless Moments",
    description: "Worth every second"
  },
  // 7 PM - Amazon Evening
  { 
    name: "Amazon Evening", 
    bg: "linear-gradient(135deg, #131921 0%, #0f1922 50%, #0a0f14 100%)", 
    rgb: "rgba(255, 153, 0, 0.2)",
    primary: "#FF9900", 
    secondary: "#ffb84d", 
    accent: "#ffc266", 
    text: "#ffffff",
    glass: "rgba(255, 153, 0, 0.08)",
    glow: "0 0 25px rgba(255, 153, 0, 0.2)",
    headline: "Evening Delivers",
    tagline: "Serving Customers",
    description: "Always day one"
  },
  // 8 PM - Premium Night
  { 
    name: "Premium Night", 
    bg: "linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)", 
    rgb: "rgba(255, 255, 255, 0.12)",
    primary: "#e5e5e5", 
    secondary: "#ffffff", 
    accent: "#f5f5f5", 
    text: "#ffffff",
    glass: "rgba(255, 255, 255, 0.06)",
    glow: "0 0 20px rgba(255, 255, 255, 0.12)",
    headline: "Night Premium",
    tagline: "Elite After Dark",
    description: "When stars align"
  },
  // 9 PM - Apple Night
  { 
    name: "Apple Night", 
    bg: "linear-gradient(135deg, #000000 0%, #1d1d1f 50%, #000000 100%)", 
    rgb: "rgba(255, 255, 255, 0.08)",
    primary: "#86868b", 
    secondary: "#a1a1a6", 
    accent: "#d1d1d6", 
    text: "#f5f5f7",
    glass: "rgba(255, 255, 255, 0.04)",
    glow: "0 0 15px rgba(255, 255, 255, 0.08)",
    headline: "Luminous Night",
    tagline: "Glow in the Dark",
    description: "Brilliance never fades"
  },
  // 10 PM - Nike Night
  { 
    name: "Nike Night", 
    bg: "linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)", 
    rgb: "rgba(255, 255, 255, 0.15)",
    primary: "#ffffff", 
    secondary: "#e5e5e5", 
    accent: "#cccccc", 
    text: "#ffffff",
    glass: "rgba(255, 255, 255, 0.06)",
    glow: "0 0 20px rgba(255, 255, 255, 0.15)",
    headline: "Night Runner",
    tagline: "You Can't Stop Us",
    description: "Unstoppable momentum"
  },
  // 11 PM - Deep Night
  { 
    name: "Deep Night", 
    bg: "linear-gradient(135deg, #050505 0%, #0a0a0a 50%, #050505 100%)", 
    rgb: "rgba(100, 100, 100, 0.1)",
    primary: "#404040", 
    secondary: "#666666", 
    accent: "#888888", 
    text: "#e5e5e5",
    glass: "rgba(100, 100, 100, 0.04)",
    glow: "0 0 15px rgba(100, 100, 100, 0.1)",
    headline: "Late Night Wisdom",
    tagline: "Quiet Excellence",
    description: "Stillness breeds success"
  },
];

// Daily Themes - Weekly Corporate Rotation
const DAILY_PALETTES = [
  // Monday - Amazon Blue
  { 
    name: "Amazon Week", 
    bg: "linear-gradient(135deg, #232f3e 0%, #131921 50%, #232f3e 100%)", 
    rgb: "rgba(255, 153, 0, 0.25)",
    primary: "#FF9900", 
    secondary: "#ffad33", 
    accent: "#ffc266", 
    text: "#ffffff",
    glass: "rgba(255, 153, 0, 0.1)",
    glow: "0 0 30px rgba(255, 153, 0, 0.25)",
    headline: "Monday Motivation",
    tagline: "Work Hard, Have Fun",
    description: "Start the week strong"
  },
  // Tuesday - Apple Day
  { 
    name: "Apple Day", 
    bg: "linear-gradient(135deg, #f5f5f7 0%, #ffffff 50%, #f5f5f7 100%)", 
    rgb: "rgba(0, 113, 227, 0.12)",
    primary: "#0071E3", 
    secondary: "#2997ff", 
    accent: "#5eacff", 
    text: "#1d1d1f",
    glass: "rgba(255, 255, 255, 0.75)",
    glow: "0 0 18px rgba(0, 113, 227, 0.12)",
    headline: "Think Different",
    tagline: "Innovation Tuesday",
    description: "Think beyond the ordinary"
  },
  // Wednesday - Rolex Gold
  { 
    name: "Rolex Day", 
    bg: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)", 
    rgb: "rgba(197, 160, 89, 0.3)",
    primary: "#C5A059", 
    secondary: "#D4AF37", 
    accent: "#E8D5A3", 
    text: "#ffffff",
    glass: "rgba(197, 160, 89, 0.1)",
    glow: "0 0 35px rgba(197, 160, 89, 0.3)",
    headline: "Hump Day Excellence",
    tagline: "Midweek Mastery",
    description: "Precision in every step"
  },
  // Thursday - Nike Black
  { 
    name: "Nike Day", 
    bg: "linear-gradient(135deg, #111111 0%, #000000 50%, #1a1a1a 100%)", 
    rgb: "rgba(255, 255, 255, 0.18)",
    primary: "#ffffff", 
    secondary: "#e5e5e5", 
    accent: "#cccccc", 
    text: "#ffffff",
    glass: "rgba(255, 255, 255, 0.08)",
    glow: "0 0 25px rgba(255, 255, 255, 0.18)",
    headline: "Just Do It",
    tagline: "Thursday Power",
    description: "Push your limits"
  },
  // Friday - Corporate Blue
  { 
    name: "Corporate Friday", 
    bg: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1e3a8a 100%)", 
    rgb: "rgba(96, 165, 250, 0.25)",
    primary: "#3b82f6", 
    secondary: "#60a5fa", 
    accent: "#93c5fd", 
    text: "#ffffff",
    glass: "rgba(59, 130, 246, 0.12)",
    glow: "0 0 30px rgba(59, 130, 246, 0.25)",
    headline: "Friday Feeling",
    tagline: "Finish Line",
    description: "Victory is near"
  },
  // Saturday - Premium White
  { 
    name: "Premium Saturday", 
    bg: "linear-gradient(135deg, #ffffff 0%, #fafafa 50%, #ffffff 100%)", 
    rgb: "rgba(0, 0, 0, 0.06)",
    primary: "#1f2937", 
    secondary: "#374151", 
    accent: "#6b7280", 
    text: "#111827",
    glass: "rgba(255, 255, 255, 0.92)",
    glow: "0 0 10px rgba(0, 0, 0, 0.06)",
    headline: "Weekend Vibes",
    tagline: "Relax & Recharge",
    description: "Premium rest day"
  },
  // Sunday - Luxury Dark
  { 
    name: "Luxury Sunday", 
    bg: "linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)", 
    rgb: "rgba(197, 160, 89, 0.2)",
    primary: "#C5A059", 
    secondary: "#D4AF37", 
    accent: "#E8D5A3", 
    text: "#ffffff",
    glass: "rgba(197, 160, 89, 0.07)",
    glow: "0 0 25px rgba(197, 160, 89, 0.2)",
    headline: "Sunday Gold",
    tagline: "Prepare for Victory",
    description: "Recharge for the week"
  },
];

interface ThemeColors {
  name: string;
  bg: string;
  rgb: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  glass: string;
  glow: string;
  headline: string;
  tagline: string;
  description: string;
}

interface DynamicThemeProps {
  mode?: "hourly" | "daily";
  children: React.ReactNode;
}

export function DynamicTheme({ mode = "hourly", children }: DynamicThemeProps) {
  // Initialize with default theme to prevent FOUC
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(HOURLY_PALETTES[new Date().getHours()]);
  const [mounted, setMounted] = useState(true); // Default to true to prevent flash
  const lastHourRef = useRef<number>(new Date().getHours());

  useEffect(() => {
    setMounted(true);
    
    // Initialize theme immediately to prevent FOUC
    const getCurrentTheme = (): ThemeColors => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();
      
      if (mode === "daily") {
        return DAILY_PALETTES[day];
      } else {
        return HOURLY_PALETTES[hour];
      }
    };

    setCurrentTheme(getCurrentTheme());

    const updateThemeColors = (theme: ThemeColors) => {
      const root = document.documentElement;
      
      // Set all CSS variables
      root.style.setProperty("--dynamic-bg", theme.bg);
      root.style.setProperty("--dynamic-rgb", theme.rgb);
      root.style.setProperty("--dynamic-primary", theme.primary);
      root.style.setProperty("--dynamic-secondary", theme.secondary);
      root.style.setProperty("--dynamic-accent", theme.accent);
      root.style.setProperty("--dynamic-text", theme.text);
      root.style.setProperty("--dynamic-glass", theme.glass);
      root.style.setProperty("--dynamic-glow", theme.glow);
      root.style.setProperty("--dynamic-headline", theme.headline);
      root.style.setProperty("--dynamic-tagline", theme.tagline);
      root.style.setProperty("--dynamic-description", theme.description);
      
      // Also set on body for better global coverage
      document.body.style.color = theme.text;
    };

    updateThemeColors(getCurrentTheme());

    const intervalMs = 60 * 1000; // Check every minute to catch hour changes
    
    const interval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      
      // Only update when hour actually changes
      if (currentHour !== lastHourRef.current) {
        lastHourRef.current = currentHour;
        const newTheme = getCurrentTheme();
        setCurrentTheme(newTheme);
        updateThemeColors(newTheme);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [mode]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div 
      style={{ 
        background: currentTheme.bg,
        minHeight: "100vh",
        transition: "background 1s ease-in-out",
        "--dynamic-headline": currentTheme.headline,
        "--dynamic-tagline": currentTheme.tagline,
        "--dynamic-description": currentTheme.description,
      } as React.CSSProperties}
      className="dynamic-theme-container"
    >
      <style jsx global>{`
        .dynamic-theme-container {
          --dynamic-primary: ${currentTheme.primary};
          --dynamic-secondary: ${currentTheme.secondary};
          --dynamic-accent: ${currentTheme.accent};
          --dynamic-text: ${currentTheme.text};
          --dynamic-glass: ${currentTheme.glass};
          --dynamic-glow: ${currentTheme.glow};
          --dynamic-headline: "${currentTheme.headline}";
          --dynamic-tagline: "${currentTheme.tagline}";
          --dynamic-description: "${currentTheme.description}";
        }
        
        .dynamic-theme-container .theme-primary { color: var(--dynamic-primary); }
        .dynamic-theme-container .theme-secondary { color: var(--dynamic-secondary); }
        .dynamic-theme-container .theme-accent { color: var(--dynamic-accent); }
        .dynamic-theme-container .theme-text { color: var(--dynamic-text); }
        .dynamic-theme-container .theme-headline { 
          color: var(--dynamic-primary);
          transition: color 0.5s ease;
        }
        .dynamic-theme-container .theme-tagline { 
          color: var(--dynamic-secondary);
          transition: color 0.5s ease 0.1s;
        }
        .dynamic-theme-container .theme-description { 
          color: var(--dynamic-accent);
          opacity: 0.85;
          transition: color 0.5s ease 0.2s;
        }
        
        /* Dynamic text content using CSS counters */
        .dynamic-theme-container .theme-headline-text {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--dynamic-primary);
          transition: all 0.5s ease;
        }
        .dynamic-theme-container .theme-tagline-text {
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--dynamic-secondary);
          transition: all 0.5s ease 0.1s;
        }
        .dynamic-theme-container .theme-description-text {
          font-size: 1rem;
          color: var(--dynamic-accent);
          opacity: 0.85;
          transition: all 0.5s ease 0.2s;
        }
        
        .dynamic-theme-container .theme-bg-primary { background-color: var(--dynamic-primary); }
        .dynamic-theme-container .theme-bg-secondary { background-color: var(--dynamic-secondary); }
        
        .dynamic-theme-container .theme-bg-glass {
          background: var(--dynamic-glass);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .dynamic-theme-container .theme-border { border-color: var(--dynamic-primary); }
        
        .dynamic-theme-container .theme-gradient {
          background: linear-gradient(135deg, var(--dynamic-primary), var(--dynamic-secondary));
        }
        
        .dynamic-theme-container .theme-gradient-text {
          background: linear-gradient(135deg, var(--dynamic-primary), var(--dynamic-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Premium RGB Subtle Effects */
        @keyframes premium-pulse {
          0%, 100% { 
            box-shadow: 0 0 15px var(--dynamic-primary);
          }
          50% { 
            box-shadow: 0 0 25px var(--dynamic-secondary);
          }
        }
        
        .premium-pulse {
          animation: premium-pulse 4s ease-in-out infinite;
        }
        
        @keyframes premium-glow {
          0%, 100% { 
            text-shadow: 0 0 8px var(--dynamic-primary);
          }
          50% { 
            text-shadow: 0 0 15px var(--dynamic-secondary);
          }
        }
        
        .premium-glow {
          animation: premium-glow 3s ease-in-out infinite;
        }
        
        /* Glass morphism with premium feel */
        .premium-glass {
          background: var(--dynamic-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        /* Premium gradient backgrounds */
        .premium-gradient {
          background: linear-gradient(135deg, var(--dynamic-primary), var(--dynamic-secondary));
        }
        
        .premium-gradient-text {
          background: linear-gradient(135deg, var(--dynamic-primary), var(--dynamic-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
      <ThemeContext.Provider value={currentTheme}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
}

export default DynamicTheme;
export { HOURLY_PALETTES, DAILY_PALETTES };

// Theme Text Component - Displays dynamic text based on current theme
export function ThemeText() {
  const theme = useTheme();
  
  if (!theme) return null;
  
  return (
    <div className="theme-text-container">
      <h1 className="theme-headline-text">{theme.headline}</h1>
      <p className="theme-tagline-text">{theme.tagline}</p>
      <p className="theme-description-text">{theme.description}</p>
    </div>
  );
}
