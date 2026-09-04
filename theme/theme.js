/* ==========================================
   MY PRAYER - THEMES (FIXED)
   10 FULL DESIGN THEMES
   Color + Card Shape + Shadow + Glow + Border
   + a unique background pattern graphic per theme
========================================== */

// ---- Pattern templates (MOAR) ----
const PATTERNS = {
    lattice: "<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><path d='M30 4 L36 22 L54 22 L39 33 L45 52 L30 40 L15 52 L21 33 L6 22 L24 22 Z' fill='none' stroke='COLOR' stroke-width='1' opacity='0.16'/></svg>",
    mandala: "<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90'><circle cx='45' cy='45' r='40' fill='none' stroke='COLOR' stroke-width='1' opacity='0.14'/><circle cx='45' cy='45' r='27' fill='none' stroke='COLOR' stroke-width='1' opacity='0.14'/><circle cx='45' cy='45' r='14' fill='none' stroke='COLOR' stroke-width='1' opacity='0.14'/></svg>",
    crescent: "<svg xmlns='http://www.w3.org/2000/svg' width='340' height='300'><path d='M250 40 A110 110 0 1 0 250 260 A85 85 0 1 1 250 40 Z' fill='COLOR' opacity='0.18'/><circle cx='80' cy='70' r='2.5' fill='COLOR' opacity='0.35'/><circle cx='130' cy='40' r='1.8' fill='COLOR' opacity='0.35'/><circle cx='50' cy='140' r='1.8' fill='COLOR' opacity='0.35'/><circle cx='100' cy='190' r='2.2' fill='COLOR' opacity='0.3'/></svg>",
    starburst: "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><path d='M32 10 L36 28 L54 32 L36 36 L32 54 L28 36 L10 32 L28 28 Z' fill='COLOR' opacity='0.16'/></svg>",
    sunburst: "<svg xmlns='http://www.w3.org/2000/svg' width='420' height='220'><g stroke='COLOR' stroke-width='3' opacity='0.16'><line x1='210' y1='420' x2='30' y2='0'/><line x1='210' y1='420' x2='90' y2='0'/><line x1='210' y1='420' x2='150' y2='0'/><line x1='210' y1='420' x2='210' y2='0'/><line x1='210' y1='420' x2='270' y2='0'/><line x1='210' y1='420' x2='330' y2='0'/><line x1='210' y1='420' x2='390' y2='0'/></g></svg>",
    mosaic: "<svg xmlns='http://www.w3.org/2000/svg' width='46' height='46'><path d='M23 2 L44 23 L23 44 L2 23 Z' fill='none' stroke='COLOR' stroke-width='1' opacity='0.15'/></svg>",
    faint: "<svg xmlns='http://www.w3.org/2000/svg' width='26' height='26'><circle cx='2' cy='2' r='1' fill='COLOR' opacity='0.06'/></svg>",
    medallion: "<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'><circle cx='140' cy='140' r='130' fill='none' stroke='COLOR' stroke-width='2' opacity='0.16'/><circle cx='140' cy='140' r='100' fill='none' stroke='COLOR' stroke-width='1' opacity='0.16'/><circle cx='140' cy='140' r='70' fill='none' stroke='COLOR' stroke-width='1' opacity='0.16'/><circle cx='140' cy='140' r='40' fill='none' stroke='COLOR' stroke-width='1' opacity='0.16'/></svg>",
    dotgrid: "<svg xmlns='http://www.w3.org/2000/svg' width='34' height='34'><circle cx='17' cy='17' r='1.3' fill='COLOR' opacity='0.18'/></svg>",
    hexgrid: "<svg xmlns='http://www.w3.org/2000/svg' width='60' height='52'><polygon points='30,2 56,17 56,37 30,52 4,37 4,17' fill='none' stroke='COLOR' stroke-width='1.4' opacity='0.28'/></svg>"
};

