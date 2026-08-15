"use strict";
let prayerTimes = {}; let jamaatTimes = {}; let currentPrayer = "";
const clock = document.getElementById("clock");
const date = document.getElementById("date");
const islamicDate = document.getElementById("islamic-date");
const locationName = document.getElementById("locationName");
const countdown = document.getElementById("countdown");

// MORE MENU ELEMENTS
const moreNavBtn = document.getElementById("moreNavBtn");
const moreMenu = document.getElementById("moreMenu");
const settingsBtn = document.getElementById("settingsBtn");

document.addEventListener("DOMContentLoaded", () => {
    updateClock(); setInterval(updateClock,1000);
    loadTodayDate(); loadSavedJamaat();
    detectLocation();

    // More Menu Logic
    if(moreNavBtn && moreMenu) {
        moreNavBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            moreMenu.classList.toggle("show");
        });
        document.addEventListener("click", (e) => {
            if(!moreMenu.contains(e.target) && !moreNavBtn.contains(e.target)) {
                moreMenu.classList.remove("show");
            }
        });
    }
    if(settingsBtn) {
        settingsBtn.addEventListener("click", () => {
            moreMenu.classList.remove("show");
            alert("Settings will be available in the next update.");
        });
    }
});

function updateClock(){
    const now = new Date();
    clock.innerHTML = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function loadTodayDate(){
    const today = new Date();
    date.innerHTML = today.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    islamicDate.innerHTML = "Loading Islamic Date...";
}

function detectLocation(){
    if(!navigator.geolocation){
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

async function getPrayerTimes(latitude, longitude){
    try{
        const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
        const result = await response.json();
        prayerTimes = result.data.timings;
        try{
            const locRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            const locData = await locRes.json();
            const address = locData.address || {};
            const name = address.village || address.town || address.city || address.county || "Adilpur, Ghotki";
            locationName.innerHTML = "📍 " + name;
        } catch{ locationName.innerHTML = "📍 Adilpur, Ghotki"; }

        islamicDate.innerHTML = result.data.date.hijri.weekday.en + ", " + result.data.date.hijri.day + " " + result.data.date.hijri.month.en + " " + result.data.date.hijri.year + " AH";
        showPrayerTimes(); calculateNextPrayer();
    }
    catch(error){ console.log(error); }
}

function showPrayerTimes(){
    function formatPrayerTime(time){
        if(!time) return "--:--";
        const parts = time.split(":");
        let hours = parseInt(parts[0]); const minutes = parts[1];
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12; if(hours === 0){ hours = 12; }
        return String(hours).padStart(2,"0") + ":" + minutes + " " + ampm;
    }
    document.getElementById("fajr").innerHTML = formatPrayerTime(prayerTimes.Fajr);
    document.getElementById("dhuhr").innerHTML = formatPrayerTime(prayerTimes.Dhuhr);
    document.getElementById("asr").innerHTML = formatPrayerTime(prayerTimes.Asr);
    document.getElementById("maghrib").innerHTML = formatPrayerTime(prayerTimes.Maghrib);
    document.getElementById("isha").innerHTML = formatPrayerTime(prayerTimes.Isha);
}

function calculateNextPrayer(){
    const prayers = [ {name:"Fajr", time:prayerTimes.Fajr}, {name:"Dhuhr", time:prayerTimes.Dhuhr}, {name:"Asr", time:prayerTimes.Asr}, {name:"Maghrib", time:prayerTimes.Maghrib}, {name:"Isha", time:prayerTimes.Isha} ];
    const now = new Date(); let next = null;
    for(const prayer of prayers){
        const parts = prayer.time.split(":");
        const prayerDate = new Date();
        prayerDate.setHours(parseInt(parts[0]), parseInt(parts[1]), 0, 0);
        if(prayerDate > now){ next = { name: prayer.name, date: prayerDate, jamaat: jamaatTimes[prayer.name] || "" }; break; }
    }
    if(!next){
        const fajr = prayerTimes.Fajr.split(":");
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(parseInt(fajr[0]), parseInt(fajr[1]), 0, 0);
        next = { name: "Fajr", date: tomorrow, jamaat: jamaatTimes["Fajr"] || "" };
    }
    currentPrayer = next.name;
    document.getElementById("nextPrayerName").innerHTML = currentPrayer;

    const nextPrayerJamaat = document.getElementById("nextPrayerJamaat");
    if(nextPrayerJamaat){
        const time = next.jamaat;
        if(time){
            const parts = time.split(":"); let hours = parseInt(parts[0]); const minutes = parts[1];
            const ampm = hours >= 12 ? "PM" : "AM"; hours = hours % 12; if(hours === 0){ hours = 12; }
            nextPrayerJamaat.innerHTML = String(hours).padStart(2,"0") + ":" + minutes + " " + ampm;
        } else { nextPrayerJamaat.innerHTML = "--:--"; }
    }
    startCountdown(next.date);
}

let countdownInterval = null;
function startCountdown(nextPrayerTime){
    if(countdownInterval){ clearInterval(countdownInterval); }
    countdownInterval = setInterval(() => {
        const now = new Date(); const difference = nextPrayerTime - now;
        if(difference <= 0){ clearInterval(countdownInterval); calculateNextPrayer(); return; }
        const hours = Math.floor(difference / 3600000);
        const minutes = Math.floor((difference % 3600000) / 60000);
        const seconds = Math.floor((difference % 60000) / 1000);
        countdown.innerHTML = String(hours).padStart(2,"0") + ":" + String(minutes).padStart(2,"0") + ":" + String(seconds).padStart(2,"0");
    },1000);
}

let selectedPrayer = "";
function editJamaat(prayer){ selectedPrayer = prayer; document.getElementById("selectedPrayer").innerText = prayer; document.getElementById("jamaatTimeInput").value = jamaatTimes[prayer] || ""; document.getElementById("jamaatModal").style.display = "flex"; }
function closeJamaatModal(){ document.getElementById("jamaatModal").style.display = "none"; }
function saveJamaatTime(){ const time = document.getElementById("jamaatTimeInput").value; if(time === "") return; jamaatTimes[selectedPrayer] = time; localStorage.setItem("jamaatTimes", JSON.stringify(jamaatTimes)); updateJamaatUI(); closeJamaatModal(); }
function loadSavedJamaat(){ const saved = localStorage.getItem("jamaatTimes"); if(saved){ jamaatTimes = JSON.parse(saved); } updateJamaatUI(); }
function updateJamaatUI(){
    ["Fajr","Dhuhr","Asr","Maghrib","Isha"].forEach(prayer => {
        const element = document.getElementById(prayer.toLowerCase() + "Jamaat");
        if(element){
            const time = jamaatTimes[prayer];
            if(time){ const parts = time.split(":"); let hours = parseInt(parts[0]); const minutes = parts[1]; const ampm = hours >= 12 ? "PM" : "AM"; hours = hours % 12; if(hours === 0){ hours = 12; } element.innerHTML = String(hours).padStart(2,"0") + ":" + minutes + " " + ampm; }
            else { element.innerHTML = "--:--"; }
        }
    });
}

const notificationModal = document.getElementById("notificationModal");
const notificationButton = document.getElementById("notificationBtn");
const enableNotification = document.getElementById("enableNotification");
notificationButton.addEventListener("click",()=>{ notificationModal.style.display = "flex"; });
function closeNotificationModal(){ notificationModal.style.display = "none"; }
enableNotification.addEventListener("click",async()=>{ if(!("Notification" in window)){ alert("Notification is not supported."); return; } const permission = await Notification.requestPermission(); if(permission === "granted"){ alert("Prayer Notifications Enabled."); }else{ alert("Notification Permission Denied."); } closeNotificationModal(); });

window.addEventListener("click",(event)=>{ if(event.target === notificationModal){ closeNotificationModal(); } if(event.target === document.getElementById("jamaatModal")){ closeJamaatModal(); } });
window.addEventListener("load",()=>{ setTimeout(()=>{ document.getElementById("loadingScreen").style.display="none"; },1200); });
setInterval(()=>{ if(Object.keys(prayerTimes).length>0){ calculateNextPrayer(); } },60000);