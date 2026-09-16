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

// ✅ Location Refresh Button element
const locRefreshBtn = document.getElementById("locationRefreshBtn");

// Helper: safely update location text (span ke andar)
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
        return locationName.innerText.replace('📍 ', '').trim();
    }
    return '';
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

async function initNativeNotifications() {
    try {
        if (
            typeof window.Capacitor === "undefined" ||
            !window.Capacitor.isNativePlatform ||
            !window.Capacitor.isNativePlatform()
        ) {
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

        LocalNotifications = window.Capacitor.Plugins.LocalNotifications;

        let permission = await LocalNotifications.checkPermissions();

        if (permission.display !== "granted") {
            permission = await LocalNotifications.requestPermissions();
        }

        if (permission.display !== "granted") {
            console.log("❌ Notification permission denied");
            nativeNotificationsReady = false;
            return false;
        }

        try {
            await LocalNotifications.createChannel({
                id: "azan_channel",
                name: "Prayer Alarms",
                description: "Prayer time alarms and notifications",
                importance: 5,
                visibility: 1,
                vibration: true
            });
        } catch (channelError) {
            console.log("Channel already exists or channel error:", channelError);
        }

        nativeNotificationsReady = true;

        console.log("✅ Native notifications ready");

        return true;

    } catch (error) {
        console.error("❌ Native notification initialization error:", error);
        nativeNotificationsReady = false;
        return false;
    }
}


// ======================================
// SCHEDULE PRAYER ALARM
// ======================================

async function scheduleNativeAlarm(prayer, hour, minute) {

    if (!nativeNotificationsReady || !LocalNotifications) {
        console.log("❌ Native notifications not ready");
        return false;
    }

    const id = PRAYER_ID_MAP[prayer];

    if (!id) {
        console.log("❌ Invalid prayer:", prayer);
        return false;
    }

    try {

        try {
            await LocalNotifications.cancel({
                notifications: [
                    {
                        id: id
                    }
                ]
            });
        } catch (cancelError) {
            console.log("Old alarm cancel skipped");
        }

        await LocalNotifications.schedule({
            notifications: [
                {
                    id: id,
                    title: `🕌 ${prayer} نماز کا وقت`,
                    body: "اذان ہو رہی ہے! نماز پڑھیں۔",
                    channelId: "azan_channel",
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
            `✅ ${prayer} alarm scheduled at ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
        );

        return true;

    } catch (error) {

        console.error(
            `❌ ${prayer} alarm schedule error:`,
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

        console.log(`🔕 Alarm cancelled: ${prayer}`);

    } catch (error) {

        console.log(
            `Cancel alarm error for ${prayer}:`,
            error
        );
    }
}

// ======================================
// AZAN AUDIO (in-app fallback)
// ======================================
let azanAudio = null;
let isAzanPlaying = false;

function playAzan() {
    try {
        if (azanAudio) {
            azanAudio.pause();
            azanAudio.currentTime = 0;
        }
        azanAudio = new Audio('audio/azan.mp3');
        azanAudio.volume = 0.8;
        azanAudio.loop = false;
        azanAudio.play().then(() => {
            isAzanPlaying = true;
        }).catch((error) => {
            console.log('Azan play error:', error);
        });
        azanAudio.onended = function() {
            isAzanPlaying = false;
        };
    } catch (error) {
        console.log('Azan error:', error);
    }
}

function stopAzan() {
    if (azanAudio) {
        azanAudio.pause();
        azanAudio.currentTime = 0;
        isAzanPlaying = false;
    }
}

const moreNavBtn = document.getElementById("moreNavBtn");
const moreMenu = document.getElementById("moreMenu");
const closeMoreMenuBtn = document.getElementById("closeMoreMenuBtn");
const settingsBtn = document.getElementById("settingsBtn");

// ======================================
// ALARM SYSTEM
// ======================================
let alarms = JSON.parse(localStorage.getItem("prayerAlarms")) || {};
let alarmFired = JSON.parse(localStorage.getItem("alarmFired")) || {};

function initAlarms() {
    document.querySelectorAll(".alarm-btn").forEach(btn => {
        const prayer = btn.dataset.prayer;
        const isActive = alarms[prayer] === true;
        btn.classList.toggle("active", isActive);
        btn.innerHTML = isActive ? '<i class="fa-solid fa-bell"></i>' : '<i class="fa-regular fa-bell"></i>';
    });
}

async function toggleAlarm(prayer) {
    alarms[prayer] = !alarms[prayer];
    localStorage.setItem("prayerAlarms", JSON.stringify(alarms));
    initAlarms();

    if (alarms[prayer]) {
        const time = jamaatTimes[prayer];
        if (time) {
            const parts = time.split(":");
            const hour = parseInt(parts[0]);
            const minute = parseInt(parts[1]);
            const ok = await scheduleNativeAlarm(prayer, hour, minute);
            if (ok) {
                showToast(`🔔 ${prayer} alarm set — app band ho tab bhi bajegi`);
            } else {
                showToast(`🔔 ${prayer} alarm on (app open rakhna hoga)`);
            }
        } else {
            showToast('⚠️ Pehle Jamaat time set karein');
            alarms[prayer] = false;
            localStorage.setItem("prayerAlarms", JSON.stringify(alarms));
            initAlarms();
        }
    } else {
        await cancelNativeAlarm(prayer);
        stopAzan();
        showToast(`🔕 ${prayer} alarm off`);
    }
}

// In-app fallback: check alarms every 10s (only while app open)
function checkAlarms() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    if (alarmFired.date !== today) {
        alarmFired = { date: today };
        localStorage.setItem("alarmFired", JSON.stringify(alarmFired));
    }
    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    prayers.forEach(prayer => {
        if (alarms[prayer] !== true) return;
        let timeStr = jamaatTimes[prayer];
        if (!timeStr) return;
        const parts = timeStr.split(":");
        if (parts.length < 2) return;
        let hours = parseInt(parts[0]);
        let minutes = parseInt(parts[1]);
        if (timeStr.toLowerCase().includes("pm") && hours < 12) hours += 12;
        if (timeStr.toLowerCase().includes("am") && hours === 12) hours = 0;
        const prayerTime = new Date();
        prayerTime.setHours(hours, minutes, 0, 0);
        if (prayerTime <= now) return;
        const key = prayer + "_" + today;
        if (alarmFired[key]) return;
        const diffMs = prayerTime - now;
        if (diffMs <= 60000) {
            playAzan();
            alarmFired[key] = true;
            localStorage.setItem("alarmFired", JSON.stringify(alarmFired));
        }
    });
}

// ======================================
// WEATHER SYSTEM
// ======================================
function fetchWeatherByCoords(lat, lon) {
    const cityName = getLocationText().replace('📍 ', '').trim();
    document.getElementById('weatherCity').innerText = cityName || 'Loading...';
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`)
        .then(res => res.json())
        .then(data => { renderWeather(data); })
        .catch(() => {
            document.getElementById('weatherDesc').innerText = 'Weather unavailable';
        });
}

function renderWeather(data) {
    const current = data.current_weather;
    const temp = Math.round(current.temperature);
    const weatherCode = current.weathercode;
    const windSpeed = Math.round(current.windspeed);
    const weatherMap = {
        0: { icon: '☀️', desc: 'Clear Sky' },
        1: { icon: '🌤️', desc: 'Mainly Clear' },
        2: { icon: '⛅', desc: 'Partly Cloudy' },
        3: { icon: '☁️', desc: 'Overcast' },
        45: { icon: '🌫️', desc: 'Fog' },
        48: { icon: '🌫️', desc: 'Rime Fog' },
        51: { icon: '🌦️', desc: 'Light Drizzle' },
        53: { icon: '🌧️', desc: 'Moderate Drizzle' },
        55: { icon: '🌧️', desc: 'Dense Drizzle' },
        61: { icon: '🌧️', desc: 'Slight Rain' },
        63: { icon: '🌧️', desc: 'Moderate Rain' },
        65: { icon: '🌧️', desc: 'Heavy Rain' },
        71: { icon: '🌨️', desc: 'Slight Snow' },
        73: { icon: '🌨️', desc: 'Moderate Snow' },
        75: { icon: '❄️', desc: 'Heavy Snow' },
        80: { icon: '🌧️', desc: 'Rain Showers' },
        81: { icon: '🌧️', desc: 'Moderate Rain Showers' },
        82: { icon: '⛈️', desc: 'Heavy Rain Showers' },
        95: { icon: '⛈️', desc: 'Thunderstorm' },
        96: { icon: '⛈️', desc: 'Thunderstorm + Hail' },
        99: { icon: '⛈️', desc: 'Heavy Thunderstorm' }
    };
    const weather = weatherMap[weatherCode] || { icon: '🌡️', desc: 'Unknown' };
    document.getElementById('weatherIcon').textContent = weather.icon;
    document.getElementById('weatherTemp').innerHTML = `${temp}<small>°C</small>`;
    document.getElementById('weatherDesc').textContent = weather.desc;
    document.getElementById('weatherWind').textContent = windSpeed;
}

const hijriMonths = [
    "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

// ======================================
// LOCATION + PRAYER CACHE
// ======================================
function saveLocationAndCache(lat, lon, name, times, hijriStr) {
    try {
        localStorage.setItem("userLatitude", String(lat));
        localStorage.setItem("userLongitude", String(lon));
        if (name) localStorage.setItem("userLocationName", name);
        localStorage.setItem("lastGpsUpdate", String(Date.now()));
        if (times) {
            localStorage.setItem("cachedPrayerTimes", JSON.stringify({
                times: times,
                hijri: hijriStr || "",
                lat: lat,
                lon: lon,
                date: new Date().toISOString().split('T')[0]
            }));
        }
    } catch (e) {
        console.warn("Cache save error:", e);
    }
}

function loadCachedData() {
    let hasData = false;
    const savedName = localStorage.getItem("userLocationName");
    if (savedName) {
        setLocationText("📍 " + savedName);
        hasData = true;
    }
    const cached = localStorage.getItem("cachedPrayerTimes");
    if (cached) {
        try {
            const data = JSON.parse(cached);
            if (data.times && Object.keys(data.times).length > 0) {
                prayerTimes = data.times;
                if (data.hijri) islamicDate.innerHTML = data.hijri;
                showPrayerTimes();
                calculateNextPrayer();
                hasData = true;
            }
        } catch (e) {}
    }
    if (savedName) {
        document.getElementById('weatherCity').innerText = savedName;
    }
    return hasData;
}

function detectLocation() {
    const lat = localStorage.getItem("userLatitude");
    const lon = localStorage.getItem("userLongitude");
    const lastGps = localStorage.getItem("lastGpsUpdate");

    if (lat && lon) {
        loadCachedData();
        getPrayerTimes(parseFloat(lat), parseFloat(lon), true);
        const hoursSince = lastGps ? (Date.now() - parseInt(lastGps)) / 3600000 : 999;
        if (hoursSince > 24) {
            requestFreshGPS(true);
        }
        return;
    }
    requestFreshGPS(false);
}

function requestFreshGPS(silent) {
    if (!navigator.geolocation) {
        if (!silent) {
            setLocationText("📍 Adilpur, Ghotki");
            getPrayerTimes(28.0065, 69.3167, false);
        }
        return;
    }
    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getPrayerTimes(lat, lon, false);
        },
        () => {
            if (!silent) {
                const savedName = localStorage.getItem("userLocationName");
                const savedLat = localStorage.getItem("userLatitude");
                const savedLon = localStorage.getItem("userLongitude");
                if (savedLat && savedLon) {
                    setLocationText("📍 " + (savedName || "Saved Location"));
                    getPrayerTimes(parseFloat(savedLat), parseFloat(savedLon), true);
                } else {
                    setLocationText("📍 Adilpur, Ghotki");
                    getPrayerTimes(28.0065, 69.3167, false);
                }
            }
        },
        { enableHighAccuracy: false, maximumAge: 600000, timeout: 8000 }
    );
}

// ======================================
// ✅ LOCATION REFRESH HANDLER
// ======================================
function refreshLocation() {
    if (!locRefreshBtn) return;

    // Spinning animation start
    locRefreshBtn.classList.add("spinning");

    // Toast
    showToast("📍 Refreshing location...");

    // Fresh GPS request
    requestFreshGPS(false);

    // Animation stop after 2.5 seconds
    setTimeout(() => {
        locRefreshBtn.classList.remove("spinning");
    }, 2500);
}

// ======================================
// MAIN
// ======================================
document.addEventListener("DOMContentLoaded", async () => {
    // 🔥 Native notifications پہلے
    await initNativeNotifications();

    updateClock();
    setInterval(updateClock, 1000);
    loadTodayDate();
    loadSavedJamaat();

    loadCachedData();
    detectLocation();

    initAlarms();
    setInterval(checkAlarms, 10000);

    // تمام محفوظ alarms دوبارہ schedule کریں
    if (nativeNotificationsReady) {
        for (const prayer of ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]) {
            if (alarms[prayer] === true && jamaatTimes[prayer]) {
                const parts = jamaatTimes[prayer].split(":");
                await scheduleNativeAlarm(prayer, parseInt(parts[0]), parseInt(parts[1]));
            }
        }
    }

    setInterval(() => {
        const lat = localStorage.getItem("userLatitude");
        const lon = localStorage.getItem("userLongitude");
        if (lat && lon) {
            fetchWeatherByCoords(parseFloat(lat), parseFloat(lon));
        }
    }, 600000);

    if (moreNavBtn && moreMenu && closeMoreMenuBtn) {
        moreNavBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            moreMenu.classList.add("show");
        });
        closeMoreMenuBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            moreMenu.classList.remove("show");
        });
        document.addEventListener("click", function(e) {
            if (moreMenu.classList.contains("show") &&
                !moreMenu.contains(e.target) &&
                !moreNavBtn.contains(e.target)) {
                moreMenu.classList.remove("show");
            }
        });
        if (settingsBtn) {
            settingsBtn.addEventListener("click", function(e) {
                e.stopPropagation();
                moreMenu.classList.remove("show");
                alert("Settings will be available in the next update.");
            });
        }
    }

    // ✅ Location Refresh Button listener
    if (locRefreshBtn) {
        locRefreshBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            refreshLocation();
        });
    }

    initAutoTheme();
    fetchDailyAyah();
    document.getElementById('refreshAyahBtn').addEventListener('click', fetchDailyAyah);
    setInterval(fetchDailyAyah, 86400000);
    fetchDailyHadith();
    document.getElementById('refreshHadithBtn').addEventListener('click', refreshHadith);
});

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    const timeStr = String(hours).padStart(2, "0") + ":" + minutes + ":" + seconds;
    document.getElementById("liveTimeDisplay").textContent = timeStr;
    document.querySelector(".ampm-text").textContent = ampm;
}