// ---- THEME DESIGNS (MOAR) ----
const themeDesigns = [
    {
        id: "royal-velvet",
        name: "Royal Velvet",
        primary: "#d4af37",
        bg: "#1a0f2e",
        card: "#2d1b4e",
        cardBg: "linear-gradient(145deg, #33204f, #1a0f2e)",
        text: "#ececec",
        textMuted: "#b8aecb",
        radius: "24px",
        shadow: "0 10px 35px rgba(212,175,55,0.25), 0 4px 18px rgba(0,0,0,0.6)",
        border: "1px solid rgba(212,175,55,0.35)",
        blur: "20px",
        pattern: PATTERNS.lattice,
        patternSize: "60px 60px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "emerald-noor",
        name: "Emerald Noor",
        primary: "#22c98e",
        bg: "#0d2818",
        card: "#123723",
        cardBg: "linear-gradient(135deg, #17472e, #0d2818)",
        text: "#eafaf3",
        textMuted: "#9fc9b8",
        radius: "20px",
        shadow: "0 10px 28px rgba(34,201,142,0.22)",
        border: "1px solid rgba(34,201,142,0.35)",
        blur: "15px",
        pattern: PATTERNS.mandala,
        patternSize: "90px 90px",
        patternRepeat: "repeat",
        patternPosition: "bottom center"
    },
    {
        id: "ruby-crescent",
        name: "Ruby Crescent",
        primary: "#d4af37",
        bg: "#360b0b",
        card: "#4a1414",
        cardBg: "linear-gradient(145deg, #5c1a1a, #360b0b)",
        text: "#f5e9df",
        textMuted: "#cf9f9f",
        radius: "18px",
        shadow: "0 10px 28px rgba(0,0,0,0.5)",
        border: "1px solid rgba(212,175,55,0.4)",
        blur: "12px",
        pattern: PATTERNS.crescent,
        patternSize: "340px 300px",
        patternRepeat: "no-repeat",
        patternPosition: "bottom right"
    },
    {
        id: "sapphire-star",
        name: "Sapphire Star",
        primary: "#4d7ef0",
        bg: "#101433",
        card: "#182050",
        cardBg: "linear-gradient(145deg, #1e2a63, #101433)",
        text: "#e9edfb",
        textMuted: "#9aa8d6",
        radius: "18px",
        shadow: "0 10px 26px rgba(77,126,240,0.25)",
        border: "1px solid rgba(77,126,240,0.35)",
        blur: "14px",
        pattern: PATTERNS.starburst,
        patternSize: "64px 64px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "solar-dawn",
        name: "Solar Dawn",
        primary: "#ff9d3d",
        bg: "#241207",
        card: "#3a1f0d",
        cardBg: "linear-gradient(160deg, #4a2a12, #241207)",
        text: "#fbeee1",
        textMuted: "#d8b090",
        radius: "20px",
        shadow: "0 10px 28px rgba(255,157,61,0.25)",
        border: "1px solid rgba(255,157,61,0.35)",
        blur: "10px",
        pattern: PATTERNS.sunburst,
        patternSize: "420px 220px",
        patternRepeat: "no-repeat",
        patternPosition: "bottom center"
    },
    {
        id: "violet-mosaic",
        name: "Violet Mosaic",
        primary: "#a259d9",
        bg: "#1e1030",
        card: "#2a1846",
        cardBg: "linear-gradient(145deg, #331d58, #1e1030)",
        text: "#f0e9f9",
        textMuted: "#c2a9db",
        radius: "16px",
        shadow: "0 10px 26px rgba(162,89,217,0.28)",
        border: "1px solid rgba(162,89,217,0.4)",
        blur: "16px",
        pattern: PATTERNS.mosaic,
        patternSize: "46px 46px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "minimal-void",
        name: "Minimal Void",
        primary: "#e0e0e0",
        bg: "#0a0a0a",
        card: "#161616",
        cardBg: "#161616",
        text: "#f0f0f0",
        textMuted: "#9a9a9a",
        radius: "10px",
        shadow: "0 2px 8px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.14)",
        blur: "0px",
        pattern: PATTERNS.faint,
        patternSize: "26px 26px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "antique-copper",
        name: "Antique Copper",
        primary: "#c17f45",
        bg: "#2b1a10",
        card: "#3d2717",
        cardBg: "linear-gradient(160deg, #4a3220, #2b1a10)",
        text: "#f2e6d8",
        textMuted: "#c9a888",
        radius: "14px",
        shadow: "0 8px 22px rgba(193,127,69,0.28)",
        border: "1px solid rgba(193,127,69,0.4)",
        blur: "6px",
        pattern: PATTERNS.medallion,
        patternSize: "280px 280px",
        patternRepeat: "no-repeat",
        patternPosition: "bottom right"
    },
    {
        id: "onyx-teal",
        name: "Onyx Teal",
        primary: "#14e0c4",
        bg: "#050e0e",
        card: "#0a1a1a",
        cardBg: "linear-gradient(145deg, #0e2424, #050e0e)",
        text: "#e6fbf8",
        textMuted: "#8fc9c0",
        radius: "16px",
        shadow: "0 0 24px rgba(20,224,196,0.3)",
        border: "1px solid rgba(20,224,196,0.45)",
        blur: "14px",
        pattern: PATTERNS.dotgrid,
        patternSize: "34px 34px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "neon-nights",
        name: "Neon Nights",
        primary: "#00e5ff",
        bg: "#000000",
        card: "#0a0a12",
        cardBg: "linear-gradient(145deg, #10101c, #000000)",
        text: "#eafcff",
        textMuted: "#7fd8e8",
        radius: "14px",
        shadow: "0 0 18px rgba(0,229,255,0.5), 0 0 40px rgba(179,0,255,0.25)",
        border: "1px solid rgba(0,229,255,0.6)",
        blur: "10px",
        pattern: PATTERNS.hexgrid,
        patternSize: "60px 52px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "golden-oud",
        name: "Golden Oud",
        primary: "#e0b84a",
        bg: "#2a1f0a",
        card: "#3d2d12",
        cardBg: "linear-gradient(145deg, #4a3716, #2a1f0a)",
        text: "#f5ecd8",
        textMuted: "#cdb888",
        radius: "22px",
        shadow: "0 10px 28px rgba(224,184,74,0.28)",
        border: "1px solid rgba(224,184,74,0.4)",
        blur: "14px",
        pattern: PATTERNS.lattice,
        patternSize: "60px 60px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "crimson-ember",
        name: "Crimson Ember",
        primary: "#e05353",
        bg: "#2a0a0a",
        card: "#3d1212",
        cardBg: "linear-gradient(145deg, #4a1616, #2a0a0a)",
        text: "#f7e5e5",
        textMuted: "#cf9c9c",
        radius: "16px",
        shadow: "0 10px 26px rgba(224,83,83,0.3)",
        border: "1px solid rgba(224,83,83,0.42)",
        blur: "10px",
        pattern: PATTERNS.starburst,
        patternSize: "64px 64px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "arctic-frost",
        name: "Arctic Frost",
        primary: "#7ec8e3",
        bg: "#0a1622",
        card: "#132330",
        cardBg: "linear-gradient(145deg, #1a2f40, #0a1622)",
        text: "#e9f6fb",
        textMuted: "#a3c4d4",
        radius: "18px",
        shadow: "0 10px 26px rgba(126,200,227,0.25)",
        border: "1px solid rgba(126,200,227,0.38)",
        blur: "18px",
        pattern: PATTERNS.dotgrid,
        patternSize: "34px 34px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "amethyst-dream",
        name: "Amethyst Dream",
        primary: "#b57edc",
        bg: "#180a2a",
        card: "#241040",
        cardBg: "linear-gradient(145deg, #2e1450, #180a2a)",
        text: "#f2e9fa",
        textMuted: "#c3a8d8",
        radius: "20px",
        shadow: "0 10px 28px rgba(181,126,220,0.28)",
        border: "1px solid rgba(181,126,220,0.4)",
        blur: "16px",
        pattern: PATTERNS.mosaic,
        patternSize: "46px 46px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "olive-grove",
        name: "Olive Grove",
        primary: "#9ccc65",
        bg: "#151f0d",
        card: "#212f16",
        cardBg: "linear-gradient(160deg, #2a3d1c, #151f0d)",
        text: "#eef5e6",
        textMuted: "#b7cba2",
        radius: "16px",
        shadow: "0 8px 24px rgba(156,204,101,0.25)",
        border: "1px solid rgba(156,204,101,0.35)",
        blur: "10px",
        pattern: PATTERNS.mandala,
        patternSize: "90px 90px",
        patternRepeat: "repeat",
        patternPosition: "bottom center"
    },
    {
        id: "coral-reef",
        name: "Coral Reef",
        primary: "#ff8a65",
        bg: "#2a120f",
        card: "#3d1c17",
        cardBg: "linear-gradient(160deg, #4a241d, #2a120f)",
        text: "#fbeae4",
        textMuted: "#d9ab9a",
        radius: "22px",
        shadow: "0 10px 28px rgba(255,138,101,0.28)",
        border: "1px solid rgba(255,138,101,0.4)",
        blur: "10px",
        pattern: PATTERNS.sunburst,
        patternSize: "420px 220px",
        patternRepeat: "no-repeat",
        patternPosition: "bottom center"
    },
    {
        id: "steel-blue",
        name: "Steel Blue",
        primary: "#5c8fc4",
        bg: "#0d1620",
        card: "#16222f",
        cardBg: "linear-gradient(145deg, #1d2c3d, #0d1620)",
        text: "#e8eef4",
        textMuted: "#9db2c4",
        radius: "14px",
        shadow: "0 8px 22px rgba(92,143,196,0.25)",
        border: "1px solid rgba(92,143,196,0.35)",
        blur: "12px",
        pattern: PATTERNS.hexgrid,
        patternSize: "60px 52px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "saffron-silk",
        name: "Saffron Silk",
        primary: "#ffb300",
        bg: "#2b1a00",
        card: "#3d2600",
        cardBg: "linear-gradient(145deg, #4a3000, #2b1a00)",
        text: "#faf0dc",
        textMuted: "#d9bd85",
        radius: "20px",
        shadow: "0 10px 28px rgba(255,179,0,0.28)",
        border: "1px solid rgba(255,179,0,0.4)",
        blur: "12px",
        pattern: PATTERNS.lattice,
        patternSize: "60px 60px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "plum-nights",
        name: "Plum Nights",
        primary: "#c26bc2",
        bg: "#200a20",
        card: "#301230",
        cardBg: "linear-gradient(145deg, #3a1a3a, #200a20)",
        text: "#f6e8f6",
        textMuted: "#cca3cc",
        radius: "18px",
        shadow: "0 10px 26px rgba(194,107,194,0.28)",
        border: "1px solid rgba(194,107,194,0.4)",
        blur: "14px",
        pattern: PATTERNS.starburst,
        patternSize: "64px 64px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "turquoise-bloom",
        name: "Turquoise Bloom",
        primary: "#26d0ce",
        bg: "#062824",
        card: "#0c3a33",
        cardBg: "linear-gradient(135deg, #124a41, #062824)",
        text: "#e5faf8",
        textMuted: "#96cdc8",
        radius: "20px",
        shadow: "0 10px 26px rgba(38,208,206,0.28)",
        border: "1px solid rgba(38,208,206,0.4)",
        blur: "15px",
        pattern: PATTERNS.mandala,
        patternSize: "90px 90px",
        patternRepeat: "repeat",
        patternPosition: "bottom center"
    },
    {
        id: "charcoal-ash",
        name: "Charcoal Ash",
        primary: "#bdbdbd",
        bg: "#141414",
        card: "#1f1f1f",
        cardBg: "#1f1f1f",
        text: "#eeeeee",
        textMuted: "#a0a0a0",
        radius: "10px",
        shadow: "0 2px 8px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.14)",
        blur: "0px",
        pattern: PATTERNS.faint,
        patternSize: "26px 26px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "wine-cellar",
        name: "Wine Cellar",
        primary: "#d4508a",
        bg: "#2a0a14",
        card: "#3d1220",
        cardBg: "linear-gradient(160deg, #4a1729, #2a0a14)",
        text: "#f7e5ee",
        textMuted: "#d19cb4",
        radius: "16px",
        shadow: "0 8px 24px rgba(212,80,138,0.28)",
        border: "1px solid rgba(212,80,138,0.4)",
        blur: "8px",
        pattern: PATTERNS.medallion,
        patternSize: "280px 280px",
        patternRepeat: "no-repeat",
        patternPosition: "bottom right"
    },
    {
        id: "lagoon-blue",
        name: "Lagoon Blue",
        primary: "#29b6f6",
        bg: "#031a24",
        card: "#093040",
        cardBg: "linear-gradient(135deg, #0e4356, #031a24)",
        text: "#e5f6fc",
        textMuted: "#8fc2d9",
        radius: "18px",
        shadow: "0 10px 26px rgba(41,182,246,0.28)",
        border: "1px solid rgba(41,182,246,0.4)",
        blur: "16px",
        pattern: PATTERNS.dotgrid,
        patternSize: "34px 34px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "cinnamon-spice",
        name: "Cinnamon Spice",
        primary: "#d2691e",
        bg: "#2b1508",
        card: "#3d200f",
        cardBg: "linear-gradient(160deg, #4a2812, #2b1508)",
        text: "#f5e5d8",
        textMuted: "#d1a888",
        radius: "14px",
        shadow: "0 8px 22px rgba(210,105,30,0.28)",
        border: "1px solid rgba(210,105,30,0.4)",
        blur: "6px",
        pattern: PATTERNS.mosaic,
        patternSize: "46px 46px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "lavender-mist",
        name: "Lavender Mist",
        primary: "#b39ddb",
        bg: "#1c1830",
        card: "#2a2444",
        cardBg: "linear-gradient(145deg, #332c54, #1c1830)",
        text: "#f1eef9",
        textMuted: "#c6bcdc",
        radius: "22px",
        shadow: "0 10px 28px rgba(179,157,219,0.25)",
        border: "1px solid rgba(179,157,219,0.38)",
        blur: "18px",
        pattern: PATTERNS.starburst,
        patternSize: "64px 64px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "bronze-age",
        name: "Bronze Age",
        primary: "#cd7f32",
        bg: "#241a0d",
        card: "#372814",
        cardBg: "linear-gradient(160deg, #453019, #241a0d)",
        text: "#f2e6d5",
        textMuted: "#c9ab87",
        radius: "14px",
        shadow: "0 8px 22px rgba(205,127,50,0.28)",
        border: "1px solid rgba(205,127,50,0.4)",
        blur: "6px",
        pattern: PATTERNS.medallion,
        patternSize: "280px 280px",
        patternRepeat: "no-repeat",
        patternPosition: "bottom right"
    },
    {
        id: "peacock-feather",
        name: "Peacock Feather",
        primary: "#20c9a6",
        bg: "#04211f",
        card: "#0a3330",
        cardBg: "linear-gradient(135deg, #0f4741, #04211f)",
        text: "#e4f9f5",
        textMuted: "#8fc9bd",
        radius: "18px",
        shadow: "0 10px 26px rgba(32,201,166,0.28)",
        border: "1px solid rgba(32,201,166,0.4)",
        blur: "14px",
        pattern: PATTERNS.mandala,
        patternSize: "90px 90px",
        patternRepeat: "repeat",
        patternPosition: "bottom center"
    },
    {
        id: "berry-frost",
        name: "Berry Frost",
        primary: "#e066e0",
        bg: "#210a24",
        card: "#331035",
        cardBg: "linear-gradient(145deg, #3f1441, #210a24)",
        text: "#f8e7f8",
        textMuted: "#d0a1d0",
        radius: "16px",
        shadow: "0 10px 26px rgba(224,102,224,0.3)",
        border: "1px solid rgba(224,102,224,0.42)",
        blur: "12px",
        pattern: PATTERNS.hexgrid,
        patternSize: "60px 52px",
        patternRepeat: "repeat",
        patternPosition: "center"
    },
    {
        id: "amber-glow",
        name: "Amber Glow",
        primary: "#ffab00",
        bg: "#2b1900",
        card: "#3d2400",
        cardBg: "linear-gradient(160deg, #4a2e00, #2b1900)",
        text: "#faeed8",
        textMuted: "#d9bc85",
        radius: "20px",
        shadow: "0 10px 28px rgba(255,171,0,0.3)",
        border: "1px solid rgba(255,171,0,0.42)",
        blur: "10px",
        pattern: PATTERNS.sunburst,
        patternSize: "420px 220px",
        patternRepeat: "no-repeat",
        patternPosition: "bottom center"
    },
    {
        id: "slate-storm",
        name: "Slate Storm",
        primary: "#78909c",
        bg: "#12161c",
        card: "#1c222c",
        cardBg: "linear-gradient(145deg, #232b37, #12161c)",
        text: "#e6eaee",
        textMuted: "#9aa8b2",
        radius: "12px",
        shadow: "0 8px 20px rgba(120,144,156,0.25)",
        border: "1px solid rgba(120,144,156,0.35)",
        blur: "8px",
        pattern: PATTERNS.lattice,
        patternSize: "60px 60px",
        patternRepeat: "repeat",
        patternPosition: "center"
    }



];

