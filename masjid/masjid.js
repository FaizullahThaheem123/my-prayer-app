/* ======================================
   MASJID.JS - COMPLETE A TO Z
   HOME LIVE LOCATION + FIREBASE + OSM
   GPS LOCATION SYNC + JAMAAT TIMES
   LIVE MAGHRIB AZAN + 3 MINUTES JAMAAT
====================================== */

"use strict";


/* ======================================
   FIREBASE CONFIG
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


/* ======================================
   FIREBASE INITIALIZE
====================================== */

if (
    typeof firebase !== "undefined" &&
    !firebase.apps.length
) {

    firebase.initializeApp(
        firebaseConfig
    );

}


const db =
    firebase.database();

const auth =
    firebase.auth();


/* ======================================
   CONSTANTS
====================================== */

/*
   IMPORTANT:

   These are ONLY FALLBACK coordinates.

   Normal operation uses the exact
   latitude/longitude saved by HOME PAGE.
*/

const DEFAULT_LAT = 28.0065;

const DEFAULT_LNG = 69.3167;

const DEFAULT_LOCATION =
    "Adilpur, Ghotki";


/*
   Search radius:

   10 KM
*/

const SEARCH_RADIUS = 10000;


/*
   Duplicate distance:

   Two mosques closer than 500m
   are treated as duplicate.
*/

const DUPLICATE_DISTANCE = 500;


/* ======================================
   DOM ELEMENTS
====================================== */

const locationText =
    document.getElementById(
        "locationText"
    );

const addBtn =
    document.getElementById(
        "addMosqueBtn"
    );

const refreshBtn =
    document.getElementById(
        "refreshBtn"
    );

const mosqueList =
    document.getElementById(
        "mosqueList"
    );

const mapContainer =
    document.getElementById(
        "mapContainer"
    );

const modal =
    document.getElementById(
        "addModal"
    );

const closeModalBtn =
    document.getElementById(
        "closeModalBtn"
    );