function loadTodayDate() {
    const today = new Date();
    date.innerHTML = today.toLocaleDateString("en-GB", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
    islamicDate.innerHTML = "Loading Islamic Date...";
}

async function getPrayerTimes(latitude, longitude, isBackgroundUpdate) {
    try {
        const response = await fetch(
            `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const result = await response.json();
        prayerTimes = result.data.timings;
        localStorage.setItem("userLatitude", String(latitude));
        localStorage.setItem("userLongitude", String(longitude));
        localStorage.setItem("lastGpsUpdate", String(Date.now()));

        const savedName = localStorage.getItem("userLocationName");
        if (!savedName || !isBackgroundUpdate) {
            try {
                const locRes = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                );
                const locData = await locRes.json();
                const address = locData.address || {};
                const name = address.village || address.town || address.city || address.municipality || address.county || savedName || "Adilpur, Ghotki";
                setLocationText("📍 " + name);
                localStorage.setItem("userLocationName", name);
            } catch (error) {
                const fallbackName = savedName || "Adilpur, Ghotki";
                setLocationText("📍 " + fallbackName);
                localStorage.setItem("userLocationName", fallbackName);
            }
        } else {
            setLocationText("📍 " + savedName);
        }

        if (result.data.timings && result.data.timings.Maghrib) {
            localStorage.setItem("liveMaghribAzan", result.data.timings.Maghrib);
            const parts = result.data.timings.Maghrib.split(":");
            let hours = parseInt(parts[0]);
            let minutes = parseInt(parts[1]);
            minutes += 3;
            if (minutes >= 60) { minutes -= 60; hours += 1; }
            if (hours >= 24) { hours = 0; }
            const autoMaghribJamaat = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0");
            jamaatTimes["Maghrib"] = autoMaghribJamaat;
            localStorage.setItem("jamaatTimes", JSON.stringify(jamaatTimes));
            updateJamaatUI();

            if (alarms["Maghrib"] === true && nativeNotificationsReady) {
                await scheduleNativeAlarm("Maghrib", hours, minutes);
            }
        }

        const hijriStr = result.data.date.hijri.weekday.en + ", " + result.data.date.hijri.day + " " + result.data.date.hijri.month.en + " " + result.data.date.hijri.year + " AH";
        islamicDate.innerHTML = hijriStr;

        showPrayerTimes();
        calculateNextPrayer();
        fetchWeatherByCoords(latitude, longitude);
        saveLocationAndCache(latitude, longitude, localStorage.getItem("userLocationName"), prayerTimes, hijriStr);

    } catch (error) {
        console.error("Prayer Times Error:", error);
        if (!isBackgroundUpdate) {
            loadCachedData();
            if (Object.keys(prayerTimes).length === 0) {
                showToast("⚠️ Internet nahi hai — saved data use kar rahe hain");
            }
        }
    }
}

function showPrayerTimes() {
    function formatPrayerTime(time) {
        if (!time) return "--:--";
        const parts = time.split(":");
        let hours = parseInt(parts[0]);
        const minutes = parts[1];
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        if (hours === 0) hours = 12;
        return String(hours).padStart(2, "0") + ":" + minutes + " " + ampm;
    }
    document.getElementById("fajr").innerHTML = formatPrayerTime(prayerTimes.Fajr);
    document.getElementById("dhuhr").innerHTML = formatPrayerTime(prayerTimes.Dhuhr);
    document.getElementById("asr").innerHTML = formatPrayerTime(prayerTimes.Asr);
    document.getElementById("maghrib").innerHTML = formatPrayerTime(prayerTimes.Maghrib);
    document.getElementById("isha").innerHTML = formatPrayerTime(prayerTimes.Isha);
    if (prayerTimes.Maghrib) {
        localStorage.setItem("liveMaghribAzan", prayerTimes.Maghrib);
    }
}

function calculateNextPrayer() {
    const prayers = [
        { name: "Fajr", time: prayerTimes.Fajr },
        { name: "Dhuhr", time: prayerTimes.Dhuhr },
        { name: "Asr", time: prayerTimes.Asr },
        { name: "Maghrib", time: prayerTimes.Maghrib },
        { name: "Isha", time: prayerTimes.Isha }
    ];
    const now = new Date();
    let next = null;
    for (const prayer of prayers) {
        if (!prayer.time) continue;
        const parts = prayer.time.split(":");
        const prayerDate = new Date();
        prayerDate.setHours(parseInt(parts[0]), parseInt(parts[1]), 0, 0);
        if (prayerDate > now) {
            next = { name: prayer.name, date: prayerDate, jamaat: jamaatTimes[prayer.name] || "" };
            break;
        }
    }
    if (!next && prayerTimes.Fajr) {
        const fajr = prayerTimes.Fajr.split(":");
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(parseInt(fajr[0]), parseInt(fajr[1]), 0, 0);
        next = { name: "Fajr", date: tomorrow, jamaat: jamaatTimes["Fajr"] || "" };
    }
    if (!next) return;

    currentPrayer = next.name;
    document.getElementById("nextPrayerName").innerHTML = currentPrayer;
    const nextPrayerJamaat = document.getElementById("nextPrayerJamaat");
    if (nextPrayerJamaat) {
        const time = next.jamaat;
        if (time) {
            const parts = time.split(":");
            let hours = parseInt(parts[0]);
            const minutes = parts[1];
            const ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            if (hours === 0) hours = 12;
            nextPrayerJamaat.innerHTML = String(hours).padStart(2, "0") + ":" + minutes + " " + ampm;
        } else {
            nextPrayerJamaat.innerHTML = "--:--";
        }
    }
    startCountdown(next.date);
}

let countdownInterval = null;
function startCountdown(nextPrayerTime) {
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        const now = new Date();
        const difference = nextPrayerTime - now;
        if (difference <= 0) {
            clearInterval(countdownInterval);
            calculateNextPrayer();
            return;
        }
        const hours = Math.floor(difference / 3600000);
        const minutes = Math.floor((difference % 3600000) / 60000);
        const seconds = Math.floor((difference % 60000) / 1000);
        countdown.innerHTML = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    }, 1000);
}

let selectedPrayer = "";

function editJamaat(prayer) {
    selectedPrayer = prayer;
    document.getElementById("selectedPrayer").innerText = prayer;
    document.getElementById("jamaatTimeInput").value = jamaatTimes[prayer] || "";
    document.getElementById("jamaatModal").style.display = "flex";
}

function closeJamaatModal() {
    document.getElementById("jamaatModal").style.display = "none";
}

async function saveJamaatTime() {
    const time = document.getElementById("jamaatTimeInput").value;
    if (time === "") return;
    jamaatTimes[selectedPrayer] = time;
    localStorage.setItem("jamaatTimes", JSON.stringify(jamaatTimes));
    updateJamaatUI();
    closeJamaatModal();

    if (alarms[selectedPrayer] === true && nativeNotificationsReady) {
        const parts = time.split(":");
        await scheduleNativeAlarm(selectedPrayer, parseInt(parts[0]), parseInt(parts[1]));
    }

    const today = new Date().toISOString().split('T')[0];
    const key = selectedPrayer + "_" + today;
    if (alarmFired[key]) {
        delete alarmFired[key];
        localStorage.setItem("alarmFired", JSON.stringify(alarmFired));
    }
}

function loadSavedJamaat() {
    const saved = localStorage.getItem("jamaatTimes");
    if (saved) jamaatTimes = JSON.parse(saved);
    updateJamaatUI();
}

function updateJamaatUI() {
    ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].forEach(prayer => {
        const element = document.getElementById(prayer.toLowerCase() + "Jamaat");
        if (element) {
            const time = jamaatTimes[prayer];
            if (time) {
                const parts = time.split(":");
                let hours = parseInt(parts[0]);
                const minutes = parts[1];
                const ampm = hours >= 12 ? "PM" : "AM";
                hours = hours % 12;
                if (hours === 0) hours = 12;
                element.innerHTML = String(hours).padStart(2, "0") + ":" + minutes + " " + ampm;
            } else {
                element.innerHTML = "--:--";
            }
        }
    });
}

function showToast(msg) {
    const existing = document.querySelector(".toast-msg");
    if (existing) existing.remove();
    const t = document.createElement("div");
    t.className = "toast-msg";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

const notificationBtn = document.getElementById("notificationBtn");
const notificationModal = document.getElementById("notificationModal");
const enableNotification = document.getElementById("enableNotification");

if (notificationBtn) {
    notificationBtn.addEventListener("click", () => {
        notificationModal.style.display = "flex";
    });
}

function closeNotificationModal() {
    notificationModal.style.display = "none";
}

enableNotification.addEventListener("click", async () => {
    if (nativeNotificationsReady) {
        alert("✅ Native notifications already enabled! Alarms will work even when app is closed.");
    } else {
        const ok = await initNativeNotifications();
        if (ok) {
            alert("✅ Notifications enabled!");
        } else {
            alert("⚠️ Native notifications not available. Make sure you installed @capacitor/local-notifications and rebuilt the app.");
        }
    }
    closeNotificationModal();
});

window.addEventListener("click", (event) => {
    if (event.target === notificationModal) closeNotificationModal();
    if (event.target === document.getElementById("jamaatModal")) closeJamaatModal();
});

setInterval(() => {
    if (Object.keys(prayerTimes).length > 0) calculateNextPrayer();
}, 60000);

function loadThemeOnIndex() {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
        document.body.className = 'theme-' + savedTheme;
    } else {
        document.body.className = 'theme-gold';
    }
}
loadThemeOnIndex();

function initAutoTheme() {
    const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    function applyTheme(e) {
        const isDark = e.matches;
        const savedTheme = localStorage.getItem('appTheme');
        if (savedTheme) {
            document.body.className = 'theme-' + savedTheme;
            return;
        }
        document.body.className = isDark ? 'theme-dark' : 'theme-light';
    }
    applyTheme(darkModeMedia);
    darkModeMedia.addEventListener('change', applyTheme);
}

let currentAyahData = null;

function fetchDailyAyah() {
    const arabicEl = document.getElementById('ayahArabic');
    const urduEl = document.getElementById('ayahUrdu');
    const englishEl = document.getElementById('ayahEnglish');
    arabicEl.textContent = 'Loading...';
    urduEl.textContent = 'Loading translation...';
    englishEl.textContent = 'Loading...';
    fetch('https://api.alquran.cloud/v1/ayah/random')
        .then(res => res.json())
        .then(data => {
            if (data.code !== 200) throw new Error('API error');
            const ayah = data.data;
            const surah = ayah.surah;
            currentAyahData = {
                arabic: ayah.text,
                number: ayah.numberInSurah,
                surah: surah.name,
                surahNumber: surah.number,
                english: ayah.english || 'Translation not available'
            };
            return fetch(`https://api.alquran.cloud/v1/ayah/${ayah.number}/ur.jalandhry`);
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 200 && data.data) {
                currentAyahData.urdu = data.data.text;
            } else {
                currentAyahData.urdu = 'اردو ترجمہ دستیاب نہیں';
            }
            renderAyah();
        })
        .catch(() => {
            arabicEl.textContent = 'Unable to load Ayah. Please refresh.';
            urduEl.textContent = '';
            englishEl.textContent = '';
        });
}