// Builds a CSS url() data-URI for an SVG pattern
function svgBg(svg, color) {
    const filled = svg.split("COLOR").join(color);
    return 'url("data:image/svg+xml,' + encodeURIComponent(filled) + '")';
}

// Apply full theme design (color + card design tokens + background pattern)
function applyThemeVars(theme) {
    const root = document.documentElement;
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--card", theme.card);
    root.style.setProperty("--card-bg", theme.cardBg);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--text-muted", theme.textMuted);
    root.style.setProperty("--card-radius", theme.radius);
    root.style.setProperty("--card-shadow", theme.shadow);
    root.style.setProperty("--card-border", theme.border);
    root.style.setProperty("--card-blur", theme.blur);
    root.style.setProperty("--bg-pattern", svgBg(theme.pattern, theme.primary));
    root.style.setProperty("--bg-pattern-size", theme.patternSize);
    root.style.setProperty("--bg-pattern-repeat", theme.patternRepeat);
    root.style.setProperty("--bg-pattern-position", theme.patternPosition);
}

// ==========================================
// FIX: APPLY SAVED THEME ON PAGE LOAD
// (themeDesigns ab pehle define ho chuka hai)
// ==========================================
(function () {
    const savedThemeId = localStorage.getItem("appTheme");
    if (!savedThemeId) return;
    const theme = themeDesigns.find(t => t.id === savedThemeId);
    if (!theme) return;
    applyThemeVars(theme);
})();

