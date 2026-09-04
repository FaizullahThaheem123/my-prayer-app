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
        if (azanAudio) {
            azanAudio.pause();
            azanAudio.currentTime = 0;
        }
        azanAudio = new Audio('audio/azan.mp3');
        azanAudio.volume = 0.8;
        azanAudio.loop = false;
        azanAudio.play().then(() => {
            isAzanPlaying = true;
            console.log('🔊 Azan playing...');
        }).catch((error) => {
            console.log('Azan play error:', error);
            fallbackAzanAlert();
        });
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

function fallbackAzanAlert() {
    showToast('🔔 اذان کا وقت ہو گیا!');
    if (Notification.permission === "granted") {
        new Notification("🕌 نماز کا وقت", {
            body: "اذان ہو رہی ہے! نماز پڑھیں۔",
            icon: "images/makkah.png"
        });
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

function toggleAlarm(prayer) {
    alarms[prayer] = !alarms[prayer];
    localStorage.setItem("prayerAlarms", JSON.stringify(alarms));
    initAlarms();
    if (!alarms[prayer] && isAzanPlaying) {
        stopAzan();
    }
}

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
            if (alarms[prayer] === true) {
                playAzan();
            }
            if (Notification.permission === "granted") {
                new Notification(`🕌 ${prayer} نماز کا وقت`, {
                    body: `${prayer} کی اذان ہو رہی ہے! نماز پڑھیں۔`,
                    icon: "images/makkah.png"
                });
            }
            alarmFired[key] = true;
            localStorage.setItem("alarmFired", JSON.stringify(alarmFired));
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
// HIJRI MONTHS
// ======================================
const hijriMonths = [
    "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

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
    setInterval(checkAlarms, 10000);
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
    initAutoTheme();
    fetchDailyAyah();
    document.getElementById('refreshAyahBtn').addEventListener('click', fetchDailyAyah);
    setInterval(fetchDailyAyah, 86400000);
    fetchDailyHadith();
    document.getElementById('refreshHadithBtn').addEventListener('click', refreshHadith);
    setTimeout(calculateIslamicEvents, 1500);
    setInterval(calculateIslamicEvents, 600000);
    renderAdhkar('morning');
    document.getElementById('adhkarMorningBtn').addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('adhkarEveningBtn').classList.remove('active');
        currentAdhkarType = 'morning';
        renderAdhkar('morning');
    });
    document.getElementById('adhkarEveningBtn').addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('adhkarMorningBtn').classList.remove('active');
        currentAdhkarType = 'evening';
        renderAdhkar('evening');
    });
    document.getElementById('adhkarResetBtn').addEventListener('click', resetAdhkar);
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
    const timeStr = String(hours).padStart(2, "0") + ":" + minutes + ":" + seconds;
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
            const name = address.village || address.town || address.city || address.municipality || address.county || "Adilpur, Ghotki";
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
            const autoMaghribJamaat = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0");
            jamaatTimes["Maghrib"] = autoMaghribJamaat;
            localStorage.setItem("jamaatTimes", JSON.stringify(jamaatTimes));
            updateJamaatUI();
        }
        islamicDate.innerHTML = result.data.date.hijri.weekday.en + ", " + result.data.date.hijri.day + " " + result.data.date.hijri.month.en + " " + result.data.date.hijri.year + " AH";
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

function loadThemeOnIndex() {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
        document.body.className = 'theme-' + savedTheme;
    } else {
        document.body.className = 'theme-gold';
    }
}
loadThemeOnIndex();

// ==========================================================
// AUTO DARK/LIGHT MODE
// ==========================================================
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

// ==========================================================
// DAILY AYAH WIDGET
// ==========================================================
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

// ==========================================================
// HADITH OF THE DAY
// ==========================================================
const hadiths = [
    {
        arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
        urdu: "اعمال کا دارومدار نیتوں پر ہے، اور ہر شخص کو وہی ملتا ہے جو اس نے نیت کی۔",
        ref: "Sahih Bukhari & Muslim"
    },
    {
        arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
        urdu: "جو اللہ اور آخرت پر ایمان رکھتا ہے، وہ بھلی بات کرے یا خاموش رہے۔",
        ref: "Sahih Bukhari & Muslim"
    },
    {
        arabic: "أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
        urdu: "اللہ کو سب سے زیادہ پسند وہ عمل ہے جو تھوڑا ہو لیکن مستقل ہو۔",
        ref: "Sahih Bukhari & Muslim"
    },
    {
        arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
        urdu: "مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں۔",
        ref: "Sahih Bukhari & Muslim"
    },
    {
        arabic: "لَا تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا، وَلَوْ أَنْ تَلْقَى أَخَاكَ بِوَجْهٍ طَلْقٍ",
        urdu: "کسی نیکی کو حقیر نہ سمجھو، چاہے وہ اپنے بھائی کو مسکرا کر ملنا ہی ہو۔",
        ref: "Sahih Muslim"
    },
    {
        arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
        urdu: "علم حاصل کرنا ہر مسلمان پر فرض ہے۔",
        ref: "Sunan Ibn Majah"
    },
    {
        arabic: "الدُّعَاءُ هُوَ الْعِبَادَةُ",
        urdu: "دعا ہی عبادت ہے۔",
        ref: "Sunan Abu Dawood"
    },
    {
        arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
        urdu: "جو شخص علم حاصل کرنے کے لیے راستہ اختیار کرتا ہے، اللہ اس کے لیے جنت کا راستہ آسان کر دیتا ہے۔",
        ref: "Sahih Muslim"
    },
    {
        arabic: "أَفْضَلُ الذِّكْرِ لَا إِلَهَ إِلَّا اللَّهُ",
        urdu: "سب سے بہترین ذکر 'لا إله إلا الله' ہے۔",
        ref: "Sunan al-Tirmidhi"
    },
    {
        arabic: "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ",
        urdu: "اللہ تعالیٰ پسند فرماتا ہے کہ جب تم میں سے کوئی کام کرے تو اسے اچھی طرح کرے۔",
        ref: "Sahih al-Jami"
    }
];