function renderAyah() {
    if (!currentAyahData) return;
    document.getElementById('ayahArabic').textContent = currentAyahData.arabic;
    document.getElementById('ayahUrdu').textContent = currentAyahData.urdu || '';
    document.getElementById('ayahEnglish').textContent = `${currentAyahData.english} — Surah ${currentAyahData.surah} (${currentAyahData.surahNumber}:${currentAyahData.number})`;
}

const hadiths = [
    { arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى", urdu: "اعمال کا دارومدار نیتوں پر ہے، اور ہر شخص کو وہی ملتا ہے جو اس نے نیت کی۔", ref: "Sahih Bukhari & Muslim" },
    { arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ", urdu: "جو اللہ اور آخرت پر ایمان رکھتا ہے، وہ بھلی بات کرے یا خاموش رہے۔", ref: "Sahih Bukhari & Muslim" },
    { arabic: "أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ", urdu: "اللہ کو سب سے زیادہ پسند وہ عمل ہے جو تھوڑا ہو لیکن مستقل ہو۔", ref: "Sahih Bukhari & Muslim" },
    { arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ", urdu: "مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں۔", ref: "Sahih Bukhari & Muslim" },
    { arabic: "لَا تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا، وَلَوْ أَنْ تَلْقَى أَخَاكَ بِوَجْهٍ طَلْقٍ", urdu: "کسی نیکی کو حقیر نہ سمجھو، چاہے وہ اپنے بھائی کو مسکرا کر ملنا ہی ہو۔", ref: "Sahih Muslim" },
    { arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ", urdu: "علم حاصل کرنا ہر مسلمان پر فرض ہے۔", ref: "Sunan Ibn Majah" },
    { arabic: "الدُّعَاءُ هُوَ الْعِبَادَةُ", urdu: "دعا ہی عبادت ہے۔", ref: "Sunan Abu Dawood" },
    { arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ", urdu: "جو شخص علم حاصل کرنے کے لیے راستہ اختیار کرتا ہے، اللہ اس کے لیے جنت کا راستہ آسان کر دیتا ہے۔", ref: "Sahih Muslim" },
    { arabic: "أَفْضَلُ الذِّكْرِ لَا إِلَهَ إِلَّا اللَّهُ", urdu: "سب سے بہترین ذکر 'لا إله إلا الله' ہے۔", ref: "Sunan al-Tirmidhi" },
    { arabic: "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ", urdu: "اللہ تعالیٰ پسند فرماتا ہے کہ جب تم میں سے کوئی کام کرے تو اسے اچھی طرح کرے۔", ref: "Sahih al-Jami" }
];

function fetchDailyHadith() {
    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem('dailyHadith');
    if (stored) {
        const data = JSON.parse(stored);
        if (data.date === today) {
            renderHadith(data.index);
            return;
        }
    }
    const randomIndex = Math.floor(Math.random() * hadiths.length);
    localStorage.setItem('dailyHadith', JSON.stringify({ date: today, index: randomIndex }));
    renderHadith(randomIndex);
}

function renderHadith(index) {
    const hadith = hadiths[index];
    document.getElementById('hadithArabic').textContent = hadith.arabic;
    document.getElementById('hadithUrdu').textContent = hadith.urdu;
    document.getElementById('hadithRef').textContent = '— ' + hadith.ref;
}

function refreshHadith() {
    const randomIndex = Math.floor(Math.random() * hadiths.length);
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('dailyHadith', JSON.stringify({ date: today, index: randomIndex }));
    renderHadith(randomIndex);
}

// Expose for inline onclick
window.editJamaat = editJamaat;
window.toggleAlarm = toggleAlarm;
window.saveJamaatTime = saveJamaatTime;
window.closeJamaatModal = closeJamaatModal;
window.closeNotificationModal = closeNotificationModal;
window.refreshLocation = refreshLocation;