const themeGrid = document.getElementById("themeGrid");
let currentTheme = localStorage.getItem("appTheme") || themeDesigns[0].id;

function renderThemes() {
    if (!themeGrid) return;
    themeGrid.innerHTML = "";
    themeDesigns.forEach(theme => {
        const card = document.createElement("div");
        card.className = "theme-pick" + (theme.id === currentTheme ? " active" : "");
        card.dataset.themeId = theme.id;

        const mock = document.createElement("div");
        mock.className = "theme-pick-mock";
        mock.style.background = theme.bg;

        const patternLayer = document.createElement("div");
        patternLayer.className = "theme-pick-pattern";
        patternLayer.style.backgroundImage = svgBg(theme.pattern, theme.primary);
        patternLayer.style.backgroundSize = theme.patternRepeat === "repeat" ? "28px 28px" : "140% 140%";
        patternLayer.style.backgroundRepeat = theme.patternRepeat;
        patternLayer.style.backgroundPosition = theme.patternPosition;
        mock.appendChild(patternLayer);

        const inner = document.createElement("div");
        inner.className = "theme-pick-inner";
        inner.style.background = theme.cardBg;
        inner.style.borderRadius = theme.radius;
        inner.style.boxShadow = theme.shadow;
        inner.style.border = theme.border;

        const dot = document.createElement("div");
        dot.className = "theme-pick-dot";
        dot.style.background = theme.primary;
        dot.style.boxShadow = `0 0 10px ${theme.primary}`;

        const line1 = document.createElement("div");
        line1.className = "theme-pick-line";
        line1.style.background = theme.primary;

        const line2 = document.createElement("div");
        line2.className = "theme-pick-line short";
        line2.style.background = theme.textMuted;

        inner.appendChild(dot);
        inner.appendChild(line1);
        inner.appendChild(line2);
        mock.appendChild(inner);

        const name = document.createElement("div");
        name.className = "theme-pick-name";
        name.textContent = theme.name;
        if (theme.id === currentTheme) name.style.color = theme.primary;

        card.appendChild(mock);
        card.appendChild(name);
        card.addEventListener("click", function () {
            selectTheme(theme.id);
        });
        themeGrid.appendChild(card);
    });
}

function selectTheme(themeId) {
    currentTheme = themeId;
    localStorage.setItem("appTheme", themeId);
    applyTheme(themeId);
    window.location.href = "../index.html";
}

function applyTheme(themeId) {
    const theme = themeDesigns.find(t => t.id === themeId);
    if (!theme) return;
    applyThemeVars(theme);
}

// On page load (for Themes page)
document.addEventListener("DOMContentLoaded", function () {
    const saved = localStorage.getItem("appTheme");
    if (saved && themeDesigns.find(t => t.id === saved)) {
        currentTheme = saved;
        applyTheme(saved);
    } else {
        applyTheme(themeDesigns[0].id);
        currentTheme = themeDesigns[0].id;
    }
    if (themeGrid) {
        renderThemes();
    }
});