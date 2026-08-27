"use strict";
let prayerTimes = {};
let jamaatTimes = {};
let currentPrayer = "";
const date = document.getElementById("date");
const islamicDate = document.getElementById("islamic-date");
const locationName = document.getElementById("locationName");
const countdown = document.getElementById("countdown");
const liveTimeDisplay = document.getElementById("liveTimeDisplay");

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

        // If prayer time is within 60 seconds, fire alarm
        const diffMs = prayerTime - now;
        if (diffMs <= 60000) {
            // Fire notification
            if (Notification.permission === "granted") {
                new Notification("🕌 Prayer Time", {
                    body: `It's time for ${prayer} Jamaat!`,
                    icon: "images/makkah.png"
                });
            } else {
                // If notification not granted, show alert
                alert(`🔔 It's time for ${prayer} Jamaat!`);
            }

            // Mark as fired
            alarmFired[key] = true;
            localStorage.setItem("alarmFired", JSON.stringify(alarmFired));

            // Turn off alarm after firing
            alarms[prayer] = false;
            localStorage.setItem("prayerAlarms", JSON.stringify(alarms));
            initAlarms();
        }
    });
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

    // Check alarms every 30 seconds
    setInterval(checkAlarms, 30000);

    // More Menu Logic (Quran Style)
    if (moreNavBtn && moreMenu && closeMoreMenuBtn) {

        // Open More menu
        moreNavBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            moreMenu.classList.add("show");
        });

        // Close with X button
        closeMoreMenuBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            moreMenu.classList.remove("show");
        });

        // Close when clicking outside
        document.addEventListener("click", function(e) {
            if (moreMenu.classList.contains("show") &&
                !moreMenu.contains(e.target) &&
                !moreNavBtn.contains(e.target)) {
                moreMenu.classList.remove("show");
            }
        });

        // Settings button inside More
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
    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getPrayerTimes(lat, lon);
        },
        () => {
            locationName.innerHTML = "📍 Adilpur, Ghotki";
            getPrayerTimes(28.0065, 69.3167);
        }
    );
}

async function getPrayerTimes(latitude, longitude) {
    try {
        /* ======================================
           SAVE HOME LIVE LOCATION
           MASJID PAGE WILL USE THE SAME LOCATION
        ====================================== */
        localStorage.setItem("userLatitude", String(latitude));
        localStorage.setItem("userLongitude", String(longitude));

        /* ======================================
           GET PRAYER TIMES
        ====================================== */
        const response = await fetch(
            `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const result = await response.json();
        prayerTimes = result.data.timings;

        /* ======================================
           GET LOCATION NAME
        ====================================== */
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

        /* ======================================
           SAVE LIVE MAGHRIB
        ====================================== */
        if (result.data.timings && result.data.timings.Maghrib) {
            localStorage.setItem("liveMaghribAzan", result.data.timings.Maghrib);

            /* ======================================
               AUTO MAGHRIB JAMAAT
               MAGHRIB AZAN + 3 MINUTES
            ====================================== */
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

        /* ======================================
           ISLAMIC DATE
        ====================================== */
        islamicDate.innerHTML =
            result.data.date.hijri.weekday.en +
            ", " +
            result.data.date.hijri.day +
            " " +
            result.data.date.hijri.month.en +
            " " +
            result.data.date.hijri.year +
            " AH";

        /* ======================================
           UPDATE PRAYER UI
        ====================================== */
        showPrayerTimes();
        calculateNextPrayer();

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

    // Also reset alarmFired for this prayer so it can fire again with new time
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