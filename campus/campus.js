/* ==================================================
   MY PRAYER - QIBLA / CAMPUS
   CAMPUS.JS - COMPLETE ULTIMATE EDITION (WITH FALLBACK LOCATION)
================================================== */

/* ==================================================
   QIBLA CONSTANTS
================================================== */
const KAABA_LATITUDE = 21.422487;
const KAABA_LONGITUDE = 39.826206;

/* ==================================================
   DEFAULT LOCATION (ADILPUR, GHOTKI)
   Agar GPS fail ho jaye to yeh use hoga
================================================== */
const DEFAULT_LATITUDE = 28.0065;   // Adilpur/ Ghotki
const DEFAULT_LONGITUDE = 69.3167;  // Adilpur/ Ghotki
const DEFAULT_LOCATION_NAME = "Adilpur, Ghotki";

/* ==================================================
   GLOBAL VARIABLES
================================================== */
let currentLatitude = null;
let currentLongitude = null;

let currentQiblaBearing = null;
let currentDistance = null;

let currentHeading = null;

let qiblaMap = null;

let userMarker = null;
let kaabaMarker = null;
let qiblaLine = null;

let compassListening = false;
let compassHandler = null;

/* ==================================================
   DOM ELEMENTS
================================================== */
const locationName = document.getElementById("locationName");
const locationStatus = document.getElementById("locationStatus");
const locationRefreshBtn = document.getElementById("locationRefreshBtn");

const qiblaDegree = document.getElementById("qiblaDegree");
const qiblaBearingLive = document.getElementById("qiblaBearingLive");
const qiblaStatus = document.getElementById("qiblaStatus");
const qiblaArrow = document.getElementById("qiblaArrow");
const compassMessage = document.getElementById("compassMessage");
const calibrateBtn = document.getElementById("calibrateBtn");

const bearingValue = document.getElementById("bearingValue");
const distanceValue = document.getElementById("distanceValue");
const latitudeValue = document.getElementById("latitudeValue");
const longitudeValue = document.getElementById("longitudeValue");

const directionText = document.getElementById("directionText");
const directionDescription = document.getElementById("directionDescription");

const mapLocationBtn = document.getElementById("mapLocationBtn");

const campusMessage = document.getElementById("campusMessage");
const campusMessageTitle = document.getElementById("campusMessageTitle");
const campusMessageText = document.getElementById("campusMessageText");
const campusMessageBtn = document.getElementById("campusMessageBtn");

const campusHomeBtn = document.getElementById("campusHomeBtn");
const campusSettingsBtn = document.getElementById("campusSettingsBtn");
const campusSettingsPanel = document.getElementById("campusSettingsPanel");
const closeCampusSettingsBtn = document.getElementById("closeCampusSettingsBtn");
const settingsCalibrateBtn = document.getElementById("settingsCalibrateBtn");
const settingsLocationBtn = document.getElementById("settingsLocationBtn");

/* ==================================================
   NAVIGATION ELEMENTS
================================================== */
const moreNavBtn = document.getElementById("moreNavBtn");
const moreMenu = document.getElementById("moreMenu");
const moreBackLink = document.getElementById("moreBackLink");
const moreBackText = document.getElementById("moreBackText");

/* ==================================================
   UTILITY MATH FUNCTIONS
================================================== */
function normalizeAngle(angle){
    angle = Number(angle);
    if(isNaN(angle)){ return 0; }
    angle = angle % 360;
    if(angle < 0){ angle += 360; }
    return angle;
}

function angleDifference(a, b){
    let difference = normalizeAngle(a) - normalizeAngle(b);
    if(difference > 180){ difference -= 360; }
    if(difference < -180){ difference += 360; }
    return difference;
}

function calculateQiblaBearing(latitude, longitude){
    const lat1 = latitude * Math.PI / 180;
    const lat2 = KAABA_LATITUDE * Math.PI / 180;
    const deltaLongitude = (KAABA_LONGITUDE - longitude) * Math.PI / 180;

    const y = Math.sin(deltaLongitude) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLongitude);

    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = normalizeAngle(bearing);
    return bearing;
}

