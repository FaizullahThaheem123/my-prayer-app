/* ==================================================
   CAMPUS.JS - COMPLETE ULTIMATE EDITION
   (Only More Menu changed to Quran Style)
================================================== */

"use strict";


/* ======================================
   QIBLA CONSTANTS
====================================== */

const KAABA_LATITUDE = 21.422487;
const KAABA_LONGITUDE = 39.826206;


/* ======================================
   HOME LOCATION FALLBACK
====================================== */

const DEFAULT_LATITUDE = 28.0065;
const DEFAULT_LONGITUDE = 69.3167;
const DEFAULT_LOCATION_NAME = "Adilpur, Ghotki";


/* ======================================
   GLOBAL VARIABLES
====================================== */

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


/* ======================================
   DOM ELEMENTS
====================================== */

const locationName =
    document.getElementById("locationName");

const locationRefreshBtn =
    document.getElementById("locationRefreshBtn");

const qiblaDegree =
    document.getElementById("qiblaDegree");

const qiblaStatus =
    document.getElementById("qiblaStatus");

const qiblaArrow =
    document.getElementById("qiblaArrow");

const compassMessage =
    document.getElementById("compassMessage");

const calibrateBtn =
    document.getElementById("calibrateBtn");

const bearingValue =
    document.getElementById("bearingValue");

const distanceValue =
    document.getElementById("distanceValue");

const latitudeValue =
    document.getElementById("latitudeValue");

const longitudeValue =
    document.getElementById("longitudeValue");

const mapLocationBtn =
    document.getElementById("mapLocationBtn");

const campusMessage =
    document.getElementById("campusMessage");

const campusMessageTitle =
    document.getElementById("campusMessageTitle");

const campusMessageText =
    document.getElementById("campusMessageText");

const campusMessageBtn =
    document.getElementById("campusMessageBtn");

const campusSettingsBtn =
    document.getElementById("campusSettingsBtn");

const campusSettingsPanel =
    document.getElementById("campusSettingsPanel");

const closeCampusSettingsBtn =
    document.getElementById("closeCampusSettingsBtn");

const settingsCalibrateBtn =
    document.getElementById("settingsCalibrateBtn");

const settingsLocationBtn =
    document.getElementById("settingsLocationBtn");

const moreNavBtn =
    document.getElementById("moreNavBtn");

const moreMenu =
    document.getElementById("moreMenu");

const liveHeading =
    document.getElementById("liveHeading");

// New elements for Quran-style More
const closeMoreMenuBtn =
    document.getElementById("closeMoreMenuBtn");


/* ======================================
   UTILITY FUNCTIONS
====================================== */

function normalizeAngle(angle){

    angle = Number(angle);

    if(isNaN(angle)){
        return 0;
    }

    angle = angle % 360;

    if(angle < 0){
        angle += 360;
    }

    return angle;
}


function angleDifference(a, b){

    let d =
        normalizeAngle(a) -
        normalizeAngle(b);

    if(d > 180){
        d -= 360;
    }

    if(d < -180){
        d += 360;
    }

    return d;
}


function calculateQiblaBearing(lat, lng){

    const l1 =
        lat *
        Math.PI /
        180;

    const l2 =
        KAABA_LATITUDE *
        Math.PI /
        180;

    const dLng =
        (
            KAABA_LONGITUDE -
            lng
        ) *
        Math.PI /
        180;

    const y =
        Math.sin(dLng) *
        Math.cos(l2);

    const x =
        Math.cos(l1) *
        Math.sin(l2)
        -
        Math.sin(l1) *
        Math.cos(l2) *
        Math.cos(dLng);

    return normalizeAngle(
        Math.atan2(y, x) *
        180 /
        Math.PI
    );
}


function calculateDistance(lat, lng){

    const R = 6371;

    const l1 =
        lat *
        Math.PI /
        180;

    const l2 =
        KAABA_LATITUDE *
        Math.PI /
        180;

    const dLat =
        (
            KAABA_LATITUDE -
            lat
        ) *
        Math.PI /
        180;

    const dLng =
        (
            KAABA_LONGITUDE -
            lng
        ) *
        Math.PI /
        180;

    const a =
        Math.sin(dLat / 2) ** 2
        +
        Math.cos(l1) *
        Math.cos(l2) *
        Math.sin(dLng / 2) ** 2;

    return (
        R *
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        )
    );
}


function getDirectionName(b){

    const dirs = [
        "North",
        "North-East",
        "East",
        "South-East",
        "South",
        "South-West",
        "West",
        "North-West"
    ];

    return dirs[
        Math.round(b / 45) % 8
    ];
}


