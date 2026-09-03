"use strict";
let prayerTimes = {};
let jamaatTimes = {};
let currentPrayer = "";
const date = document.getElementById("date");
const islamicDate = document.getElementById("islamic-date");
const locationName = document.getElementById("locationName");
const countdown = document.getElementById("countdown");
const liveTimeDisplay = document.getElementById("liveTimeDisplay");

// ======================================
// AZAN AUDIO SYSTEM
// ======================================
let azanAudio = null;
let isAzanPlaying = false;

function playAzan() {
    try {
        // اگر پہلے سے آڈیو موجود ہے تو اسے روکیں
        if (azanAudio) {
            azanAudio.pause();
            azanAudio.currentTime = 0;
        }
        
        // نیا آڈیو آبجیکٹ بنائیں
        azanAudio = new Audio('audio/azan.mp3');
        azanAudio.volume = 0.8;
        azanAudio.loop = false;
        
        azanAudio.play().then(() => {
            isAzanPlaying = true;
            console.log('🔊 Azan playing...');
        }).catch((error) => {
            console.log('Azan play error:', error);
            // اگر آڈیو فائل نہ ملے تو فال بیک
            fallbackAzanAlert();
        });
        
        // اذان ختم ہونے پر پراپرٹی ری سیٹ کریں
        azanAudio.onended = function() {
            isAzanPlaying = false;
            console.log('🔇 Azan finished');
        };
        
    } catch (error) {
        console.log('Azan error:', error);
        fallbackAzanAlert();
    }
}

function stopAzan() {
    if (azanAudio) {
        azanAudio.pause();
        azanAudio.currentTime = 0;
        isAzanPlaying = false;
    }
}

// اگر اذان کی فائل نہ ملے تو یہ کام کرے گا
function fallbackAzanAlert() {
    // صارف کو متن کے ساتھ مطلع کریں
    showToast('🔔 اذان کا وقت ہو گیا!');
    
    // اگر نوٹیفکیشن کی اجازت ہو تو بھیجیں
    if (Notification.permission === "granted") {
        new Notification("🕌 نماز کا وقت", {
            body: "اذان ہو رہی ہے! نماز پڑھیں۔",
            icon: "images/makkah.png"
        });
    }
}

// More Menu Elements
const moreNavBtn = document.getElementById("moreNavBtn");
const moreMenu = document.getElementById("moreMenu");
const closeMoreMenuBtn = document.getElementById("closeMoreMenuBtn");
const settingsBtn = document.getElementById("settingsBtn");

// ======================================
// ALARM SYSTEM
// ======================================
let alarms = JSON.parse(localStorage.getItem("prayerAlarms")) || {};
let alarmFired = JSON.parse(localStorage.getItem("alarmFired")) || {};

// Initialize alarm buttons
function initAlarms() {
    document.querySelectorAll(".alarm-btn").forEach(btn => {
        const prayer = btn.dataset.prayer;
        const isActive = alarms[prayer] === true;
        btn.classList.toggle("active", isActive);
        btn.innerHTML = isActive
            ? '<i class="fa-solid fa-bell"></i>'
            : '<i class="fa-regular fa-bell"></i>';
    });
}

// Toggle alarm for a specific prayer
function toggleAlarm(prayer) {
    alarms[prayer] = !alarms[prayer];
    localStorage.setItem("prayerAlarms", JSON.stringify(alarms));
    initAlarms();
    
    // اگر صارف نے الارم آف کیا اور اذان چل رہی ہے تو روکیں
    if (!alarms[prayer] && isAzanPlaying) {
        stopAzan();
    }
}