const form =
    document.getElementById(
        "addMosqueForm"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const mosqueName =
    document.getElementById(
        "mosqueName"
    );

const mosqueAddress =
    document.getElementById(
        "mosqueAddress"
    );

const userName =
    document.getElementById(
        "userName"
    );

const fatherName =
    document.getElementById(
        "fatherName"
    );

const phoneNumber =
    document.getElementById(
        "phoneNumber"
    );

const mosquePhoto =
    document.getElementById(
        "mosquePhoto"
    );

const submitBtn =
    document.getElementById(
        "submitBtn"
    );

const otpInput =
    document.getElementById(
        "otpInput"
    );

const sendOtpBtn =
    document.getElementById(
        "sendOtpBtn"
    );

const verifyOtpBtn =
    document.getElementById(
        "verifyOtpBtn"
    );

const otpStatus =
    document.getElementById(
        "otpStatus"
    );

const toast =
    document.getElementById(
        "toast"
    );

const moreNavBtn =
    document.getElementById(
        "moreNavBtn"
    );

const moreMenu =
    document.getElementById(
        "moreMenu"
    );

const settingsBtn =
    document.getElementById(
        "settingsBtn"
    );

const citySearch =
    document.getElementById(
        "citySearch"
    );

const searchCityBtn =
    document.getElementById(
        "searchCityBtn"
    );


/* ======================================
   JAMAAT INPUTS
====================================== */

const fajrJamaat =
    document.getElementById(
        "fajrJamaat"
    );

const dhuhrJamaat =
    document.getElementById(
        "dhuhrJamaat"
    );

const asrJamaat =
    document.getElementById(
        "asrJamaat"
    );

const maghribAzan =
    document.getElementById(
        "maghribAzan"
    );

const maghribJamaat =
    document.getElementById(
        "maghribJamaat"
    );

const ishaJamaat =
    document.getElementById(
        "ishaJamaat"
    );


/* ======================================
   DETAIL ELEMENTS
====================================== */

const detailModal =
    document.getElementById(
        "detailModal"
    );

const closeDetailBtn =
    document.getElementById(
        "closeDetailBtn"
    );

const detailTitle =
    document.getElementById(
        "detailTitle"
    );

const detailImg =
    document.getElementById(
        "detailImg"
    );

const detailName =
    document.getElementById(
        "detailName"
    );

const detailAddress =
    document.getElementById(
        "detailAddress"
    );

const detailDistance =
    document.getElementById(
        "detailDistance"
    );

const detailFajr =
    document.getElementById(
        "detailFajr"
    );

const detailDhuhr =
    document.getElementById(
        "detailDhuhr"
    );

const detailAsr =
    document.getElementById(
        "detailAsr"
    );

const detailMaghrib =
    document.getElementById(
        "detailMaghrib"
    );

const detailIsha =
    document.getElementById(
        "detailIsha"
    );

const detailAddedBy =
    document.getElementById(
        "detailAddedBy"
    );

const detailAddedByRow =
    document.getElementById(
        "detailAddedByRow"
    );

const detailMapBtn =
    document.getElementById(
        "detailMapBtn"
    );


/* ======================================
   GLOBAL VARIABLES
====================================== */

let currentLat = null;

let currentLng = null;

let viewLat = null;

let viewLng = null;

let isCitySearchActive = false;

let searchedCityName = "";

let userMosques = [];

let realMosques = [];

let allMosques = [];

let generatedOtp = null;

let isOtpVerified = false;

let editingId = null;

let editingLat = null;

let editingLng = null;

let map = null;

let userMarker = null;

let mosqueMarkers = [];

let currentUserUid = null;

let userMosquesLoaded = false;

let selectedDetailMosque = null;


/* ======================================
   FIREBASE AUTH
====================================== */

async function initAuth() {

    try {

        await auth.signInAnonymously();

        const user =
            auth.currentUser;

        if (user) {

            currentUserUid =
                user.uid;

        }

    }
    catch (error) {

        console.error(
            "Firebase Auth Error:",
            error
        );

        showToast(
            "Firebase login failed."
        );

    }

}


/* ======================================
   HOME LOCATION
   GET SAME LOCATION AS INDEX PAGE
====================================== */

function getHomeLocation() {

    const savedLat =
        localStorage.getItem(
            "userLatitude"
        );

    const savedLng =
        localStorage.getItem(
            "userLongitude"
        );

    const savedName =
        localStorage.getItem(
            "userLocationName"
        );


    const lat =
        parseFloat(
            savedLat
        );

    const lng =
        parseFloat(
            savedLng
        );


    if (
        Number.isFinite(lat) &&
        Number.isFinite(lng)
    ) {

        currentLat =
            lat;

        currentLng =
            lng;


        if (locationText) {

            locationText.textContent =
                "📍 " +
                (
                    savedName ||
                    DEFAULT_LOCATION
                );

        }


        return true;

    }


    return false;

}


/* ======================================
   WAIT FOR HOME LOCATION
====================================== */

async function waitForHomeLocation() {

    /*
       First attempt:
       Read immediately.
    */

    if (
        getHomeLocation()
    ) {

        return true;

    }


    /*
       Home page may still be saving GPS.
       Wait a few seconds.
    */

    for (
        let i = 0;
        i < 30;
        i++
    ) {

        await new Promise(
            function (resolve) {

                setTimeout(
                    resolve,
                    200
                );

            }
        );


        if (
            getHomeLocation()
        ) {

            return true;

        }

    }


    /*
       If Home location is unavailable,
       use fallback only.
    */

    currentLat =
        DEFAULT_LAT;

    currentLng =
        DEFAULT_LNG;


    if (locationText) {

        locationText.textContent =
            "📍 " +
            DEFAULT_LOCATION;

    }


    return false;

}


/* ======================================
   LOAD USER MOSQUES
====================================== */

function loadUserMosques() {

    const ref =
        db.ref(
            "mosques"
        );


    ref.on(
        "value",
        function (snapshot) {

            const data =
                snapshot.val();


            userMosques = [];


            if (data) {

                Object.keys(data)
                    .forEach(
                        function (key) {

                            const mosque =
                                data[key];


                            if (
                                mosque &&
                                mosque.lat != null &&
                                mosque.lng != null
                            ) {

                                userMosques.push({

                                    id:
                                        key,

                                    ...mosque,

                                    lat:
                                        Number(
                                            mosque.lat
                                        ),

                                    lng:
                                        Number(
                                            mosque.lng
                                        ),

                                    isUser:
                                        true

                                });

                            }

                        }
                    );

            }


            userMosquesLoaded =
                true;


            refreshVisibleMosques();

        }
    );

}


/* ======================================
   USER MOSQUES WITHIN RADIUS
====================================== */

function getUserMosquesWithinRadius(
    centerLat,
    centerLng
) {

    if (
        centerLat == null ||
        centerLng == null
    ) {

        return [];

    }


    return userMosques.filter(
        function (mosque) {

            return (
                getDistance(
                    centerLat,
                    centerLng,
                    mosque.lat,
                    mosque.lng
                ) <= SEARCH_RADIUS
            );

        }
    );

}


/* ======================================
   REFRESH CURRENT VIEW
====================================== */

function refreshVisibleMosques() {

    if (
        viewLat == null ||
        viewLng == null
    ) {

        return;

    }


    const nearbyUserMosques =
        getUserMosquesWithinRadius(
            viewLat,
            viewLng
        );


    let finalList = [];


    if (
        isCitySearchActive
    ) {

        finalList = [

            ...realMosques,

            ...nearbyUserMosques

        ];

    }
    else {

        finalList =
            nearbyUserMosques;

    }


    allMosques =
        removeDuplicateMosques(
            finalList
        );


    renderAll(
        allMosques,
        viewLat,
        viewLng
    );

}


/* ======================================
   REMOVE TRUE DUPLICATES ONLY
   ======================================

   IMPORTANT:

   Masjids ko distance ke basis par
   duplicate NAHI maana jayega.

   100m, 200m, 300m, 500m ke andar
   alag masjid ho to SAB dikhengi.

   Sirf same database ID / same OSM ID
   dobara aaye to duplicate remove hoga.
====================================== */

function removeDuplicateMosques(list) {

    const result = [];
    const seenIds = new Set();

    list.forEach(function (mosque) {

        if (
            !mosque ||
            mosque.lat == null ||
            mosque.lng == null
        ) {
            return;
        }

        /*
           Firebase mosque
           ID example:
           - -Oxxxxxxx

           OpenStreetMap mosque
           ID example:
           - node_123456
           - way_123456
           - relation_123456
        */

        const uniqueId =
            mosque.isUser === true
                ? "firebase_" + String(mosque.id || "")
                : "osm_" + String(mosque.osmId || "");

        /*
           Agar proper ID available hai
           aur same ID pehle aa chuki hai
           to sirf usko skip karo.
        */

        if (
            uniqueId !== "firebase_" &&
            uniqueId !== "osm_"
        ) {

            if (seenIds.has(uniqueId)) {
                return;
            }

            seenIds.add(uniqueId);

        }

        /*
           IMPORTANT:

           Yahan koi distance check nahi hai.

           Isliye:

           Masjid 1 = 100m
           Masjid 2 = 200m
           Masjid 3 = 300m
           Masjid 4 = 450m

           SAB show hongi.
        */

        result.push(mosque);

    });

    return result;

}


/* ======================================
   RENDER ALL
====================================== */

function renderAll(
    list,
    centerLat,
    centerLng
) {

    renderMosques(
        list,
        centerLat,
        centerLng
    );


    updateMapMarkers(
        list
    );

}


/* ======================================
   ESCAPE HTML
====================================== */

function escapeHtml(
    value
) {

    if (
        value == null
    ) {

        return "";

    }


    return String(
        value
    )

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* ======================================
   FORMAT JAMAAT TIME
====================================== */

function formatJamaatTime(
    time
) {

    if (!time) {

        return "--";

    }


    const parts =
        String(
            time
        ).split(":");


    if (
        parts.length < 2
    ) {

        return time;

    }


    let hour =
        parseInt(
            parts[0],
            10
        );


    const minute =
        parts[1];


    if (
        isNaN(hour)
    ) {

        return time;

    }


    const suffix =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 || 12;


    return (
        hour +
        ":" +
        minute +
        " " +
        suffix
    );

}


/* ======================================
   GET JAMAAT OBJECT
====================================== */

function getJamaatTimes(
    mosque
) {

    const j =
        mosque.jamaatTimes ||
        {};


    return {

        fajr:
            j.fajr || "",

        dhuhr:
            j.dhuhr || "",

        asr:
            j.asr || "",

        maghrib:
            j.maghrib || "",

        isha:
            j.isha || ""

    };

}


/* ======================================
   JAMAAT PREVIEW
====================================== */

function jamaatPreviewHtml(
    mosque
) {

    const j =
        getJamaatTimes(
            mosque
        );


    const values = [

        ["F", j.fajr],

        ["D", j.dhuhr],

        ["A", j.asr],

        ["M", j.maghrib],

        ["I", j.isha]

    ];


    let html = "";


    values.forEach(
        function (item) {

            if (item[1]) {

                html += `

                    <span>

                        <strong>
                            ${item[0]}
                        </strong>

                        ${escapeHtml(
                            formatJamaatTime(
                                item[1]
                            )
                        )}

                    </span>

                `;

            }

        }
    );


    return html;

}


/* ======================================
   RENDER MOSQUES
====================================== */

function renderMosques(
    list,
    centerLat,
    centerLng
) {

    if (
        centerLat == null ||
        centerLng == null
    ) {

        return;

    }


    if (!list.length) {

        mosqueList.innerHTML = `

            <div class="loading-msg">

                No mosques found within 10 km.

            </div>

        `;

        return;

    }


    const withDistance =
        list.map(
            function (mosque) {

                return {

                    ...mosque,

                    distance:
                        getDistance(
                            centerLat,
                            centerLng,
                            mosque.lat,
                            mosque.lng
                        )

                };

            }
        );


    withDistance.sort(
        function (a, b) {

            return (
                a.distance -
                b.distance
            );

        }
    );


    let html = "";


    withDistance.forEach(
        function (m) {

            const distStr =
                m.distance < 1000

                    ? Math.round(
                        m.distance
                    ) +
                    " m"

                    : (
                        m.distance /
                        1000
                    ).toFixed(1) +
                    " km";


            const imgSrc =
                m.photo ||
                "https://via.placeholder.com/56/2a2a2a/d4af37?text=Mosque";


            const safeName =
                escapeHtml(
                    m.name ||
                    "Masjid"
                );


            const safeAddress =
                escapeHtml(
                    m.address ||
                    "Location available"
                );


            const safeUser =
                escapeHtml(
                    m.uName ||
                    "Anonymous"
                );


            const isUser =
                m.isUser === true;


            const jamaatHtml =
                jamaatPreviewHtml(
                    m
                );


            html += `

                <div
                    class="mosque-card"
                    data-id="${escapeHtml(
                        m.id ||
                        m.osmId ||
                        ""
                    )}"
                    data-lat="${m.lat}"
                    data-lng="${m.lng}"
                >

                    <img
                        src="${imgSrc}"
                        class="mosque-img"
                        alt="Mosque"
                        onerror="this.src='https://via.placeholder.com/56/2a2a2a/d4af37?text=Mosque'"
                    >

                    <div class="mosque-info">

                        <h3>

                            ${safeName}

                            ${
                                isUser
                                    ? ""
                                    : " 📍"
                            }

                        </h3>

                        <p>
                            ${safeAddress}
                        </p>

                        <span class="distance">

                            ${distStr}
                            away

                        </span>

                        ${
                            jamaatHtml
                                ? `

                                    <div
                                        class="jamaat-preview"
                                    >

                                        ${jamaatHtml}

                                    </div>

                                  `
                                : ""
                        }

                        <small
                            style="
                            color:#777;
                            font-size:10px;
                            display:block;
                            margin-top:3px;
                            "
                        >

                            ${
                                isUser
                                    ? `Added by: ${safeUser}`
                                    : "OpenStreetMap"
                            }

                        </small>

                    </div>

                    <div class="actions">

                        <button
                            class="directions-btn"
                            data-lat="${m.lat}"
                            data-lng="${m.lng}"
                            type="button"
                            title="Show details"
                        >

                            <i
                                class="fa-solid fa-location-arrow"
                            ></i>

                        </button>

                        ${
                            isUser &&
                            m.createdBy ===
                            currentUserUid

                                ? `

                                    <button
                                        class="edit-btn"
                                        data-id="${m.id}"
                                        type="button"
                                        title="Edit mosque"
                                        onclick="event.stopPropagation()"
                                    >

                                        <i
                                            class="fa-solid fa-pen"
                                        ></i>

                                    </button>

                                    <button
                                        class="delete-btn"
                                        data-id="${m.id}"
                                        type="button"
                                        title="Delete mosque"
                                        onclick="event.stopPropagation()"
                                    >

                                        <i
                                            class="fa-solid fa-trash"
                                        ></i>

                                    </button>

                                  `

                                : ""
                        }

                    </div>

                </div>

            `;

        }
    );


    mosqueList.innerHTML =
        html;


    /* ==================================
       CARD CLICK
    ================================== */

    document
        .querySelectorAll(
            ".mosque-card"
        )
        .forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {

                        const id =
                            this.dataset.id;


                        const mosque =
                            findMosqueById(
                                id
                            );


                        if (mosque) {

                            openMosqueDetails(
                                mosque,
                                centerLat,
                                centerLng
                            );

                        }

                    }
                );

            }
        );


    /* ==================================
       DETAIL BUTTON
    ================================== */

    document
        .querySelectorAll(
            ".directions-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        const lat =
                            Number(
                                this.dataset.lat
                            );


                        const lng =
                            Number(
                                this.dataset.lng
                            );


                        if (map) {

                            map.setView(
                                [
                                    lat,
                                    lng
                                ],
                                17
                            );

                        }


                        const card =
                            this.closest(
                                ".mosque-card"
                            );


                        if (card) {

                            const mosque =
                                findMosqueById(
                                    card.dataset.id
                                );


                            if (mosque) {

                                openMosqueDetails(
                                    mosque,
                                    viewLat,
                                    viewLng
                                );

                            }

                        }

                    }
                );

            }
        );


    /* ==================================
       EDIT
    ================================== */

    document
        .querySelectorAll(
            ".edit-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        const id =
                            this.dataset.id;


                        const mosque =
                            userMosques.find(
                                function (item) {

                                    return (
                                        item.id ===
                                        id
                                    );

                                }
                            );


                        if (!mosque) {

                            showToast(
                                "Mosque not found."
                            );

                            return;

                        }


                        mosqueName.value =
                            mosque.name || "";


                        mosqueAddress.value =
                            mosque.address || "";


                        userName.value =
                            mosque.uName || "";


                        fatherName.value =
                            mosque.fName || "";


                        phoneNumber.value =
                            mosque.phone || "";


                        const j =
                            getJamaatTimes(
                                mosque
                            );


                        fajrJamaat.value =
                            j.fajr;


                        dhuhrJamaat.value =
                            j.dhuhr;


                        asrJamaat.value =
                            j.asr;


                        maghribJamaat.value =
                            j.maghrib;


                        ishaJamaat.value =
                            j.isha;


                        loadLiveMaghribAzan();


                        modalTitle.textContent =
                            "Edit Mosque";


                        editingId =
                            id;


                        editingLat =
                            Number(
                                mosque.lat
                            );


                        editingLng =
                            Number(
                                mosque.lng
                            );


                        mosquePhoto.value =
                            "";


                        modal.classList.add(
                            "active"
                        );


                        resetOtpState();

                    }
                );

            }
        );


    /* ==================================
       DELETE
    ================================== */

    document
        .querySelectorAll(
            ".delete-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        const id =
                            this.dataset.id;


                        if (
                            confirm(
                                "Delete this mosque?"
                            )
                        ) {

                            deleteMosque(
                                id
                            );

                        }

                    }
                );

            }
        );

}


