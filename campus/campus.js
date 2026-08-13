/* ======================================
   MY PRAYER - CAMPUS / QIBLA
   JAVASCRIPT - COMPLETE
====================================== */

"use strict";


/* ======================================
   KAABA
====================================== */

const KAABA_LATITUDE = 21.422487;
const KAABA_LONGITUDE = 39.826206;


/* ======================================
   GLOBAL VARIABLES
====================================== */

let currentLatitude = null;
let currentLongitude = null;

let qiblaBearing = null;

let currentHeading = null;

let campusMap = null;

let userMarker = null;
let kaabaMarker = null;
let qiblaLine = null;

let compassActive = false;
let orientationListening = false;
let locationWatchId = null;

let orientationEventType = null;


/* ======================================
   ELEMENTS
====================================== */

const locationName =
    document.getElementById("locationName");

const locationStatus =
    document.getElementById("locationStatus");

const qiblaDegree =
    document.getElementById("qiblaDegree");

const qiblaBearingLive =
    document.getElementById("qiblaBearingLive");

const qiblaArrow =
    document.getElementById("qiblaArrow");

const qiblaStatus =
    document.getElementById("qiblaStatus");

const compassMessage =
    document.getElementById("compassMessage");

const bearingValue =
    document.getElementById("bearingValue");

const distanceValue =
    document.getElementById("distanceValue");

const latitudeValue =
    document.getElementById("latitudeValue");

const longitudeValue =
    document.getElementById("longitudeValue");

const directionText =
    document.getElementById("directionText");

const directionDescription =
    document.getElementById("directionDescription");

const campusMessage =
    document.getElementById("campusMessage");

const campusMessageTitle =
    document.getElementById("campusMessageTitle");

const campusMessageText =
    document.getElementById("campusMessageText");

const campusMessageBtn =
    document.getElementById("campusMessageBtn");

const campusSettingsPanel =
    document.getElementById("campusSettingsPanel");

const campusHomeBtn =
    document.getElementById("campusHomeBtn");

const campusSettingsBtn =
    document.getElementById("campusSettingsBtn");

const closeCampusSettingsBtn =
    document.getElementById("closeCampusSettingsBtn");

const locationRefreshBtn =
    document.getElementById("locationRefreshBtn");

const mapLocationBtn =
    document.getElementById("mapLocationBtn");

const calibrateBtn =
    document.getElementById("calibrateBtn");

const settingsCalibrateBtn =
    document.getElementById("settingsCalibrateBtn");

const settingsLocationBtn =
    document.getElementById("settingsLocationBtn");


/* ======================================
   START
====================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeCampus();

    }
);


/* ======================================
   INITIALIZE
====================================== */

function initializeCampus() {

    console.log(
        "My Prayer Qibla started"
    );


    initializeMap();

    requestLocation();

    setupCampusButtons();

    setupCompass();

    setupThemeSupport();

}


/* ======================================
   BUTTONS
====================================== */

function setupCampusButtons() {


    /* HOME */

    if (campusHomeBtn) {

        campusHomeBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "../index.html";

            }
        );

    }


    /* SETTINGS */

    if (campusSettingsBtn) {

        campusSettingsBtn.addEventListener(
            "click",
            function () {

                openCampusSettings();

            }
        );

    }


    /* CLOSE SETTINGS */

    if (closeCampusSettingsBtn) {

        closeCampusSettingsBtn.addEventListener(
            "click",
            function () {

                closeCampusSettings();

            }
        );

    }


    /* REFRESH LOCATION */

    if (locationRefreshBtn) {

        locationRefreshBtn.addEventListener(
            "click",
            function () {

                requestLocation();

            }
        );

    }


    /* MAP LOCATION */

    if (mapLocationBtn) {

        mapLocationBtn.addEventListener(
            "click",
            function () {

                centerMapOnUser();

            }
        );

    }


    /* CALIBRATE / ENABLE */

    if (calibrateBtn) {

        calibrateBtn.addEventListener(
            "click",
            function () {

                calibrateCompass();

            }
        );

    }


    /* SETTINGS CALIBRATE */

    if (settingsCalibrateBtn) {

        settingsCalibrateBtn.addEventListener(
            "click",
            function () {

                calibrateCompass();

                closeCampusSettings();

            }
        );

    }


    /* SETTINGS LOCATION */

    if (settingsLocationBtn) {

        settingsLocationBtn.addEventListener(
            "click",
            function () {

                requestLocation();

                closeCampusSettings();

            }
        );

    }


    /* RETRY */

    if (campusMessageBtn) {

        campusMessageBtn.addEventListener(
            "click",
            function () {

                hideCampusMessage();

                requestLocation();

                calibrateCompass();

            }
        );

    }

}


