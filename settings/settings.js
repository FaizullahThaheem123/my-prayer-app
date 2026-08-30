// ==========================================
// SETTINGS PAGE - COMPLETE LOGIC
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // DOM refs
    const unAuthDiv = document.getElementById("unauthenticated");
    const authDiv = document.getElementById("authenticated");
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userPhoto = document.getElementById("userPhoto");
    const shareToggle = document.getElementById("shareLocationToggle");
    const signInBtn = document.getElementById("googleSignInBtn");
    const signOutBtn = document.getElementById("signOutBtn");
    const nearbyList = document.getElementById("nearbyList");
    const themeGrid = document.getElementById("themeGrid");

    // More Menu
    const moreNavBtn = document.getElementById("moreNavBtn");
    const moreMenu = document.getElementById("moreMenu");
    const closeMoreMenuBtn = document.getElementById("closeMoreMenuBtn");

    // ==============================
    // 1. THEMES (50 Colors)
    // ==============================
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
    // 2. AUTH STATE
    // ==============================
    function updateUI(user) {
        if (user) {
            unAuthDiv.style.display = "none";
            authDiv.style.display = "block";
            userName.textContent = user.displayName || "User";
            userEmail.textContent = user.email || "";
            userPhoto.src = user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName || "User");
            const sharePref = localStorage.getItem("shareLocation_" + user.uid);
            const enabled = (sharePref === "true");
            shareToggle.checked = enabled;
            if (typeof locationShareEnabled !== "undefined") {
                // update global state if needed, but we'll rely on toggle
            }
            loadNearbyUsers();
        } else {
            unAuthDiv.style.display = "block";
            authDiv.style.display = "none";
            nearbyList.innerHTML = `<p style="color:#888; text-align:center; padding:10px;">Sign in to see nearby users.</p>`;
        }
    }

    window.addEventListener("authStateChanged", function (e) {
        updateUI(e.detail.user);
    });

    if (typeof auth !== "undefined" && auth.currentUser) {
        updateUI(auth.currentUser);
    }

    // ==============================
    // 3. SIGN IN / OUT
    // ==============================
    signInBtn.addEventListener("click", function () {
        signInWithGoogle()
            .then(user => {
                updateUI(user);
                if (shareToggle.checked) {
                    updateUserLocationFromStorage();
                }
            })
            .catch(error => alert("Sign-in failed: " + error.message));
    });

    signOutBtn.addEventListener("click", function () {
        signOutUser().then(() => updateUI(null));
    });

    // ==============================
    // 4. LOCATION SHARING
    // ==============================
    shareToggle.addEventListener("change", function () {
        const enabled = this.checked;
        setLocationShareEnabled(enabled);
        if (enabled) {
            updateUserLocationFromStorage();
            loadNearbyUsers();
        } else {
            if (currentUser) {
                database.ref("users/" + currentUser.uid + "/location").remove();
            }
            nearbyList.innerHTML = `<p style="color:#888; text-align:center; padding:10px;">Location sharing disabled.</p>`;
        }
    });

    function updateUserLocationFromStorage() {
        const lat = localStorage.getItem("userLatitude");
        const lng = localStorage.getItem("userLongitude");
        if (lat && lng && currentUser) {
            updateUserLocation(parseFloat(lat), parseFloat(lng));
        }
    }

    // ==============================
    // 5. NEARBY USERS
    // ==============================
    function loadNearbyUsers() {
        if (!currentUser) {
            nearbyList.innerHTML = `<p style="color:#888; text-align:center; padding:10px;">Sign in to see nearby users.</p>`;
            return;
        }
        if (!locationShareEnabled) {
            nearbyList.innerHTML = `<p style="color:#888; text-align:center; padding:10px;">Enable location sharing to see nearby users.</p>`;
            return;
        }
        const lat = parseFloat(localStorage.getItem("userLatitude"));
        const lng = parseFloat(localStorage.getItem("userLongitude"));
        if (isNaN(lat) || isNaN(lng)) {
            nearbyList.innerHTML = `<p style="color:#888; text-align:center; padding:10px;">Location not available. Please allow GPS.</p>`;
            return;
        }

        nearbyList.innerHTML = `<p style="color:#888; text-align:center; padding:10px;"><i class="fa-solid fa-spinner fa-spin"></i> Finding nearby users...</p>`;

        getNearbyUsers(lat, lng, 50)
            .then(users => {
                if (users.length === 0) {
                    nearbyList.innerHTML = `<p style="color:#888; text-align:center; padding:10px;">No nearby users found within 50 km.</p>`;
                    return;
                }
                let html = "";
                users.forEach(u => {
                    const dist = u.distance < 1 ? (u.distance * 1000).toFixed(0) + " m" : u.distance.toFixed(1) + " km";
                    const lastActive = u.lastActive ? new Date(u.lastActive).toLocaleString() : "recently";
                    html += `
                        <div class="nearby-item">
                            <img src="${u.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(u.displayName)}" alt="${u.displayName}">
                            <div class="info">
                                <strong>${u.displayName}</strong>
                                <span>Last active: ${lastActive}</span>
                            </div>
                            <div class="distance">${dist}</div>
                        </div>
                    `;
                });
                nearbyList.innerHTML = html;
            })
            .catch(() => {
                nearbyList.innerHTML = `<p style="color:#e53935; text-align:center; padding:10px;">Error loading nearby users.</p>`;
            });
    }

    // Auto-refresh every 30 sec
    setInterval(() => {
        if (currentUser && locationShareEnabled) {
            loadNearbyUsers();
        }
    }, 30000);

    // ==============================
    // 6. MORE MENU
    // ==============================
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