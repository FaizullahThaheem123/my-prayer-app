"use strict";

let prayerTimes = {};
let jamaatTimes = {};
let currentPrayer = "";

const date = document.getElementById("date");
const islamicDate = document.getElementById("islamic-date");
const locationName = document.getElementById("locationName");
const locationNameText = document.getElementById("locationNameText");
const countdown = document.getElementById("countdown");
const liveTimeDisplay = document.getElementById("liveTimeDisplay");

const locRefreshBtn = document.getElementById("locationRefreshButton") ||
                      document.getElementById("locationRefreshBtn");

/*
 * ✅ FIX: Button ko har bar fresh dhoondo.
 *
 * Pehle wala top-level lookup agar null reh jata (script head me ho,
 * ya button baad me render ho), to refreshLocation() pehli line par
 * hi return kar jata tha — is liye refresh button bilkul kaam nahi
 * karta tha aur location permission bhi kabhi nahi mangta tha.
 */
function getLocRefreshBtn() {
    return document.getElementById("locationRefreshButton") ||
           document.getElementById("locationRefreshBtn") ||
           document.querySelector(".location-refresh-btn") ||
           locRefreshBtn;
}

// ======================================
// LOCATION DISPLAY HELPERS
// ======================================

function setLocationText(text) {
    if (locationNameText) {
        locationNameText.innerHTML = text;
    } else if (locationName) {
        locationName.innerHTML = text;
    }
}

function getLocationText() {
    if (locationNameText) {
        return locationNameText.innerText.trim();
    }

    if (locationName) {
        return locationName.innerText
            .replace("📍 ", "")
            .trim();
    }

    return "";
}

/*
 * Location name ko clean karta hai.
 *
 * Adilpur, Ghotki       -> Adilpur
 * Adilpur - Ghotki      -> Adilpur
 * Adilpur Ghotki        -> Adilpur
 * Ghotki                -> Ghotki
 */
