/* ======================================
   MASJID.JS - FINAL FIXED VERSION
====================================== */

const firebaseConfig = {
    apiKey: "AIzaSyBdwVNsajqJ8hjbYeMGGPc0SUXNuHh2MaE",
    authDomain: "myprayerapp-55983.firebaseapp.com",
    projectId: "myprayerapp-55983",
    storageBucket: "myprayerapp-55983.firebasestorage.app",
    messagingSenderId: "812310728557",
    appId: "1:812310728557:web:28d1bcfb133960292b1464",
    measurementId: "G-8ZV46PJE31"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

const DUPLICATE_DISTANCE = 500;
const DEFAULT_LAT = 28.0065;
const DEFAULT_LNG = 69.3167;
const DEFAULT_LOCATION = "Adilpur, Ghotki";
const SEARCH_RADIUS = 10000; // 10 km

// DOM Elements
const locationText = document.getElementById('locationText');
const addBtn = document.getElementById('addMosqueBtn');
const refreshBtn = document.getElementById('refreshBtn');
const mosqueList = document.getElementById('mosqueList');
const mapContainer = document.getElementById('mapContainer');
const modal = document.getElementById('addModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const form = document.getElementById('addMosqueForm');
const modalTitle = document.getElementById('modalTitle');
const mosqueName = document.getElementById('mosqueName');
const mosqueAddress = document.getElementById('mosqueAddress');
const userName = document.getElementById('userName');
const fatherName = document.getElementById('fatherName');
const phoneNumber = document.getElementById('phoneNumber');
const mosquePhoto = document.getElementById('mosquePhoto');
const submitBtn = document.getElementById('submitBtn');
const otpInput = document.getElementById('otpInput');
const sendOtpBtn = document.getElementById('sendOtpBtn');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const otpStatus = document.getElementById('otpStatus');
const toast = document.getElementById('toast');
const moreNavBtn = document.getElementById('moreNavBtn');
const moreMenu = document.getElementById('moreMenu');
const settingsBtn = document.getElementById('settingsBtn');
const citySearch = document.getElementById('citySearch');
const searchCityBtn = document.getElementById('searchCityBtn');

let currentLat = null, currentLng = null;
let viewLat = null, viewLng = null;
let isCitySearchActive = false;
let searchedCityName = "";
let userMosques = [];
let realMosques = [];
let allMosques = [];
let generatedOtp = null, isOtpVerified = false;
let editingId = null, editingLat = null, editingLng = null;
let map = null, userMarker = null, mosqueMarkers = [];
let currentUserUid = null;
let userMosquesLoaded = false; // flag to track if user mosques are loaded

// Firebase Auth
async function initAuth() {
    try {
        await auth.signInAnonymously();
        const user = auth.currentUser;
        if (user) currentUserUid = user.uid;
    } catch (error) {
        console.error("Firebase Auth Error:", error);
        showToast("Firebase login failed.");
    }
}

// Load user mosques from Firebase
function loadUserMosques() {
    const ref = db.ref("mosques");
    ref.on("value", function(snapshot) {
        const data = snapshot.val();
        userMosques = [];
        if (data) {
            Object.keys(data).forEach(function(key) {
                const mosque = data[key];
                if (mosque && mosque.lat != null && mosque.lng != null) {
                    userMosques.push({
                        id: key,
                        ...mosque,
                        lat: Number(mosque.lat),
                        lng: Number(mosque.lng),
                        isUser: true
                    });
                }
            });
        }
        userMosquesLoaded = true;
        refreshVisibleMosques();
    });
}

// Get user mosques within radius
function getUserMosquesWithinRadius(centerLat, centerLng) {
    if (centerLat == null || centerLng == null) return [];
    return userMosques.filter(function(mosque) {
        return getDistance(centerLat, centerLng, mosque.lat, mosque.lng) <= SEARCH_RADIUS;
    });
}

// Refresh current view
function refreshVisibleMosques() {
    if (viewLat == null || viewLng == null) return;
    const nearbyUserMosques = getUserMosquesWithinRadius(viewLat, viewLng);
    let finalList = [];
    if (isCitySearchActive) {
        finalList = [...realMosques, ...nearbyUserMosques];
    } else {
        finalList = nearbyUserMosques;
    }
    allMosques = removeDuplicateMosques(finalList);
    renderAll(allMosques, viewLat, viewLng);
}

// Remove duplicates
function removeDuplicateMosques(list) {
    const result = [];
    list.forEach(function(mosque) {
        if (mosque.lat == null || mosque.lng == null) return;
        const duplicate = result.some(function(existing) {
            return getDistance(existing.lat, existing.lng, mosque.lat, mosque.lng) < DUPLICATE_DISTANCE;
        });
        if (!duplicate) result.push(mosque);
    });
    return result;
}

// Render all
function renderAll(list, centerLat, centerLng) {
    renderMosques(list, centerLat, centerLng);
    updateMapMarkers(list);
}

// Escape HTML
function escapeHtml(value) {
    if (value == null) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Render mosque list
function renderMosques(list, centerLat, centerLng) {
    if (centerLat == null || centerLng == null) return;
    if (!list.length) {
        mosqueList.innerHTML = `
            <div class="loading-msg">
                No mosques found within 10 km.
            </div>
        `;
        return;
    }
    const withDistance = list.map(function(mosque) {
        return {
            ...mosque,
            distance: getDistance(centerLat, centerLng, mosque.lat, mosque.lng)
        };
    });
    withDistance.sort(function(a, b) { return a.distance - b.distance; });
    let html = "";
    withDistance.forEach(function(m) {
        const distStr = m.distance < 1000
            ? Math.round(m.distance) + " m"
            : (m.distance / 1000).toFixed(1) + " km";
        const imgSrc = m.photo || "https://via.placeholder.com/56/2a2a2a/d4af37?text=Mosque";
        const safeName = escapeHtml(m.name || "Masjid");
        const safeAddress = escapeHtml(m.address || "Location available");
        const safeUser = escapeHtml(m.uName || "Anonymous");
        const isUser = m.isUser === true;
        html += `
            <div class="mosque-card"
                data-lat="${m.lat}"
                data-lng="${m.lng}"
                data-name="${safeName}"
                data-address="${safeAddress}"
                data-dist="${distStr}"
                data-user="${safeUser}"
                data-photo="${m.photo || ""}"
            >
                <img src="${imgSrc}" class="mosque-img" alt="Mosque" onerror="this.src='https://via.placeholder.com/56/2a2a2a/d4af37?text=Mosque'">
                <div class="mosque-info">
                    <h3>${safeName} ${isUser ? "" : "📍"}</h3>
                    <p>${safeAddress}</p>
                    <span class="distance">${distStr} away</span>
                    ${isUser
                        ? `<small style="color:#777;font-size:10px;">Added by: ${safeUser}</small>`
                        : `<small style="color:#777;font-size:10px;">OpenStreetMap</small>`
                    }
                </div>
                <div class="actions">
                    <button class="directions-btn" data-lat="${m.lat}" data-lng="${m.lng}" type="button" title="Show on map">
                        <i class="fa-solid fa-location-arrow"></i>
                    </button>
                    ${isUser && m.createdBy === currentUserUid ? `
                        <button class="edit-btn" data-id="${m.id}" type="button" onclick="event.stopPropagation()">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="delete-btn" data-id="${m.id}" type="button" onclick="event.stopPropagation()">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    ` : ""}
                </div>
            </div>
        `;
    });
    mosqueList.innerHTML = html;

    // Card click -> zoom to mosque
    document.querySelectorAll(".mosque-card").forEach(function(card) {
        card.addEventListener("click", function() {
            const lat = Number(this.dataset.lat);
            const lng = Number(this.dataset.lng);
            if (map) map.setView([lat, lng], 17);
        });
    });

    // Directions button
    document.querySelectorAll(".directions-btn").forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.stopPropagation();
            const lat = Number(this.dataset.lat);
            const lng = Number(this.dataset.lng);
            if (map) map.setView([lat, lng], 17);
        });
    });

    // Edit button
    document.querySelectorAll(".edit-btn").forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.stopPropagation();
            const id = this.dataset.id;
            const mosque = userMosques.find(function(item) { return item.id === id; });
            if (!mosque) return;
            mosqueName.value = mosque.name || "";
            mosqueAddress.value = mosque.address || "";
            userName.value = mosque.uName || "";
            fatherName.value = mosque.fName || "";
            phoneNumber.value = mosque.phone || "";
            modalTitle.textContent = "Edit Mosque";
            editingId = id;
            editingLat = Number(mosque.lat);
            editingLng = Number(mosque.lng);
            mosquePhoto.value = "";
            modal.classList.add("active");
            resetOtpState();
        });
    });

    // Delete button
    document.querySelectorAll(".delete-btn").forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.stopPropagation();
            const id = this.dataset.id;
            if (confirm("Delete this mosque?")) {
                deleteMosque(id);
            }
        });
    });
}

