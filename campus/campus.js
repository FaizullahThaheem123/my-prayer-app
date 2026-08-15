/* ==================================================
   CAMPUS.JS - COMPLETE ULTIMATE EDITION
================================================== */

const KAABA_LATITUDE = 21.422487;
const KAABA_LONGITUDE = 39.826206;
const DEFAULT_LATITUDE = 28.0065;
const DEFAULT_LONGITUDE = 69.3167;
const DEFAULT_LOCATION_NAME = "Adilpur, Ghotki";

let currentLatitude = null, currentLongitude = null, currentQiblaBearing = null, currentDistance = null, currentHeading = null;
let qiblaMap = null, userMarker = null, kaabaMarker = null, qiblaLine = null;
let compassListening = false, compassHandler = null;

const locationName = document.getElementById("locationName");
const locationRefreshBtn = document.getElementById("locationRefreshBtn");
const qiblaDegree = document.getElementById("qiblaDegree");
const qiblaStatus = document.getElementById("qiblaStatus");
const qiblaArrow = document.getElementById("qiblaArrow");
const compassMessage = document.getElementById("compassMessage");
const calibrateBtn = document.getElementById("calibrateBtn");
const bearingValue = document.getElementById("bearingValue");
const distanceValue = document.getElementById("distanceValue");
const latitudeValue = document.getElementById("latitudeValue");
const longitudeValue = document.getElementById("longitudeValue");
const mapLocationBtn = document.getElementById("mapLocationBtn");
const campusMessage = document.getElementById("campusMessage");
const campusMessageTitle = document.getElementById("campusMessageTitle");
const campusMessageText = document.getElementById("campusMessageText");
const campusMessageBtn = document.getElementById("campusMessageBtn");
const campusSettingsBtn = document.getElementById("campusSettingsBtn");
const campusSettingsPanel = document.getElementById("campusSettingsPanel");
const closeCampusSettingsBtn = document.getElementById("closeCampusSettingsBtn");
const settingsCalibrateBtn = document.getElementById("settingsCalibrateBtn");
const settingsLocationBtn = document.getElementById("settingsLocationBtn");
const moreNavBtn = document.getElementById("moreNavBtn");
const moreMenu = document.getElementById("moreMenu");