function normalizeLocationName(name) {

    if (!name) {
        return "";
    }

    let clean = String(name)
        .replace(/📍/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const lower = clean.toLowerCase();

    // Adilpur ko hamesha sirf Adilpur show karo
    if (lower.includes("adilpur")) {
        return "Adilpur";
    }

    // Ghotki ko Ghotki show karo
    if (
        lower === "ghotki" ||
        lower.includes("ghotki city") ||
        lower.includes("ghotki district")
    ) {
        return "Ghotki";
    }

    // Comma ke baad parent location hatao
    if (clean.includes(",")) {
        clean = clean.split(",")[0].trim();
    }

    return clean || "";
}

function saveLocationName(name) {

    const cleanName = normalizeLocationName(name);

    if (!cleanName) {
        return;
    }

    localStorage.setItem(
        "userLocationName",
        cleanName
    );

    setLocationText("📍 " + cleanName);

    const weatherCity = document.getElementById("weatherCity");

    if (weatherCity) {
        weatherCity.innerText = cleanName;
    }
}

// ======================================
// CAPACITOR NATIVE NOTIFICATIONS
// ======================================

let LocalNotifications = null;
let nativeNotificationsReady = false;

const PRAYER_ID_MAP = {
    Fajr: 1001,
    Dhuhr: 1002,
    Asr: 1003,
    Maghrib: 1004,
    Isha: 1005
};

// ======================================
// ✅ NEW — CAPACITOR NATIVE GEOLOCATION
// ======================================

let NativeGeolocation = null;
let nativeGeoReady = false;

function isNativeApp() {

    return (
        typeof window.Capacitor !== "undefined" &&
        window.Capacitor.isNativePlatform &&
        window.Capacitor.isNativePlatform()
    );
}

/*
 * App (Capacitor) me hamesha allowed hai.
 * Browser me sirf https / localhost par location milti hai.
 */
function isGeoAllowed() {

    if (isNativeApp()) {
        return true;
    }

    if (window.isSecureContext) {
        return true;
    }

    const host = location.hostname;

    return (
        host === "localhost" ||
        host === "127.0.0.1" ||
        host === ""
    );
}

async function initNativeGeolocation() {

    try {

        if (!isNativeApp()) {

            console.log("🌐 Browser geolocation mode");

            nativeGeoReady = false;

            return false;
        }

        if (
            !window.Capacitor.Plugins ||
            !window.Capacitor.Plugins.Geolocation
        ) {

            console.warn(
                "⚠️ Geolocation plugin not found — browser fallback use hoga"
            );

            nativeGeoReady = false;

            return false;
        }

        NativeGeolocation =
            window.Capacitor.Plugins.Geolocation;

        let permission =
            await NativeGeolocation.checkPermissions();

        if (permission.location !== "granted") {

            permission =
                await NativeGeolocation.requestPermissions();
        }

        if (permission.location !== "granted") {

            console.log("❌ Location permission denied");

            nativeGeoReady = false;

            return false;
        }

        nativeGeoReady = true;

        console.log("✅ Native geolocation ready");

        return true;

    } catch (error) {

        console.error(
            "❌ Native geolocation init error:",
            error
        );

        nativeGeoReady = false;

        return false;
    }
}

async function initNativeNotifications() {

    try {

        if (!isNativeApp()) {
            console.log("🌐 Browser mode");
            return false;
        }

        if (
            !window.Capacitor.Plugins ||
            !window.Capacitor.Plugins.LocalNotifications
        ) {
            console.error("❌ LocalNotifications plugin not found");
            return false;
        }

        LocalNotifications =
            window.Capacitor.Plugins.LocalNotifications;

        let permission =
            await LocalNotifications.checkPermissions();

        if (permission.display !== "granted") {
            permission =
                await LocalNotifications.requestPermissions();
        }

        if (permission.display !== "granted") {

            console.log(
                "❌ Notification permission denied"
            );

            nativeNotificationsReady = false;

            return false;
        }

        try {

            await LocalNotifications.createChannel({

                id: "azan_channel",

                name: "Prayer Alarms",

                description:
                    "Prayer time alarms and notifications",

                sound: "azan.mp3",

                importance: 5,

                visibility: 1,

                vibration: true
            });

        } catch (channelError) {

            console.log(
                "Channel already exists or channel error:",
                channelError
            );
        }

        nativeNotificationsReady = true;

        console.log(
            "✅ Native notifications ready"
        );

        return true;

    } catch (error) {

        console.error(
            "❌ Native notification initialization error:",
            error
        );

        nativeNotificationsReady = false;

        return false;
    }
}

// ======================================
// SCHEDULE PRAYER ALARM
// ======================================

async function scheduleNativeAlarm(
    prayer,
    hour,
    minute
) {
    if (
        !nativeNotificationsReady ||
        !LocalNotifications
    ) {
        console.log(
            "❌ Native notifications not ready"
        );
        return false;
    }

    const id = PRAYER_ID_MAP[prayer];

    if (!id) {
        console.log(
            "❌ Invalid prayer:",
            prayer
        );
        return false;
    }

    try {
        // Check Android Exact Alarm permission
        try {
            const exactSetting =
                await LocalNotifications.checkExactNotificationSetting();

            console.log(
                "⏰ Exact alarm permission:",
                exactSetting
            );

            if (
                exactSetting.exact_alarm !== "granted"
            ) {
                console.error(
                    "❌ Exact alarm permission is not granted"
                );

                showToast(
                    "⚠️ Exact alarm permission required"
                );

                return false;
            }
        } catch (exactError) {
            console.log(
                "Exact alarm setting check skipped:",
                exactError
            );
        }

        // Cancel old alarm first
        try {
            await LocalNotifications.cancel({
                notifications: [
                    { id: id }
                ]
            });
        } catch (cancelError) {
            console.log(
                "Old alarm cancel skipped"
            );
        }

        // Schedule EXACT alarm
        const result =
            await LocalNotifications.schedule({
                notifications: [
                    {
                        id: id,

                        title:
                            `🕌 ${prayer} نماز کا وقت`,

                        body:
                            "اذان ہو رہی ہے! نماز پڑھیں۔",

                        channelId:
                            "azan_channel",

                        // IMPORTANT:
                        // Force exact Android alarm
                        isExactNotification: true,

                        // Do NOT allow fallback
                        // to an inexact alarm
                        isExactMandatory: true,

                        schedule: {
                            on: {
                                hour: hour,
                                minute: minute
                            },

                            allowWhileIdle: true
                        },

                        autoCancel: true,
                        ongoing: false
                    }
                ]
            });

        console.log(
            `✅ EXACT ${prayer} alarm scheduled at ` +
            `${String(hour).padStart(2, "0")}:` +
            `${String(minute).padStart(2, "0")}`
        );

        console.log(
            "📌 Native schedule result:",
            result
        );

        if (result && result.warning) {
            console.error(
                "⚠️ Exact alarm warning:",
                result.warning
            );

            return false;
        }

        return true;

    } catch (error) {
        console.error(
            `❌ ${prayer} EXACT alarm schedule error:`,
            error
        );

        return false;
    }
}

// ======================================
// CANCEL PRAYER ALARM
// ======================================

async function cancelNativeAlarm(prayer) {

    if (!LocalNotifications) {
        return;
    }

    const id = PRAYER_ID_MAP[prayer];

    if (!id) {
        return;
    }

    try {

        await LocalNotifications.cancel({

            notifications: [
                {
                    id: id
                }
            ]

        });

        console.log(
            `🔕 Alarm cancelled: ${prayer}`
        );

    } catch (error) {

        console.log(
            `Cancel alarm error for ${prayer}:`,
            error
        );
    }
}

// ======================================
// AZAN AUDIO
// ======================================

let azanAudio = null;
let isAzanPlaying = false;

function playAzan() {

    try {

        if (azanAudio) {

            azanAudio.pause();

            azanAudio.currentTime = 0;
        }

        azanAudio =
            new Audio("audio/azan.mp3");

        azanAudio.volume = 0.8;

        azanAudio.loop = false;

        azanAudio
            .play()
            .then(() => {

                isAzanPlaying = true;

            })
            .catch((error) => {

                console.log(
                    "Azan play error:",
                    error
                );

            });

        azanAudio.onended = function () {

            isAzanPlaying = false;

        };

    } catch (error) {

        console.log(
            "Azan error:",
            error
        );
    }
}

function stopAzan() {

    if (azanAudio) {

        azanAudio.pause();

        azanAudio.currentTime = 0;

        isAzanPlaying = false;
    }
}

// ======================================
// MORE MENU
// ======================================

const moreNavBtn =
    document.getElementById("moreNavBtn");

const moreMenu =
    document.getElementById("moreMenu");

const closeMoreMenuBtn =
    document.getElementById("closeMoreMenuBtn");

const settingsBtn =
    document.getElementById("settingsBtn");

// ======================================
// ALARM SYSTEM
// ======================================

let alarms =
    JSON.parse(
        localStorage.getItem("prayerAlarms")
    ) || {};

let alarmFired =
    JSON.parse(
        localStorage.getItem("alarmFired")
    ) || {};

function initAlarms() {

    document
        .querySelectorAll(".alarm-btn")
        .forEach(btn => {

            const prayer =
                btn.dataset.prayer;

            const isActive =
                alarms[prayer] === true;

            btn.classList.toggle(
                "active",
                isActive
            );

            btn.innerHTML =
                isActive
                    ? '<i class="fa-solid fa-bell"></i>'
                    : '<i class="fa-regular fa-bell"></i>';

        });
}

async function toggleAlarm(prayer) {

    alarms[prayer] =
        !alarms[prayer];

    localStorage.setItem(
        "prayerAlarms",
        JSON.stringify(alarms)
    );

    initAlarms();

    if (alarms[prayer]) {

        const time =
            jamaatTimes[prayer];

        if (time) {

            const parts =
                time.split(":");

            const hour =
                parseInt(parts[0]);

            const minute =
                parseInt(parts[1]);

            const ok =
                await scheduleNativeAlarm(
                    prayer,
                    hour,
                    minute
                );

            if (ok) {

                showToast(
                    `🔔 ${prayer} alarm set — app band ho tab bhi bajegi`
                );

            } else {

                showToast(
                    `🔔 ${prayer} alarm on (app open rakhna hoga)`
                );
            }

        } else {

            showToast(
                "⚠️ Pehle Jamaat time set karein"
            );

            alarms[prayer] = false;

            localStorage.setItem(
                "prayerAlarms",
                JSON.stringify(alarms)
            );

            initAlarms();
        }

    } else {

        await cancelNativeAlarm(prayer);

        stopAzan();

        showToast(
            `🔕 ${prayer} alarm off`
        );
    }
}

// ======================================
// IN-APP ALARM FALLBACK
// ======================================

function checkAlarms() {

    const now = new Date();

    const today =
        now.toISOString()
            .split("T")[0];

    if (alarmFired.date !== today) {

        alarmFired = {
            date: today
        };

        localStorage.setItem(
            "alarmFired",
            JSON.stringify(alarmFired)
        );
    }

    const prayers = [
        "Fajr",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha"
    ];

    prayers.forEach(prayer => {

        if (alarms[prayer] !== true) {
            return;
        }

        let timeStr =
            jamaatTimes[prayer];

        if (!timeStr) {
            return;
        }

        const parts =
            timeStr.split(":");

        if (parts.length < 2) {
            return;
        }

        let hours =
            parseInt(parts[0]);

        let minutes =
            parseInt(parts[1]);

        if (
            timeStr
                .toLowerCase()
                .includes("pm") &&
            hours < 12
        ) {
            hours += 12;
        }

        if (
            timeStr
                .toLowerCase()
                .includes("am") &&
            hours === 12
        ) {
            hours = 0;
        }

        const prayerTime =
            new Date();

        prayerTime.setHours(
            hours,
            minutes,
            0,
            0
        );

        if (prayerTime <= now) {
            return;
        }

        const key =
            prayer + "_" + today;

        if (alarmFired[key]) {
            return;
        }

        const diffMs =
            prayerTime - now;

        if (diffMs <= 60000) {

            playAzan();

            alarmFired[key] = true;

            localStorage.setItem(
                "alarmFired",
                JSON.stringify(alarmFired)
            );
        }

    });
}

// ======================================
// WEATHER SYSTEM
// ======================================

function fetchWeatherByCoords(
    lat,
    lon
) {

    const cityName =
        normalizeLocationName(
            getLocationText()
        );

    const weatherCity =
        document.getElementById(
            "weatherCity"
        );

    if (weatherCity) {

        weatherCity.innerText =
            cityName || "Loading...";
    }

    fetch(
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${lat}&longitude=${lon}` +
        `&current_weather=true&timezone=auto`
    )

        .then(res => res.json())

        .then(data => {

            renderWeather(data);

        })

        .catch(() => {

            const desc =
                document.getElementById(
                    "weatherDesc"
                );

            if (desc) {
                desc.innerText =
                    "Weather unavailable";
            }

        });
}

function renderWeather(data) {

    if (!data || !data.current_weather) {
        return;
    }

    const current =
        data.current_weather;

    const temp =
        Math.round(current.temperature);

    const weatherCode =
        current.weathercode;

    const windSpeed =
        Math.round(current.windspeed);

    const weatherMap = {

        0: {
            icon: "☀️",
            desc: "Clear Sky"
        },

        1: {
            icon: "🌤️",
            desc: "Mainly Clear"
        },

        2: {
            icon: "⛅",
            desc: "Partly Cloudy"
        },

        3: {
            icon: "☁️",
            desc: "Overcast"
        },

        45: {
            icon: "🌫️",
            desc: "Fog"
        },

        48: {
            icon: "🌫️",
            desc: "Rime Fog"
        },

        51: {
            icon: "🌦️",
            desc: "Light Drizzle"
        },

        53: {
            icon: "🌧️",
            desc: "Moderate Drizzle"
        },

        55: {
            icon: "🌧️",
            desc: "Dense Drizzle"
        },

        61: {
            icon: "🌧️",
            desc: "Slight Rain"
        },

        63: {
            icon: "🌧️",
            desc: "Moderate Rain"
        },

        65: {
            icon: "🌧️",
            desc: "Heavy Rain"
        },

        71: {
            icon: "🌨️",
            desc: "Slight Snow"
        },

        73: {
            icon: "🌨️",
            desc: "Moderate Snow"
        },

        75: {
            icon: "❄️",
            desc: "Heavy Snow"
        },

        80: {
            icon: "🌧️",
            desc: "Rain Showers"
        },

        81: {
            icon: "🌧️",
            desc: "Moderate Rain Showers"
        },

        82: {
            icon: "⛈️",
            desc: "Heavy Rain Showers"
        },

        95: {
            icon: "⛈️",
            desc: "Thunderstorm"
        },

        96: {
            icon: "⛈️",
            desc: "Thunderstorm + Hail"
        },

        99: {
            icon: "⛈️",
            desc: "Heavy Thunderstorm"
        }

    };

    const weather =
        weatherMap[weatherCode] || {
            icon: "🌡️",
            desc: "Unknown"
        };

    const icon =
        document.getElementById(
            "weatherIcon"
        );

    const tempEl =
        document.getElementById(
            "weatherTemp"
        );

    const desc =
        document.getElementById(
            "weatherDesc"
        );

    const wind =
        document.getElementById(
            "weatherWind"
        );

    if (icon) {
        icon.textContent =
            weather.icon;
    }

    if (tempEl) {
        tempEl.innerHTML =
            `${temp}<small>°C</small>`;
    }

    if (desc) {
        desc.textContent =
            weather.desc;
    }

    if (wind) {
        wind.textContent =
            windSpeed;
    }
}

// ======================================
// LOCATION + PRAYER CACHE
// ======================================

function saveLocationAndCache(
    lat,
    lon,
    name,
    times,
    hijriStr
) {

    try {

        localStorage.setItem(
            "userLatitude",
            String(lat)
        );

        localStorage.setItem(
            "userLongitude",
            String(lon)
        );

        const cleanName =
            normalizeLocationName(name);

        if (cleanName) {

            localStorage.setItem(
                "userLocationName",
                cleanName
            );
        }

        localStorage.setItem(
            "lastGpsUpdate",
            String(Date.now())
        );

        if (times) {

            localStorage.setItem(
                "cachedPrayerTimes",
                JSON.stringify({

                    times: times,

                    hijri:
                        hijriStr || "",

                    lat: lat,

                    lon: lon,

                    date:
                        new Date()
                            .toISOString()
                            .split("T")[0]

                })
            );
        }

    } catch (e) {

        console.warn(
            "Cache save error:",
            e
        );
    }
}

// ======================================
// LOAD CACHE
// ======================================

function loadCachedData() {

    let hasData = false;

    const savedName =
        localStorage.getItem(
            "userLocationName"
        );

    if (savedName) {

        const cleanName =
            normalizeLocationName(
                savedName
            );

        if (cleanName) {

            setLocationText(
                "📍 " + cleanName
            );

            const weatherCity =
                document.getElementById(
                    "weatherCity"
                );

            if (weatherCity) {
                weatherCity.innerText =
                    cleanName;
            }

            hasData = true;
        }
    }

    const cached =
        localStorage.getItem(
            "cachedPrayerTimes"
        );

    if (cached) {

        try {

            const data =
                JSON.parse(cached);

            if (
                data.times &&
                Object.keys(data.times)
                    .length > 0
            ) {

                prayerTimes =
                    data.times;

                if (
                    data.hijri &&
                    islamicDate
                ) {

                    islamicDate.innerHTML =
                        data.hijri;
                }

                showPrayerTimes();

                calculateNextPrayer();

                hasData = true;
            }

        } catch (e) {

            console.warn(
                "Cached prayer data error:",
                e
            );
        }
    }

    return hasData;
}

// ======================================
// DETECT LOCATION
// ======================================

function detectLocation() {

    const lat =
        localStorage.getItem(
            "userLatitude"
        );

    const lon =
        localStorage.getItem(
            "userLongitude"
        );

    if (lat && lon) {

        loadCachedData();

        /*
         * Cached coordinates sirf prayer calculation
         * ke liye temporarily use honge.
         *
         * Location name ko fresh GPS se update karna
         * important hai.
         */
        getPrayerTimes(
            parseFloat(lat),
            parseFloat(lon),
            true
        );

        const lastGps =
            localStorage.getItem(
                "lastGpsUpdate"
            );

        const hoursSince =
            lastGps
                ? (
                    Date.now() -
                    parseInt(lastGps)
                  ) / 3600000
                : 999;

        if (hoursSince > 24) {

            requestFreshGPS(true);
        }

        return;
    }

    requestFreshGPS(false);
}

// ======================================
// FRESH GPS
// ======================================

/*
 * ✅ FIX 1: App (Capacitor) me native Geolocation plugin use hota hai,
 *           jis se permission dialog sahi tarah aata hai.
 *
 * ✅ FIX 2: Accuracy check — agar location 3km se zyada khraab ho to
 *           wo asli GPS nahi, balke Wi-Fi/mobile-tower ka andaaza hota
 *           hai. Yehi cheez "Drago" jaise ghalat naam dikha rahi thi.
 *           Ab pehle dobara koshish hoti hai, phir bhi na mile to
 *           purani saved (sahi) location use hoti hai.
 *
 * ✅ FIX 3: onDone callback — taake refresh button ka spinner theek
 *           waqt par rukay, 3 second ke andaazay par nahi.
 */
async function requestFreshGPS(silent, onDone, isRetry) {

    function done() {

        if (typeof onDone === "function") {
            onDone();
        }
    }

    function useSavedOrDefault(message) {

        if (silent) {
            done();
            return;
        }

        if (message) {
            showToast(message);
        }

        const savedName =
            localStorage.getItem(
                "userLocationName"
            );

        const savedLat =
            localStorage.getItem(
                "userLatitude"
            );

        const savedLon =
            localStorage.getItem(
                "userLongitude"
            );

        if (savedLat && savedLon) {

            setLocationText(
                "📍 " +
                normalizeLocationName(
                    savedName || "Adilpur"
                )
            );

            getPrayerTimes(
                parseFloat(savedLat),
                parseFloat(savedLon),
                true
            );

        } else {

            setLocationText("📍 Adilpur");

            getPrayerTimes(
                28.0065,
                69.3167,
                false
            );
        }

        done();
    }

    function handlePosition(lat, lon, accuracy) {

        const acc = accuracy || 0;

        console.log(
            "✅ GPS:",
            lat,
            lon,
            "accuracy:",
            acc + "m"
        );

        // ✅ Kharab accuracy = Wi-Fi/tower ka andaaza, asli GPS nahi
        if (acc > 3000) {

            if (!isRetry) {

                console.log(
                    "⚠️ Weak accuracy — retrying for real GPS..."
                );

                setTimeout(function () {

                    requestFreshGPS(
                        silent,
                        onDone,
                        true
                    );

                }, 2500);

                return;
            }

            const savedLat =
                localStorage.getItem(
                    "userLatitude"
                );

            const savedLon =
                localStorage.getItem(
                    "userLongitude"
                );

            if (savedLat && savedLon) {

                useSavedOrDefault(
                    "⚠️ Sahi GPS nahi mila — purani location use kar rahe hain. Khuli jagah par GPS on karke try karein"
                );

                return;
            }
        }

        getPrayerTimes(lat, lon, false);

        done();
    }

    // ======================================
    // NATIVE (APP) GEOLOCATION
    // ======================================

    if (isNativeApp()) {

        if (!nativeGeoReady) {

            await initNativeGeolocation();
        }

        if (nativeGeoReady && NativeGeolocation) {

            try {

                const position =
                    await NativeGeolocation.getCurrentPosition({

                        enableHighAccuracy: true,

                        timeout: 20000,

                        maximumAge: 0

                    });

                handlePosition(
                    position.coords.latitude,
                    position.coords.longitude,
                    position.coords.accuracy
                );

                return;

            } catch (error) {

                console.warn(
                    "❌ Native GPS error:",
                    error
                );

                useSavedOrDefault(
                    "⚠️ Location nahi mili — phone ki GPS/Location on karein"
                );

                return;
            }
        }

        // Plugin available nahi — neeche browser fallback chalega
    }

    // ======================================
    // BROWSER GEOLOCATION FALLBACK
    // ======================================

    if (!navigator.geolocation || !isGeoAllowed()) {

        useSavedOrDefault(
            "⚠️ Is browser me location available nahi hai"
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(

        position => {

            handlePosition(
                position.coords.latitude,
                position.coords.longitude,
                position.coords.accuracy
            );
        },

        error => {

            console.warn(
                "❌ GPS error:",
                error.code,
                error.message
            );

            let message = "";

            if (error.code === 1) {

                message =
                    "⚠️ Location permission denied — settings me allow karein";

            } else if (error.code === 3) {

                message =
                    "⚠️ Location timeout — GPS on karke dobara try karein";

            } else {

                message =
                    "⚠️ Location nahi mili — saved location use kar rahe hain";
            }

            useSavedOrDefault(message);
        },

        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 20000
        }
    );
}

// ======================================
// LOCATION REFRESH
// ======================================

/*
 * ✅ FIX: Pehle yahan "if (!locRefreshBtn) return;" tha — agar button
 * ka reference null hota to function pehli line par hi ruk jata aur
 * GPS bilkul nahi mangta tha. Ab button sirf spinner ke liye hai,
 * location request hamesha chalti hai.
 */
function refreshLocation() {

    const btn = getLocRefreshBtn();

    if (btn) {

        btn.classList.add("spinning");
    }

    function stopSpin() {

        const b = getLocRefreshBtn();

        if (b) {
            b.classList.remove("spinning");
        }
    }

    if (!isGeoAllowed()) {

        stopSpin();

        showToast(
            "⚠️ Location ke liye HTTPS chahiye — app me ye kaam karega"
        );

        return;
    }

    showToast(
        "📍 Getting fresh location..."
    );

    requestFreshGPS(false, stopSpin);

    // Safety: agar kisi wajah se callback na aaye
    setTimeout(stopSpin, 25000);
}

// ======================================
// MAIN
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await initNativeNotifications();

        // ✅ NEW: app khulte hi location permission maang lo
        await initNativeGeolocation();

        updateClock();

        setInterval(
            updateClock,
            1000
        );

        loadTodayDate();

        loadSavedJamaat();

        loadCachedData();

        detectLocation();

        initAlarms();

        setInterval(
            checkAlarms,
            10000
        );

        if (nativeNotificationsReady) {

            for (
                const prayer of [
                    "Fajr",
                    "Dhuhr",
                    "Asr",
                    "Maghrib",
                    "Isha"
                ]
            ) {

                if (
                    alarms[prayer] === true &&
                    jamaatTimes[prayer]
                ) {

                    const parts =
                        jamaatTimes[
                            prayer
                        ].split(":");

                    await scheduleNativeAlarm(
                        prayer,
                        parseInt(parts[0]),
                        parseInt(parts[1])
                    );
                }
            }
        }

        setInterval(() => {

            const lat =
                localStorage.getItem(
                    "userLatitude"
                );

            const lon =
                localStorage.getItem(
                    "userLongitude"
                );

            if (lat && lon) {

                fetchWeatherByCoords(
                    parseFloat(lat),
                    parseFloat(lon)
                );
            }

        }, 600000);

        if (
            moreNavBtn &&
            moreMenu &&
            closeMoreMenuBtn
        ) {

            moreNavBtn.addEventListener(
                "click",
                function(e) {

                    e.stopPropagation();

                    moreMenu.classList.add(
                        "show"
                    );
                }
            );

            closeMoreMenuBtn.addEventListener(
                "click",
                function(e) {

                    e.stopPropagation();

                    moreMenu.classList.remove(
                        "show"
                    );
                }
            );

            document.addEventListener(
                "click",
                function(e) {

                    if (
                        moreMenu.classList.contains(
                            "show"
                        ) &&
                        !moreMenu.contains(
                            e.target
                        ) &&
                        !moreNavBtn.contains(
                            e.target
                        )
                    ) {

                        moreMenu.classList.remove(
                            "show"
                        );
                    }
                }
            );

            if (settingsBtn) {

                settingsBtn.addEventListener(
                    "click",
                    function(e) {

                        e.stopPropagation();

                        moreMenu.classList.remove(
                            "show"
                        );

                        alert(
                            "Settings will be available in the next update."
                        );
                    }
                );
            }
        }

        // ✅ FIX: button ko yahan fresh dhoondo (DOM ready ke baad)
        const refreshBtnEl = getLocRefreshBtn();

        if (refreshBtnEl) {

            refreshBtnEl.addEventListener(
                "click",
                function(e) {

                    e.stopPropagation();

                    refreshLocation();
                }
            );

        } else {

            console.warn(
                "⚠️ Location refresh button not found in DOM"
            );
        }

        initAutoTheme();

        fetchDailyAyah();

        const refreshAyahBtn =
            document.getElementById(
                "refreshAyahBtn"
            );

        if (refreshAyahBtn) {

            refreshAyahBtn.addEventListener(
                "click",
                fetchDailyAyah
            );
        }

        setInterval(
            fetchDailyAyah,
            86400000
        );

        fetchDailyHadith();

        const refreshHadithBtn =
            document.getElementById(
                "refreshHadithBtn"
            );

        if (refreshHadithBtn) {

            refreshHadithBtn.addEventListener(
                "click",
                refreshHadith
            );
        }

    }
);

// ======================================
// CLOCK
// ======================================

function updateClock() {

    const now =
        new Date();

    let hours =
        now.getHours();

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");

    const ampm =
        hours >= 12
            ? "PM"
            : "AM";

    hours =
        hours % 12;

    if (hours === 0) {
        hours = 12;
    }

    const timeStr =
        String(hours).padStart(2, "0") +
        ":" +
        minutes +
        ":" +
        seconds;

    if (liveTimeDisplay) {

        liveTimeDisplay.textContent =
            timeStr;
    }

    const ampmText =
        document.querySelector(
            ".ampm-text"
        );

    if (ampmText) {

        ampmText.textContent =
            ampm;
    }
}

// ======================================
// DATE
// ======================================

function loadTodayDate() {

    const today =
        new Date();

    if (date) {

        date.innerHTML =
            today.toLocaleDateString(
                "en-GB",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );
    }

    if (islamicDate) {

        islamicDate.innerHTML =
            "Loading Islamic Date...";
    }
}

// ======================================
// GET PRAYER TIMES
// ======================================

async function getPrayerTimes(
    latitude,
    longitude,
    isBackgroundUpdate
) {

    try {

        const response =
            await fetch(
                `https://api.aladhan.com/v1/timings?` +
                `latitude=${latitude}` +
                `&longitude=${longitude}` +
                `&method=2`
            );

        const result =
            await response.json();

        prayerTimes =
            result.data.timings;

        localStorage.setItem(
            "userLatitude",
            String(latitude)
        );

        localStorage.setItem(
            "userLongitude",
            String(longitude)
        );

        localStorage.setItem(
            "lastGpsUpdate",
            String(Date.now())
        );

        // ==================================
        // SMART LOCATION DETECTION
        // ==================================

        try {

            const locRes =
                await fetch(
                    `https://nominatim.openstreetmap.org/reverse?` +
                    `format=jsonv2` +
                    `&lat=${latitude}` +
                    `&lon=${longitude}` +
                    `&zoom=18` +
                    `&addressdetails=1`
                );

            const locData =
                await locRes.json();

            const address =
                locData.address || {};

            const fullDisplayName =
                locData.display_name || "";

            /*
             * Saare address fields ko ek string me
             * combine karo, taake Adilpur kahin bhi
             * chhupa ho to mil jaye.
             */
            const allNames = [
                address.village,
                address.hamlet,
                address.suburb,
                address.neighbourhood,
                address.quarter,
                address.town,
                address.city_district,
                address.city,
                address.municipality,
                address.county,
                address.state_district,
                fullDisplayName
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            let detectedName = "";

            /* ---------------------------------
               PRIORITY 1: ADILPUR
               Agar kahin bhi "adilpur" mile to
               seedha Adilpur he show karo.
            --------------------------------- */
            if (allNames.includes("adilpur")) {

                detectedName = "Adilpur";
            }

            /* ---------------------------------
               PRIORITY 2: SMALLEST LOCAL NAME
               Ghotki district se pehle kisi bhi
               chhote local naam ko prefer karo.
            --------------------------------- */
            else if (address.village) {
                detectedName = address.village;
            }
            else if (address.hamlet) {
                detectedName = address.hamlet;
            }
            else if (address.suburb) {
                detectedName = address.suburb;
            }
            else if (address.neighbourhood) {
                detectedName = address.neighbourhood;
            }
            else if (address.quarter) {
                detectedName = address.quarter;
            }
            else if (address.town) {
                detectedName = address.town;
            }

            /* ---------------------------------
               PRIORITY 3: GHOTKI
               Sirf tab jab Adilpur na mila ho
               aur koi chhota local naam bhi na ho.
            --------------------------------- */
            else if (allNames.includes("ghotki")) {
                detectedName = "Ghotki";
            }

            /* ---------------------------------
               PRIORITY 4: PURANA SAVED NAME
               Agar reverse geocoding se koi
               acha naam na mile, to pehle se
               saved naam ko rakho.
            --------------------------------- */
            else {

                const savedName =
                    localStorage.getItem(
                        "userLocationName"
                    );

                detectedName =
                    savedName || "Adilpur";
            }

            const cleanName =
                normalizeLocationName(
                    detectedName
                );

            if (cleanName) {

                saveLocationName(
                    cleanName
                );

                console.log(
                    "✅ Location name set:",
                    cleanName
                );

            } else {

                const savedName =
                    localStorage.getItem(
                        "userLocationName"
                    );

                const fallbackName =
                    normalizeLocationName(
                        savedName || "Adilpur"
                    );

                saveLocationName(
                    fallbackName
                );
            }

        } catch (error) {

            console.warn(
                "Nominatim reverse geocode failed:",
                error
            );

            const savedName =
                localStorage.getItem(
                    "userLocationName"
                );

            const fallbackName =
                normalizeLocationName(
                    savedName || "Adilpur"
                );

            saveLocationName(
                fallbackName
            );
        }

        // ==================================
        // MAGHRIB JAMAAT
        // ==================================

        if (
            result.data.timings &&
            result.data.timings.Maghrib
        ) {

            localStorage.setItem(
                "liveMaghribAzan",
                result.data.timings.Maghrib
            );

            const parts =
                result.data.timings.Maghrib
                    .split(":");

            let hours =
                parseInt(parts[0]);

            let minutes =
                parseInt(parts[1]);

            minutes += 3;

            if (minutes >= 60) {

                minutes -= 60;

                hours += 1;
            }

            if (hours >= 24) {
                hours = 0;
            }

            const autoMaghribJamaat =
                String(hours)
                    .padStart(2, "0") +
                ":" +
                String(minutes)
                    .padStart(2, "0");

            jamaatTimes["Maghrib"] =
                autoMaghribJamaat;

            localStorage.setItem(
                "jamaatTimes",
                JSON.stringify(
                    jamaatTimes
                )
            );

            updateJamaatUI();

            if (
                alarms["Maghrib"] === true &&
                nativeNotificationsReady
            ) {

                await scheduleNativeAlarm(
                    "Maghrib",
                    hours,
                    minutes
                );
            }
        }

        // ==================================
        // HIJRI DATE
        // ==================================

        const hijriStr =
            result.data.date.hijri.weekday.en +
            ", " +
            result.data.date.hijri.day +
            " " +
            result.data.date.hijri.month.en +
            " " +
            result.data.date.hijri.year +
            " AH";

        if (islamicDate) {

            islamicDate.innerHTML =
                hijriStr;
        }

        showPrayerTimes();

        calculateNextPrayer();

        fetchWeatherByCoords(
            latitude,
            longitude
        );

        saveLocationAndCache(
            latitude,
            longitude,
            localStorage.getItem(
                "userLocationName"
            ),
            prayerTimes,
            hijriStr
        );

    } catch (error) {

        console.error(
            "Prayer Times Error:",
            error
        );

        if (!isBackgroundUpdate) {

            loadCachedData();

            if (
                Object.keys(prayerTimes)
                    .length === 0
            ) {

                showToast(
                    "⚠️ Internet nahi hai — saved data use kar rahe hain"
                );
            }
        }
    }
}

// ======================================
// SHOW PRAYER TIMES
// ======================================

function showPrayerTimes() {

    function formatPrayerTime(time) {

        if (!time) {
            return "--:--";
        }

        const parts =
            time.split(":");

        let hours =
            parseInt(parts[0]);

        const minutes =
            parts[1];

        const ampm =
            hours >= 12
                ? "PM"
                : "AM";

        hours =
            hours % 12;

        if (hours === 0) {
            hours = 12;
        }

        return (
            String(hours).padStart(2, "0") +
            ":" +
            minutes +
            " " +
            ampm
        );
    }

    const fajr =
        document.getElementById(
            "fajr"
        );

    const dhuhr =
        document.getElementById(
            "dhuhr"
        );

    const asr =
        document.getElementById(
            "asr"
        );

    const maghrib =
        document.getElementById(
            "maghrib"
        );

    const isha =
        document.getElementById(
            "isha"
        );

    if (fajr) {
        fajr.innerHTML =
            formatPrayerTime(
                prayerTimes.Fajr
            );
    }

    if (dhuhr) {
        dhuhr.innerHTML =
            formatPrayerTime(
                prayerTimes.Dhuhr
            );
    }

    if (asr) {
        asr.innerHTML =
            formatPrayerTime(
                prayerTimes.Asr
            );
    }

    if (maghrib) {
        maghrib.innerHTML =
            formatPrayerTime(
                prayerTimes.Maghrib
            );
    }

    if (isha) {
        isha.innerHTML =
            formatPrayerTime(
                prayerTimes.Isha
            );
    }

    if (prayerTimes.Maghrib) {

        localStorage.setItem(
            "liveMaghribAzan",
            prayerTimes.Maghrib
        );
    }
}

// ======================================
// NEXT PRAYER
// ======================================

function calculateNextPrayer() {

    const prayers = [

        {
            name: "Fajr",
            time: prayerTimes.Fajr
        },

        {
            name: "Dhuhr",
            time: prayerTimes.Dhuhr
        },

        {
            name: "Asr",
            time: prayerTimes.Asr
        },

        {
            name: "Maghrib",
            time: prayerTimes.Maghrib
        },

        {
            name: "Isha",
            time: prayerTimes.Isha
        }

    ];

    const now =
        new Date();

    let next = null;

    for (
        const prayer of prayers
    ) {

        if (!prayer.time) {
            continue;
        }

        const parts =
            prayer.time.split(":");

        const prayerDate =
            new Date();

        prayerDate.setHours(
            parseInt(parts[0]),
            parseInt(parts[1]),
            0,
            0
        );

        if (prayerDate > now) {

            next = {

                name:
                    prayer.name,

                date:
                    prayerDate,

                jamaat:
                    jamaatTimes[
                        prayer.name
                    ] || ""

            };

            break;
        }
    }

    if (
        !next &&
        prayerTimes.Fajr
    ) {

        const fajr =
            prayerTimes.Fajr
                .split(":");

        const tomorrow =
            new Date();

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        tomorrow.setHours(
            parseInt(fajr[0]),
            parseInt(fajr[1]),
            0,
            0
        );

        next = {

            name: "Fajr",

            date: tomorrow,

            jamaat:
                jamaatTimes["Fajr"] ||
                ""

        };
    }

    if (!next) {
        return;
    }

    currentPrayer =
        next.name;

    const nextPrayerName =
        document.getElementById(
            "nextPrayerName"
        );

    if (nextPrayerName) {

        nextPrayerName.innerHTML =
            currentPrayer;
    }

    const nextPrayerJamaat =
        document.getElementById(
            "nextPrayerJamaat"
        );

    if (nextPrayerJamaat) {

        const time =
            next.jamaat;

        if (time) {

            const parts =
                time.split(":");

            let hours =
                parseInt(parts[0]);

            const minutes =
                parts[1];

            const ampm =
                hours >= 12
                    ? "PM"
                    : "AM";

            hours =
                hours % 12;

            if (hours === 0) {
                hours = 12;
            }

            nextPrayerJamaat.innerHTML =
                String(hours)
                    .padStart(2, "0") +
                ":" +
                minutes +
                " " +
                ampm;

        } else {

            nextPrayerJamaat.innerHTML =
                "--:--";
        }
    }

    startCountdown(
        next.date
    );
}

// ======================================
// COUNTDOWN
// ======================================

let countdownInterval = null;

function startCountdown(
    nextPrayerTime
) {

    if (countdownInterval) {

        clearInterval(
            countdownInterval
        );
    }

    countdownInterval =
        setInterval(() => {

            const now =
                new Date();

            const difference =
                nextPrayerTime - now;

            if (difference <= 0) {

                clearInterval(
                    countdownInterval
                );

                calculateNextPrayer();

                return;
            }

            const hours =
                Math.floor(
                    difference /
                    3600000
                );

            const minutes =
                Math.floor(
                    (
                        difference %
                        3600000
                    ) / 60000
                );

            const seconds =
                Math.floor(
                    (
                        difference %
                        60000
                    ) / 1000
                );

            if (countdown) {

                countdown.innerHTML =
                    String(hours)
                        .padStart(2, "0") +
                    ":" +
                    String(minutes)
                        .padStart(2, "0") +
                    ":" +
                    String(seconds)
                        .padStart(2, "0");
            }

        }, 1000);
}

// ======================================
// JAMAAT
// ======================================

let selectedPrayer = "";

function editJamaat(prayer) {

    selectedPrayer =
        prayer;

    const selectedPrayerEl =
        document.getElementById(
            "selectedPrayer"
        );

    const input =
        document.getElementById(
            "jamaatTimeInput"
        );

    const modal =
        document.getElementById(
            "jamaatModal"
        );

    if (selectedPrayerEl) {
        selectedPrayerEl.innerText =
            prayer;
    }

    if (input) {
        input.value =
            jamaatTimes[prayer] ||
            "";
    }

    if (modal) {
        modal.style.display =
            "flex";
    }
}

function closeJamaatModal() {

    const modal =
        document.getElementById(
            "jamaatModal"
        );

    if (modal) {
        modal.style.display =
            "none";
    }
}

async function saveJamaatTime() {

    const input =
        document.getElementById(
            "jamaatTimeInput"
        );

    if (!input) {
        return;
    }

    const time =
        input.value;

    if (time === "") {
        return;
    }

    jamaatTimes[
        selectedPrayer
    ] = time;

    localStorage.setItem(
        "jamaatTimes",
        JSON.stringify(
            jamaatTimes
        )
    );

    updateJamaatUI();

    closeJamaatModal();

    if (
        alarms[selectedPrayer] === true &&
        nativeNotificationsReady
    ) {

        const parts =
            time.split(":");

        await scheduleNativeAlarm(
            selectedPrayer,
            parseInt(parts[0]),
            parseInt(parts[1])
        );
    }

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    const key =
        selectedPrayer +
        "_" +
        today;

    if (alarmFired[key]) {

        delete alarmFired[key];

        localStorage.setItem(
            "alarmFired",
            JSON.stringify(
                alarmFired
            )
        );
    }
}

function loadSavedJamaat() {

    const saved =
        localStorage.getItem(
            "jamaatTimes"
        );

    if (saved) {

        try {

            jamaatTimes =
                JSON.parse(saved);

        } catch (e) {

            jamaatTimes = {};
        }
    }

    updateJamaatUI();
}

function updateJamaatUI() {

    [
        "Fajr",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha"
    ].forEach(prayer => {

        const element =
            document.getElementById(
                prayer.toLowerCase() +
                "Jamaat"
            );

        if (!element) {
            return;
        }

        const time =
            jamaatTimes[prayer];

        if (time) {

            const parts =
                time.split(":");

            let hours =
                parseInt(parts[0]);

            const minutes =
                parts[1];

            const ampm =
                hours >= 12
                    ? "PM"
                    : "AM";

            hours =
                hours % 12;

            if (hours === 0) {
                hours = 12;
            }

            element.innerHTML =
                String(hours)
                    .padStart(2, "0") +
                ":" +
                minutes +
                " " +
                ampm;

        } else {

            element.innerHTML =
                "--:--";
        }

    });
}

// ======================================
// TOAST
// ======================================

function showToast(msg) {

    const existing =
        document.querySelector(
            ".toast-msg"
        );

    if (existing) {
        existing.remove();
    }

    const t =
        document.createElement(
            "div"
        );

    t.className =
        "toast-msg";

    t.textContent =
        msg;

    document.body.appendChild(
        t
    );

    setTimeout(() => {

        t.remove();

    }, 3000);
}

// ======================================
// NOTIFICATION MODAL
// ======================================

const notificationBtn =
    document.getElementById(
        "notificationBtn"
    );

const notificationModal =
    document.getElementById(
        "notificationModal"
    );

const enableNotification =
    document.getElementById(
        "enableNotification"
    );

if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        () => {

            if (notificationModal) {

                notificationModal.style.display =
                    "flex";
            }
        }
    );
}

