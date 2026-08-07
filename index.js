/* ==========================================
            MY PRAYER APP
              INDEX.JS
========================================== */

"use strict";

/* ==========================================
        GLOBAL VARIABLES
========================================== */

let prayerTimes = {};

let jamaatTimes = {};

let currentPrayer = "";

const API_URL =
"https://api.aladhan.com/v1/timingsByCity";

/* ==========================================
        DOM ELEMENTS
========================================== */

const clock =
document.getElementById("clock");

const date =
document.getElementById("date");

const islamicDate =
document.getElementById("islamic-date");

const locationName =
document.getElementById("locationName");

const nextPrayer =
document.getElementById("nextPrayer");

const countdown =
document.getElementById("countdown");

/* ==========================================
        APP START
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    updateClock();

    setInterval(updateClock,1000);

    loadTodayDate();

    detectLocation();

    loadSavedJamaat();

});

/* ==========================================
        LIVE CLOCK
========================================== */

function updateClock(){

    const now = new Date();

    clock.innerHTML = now.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );

}

/* ==========================================
        TODAY DATE
========================================== */

function loadTodayDate(){

    const today = new Date();

    date.innerHTML = today.toLocaleDateString(
        "en-GB",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    islamicDate.innerHTML =
        "Loading Islamic Date...";

}

/* ==========================================
        GET USER LOCATION
========================================== */

function detectLocation(){

    if(!navigator.geolocation){

        locationName.innerHTML =
        "Location Not Supported";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        position => {

            const lat = position.coords.latitude;

            const lon = position.coords.longitude;

            getPrayerTimes(lat,lon);

        },

        () => {

            locationName.innerHTML =
            "Location Permission Denied";

        }

    );

}


/* ==========================================
        GET PRAYER TIMES
========================================== */

async function getPrayerTimes(latitude, longitude){

    try{

        const response = await fetch(

            `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`

        );

        const result = await response.json();

        prayerTimes = result.data.timings;

        // Get Current City Name
        try{

            const locationResponse = await fetch(

                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`

            );

            const locationData = await locationResponse.json();

            locationName.innerHTML =

                locationData.address.city ||

                locationData.address.town ||

                locationData.address.village ||

                locationData.address.county ||

                "Unknown Location";

        }

        catch{

            locationName.innerHTML = "Location";

        }

        islamicDate.innerHTML =

            result.data.date.hijri.weekday.en +

            ", " +

            result.data.date.hijri.day +

            " " +

            result.data.date.hijri.month.en +

            " " +

            result.data.date.hijri.year +

            " AH";

        showPrayerTimes();

        calculateNextPrayer();

    }

    catch(error){

        console.log(error);

        locationName.innerHTML =

        "Unable to Load Prayer Times";

    }

}


/* ==========================================
        SHOW PRAYER TIMES
========================================== */

function showPrayerTimes(){

    document.getElementById("fajr").innerHTML =
    prayerTimes.Fajr;

    document.getElementById("dhuhr").innerHTML =
    prayerTimes.Dhuhr;

    document.getElementById("asr").innerHTML =
    prayerTimes.Asr;

    document.getElementById("maghrib").innerHTML =
    prayerTimes.Maghrib;

    document.getElementById("isha").innerHTML =
    prayerTimes.Isha;

}

/* ==========================================
        NEXT PRAYER
========================================== */

function calculateNextPrayer(){

    const prayers = [

        {name:"Fajr",time:prayerTimes.Fajr},

        {name:"Dhuhr",time:prayerTimes.Dhuhr},

        {name:"Asr",time:prayerTimes.Asr},

        {name:"Maghrib",time:prayerTimes.Maghrib},

        {name:"Isha",time:prayerTimes.Isha}

    ];

    const now = new Date();

    let next = null;

    for(const prayer of prayers){

        const parts = prayer.time.split(":");

        const prayerDate = new Date();

        prayerDate.setHours(
            parseInt(parts[0]),
            parseInt(parts[1]),
            0,
            0
        );

        if(prayerDate > now){

            next = {

                name:prayer.name,

                date:prayerDate

            };

            break;

        }

    }

    if(!next){

        const fajr = prayerTimes.Fajr.split(":");

        const tomorrow = new Date();

        tomorrow.setDate(
            tomorrow.getDate()+1
        );

        tomorrow.setHours(

            parseInt(fajr[0]),

            parseInt(fajr[1]),

            0,

            0

        );

        next = {

            name:"Fajr",

            date:tomorrow

        };

    }

    currentPrayer = next.name;

    nextPrayer.innerHTML = currentPrayer;

    startCountdown(next.date);

}

/* ==========================================
        COUNTDOWN TIMER
========================================== */

let countdownInterval = null;

function startCountdown(nextPrayerTime){

    if(countdownInterval){

        clearInterval(countdownInterval);

    }

    countdownInterval = setInterval(() => {

        const now = new Date();

        const difference =
        nextPrayerTime - now;

        if(difference <= 0){

            clearInterval(countdownInterval);

            calculateNextPrayer();

            return;

        }

        const hours =
        Math.floor(difference / 3600000);

        const minutes =
        Math.floor((difference % 3600000) / 60000);

        const seconds =
        Math.floor((difference % 60000) / 1000);

        countdown.innerHTML =

            String(hours).padStart(2,"0") +

            ":" +

            String(minutes).padStart(2,"0") +

            ":" +

            String(seconds).padStart(2,"0") +

            " Left";

    },1000);

}

/* ==========================================
        ACTIVE PRAYER CARD
========================================== */

function highlightCurrentPrayer(){

    document

    .querySelectorAll(".prayer-card")

    .forEach(card=>{

        card.classList.remove("active");

    });

}

/* ==========================================
        JAMAAT TIME
========================================== */

let selectedPrayer = "";

function editJamaat(prayer){

    selectedPrayer = prayer;

    document.getElementById("selectedPrayer").innerText =
    prayer;

    document.getElementById("jamaatTimeInput").value =
    jamaatTimes[prayer] || "";

    document.getElementById("jamaatModal").style.display =
    "flex";

}

function closeJamaatModal(){

    document.getElementById("jamaatModal").style.display =
    "none";

}

function saveJamaatTime(){

    const time =
    document.getElementById("jamaatTimeInput").value;

    if(time === "") return;

    jamaatTimes[selectedPrayer] = time;

    localStorage.setItem(
        "jamaatTimes",
        JSON.stringify(jamaatTimes)
    );

    updateJamaatUI();

    closeJamaatModal();

}

function loadSavedJamaat(){

    const saved =
    localStorage.getItem("jamaatTimes");

    if(saved){

        jamaatTimes = JSON.parse(saved);

    }

    updateJamaatUI();

}

function updateJamaatUI(){

    const prayers = [

        "Fajr",

        "Dhuhr",

        "Asr",

        "Maghrib",

        "Isha"

    ];

    prayers.forEach(prayer=>{

        const element = document.getElementById(
            prayer.toLowerCase()+"Jamaat"
        );

        if(element){

            element.innerHTML =

                jamaatTimes[prayer]

                ?

                "Jamaat : " + jamaatTimes[prayer]

                :

                "Jamaat Not Set";

        }

    });

}

/* ==========================================
        NOTIFICATION
========================================== */

const notificationModal =
document.getElementById("notificationModal");

const notificationButton =
document.getElementById("notificationBtn");

const enableNotification =
document.getElementById("enableNotification");

notificationButton.addEventListener("click",()=>{

    notificationModal.style.display = "flex";

});

function closeNotificationModal(){

    notificationModal.style.display = "none";

}

enableNotification.addEventListener("click",async()=>{

    if(!("Notification" in window)){

        alert("Notification is not supported.");

        return;

    }

    const permission =
    await Notification.requestPermission();

    if(permission === "granted"){

        alert("Prayer Notifications Enabled.");

    }else{

        alert("Notification Permission Denied.");

    }

    closeNotificationModal();

});

/* ==========================================
        CLOSE MODAL OUTSIDE CLICK
========================================== */

window.addEventListener("click",(event)=>{

    if(event.target === notificationModal){

        closeNotificationModal();

    }

    if(event.target ===
        document.getElementById("jamaatModal")){

        closeJamaatModal();

    }

});

/* ==========================================
        LOADING SCREEN
========================================== */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        document.getElementById("loadingScreen").style.display="none";

    },1200);

});

/* ==========================================
        REFRESH NEXT PRAYER
========================================== */

setInterval(()=>{

    if(Object.keys(prayerTimes).length>0){

        calculateNextPrayer();

    }

},60000);

/* ==========================================
        REFRESH ACTIVE CARD
========================================== */

setInterval(()=>{

    highlightCurrentPrayer();

},30000);

/* ==========================================
        SIMPLE NAVIGATION
========================================== */

document.querySelectorAll(".nav-item").forEach(item=>{

    item.addEventListener("click",function(){

        document.querySelectorAll(".nav-item").forEach(nav=>{

            nav.classList.remove("active");

        });

        this.classList.add("active");

    });

});

/* ==========================================
FEATURE CARDS
========================================== */

document.querySelectorAll(".feature-card").forEach(card=>{

    card.addEventListener("click",()=>{

        console.log("Opening Feature...");

    });

});


/* ==========================================
TASBEEH MODULE CONTROL
========================================== */

const tasbeehCard =
document.getElementById("tasbeehCard");


if(tasbeehCard){

    tasbeehCard.addEventListener("click",()=>{


        localStorage.setItem(
            "lastOpenedModule",
            "tasbeeh"
        );


        console.log(
            "Opening Tasbeeh Module..."
        );


    });

}

/* ==========================================
        ERROR HANDLING
========================================== */

window.addEventListener("error",(event)=>{

    console.error(

        "Application Error :",

        event.message

    );

});

/* ==========================================
        INTERNET STATUS
========================================== */

window.addEventListener("online",()=>{

    console.log("Internet Connected");

});

window.addEventListener("offline",()=>{

    alert(

        "Internet connection lost."

    );

});

/* ==========================================
        APP VISIBILITY
========================================== */

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(!document.hidden){

            updateClock();

            calculateNextPrayer();

        }

    }

);

/* ==========================================
        DEBUG MODE
========================================== */

console.log(

    "My Prayer App Started Successfully"

);

/* ==========================================
        FINAL INITIALIZATION
========================================== */

function initializeApp(){

    console.log("Initializing My Prayer...");

    updateClock();

    loadTodayDate();

    detectLocation();

    loadSavedJamaat();

}

/* ==========================================
        FUTURE MODULES
========================================== */

/*

Modules will remain separate.

quran/
├── quran.html
├── quran.css
└── quran.js

duas/
├── duas.html
├── duas.css
└── duas.js

tasbeeh/
├── tasbeeh.html
├── tasbeeh.css
└── tasbeeh.js

names99/
├── names99.html
├── names99.css
└── names99.js

qibla/
├── qibla.html
├── qibla.css
└── qibla.js

No module code will be added inside
index.js.

Index.js will only control:

✔ Home Screen
✔ Prayer Times
✔ Date
✔ Islamic Date
✔ Clock
✔ Next Prayer
✔ Countdown
✔ Jamaat Times
✔ Notifications

*/

/* ==========================================
            END OF FILE
========================================== */

console.log("index.js Loaded Successfully ✅");

// ==========================================
// APP THEME CONNECTION
// ==========================================


function saveAppTheme(theme){


    localStorage.setItem(
        "appTheme",
        theme
    );


}



function loadAppTheme(){


    const theme =
    localStorage.getItem("appTheme");



    if(theme){


        document.body.classList.add(theme);


    }


}



loadAppTheme();