/* ======================================
   LOCATION
====================================== */

function requestLocation() {

    if (!navigator.geolocation) {

        showCampusMessage(
            "Location Not Supported",
            "Your browser does not support location services."
        );

        return;

    }


    locationName.textContent =
        "Finding your location...";

    locationStatus.textContent =
        "Requesting GPS permission";


    navigator.geolocation.getCurrentPosition(

        handleLocationSuccess,

        handleLocationError,

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 30000
        }

    );

}


/* ======================================
   LOCATION SUCCESS
====================================== */

function handleLocationSuccess(position) {

    currentLatitude =
        position.coords.latitude;

    currentLongitude =
        position.coords.longitude;


    console.log(
        "Latitude:",
        currentLatitude
    );


    console.log(
        "Longitude:",
        currentLongitude
    );


    updateLocationValues();

    calculateQibla();

    updateMap();

    reverseGeocodeLocation();

}


/* ======================================
   LOCATION ERROR
====================================== */

function handleLocationError(error) {

    console.log(
        "Location error:",
        error
    );


    let message =
        "Unable to get your location.";


    if (error.code === 1) {

        message =
            "Location permission was denied. Please allow location access.";

    }


    if (error.code === 2) {

        message =
            "Your location could not be determined.";

    }


    if (error.code === 3) {

        message =
            "Location request timed out. Please try again.";

    }


    locationName.textContent =
        "Location unavailable";


    locationStatus.textContent =
        message;


    showCampusMessage(
        "Location Required",
        message
    );

}


/* ======================================
   UPDATE LOCATION
====================================== */

function updateLocationValues() {

    if (currentLatitude === null ||
        currentLongitude === null) {

        return;

    }


    latitudeValue.textContent =
        currentLatitude.toFixed(5);


    longitudeValue.textContent =
        currentLongitude.toFixed(5);


    locationName.textContent =
        "Current Location";


    locationStatus.textContent =
        "GPS location detected";

}


/* ======================================
   QIBLA CALCULATION
====================================== */

function calculateQibla() {

    if (
        currentLatitude === null ||
        currentLongitude === null
    ) {

        return;

    }


    const lat1 =
        degreesToRadians(
            currentLatitude
        );


    const lon1 =
        degreesToRadians(
            currentLongitude
        );


    const lat2 =
        degreesToRadians(
            KAABA_LATITUDE
        );


    const lon2 =
        degreesToRadians(
            KAABA_LONGITUDE
        );


    const deltaLongitude =
        lon2 - lon1;


    const y =
        Math.sin(deltaLongitude) *
        Math.cos(lat2);


    const x =
        Math.cos(lat1) *
        Math.sin(lat2)
        -
        Math.sin(lat1) *
        Math.cos(lat2) *
        Math.cos(deltaLongitude);


    let bearing =
        radiansToDegrees(
            Math.atan2(y, x)
        );


    bearing =
        normalizeDegree(bearing);


    qiblaBearing =
        bearing;


    updateQiblaUI();

    updateDistance();

    updateDirectionText();

    updateMap();

}


/* ======================================
   UPDATE QIBLA UI
====================================== */