// ======================================
// UTILITY FUNCTIONS
// ======================================
function normalizeAngle(angle){ angle = Number(angle); if(isNaN(angle)) return 0; angle = angle % 360; if(angle < 0) angle += 360; return angle; }
function angleDifference(a, b){ let d = normalizeAngle(a) - normalizeAngle(b); if(d > 180) d -= 360; if(d < -180) d += 360; return d; }
function calculateQiblaBearing(lat, lng){
    const l1 = lat * Math.PI / 180, l2 = KAABA_LATITUDE * Math.PI / 180;
    const dLng = (KAABA_LONGITUDE - lng) * Math.PI / 180;
    const y = Math.sin(dLng) * Math.cos(l2), x = Math.cos(l1) * Math.sin(l2) - Math.sin(l1) * Math.cos(l2) * Math.cos(dLng);
    return normalizeAngle(Math.atan2(y, x) * 180 / Math.PI);
}
function calculateDistance(lat, lng){
    const R = 6371, l1 = lat * Math.PI/180, l2 = KAABA_LATITUDE * Math.PI/180;
    const dLat = (KAABA_LATITUDE - lat) * Math.PI/180, dLng = (KAABA_LONGITUDE - lng) * Math.PI/180;
    const a = Math.sin(dLat/2)**2 + Math.cos(l1) * Math.cos(l2) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
function getDirectionName(b){ const dirs = ["North","North-East","East","South-East","South","South-West","West","North-West"]; return dirs[Math.round(b/45)%8]; }

function showLocationError(m){ if(campusMessageTitle) campusMessageTitle.textContent = "Location Required"; if(campusMessageText) campusMessageText.textContent = m; if(campusMessage) campusMessage.style.display = "block"; }
function hideCampusMessage(){ if(campusMessage) campusMessage.style.display = "none"; }

function requestLocation(){
    hideCampusMessage();
    if(!navigator.geolocation){ useFallbackLocation("Geolocation not supported"); return; }
    if(locationName) locationName.textContent = "Finding...";
    navigator.geolocation.getCurrentPosition(
        (pos) => { currentLatitude = pos.coords.latitude; currentLongitude = pos.coords.longitude; updateAll(); getLocationName(); },
        () => { useFallbackLocation("GPS Error. Using Adilpur."); },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
}

function useFallbackLocation(msg){
    currentLatitude = DEFAULT_LATITUDE; currentLongitude = DEFAULT_LONGITUDE;
    if(locationName) locationName.textContent = DEFAULT_LOCATION_NAME;
    updateAll();
}

function updateAll(){
    updateLocationData(); updateQiblaData(); updateMap();
}

function updateLocationData(){
    if(latitudeValue) latitudeValue.textContent = currentLatitude.toFixed(4) + "°N";
    if(longitudeValue) longitudeValue.textContent = currentLongitude.toFixed(4) + "°E";
}

function updateQiblaData(){
    if(!currentLatitude || !currentLongitude) return;
    currentQiblaBearing = calculateQiblaBearing(currentLatitude, currentLongitude);
    currentDistance = calculateDistance(currentLatitude, currentLongitude);
    if(bearingValue) bearingValue.textContent = Math.round(currentQiblaBearing) + "°";
    if(distanceValue) distanceValue.textContent = Math.round(currentDistance) + " km";
    if(qiblaStatus) qiblaStatus.textContent = "LIVE";
    updateCompassArrow();
}

async function getLocationName(){
    if(!currentLatitude || !currentLongitude) return;
    if(currentLatitude === DEFAULT_LATITUDE && currentLongitude === DEFAULT_LONGITUDE) return;
    try{
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${currentLatitude}&lon=${currentLongitude}&zoom=10&addressdetails=1`, { headers: { "Accept-Language": "en" } });
        if(!res.ok) throw new Error();
        const data = await res.json(); const addr = data.address || {};
        let name = addr.village || addr.town || addr.city || addr.municipality || addr.county || addr.state || "Current Location";

        // *** FIX: Adilpur/Ghotki کا مسئلہ حل کرنا ***
        if (currentLatitude && currentLongitude) {
            // Adilpur کے کوآرڈینیٹس
            const adilpurLat = 28.0065;
            const adilpurLng = 69.3167;
            // موجودہ لوکیشن سے Adilpur کا تخمینی فاصلہ (ڈگریوں میں)
            const distanceInDeg = Math.sqrt(Math.pow(currentLatitude - adilpurLat, 2) + Math.pow(currentLongitude - adilpurLng, 2));
            // 1 ڈگری تقریباً 111 کلومیٹر کے برابر ہوتی ہے، اس لیے 0.1 ڈگری ~ 11 کلومیٹر
            if (distanceInDeg < 0.12 && name.toLowerCase() === "ghotki") {
                name = "Adilpur, Ghotki";
            }
        }

        if(locationName) locationName.textContent = name;
    } catch(e){ if(locationName) locationName.textContent = "Current Location"; }
}

function initializeMap(){
    const el = document.getElementById("qiblaMap");
    if(!el || typeof L === "undefined") return;
    qiblaMap = L.map(el).setView([KAABA_LATITUDE, KAABA_LONGITUDE], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(qiblaMap);
    const ik = L.divIcon({ className: "", html: '<i class="fa-solid fa-kaaba" style="color:#d4af37;font-size:24px;"></i>', iconSize: [24,24], iconAnchor: [12,12] });
    kaabaMarker = L.marker([KAABA_LATITUDE, KAABA_LONGITUDE], { icon: ik }).addTo(qiblaMap);
}
function updateMap(){
    if(!qiblaMap || !currentLatitude || !currentLongitude) return;
    const ll = [currentLatitude, currentLongitude];
    if(userMarker) userMarker.setLatLng(ll);
    else {
        const ui = L.divIcon({ className: "", html: '<i class="fa-solid fa-location-dot" style="color:#d4af37;font-size:24px;"></i>', iconSize: [24,24], iconAnchor: [12,12] });
        userMarker = L.marker(ll, { icon: ui }).addTo(qiblaMap);
    }
    if(qiblaLine) qiblaMap.removeLayer(qiblaLine);
    qiblaLine = L.polyline([ll, [KAABA_LATITUDE, KAABA_LONGITUDE]], { color: "#d4af37", weight: 2, dashArray: "6,6" }).addTo(qiblaMap);
    qiblaMap.fitBounds(L.latLngBounds([ll, [KAABA_LATITUDE, KAABA_LONGITUDE]]), { padding: [30,30] });
}
function goToMyLocation(){
    if(!qiblaMap || !currentLatitude || !currentLongitude) requestLocation();
    else qiblaMap.setView([currentLatitude, currentLongitude], 14, { animate: true });
}

// ======================================
// COMPASS LOGIC
// ======================================
function updateCompassArrow(){
    if(currentQiblaBearing === null || currentHeading === null) return;
    const rotation = angleDifference(currentQiblaBearing, currentHeading);
    if(qiblaArrow) qiblaArrow.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    if(qiblaDegree) qiblaDegree.textContent = Math.round(normalizeAngle(currentHeading));
    if(compassMessage) {
        if(Math.abs(rotation) <= 3) compassMessage.textContent = "You are facing the Qibla!";
        else if(rotation > 0) compassMessage.textContent = "Turn right toward the Qibla";
        else compassMessage.textContent = "Turn left toward the Qibla";
    }
}

function handleOrientation(e){
    let h = null;
    if(typeof e.webkitCompassHeading === "number") h = e.webkitCompassHeading;
    else if(typeof e.alpha === "number") h = 360 - e.alpha;
    if(h === null || isNaN(h)) return;
    currentHeading = normalizeAngle(h);
    updateCompassArrow();
}

async function startCompass(){
    if(compassListening) return;
    if(typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
        const p = await DeviceOrientationEvent.requestPermission();
        if(p !== "granted") return;
    }
    compassHandler = handleOrientation;
    window.addEventListener("deviceorientation", compassHandler, true);
    compassListening = true;
    if(qiblaStatus) qiblaStatus.textContent = "LIVE";
}
function stopCompass(){ if(compassListening && compassHandler) window.removeEventListener("deviceorientation", compassHandler, true); compassListening = false; }

// ======================================
// EVENT LISTENERS
// ======================================
document.addEventListener("DOMContentLoaded", function(){
    initializeMap();
    setupListeners();
    setupMoreNav();
    requestLocation();
    startCompass();
});

function setupListeners(){
    if(locationRefreshBtn) locationRefreshBtn.addEventListener("click", requestLocation);
    if(calibrateBtn) calibrateBtn.addEventListener("click", startCompass);
    if(mapLocationBtn) mapLocationBtn.addEventListener("click", goToMyLocation);
    if(campusMessageBtn) campusMessageBtn.addEventListener("click", requestLocation);
    if(campusSettingsBtn) campusSettingsBtn.addEventListener("click", function(){ closeMoreMenu(); campusSettingsPanel.style.display = "block"; });
    if(closeCampusSettingsBtn) closeCampusSettingsBtn.addEventListener("click", function(){ campusSettingsPanel.style.display = "none"; });
    if(settingsCalibrateBtn) settingsCalibrateBtn.addEventListener("click", function(){ campusSettingsPanel.style.display = "none"; startCompass(); });
    if(settingsLocationBtn) settingsLocationBtn.addEventListener("click", function(){ campusSettingsPanel.style.display = "none"; requestLocation(); });
    if(document.querySelector(".settings-overlay")) document.querySelector(".settings-overlay").addEventListener("click", function(){ campusSettingsPanel.style.display = "none"; });
}

function setupMoreNav(){
    if(!moreNavBtn || !moreMenu) return;
    moreNavBtn.addEventListener("click", function(e){ e.stopPropagation(); moreMenu.classList.toggle("show"); });
    document.addEventListener("click", function(){ moreMenu.classList.remove("show"); });
}

document.addEventListener("visibilitychange", function(){ if(document.hidden) stopCompass(); });
window.addEventListener("pageshow", function(){ if(currentQiblaBearing !== null) startCompass(); });