function calculateDistance(latitude, longitude){
    const earthRadius = 6371; // Kilometers
    const lat1 = latitude * Math.PI / 180;
    const lat2 = KAABA_LATITUDE * Math.PI / 180;
    const deltaLat = (KAABA_LATITUDE - latitude) * Math.PI / 180;
    const deltaLon = (KAABA_LONGITUDE - longitude) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
}

function getDirectionName(bearing){
    const directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
}

/* ==================================================
   LOCATION ERROR & MESSAGE
================================================== */
function showLocationError(message){
    if(locationStatus){ locationStatus.textContent = message; }
    showCampusMessage("Location Required", message);
}

function showCampusMessage(title, message){
    if(campusMessageTitle){ campusMessageTitle.textContent = title; }
    if(campusMessageText){ campusMessageText.textContent = message; }
    if(campusMessage){ campusMessage.style.display = "block"; }
}

function hideCampusMessage(){
    if(campusMessage){ campusMessage.style.display = "none"; }
}

/* ==================================================
   GET LOCATION (WITH FALLBACK TO ADILPUR)
================================================== */
function requestLocation(){
    hideCampusMessage();
    
    // Agar browser geolocation support nahi karta, toh direct fallback use karo
    if(!navigator.geolocation){
        useFallbackLocation("Geolocation not supported, using default location (Adilpur)");
        return;
    }

    if(locationName){ locationName.textContent = "Finding your location..."; }
    if(locationStatus){ locationStatus.textContent = "Please wait..."; }

    navigator.geolocation.getCurrentPosition(
        function(position){
            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude;

            updateLocationData();
            updateQiblaData();
            updateMap();
            getLocationName();
        },
        function(error){
            let message = "Unable to get your location.";
            if(error.code === 1){ message = "Location permission was denied. Using default location (Adilpur)."; }
            else if(error.code === 2){ message = "Your location is currently unavailable. Using default location (Adilpur)."; }
            else if(error.code === 3){ message = "Location request timed out. Using default location (Adilpur)."; }
            
            // Error par Default Adilpur coordinates set kar do
            useFallbackLocation(message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
}

/* ==================================================
   FALLBACK FUNCTION (ADILPUR)
================================================== */
function useFallbackLocation(message){
    if(locationStatus){ locationStatus.textContent = message; }
    
    // Set default coordinates for Adilpur
    currentLatitude = DEFAULT_LATITUDE;
    currentLongitude = DEFAULT_LONGITUDE;

    if(locationName){ locationName.textContent = DEFAULT_LOCATION_NAME; }

    updateLocationData();
    updateQiblaData();
    updateMap();
}

/* ==================================================
   UPDATE LOCATION & QIBLA DATA
================================================== */
function updateLocationData(){
    if(currentLatitude === null || currentLongitude === null){ return; }
    if(latitudeValue){ latitudeValue.textContent = currentLatitude.toFixed(6); }
    if(longitudeValue){ longitudeValue.textContent = currentLongitude.toFixed(6); }
}

function updateQiblaData(){
    if(currentLatitude === null || currentLongitude === null){ return; }

    currentQiblaBearing = calculateQiblaBearing(currentLatitude, currentLongitude);
    currentDistance = calculateDistance(currentLatitude, currentLongitude);

    if(bearingValue){ bearingValue.textContent = Math.round(currentQiblaBearing) + "°"; }
    if(qiblaBearingLive){ qiblaBearingLive.textContent = "Qibla Bearing: " + Math.round(currentQiblaBearing) + "°"; }

    // Distance Display (Ab yeh 3100 km hi dikhayega jab Adilpur par hoga)
    if(distanceValue){
        // Agar 1000 km se zyada hai toh "km" mein dikhao, warna "m" mein
        if(currentDistance >= 1000){
            distanceValue.textContent = Math.round(currentDistance) + " km"; 
        } else {
            distanceValue.textContent = Math.round(currentDistance * 1000) + " m";
        }
    }

    const direction = getDirectionName(currentQiblaBearing);
    if(directionText){ directionText.textContent = Math.round(currentQiblaBearing) + "° " + direction; }
    if(directionDescription){ directionDescription.textContent = "The Kaaba is approximately " + Math.round(currentQiblaBearing) + "° from your current location."; }
    if(qiblaStatus){ qiblaStatus.innerHTML = '<i class="fa-solid fa-compass"></i> Ready'; }

    updateCompassArrow();
}

/* ==================================================
   LOCATION NAME (REVERSE GEOCODING)
================================================== */
async function getLocationName(){
    if(currentLatitude === null || currentLongitude === null){ return; }

    // Agar default location use ho rahi hai toh naam change nahi karna
    if(currentLatitude === DEFAULT_LATITUDE && currentLongitude === DEFAULT_LONGITUDE){
        if(locationName){ locationName.textContent = DEFAULT_LOCATION_NAME; }
        return;
    }

    try{
        const response = await fetch(
            "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + currentLatitude +
            "&lon=" + currentLongitude + "&zoom=10&addressdetails=1",
            { headers: { "Accept-Language": "en" } }
        );

        if(!response.ok){ throw new Error("Location lookup failed"); }

        const data = await response.json();
        const address = data.address || {};

        const name = address.village || address.town || address.city || address.municipality || address.county || address.state || "Current Location";

        if(locationName){ locationName.textContent = name; }
        if(locationStatus){ locationStatus.textContent = "Location found"; }
    }
    catch(error){
        console.log("Location name error:", error);
        if(locationName){ locationName.textContent = "Current Location"; }
    }
}

/* ==================================================
   MAP INITIALIZE & UPDATE
================================================== */
function initializeMap(){
    const mapElement = document.getElementById("qiblaMap");
    if(!mapElement || typeof L === "undefined"){ return; }

    qiblaMap = L.map(mapElement).setView([KAABA_LATITUDE, KAABA_LONGITUDE], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(qiblaMap);

    const kaabaIcon = L.divIcon({ className: "kaaba-map-marker", html: '<i class="fa-solid fa-kaaba"></i>', iconSize: [36, 36], iconAnchor: [18, 18] });
    kaabaMarker = L.marker([KAABA_LATITUDE, KAABA_LONGITUDE], { icon: kaabaIcon }).addTo(qiblaMap).bindPopup("<strong>Kaaba</strong><br>Masjid al-Haram, Makkah");
}

function updateMap(){
    if(!qiblaMap || currentLatitude === null || currentLongitude === null){ return; }

    const userLatLng = [currentLatitude, currentLongitude];

    if(userMarker){
        userMarker.setLatLng(userLatLng);
    } else {
        const userIcon = L.divIcon({ className: "user-map-marker", html: '<i class="fa-solid fa-location-dot"></i>', iconSize: [36, 36], iconAnchor: [18, 18] });
        userMarker = L.marker(userLatLng, { icon: userIcon }).addTo(qiblaMap).bindPopup("Your Location");
    }

    if(qiblaLine){ qiblaMap.removeLayer(qiblaLine); }
    qiblaLine = L.polyline([userLatLng, [KAABA_LATITUDE, KAABA_LONGITUDE]], { color: "#d4af37", weight: 4, opacity: .85, dashArray: "10,8" }).addTo(qiblaMap);

    const bounds = L.latLngBounds([userLatLng, [KAABA_LATITUDE, KAABA_LONGITUDE]]);
    qiblaMap.fitBounds(bounds, { padding: [35, 35] });
}

function goToMyLocation(){
    if(!qiblaMap || currentLatitude === null || currentLongitude === null){ requestLocation(); return; }
    qiblaMap.setView([currentLatitude, currentLongitude], 16, { animate: true });
    if(userMarker){ userMarker.openPopup(); }
}

/* ==================================================
   COMPASS ARROW & ORIENTATION
================================================== */
function updateCompassArrow(){
    if(currentQiblaBearing === null || currentHeading === null){ return; }

    const rotation = angleDifference(currentQiblaBearing, currentHeading);
    if(qiblaArrow){ qiblaArrow.style.transform = "rotate(" + rotation + "deg)"; }
    if(qiblaDegree){ qiblaDegree.textContent = Math.round(normalizeAngle(currentHeading)); }

    if(compassMessage){
        if(Math.abs(rotation) <= 5){ compassMessage.textContent = "You are facing the Qibla"; }
        else if(rotation > 0){ compassMessage.textContent = "Turn right toward the Qibla"; }
        else{ compassMessage.textContent = "Turn left toward the Qibla"; }
    }
}

function handleOrientation(event){
    let heading = null;
    if(typeof event.webkitCompassHeading === "number"){ heading = event.webkitCompassHeading; }
    else if(typeof event.alpha === "number"){ heading = 360 - event.alpha; }

    if(heading === null || isNaN(heading)){ return; }
    currentHeading = normalizeAngle(heading);
    updateCompassArrow();
}

async function startCompass(){
    if(compassListening){ return; }
    try{
        if(typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function"){
            const permission = await DeviceOrientationEvent.requestPermission();
            if(permission !== "granted"){
                if(compassMessage){ compassMessage.textContent = "Compass permission was denied."; }
                return;
            }
        }
        compassHandler = handleOrientation;
        window.addEventListener("deviceorientation", compassHandler, true);
        compassListening = true;
        if(qiblaStatus){ qiblaStatus.innerHTML = '<i class="fa-solid fa-compass"></i> Live'; }
        if(compassMessage){ compassMessage.textContent = "Move your phone to find the Qibla"; }
        if(calibrateBtn){ calibrateBtn.innerHTML = '<i class="fa-solid fa-compass"></i> Compass Enabled'; }
    }
    catch(error){
        console.log("Compass permission error:", error);
        if(compassMessage){ compassMessage.textContent = "Unable to start compass."; }
    }
}

function stopCompass(){
    if(compassListening && compassHandler){ window.removeEventListener("deviceorientation", compassHandler, true); }
    compassListening = false;
    compassHandler = null;
}

function calibrateCompass(){ startCompass(); }

/* ==================================================
   SETTINGS PANEL
================================================== */
function openCampusSettings(){
    closeMoreMenu();
    if(campusSettingsPanel){ campusSettingsPanel.style.display = "block"; }
}

function closeCampusSettings(){
    if(campusSettingsPanel){ campusSettingsPanel.style.display = "none"; }
}

function setupCampusButtons(){
    // Home
    if(campusHomeBtn){
        campusHomeBtn.addEventListener("click", function(){ closeMoreMenu(); window.location.href = "../index.html"; });
    }

    // Refresh Location
    if(locationRefreshBtn){
        locationRefreshBtn.addEventListener("click", function(){ closeMoreMenu(); requestLocation(); });
    }

    // Map Location
    if(mapLocationBtn){
        mapLocationBtn.addEventListener("click", function(){ closeMoreMenu(); goToMyLocation(); });
    }

    // Calibrate
    if(calibrateBtn){
        calibrateBtn.addEventListener("click", function(){ closeMoreMenu(); calibrateCompass(); });
    }

    // Message Try Again
    if(campusMessageBtn){
        campusMessageBtn.addEventListener("click", function(){ hideCampusMessage(); requestLocation(); });
    }

    // Settings
    if(campusSettingsBtn){
        campusSettingsBtn.addEventListener("click", function(){ closeMoreMenu(); openCampusSettings(); });
    }

    // Close Settings
    if(closeCampusSettingsBtn){
        closeCampusSettingsBtn.addEventListener("click", function(){ closeCampusSettings(); });
    }

    // Settings Calibrate
    if(settingsCalibrateBtn){
        settingsCalibrateBtn.addEventListener("click", function(){ closeCampusSettings(); calibrateCompass(); });
    }

    // Settings Location
    if(settingsLocationBtn){
        settingsLocationBtn.addEventListener("click", function(){ closeCampusSettings(); requestLocation(); });
    }

    const settingsOverlay = document.querySelector(".settings-overlay");
    if(settingsOverlay){
        settingsOverlay.addEventListener("click", function(){ closeCampusSettings(); });
    }
}

/* ==================================================
   MORE NAVIGATION
================================================== */
function setupMoreNavigation(){
    if(!moreNavBtn || !moreMenu){ return; }

    moreNavBtn.addEventListener("click", function(event){
        event.stopPropagation();
        moreMenu.classList.toggle("show");
    });

    moreMenu.addEventListener("click", function(event){ event.stopPropagation(); });

    document.addEventListener("click", function(){ closeMoreMenu(); });
    document.addEventListener("touchstart", function(event){
        if(!moreMenu.contains(event.target) && !moreNavBtn.contains(event.target)){
            closeMoreMenu();
        }
    }, { passive: true });

    setupPreviousPage();
}

function closeMoreMenu(){
    if(moreMenu){ moreMenu.classList.remove("show"); }
}

function setupPreviousPage(){
    if(!moreBackLink || !moreBackText){ return; }
    const referrer = document.referrer || "";
    let pageName = "";
    let pageUrl = "";

    if(referrer.includes("/dua/") || referrer.includes("duas.html")){ pageName = "Duas"; pageUrl = "../dua/duas.html"; }
    else if(referrer.includes("/quran/") || referrer.includes("quran.html")){ pageName = "Quran"; pageUrl = "../quran/quran.html"; }
    else if(referrer.includes("/names/") || referrer.includes("names.html")){ pageName = "99 Names"; pageUrl = "../names/names.html"; }
    else if(referrer.includes("/tasbeeh/") || referrer.includes("tasbeeh.html")){ pageName = "Tasbeeh"; pageUrl = "../tasbeeh/tasbeeh.html"; }
    else if(referrer.includes("index.html") || referrer.endsWith("/")){ pageName = "Home"; pageUrl = "../index.html"; }

    if(pageName && pageUrl){
        moreBackText.textContent = "Back to " + pageName;
        moreBackLink.href = pageUrl;
        moreBackLink.style.display = "flex";
    } else {
        moreBackLink.style.display = "none";
    }
}

/* ==================================================
   THEME SUPPORT
================================================== */
function setupThemeSupport(){
    const savedTheme = localStorage.getItem("appTheme");
    if(savedTheme && document.body){ document.body.dataset.theme = savedTheme; }
}

/* ==================================================
   COMPASS SETUP
================================================== */
function setupCompass(){
    if(typeof DeviceOrientationEvent !== "undefined"){
        window.addEventListener("deviceorientation", function(){
            if(!compassListening){ return; }
        }, true);
    }
}

/* ==================================================
   STOP/START COMPASS ON PAGE VISIBILITY
================================================== */
document.addEventListener("visibilitychange", function(){
    if(document.hidden){ stopCompass(); }
});

window.addEventListener("pageshow", function(){
    if(currentQiblaBearing !== null){ startCompass(); }
});

/* ==================================================
   DOUBLE TAP TO CHANGE LOCATION NAME (MANUAL OVERRIDE)
================================================== */
let lastTapTime = 0;

if(locationName){
    locationName.addEventListener("click", function() {
        const currentTime = new Date().getTime();
        const timeSinceLastTap = currentTime - lastTapTime;

        if(timeSinceLastTap < 400 && timeSinceLastTap > 0) {
            const userLocation = prompt("Apni location ka naam likhein (Jaise: Adilpur):", locationName.textContent);
            if(userLocation && userLocation.trim() !== "") {
                locationName.textContent = userLocation.trim();
                localStorage.setItem("manualLocationName", userLocation.trim());
                if(locationStatus){
                    locationStatus.textContent = "Manually Updated";
                }
            }
        }
        lastTapTime = currentTime;
    });

    const savedName = localStorage.getItem("manualLocationName");
    if(savedName) {
        locationName.textContent = savedName;
    }
}

/* ==================================================
   INITIALIZE APP
================================================== */
function initializeCampus(){
    console.log("My Prayer Qibla started");
    initializeMap();
    setupCampusButtons();
    setupMoreNavigation();
    setupCompass();
    setupThemeSupport();
    requestLocation();
}

/* ==================================================
   START APP
================================================== */
if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initializeCampus);
} else {
    initializeCampus();
}