function showLocationError(message){

    if(campusMessageTitle){
        campusMessageTitle.textContent =
            "Location Required";
    }

    if(campusMessageText){
        campusMessageText.textContent =
            message;
    }

    if(campusMessage){
        campusMessage.style.display =
            "block";
    }

}


function hideCampusMessage(){

    if(campusMessage){
        campusMessage.style.display =
            "none";
    }

}


/* ======================================
   HOME LOCATION
   SAME LOCATION AS HOME PAGE
====================================== */

function getHomeLocation(){

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
        parseFloat(savedLat);

    const lng =
        parseFloat(savedLng);


    if(
        Number.isFinite(lat) &&
        Number.isFinite(lng)
    ){

        currentLatitude =
            lat;

        currentLongitude =
            lng;


        if(locationName){

            locationName.textContent =
                savedName ||
                DEFAULT_LOCATION_NAME;

        }


        return true;

    }


    return false;

}


/* ======================================
   REQUEST LOCATION
   NOW USES HOME LOCATION ONLY
====================================== */

function requestLocation(){

    hideCampusMessage();


    if(locationName){

        locationName.textContent =
            "Loading Home location...";

    }


    /*
       IMPORTANT:

       Campus does NOT request GPS.

       It reads the exact location
       already saved by Home page.
    */

    const found =
        getHomeLocation();


    if(found){

        updateAll();

        return;

    }


    /*
       If Home location has not been
       saved yet, wait briefly.
    */

    let attempts = 0;


    const waitTimer =
        setInterval(
            function(){

                attempts++;


                if(
                    getHomeLocation()
                ){

                    clearInterval(
                        waitTimer
                    );


                    updateAll();

                    return;

                }


                if(attempts >= 30){

                    clearInterval(
                        waitTimer
                    );


                    useFallbackLocation(
                        "Home location unavailable. Using Adilpur."
                    );

                }

            },
            200
        );

}


/* ======================================
   FALLBACK LOCATION
====================================== */

function useFallbackLocation(message){

    currentLatitude =
        DEFAULT_LATITUDE;

    currentLongitude =
        DEFAULT_LONGITUDE;


    if(locationName){

        locationName.textContent =
            DEFAULT_LOCATION_NAME;

    }


    updateAll();

}


/* ======================================
   UPDATE ALL
====================================== */

function updateAll(){

    updateLocationData();

    updateQiblaData();

    updateMap();

}


/* ======================================
   LOCATION DATA
====================================== */

function updateLocationData(){

    if(
        latitudeValue &&
        currentLatitude != null
    ){

        latitudeValue.textContent =
            currentLatitude.toFixed(4) +
            "°N";

    }


    if(
        longitudeValue &&
        currentLongitude != null
    ){

        longitudeValue.textContent =
            currentLongitude.toFixed(4) +
            "°E";

    }

}


/* ======================================
   QIBLA DATA
====================================== */

function updateQiblaData(){

    if(
        currentLatitude == null ||
        currentLongitude == null
    ){

        return;

    }


    currentQiblaBearing =
        calculateQiblaBearing(
            currentLatitude,
            currentLongitude
        );


    currentDistance =
        calculateDistance(
            currentLatitude,
            currentLongitude
        );


    if(bearingValue){

        bearingValue.textContent =
            Math.round(
                currentQiblaBearing
            ) +
            "°";

    }


    if(distanceValue){

        distanceValue.textContent =
            Math.round(
                currentDistance
            ) +
            " km";

    }


    if(qiblaStatus){

        qiblaStatus.textContent =
            "LIVE";

    }


    updateCompassArrow();

}


/* ======================================
   LOCATION NAME
   HOME LOCATION NAME ONLY
====================================== */

async function getLocationName(){

    /*
       Campus now uses the same
       saved name from Home.
    */

    if(getHomeLocation()){

        if(locationName){

            const savedName =
                localStorage.getItem(
                    "userLocationName"
                );

            locationName.textContent =
                savedName ||
                DEFAULT_LOCATION_NAME;

        }

        return;

    }


    if(locationName){

        locationName.textContent =
            DEFAULT_LOCATION_NAME;

    }

}


/* ======================================
   MAP INITIALIZE
====================================== */

function initializeMap(){

    const el =
        document.getElementById(
            "qiblaMap"
        );


    if(
        !el ||
        typeof L === "undefined"
    ){

        return;

    }


    qiblaMap =
        L.map(el)
        .setView(
            [
                KAABA_LATITUDE,
                KAABA_LONGITUDE
            ],
            4
        );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19
        }
    ).addTo(
        qiblaMap
    );


    const ik =
        L.divIcon({

            className: "",

            html:
                '<i class="fa-solid fa-kaaba" style="color:#d4af37;font-size:24px;"></i>',

            iconSize: [
                24,
                24
            ],

            iconAnchor: [
                12,
                12
            ]

        });


    kaabaMarker =
        L.marker(
            [
                KAABA_LATITUDE,
                KAABA_LONGITUDE
            ],
            {
                icon: ik
            }
        )
        .addTo(
            qiblaMap
        );

}