function closeNotificationModal() {

    if (notificationModal) {

        notificationModal.style.display =
            "none";
    }
}

if (enableNotification) {

    enableNotification.addEventListener(
        "click",
        async () => {

            if (nativeNotificationsReady) {

                alert(
                    "✅ Native notifications already enabled! Alarms will work even when app is closed."
                );

            } else {

                const ok =
                    await initNativeNotifications();

                if (ok) {

                    alert(
                        "✅ Notifications enabled!"
                    );

                } else {

                    alert(
                        "⚠️ Native notifications not available. Make sure you installed @capacitor/local-notifications and rebuilt the app."
                    );
                }
            }

            closeNotificationModal();
        }
    );
}

// ======================================
// MODAL CLICK
// ======================================

window.addEventListener(
    "click",
    event => {

        if (
            notificationModal &&
            event.target ===
                notificationModal
        ) {

            closeNotificationModal();
        }

        const jamaatModal =
            document.getElementById(
                "jamaatModal"
            );

        if (
            jamaatModal &&
            event.target ===
                jamaatModal
        ) {

            closeJamaatModal();
        }
    }
);

// ======================================
// NEXT PRAYER REFRESH
// ======================================

setInterval(() => {

    if (
        Object.keys(
            prayerTimes
        ).length > 0
    ) {

        calculateNextPrayer();
    }

}, 60000);

