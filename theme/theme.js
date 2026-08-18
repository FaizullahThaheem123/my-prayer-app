/* ==========================================
   APPLY SAVED THEME IMMEDIATELY
   PREVENT DEFAULT COLOR FLASH
========================================== */

(function () {
    const savedTheme = localStorage.getItem("appTheme");

    if (!savedTheme) return;

    const themeColors = {
        "gold": "#d4af37",
        "royal-blue": "#1565c0",
        "emerald": "#00897b",
        "forest": "#1b5e20",
        "navy": "#0d47a1",
        "violet": "#7b1fa2",
        "wine": "#880e4f",
        "olive": "#33691e",
        "ruby": "#c62828",
        "orange": "#e65100",
        "teal": "#00838f",
        "pink": "#c2185b",
        "sky": "#0288d1",
        "lime": "#827717",
        "copper": "#b87333",
        "silver": "#9e9e9e",
        "cyan": "#00bcd4",
        "indigo": "#283593",
        "brown": "#4e342e",
        "crimson": "#dc143c",
        "coral": "#ff6f61",
        "peach": "#ffb74d",
        "mint": "#4dd0e1",
        "lavender": "#ba68c8",
        "burgundy": "#800020",
        "mustard": "#ffdb58",
        "sage": "#8a9a5b",
        "stone": "#607d8b",
        "cobalt": "#0047ab",
        "turquoise": "#00ced1",
        "chocolate": "#d2691e",
        "plum": "#8e4585",
        "slate": "#708090",
        "amber": "#ffbf00",
        "fuchsia": "#ff00ff",
        "aqua": "#00ffff",
        "magenta": "#ff00a0",
        "periwinkle": "#ccccff",
        "jade": "#00a86b",
        "sand": "#c2b280",
        "rust": "#b7410e",
        "charcoal": "#36454f",
        "cream": "#fffdd0",
        "rose-gold": "#b76e79",
        "steel": "#4682b4",
        "mahogany": "#c04000",
        "cardinal": "#c41e3a",
        "maroon": "#800000",
        "chartreuse": "#7fff00",
        "neon-blue": "#1f51ff"
    };

    const color = themeColors[savedTheme];

    if (color) {
        document.documentElement.style.setProperty("--primary", color);
    }
})();

/* ======================================
   MY PRAYER - THEMES (50 UNIQUE COLORS)
   AUTO-REDIRECT TO HOME ON SELECT
====================================== */

const themes = [
    { id: "gold", name: "Gold", colors: ["#d4af37", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "royal-blue", name: "Royal Blue", colors: ["#1565c0", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "emerald", name: "Emerald", colors: ["#00897b", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "forest", name: "Forest", colors: ["#1b5e20", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "navy", name: "Navy", colors: ["#0d47a1", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "violet", name: "Violet", colors: ["#7b1fa2", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "wine", name: "Wine", colors: ["#880e4f", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "olive", name: "Olive", colors: ["#33691e", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "ruby", name: "Ruby", colors: ["#c62828", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "orange", name: "Orange", colors: ["#e65100", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "teal", name: "Teal", colors: ["#00838f", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "pink", name: "Pink", colors: ["#c2185b", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "sky", name: "Sky", colors: ["#0288d1", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "lime", name: "Lime", colors: ["#827717", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "copper", name: "Copper", colors: ["#b87333", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "silver", name: "Silver", colors: ["#9e9e9e", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "cyan", name: "Cyan", colors: ["#00bcd4", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "indigo", name: "Indigo", colors: ["#283593", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "brown", name: "Brown", colors: ["#4e342e", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "crimson", name: "Crimson", colors: ["#dc143c", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "coral", name: "Coral", colors: ["#ff6f61", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "peach", name: "Peach", colors: ["#ffb74d", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "mint", name: "Mint", colors: ["#4dd0e1", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "lavender", name: "Lavender", colors: ["#ba68c8", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "burgundy", name: "Burgundy", colors: ["#800020", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "mustard", name: "Mustard", colors: ["#ffdb58", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "sage", name: "Sage", colors: ["#8a9a5b", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "stone", name: "Stone", colors: ["#607d8b", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "cobalt", name: "Cobalt", colors: ["#0047ab", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "turquoise", name: "Turquoise", colors: ["#00ced1", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "chocolate", name: "Chocolate", colors: ["#d2691e", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "plum", name: "Plum", colors: ["#8e4585", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "slate", name: "Slate", colors: ["#708090", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "amber", name: "Amber", colors: ["#ffbf00", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "fuchsia", name: "Fuchsia", colors: ["#ff00ff", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "aqua", name: "Aqua", colors: ["#00ffff", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "magenta", name: "Magenta", colors: ["#ff00a0", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "periwinkle", name: "Periwinkle", colors: ["#ccccff", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "jade", name: "Jade", colors: ["#00a86b", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "sand", name: "Sand", colors: ["#c2b280", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "rust", name: "Rust", colors: ["#b7410e", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "charcoal", name: "Charcoal", colors: ["#36454f", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "cream", name: "Cream", colors: ["#fffdd0", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "rose-gold", name: "Rose Gold", colors: ["#b76e79", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "steel", name: "Steel", colors: ["#4682b4", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "mahogany", name: "Mahogany", colors: ["#c04000", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "cardinal", name: "Cardinal", colors: ["#c41e3a", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "maroon", name: "Maroon", colors: ["#800000", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "chartreuse", name: "Chartreuse", colors: ["#7fff00", "#1a1a1a", "#2a2a2a", "#e0e0e0"] },
    { id: "neon-blue", name: "Neon Blue", colors: ["#1f51ff", "#1a1a1a", "#2a2a2a", "#e0e0e0"] }
];

const themeGrid = document.getElementById("themeGrid");
let currentTheme = localStorage.getItem("appTheme") || "gold";

// Apply theme CSS variables
function applyTheme(themeId) {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;
    const root = document.documentElement;
    root.style.setProperty("--primary", theme.colors[0]);
    root.style.setProperty("--bg", theme.colors[1]);
    root.style.setProperty("--card", theme.colors[2]);
    root.style.setProperty("--text", theme.colors[3]);
}

// Render theme grid
function renderThemes() {
    if (!themeGrid) return;
    themeGrid.innerHTML = "";
    themes.forEach(theme => {
        const card = document.createElement("div");
        card.className = "theme-card" + (theme.id === currentTheme ? " active" : "");
        card.dataset.themeId = theme.id;
        
        const preview = document.createElement("div");
        preview.className = "theme-preview";
        preview.style.background = `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[2]})`;
        
        const name = document.createElement("div");
        name.className = "theme-name";
        name.textContent = theme.name;
        
        card.appendChild(preview);
        card.appendChild(name);
        card.addEventListener("click", function() {
            selectTheme(theme.id);
        });
        themeGrid.appendChild(card);
    });
}

// Select theme - NOW AUTOMATICALLY REDIRECTS TO HOME
function selectTheme(themeId) {
    currentTheme = themeId;
    localStorage.setItem("appTheme", themeId);
    applyTheme(themeId);
    // *** Redirect to Home immediately after selection ***
    window.location.href = "../index.html";
}

// On page load
document.addEventListener("DOMContentLoaded", function() {
    const saved = localStorage.getItem("appTheme");
    if (saved) {
        currentTheme = saved;
        applyTheme(saved);
    } else {
        applyTheme("gold");
    }
    if (themeGrid) {
        renderThemes();
    }
});