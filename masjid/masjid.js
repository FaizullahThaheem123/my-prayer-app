/* ======================================
   MASJID.JS - REALTIME DATABASE VERSION (FIXED)
====================================== */

// 🔥 اپنا وہی Firebase Config جو آپ نے کاپی کیا تھا
const firebaseConfig = {
  apiKey: "AIzaSyBdwVNsajqJ8hjbYeMGGPc0SUXNuHh2MaE",
  authDomain: "myprayerapp-55983.firebaseapp.com",
  projectId: "myprayerapp-55983",
  storageBucket: "myprayerapp-55983.firebasestorage.app",
  messagingSenderId: "812310728557",
  appId: "1:812310728557:web:28d1bcfb133960292b1464",
  measurementId: "G-8ZV46PJE31"
};

// Firebase Init
firebase.initializeApp(firebaseConfig);
const db = firebase.database(); // Realtime Database
const auth = firebase.auth();

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
let currentUserUid = null;

// --- Firebase Auth (Anonymous) ---
async function initAuth() {
    try {
        await auth.signInAnonymously();
        const user = auth.currentUser;
        if (user) currentUserUid = user.uid;
        console.log("Logged in as:", currentUserUid);
    } catch (e) {
        console.error("Auth error:", e);
    }
}

// --- Load Mosques from Realtime Database ---
function loadMosques() {
    const mosquesRef = db.ref('mosques');
    mosquesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        allMosques = [];
        if (data) {
            Object.keys(data).forEach(key => {
                allMosques.push({ id: key, ...data[key] });
            });
        }
        renderAll();
    }, (error) => {
        console.error("Load error:", error);
    });
}

// --- Save/Update to Realtime Database ---
async function saveMosqueToRTDB(name, address, uName, fName, phone, photo) {
    const mosqueData = {
        name, address, uName, fName, phone, photo,
        lat: currentLat, lng: currentLng,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        createdBy: currentUserUid
    };

    if (editingId) {
        await db.ref('mosques/' + editingId).update(mosqueData);
        showToast("✅ Mosque updated!");
    } else {
        await db.ref('mosques').push(mosqueData);
        showToast("✅ Mosque added!");
    }
    editingId = null;
    modal.classList.remove('active');
    resetOtpState();
}

// --- Delete from Realtime Database ---
async function deleteMosque(id) {
    try {
        const snapshot = await db.ref('mosques/' + id).once('value');
        const data = snapshot.val();
        if (!data) return;
        if (data.createdBy === currentUserUid) {
            await db.ref('mosques/' + id).remove();
            showToast("✅ Mosque deleted.");
        } else {
            showToast("❌ You don't have permission.");
        }
    } catch (e) {
        console.error("Delete error:", e);
        showToast("Error deleting mosque.");
    }
}

