/* ======================================
   MASJID.JS - NEARBY MOSQUES SYSTEM (NAV FIXED)
====================================== */

// ========== CONSTANTS ==========
const MAX_DISTANCE_ADD = 100; // meters
const DUPLICATE_DISTANCE = 500; // meters
const DEFAULT_LAT = 28.0065;
const DEFAULT_LNG = 69.3167;
const DEFAULT_LOCATION = "Adilpur, Ghotki";

// ========== DOM REFS ==========
const locationText = document.getElementById('locationText');
const addBtn = document.getElementById('addMosqueBtn');
const refreshBtn = document.getElementById('refreshBtn');
const mosqueList = document.getElementById('mosqueList');
const modal = document.getElementById('addModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const form = document.getElementById('addMosqueForm');
const mosqueName = document.getElementById('mosqueName');
const mosqueAddress = document.getElementById('mosqueAddress');
const mosquePhoto = document.getElementById('mosquePhoto');
const gpsStatus = document.getElementById('gpsStatus');
const toast = document.getElementById('toast');

// MORE MENU ELEMENTS
const moreNavBtn = document.getElementById('moreNavBtn');
const moreMenu = document.getElementById('moreMenu');
const settingsBtn = document.getElementById('settingsBtn');

// ========== STATE ==========
let currentLat = null;
let currentLng = null;
let currentLocationName = DEFAULT_LOCATION;
let allMosques = [];

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', function() {
    loadMosquesFromStorage();
    requestLocation();
    setupEventListeners();
    setupMoreNav(); // نیویگیشن سیٹ اپ
});

// ========== LOCAL STORAGE ==========
function loadMosquesFromStorage() {
    const data = localStorage.getItem('masjidData');
    if (data) {
        try {
            allMosques = JSON.parse(data);
        } catch(e) {
            allMosques = [];
        }
    }
}

function saveMosques() {
    localStorage.setItem('masjidData', JSON.stringify(allMosques));
}

