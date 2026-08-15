/* ======================================
   MASJID.JS - WITH IN-PAGE MAP & FULL CRUD
====================================== */

// --- Constants ---
const DUPLICATE_DISTANCE = 500; // meters
const DEFAULT_LAT = 28.0065;
const DEFAULT_LNG = 69.3167;
const DEFAULT_LOCATION = "Adilpur, Ghotki";

// --- DOM Elements ---
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

// --- State ---
let currentLat = null, currentLng = null, allMosques = [];
let generatedOtp = null, isOtpVerified = false, editingId = null;
let map = null, userMarker = null, mosqueMarkers = [];

// --- Local Storage ---
function loadMosques() {
    const data = localStorage.getItem('masjidData');
    if (data) { try { allMosques = JSON.parse(data); } catch(e) { allMosques = []; } }
}
function saveMosques() { localStorage.setItem('masjidData', JSON.stringify(allMosques)); }

// --- Location ---
function requestLocation() {
    locationText.textContent = "Fetching GPS...";
    if (!navigator.geolocation) { useFallback("Geolocation not supported."); return; }
    const timeout = setTimeout(() => { if (currentLat === null) useFallback("GPS timeout."); }, 5000);
    navigator.geolocation.getCurrentPosition(
        (pos) => { clearTimeout(timeout); currentLat = pos.coords.latitude; currentLng = pos.coords.longitude; onReady(); },
        () => { clearTimeout(timeout); useFallback("GPS error."); },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}
function useFallback(msg) {
    currentLat = DEFAULT_LAT; currentLng = DEFAULT_LNG;
    locationText.textContent = msg + " " + DEFAULT_LOCATION;
    onReady();
}
function onReady() {
    fetchLocationName();
    initMap();
    renderAll();
}
async function fetchLocationName() {
    if (currentLat === DEFAULT_LAT && currentLng === DEFAULT_LNG) {
        locationText.textContent = "📍 " + DEFAULT_LOCATION; return;
    }
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${currentLat}&lon=${currentLng}&zoom=10&addressdetails=1`, { headers: { "Accept-Language": "en" } });
        if (!res.ok) throw new Error();
        const data = await res.json(); const addr = data.address || {};
        let name = addr.village || addr.town || addr.city || addr.municipality || addr.county || addr.state || "Current Location";
        // Adilpur fix
        if (currentLat && currentLng) {
            const dist = Math.sqrt(Math.pow(currentLat - DEFAULT_LAT, 2) + Math.pow(currentLng - DEFAULT_LNG, 2));
            if (dist < 0.12 && name.toLowerCase() === "ghotki") name = "Adilpur, Ghotki";
        }
        locationText.textContent = "📍 " + name;
    } catch(e) { locationText.textContent = "📍 Current Location"; }
}

// --- Distance Helper ---
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180; const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) * Math.sin(dLng/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 1000;
}

// --- MAP INITIALIZATION ---
function initMap() {
    if (!mapContainer || typeof L === 'undefined') return;
    if (map) { map.remove(); map = null; }
    map = L.map(mapContainer).setView([currentLat, currentLng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    // User marker
    userMarker = L.marker([currentLat, currentLng], { icon: L.divIcon({ className: '', html: '<i class="fa-solid fa-location-dot" style="color:#d4af37;font-size:24px;"></i>', iconSize: [24,24], iconAnchor: [12,12] }) }).addTo(map);
    // Update mosque markers
    updateMapMarkers();
}
function updateMapMarkers() {
    if (!map) return;
    // Remove old markers
    mosqueMarkers.forEach(m => map.removeLayer(m));
    mosqueMarkers = [];
    // Add new markers
    allMosques.forEach(m => {
        const marker = L.marker([m.lat, m.lng], { icon: L.divIcon({ className: '', html: '<i class="fa-solid fa-mosque" style="color:#d4af37;font-size:20px;"></i>', iconSize: [20,20], iconAnchor: [10,10] }) }).addTo(map);
        marker.bindPopup(`<b>${m.name}</b><br>${m.address}`);
        mosqueMarkers.push(marker);
    });
}

// --- RENDER MOSQUES ---
function renderAll() {
    renderMosques();
    updateMapMarkers();
}
function renderMosques() {
    if (currentLat === null || currentLng === null) return;
    if (!allMosques.length) { mosqueList.innerHTML = `<div class="loading-msg">No mosques added yet.</div>`; return; }
    const withDist = allMosques.map(m => ({ ...m, distance: getDistance(currentLat, currentLng, m.lat, m.lng) }));
    withDist.sort((a,b) => a.distance - b.distance);
    let html = '';
    withDist.forEach(m => {
        const distStr = m.distance < 1000 ? Math.round(m.distance) + ' m' : (m.distance/1000).toFixed(1) + ' km';
        const imgSrc = m.photo || 'https://via.placeholder.com/56/2a2a2a/d4af37?text=Mosque';
        html += `
            <div class="mosque-card" data-id="${m.id}">
                <img src="${imgSrc}" class="mosque-img" onerror="this.src='https://via.placeholder.com/56/2a2a2a/d4af37?text=Mosque'">
                <div class="mosque-info">
                    <h3>${m.name}</h3>
                    <p>${m.address}</p>
                    <span class="distance">${distStr} away</span>
                    <small style="color:#777;font-size:10px;">Added by: ${m.userName || 'Anonymous'}</small>
                </div>
                <div class="actions">
                    <button class="directions-btn" data-lat="${m.lat}" data-lng="${m.lng}" title="View on Map"><i class="fa-solid fa-location-arrow"></i></button>
                    <button class="edit-btn" data-id="${m.id}" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn" data-id="${m.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });
    mosqueList.innerHTML = html;
    // Attach events
    document.querySelectorAll('.directions-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (map) map.setView([this.dataset.lat, this.dataset.lng], 15);
        });
    });
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            const m = allMosques.find(x => x.id === id);
            if (!m) return;
            mosqueName.value = m.name; mosqueAddress.value = m.address;
            userName.value = m.userName || ''; fatherName.value = m.fatherName || '';
            phoneNumber.value = m.phoneNumber || '';
            modalTitle.textContent = "Edit Mosque"; editingId = id;
            modal.classList.add('active'); resetOtpState();
        });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm("Are you sure you want to delete this mosque?")) {
                allMosques = allMosques.filter(x => x.id !== this.dataset.id);
                saveMosques(); renderAll();
                showToast("✅ Mosque deleted.");
            }
        });
    });
}