// Check if any alarm should fire
function checkAlarms() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // Reset alarmFired for a new day
    if (alarmFired.date !== today) {
        alarmFired = { date: today };
        localStorage.setItem("alarmFired", JSON.stringify(alarmFired));
    }

    // Prayers list
    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    prayers.forEach(prayer => {
        // Only if alarm is active
        if (alarms[prayer] !== true) return;

        // Get Jamaat time for this prayer
        let timeStr = jamaatTimes[prayer];
        if (!timeStr) return;

        // Convert time string to Date object today
        const parts = timeStr.split(":");
        if (parts.length < 2) return;
        let hours = parseInt(parts[0]);
        let minutes = parseInt(parts[1]);

        // AM/PM handling
        if (timeStr.toLowerCase().includes("pm") && hours < 12) hours += 12;
        if (timeStr.toLowerCase().includes("am") && hours === 12) hours = 0;

        const prayerTime = new Date();
        prayerTime.setHours(hours, minutes, 0, 0);

        // If prayer time has passed today, skip
        if (prayerTime <= now) return;

        // Check if alarm already fired for this prayer today
        const key = prayer + "_" + today;
        if (alarmFired[key]) return;

        // If prayer time is within 60 seconds, fire alarm with Azan
        const diffMs = prayerTime - now;
        if (diffMs <= 60000) {
            // ✅ اس نماز کی اذان چلائیں
            if (alarms[prayer] === true) {
                playAzan();
            }

            // نوٹیفکیشن بھی بھیجیں
            if (Notification.permission === "granted") {
                new Notification(`🕌 ${prayer} نماز کا وقت`, {
                    body: `${prayer} کی اذان ہو رہی ہے! نماز پڑھیں۔`,
                    icon: "images/makkah.png"
                });
            }

            // Mark as fired
            alarmFired[key] = true;
            localStorage.setItem("alarmFired", JSON.stringify(alarmFired));

            // ⚠️ الارم کو آف نہ کریں تاکہ اگر کوئی دوبارہ اس نماز کے لیے الارم سیٹ کرے تو کام کرے
            // لیکن اگر ایک بار بج چکا ہے تو دوبارہ نہ بجے (اس کے لیے alarmFired استعمال ہو رہا ہے)
        }
    });
}

// ======================================
// WEATHER SYSTEM
// ======================================
function fetchWeatherByCoords(lat, lon) {
    const cityName = locationName.innerText.replace('📍 ', '');
    document.getElementById('weatherCity').innerText = cityName || 'Loading...';

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`)
        .then(res => res.json())
        .then(data => {
            renderWeather(data);
        })
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

// ======================================
// MAIN FUNCTIONS
// ======================================

document.addEventListener("DOMContentLoaded", () => {
    updateClock();
    setInterval(updateClock, 1000);
    loadTodayDate();
    loadSavedJamaat();
    detectLocation();
    initAlarms();

    // Check alarms every 10 seconds (for faster response)
    setInterval(checkAlarms, 10000);

    // موسم کو ہر 10 منٹ بعد اپ ڈیٹ کریں
    setInterval(() => {
        const lat = localStorage.getItem("userLatitude");
        const lon = localStorage.getItem("userLongitude");
        if (lat && lon) {
            fetchWeatherByCoords(parseFloat(lat), parseFloat(lon));
        }
    }, 600000);

    // More Menu Logic
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
});

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) {
        hours = 12;
    }
    const timeStr =
        String(hours).padStart(2, "0") +
        ":" +
        minutes +
        ":" +
        seconds;

    document.getElementById("liveTimeDisplay").textContent = timeStr;
    document.querySelector(".ampm-text").textContent = ampm;
}

function loadTodayDate() {
    const today = new Date();
    date.innerHTML = today.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    islamicDate.innerHTML = "Loading Islamic Date...";
}

function detectLocation() {
    if (!navigator.geolocation) {
        locationName.innerHTML = "📍 Adilpur, Ghotki";
        getPrayerTimes(28.0065, 69.3167);
        return;
    }

    // ✅ WATCHPOSITION — خودکار لوکیشن اپ ڈیٹ
    navigator.geolocation.watchPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getPrayerTimes(lat, lon);
        },
        () => {
            locationName.innerHTML = "📍 Adilpur, Ghotki";
            getPrayerTimes(28.0065, 69.3167);
        },
        {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 10000
        }
    );
}

async function getPrayerTimes(latitude, longitude) {
    try {
        localStorage.setItem("userLatitude", String(latitude));
        localStorage.setItem("userLongitude", String(longitude));

        const response = await fetch(
            `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const result = await response.json();
        prayerTimes = result.data.timings;

        try {
            const locRes = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const locData = await locRes.json();
            const address = locData.address || {};
            const name =
                address.village ||
                address.town ||
                address.city ||
                address.municipality ||
                address.county ||
                "Adilpur, Ghotki";
            locationName.innerHTML = "📍 " + name;
            localStorage.setItem("userLocationName", name);
        } catch (error) {
            console.log("Location name error:", error);
            locationName.innerHTML = "📍 Adilpur, Ghotki";
            localStorage.setItem("userLocationName", "Adilpur, Ghotki");
        }

        if (result.data.timings && result.data.timings.Maghrib) {
            localStorage.setItem("liveMaghribAzan", result.data.timings.Maghrib);

            const parts = result.data.timings.Maghrib.split(":");
            let hours = parseInt(parts[0]);
            let minutes = parseInt(parts[1]);
            minutes += 3;
            if (minutes >= 60) {
                minutes -= 60;
                hours += 1;
            }
            if (hours >= 24) {
                hours = 0;
            }
            const autoMaghribJamaat =
                String(hours).padStart(2, "0") +
                ":" +
                String(minutes).padStart(2, "0");
            jamaatTimes["Maghrib"] = autoMaghribJamaat;
            localStorage.setItem("jamaatTimes", JSON.stringify(jamaatTimes));
            updateJamaatUI();
        }

        islamicDate.innerHTML =
            result.data.date.hijri.weekday.en +
            ", " +
            result.data.date.hijri.day +
            " " +
            result.data.date.hijri.month.en +
            " " +
            result.data.date.hijri.year +
            " AH";

        showPrayerTimes();
        calculateNextPrayer();
        fetchWeatherByCoords(latitude, longitude);

    } catch (error) {
        console.error("Prayer Times Error:", error);
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
        if (hours === 0) {
            hours = 12;
        }
        return String(hours).padStart(2, "0") +
            ":" +
            minutes +
            " " +
            ampm;
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
        const parts = prayer.time.split(":");
        const prayerDate = new Date();
        prayerDate.setHours(parseInt(parts[0]), parseInt(parts[1]), 0, 0);
        if (prayerDate > now) {
            next = {
                name: prayer.name,
                date: prayerDate,
                jamaat: jamaatTimes[prayer.name] || ""
            };
            break;
        }
    }
    if (!next) {
        const fajr = prayerTimes.Fajr.split(":");
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(parseInt(fajr[0]), parseInt(fajr[1]), 0, 0);
        next = {
            name: "Fajr",
            date: tomorrow,
            jamaat: jamaatTimes["Fajr"] || ""
        };
    }
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
            if (hours === 0) {
                hours = 12;
            }
            nextPrayerJamaat.innerHTML = String(hours).padStart(2, "0") + ":" + minutes + " " + ampm;
        } else {
            nextPrayerJamaat.innerHTML = "--:--";
        }
    }
    startCountdown(next.date);
}