// ========== LOCATION ==========
function requestLocation() {
    locationText.textContent = "Fetching GPS...";
    if (!navigator.geolocation) {
        useFallbackLocation("Geolocation not supported.");
        return;
    }
    
    const timeoutId = setTimeout(() => {
        if (currentLat === null) {
            useFallbackLocation("GPS timeout. Using Adilpur.");
        }
    }, 5000);

    navigator.geolocation.getCurrentPosition(
        function(pos) {
            clearTimeout(timeoutId);
            currentLat = pos.coords.latitude;
            currentLng = pos.coords.longitude;
            onLocationReady();
        },
        function(error) {
            clearTimeout(timeoutId);
            let msg = "GPS error. Using default.";
            if (error.code === 1) msg = "Permission denied. Using Adilpur.";
            else if (error.code === 2) msg = "Position unavailable. Using Adilpur.";
            useFallbackLocation(msg);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

function useFallbackLocation(msg) {
    currentLat = DEFAULT_LAT;
    currentLng = DEFAULT_LNG;
    locationText.textContent = msg + " " + DEFAULT_LOCATION;
    onLocationReady();
}

function onLocationReady() {
    fetchLocationName();
    renderMosques();
}

async function fetchLocationName() {
    if (currentLat === DEFAULT_LAT && currentLng === DEFAULT_LNG) {
        locationText.textContent = "📍 " + DEFAULT_LOCATION;
        return;
    }
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${currentLat}&lon=${currentLng}&zoom=10&addressdetails=1`, {
            headers: { "Accept-Language": "en" }
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        const addr = data.address || {};
        
        let name = addr.village || addr.town || addr.city || addr.municipality || addr.county || addr.state || "Current Location";

        // Adilpur Fix
        if (currentLat && currentLng) {
            const adilpurLat = 28.0065;
            const adilpurLng = 69.3167;
            const distanceInDeg = Math.sqrt(Math.pow(currentLat - adilpurLat, 2) + Math.pow(currentLng - adilpurLng, 2));
            if (distanceInDeg < 0.12 && name.toLowerCase() === "ghotki") {
                name = "Adilpur, Ghotki";
            }
        }

        locationText.textContent = "📍 " + name;
    } catch(e) {
        locationText.textContent = "📍 Current Location";
    }
}

// ========== DISTANCE HELPER ==========
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c * 1000; // meters
}

// ========== RENDER MOSQUES ==========
function renderMosques() {
    if (currentLat === null || currentLng === null) return;
    const list = document.getElementById('mosqueList');
    if (!allMosques.length) {
        list.innerHTML = `<div class="loading-msg">No mosques added yet. Tap "Add New Mosque" to add one.</div>`;
        return;
    }
    const withDistance = allMosques.map(m => {
        const dist = getDistance(currentLat, currentLng, m.lat, m.lng);
        return { ...m, distance: dist };
    });
    withDistance.sort((a,b) => a.distance - b.distance);
    let html = '';
    withDistance.forEach(m => {
        const distStr = m.distance < 1000 ? Math.round(m.distance) + ' m' : (m.distance/1000).toFixed(1) + ' km';
        const imgSrc = m.photo || 'https://via.placeholder.com/56/2a2a2a/d4af37?text=Mosque';
        html += `
            <div class="mosque-card">
                <img src="${imgSrc}" alt="${m.name}" class="mosque-img" onerror="this.src='https://via.placeholder.com/56/2a2a2a/d4af37?text=Mosque'">
                <div class="mosque-info">
                    <h3>${m.name}</h3>
                    <p>${m.address}</p>
                    <span class="distance">${distStr} away</span>
                </div>
                <button class="directions-btn" data-lat="${m.lat}" data-lng="${m.lng}">
                    <i class="fa-solid fa-location-arrow"></i> Route
                </button>
            </div>
        `;
    });
    list.innerHTML = html;
    document.querySelectorAll('.directions-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lat = this.dataset.lat;
            const lng = this.dataset.lng;
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            window.open(url, '_blank');
        });
    });
}

// ========== ADD MOSQUE LOGIC ==========
function setupEventListeners() {
    addBtn.addEventListener('click', function() {
        if (currentLat === null || currentLng === null) {
            showToast("Please wait for GPS to be ready.");
            return;
        }
        modal.classList.add('active');
        gpsStatus.innerHTML = `<i class="fa-solid fa-check-circle" style="color:#4caf50;"></i> GPS locked at your current location.`;
        form.reset();
        mosquePhoto.value = '';
    });

    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.classList.remove('active');
    });

    refreshBtn.addEventListener('click', function() {
        renderMosques();
        showToast("Refreshed list.");
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = mosqueName.value.trim();
        const address = mosqueAddress.value.trim();
        if (!name || !address) {
            showToast("Please fill in all required fields.");
            return;
        }

        const duplicate = allMosques.some(m => {
            if (m.name.toLowerCase() !== name.toLowerCase()) return false;
            const dist = getDistance(currentLat, currentLng, m.lat, m.lng);
            return dist < DUPLICATE_DISTANCE;
        });
        if (duplicate) {
            showToast("A mosque with this name already exists within 500 meters.");
            return;
        }

        const fileInput = mosquePhoto;
        let photoData = null;
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            if (file.size > 2 * 1024 * 1024) {
                showToast("Image size must be less than 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                photoData = e.target.result;
                saveMosque(name, address, photoData);
            };
            reader.readAsDataURL(file);
        } else {
            saveMosque(name, address, null);
        }
    });
}

function saveMosque(name, address, photo) {
    const newMosque = {
        id: Date.now().toString() + Math.random().toString(36).substr(2,5),
        name: name,
        address: address,
        lat: currentLat,
        lng: currentLng,
        photo: photo,
        createdAt: new Date().toISOString()
    };
    allMosques.push(newMosque);
    saveMosques();
    renderMosques();
    modal.classList.remove('active');
    showToast("✅ Mosque added successfully!");
}

// ========== TOAST ==========
function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========== MORE MENU SETUP ==========
function setupMoreNav() {
    if (!moreNavBtn || !moreMenu) return;
    
    moreNavBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        moreMenu.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!moreMenu.contains(e.target) && !moreNavBtn.contains(e.target)) {
            moreMenu.classList.remove('show');
        }
    });

    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            moreMenu.classList.remove('show');
            alert("Settings will be available in the next update.");
        });
    }
}