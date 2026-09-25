// ==========================================
// SETTINGS PAGE — WITH GOOGLE SIGN-IN
// ==========================================

const GOOGLE_WEB_CLIENT_ID = "1083769445858-mcvoq5rsqs9003jkh64qj3nmq6b6t21p.apps.googleusercontent.com";
const USER_STORAGE_KEY = "myprayer_user";

document.addEventListener("DOMContentLoaded", function () {

    console.log("✅ settings.js: DOMContentLoaded fired");

    // ==============================
    // 0. GOOGLE SIGN-IN
    // ==============================
    setupGoogleAuth();

    function setupGoogleAuth() {
        const guestBox = document.getElementById("accountGuest");
        const userBox = document.getElementById("accountUser");
        const signInBtn = document.getElementById("googleSignInBtn");
        const signOutBtn = document.getElementById("googleSignOutBtn");
        const userPhoto = document.getElementById("userPhoto");
        const userName = document.getElementById("userName");
        const userEmail = document.getElementById("userEmail");

        if (!guestBox || !userBox) {
            console.warn("Google account UI elements not found.");
            return;
        }

        const SocialLogin =
            (window.Capacitor &&
             window.Capacitor.Plugins &&
             window.Capacitor.Plugins.SocialLogin)
                ? window.Capacitor.Plugins.SocialLogin
                : null;

        function loadUser() {
            try {
                const raw = localStorage.getItem(USER_STORAGE_KEY);
                if (!raw) return null;
                return JSON.parse(raw);
            } catch (e) {
                console.warn("User load error:", e);
                return null;
            }
        }

        function saveUser(user) {
            try { localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user)); }
            catch (e) { console.warn("User save error:", e); }
        }

        function clearUser() {
            try { localStorage.removeItem(USER_STORAGE_KEY); }
            catch (e) { console.warn("User clear error:", e); }
        }

        function showUser(user) {
            guestBox.style.display = "none";
            userBox.style.display = "block";

            if (userPhoto) {
                const imageUrl = user.imageUrl || user.photoURL || user.picture || "";
                if (imageUrl) {
                    userPhoto.src = imageUrl;
                    userPhoto.style.display = "block";
                } else {
                    userPhoto.removeAttribute("src");
                }
                userPhoto.onerror = function () { this.removeAttribute("src"); };
            }
            if (userName) userName.textContent = user.name || "User";
            if (userEmail) userEmail.textContent = user.email || "";
        }

        function showGuest() {
            guestBox.style.display = "block";
            userBox.style.display = "none";
        }

        const saved = loadUser();
        if (saved) showUser(saved);
        else showGuest();

        async function initializeGoogle() {
            if (!SocialLogin) { console.warn("SocialLogin plugin not available."); return; }
            try {
                await SocialLogin.initialize({
                    google: { webClientId: GOOGLE_WEB_CLIENT_ID, mode: "online" }
                });
                console.log("✅ Google SocialLogin initialized");
            } catch (err) { console.error("❌ Google initialize error:", err); }
        }
        initializeGoogle();

        if (signInBtn) {
            signInBtn.addEventListener("click", async function () {
                if (!SocialLogin) {
                    alert("Google Sign-In sirf Android app mein kaam karta hai.");
                    return;
                }
                signInBtn.disabled = true;
                signInBtn.style.opacity = "0.7";
                const span = signInBtn.querySelector("span");
                const originalText = span ? span.textContent : "";
                if (span) span.textContent = "Signing in...";

                try {
                    const response = await SocialLogin.login({
                        provider: "google",
                        options: { scopes: ["email", "profile"], filterByAuthorizedAccounts: false }
                    });
                    console.log("Google Login Response:", response);

                    const result = response && response.result ? response.result : null;
                    const profile = result && result.profile ? result.profile : null;
                    if (!result) throw new Error("Google login result nahi mila.");

                    const user = {
                        id: profile?.id || "",
                        email: profile?.email || "",
                        name: profile?.name || "User",
                        givenName: profile?.givenName || "",
                        familyName: profile?.familyName || "",
                        imageUrl: profile?.imageUrl || profile?.imageURL || profile?.photoURL || profile?.picture || "",
                        idToken: result.idToken || "",
                        signedInAt: Date.now()
                    };

                    if (!user.email && !user.id) throw new Error("Google account information nahi mili.");

                    saveUser(user);
                    showUser(user);
                    console.log("✅ Google signed in:", user.email);
                } catch (err) {
                    console.warn("Google Sign-In error:", err);
                    const msg = err && err.message ? err.message : String(err || "Unknown error");
                    const lower = msg.toLowerCase();
                    if (lower.includes("cancel") || lower.includes("12501")) {
                        console.log("Google Sign-In cancelled.");
                    } else {
                        alert("Google Sign-In nahi ho saka:\n\n" + msg);
                    }
                } finally {
                    signInBtn.disabled = false;
                    signInBtn.style.opacity = "1";
                    if (span) span.textContent = originalText;
                }
            });
        }

        if (signOutBtn) {
            signOutBtn.addEventListener("click", async function () {
                if (!confirm("Sign out karna chahte hain?")) return;
                try {
                    if (SocialLogin && typeof SocialLogin.logout === "function") {
                        await SocialLogin.logout({ provider: "google" });
                    }
                } catch (e) { console.warn("Google sign out error:", e); }
                clearUser();
                showGuest();
                console.log("✅ Signed out");
            });
        }
    }

    // ==============================
    // 1. THEMES (Fallback)
    // ==============================
    const themeGrid = document.getElementById("themeGrid");
    const fallbackThemes = [
        { id: "gold", name: "Gold", color: "#d4af37" },
        { id: "royal-blue", name: "Royal Blue", color: "#1565c0" },
        { id: "emerald", name: "Emerald", color: "#00897b" },
        { id: "forest", name: "Forest", color: "#1b5e20" },
        { id: "navy", name: "Navy", color: "#0d47a1" },
        { id: "violet", name: "Violet", color: "#7b1fa2" },
        { id: "wine", name: "Wine", color: "#880e4f" },
        { id: "ruby", name: "Ruby", color: "#c62828" },
        { id: "orange", name: "Orange", color: "#e65100" },
        { id: "teal", name: "Teal", color: "#00838f" },
        { id: "crimson", name: "Crimson", color: "#dc143c" },
        { id: "plum", name: "Plum", color: "#8e4585" }
    ];

    function renderFallbackThemes() {
        if (typeof themeDesigns !== "undefined") return;
        if (!themeGrid) return;
        const saved = localStorage.getItem("appTheme") || "gold";
        themeGrid.innerHTML = "";
        fallbackThemes.forEach(t => {
            const card = document.createElement("div");
            card.className = "theme-card" + (t.id === saved ? " active" : "");
            card.innerHTML = `
                <div class="theme-preview" style="background:${t.color};"></div>
                <span class="theme-name">${t.name}</span>
            `;
            card.addEventListener("click", function () {
                document.documentElement.style.setProperty("--primary", t.color);
                localStorage.setItem("appTheme", t.id);
                document.querySelectorAll(".theme-card").forEach(c => c.classList.remove("active"));
                this.classList.add("active");
            });
            themeGrid.appendChild(card);
        });
    }
    renderFallbackThemes();

    // ==============================
    // 2. COLLAPSIBLES
    // ==============================
    bindCollapsible("contactToggle", "contactContent", "contactArrow");
    bindCollapsible("themeToggle", "themeContent", "themeArrow");
    bindCollapsible("permissionsToggle", "permissionsContent", "permissionsArrow");

    function bindCollapsible(toggleId, contentId, arrowId) {
        const toggle = document.getElementById(toggleId);
        const content = document.getElementById(contentId);
        const arrow = document.getElementById(arrowId);
        if (!toggle || !content || !arrow) return;

        toggle.addEventListener("click", function (e) {
            e.preventDefault();
            const isOpen = content.style.display !== "none";
            content.style.display = isOpen ? "none" : "block";
            arrow.innerHTML = isOpen
                ? '<i class="fa-solid fa-chevron-down"></i>'
                : '<i class="fa-solid fa-chevron-up"></i>';
        });
    }

    // ==============================
    // 3. RATE ON PLAY STORE
    // ==============================
    const rateAppBtn = document.getElementById("rateAppBtn");
    if (rateAppBtn) {
        rateAppBtn.addEventListener("click", function () {
            const PACKAGE_NAME = "com.myprayer.app";
            const url = "https://play.google.com/store/apps/details?id=" + PACKAGE_NAME;
            if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
                window.open(url, "_system");
            } else {
                window.open(url, "_blank");
            }
        });
    }

    // ==============================
    // 4. APP PERMISSIONS
    // ==============================
    setupPermissions();

    function setupPermissions() {
        const notificationBtn = document.getElementById("permNotificationBtn");
        const locationBtn = document.getElementById("permLocationBtn");
        const backgroundBtn = document.getElementById("permBackgroundBtn");

        const notificationStatus = document.getElementById("permNotificationStatus");
        const locationStatus = document.getElementById("permLocationStatus");
        const backgroundStatus = document.getElementById("permBackgroundStatus");

        const notificationItem = document.getElementById("permNotificationItem");
        const locationItem = document.getElementById("permLocationItem");
        const backgroundItem = document.getElementById("permBackgroundItem");

        const isNative = !!(window.Capacitor && window.Capacitor.Plugins);

        function setGranted(item, statusEl, btn, text) {
            if (item) { item.classList.remove("denied"); item.classList.add("granted"); }
            if (statusEl) { statusEl.textContent = text || "Granted ✓"; statusEl.className = "status-ok"; }
            if (btn) { btn.textContent = "Allowed"; btn.disabled = true; btn.classList.add("granted-btn"); }
        }
        function setDenied(item, statusEl, btn, text) {
            if (item) { item.classList.remove("granted"); item.classList.add("denied"); }
            if (statusEl) { statusEl.textContent = text || "Not allowed"; statusEl.className = "status-bad"; }
            if (btn) { btn.textContent = "Allow"; btn.disabled = false; btn.classList.remove("granted-btn"); }
        }
        function setPending(item, statusEl, btn, text) {
            if (item) item.classList.remove("granted", "denied");
            if (statusEl) { statusEl.textContent = text || "Tap to allow"; statusEl.className = ""; }
            if (btn) { btn.textContent = "Allow"; btn.disabled = false; btn.classList.remove("granted-btn"); }
        }

        async function checkNotification() {
            if (!isNative || !window.Capacitor.Plugins.LocalNotifications) {
                setPending(notificationItem, notificationStatus, notificationBtn, "Browser mode");
                return;
            }
            try {
                const LN = window.Capacitor.Plugins.LocalNotifications;
                const perm = await LN.checkPermissions();
                if (perm.display === "granted") setGranted(notificationItem, notificationStatus, notificationBtn, "Notifications enabled ✓");
                else setDenied(notificationItem, notificationStatus, notificationBtn, "Notifications disabled");
            } catch (e) { setPending(notificationItem, notificationStatus, notificationBtn, "Tap to allow"); }
        }

        if (notificationBtn) {
            notificationBtn.addEventListener("click", async function () {
                if (!isNative || !window.Capacitor.Plugins.LocalNotifications) {
                    alert("Ye feature sirf app me kaam karta hai.");
                    return;
                }
                try {
                    const LN = window.Capacitor.Plugins.LocalNotifications;
                    const perm = await LN.requestPermissions();
                    if (perm.display === "granted") setGranted(notificationItem, notificationStatus, notificationBtn, "Notifications enabled ✓");
                    else setDenied(notificationItem, notificationStatus, notificationBtn, "Denied — settings se allow karein");
                } catch (e) { setDenied(notificationItem, notificationStatus, notificationBtn, "Error — dobara try karein"); }
            });
        }

        async function checkLocation() {
            if (!isNative || !window.Capacitor.Plugins.Geolocation) {
                setPending(locationItem, locationStatus, locationBtn, "Browser mode");
                return;
            }
            try {
                const Geo = window.Capacitor.Plugins.Geolocation;
                const perm = await Geo.checkPermissions();
                const granted = (perm.location === "granted" || perm.coarseLocation === "granted");
                const denied = (perm.location === "denied" && perm.coarseLocation === "denied");
                if (granted) setGranted(locationItem, locationStatus, locationBtn, "Location enabled ✓");
                else if (denied) setDenied(locationItem, locationStatus, locationBtn, "Location disabled — Allow dabayein");
                else setPending(locationItem, locationStatus, locationBtn, "Tap Allow to enable location");
            } catch (e) { setPending(locationItem, locationStatus, locationBtn, "Tap to allow"); }
        }

        if (locationBtn) {
            locationBtn.addEventListener("click", async function () {
                if (!isNative || !window.Capacitor.Plugins.Geolocation) {
                    alert("Ye feature sirf app me kaam karta hai.");
                    return;
                }
                const Geo = window.Capacitor.Plugins.Geolocation;
                try {
                    let perm = await Geo.requestPermissions();
                    let granted = (perm.location === "granted" || perm.coarseLocation === "granted");
                    if (!granted) {
                        locationStatus.textContent = "Requesting permission...";
                        locationStatus.className = "";
                        try {
                            await Geo.getCurrentPosition({ enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
                            perm = await Geo.checkPermissions();
                            granted = (perm.location === "granted" || perm.coarseLocation === "granted");
                        } catch (e) {
                            try {
                                perm = await Geo.checkPermissions();
                                granted = (perm.location === "granted" || perm.coarseLocation === "granted");
                            } catch (e2) {}
                        }
                    }
                    if (granted) setGranted(locationItem, locationStatus, locationBtn, "Location enabled ✓");
                    else setDenied(locationItem, locationStatus, locationBtn, "Denied — settings se enable karein");
                } catch (e) { setDenied(locationItem, locationStatus, locationBtn, "Error — dobara try karein"); }
            });
        }

        async function checkBackground() {
            if (!isNative || !window.Capacitor.Plugins.LocalNotifications) {
                setPending(backgroundItem, backgroundStatus, backgroundBtn, "Browser mode");
                return;
            }
            try {
                const LN = window.Capacitor.Plugins.LocalNotifications;
                if (typeof LN.checkExactNotificationSetting !== "function") {
                    setPending(backgroundItem, backgroundStatus, backgroundBtn, "Not supported");
                    return;
                }
                const setting = await LN.checkExactNotificationSetting();
                if (setting.exact_alarm === "granted") setGranted(backgroundItem, backgroundStatus, backgroundBtn, "Background alarms allowed ✓");
                else setDenied(backgroundItem, backgroundStatus, backgroundBtn, "Background alarms disabled");
            } catch (e) { setPending(backgroundItem, backgroundStatus, backgroundBtn, "Tap to allow"); }
        }

        if (backgroundBtn) {
            backgroundBtn.addEventListener("click", async function () {
                if (!isNative || !window.Capacitor.Plugins.LocalNotifications) {
                    alert("Ye feature sirf app me kaam karta hai.");
                    return;
                }
                try {
                    const LN = window.Capacitor.Plugins.LocalNotifications;
                    if (typeof LN.changeExactNotificationSetting !== "function") {
                        alert("Is device pe ye setting available nahi hai.");
                        return;
                    }
                    await LN.changeExactNotificationSetting();
                    setTimeout(checkBackground, 1500);
                } catch (e) {}
            });
        }

        checkNotification();
        checkLocation();
        checkBackground();

        var CapApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
        if (CapApp && typeof CapApp.addListener === "function") {
            CapApp.addListener("appStateChange", function (state) {
                if (state && state.isActive) {
                    checkNotification();
                    checkLocation();
                    checkBackground();
                }
            });
        }

        document.addEventListener("visibilitychange", function () {
            if (document.visibilityState === "visible") {
                checkNotification();
                checkLocation();
                checkBackground();
            }
        });

        window.addEventListener("focus", function () {
            checkNotification();
            checkLocation();
            checkBackground();
        });
    }

    // ==============================
    // 5. MORE MENU  ⬅️ AB YAHAN, ANDAR
    // ==============================
    const moreNavBtn = document.getElementById("moreNavBtn");
    const moreMenu = document.getElementById("moreMenu");
    const closeMoreMenuBtn = document.getElementById("closeMoreMenuBtn");

    console.log("More nav elements:", {
        btn: !!moreNavBtn,
        menu: !!moreMenu,
        closeBtn: !!closeMoreMenuBtn
    });

    if (moreNavBtn && moreMenu && closeMoreMenuBtn) {
        moreNavBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            moreMenu.classList.toggle("show");
        });

        closeMoreMenuBtn.addEventListener("click", function (e) {
            e.preventDefault();
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

// ======================================
// UNIVERSAL BACK BUTTON HANDLER
// ======================================
(function () {
    "use strict";

    function initBackButton() {
        if (!window.Capacitor || !window.Capacitor.Plugins || !window.Capacitor.Plugins.App) return;

        const { App } = window.Capacitor.Plugins;

        App.addListener("backButton", async function () {
            const menu = document.getElementById("moreMenu");
            if (menu && menu.classList.contains("show")) {
                menu.classList.remove("show");
                return;
            }
            try {
                const canGoBack = await App.canGoBack();
                if (canGoBack) { await App.goBack(); return; }
            } catch (e) {}
            window.location.href = "../index.html";
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initBackButton);
    } else {
        initBackButton();
    }
})();