// ======================================
// THEME
// ======================================

function loadThemeOnIndex() {

    const savedTheme =
        localStorage.getItem(
            "appTheme"
        );

    if (savedTheme) {

        document.body.className =
            "theme-" +
            savedTheme;

    } else {

        document.body.className =
            "theme-gold";
    }
}

loadThemeOnIndex();

function initAutoTheme() {

    const darkModeMedia =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

    function applyTheme(e) {

        const isDark =
            e.matches;

        const savedTheme =
            localStorage.getItem(
                "appTheme"
            );

        if (savedTheme) {

            document.body.className =
                "theme-" +
                savedTheme;

            return;
        }

        document.body.className =
            isDark
                ? "theme-dark"
                : "theme-light";
    }

    applyTheme(
        darkModeMedia
    );

    darkModeMedia.addEventListener(
        "change",
        applyTheme
    );
}

// ======================================
// DAILY AYAH
// ======================================

let currentAyahData = null;

function fetchDailyAyah() {

    const arabicEl =
        document.getElementById(
            "ayahArabic"
        );

    const urduEl =
        document.getElementById(
            "ayahUrdu"
        );

    const englishEl =
        document.getElementById(
            "ayahEnglish"
        );

    if (
        !arabicEl ||
        !urduEl ||
        !englishEl
    ) {
        return;
    }

    arabicEl.textContent =
        "Loading...";

    urduEl.textContent =
        "Loading translation...";

    englishEl.textContent =
        "Loading...";

    fetch(
        "https://api.alquran.cloud/v1/ayah/random"
    )

        .then(res =>
            res.json()
        )

        .then(data => {

            if (data.code !== 200) {

                throw new Error(
                    "API error"
                );
            }

            const ayah =
                data.data;

            const surah =
                ayah.surah;

            currentAyahData = {

                arabic:
                    ayah.text,

                number:
                    ayah.numberInSurah,

                surah:
                    surah.name,

                surahNumber:
                    surah.number,

                english:
                    ayah.english ||
                    "Translation not available"
            };

            return fetch(
                `https://api.alquran.cloud/v1/ayah/` +
                `${ayah.number}/ur.jalandhry`
            );
        })

        .then(res =>
            res.json()
        )

        .then(data => {

            if (
                data.code === 200 &&
                data.data
            ) {

                currentAyahData.urdu =
                    data.data.text;

            } else {

                currentAyahData.urdu =
                    "اردو ترجمہ دستیاب نہیں";
            }

            renderAyah();

        })

        .catch(() => {

            arabicEl.textContent =
                "Unable to load Ayah. Please refresh.";

            urduEl.textContent =
                "";

            englishEl.textContent =
                "";
        });
}