/* ======================================
   UPDATE MAP
====================================== */

function updateMap(){

    if(
        !qiblaMap ||
        currentLatitude == null ||
        currentLongitude == null
    ){

        return;

    }


    const ll = [
        currentLatitude,
        currentLongitude
    ];


    if(userMarker){

        userMarker.setLatLng(
            ll
        );

    }
    else{

        const ui =
            L.divIcon({

                className: "",

                html:
                    '<i class="fa-solid fa-location-dot" style="color:#d4af37;font-size:24px;"></i>',

                iconSize: [
                    24,
                    24
                ],

                iconAnchor: [
                    12,
                    12
                ]

            });


        userMarker =
            L.marker(
                ll,
                {
                    icon: ui
                }
            )
            .addTo(
                qiblaMap
            );

    }


    if(qiblaLine){

        qiblaMap.removeLayer(
            qiblaLine
        );

    }


    qiblaLine =
        L.polyline(
            [
                ll,
                [
                    KAABA_LATITUDE,
                    KAABA_LONGITUDE
                ]
            ],
            {
                color: "#d4af37",
                weight: 2,
                dashArray: "6,6"
            }
        )
        .addTo(
            qiblaMap
        );


    qiblaMap.fitBounds(
        L.latLngBounds(
            [
                ll,
                [
                    KAABA_LATITUDE,
                    KAABA_LONGITUDE
                ]
            ]
        ),
        {
            padding: [
                30,
                30
            ]
        }
    );

}


/* ======================================
   GO TO HOME LOCATION
====================================== */

function goToMyLocation(){

    if(
        currentLatitude == null ||
        currentLongitude == null
    ){

        requestLocation();

        return;

    }


    if(qiblaMap){

        qiblaMap.setView(
            [
                currentLatitude,
                currentLongitude
            ],
            14,
            {
                animate: true
            }
        );

    }

}


/* ======================================
   COMPASS LOGIC
====================================== */

function updateCompassArrow(){

    if(
        currentQiblaBearing === null ||
        currentHeading === null
    ){

        return;

    }


    const rotation =
        angleDifference(
            currentQiblaBearing,
            currentHeading
        );


    if(qiblaArrow){

        qiblaArrow.style.transform =
            `translate(-50%, -50%) rotate(${rotation}deg)`;

    }


    if(qiblaDegree){

        qiblaDegree.textContent =
            Math.round(
                normalizeAngle(
                    currentHeading
                )
            );

    }


    if(liveHeading){

        liveHeading.textContent =
            Math.round(
                normalizeAngle(
                    currentHeading
                )
            );

    }


    if(compassMessage){

        if(
            Math.abs(rotation) <= 3
        ){

            compassMessage.textContent =
                "You are facing the Qibla!";

        }
        else if(
            rotation > 0
        ){

            compassMessage.textContent =
                "Turn right toward the Qibla";

        }
        else{

            compassMessage.textContent =
                "Turn left toward the Qibla";

        }

    }

}


/* ======================================
   DEVICE ORIENTATION
====================================== */

function handleOrientation(e){

    let h = null;


    if(
        typeof e.webkitCompassHeading ===
        "number"
    ){

        h =
            e.webkitCompassHeading;

    }
    else if(
        typeof e.alpha ===
        "number"
    ){

        h =
            360 -
            e.alpha;

    }


    if(
        h === null ||
        isNaN(h)
    ){

        return;

    }


    currentHeading =
        normalizeAngle(h);


    updateCompassArrow();

}


/* ======================================
   START COMPASS
====================================== */

async function startCompass(){

    if(compassListening){

        return;

    }


    if(
        typeof DeviceOrientationEvent !==
        "undefined" &&

        typeof DeviceOrientationEvent.requestPermission ===
        "function"
    ){

        try{

            const p =
                await DeviceOrientationEvent.requestPermission();


            if(
                p !== "granted"
            ){

                return;

            }

        }
        catch(error){

            console.error(
                "Compass permission error:",
                error
            );

            return;

        }

    }


    compassHandler =
        handleOrientation;


    window.addEventListener(
        "deviceorientation",
        compassHandler,
        true
    );


    compassListening =
        true;


    if(qiblaStatus){

        qiblaStatus.textContent =
            "LIVE";

    }

}


/* ======================================
   STOP COMPASS
====================================== */

function stopCompass(){

    if(
        compassListening &&
        compassHandler
    ){

        window.removeEventListener(
            "deviceorientation",
            compassHandler,
            true
        );

    }


    compassListening =
        false;

}