// Update map markers
function updateMapMarkers(list) {
    if (!map) return;
    mosqueMarkers.forEach(function(marker) { map.removeLayer(marker); });
    mosqueMarkers = [];
    list.forEach(function(m) {
        if (m.lat == null || m.lng == null) return;
        const size = m.isUser ? 20 : 24;
        const icon = L.divIcon({
            className: "",
            html: `<i class="fa-solid fa-mosque" style="color:#d4af37;font-size:${size}px;text-shadow:0 2px 5px rgba(0,0,0,.7);"></i>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });
        const marker = L.marker([m.lat, m.lng], { icon: icon }).addTo(map);
        const name = escapeHtml(m.name || "Masjid");
        const address = escapeHtml(m.address || "Location available");
        const source = m.isUser ? "Added by My Prayer user" : "OpenStreetMap";
        marker.bindPopup(`<strong>${name}</strong><br>${address}<br><small>${source}</small>`);
        mosqueMarkers.push(marker);
    });
}

// Save / Update mosque
async function saveMosqueToRTDB(name, address, uName, fName, phone, photo) {
    const saveLat = editingId !== null && editingLat !== null ? editingLat : currentLat;
    const saveLng = editingId !== null && editingLng !== null ? editingLng : currentLng;
    const data = {
        name: name,
        address: address,
        uName: uName,
        fName: fName,
        phone: phone,
        photo: photo,
        lat: saveLat,
        lng: saveLng,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        createdBy: currentUserUid
    };
    try {
        if (editingId) {
            await db.ref("mosques/" + editingId).update(data);
            showToast("✅ Mosque Updated!");
        } else {
            await db.ref("mosques").push(data);
            showToast("✅ Mosque Added!");
        }
        editingId = null;
        editingLat = null;
        editingLng = null;
        modal.classList.remove("active");
        resetOtpState();
    } catch (error) {
        console.error("Save mosque error:", error);
        showToast("❌ Could not save mosque.");
    }
}

// Delete mosque
async function deleteMosque(id) {
    try {
        const snapshot = await db.ref("mosques/" + id).once("value");
        const data = snapshot.val();
        if (!data) return;
        if (data.createdBy === currentUserUid) {
            await db.ref("mosques/" + id).remove();
            showToast("✅ Mosque Deleted!");
        } else {
            showToast("❌ No permission.");
        }
    } catch (error) {
        console.error("Delete error:", error);
        showToast("❌ Delete failed.");
    }
}

// Distance calculation
function getDistance(lat1, lng1, lat2, lng2) {
    if (lat1 == null || lng1 == null || lat2 == null || lng2 == null) return Infinity;
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000;
}

// Request location
function requestLocation() {
    locationText.textContent = "Fetching GPS...";
    if (!navigator.geolocation) {
        useFallback("Geolocation not supported.");
        return;
    }
    let finished = false;
    const timeout = setTimeout(function() {
        if (!finished) {
            finished = true;
            useFallback("GPS timeout.");
        }
    }, 5000);
    navigator.geolocation.getCurrentPosition(
        function(position) {
            if (finished) return;
            finished = true;
            clearTimeout(timeout);
            currentLat = position.coords.latitude;
            currentLng = position.coords.longitude;
            onReady();
        },
        function() {
            if (finished) return;
            finished = true;
            clearTimeout(timeout);
            useFallback("GPS error.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

function useFallback(message) {
    currentLat = DEFAULT_LAT;
    currentLng = DEFAULT_LNG;
    locationText.textContent = message + " " + DEFAULT_LOCATION;
    onReady();
}

function onReady() {
    viewLat = currentLat;
    viewLng = currentLng;
    isCitySearchActive = false;
    searchedCityName = "";
    realMosques = [];
    fetchLocationName();
    initMap();
    loadUserMosques();
}

async function fetchLocationName() {
    if (currentLat === DEFAULT_LAT && currentLng === DEFAULT_LNG) {
        locationText.textContent = "📍 " + DEFAULT_LOCATION;
        return;
    }
    try {
        const response = await fetch(
            "https://nominatim.openstreetmap.org/reverse" +
            "?format=json" +
            "&lat=" + currentLat +
            "&lon=" + currentLng +
            "&zoom=10" +
            "&addressdetails=1",
            { headers: { "Accept-Language": "en" } }
        );
        if (!response.ok) throw new Error("Location lookup failed");
        const data = await response.json();
        const address = data.address || {};
        let name = address.village || address.town || address.city || address.municipality || address.county || address.state || "Current Location";
        if (currentLat && currentLng) {
            const difference = Math.sqrt(
                Math.pow(currentLat - DEFAULT_LAT, 2) +
                Math.pow(currentLng - DEFAULT_LNG, 2)
            );
            if (difference < 0.12 && name.toLowerCase() === "ghotki") {
                name = "Adilpur, Ghotki";
            }
        }
        locationText.textContent = "📍 " + name;
    } catch (error) {
        console.error("Location name error:", error);
        locationText.textContent = "📍 Current Location";
    }
}

function initMap() {
    if (!mapContainer || typeof L === "undefined") return;
    if (map) { map.remove(); map = null; }
    map = L.map(mapContainer).setView([currentLat, currentLng], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
    userMarker = L.marker([currentLat, currentLng], {
        icon: L.divIcon({
            className: "",
            html: `<i class="fa-solid fa-location-dot" style="color:#d4af37;font-size:24px;text-shadow:0 2px 5px rgba(0,0,0,.7);"></i>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        })
    }).addTo(map).bindPopup("Your Location");
}