function renderAyah() {

    if (!currentAyahData) {
        return;
    }

    const arabicEl =
        document.getElementById(
            "ayahArabic"
        );

    const urduEl =
        document.getElementById(
            "ayahUrdu"
        );

    const englishEl =
        document.getElementById(
            "ayahEnglish"
        );

    if (arabicEl) {

        arabicEl.textContent =
            currentAyahData.arabic;
    }

    if (urduEl) {

        urduEl.textContent =
            currentAyahData.urdu ||
            "";
    }

    if (englishEl) {

        englishEl.textContent =
            `${currentAyahData.english} — ` +
            `Surah ${currentAyahData.surah} ` +
            `(${currentAyahData.surahNumber}:` +
            `${currentAyahData.number})`;
    }
}

// ======================================
// HADITH
// ======================================

const hadiths = [

    {
        arabic:
            "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",

        urdu:
            "اعمال کا دارومدار نیتوں پر ہے، اور ہر شخص کو وہی ملتا ہے جو اس نے نیت کی۔",

        ref:
            "Sahih Bukhari & Muslim"
    },

    {
        arabic:
            "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",

        urdu:
            "جو اللہ اور آخرت پر ایمان رکھتا ہے، وہ بھلی بات کرے یا خاموش رہے۔",

        ref:
            "Sahih Bukhari & Muslim"
    },

    {
        arabic:
            "أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",

        urdu:
            "اللہ کو سب سے زیادہ پسند وہ عمل ہے جو تھوڑا ہو لیکن مستقل ہو۔",

        ref:
            "Sahih Bukhari & Muslim"
    },

    {
        arabic:
            "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",

        urdu:
            "مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں۔",

        ref:
            "Sahih Bukhari & Muslim"
    },

    {
        arabic:
            "لَا تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا، وَلَوْ أَنْ تَلْقَى أَخَاكَ بِوَجْهٍ طَلْقٍ",

        urdu:
            "کسی نیکی کو حقیر نہ سمجھو، چاہے وہ اپنے بھائی کو مسکرا کر ملنا ہی ہو۔",

        ref:
            "Sahih Muslim"
    },

    {
        arabic:
            "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",

        urdu:
            "علم حاصل کرنا ہر مسلمان پر فرض ہے۔",

        ref:
            "Sunan Ibn Majah"
    },

    {
        arabic:
            "الدُّعَاءُ هُوَ الْعِبَادَةُ",

        urdu:
            "دعا ہی عبادت ہے۔",

        ref:
            "Sunan Abu Dawood"
    },

    {
        arabic:
            "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",

        urdu:
            "جو شخص علم حاصل کرنے کے لیے راستہ اختیار کرتا ہے، اللہ اس کے لیے جنت کا راستہ آسان کر دیتا ہے۔",

        ref:
            "Sahih Muslim"
    },

    {
        arabic:
            "أَفْضَلُ الذِّكْرِ لَا إِلَهَ إِلَّا اللَّهُ",

        urdu:
            "سب سے بہترین ذکر 'لا إله إلا الله' ہے۔",

        ref:
            "Sunan al-Tirmidhi"
    },

    {
        arabic:
            "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ",

        urdu:
            "اللہ تعالیٰ پسند فرماتا ہے کہ جب تم میں سے کوئی کام کرے تو اسے اچھی طرح کرے۔",

        ref:
            "Sahih al-Jami"
    }

];