/* ======================================
   FIND MOSQUE
====================================== */

function findMosqueById(
    id
) {

    return allMosques.find(
        function (mosque) {

            return (
                String(
                    mosque.id ||
                    mosque.osmId ||
                    ""
                ) ===
                String(id)
            );

        }
    );

}


/* ======================================
   OPEN MOSQUE DETAILS
====================================== */

function openMosqueDetails(
    mosque,
    centerLat,
    centerLng
) {

    selectedDetailMosque =
        mosque;


    const distance =
        getDistance(
            centerLat,
            centerLng,
            mosque.lat,
            mosque.lng
        );


    const distStr =
        distance < 1000

            ? Math.round(
                distance
            ) +
            " m"

            : (
                distance /
                1000
            ).toFixed(1) +
            " km";


    detailTitle.textContent =
        mosque.name ||
        "Mosque Details";


    detailName.textContent =
        mosque.name ||
        "Masjid";


    detailAddress.textContent =
        mosque.address ||
        "Location available";


    detailDistance.textContent =
        distStr;


    detailImg.src =
        mosque.photo ||
        "https://via.placeholder.com/400x200/2a2a2a/d4af37?text=Mosque";


    detailImg.onerror =
        function () {

            this.src =
                "https://via.placeholder.com/400x200/2a2a2a/d4af37?text=Mosque";

        };


    const j =
        getJamaatTimes(
            mosque
        );


    detailFajr.textContent =
        formatJamaatTime(
            j.fajr
        );


    detailDhuhr.textContent =
        formatJamaatTime(
            j.dhuhr
        );


    detailAsr.textContent =
        formatJamaatTime(
            j.asr
        );


    detailMaghrib.textContent =
        formatJamaatTime(
            j.maghrib
        );


    detailIsha.textContent =
        formatJamaatTime(
            j.isha
        );


    detailAddedByRow.style.display =
        "block";


    if (
        mosque.isUser
    ) {

        detailAddedBy.textContent =
            mosque.uName ||
            "Anonymous";

    }
    else {

        detailAddedBy.textContent =
            "OpenStreetMap";

    }


    detailModal.classList.add(
        "active"
    );

}