// Search city (with user mosques wait)
async function handleSearch() {
    const city = citySearch.value.trim();
    if (!city) {
        showToast("Please enter a city name.");
        return;
    }
    showToast("Searching " + city + "...");

    // Wait for user mosques to load if not yet loaded
    if (!userMosquesLoaded) {
        showToast("Loading your mosques...");
        // Wait up to 2 seconds
        let attempts = 0;
        while (!userMosquesLoaded && attempts < 20) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        if (!userMosquesLoaded) {
            showToast("Could not load your mosques. Please refresh.");
            return;
        }
    }

    let lat = null, lng = null;
    try {
        const geocodeUrl = "https://nominatim.openstreetmap.org/search" +
            "?format=json" +
            "&q=" + encodeURIComponent(city) +
            "&limit=1";
        const response = await fetch(geocodeUrl, { headers: { "Accept-Language": "en" } });
        if (!response.ok) throw new Error("Geocoding failed");
        const data = await response.json();
        if (!data || !data.length) throw new Error("City not found");
        lat = parseFloat(data[0].lat);
        lng = parseFloat(data[0].lon);
    } catch (error) {
        console.error("City search error:", error);
        showToast("City not found. Please check spelling.");
        return;
    }

    isCitySearchActive = true;
    searchedCityName = city;
    viewLat = lat;
    viewLng = lng;

    if (map) map.setView([lat, lng], 14);

    // Fetch real OSM mosques
    realMosques = await fetchRealMosques(lat, lng);

    const nearbyUserMosques = getUserMosquesWithinRadius(lat, lng);
    const combined = removeDuplicateMosques([...realMosques, ...nearbyUserMosques]);
    allMosques = combined;
    renderAll(allMosques, lat, lng);

    if (!combined.length) {
        showToast("No mosques found within 10 km of " + city + ".");
        return;
    }
    showToast("Found " + combined.length + " mosques near " + city + ".");
}