function fetchDailyHadith() {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    const stored =
        localStorage.getItem(
            "dailyHadith"
        );

    if (stored) {

        try {

            const data =
                JSON.parse(stored);

            if (
                data.date === today
            ) {

                renderHadith(
                    data.index
                );

                return;
            }

        } catch (e) {}
    }

    const randomIndex =
        Math.floor(
            Math.random() *
            hadiths.length
        );

    localStorage.setItem(
        "dailyHadith",
        JSON.stringify({

            date: today,

            index: randomIndex

        })
    );

    renderHadith(
        randomIndex
    );
}

function renderHadith(index) {

    const hadith =
        hadiths[index];

    if (!hadith) {
        return;
    }

    const arabic =
        document.getElementById(
            "hadithArabic"
        );

    const urdu =
        document.getElementById(
            "hadithUrdu"
        );

    const ref =
        document.getElementById(
            "hadithRef"
        );

    if (arabic) {

        arabic.textContent =
            hadith.arabic;
    }

    if (urdu) {

        urdu.textContent =
            hadith.urdu;
    }

    if (ref) {

        ref.textContent =
            "— " +
            hadith.ref;
    }
}

function refreshHadith() {

    const randomIndex =
        Math.floor(
            Math.random() *
            hadiths.length
        );

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    localStorage.setItem(
        "dailyHadith",
        JSON.stringify({

            date: today,

            index: randomIndex

        })
    );

    renderHadith(
        randomIndex
    );
}

// ======================================
// EXPOSE INLINE FUNCTIONS
// ======================================

window.editJamaat =
    editJamaat;

window.toggleAlarm =
    toggleAlarm;

window.saveJamaatTime =
    saveJamaatTime;

window.closeJamaatModal =
    closeJamaatModal;

window.closeNotificationModal =
    closeNotificationModal;

window.refreshLocation =
    refreshLocation;