let countdownInterval = null;

function startCountdown(nextPrayerTime) {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
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
        countdown.innerHTML = String(hours).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");
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

function saveJamaatTime() {
    const time = document.getElementById("jamaatTimeInput").value;
    if (time === "") return;
    jamaatTimes[selectedPrayer] = time;
    localStorage.setItem("jamaatTimes", JSON.stringify(jamaatTimes));
    updateJamaatUI();
    closeJamaatModal();

    const today = new Date().toISOString().split('T')[0];
    const key = selectedPrayer + "_" + today;
    if (alarmFired[key]) {
        delete alarmFired[key];
        localStorage.setItem("alarmFired", JSON.stringify(alarmFired));
    }
}

function loadSavedJamaat() {
    const saved = localStorage.getItem("jamaatTimes");
    if (saved) {
        jamaatTimes = JSON.parse(saved);
    }
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
                if (hours === 0) {
                    hours = 12;
                }
                element.innerHTML = String(hours).padStart(2, "0") + ":" + minutes + " " + ampm;
            } else {
                element.innerHTML = "--:--";
            }
        }
    });
}

// ======================================
// TOAST NOTIFICATION
// ======================================
function showToast(msg) {
    const existing = document.querySelector(".toast-msg");
    if (existing) existing.remove();
    const t = document.createElement("div");
    t.className = "toast-msg";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// Notification Button
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
    if (!("Notification" in window)) {
        alert("Notification is not supported.");
        return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        alert("Prayer Notifications Enabled.");
    } else {
        alert("Notification Permission Denied.");
    }
    closeNotificationModal();
});

window.addEventListener("click", (event) => {
    if (event.target === notificationModal) {
        closeNotificationModal();
    }
    if (event.target === document.getElementById("jamaatModal")) {
        closeJamaatModal();
    }
});

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loadingScreen").style.display = "none";
    }, 1200);
});

setInterval(() => {
    if (Object.keys(prayerTimes).length > 0) {
        calculateNextPrayer();
    }
}, 60000);

// ======================================
// LOAD THEME ON INDEX PAGE
// ======================================
function loadThemeOnIndex() {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
        document.body.className = 'theme-' + savedTheme;
    } else {
        document.body.className = 'theme-gold';
    }
}

loadThemeOnIndex();