// Fetch real mosques from OSM
async function fetchRealMosques(lat, lng) {
    const radius = SEARCH_RADIUS;
    const query = `[out:json][timeout:25];` +
        `(` +
        `nwr["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});` +
        `nwr["amenity"="place_of_worship"]["name"~"mosque|masjid|مسجد",i](around:${radius},${lat},${lng});` +
        `);` +
        `out center tags;`;
    const encodedQuery = encodeURIComponent(query);
    const endpoints = [
        "https://overpass-api.de/api/interpreter?data=" + encodedQuery,
        "https://overpass.kumi.systems/api/interpreter?data=" + encodedQuery
    ];

    for (const endpoint of endpoints) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) continue;
            const data = await response.json();
            if (!data || !Array.isArray(data.elements)) continue;
            const mosques = [];
            data.elements.forEach(function(element) {
                const elementLat = element.lat ?? (element.center && element.center.lat);
                const elementLng = element.lon ?? (element.center && element.center.lon);
                if (elementLat == null || elementLng == null) return;
                const tags = element.tags || {};
                const name = tags.name || tags["name:en"] || tags["name:ur"] || tags["name:ar"] || "Masjid";
                const street = tags["addr:street"] || "";
                const city = tags["addr:city"] || "";
                let address = street;
                if (street && city) address = street + ", " + city;
                else if (city) address = city;
                if (!address) address = "Location on OpenStreetMap";
                mosques.push({
                    osmId: element.type + "_" + element.id,
                    lat: Number(elementLat),
                    lng: Number(elementLng),
                    name: name,
                    address: address,
                    isUser: false,
                    photo: null
                });
            });
            return removeDuplicateMosques(mosques);
        } catch (error) {
            console.error("Overpass error:", error);
        }
    }
    return [];
}