/* ======================================
   UPDATE MAP MARKERS
====================================== */

function updateMapMarkers(
    list
) {

    if (!map) {

        return;

    }


    mosqueMarkers.forEach(
        function (marker) {

            map.removeLayer(
                marker
            );

        }
    );


    mosqueMarkers = [];


    list.forEach(
        function (m) {

            if (
                m.lat == null ||
                m.lng == null
            ) {

                return;

            }


            const size =
                m.isUser
                    ? 20
                    : 24;


            const icon =
                L.divIcon({

                    className: "",

                    html: `

                        <i
                            class="fa-solid fa-mosque"
                            style="
                            color:#d4af37;
                            font-size:${size}px;
                            text-shadow:
                            0 2px 5px
                            rgba(0,0,0,.7);
                            "
                        ></i>

                    `,

                    iconSize: [
                        28,
                        28
                    ],

                    iconAnchor: [
                        14,
                        14
                    ]

                });


            const marker =
                L.marker(
                    [
                        m.lat,
                        m.lng
                    ],
                    {
                        icon: icon
                    }
                )
                .addTo(map);


            const name =
                escapeHtml(
                    m.name ||
                    "Masjid"
                );


            const address =
                escapeHtml(
                    m.address ||
                    "Location available"
                );


            const source =
                m.isUser
                    ? "Added by My Prayer user"
                    : "OpenStreetMap";


            const j =
                getJamaatTimes(
                    m
                );


            const popupJamaat =

                j.fajr ||
                j.dhuhr ||
                j.asr ||
                j.maghrib ||
                j.isha

                    ? `

                        <hr
                            style="
                            border:0;
                            border-top:
                            1px solid #555;
                            margin:5px 0;
                            "
                        >

                        <small>

                            Fajr:
                            ${escapeHtml(
                                formatJamaatTime(
                                    j.fajr
                                )
                            )}

                            <br>

                            Dhuhr:
                            ${escapeHtml(
                                formatJamaatTime(
                                    j.dhuhr
                                )
                            )}

                            <br>

                            Asr:
                            ${escapeHtml(
                                formatJamaatTime(
                                    j.asr
                                )
                            )}

                            <br>

                            Maghrib:
                            ${escapeHtml(
                                formatJamaatTime(
                                    j.maghrib
                                )
                            )}

                            <br>

                            Isha:
                            ${escapeHtml(
                                formatJamaatTime(
                                    j.isha
                                )
                            )}

                        </small>

                    `

                    : "";


            marker.bindPopup(`

                <strong>
                    ${name}
                </strong>

                <br>

                ${address}

                <br>

                <small>
                    ${source}
                </small>

                ${popupJamaat}

            `);


            mosqueMarkers.push(
                marker
            );

        }
    );

}


/* ======================================
   SAVE / UPDATE MOSQUE
====================================== */

