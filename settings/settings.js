// ==========================================
// SETTINGS PAGE - SIMPLIFIED
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // 1. THEMES (50 Colors)
    // ==============================
    const themeGrid = document.getElementById("themeGrid");
    const themes = [
        { id: "gold", name: "Gold", color: "#d4af37" },
        { id: "royal-blue", name: "Royal Blue", color: "#1565c0" },
        { id: "emerald", name: "Emerald", color: "#00897b" },
        { id: "forest", name: "Forest", color: "#1b5e20" },
        { id: "navy", name: "Navy", color: "#0d47a1" },
        { id: "violet", name: "Violet", color: "#7b1fa2" },
        { id: "wine", name: "Wine", color: "#880e4f" },
        { id: "olive", name: "Olive", color: "#33691e" },
        { id: "ruby", name: "Ruby", color: "#c62828" },
        { id: "orange", name: "Orange", color: "#e65100" },
        { id: "teal", name: "Teal", color: "#00838f" },
        { id: "pink", name: "Pink", color: "#c2185b" },
        { id: "sky", name: "Sky", color: "#0288d1" },
        { id: "lime", name: "Lime", color: "#827717" },
        { id: "copper", name: "Copper", color: "#b87333" },
        { id: "silver", name: "Silver", color: "#9e9e9e" },
        { id: "cyan", name: "Cyan", color: "#00bcd4" },
        { id: "indigo", name: "Indigo", color: "#283593" },
        { id: "brown", name: "Brown", color: "#4e342e" },
        { id: "crimson", name: "Crimson", color: "#dc143c" },
        { id: "coral", name: "Coral", color: "#ff6f61" },
        { id: "peach", name: "Peach", color: "#ffb74d" },
        { id: "mint", name: "Mint", color: "#4dd0e1" },
        { id: "lavender", name: "Lavender", color: "#ba68c8" },
        { id: "burgundy", name: "Burgundy", color: "#800020" },
        { id: "mustard", name: "Mustard", color: "#ffdb58" },
        { id: "sage", name: "Sage", color: "#8a9a5b" },
        { id: "stone", name: "Stone", color: "#607d8b" },
        { id: "cobalt", name: "Cobalt", color: "#0047ab" },
        { id: "turquoise", name: "Turquoise", color: "#00ced1" },
        { id: "chocolate", name: "Chocolate", color: "#d2691e" },
        { id: "plum", name: "Plum", color: "#8e4585" },
        { id: "slate", name: "Slate", color: "#708090" },
        { id: "amber", name: "Amber", color: "#ffbf00" },
        { id: "fuchsia", name: "Fuchsia", color: "#ff00ff" },
        { id: "aqua", name: "Aqua", color: "#00ffff" },
        { id: "magenta", name: "Magenta", color: "#ff00a0" },
        { id: "periwinkle", name: "Periwinkle", color: "#ccccff" },
        { id: "jade", name: "Jade", color: "#00a86b" },
        { id: "sand", name: "Sand", color: "#c2b280" },
        { id: "rust", name: "Rust", color: "#b7410e" },
        { id: "charcoal", name: "Charcoal", color: "#36454f" },
        { id: "cream", name: "Cream", color: "#fffdd0" },
        { id: "rose-gold", name: "Rose Gold", color: "#b76e79" },
        { id: "steel", name: "Steel", color: "#4682b4" },
        { id: "mahogany", name: "Mahogany", color: "#c04000" },
        { id: "cardinal", name: "Cardinal", color: "#c41e3a" },
        { id: "maroon", name: "Maroon", color: "#800000" },
        { id: "chartreuse", name: "Chartreuse", color: "#7fff00" },
        { id: "neon-blue", name: "Neon Blue", color: "#1f51ff" }
    ];

    function renderThemes() {
        const saved = localStorage.getItem("appTheme") || "gold";
        themeGrid.innerHTML = "";
        themes.forEach(t => {
            const card = document.createElement("div");
            card.className = "theme-card" + (t.id === saved ? " active" : "");
            card.innerHTML = `
                <div class="theme-preview" style="background:${t.color};"></div>
                <span class="theme-name">${t.name}</span>
            `;
            card.addEventListener("click", () => {
                document.documentElement.style.setProperty("--primary", t.color);
                localStorage.setItem("appTheme", t.id);
                document.querySelectorAll(".theme-card").forEach(c => c.classList.remove("active"));
                card.classList.add("active");
            });
            themeGrid.appendChild(card);
        });
    }
    renderThemes();

    // ==============================
    // 2. TOGGLE: CONTACT US
    // ==============================
    const contactToggle = document.getElementById("contactToggle");
    const contactContent = document.getElementById("contactContent");
    const contactArrow = document.getElementById("contactArrow");

    if (contactToggle && contactContent && contactArrow) {
        contactToggle.addEventListener("click", function () {
            const isOpen = contactContent.style.display !== "none";
            contactContent.style.display = isOpen ? "none" : "block";
            contactArrow.innerHTML = isOpen
                ? '<i class="fa-solid fa-chevron-down"></i>'
                : '<i class="fa-solid fa-chevron-up"></i>';
        });
    }

    // ==============================
    // 3. TOGGLE: THEMES
    // ==============================
    const themeToggle = document.getElementById("themeToggle");
    const themeContent = document.getElementById("themeContent");
    const themeArrow = document.getElementById("themeArrow");

    if (themeToggle && themeContent && themeArrow) {
        themeToggle.addEventListener("click", function () {
            const isOpen = themeContent.style.display !== "none";
            themeContent.style.display = isOpen ? "none" : "block";
            themeArrow.innerHTML = isOpen
                ? '<i class="fa-solid fa-chevron-down"></i>'
                : '<i class="fa-solid fa-chevron-up"></i>';
        });
    }

    // ==============================
    // 4. MORE MENU
    // ==============================
    const moreNavBtn = document.getElementById("moreNavBtn");
    const moreMenu = document.getElementById("moreMenu");
    const closeMoreMenuBtn = document.getElementById("closeMoreMenuBtn");

    if (moreNavBtn && moreMenu && closeMoreMenuBtn) {
        moreNavBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            moreMenu.classList.add("show");
        });
        closeMoreMenuBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            moreMenu.classList.remove("show");
        });
        document.addEventListener("click", function (e) {
            if (moreMenu.classList.contains("show") &&
                !moreMenu.contains(e.target) &&
                !moreNavBtn.contains(e.target)) {
                moreMenu.classList.remove("show");
            }
        });
    }
});