let currentHadithIndex = 0;

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

// ==========================================================
// ISLAMIC EVENTS COUNTDOWN
// ==========================================================
function calculateIslamicEvents() {
    const islamicDateStr = document.getElementById('islamic-date').textContent;
    let hijriYear = 1448, hijriMonth = 1, hijriDay = 1;
    try {
        const parts = islamicDateStr.split(' ');
        if (parts.length >= 3) {
            const monthIndex = hijriMonths.indexOf(parts[2]);
            if (monthIndex !== -1) {
                hijriMonth = monthIndex + 1;
                hijriDay = parseInt(parts[1]);
                hijriYear = parseInt(parts[3]);
            }
        }
    } catch(e) {}

    const events = [
        { name: 'Ramadan', month: 9, day: 1, emoji: '🌙', id: 'ramadanDays' },
        { name: 'Eid al-Fitr', month: 10, day: 1, emoji: '🎉', id: 'eidFitrDays' },
        { name: 'Day of Arafah', month: 12, day: 9, emoji: '🤲', id: 'arafahDays' },
        { name: 'Eid al-Adha', month: 12, day: 10, emoji: '🐐', id: 'eidAdhaDays' }
    ];

    events.forEach(event => {
        let days = daysUntilHijri(hijriYear, hijriMonth, hijriDay, event.month, event.day);
        if (days < 0) {
            days = daysUntilHijri(hijriYear + 1, hijriMonth, hijriDay, event.month, event.day);
        }
        document.getElementById(event.id).textContent = days >= 0 ? days : '--';
    });
}

function daysUntilHijri(currentYear, currentMonth, currentDay, targetMonth, targetDay) {
    const daysInMonth = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    let days = 0;
    if (targetMonth < currentMonth || (targetMonth === currentMonth && targetDay < currentDay)) {
        for (let m = currentMonth - 1; m < 12; m++) {
            days += daysInMonth[m] || 30;
        }
        for (let m = 0; m < targetMonth - 1; m++) {
            days += daysInMonth[m] || 30;
        }
        days += targetDay;
        days -= currentDay;
        return days;
    } else {
        for (let m = currentMonth - 1; m < targetMonth - 1; m++) {
            days += daysInMonth[m] || 30;
        }
        days += targetDay - currentDay;
        return days;
    }
}

// ==========================================================
// MORNING & EVENING ADHKAR
// ==========================================================
const adhkarData = {
    morning: [
        { text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ", count: 1 },
        { text: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا", count: 1 },
        { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 100 },
        { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", count: 100 },
        { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", count: 10 }
    ],
    evening: [
        { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ", count: 1 },
        { text: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا", count: 1 },
        { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 100 },
        { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", count: 100 },
        { text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ", count: 1 }
    ]
};

let currentAdhkarType = 'morning';
let adhkarState = JSON.parse(localStorage.getItem('adhkarState')) || {
    morning: {},
    evening: {}
};

function renderAdhkar(type) {
    const list = document.getElementById('adhkarList');
    const items = adhkarData[type];
    list.innerHTML = '';
    items.forEach((item, index) => {
        const key = type + '_' + index;
        const isDone = adhkarState[type] && adhkarState[type][index] === true;
        const div = document.createElement('div');
        div.className = 'adhkar-item' + (isDone ? ' done' : '');
        div.innerHTML = `
            <span class="adhkar-check">${isDone ? '✅' : '⬜'}</span>
            <span class="adhkar-text">${item.text}</span>
            <span class="adhkar-count">${item.count}x</span>
        `;
        div.addEventListener('click', () => toggleAdhkar(type, index));
        list.appendChild(div);
    });
}

function toggleAdhkar(type, index) {
    if (!adhkarState[type]) adhkarState[type] = {};
    adhkarState[type][index] = !adhkarState[type][index];
    localStorage.setItem('adhkarState', JSON.stringify(adhkarState));
    renderAdhkar(type);
}

function resetAdhkar() {
    if (!confirm('Reset all Adhkar progress?')) return;
    adhkarState = { morning: {}, evening: {} };
    localStorage.setItem('adhkarState', JSON.stringify(adhkarState));
    renderAdhkar(currentAdhkarType);
}