async function saveMosqueToRTDB(
    name,
    address,
    uName,
    fName,
    phone,
    photo,
    jamaatTimes
) {

    /*
       NEW MOSQUE:

       Always use HOME LIVE LOCATION.

       EDIT:

       Keep original mosque coordinates.
    */

    const saveLat =
        editingId !== null &&
        editingLat !== null

            ? editingLat
            : currentLat;


    const saveLng =
        editingId !== null &&
        editingLng !== null

            ? editingLng
            : currentLng;


    if (
        saveLat == null ||
        saveLng == null
    ) {

        showToast(
            "❌ Live location unavailable."
        );

        return;

    }


    const data = {

        name:
            name,

        address:
            address,

        uName:
            uName,

        fName:
            fName,

        phone:
            phone,

        photo:
            photo,

        lat:
            saveLat,

        lng:
            saveLng,

        jamaatTimes: {

            fajr:
                jamaatTimes.fajr || "",

            dhuhr:
                jamaatTimes.dhuhr || "",

            asr:
                jamaatTimes.asr || "",

            maghrib:
                jamaatTimes.maghrib || "",

            isha:
                jamaatTimes.isha || ""

        },

        updatedAt:
            firebase.database
                .ServerValue
                .TIMESTAMP,

        createdBy:
            currentUserUid

    };


    try {

        if (
            editingId
        ) {

            await db
                .ref(
                    "mosques/" +
                    editingId
                )
                .update(
                    data
                );


            showToast(
                "✅ Mosque & Jamaat Times Updated!"
            );

        }
        else {

            data.createdAt =
                firebase.database
                    .ServerValue
                    .TIMESTAMP;


            await db
                .ref(
                    "mosques"
                )
                .push(
                    data
                );


            showToast(
                "✅ Mosque & Jamaat Times Added!"
            );

        }


        editingId =
            null;


        editingLat =
            null;


        editingLng =
            null;


        modal.classList.remove(
            "active"
        );


        resetOtpState();

    }
    catch (error) {

        console.error(
            "Save mosque error:",
            error
        );


        showToast(
            "❌ Could not save mosque."
        );

    }

}


/* ======================================
   DELETE MOSQUE
====================================== */

async function deleteMosque(
    id
) {

    try {

        const snapshot =
            await db
                .ref(
                    "mosques/" +
                    id
                )
                .once(
                    "value"
                );


        const data =
            snapshot.val();


        if (!data) {

            return;

        }


        if (
            data.createdBy ===
            currentUserUid
        ) {

            await db
                .ref(
                    "mosques/" +
                    id
                )
                .remove();


            showToast(
                "✅ Mosque Deleted!"
            );

        }
        else {

            showToast(
                "❌ No permission."
            );

        }

    }
    catch (error) {

        console.error(
            "Delete error:",
            error
        );


        showToast(
            "❌ Delete failed."
        );

    }

}


/* ======================================
   DISTANCE
====================================== */

function getDistance(
    lat1,
    lng1,
    lat2,
    lng2
) {

    if (
        lat1 == null ||
        lng1 == null ||
        lat2 == null ||
        lng2 == null
    ) {

        return Infinity;

    }


    const R =
        6371;


    const dLat =
        (lat2 - lat1) *
        (
            Math.PI /
            180
        );


    const dLng =
        (lng2 - lng1) *
        (
            Math.PI /
            180
        );


    const a =

        Math.sin(
            dLat / 2
        ) *
        Math.sin(
            dLat / 2
        )

        +

        Math.cos(
            lat1 *
            (
                Math.PI /
                180
            )
        )

        *

        Math.cos(
            lat2 *
            (
                Math.PI /
                180
            )
        )

        *

        Math.sin(
            dLng / 2
        ) *
        Math.sin(
            dLng / 2
        );


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(
                1 - a
            )
        );


    return (
        R *
        c *
        1000
    );

}


/* ======================================
   REQUEST LOCATION
   USE HOME LOCATION ONLY
====================================== */

async function requestLocation() {

    if (locationText) {

        locationText.textContent =
            "📍 Loading Home location...";

    }


    /*
       IMPORTANT:

       DO NOT call navigator.geolocation
       here.

       Home page already detected the GPS.
       Masjid page uses the same saved GPS.
    */

    const gotHomeLocation =
        await waitForHomeLocation();


    if (!gotHomeLocation) {

        console.warn(
            "Home GPS not available. Using Adilpur fallback."
        );

    }


    onReady();

}


/* ======================================
   READY
====================================== */

function onReady() {

    viewLat =
        currentLat;


    viewLng =
        currentLng;


    isCitySearchActive =
        false;


    searchedCityName =
        "";


    realMosques =
        [];


    /*
       Do NOT detect another location.

       We already have Home location.
    */


    initMap();


    loadUserMosques();


    loadLiveMaghribAzan();


    /*
       If Home page later updates location,
       refresh Masjid page automatically.
    */

}


/* ======================================
   HOME LOCATION STORAGE LISTENER
====================================== */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key ===
                "userLatitude" ||

            event.key ===
                "userLongitude" ||

            event.key ===
                "userLocationName"
        ) {

            if (
                getHomeLocation()
            ) {

                viewLat =
                    currentLat;

                viewLng =
                    currentLng;


                isCitySearchActive =
                    false;


                realMosques =
                    [];


                if (map) {

                    map.setView(
                        [
                            currentLat,
                            currentLng
                        ],
                        13
                    );


                    if (userMarker) {

                        userMarker.setLatLng(
                            [
                                currentLat,
                                currentLng
                            ]
                        );

                    }

                }


                refreshVisibleMosques();

            }

        }

    }
);


/* ======================================
   INIT MAP
====================================== */

function initMap() {

    if (
        !mapContainer ||
        typeof L ===
            "undefined"
    ) {

        return;

    }


    if (map) {

        map.remove();

        map = null;

    }


    map =
        L.map(
            mapContainer
        )
        .setView(
            [
                currentLat,
                currentLng
            ],
            13
        );


    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom:
                19,

            attribution:
                "&copy; OpenStreetMap contributors"

        }

    ).addTo(
        map
    );


    userMarker =
        L.marker(

            [
                currentLat,
                currentLng
            ],

            {

                icon:
                    L.divIcon({

                        className:
                            "",

                        html: `

                            <i
                                class="fa-solid fa-location-dot"
                                style="
                                color:#d4af37;
                                font-size:24px;
                                text-shadow:
                                0 2px 5px
                                rgba(0,0,0,.7);
                                "
                            ></i>

                        `,

                        iconSize: [
                            24,
                            24
                        ],

                        iconAnchor: [
                            12,
                            12
                        ]

                    })

            }

        )
        .addTo(
            map
        )
        .bindPopup(
            "Your Home Location"
        );

}