function updateQiblaUI() {

    if (qiblaBearing === null) {

        return;

    }


    const roundedQibla =
        Math.round(qiblaBearing);


    bearingValue.textContent =
        roundedQibla + "°";


    if (qiblaBearingLive) {

        qiblaBearingLive.textContent =
            "Qibla Bearing: " +
            roundedQibla +
            "°";

    }


    updateArrow();


    if (currentHeading === null) {

        qiblaStatus.innerHTML =
            '<i class="fa-solid fa-compass"></i> Ready';

    }

}


/* ======================================
   LIVE PHONE HEADING
====================================== */

function updateHeadingUI() {

    if (currentHeading === null) {

        return;

    }


    const roundedHeading =
        Math.round(
            normalizeDegree(
                currentHeading
            )
        );


    /*
       IMPORTANT:

       Ye ab Qibla bearing nahi hai.

       Ye phone ki LIVE heading hai.

       Phone ghumega:
       263 → 265 → 270
       ya
       263 → 250 → 240

       0 se 359 tak continuously chalega.
    */

    if (qiblaDegree) {

        qiblaDegree.textContent =
            roundedHeading;

    }


    updateArrow();

    updateCompassStatus();

}


/* ======================================
   QIBLA ARROW
====================================== */

function updateArrow() {

    if (
        !qiblaArrow ||
        qiblaBearing === null ||
        currentHeading === null
    ) {

        return;

    }


    /*
       Qibla bearing = fixed direction
       from current GPS location.

       Current heading = phone direction.

       Difference = arrow ko kitna rotate
       karna hai taake Qibla ki taraf point kare.
    */

    const relativeAngle =
        shortestAngleDifference(
            currentHeading,
            qiblaBearing
        );


    qiblaArrow.style.transform =
        "translate(-50%, -50%) rotate(" +
        relativeAngle +
        "deg)";

}


/* ======================================
   COMPASS SETUP
====================================== */

function setupCompass() {

    if (
        typeof DeviceOrientationEvent ===
        "undefined"
    ) {

        compassMessage.textContent =
            "Device compass is not supported";

        return;

    }


    /*
       iPhone / iOS permission user gesture
       se leni hoti hai.

       Android / other devices par
       direct listener start ho sakta hai.
    */

    if (
        typeof DeviceOrientationEvent.requestPermission !==
        "function"
    ) {

        startCompassListeners();

    }


    else {

        compassMessage.textContent =
            "Tap Enable / Calibrate Compass";

    }

}


/* ======================================
   START COMPASS LISTENERS
====================================== */

function startCompassListeners() {

    if (orientationListening) {

        return;

    }


    orientationListening = true;

    compassActive = true;


    /*
       First preference:
       deviceorientationabsolute

       Isme magnetic/absolute heading
       milne ka chance zyada hota hai.
    */

    if ("ondeviceorientationabsolute" in window) {

        window.addEventListener(
            "deviceorientationabsolute",
            handleDeviceOrientation,
            true
        );

        orientationEventType =
            "deviceorientationabsolute";

    }


    /*
       Fallback
    */

    else {

        window.addEventListener(
            "deviceorientation",
            handleDeviceOrientation,
            true
        );

        orientationEventType =
            "deviceorientation";

    }


    compassMessage.textContent =
        "Move your phone to find the Qibla";


    console.log(
        "Compass listener started:",
        orientationEventType
    );

}


/* ======================================
   DEVICE ORIENTATION
====================================== */

function handleDeviceOrientation(event) {

    let heading = null;


    /*
       iPhone / iPad
    */

    if (
        typeof event.webkitCompassHeading ===
        "number" &&
        !Number.isNaN(
            event.webkitCompassHeading
        )
    ) {

        heading =
            event.webkitCompassHeading;

    }


    /*
       Android / Standard Device Orientation
    */

    else if (
        typeof event.alpha ===
        "number" &&
        !Number.isNaN(event.alpha)
    ) {

        /*
           alpha clockwise rotation hota hai.

           Compass heading ke liye:
           360 - alpha
        */

        heading =
            360 - event.alpha;

    }


    if (heading === null) {

        return;

    }


    currentHeading =
        normalizeDegree(heading);


    /*
       LIVE 0-359° update
    */

    updateHeadingUI();

}