// OTP functions
function resetOtpState() {
    generatedOtp = null;
    isOtpVerified = false;
    submitBtn.disabled = true;
    otpInput.disabled = true;
    otpInput.value = "";
    otpStatus.textContent = "";
}

function setupListeners() {
    addBtn.addEventListener("click", function() {
        if (currentLat == null || currentLng == null) {
            showToast("Please wait for GPS.");
            return;
        }
        modalTitle.textContent = "Add Mosque";
        editingId = null;
        editingLat = null;
        editingLng = null;
        form.reset();
        resetOtpState();
        mosquePhoto.value = "";
        modal.classList.add("active");
    });

    closeModalBtn.addEventListener("click", function() {
        modal.classList.remove("active");
    });
    modal.addEventListener("click", function(event) {
        if (event.target === modal) modal.classList.remove("active");
    });

    refreshBtn.addEventListener("click", function() {
        if (currentLat == null || currentLng == null) {
            requestLocation();
            return;
        }
        if (isCitySearchActive) {
            handleSearch();
        } else {
            viewLat = currentLat;
            viewLng = currentLng;
            refreshVisibleMosques();
        }
        showToast("Refreshed.");
    });

    searchCityBtn.addEventListener("click", handleSearch);
    citySearch.addEventListener("keypress", function(event) {
        if (event.key === "Enter") handleSearch();
    });

    sendOtpBtn.addEventListener("click", function() {
        const phone = phoneNumber.value.trim();
        if (phone.length < 10) {
            showToast("Enter valid phone number.");
            return;
        }
        generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        otpInput.disabled = false;
        otpInput.focus();
        showToast("Code sent!");
        otpStatus.textContent = "Code sent (" + generatedOtp + ")";
        otpStatus.style.color = "#4caf50";
    });

    verifyOtpBtn.addEventListener("click", function() {
        const entered = otpInput.value.trim();
        if (!generatedOtp || !entered) {
            otpStatus.textContent = "Send code first.";
            otpStatus.style.color = "#e53935";
            return;
        }
        if (entered === generatedOtp) {
            isOtpVerified = true;
            submitBtn.disabled = false;
            otpStatus.textContent = "✅ Verified!";
            otpStatus.style.color = "#4caf50";
            otpInput.disabled = true;
        } else {
            isOtpVerified = false;
            submitBtn.disabled = true;
            otpStatus.textContent = "❌ Incorrect code.";
            otpStatus.style.color = "#e53935";
        }
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (!isOtpVerified) {
            showToast("Verify phone first.");
            return;
        }
        const name = mosqueName.value.trim();
        const address = mosqueAddress.value.trim();
        const uName = userName.value.trim();
        const fName = fatherName.value.trim();
        const phone = phoneNumber.value.trim();
        if (!name || !address || !uName || !fName || !phone) {
            showToast("Fill all fields.");
            return;
        }
        if (!editingId && (currentLat == null || currentLng == null)) {
            showToast("Location not available.");
            return;
        }
        const file = mosquePhoto.files[0];
        let photoData = null;
        if (file) {
            if (file.size > 1 * 1024 * 1024) {
                showToast("Image must be less than 1MB.");
                return;
            }
            const reader = new FileReader();
            reader.onload = function(event) {
                photoData = event.target.result;
                saveMosqueToRTDB(name, address, uName, fName, phone, photoData);
            };
            reader.readAsDataURL(file);
        } else {
            saveMosqueToRTDB(name, address, uName, fName, phone, null);
        }
    });
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function() {
        toast.classList.remove("show");
    }, 3000);
}

function setupMoreNav() {
    if (!moreNavBtn || !moreMenu) return;
    moreNavBtn.addEventListener("click", function(event) {
        event.stopPropagation();
        moreMenu.classList.toggle("show");
    });
    document.addEventListener("click", function() {
        moreMenu.classList.remove("show");
    });
    moreMenu.addEventListener("click", function(event) {
        event.stopPropagation();
    });
    if (settingsBtn) {
        settingsBtn.addEventListener("click", function() {
            moreMenu.classList.remove("show");
            alert("Settings coming soon.");
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    initAuth();
    requestLocation();
    setupListeners();
    setupMoreNav();
});