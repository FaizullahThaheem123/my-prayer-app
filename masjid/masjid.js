/* ======================================
   MASJID.JS - SEARCH: NO RADIUS LIMIT (FIXED)
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

const DUPLICATE_DISTANCE = 500; // 500m duplicate check
const DEFAULT_LAT = 28.0065;
const DEFAULT_LNG = 69.3167;
const DEFAULT_LOCATION = "Adilpur, Ghotki";

// *** اہم تبدیلی: ریڈیئس کو ہٹا دیا گیا ہے (اب کوئی حد نہیں) ***
// اب سرچ میں تمام مساجد دکھیں گی، صرف فاصلے کے حساب سے ترتیب دی جائیں گی

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

// Detail Modal
const detailModal = document.getElementById('detailModal');
const closeDetailBtn = document.getElementById('closeDetailBtn');
const detailTitle = document.getElementById('detailTitle');
const detailAddress = document.getElementById('detailAddress');
const detailDistance = document.getElementById('detailDistance');
const detailUser = document.getElementById('detailUser');
const detailImg = document.getElementById('detailImg');
const detailMapBtn = document.getElementById('detailMapBtn');
const detailFamousTag = document.getElementById('detailFamousTag');

let currentLat = null, currentLng = null;
let allMosques = [], famousMosques = [], combinedMosques = [];
let generatedOtp = null, isOtpVerified = false, editingId = null;
let map = null, userMarker = null, mosqueMarkers = [];
let currentUserUid = null;

// Famous Mosques (Global)
const FAMOUS_MOSQUES_DATA = [
    { name: "Masjid al-Haram", address: "Makkah, Saudi Arabia", lat: 21.4225, lng: 39.8262, isFamous: true },
    { name: "Al-Masjid an-Nabawi", address: "Madinah, Saudi Arabia", lat: 24.4672, lng: 39.6112, isFamous: true },
    { name: "Faisal Mosque", address: "Islamabad, Pakistan", lat: 33.7294, lng: 73.0379, isFamous: true },
    { name: "Badshahi Mosque", address: "Lahore, Pakistan", lat: 31.5882, lng: 74.3140, isFamous: true },
    { name: "Tooba Mosque", address: "Karachi, Pakistan", lat: 24.8786, lng: 67.0116, isFamous: true },
    { name: "Al-Aqsa Mosque", address: "Jerusalem", lat: 31.7762, lng: 35.2355, isFamous: true },
    { name: "Sultan Ahmed Mosque (Blue)", address: "Istanbul, Turkey", lat: 41.0053, lng: 28.9767, isFamous: true },
    { name: "Umayyad Mosque", address: "Damascus, Syria", lat: 33.5116, lng: 36.3062, isFamous: true },
    { name: "Hagia Sophia", address: "Istanbul, Turkey", lat: 41.0082, lng: 28.9784, isFamous: true },
    { name: "Grand Mosque of Djenne", address: "Djenne, Mali", lat: 13.9049, lng: -4.5554, isFamous: true },
    { name: "Shah Jahan Mosque", address: "Thatta, Pakistan", lat: 24.7461, lng: 67.9242, isFamous: true },
    { name: "Mahabat Khan Mosque", address: "Peshawar, Pakistan", lat: 34.0102, lng: 71.5743, isFamous: true }
];

// Firebase Auth
async function initAuth() {
    try {
        await auth.signInAnonymously();
        const user = auth.currentUser;
        if (user) currentUserUid = user.uid;
    } catch (e) { console.error("Auth error:", e); }
}

// Load & Merge Mosques
function loadMosques() {
    const ref = db.ref('mosques');
    ref.on('value', (snapshot) => {
        const data = snapshot.val();
        allMosques = [];
        if (data) Object.keys(data).forEach(key => allMosques.push({ id: key, ...data[key] }));
        mergeAndRender();
    });
}
function mergeAndRender() {
    combinedMosques = [...allMosques, ...FAMOUS_MOSQUES_DATA];
    renderAll();
}

// Save / Delete / Location helpers
async function saveMosqueToRTDB(name, address, uName, fName, phone, photo) {
    const data = { name, address, uName, fName, phone, photo, lat: currentLat, lng: currentLng, createdAt: firebase.database.ServerValue.TIMESTAMP, createdBy: currentUserUid };
    if (editingId) { await db.ref('mosques/' + editingId).update(data); showToast("✅ Updated!"); }
    else { await db.ref('mosques').push(data); showToast("✅ Added!"); }
    editingId = null; modal.classList.remove('active'); resetOtpState();
}
async function deleteMosque(id) {
    const snap = await db.ref('mosques/' + id).once('value');
    if (!snap.val()) return;
    if (snap.val().createdBy === currentUserUid) {
        await db.ref('mosques/' + id).remove(); showToast("✅ Deleted!");
    } else showToast("❌ No permission.");
}

function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) * Math.sin(dLng/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 1000;
}

// Location
function requestLocation() {
    locationText.textContent = "Fetching GPS...";
    if (!navigator.geolocation) { useFallback("Geolocation not supported."); return; }
    const t = setTimeout(() => { if (!currentLat) useFallback("GPS timeout."); }, 5000);
    navigator.geolocation.getCurrentPosition(
        (pos) => { clearTimeout(t); currentLat = pos.coords.latitude; currentLng = pos.coords.longitude; onReady(); },
        () => { clearTimeout(t); useFallback("GPS error."); },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}
function useFallback(msg) { currentLat = DEFAULT_LAT; currentLng = DEFAULT_LNG; locationText.textContent = msg + " " + DEFAULT_LOCATION; onReady(); }
function onReady() { fetchLocationName(); initMap(); loadMosques(); }
async function fetchLocationName() {
    if (currentLat === DEFAULT_LAT && currentLng === DEFAULT_LNG) { locationText.textContent = "📍 " + DEFAULT_LOCATION; return; }
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${currentLat}&lon=${currentLng}&zoom=10&addressdetails=1`, { headers: { "Accept-Language": "en" } });
        const data = await res.json(); const addr = data.address || {};
        let name = addr.village || addr.town || addr.city || addr.municipality || addr.county || addr.state || "Current Location";
        if (currentLat && currentLng) {
            const dist = Math.sqrt(Math.pow(currentLat - DEFAULT_LAT, 2) + Math.pow(currentLng - DEFAULT_LNG, 2));
            if (dist < 0.12 && name.toLowerCase() === "ghotki") name = "Adilpur, Ghotki";
        }
        locationText.textContent = "📍 " + name;
    } catch (e) { locationText.textContent = "📍 Current Location"; }
}

// Map & Render
function initMap() {
    if (!mapContainer || typeof L === 'undefined') return;
    if (map) { map.remove(); map = null; }
    map = L.map(mapContainer).setView([currentLat, currentLng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    userMarker = L.marker([currentLat, currentLng], { icon: L.divIcon({ className: '', html: '<i class="fa-solid fa-location-dot" style="color:#d4af37;font-size:24px;"></i>', iconSize: [24,24], iconAnchor: [12,12] }) }).addTo(map);
    updateMapMarkers(combinedMosques);
}
function updateMapMarkers(list) {
    if (!map) return;
    mosqueMarkers.forEach(m => map.removeLayer(m)); mosqueMarkers = [];
    list.forEach(m => {
        const marker = L.marker([m.lat, m.lng], { icon: L.divIcon({ className: '', html: `<i class="fa-solid fa-mosque" style="color:#d4af37;font-size:${m.isFamous ? '28' : '20'}px;"></i>`, iconSize: [28,28], iconAnchor: [14,14] }) }).addTo(map);
        marker.bindPopup(`<b>${m.name}</b><br>${m.address}`);
        mosqueMarkers.push(marker);
    });
}

function renderAll(filteredList = null) {
    const list = filteredList || combinedMosques;
    renderMosques(list);
    updateMapMarkers(list);
}

// Render List with CLICK to show Detail Modal
function renderMosques(list) {
    if (!currentLat || !currentLng) return;
    if (!list.length) { mosqueList.innerHTML = `<div class="loading-msg">No mosques found.</div>`; return; }
    const withDist = list.map(m => ({ ...m, distance: getDistance(currentLat, currentLng, m.lat, m.lng) }));
    withDist.sort((a,b) => a.distance - b.distance);
    let html = '';
    withDist.forEach(m => {
        const distStr = m.distance < 1000 ? Math.round(m.distance) + ' m' : (m.distance/1000).toFixed(1) + ' km';
        const imgSrc = m.photo || 'https://via.placeholder.com/56/2a2a2a/d4af37?text=Mosque';
        html += `
            <div class="mosque-card" data-id="${m.id}" data-lat="${m.lat}" data-lng="${m.lng}" data-name="${m.name}" data-address="${m.address}" data-dist="${distStr}" data-user="${m.uName || 'Anonymous'}" data-famous="${m.isFamous || false}" data-photo="${m.photo || ''}">
                <img src="${imgSrc}" class="mosque-img" onerror="this.src='https://via.placeholder.com/56/2a2a2a/d4af37?text=Mosque'">
                <div class="mosque-info">
                    <h3>${m.name} ${m.isFamous ? '⭐' : ''}</h3>
                    <p>${m.address}</p>
                    <span class="distance">${distStr} away</span>
                </div>
                <div class="actions">
                    ${m.createdBy === currentUserUid && !m.isFamous ? `
                    <button class="edit-btn" data-id="${m.id}" onclick="event.stopPropagation()"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn" data-id="${m.id}" onclick="event.stopPropagation()"><i class="fa-solid fa-trash"></i></button>
                    ` : ''}
                </div>
            </div>
        `;
    });
    mosqueList.innerHTML = html;

    document.querySelectorAll('.mosque-card').forEach(card => {
        card.addEventListener('click', function() {
            openDetailModal(this.dataset);
        });
    });
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            const m = allMosques.find(x => x.id === id);
            if (!m) return;
            mosqueName.value = m.name; mosqueAddress.value = m.address;
            userName.value = m.uName || ''; fatherName.value = m.fName || '';
            phoneNumber.value = m.phone || '';
            modalTitle.textContent = "Edit Mosque"; editingId = id;
            modal.classList.add('active'); resetOtpState();
        });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm("Delete this mosque?")) deleteMosque(this.dataset.id);
        });
    });
}

function openDetailModal(data) {
    detailTitle.textContent = data.name;
    detailAddress.textContent = data.address;
    detailDistance.textContent = data.dist;
    detailUser.textContent = data.user;
    const imgSrc = data.photo || 'https://via.placeholder.com/400/2a2a2a/d4af37?text=Mosque';
    detailImg.src = imgSrc;
    if (data.famous === 'true') { detailFamousTag.style.display = 'block'; }
    else { detailFamousTag.style.display = 'none'; }
    detailMapBtn.onclick = () => {
        if (map) map.setView([data.lat, data.lng], 17);
        detailModal.classList.remove('active');
    };
    detailModal.classList.add('active');
}

// *** نیا سرچ: بغیر ریڈیئس کے، تمام مساجد دکھائی دیں گی ***
async function handleSearch() {
    const city = citySearch.value.trim();
    if (!city) { showToast("Please enter a city name."); return; }
    showToast(`Searching for ${city}...`);
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`);
        const data = await res.json();
        if (!data.length) { showToast("City not found."); return; }
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lng);
        
        // *** تمام مساجد کو فلٹر کریں (اب کوئی ریڈیئس نہیں) ***
        // صرف اُس شہر کے قریب ترین مساجد دکھانے کے لیے ہم انہیں فاصلے کے حساب سے ترتیب دیں گے
        const withDist = combinedMosques.map(m => ({ ...m, distance: getDistance(lat, lng, m.lat, m.lng) }));
        withDist.sort((a,b) => a.distance - b.distance);
        
        if (!withDist.length) { showToast("No mosques found."); return; }
        if (map) map.setView([lat, lng], 14);
        renderAll(withDist);
        showToast(`Found ${withDist.length} mosques near ${city}.`);
    } catch (e) { showToast("Search failed."); }
}

// OTP & Form
function resetOtpState() { generatedOtp = null; isOtpVerified = false; submitBtn.disabled = true; otpInput.disabled = true; otpInput.value = ''; otpStatus.textContent = ''; }
function setupListeners() {
    addBtn.addEventListener('click', function() {
        if (!currentLat || !currentLng) { showToast("Please wait for GPS."); return; }
        modalTitle.textContent = "Add Mosque"; editingId = null;
        form.reset(); resetOtpState(); mosquePhoto.value = '';
        modal.classList.add('active');
    });
    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
    closeDetailBtn.addEventListener('click', () => detailModal.classList.remove('active'));
    detailModal.addEventListener('click', (e) => { if (e.target === detailModal) detailModal.classList.remove('active'); });
    refreshBtn.addEventListener('click', () => { loadMosques(); showToast("Refreshed."); });
    searchCityBtn.addEventListener('click', handleSearch);
    citySearch.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });
    sendOtpBtn.addEventListener('click', function() {
        const phone = phoneNumber.value.trim();
        if (phone.length < 10) { showToast("Enter valid phone number."); return; }
        generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        otpInput.disabled = false; otpInput.focus();
        showToast(`Code sent! (Mock: ${generatedOtp})`);
        otpStatus.textContent = `Code sent (${generatedOtp})`; otpStatus.style.color = '#4caf50';
    });
    verifyOtpBtn.addEventListener('click', function() {
        const entered = otpInput.value.trim();
        if (!generatedOtp || !entered) { otpStatus.textContent = "Send code first."; otpStatus.style.color = '#e53935'; return; }
        if (entered === generatedOtp) { isOtpVerified = true; submitBtn.disabled = false; otpStatus.textContent = "✅ Verified!"; otpStatus.style.color = '#4caf50'; otpInput.disabled = true; }
        else { isOtpVerified = false; submitBtn.disabled = true; otpStatus.textContent = "❌ Incorrect code."; otpStatus.style.color = '#e53935'; }
    });
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!isOtpVerified) { showToast("Verify phone first."); return; }
        const name = mosqueName.value.trim(), address = mosqueAddress.value.trim();
        const uName = userName.value.trim(), fName = fatherName.value.trim(), phone = phoneNumber.value.trim();
        if (!name || !address || !uName || !fName || !phone) { showToast("Fill all fields."); return; }
        const file = mosquePhoto.files[0];
        let photoData = null;
        if (file) {
            if (file.size > 1 * 1024 * 1024) { showToast("Image < 1MB."); return; }
            const reader = new FileReader();
            reader.onload = (e) => { photoData = e.target.result; saveMosqueToRTDB(name, address, uName, fName, phone, photoData); };
            reader.readAsDataURL(file);
        } else { saveMosqueToRTDB(name, address, uName, fName, phone, null); }
    });
}

function showToast(msg) { toast.textContent = msg; toast.classList.add('show'); clearTimeout(toast._timer); toast._timer = setTimeout(() => toast.classList.remove('show'), 3000); }
function setupMoreNav() {
    if (!moreNavBtn || !moreMenu) return;
    moreNavBtn.addEventListener('click', (e) => { e.stopPropagation(); moreMenu.classList.toggle('show'); });
    document.addEventListener('click', () => moreMenu.classList.remove('show'));
    if (settingsBtn) settingsBtn.addEventListener('click', () => { moreMenu.classList.remove('show'); alert("Settings coming soon."); });
}

document.addEventListener('DOMContentLoaded', () => {
    initAuth(); requestLocation(); setupListeners(); setupMoreNav();
});