/* ======================================
   COMPASS STATUS
====================================== */

function updateCompassStatus() {

    if (!compassMessage) {

        return;

    }


    if (
        qiblaBearing === null ||
        currentHeading === null
    ) {

        return;

    }


    const difference =
        shortestAngleDifference(
            currentHeading,
            qiblaBearing
        );


    if (
        Math.abs(difference) <= 5
    ) {

        compassMessage.textContent =
            "You are facing the Qibla";


        qiblaStatus.innerHTML =
            '<i class="fa-solid fa-kaaba"></i> Qibla Found';

    }


    else {

        const direction =
            difference > 0
                ? "right"
                : "left";


        compassMessage.textContent =
            "Rotate your phone " +
            direction +
            " toward the arrow";


        qiblaStatus.innerHTML =
            '<i class="fa-solid fa-compass"></i> Searching';

    }

}


/* ======================================
   CALIBRATION / PERMISSION
====================================== */

async function calibrateCompass() {

    if (
        typeof DeviceOrientationEvent ===
        "undefined"
    ) {

        compassMessage.textContent =
            "Device compass is not supported";

        return;

    }


    qiblaStatus.innerHTML =
        '<i class="fa-solid fa-rotate"></i> Enabling';


    compassMessage.textContent =
        "Please allow compass permission";


    /*
       iOS permission
    */

    if (
        typeof DeviceOrientationEvent.requestPermission ===
        "function"
    ) {

        try {

            const permission =
                await DeviceOrientationEvent
                    .requestPermission();


            if (
                permission ===
                "granted"
            ) {

                startCompassListeners();

                compassMessage.textContent =
                    "Compass enabled. Rotate your phone.";

                qiblaStatus.innerHTML =
                    '<i class="fa-solid fa-compass"></i> Ready';

            }

            else {

                compassMessage.textContent =
                    "Compass permission was denied.";

                qiblaStatus.innerHTML =
                    '<i class="fa-solid fa-circle-exclamation"></i> Permission';

            }

        }

        catch (error) {

            console.log(
                "Compass permission error:",
                error
            );

            compassMessage.textContent =
                "Unable to enable compass.";

        }

        return;

    }


    /*
       Android / other browsers
    */

    startCompassListeners();


    compassMessage.textContent =
        "Compass enabled. Rotate your phone.";

    qiblaStatus.innerHTML =
        '<i class="fa-solid fa-compass"></i> Ready';

}


/* ======================================
   DISTANCE
====================================== */

function updateDistance() {

    if (
        currentLatitude === null ||
        currentLongitude === null
    ) {

        return;

    }


    const distance =
        calculateDistance(

            currentLatitude,
            currentLongitude,

            KAABA_LATITUDE,
            KAABA_LONGITUDE

        );


    distanceValue.textContent =
        formatDistance(distance);

}


/* ======================================
   HAVERSINE
====================================== */

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const earthRadius =
        6371;


    const dLat =
        degreesToRadians(
            lat2 - lat1
        );


    const dLon =
        degreesToRadians(
            lon2 - lon1
        );


    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2)
        +
        Math.cos(
            degreesToRadians(lat1)
        )
        *
        Math.cos(
            degreesToRadians(lat2)
        )
        *
        Math.sin(dLon / 2)
        *
        Math.sin(dLon / 2);


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return earthRadius * c;

}


/* ======================================
   FORMAT DISTANCE
====================================== */

function formatDistance(distance) {

    if (distance < 1) {

        return Math.round(
            distance * 1000
        ) + " m";

    }


    return Math.round(distance)
        .toLocaleString() +
        " km";

}


