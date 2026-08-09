/* ======================================
   MY PRAYER - CAMPUS / QIBLA
   JAVASCRIPT - COMPLETE
====================================== */


/* ======================================
   QIBLA CONSTANTS
====================================== */

const KAABA_LATITUDE = 21.422487;
const KAABA_LONGITUDE = 39.826206;


/* ======================================
   GLOBAL VARIABLES
====================================== */

let currentLatitude = null;
let currentLongitude = null;

let qiblaBearing = null;
let currentHeading = 0;

let campusMap = null;

let userMarker = null;
let kaabaMarker = null;
let qiblaLine = null;

let compassActive = false;
let locationWatchId = null;


/* ======================================
   ELEMENTS
====================================== */

const locationName =
document.getElementById("locationName");

const locationStatus =
document.getElementById("locationStatus");

const qiblaDegree =
document.getElementById("qiblaDegree");

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
   START CAMPUS
====================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeCampus();

    }
);


/* ======================================
   INITIALIZE CAMPUS
====================================== */

function initializeCampus() {

    console.log(
        "My Prayer Campus started"
    );


    initializeMap();

    requestLocation();


    setupCampusButtons();

    setupCompass();

    setupThemeSupport();

}


/* ======================================
   CAMPUS BUTTONS
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



    /* LOCATION REFRESH */

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



    /* CALIBRATE */

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



    /* MESSAGE RETRY */

    if (campusMessageBtn) {

        campusMessageBtn.addEventListener(
            "click",
            function () {

                hideCampusMessage();

                requestLocation();

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


   locationStatus.textContent =
    "Finding your location...";


    locationStatus.textContent =
        "Requesting GPS permission";


    navigator.geolocation.getCurrentPosition(

        handleLocationSuccess,

        handleLocationError,

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 60000
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
   UPDATE LOCATION VALUES
====================================== */

function updateLocationValues() {


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


    const roundedBearing =
        Math.round(qiblaBearing);


    qiblaDegree.textContent =
        roundedBearing;


    bearingValue.textContent =
        roundedBearing + "°";


    qiblaStatus.innerHTML =
        '<i class="fa-solid fa-compass"></i> Ready';


    compassMessage.textContent =
        "Move your phone to find the Qibla";


    updateArrow();


}


/* ======================================
   UPDATE ARROW
====================================== */

function updateArrow() {


    if (
        !qiblaArrow ||
        qiblaBearing === null
    ) {

        return;

    }


    const relativeAngle =
        normalizeDegree(
            qiblaBearing - currentHeading
        );


    qiblaArrow.style.transform =
        "translate(-50%, -50%) rotate(" +
        relativeAngle +
        "deg)";

}


/* ======================================
   COMPASS
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


    window.addEventListener(
        "deviceorientation",
        handleDeviceOrientation,
        true
    );


    compassActive = true;


    console.log(
        "Compass listener ready"
    );

}


/* ======================================
   DEVICE ORIENTATION
====================================== */

function handleDeviceOrientation(event) {


    let heading = null;


    if (
        typeof event.webkitCompassHeading ===
        "number"
    ) {

        heading =
            event.webkitCompassHeading;

    }


    else if (
        typeof event.alpha ===
        "number"
    ) {

        heading =
            360 - event.alpha;

    }


    if (heading === null) {

        return;

    }


    currentHeading =
        normalizeDegree(heading);


    updateArrow();


    updateCompassStatus();

}


/* ======================================
   COMPASS STATUS
====================================== */

function updateCompassStatus() {


    if (!compassMessage) {

        return;

    }


    if (qiblaBearing === null) {

        return;

    }


    const difference =
        shortestAngleDifference(
            currentHeading,
            qiblaBearing
        );


    if (Math.abs(difference) <= 5) {

        compassMessage.textContent =
            "You are facing the Qibla";

        qiblaStatus.innerHTML =
            '<i class="fa-solid fa-kaaba"></i> Qibla Found';

    }

    else {

        compassMessage.textContent =
            "Rotate your phone toward the arrow";

        qiblaStatus.innerHTML =
            '<i class="fa-solid fa-compass"></i> Searching';

    }

}


/* ======================================
   CALIBRATION
====================================== */

function calibrateCompass() {


    compassMessage.textContent =
        "Move your phone slowly in a circle";


    qiblaStatus.innerHTML =
        '<i class="fa-solid fa-rotate"></i> Calibrating';


    setTimeout(
        function () {

            compassMessage.textContent =
                "Compass calibration ready";

            updateCompassStatus();

        },
        2500
    );

}


/* ======================================
   DISTANCE TO KAABA
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
   HAVERSINE DISTANCE
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

function formatDistance(
    distance
) {


    if (distance < 1) {

        return Math.round(
            distance * 1000
        ) + " m";

    }


    return Math.round(distance)
        .toLocaleString() + " km";

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
   COMPASS DIRECTION NAME
====================================== */

function getCompassDirection(
    degree
) {


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
   DRAW QIBLA MAP LINE
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
   CENTER MAP ON USER
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
   REVERSE LOCATION
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
        encodeURIComponent(currentLatitude) +
        "&lon=" +
        encodeURIComponent(currentLongitude);


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
   THEME SUPPORT
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

function applyCampusTheme(
    theme
) {


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
   MATH HELPERS
====================================== */

function degreesToRadians(
    degrees
) {

    return degrees *
        Math.PI /
        180;

}


function radiansToDegrees(
    radians
) {

    return radians *
        180 /
        Math.PI;

}


function normalizeDegree(
    degree
) {

    degree =
        degree % 360;


    if (degree < 0) {

        degree += 360;

    }


    return degree;

}


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

        if (
            document.hidden
        ) {

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

    }
);


/* ======================================
   END CAMPUS JAVASCRIPT
====================================== */