// --- OTP Reset ---
function resetOtpState() {
    generatedOtp = null; isOtpVerified = false;
    submitBtn.disabled = true; otpInput.disabled = true;
    otpInput.value = ''; otpStatus.textContent = '';
}

// --- Event Listeners ---
function setupListeners() {
    addBtn.addEventListener('click', function() {
        if (currentLat === null || currentLng === null) { showToast("Please wait for GPS."); return; }
        modalTitle.textContent = "Add Mosque"; editingId = null;
        form.reset(); resetOtpState(); mosquePhoto.value = '';
        modal.classList.add('active');
    });
    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', function(e) { if (e.target === modal) modal.classList.remove('active'); });
    refreshBtn.addEventListener('click', function() { renderAll(); showToast("Refreshed."); });

    // OTP
    sendOtpBtn.addEventListener('click', function() {
        const phone = phoneNumber.value.trim();
        if (phone.length < 10) { showToast("Enter a valid phone number first."); return; }
        generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        otpInput.disabled = false; otpInput.focus();
        showToast(`📱 Code sent! (Mock: ${generatedOtp})`);
        otpStatus.textContent = `Code sent (${generatedOtp})`; otpStatus.style.color = '#4caf50';
    });
    verifyOtpBtn.addEventListener('click', function() {
        const entered = otpInput.value.trim();
        if (!generatedOtp || !entered) { otpStatus.textContent = "Send code first."; otpStatus.style.color = '#e53935'; return; }
        if (entered === generatedOtp) {
            isOtpVerified = true; submitBtn.disabled = false;
            otpStatus.textContent = "✅ Verified! You can save."; otpStatus.style.color = '#4caf50';
            otpInput.disabled = true;
        } else {
            isOtpVerified = false; submitBtn.disabled = true;
            otpStatus.textContent = "❌ Incorrect code."; otpStatus.style.color = '#e53935';
        }
    });

    // Submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!isOtpVerified) { showToast("Verify phone number first."); return; }
        const name = mosqueName.value.trim(), address = mosqueAddress.value.trim();
        const uName = userName.value.trim(), fName = fatherName.value.trim(), phone = phoneNumber.value.trim();
        if (!name || !address || !uName || !fName || !phone) { showToast("Fill all fields."); return; }
        if (!editingId) {
            const dup = allMosques.some(m => m.name.toLowerCase() === name.toLowerCase() && getDistance(currentLat, currentLng, m.lat, m.lng) < DUPLICATE_DISTANCE);
            if (dup) { showToast("Duplicate mosque within 500m."); return; }
        }
        const fileInput = mosquePhoto;
        let photoData = null;
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            if (file.size > 2 * 1024 * 1024) { showToast("Image < 2MB."); return; }
            const reader = new FileReader();
            reader.onload = function(e) { photoData = e.target.result; saveMosque(name, address, uName, fName, phone, photoData); };
            reader.readAsDataURL(file);
        } else {
            saveMosque(name, address, uName, fName, phone, null);
        }
    });
}

function saveMosque(name, address, uName, fName, phone, photo) {
    if (editingId) {
        const idx = allMosques.findIndex(m => m.id === editingId);
        if (idx !== -1) {
            allMosques[idx].name = name; allMosques[idx].address = address;
            allMosques[idx].userName = uName; allMosques[idx].fatherName = fName;
            allMosques[idx].phoneNumber = phone;
            if (photo) allMosques[idx].photo = photo;
        }
        showToast("✅ Mosque updated!");
    } else {
        allMosques.push({
            id: Date.now().toString() + Math.random().toString(36).substr(2,5),
            name, address, lat: currentLat, lng: currentLng, photo,
            userName: uName, fatherName: fName, phoneNumber: phone,
            createdAt: new Date().toISOString()
        });
        showToast("✅ Mosque added!");
    }
    saveMosques(); renderAll(); modal.classList.remove('active'); resetOtpState(); editingId = null;
    modalTitle.textContent = "Add Mosque";
}

// --- Toast ---
function showToast(msg) {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- More Menu ---
function setupMoreNav() {
    if (!moreNavBtn || !moreMenu) return;
    moreNavBtn.addEventListener('click', function(e) { e.stopPropagation(); moreMenu.classList.toggle('show'); });
    document.addEventListener('click', function(e) {
        if (!moreMenu.contains(e.target) && !moreNavBtn.contains(e.target)) moreMenu.classList.remove('show');
    });
    if (settingsBtn) settingsBtn.addEventListener('click', function() { moreMenu.classList.remove('show'); alert("Settings coming soon."); });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', function() {
    loadMosques();
    requestLocation();
    setupListeners();
    setupMoreNav();
});