/* ======================================
   DIRECTION TEXT
====================================== */

function updateDirectionText() {

    if (qiblaBearing === null) {

        return;

    }


    const direction =
        getCompassDirection(
            qiblaBearing
        );


    directionText.textContent =
        direction;


    directionDescription.textContent =
        "The Kaaba is approximately " +
        Math.round(qiblaBearing) +
        "° from North.";

}


/* ======================================
   COMPASS DIRECTION
====================================== */

function getCompassDirection(degree) {

    const directions = [

        "North",
        "North-East",
        "East",
        "South-East",
        "South",
        "South-West",
        "West",
        "North-West"

    ];


    const index =
        Math.round(
            degree / 45
        ) % 8;


    return directions[index];

}


/* ======================================
   MAP INITIALIZATION
====================================== */

function initializeMap() {

    const mapElement =
        document.getElementById(
            "qiblaMap"
        );


    if (
        !mapElement ||
        typeof L === "undefined"
    ) {

        console.log(
            "Map library not available"
        );

        return;

    }


    campusMap =
        L.map(
            mapElement
        ).setView(

            [
                KAABA_LATITUDE,
                KAABA_LONGITUDE
            ],

            4

        );


    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {
            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"
        }

    ).addTo(
        campusMap
    );


    kaabaMarker =
        L.marker(

            [
                KAABA_LATITUDE,
                KAABA_LONGITUDE
            ]

        ).addTo(
            campusMap
        );


    kaabaMarker.bindPopup(
        "<strong>Kaaba</strong><br>Masjid al-Haram, Makkah"
    );

}


/* ======================================
   UPDATE MAP
====================================== */

function updateMap() {

    if (!campusMap) {

        return;

    }


    if (
        currentLatitude === null ||
        currentLongitude === null
    ) {

        return;

    }


    const userPosition = [

        currentLatitude,
        currentLongitude

    ];


    if (!userMarker) {

        userMarker =
            L.marker(
                userPosition
            ).addTo(
                campusMap
            );


        userMarker.bindPopup(
            "<strong>Your Location</strong>"
        );

    }

    else {

        userMarker.setLatLng(
            userPosition
        );

    }


    drawQiblaLine();


    const bounds =
        L.latLngBounds(

            userPosition,

            [
                KAABA_LATITUDE,
                KAABA_LONGITUDE
            ]

        );


    campusMap.fitBounds(
        bounds,
        {
            padding: [35, 35]
        }
    );

}


/* ======================================
   DRAW QIBLA LINE
====================================== */

function drawQiblaLine() {

    if (!campusMap) {

        return;

    }


    if (
        currentLatitude === null ||
        currentLongitude === null
    ) {

        return;

    }


    const points = [

        [
            currentLatitude,
            currentLongitude
        ],

        [
            KAABA_LATITUDE,
            KAABA_LONGITUDE
        ]

    ];


    if (qiblaLine) {

        qiblaLine.setLatLngs(
            points
        );

    }

    else {

        qiblaLine =
            L.polyline(

                points,

                {
                    weight: 3,
                    opacity: 0.85,
                    dashArray: "8 8"
                }

            ).addTo(
                campusMap
            );

    }

}


/* ======================================
   CENTER MAP
====================================== */

function centerMapOnUser() {

    if (
        !campusMap ||
        currentLatitude === null ||
        currentLongitude === null
    ) {

        requestLocation();

        return;

    }


    campusMap.setView(

        [
            currentLatitude,
            currentLongitude
        ],

        15

    );


    if (userMarker) {

        userMarker.openPopup();

    }

}


/* ======================================
   REVERSE GEOCODING
====================================== */