// --- Location (Live GPS) ---
function requestLocation() {
    locationText.textContent = "Fetching GPS...";
    if (!navigator.geolocation) {
        useFallback("Geolocation not supported.");
        return;
    }
    const timeout = setTimeout(() => {
        if (currentLat === null) useFallback("GPS timeout.");
    }, 5000);

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            clearTimeout(timeout);
            currentLat = pos.coords.latitude;
            currentLng = pos.coords.longitude;
            onReady();
        },
        (error) => {
            clearTimeout(timeout);
            let msg = "GPS error.";
            if (error.code === 1) msg = "Permission denied.";
            else if (error.code === 2) msg = "Position unavailable.";
            useFallback(msg);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

function useFallback(msg) {
    currentLat = DEFAULT_LAT;
    currentLng = DEFAULT_LNG;
    locationText.textContent = msg + " " + DEFAULT_LOCATION;
    onReady();
}

function onReady() {
    fetchLocationName();
    initMap();
    loadMosques();
}

async function fetchLocationName() {
    if (currentLat === DEFAULT_LAT && currentLng === DEFAULT_LNG) {
        locationText.textContent = "📍 " + DEFAULT_LOCATION;
        return;
    }
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${currentLat}&lon=${currentLng}&zoom=10&addressdetails=1`,
            { headers: { "Accept-Language": "en" } }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        const addr = data.address || {};
        let name = addr.village || addr.town || addr.city || addr.municipality || addr.county || addr.state || "Current Location";
        // Adilpur fix
        if (currentLat && currentLng) {
            const dist = Math.sqrt(Math.pow(currentLat - DEFAULT_LAT, 2) + Math.pow(currentLng - DEFAULT_LNG, 2));
            if (dist < 0.12 && name.toLowerCase() === "ghotki") name = "Adilpur, Ghotki";
        }
        locationText.textContent = "📍 " + name;
    } catch (e) {
        locationText.textContent = "📍 Current Location";
    }
}

// --- Distance Helper ---
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // meters
}

// --- Map ---
function initMap() {
    if (!mapContainer || typeof L === 'undefined') return;
    if (map) { map.remove(); map = null; }
    map = L.map(mapContainer).setView([currentLat, currentLng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    userMarker = L.marker([currentLat, currentLng], {
        icon: L.divIcon({
            className: '',
            html: '<i class="fa-solid fa-location-dot" style="color:#d4af37;font-size:24px;"></i>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        })
    }).addTo(map);
    updateMapMarkers();
}

function updateMapMarkers() {
    if (!map) return;
    mosqueMarkers.forEach(m => map.removeLayer(m));
    mosqueMarkers = [];
    allMosques.forEach(m => {
        const marker = L.marker([m.lat, m.lng], {
            icon: L.divIcon({
                className: '',
                html: '<i class="fa-solid fa-mosque" style="color:#d4af37;font-size:20px;"></i>',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            })
        }).addTo(map);
        marker.bindPopup(`<b>${m.name}</b><br>${m.address}`);
        mosqueMarkers.push(marker);
    });
}

// --- Render List ---
function renderAll() {
    renderMosques();
    updateMapMarkers();
}

function renderMosques() {
    if (currentLat === null || currentLng === null) return;
    if (!allMosques.length) {
        mosqueList.innerHTML = `<div class="loading-msg">No mosques added yet.</div>`;
        return;
    }
    const withDist = allMosques.map(m => ({ ...m, distance: getDistance(currentLat, currentLng, m.lat, m.lng) }));
    withDist.sort((a, b) => a.distance - b.distance);
    let html = '';
    withDist.forEach(m => {
        const distStr = m.distance < 1000 ? Math.round(m.distance) + ' m' : (m.distance / 1000).toFixed(1) + ' km';
        const imgSrc = m.photo || 'https://via.placeholder.com/56/2a2a2a/d4af37?text=Mosque';
        html += `
            <div class="mosque-card" data-id="${m.id}">
                <img src="${imgSrc}" class="mosque-img" onerror="this.src='https://via.placeholder.com/56/2a2a2a/d4af37?text=Mosque'">
                <div class="mosque-info">
                    <h3>${m.name}</h3>
                    <p>${m.address}</p>
                    <span class="distance">${distStr} away</span>
                    <small style="color:#777;font-size:10px;">Added by: ${m.uName || 'Anonymous'}</small>
                </div>
                <div class="actions">
                    <button class="directions-btn" data-lat="${m.lat}" data-lng="${m.lng}"><i class="fa-solid fa-location-arrow"></i></button>
                    ${m.createdBy === currentUserUid ? `
                    <button class="edit-btn" data-id="${m.id}"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn" data-id="${m.id}"><i class="fa-solid fa-trash"></i></button>
                    ` : ''}
                </div>
            </div>
        `;
    });
    mosqueList.innerHTML = html;
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
            mosqueName.value = m.name;
            mosqueAddress.value = m.address;
            userName.value = m.uName || '';
            fatherName.value = m.fName || '';
            phoneNumber.value = m.phone || '';
            modalTitle.textContent = "Edit Mosque";
            editingId = id;
            modal.classList.add('active');
            resetOtpState();
        });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm("Are you sure you want to delete this mosque?")) {
                deleteMosque(this.dataset.id);
            }
        });
    });
}

// --- OTP & Form Logic ---
function resetOtpState() {
    generatedOtp = null;
    isOtpVerified = false;
    submitBtn.disabled = true;
    otpInput.disabled = true;
    otpInput.value = '';
    otpStatus.textContent = '';
}

function setupListeners() {
    addBtn.addEventListener('click', function() {
        if (currentLat === null || currentLng === null) {
            showToast("Please wait for GPS.");
            return;
        }
        modalTitle.textContent = "Add Mosque";
        editingId = null;
        form.reset();
        resetOtpState();
        mosquePhoto.value = '';
        modal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.classList.remove('active');
    });

    refreshBtn.addEventListener('click', function() {
        loadMosques();
        showToast("Refreshed.");
    });

    sendOtpBtn.addEventListener('click', function() {
        const phone = phoneNumber.value.trim();
        if (phone.length < 10) {
            showToast("Enter a valid phone number first.");
            return;
        }
        generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        otpInput.disabled = false;
        otpInput.focus();
        showToast(`📱 Code sent! (Mock: ${generatedOtp})`);
        otpStatus.textContent = `Code sent (${generatedOtp})`;
        otpStatus.style.color = '#4caf50';
    });

    verifyOtpBtn.addEventListener('click', function() {
        const entered = otpInput.value.trim();
        if (!generatedOtp || !entered) {
            otpStatus.textContent = "Send code first.";
            otpStatus.style.color = '#e53935';
            return;
        }
        if (entered === generatedOtp) {
            isOtpVerified = true;
            submitBtn.disabled = false;
            otpStatus.textContent = "✅ Verified! You can save.";
            otpStatus.style.color = '#4caf50';
            otpInput.disabled = true;
        } else {
            isOtpVerified = false;
            submitBtn.disabled = true;
            otpStatus.textContent = "❌ Incorrect code.";
            otpStatus.style.color = '#e53935';
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!isOtpVerified) {
            showToast("Verify phone number first.");
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

        const fileInput = mosquePhoto;
        let photoData = null;
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            if (file.size > 1 * 1024 * 1024) {
                showToast("Image < 1MB.");
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                photoData = e.target.result;
                saveMosqueToRTDB(name, address, uName, fName, phone, photoData);
            };
            reader.readAsDataURL(file);
        } else {
            saveMosqueToRTDB(name, address, uName, fName, phone, null);
        }
    });
}

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

function setupMoreNav() {
    if (!moreNavBtn || !moreMenu) return;
    moreNavBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        moreMenu.classList.toggle('show');
    });
    document.addEventListener('click', function(e) {
        if (!moreMenu.contains(e.target) && !moreNavBtn.contains(e.target)) moreMenu.classList.remove('show');
    });
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            moreMenu.classList.remove('show');
            alert("Settings coming soon.");
        });
    }
}

// --- Init ---
document.addEventListener('DOMContentLoaded', function() {
    initAuth();
    requestLocation();
    setupListeners();
    setupMoreNav();
});