/* ======================================
   CITY SEARCH
====================================== */

async function handleSearch() {

    const city =
        citySearch.value.trim();


    if (!city) {

        showToast(
            "Please enter a city name."
        );

        return;

    }


    showToast(
        "Searching " +
        city +
        "..."
    );


    if (!userMosquesLoaded) {

        showToast(
            "Loading your mosques..."
        );


        let attempts =
            0;


        while (
            !userMosquesLoaded &&
            attempts < 30
        ) {

            await new Promise(
                function (resolve) {

                    setTimeout(
                        resolve,
                        100
                    );

                }
            );


            attempts++;

        }


        if (!userMosquesLoaded) {

            showToast(
                "Could not load your mosques. Please refresh."
            );

            return;

        }

    }


    let lat =
        null;

    let lng =
        null;


    try {

        const geocodeUrl =

            "https://nominatim.openstreetmap.org/search" +

            "?format=json" +

            "&q=" +
            encodeURIComponent(
                city
            ) +

            "&limit=1";


        const response =
            await fetch(
                geocodeUrl,
                {

                    headers: {

                        "Accept-Language":
                            "en"

                    }

                }
            );


        if (!response.ok) {

            throw new Error(
                "Geocoding failed"
            );

        }


        const data =
            await response.json();


        if (
            !data ||
            !data.length
        ) {

            throw new Error(
                "City not found"
            );

        }


        lat =
            parseFloat(
                data[0].lat
            );


        lng =
            parseFloat(
                data[0].lon
            );

    }
    catch (error) {

        console.error(
            "City search error:",
            error
        );


        showToast(
            "City not found. Please check spelling."
        );


        return;

    }


    isCitySearchActive =
        true;


    searchedCityName =
        city;


    viewLat =
        lat;


    viewLng =
        lng;


    if (map) {

        map.setView(
            [
                lat,
                lng
            ],
            14
        );

    }


    realMosques =
        await fetchRealMosques(
            lat,
            lng
        );


    const nearbyUserMosques =
        getUserMosquesWithinRadius(
            lat,
            lng
        );


    const combined =
        removeDuplicateMosques(
            [

                ...realMosques,

                ...nearbyUserMosques

            ]
        );


    allMosques =
        combined;


    renderAll(
        allMosques,
        lat,
        lng
    );


    if (
        !combined.length
    ) {

        showToast(
            "No mosques found within 10 km of " +
            city +
            "."
        );

        return;

    }


    showToast(
        "Found " +
        combined.length +
        " mosques near " +
        city +
        "."
    );

}


/* ======================================
   FETCH REAL OSM MOSQUES
====================================== */

async function fetchRealMosques(
    lat,
    lng
) {

    const radius =
        SEARCH_RADIUS;


    const query =

        `[out:json][timeout:25];` +

        `(` +

        `nwr["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});` +

        `nwr["amenity"="place_of_worship"]["name"~"mosque|masjid|مسجد",i](around:${radius},${lat},${lng});` +

        `);` +

        `out center tags;`;


    const encodedQuery =
        encodeURIComponent(
            query
        );


    const endpoints = [

        "https://overpass-api.de/api/interpreter?data=" +
        encodedQuery,

        "https://overpass.kumi.systems/api/interpreter?data=" +
        encodedQuery,

        "https://overpass.private.coffee/api/interpreter?data=" +
        encodedQuery

    ];


    for (
        const endpoint of endpoints
    ) {

        try {

            const response =
                await fetch(
                    endpoint
                );


            if (
                !response.ok
            ) {

                continue;

            }


            const data =
                await response.json();


            if (
                !data ||
                !Array.isArray(
                    data.elements
                )
            ) {

                continue;

            }


            const mosques =
                [];


            data.elements.forEach(
                function (element) {

                    const elementLat =
                        element.lat ??
                        (
                            element.center &&
                            element.center.lat
                        );


                    const elementLng =
                        element.lon ??
                        (
                            element.center &&
                            element.center.lon
                        );


                    if (
                        elementLat == null ||
                        elementLng == null
                    ) {

                        return;

                    }


                    const tags =
                        element.tags ||
                        {};


                    const name =

                        tags.name ||

                        tags["name:en"] ||

                        tags["name:ur"] ||

                        tags["name:ar"] ||

                        "Masjid";


                    const street =
                        tags["addr:street"] ||
                        "";


                    const city =
                        tags["addr:city"] ||
                        "";


                    let address =
                        street;


                    if (
                        street &&
                        city
                    ) {

                        address =
                            street +
                            ", " +
                            city;

                    }
                    else if (
                        city
                    ) {

                        address =
                            city;

                    }


                    if (!address) {

                        address =
                            "Location on OpenStreetMap";

                    }


                    mosques.push({

                        osmId:
                            element.type +
                            "_" +
                            element.id,

                        lat:
                            Number(
                                elementLat
                            ),

                        lng:
                            Number(
                                elementLng
                            ),

                        name:
                            name,

                        address:
                            address,

                        isUser:
                            false,

                        photo:
                            null,

                        jamaatTimes:
                            {}

                    });

                }
            );


            return removeDuplicateMosques(
                mosques
            );

        }
        catch (error) {

            console.error(
                "Overpass error:",
                error
            );

        }

    }


    return [];

}


/* ======================================
   OTP RESET
====================================== */

function resetOtpState() {

    generatedOtp =
        null;


    isOtpVerified =
        false;


    if (submitBtn) {

        submitBtn.disabled =
            true;

    }


    if (otpInput) {

        otpInput.disabled =
            true;

        otpInput.value =
            "";

    }


    if (otpStatus) {

        otpStatus.textContent =
            "";

        otpStatus.style.color =
            "";

    }

}


/* ======================================
   CLEAR FORM
====================================== */

function clearMosqueForm() {

    if (form) {

        form.reset();

    }


    if (fajrJamaat) {

        fajrJamaat.value =
            "";

    }


    if (dhuhrJamaat) {

        dhuhrJamaat.value =
            "";

    }


    if (asrJamaat) {

        asrJamaat.value =
            "";

    }


    if (maghribJamaat) {

        maghribJamaat.value =
            "";

    }


    if (ishaJamaat) {

        ishaJamaat.value =
            "";

    }


    loadLiveMaghribAzan();

}


/* ======================================
   LIVE MAGHRIB
====================================== */