function reverseGeocodeLocation() {

    if (
        currentLatitude === null ||
        currentLongitude === null
    ) {

        return;

    }


    const url =
        "https://nominatim.openstreetmap.org/reverse" +
        "?format=jsonv2" +
        "&lat=" +
        encodeURIComponent(
            currentLatitude
        ) +
        "&lon=" +
        encodeURIComponent(
            currentLongitude
        );


    fetch(url)

        .then(
            function (response) {

                if (!response.ok) {

                    throw new Error(
                        "Location lookup failed"
                    );

                }

                return response.json();

            }
        )

        .then(
            function (data) {

                if (
                    data &&
                    data.display_name
                ) {

                    const address =
                        data.address || {};


                    const city =
                        address.city ||
                        address.town ||
                        address.village ||
                        address.county ||
                        "Current Location";


                    locationName.textContent =
                        city;


                    locationStatus.textContent =
                        "Location detected";

                }

            }
        )

        .catch(
            function (error) {

                console.log(
                    "Reverse geocoding error:",
                    error
                );


                locationName.textContent =
                    "Current Location";


                locationStatus.textContent =
                    "GPS location detected";

            }
        );

}


/* ======================================
   SETTINGS
====================================== */

function openCampusSettings() {

    if (!campusSettingsPanel) {

        return;

    }


    campusSettingsPanel.style.display =
        "block";


    document.body.style.overflow =
        "hidden";

}


function closeCampusSettings() {

    if (!campusSettingsPanel) {

        return;

    }


    campusSettingsPanel.style.display =
        "none";


    document.body.style.overflow =
        "";

}


/* ======================================
   CAMPUS MESSAGE
====================================== */

function showCampusMessage(
    title,
    message
) {

    if (!campusMessage) {

        return;

    }


    campusMessageTitle.textContent =
        title;


    campusMessageText.textContent =
        message;


    campusMessage.style.display =
        "block";

}


function hideCampusMessage() {

    if (!campusMessage) {

        return;

    }


    campusMessage.style.display =
        "none";

}


/* ======================================
   THEME
====================================== */

function setupThemeSupport() {

    const savedTheme =
        localStorage.getItem(
            "theme"
        );


    if (
        savedTheme === "dark" ||
        savedTheme === "dark-mode"
    ) {

        document.body.classList.add(
            "dark-mode"
        );

    }


    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key === "theme"
            ) {

                applyCampusTheme(
                    event.newValue
                );

            }

        }
    );

}


/* ======================================
   APPLY THEME
====================================== */

function applyCampusTheme(theme) {

    if (
        theme === "dark" ||
        theme === "dark-mode"
    ) {

        document.body.classList.add(
            "dark-mode"
        );

    }

    else {

        document.body.classList.remove(
            "dark-mode"
        );

    }

}


/* ======================================
   MATH
====================================== */

function degreesToRadians(degrees) {

    return degrees *
        Math.PI /
        180;

}


function radiansToDegrees(radians) {

    return radians *
        180 /
        Math.PI;

}


function normalizeDegree(degree) {

    degree =
        degree % 360;


    if (degree < 0) {

        degree += 360;

    }


    return degree;

}


/* ======================================
   SHORTEST ANGLE
====================================== */

function shortestAngleDifference(
    from,
    to
) {

    let difference =
        normalizeDegree(to) -
        normalizeDegree(from);


    if (difference > 180) {

        difference -= 360;

    }


    if (difference < -180) {

        difference += 360;

    }


    return difference;

}


/* ======================================
   PAGE VISIBILITY
====================================== */

document.addEventListener(
    "visibilitychange",
    function () {

        if (document.hidden) {

            console.log(
                "Campus page hidden"
            );

        }

        else {

            console.log(
                "Campus page active"
            );

        }

    }
);


/* ======================================
   CLEANUP
====================================== */

window.addEventListener(
    "beforeunload",
    function () {

        if (
            locationWatchId !== null
        ) {

            navigator.geolocation.clearWatch(
                locationWatchId
            );

        }


        if (
            orientationListening &&
            orientationEventType
        ) {

            window.removeEventListener(
                orientationEventType,
                handleDeviceOrientation,
                true
            );

        }

    }
);


/* ======================================
   END
====================================== */