/* ======================================
   HOME LOCATION STORAGE SYNC
====================================== */

window.addEventListener(
    "storage",
    function(event){

        if(
            event.key ===
                "userLatitude" ||

            event.key ===
                "userLongitude" ||

            event.key ===
                "userLocationName"
        ){

            if(
                getHomeLocation()
            ){

                updateAll();

            }

        }

    }
);


/* ======================================
   CHECK HOME LOCATION
   EVERY 5 SECONDS
====================================== */

setInterval(
    function(){

        const oldLat =
            currentLatitude;

        const oldLng =
            currentLongitude;


        if(
            getHomeLocation()
        ){

            if(
                oldLat !== currentLatitude ||
                oldLng !== currentLongitude
            ){

                updateAll();

            }

        }

    },
    5000
);


/* ======================================
   EVENT LISTENERS
====================================== */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        initializeMap();

        setupListeners();

        setupMoreNav(); // NEW: Quran-style More menu

        requestLocation();

        startCompass();

    }
);


/* ======================================
   SETUP LISTENERS
====================================== */

function setupListeners(){

    /*
       Refresh now means:
       Reload Home location.
    */

    if(locationRefreshBtn){

        locationRefreshBtn.addEventListener(
            "click",
            function(){

                requestLocation();

            }
        );

    }


    if(calibrateBtn){

        calibrateBtn.addEventListener(
            "click",
            startCompass
        );

    }


    if(mapLocationBtn){

        mapLocationBtn.addEventListener(
            "click",
            goToMyLocation
        );

    }


    if(campusMessageBtn){

        campusMessageBtn.addEventListener(
            "click",
            requestLocation
        );

    }


    if(campusSettingsBtn){

        campusSettingsBtn.addEventListener(
            "click",
            function(){

                closeMoreMenu();

                if(campusSettingsPanel){

                    campusSettingsPanel.style.display =
                        "block";

                }

            }
        );

    }


    if(closeCampusSettingsBtn){

        closeCampusSettingsBtn.addEventListener(
            "click",
            function(){

                if(campusSettingsPanel){

                    campusSettingsPanel.style.display =
                        "none";

                }

            }
        );

    }


    if(settingsCalibrateBtn){

        settingsCalibrateBtn.addEventListener(
            "click",
            function(){

                if(campusSettingsPanel){

                    campusSettingsPanel.style.display =
                        "none";

                }

                startCompass();

            }
        );

    }


    if(settingsLocationBtn){

        settingsLocationBtn.addEventListener(
            "click",
            function(){

                if(campusSettingsPanel){

                    campusSettingsPanel.style.display =
                        "none";

                }

                requestLocation();

            }
        );

    }


    const settingsOverlay =
        document.querySelector(
            ".settings-overlay"
        );


    if(settingsOverlay){

        settingsOverlay.addEventListener(
            "click",
            function(){

                if(campusSettingsPanel){

                    campusSettingsPanel.style.display =
                        "none";

                }

            }
        );

    }

}


/* ======================================
   MORE NAV - QURAN STYLE (BOTTOM SHEET)
====================================== */

function closeMoreMenu(){

    if(moreMenu){

        moreMenu.classList.remove(
            "show"
        );

    }

}


function setupMoreNav(){

    if(
        !moreNavBtn ||
        !moreMenu ||
        !closeMoreMenuBtn
    ){

        return;

    }


    // Open More menu
    moreNavBtn.addEventListener(
        "click",
        function(e){

            e.stopPropagation();

            moreMenu.classList.add(
                "show"
            );

        }
    );


    // Close with X button
    closeMoreMenuBtn.addEventListener(
        "click",
        function(e){

            e.stopPropagation();

            moreMenu.classList.remove(
                "show"
            );

        }
    );


    // Close when clicking outside
    document.addEventListener(
        "click",
        function(e){

            if(
                moreMenu.classList.contains("show") &&
                !moreMenu.contains(e.target) &&
                !moreNavBtn.contains(e.target)
            ){

                moreMenu.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* ======================================
   VISIBILITY CHANGE
====================================== */

document.addEventListener(
    "visibilitychange",
    function(){

        if(
            document.hidden
        ){

            stopCompass();

        }
        else{

            if(
                currentQiblaBearing !== null
            ){

                startCompass();

            }

        }

    }
);


/* ======================================
   PAGE SHOW
====================================== */

window.addEventListener(
    "pageshow",
    function(){

        /*
           Re-read Home location whenever
           Campus page becomes visible.
        */

        if(
            getHomeLocation()
        ){

            updateAll();

        }


        if(
            currentQiblaBearing !== null
        ){

            startCompass();

        }

    }
);