function getMaghribJamaatTime(
    azanTime
) {

    if (!azanTime) {

        return "";

    }


    const parts =
        String(
            azanTime
        ).split(":");


    if (
        parts.length !== 2
    ) {

        return "";

    }


    let hours =
        parseInt(
            parts[0],
            10
        );


    let minutes =
        parseInt(
            parts[1],
            10
        );


    if (
        isNaN(hours) ||
        isNaN(minutes)
    ) {

        return "";

    }


    minutes += 3;


    if (
        minutes >= 60
    ) {

        minutes -= 60;

        hours += 1;

    }


    if (
        hours >= 24
    ) {

        hours = 0;

    }


    return (

        String(
            hours
        ).padStart(
            2,
            "0"
        )

        +

        ":" +

        String(
            minutes
        ).padStart(
            2,
            "0"
        )

    );

}


/* ======================================
   LOAD LIVE MAGHRIB AZAN
====================================== */

function loadLiveMaghribAzan() {

    const azanInput =
        document.getElementById(
            "maghribAzan"
        );


    const jamaatInput =
        document.getElementById(
            "maghribJamaat"
        );


    if (
        !azanInput ||
        !jamaatInput
    ) {

        return;

    }


    const liveMaghrib =
        localStorage.getItem(
            "liveMaghribAzan"
        );


    if (!liveMaghrib) {

        azanInput.value =
            "";

        jamaatInput.value =
            "";

        return;

    }


    let normalized =
        String(
            liveMaghrib
        ).trim();


    const twelveHour =
        normalized.match(
            /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
        );


    if (
        twelveHour
    ) {

        let hours =
            parseInt(
                twelveHour[1],
                10
            );


        const minutes =
            parseInt(
                twelveHour[2],
                10
            );


        const period =
            twelveHour[3]
                .toUpperCase();


        if (
            period === "PM" &&
            hours !== 12
        ) {

            hours += 12;

        }


        if (
            period === "AM" &&
            hours === 12
        ) {

            hours = 0;

        }


        normalized =

            String(
                hours
            ).padStart(
                2,
                "0"
            )

            +

            ":" +

            String(
                minutes
            ).padStart(
                2,
                "0"
            );

    }


    const twentyFour =
        normalized.match(
            /^(\d{1,2}):(\d{2})$/
        );


    if (
        !twentyFour
    ) {

        return;

    }


    const hours =
        parseInt(
            twentyFour[1],
            10
        );


    const minutes =
        parseInt(
            twentyFour[2],
            10
        );


    if (
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
    ) {

        return;

    }


    const azanValue =

        String(
            hours
        ).padStart(
            2,
            "0"
        )

        +

        ":" +

        String(
            minutes
        ).padStart(
            2,
            "0"
        );


    azanInput.value =
        azanValue;


    jamaatInput.value =
        getMaghribJamaatTime(
            azanValue
        );

}


/* ======================================
   SETUP LISTENERS
====================================== */

function setupListeners() {


    /* ==================================
       ADD MOSQUE
    ================================== */

    if (addBtn) {

        addBtn.addEventListener(
            "click",
            function () {

                if (
                    currentLat == null ||
                    currentLng == null
                ) {

                    showToast(
                        "Please wait for Home location."
                    );

                    return;

                }


                modalTitle.textContent =
                    "Add Mosque";


                editingId =
                    null;


                editingLat =
                    null;


                editingLng =
                    null;


                clearMosqueForm();


                resetOtpState();


                if (
                    mosquePhoto
                ) {

                    mosquePhoto.value =
                        "";

                }


                modal.classList.add(
                    "active"
                );

            }
        );

    }


    /* ==================================
       CLOSE ADD MODAL
    ================================== */

    if (closeModalBtn) {

        closeModalBtn.addEventListener(
            "click",
            function () {

                modal.classList.remove(
                    "active"
                );

            }
        );

    }


    /* ==================================
       CLOSE DETAIL
    ================================== */

    if (closeDetailBtn) {

        closeDetailBtn.addEventListener(
            "click",
            function () {

                detailModal.classList.remove(
                    "active"
                );


                selectedDetailMosque =
                    null;

            }
        );

    }


    /* ==================================
       MODAL BACKGROUND
    ================================== */

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    modal
                ) {

                    modal.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    if (detailModal) {

        detailModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    detailModal
                ) {

                    detailModal.classList.remove(
                        "active"
                    );


                    selectedDetailMosque =
                        null;

                }

            }
        );

    }


    /* ==================================
       REFRESH
    ================================== */

    if (refreshBtn) {

        refreshBtn.addEventListener(
            "click",
            async function () {

                loadLiveMaghribAzan();


                /*
                   Re-read SAME Home location.
                */

                getHomeLocation();


                if (
                    currentLat == null ||
                    currentLng == null
                ) {

                    await requestLocation();

                    return;

                }


                if (
                    isCitySearchActive
                ) {

                    await handleSearch();

                }
                else {

                    viewLat =
                        currentLat;


                    viewLng =
                        currentLng;


                    refreshVisibleMosques();

                }


                showToast(
                    "Refreshed."
                );

            }
        );

    }


    /* ==================================
       CITY SEARCH
    ================================== */

    if (searchCityBtn) {

        searchCityBtn.addEventListener(
            "click",
            handleSearch
        );

    }


    if (citySearch) {

        citySearch.addEventListener(
            "keypress",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    handleSearch();

                }

            }
        );

    }


    /* ==================================
       SEND OTP
    ================================== */

    if (sendOtpBtn) {

        sendOtpBtn.addEventListener(
            "click",
            function () {

                const phone =
                    phoneNumber.value.trim();


                if (
                    phone.length < 10
                ) {

                    showToast(
                        "Enter valid phone number."
                    );

                    return;

                }


                generatedOtp =
                    Math.floor(
                        1000 +
                        Math.random() *
                        9000
                    ).toString();


                otpInput.disabled =
                    false;


                otpInput.focus();


                showToast(
                    "Code sent!"
                );


                /*
                   NOTE:

                   This is currently a demo OTP.
                   It is NOT actually sent by SMS.
                */

                otpStatus.textContent =
                    "Code sent (" +
                    generatedOtp +
                    ")";


                otpStatus.style.color =
                    "#4caf50";

            }
        );

    }


    /* ==================================
       VERIFY OTP
    ================================== */

    if (verifyOtpBtn) {

        verifyOtpBtn.addEventListener(
            "click",
            function () {

                const entered =
                    otpInput.value.trim();


                if (
                    !generatedOtp ||
                    !entered
                ) {

                    otpStatus.textContent =
                        "Send code first.";


                    otpStatus.style.color =
                        "#e53935";


                    return;

                }


                if (
                    entered ===
                    generatedOtp
                ) {

                    isOtpVerified =
                        true;


                    submitBtn.disabled =
                        false;


                    otpStatus.textContent =
                        "✅ Verified!";


                    otpStatus.style.color =
                        "#4caf50";


                    otpInput.disabled =
                        true;

                }
                else {

                    isOtpVerified =
                        false;


                    submitBtn.disabled =
                        true;


                    otpStatus.textContent =
                        "❌ Incorrect code.";


                    otpStatus.style.color =
                        "#e53935";

                }

            }
        );

    }


    /* ==================================
       FORM SUBMIT
    ================================== */

    if (form) {

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (!isOtpVerified) {

                    showToast(
                        "Verify phone first."
                    );

                    return;

                }


                const name =
                    mosqueName.value.trim();


                const address =
                    mosqueAddress.value.trim();


                const uName =
                    userName.value.trim();


                const fName =
                    fatherName.value.trim();


                const phone =
                    phoneNumber.value.trim();


                if (
                    !name ||
                    !address ||
                    !uName ||
                    !fName ||
                    !phone
                ) {

                    showToast(
                        "Fill all fields."
                    );

                    return;

                }


                /*
                   NEW MOSQUE MUST USE
                   HOME LIVE LOCATION.
                */

                if (
                    !editingId &&
                    (
                        currentLat == null ||
                        currentLng == null
                    )
                ) {

                    showToast(
                        "Home location not available."
                    );

                    return;

                }


                loadLiveMaghribAzan();


                const jamaatTimes = {

                    fajr:
                        fajrJamaat.value,

                    dhuhr:
                        dhuhrJamaat.value,

                    asr:
                        asrJamaat.value,

                    maghrib:
                        maghribJamaat.value,

                    isha:
                        ishaJamaat.value

                };


                const file =
                    mosquePhoto.files[0];


                let photoData =
                    null;


                if (file) {

                    if (
                        file.size >
                        1 *
                        1024 *
                        1024
                    ) {

                        showToast(
                            "Image must be less than 1MB."
                        );

                        return;

                    }


                    const reader =
                        new FileReader();


                    reader.onload =
                        function (event) {

                            photoData =
                                event.target.result;


                            saveMosqueToRTDB(

                                name,

                                address,

                                uName,

                                fName,

                                phone,

                                photoData,

                                jamaatTimes

                            );

                        };


                    reader.readAsDataURL(
                        file
                    );

                }
                else {

                    let oldPhoto =
                        null;


                    if (
                        editingId
                    ) {

                        const existing =
                            userMosques.find(
                                function (item) {

                                    return (
                                        item.id ===
                                        editingId
                                    );

                                }
                            );


                        if (existing) {

                            oldPhoto =
                                existing.photo ||
                                null;

                        }

                    }


                    saveMosqueToRTDB(

                        name,

                        address,

                        uName,

                        fName,

                        phone,

                        oldPhoto,

                        jamaatTimes

                    );

                }

            }
        );

    }


    /* ==================================
       DETAIL MAP BUTTON
    ================================== */

    if (detailMapBtn) {

        detailMapBtn.addEventListener(
            "click",
            function () {

                if (
                    !selectedDetailMosque
                ) {

                    return;

                }


                const lat =
                    Number(
                        selectedDetailMosque.lat
                    );


                const lng =
                    Number(
                        selectedDetailMosque.lng
                    );


                detailModal.classList.remove(
                    "active"
                );


                if (map) {

                    map.setView(
                        [
                            lat,
                            lng
                        ],
                        17
                    );


                    setTimeout(
                        function () {

                            mosqueMarkers.forEach(
                                function (marker) {

                                    const pos =
                                        marker.getLatLng();


                                    if (
                                        Math.abs(
                                            pos.lat -
                                            lat
                                        ) <
                                        0.000001 &&

                                        Math.abs(
                                            pos.lng -
                                            lng
                                        ) <
                                        0.000001
                                    ) {

                                        marker.openPopup();

                                    }

                                }
                            );

                        },
                        300
                    );

                }

            }
        );

    }

}


/* ======================================
   TOAST
====================================== */

function showToast(
    message
) {

    if (!toast) {

        return;

    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toast._timer
    );


    toast._timer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* ======================================
   MORE NAV
====================================== */

function setupMoreNav() {

    if (
        !moreNavBtn ||
        !moreMenu
    ) {

        return;

    }


    moreNavBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            moreMenu.classList.toggle(
                "show"
            );

        }
    );


    document.addEventListener(
        "click",
        function () {

            moreMenu.classList.remove(
                "show"
            );

        }
    );


    moreMenu.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    if (settingsBtn) {

        settingsBtn.addEventListener(
            "click",
            function () {

                moreMenu.classList.remove(
                    "show"
                );


                alert(
                    "Settings coming soon."
                );

            }
        );

    }

}


/* ======================================
   DOM READY
====================================== */

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        /*
           Firebase
        */

        initAuth();


        /*
           IMPORTANT:

           Masjid page now waits for the
           SAME location saved by Home.
        */

        await requestLocation();


        /*
           Setup UI
        */

        setupListeners();


        setupMoreNav();


        /*
           Live Maghrib
        */

        loadLiveMaghribAzan();

    }
);


/* ======================================
   LIVE MAGHRIB REFRESH
====================================== */

setInterval(
    function () {

        loadLiveMaghribAzan();

    },
    30000
);


/* ======================================
   HOME LOCATION CHECK
   EVERY 5 SECONDS
====================================== */

setInterval(
    function () {

        const oldLat =
            currentLat;

        const oldLng =
            currentLng;


        if (
            getHomeLocation()
        ) {

            if (
                oldLat !== currentLat ||
                oldLng !== currentLng
            ) {

                viewLat =
                    currentLat;


                viewLng =
                    currentLng;


                isCitySearchActive =
                    false;


                realMosques =
                    [];


                if (map) {

                    map.setView(
                        [
                            currentLat,
                            currentLng
                        ],
                        13
                    );

                }


                refreshVisibleMosques();

            }

        }

    },
    5000
);