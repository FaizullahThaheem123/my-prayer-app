// MY PRAYER APP JAVASCRIPT


// ===============================
// LIVE CLOCK
// ===============================

function updateClock(){

let now = new Date();


let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();


hours = hours < 10 ? "0"+hours : hours;
minutes = minutes < 10 ? "0"+minutes : minutes;
seconds = seconds < 10 ? "0"+seconds : seconds;



document.getElementById("clock").innerHTML =
`${hours}:${minutes}:${seconds}`;

}


setInterval(updateClock,1000);

updateClock();




// ===============================
// DATE + HIJRI DATE
// ===============================


function updateDate(){


let today = new Date();



document.getElementById("date").innerHTML =
today.toLocaleDateString(
"en-US",
{
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
}
);




let hijri = new Intl.DateTimeFormat(
"en-TN-u-ca-islamic",
{
day:"numeric",
month:"long",
year:"numeric"
}
).format(today);



document.getElementById("islamic-date").innerHTML =
hijri;



}


updateDate();





// ===============================
// PRAYER TIMES
// ===============================


let prayerTimes = {};



async function getPrayerTimes(){


try{


let response = await fetch(

"https://api.aladhan.com/v1/timingsByCity?city=Ghotki&country=Pakistan&method=2"

);



let data = await response.json();


let timings = data.data.timings;



document.getElementById("fajr").innerHTML =
formatTime(timings.Fajr);


document.getElementById("dhuhr").innerHTML =
formatTime(timings.Dhuhr);


document.getElementById("asr").innerHTML =
formatTime(timings.Asr);


document.getElementById("maghrib").innerHTML =
formatTime(timings.Maghrib);


document.getElementById("isha").innerHTML =
formatTime(timings.Isha);




prayerTimes = {

Fajr:timings.Fajr,
Dhuhr:timings.Dhuhr,
Asr:timings.Asr,
Maghrib:timings.Maghrib,
Isha:timings.Isha

};



updateNextPrayer();



}


catch(error){

console.log(error);

}


}




function formatTime(time){


let [hour,minute] = time.split(":");


let date = new Date();


date.setHours(hour);

date.setMinutes(minute);



return date.toLocaleTimeString(
"en-US",
{
hour:"2-digit",
minute:"2-digit"
}
);


}







// ===============================
// NEXT PRAYER
// ===============================


function updateNextPrayer(){


let now = new Date();



let currentSeconds =
now.getHours()*3600 +
now.getMinutes()*60 +
now.getSeconds();



let nextPrayer = null;

let nextTime = null;



for(let prayer in prayerTimes){


let parts = prayerTimes[prayer].split(":");


let prayerSeconds =
parseInt(parts[0])*3600 +
parseInt(parts[1])*60;



if(prayerSeconds > currentSeconds){


nextPrayer = prayer;

nextTime = prayerSeconds;

break;

}


}



if(nextPrayer == null){


nextPrayer="Fajr";


let fajr = prayerTimes.Fajr.split(":");


nextTime =
parseInt(fajr[0])*3600 +
parseInt(fajr[1])*60;


nextTime += 86400;


}



document.getElementById("nextPrayer").innerHTML =
nextPrayer;



let remaining =
nextTime-currentSeconds;



let hours = Math.floor(remaining/3600);


let minutes = Math.floor(
(remaining%3600)/60
);


let seconds =
remaining%60;



hours = hours < 10 ? "0"+hours : hours;
minutes = minutes < 10 ? "0"+minutes : minutes;
seconds = seconds < 10 ? "0"+seconds : seconds;



document.getElementById("countdown").innerHTML =
`${hours}:${minutes}:${seconds} Left`;



}



setInterval(updateNextPrayer,1000);






// ===============================
// JAMAAT TIME SYSTEM
// ===============================


let jamaatTimes = JSON.parse(
localStorage.getItem("jamaatTimes")
) || {


Fajr:"05:30 AM",

Dhuhr:"01:30 PM",

Asr:"05:30 PM",

Maghrib:"07:25 PM",

Isha:"09:00 PM"


};





function loadJamaatTimes(){


document.getElementById("fajrJamaat").innerHTML =
"Jamaat " + jamaatTimes.Fajr;



document.getElementById("dhuhrJamaat").innerHTML =
"Jamaat " + jamaatTimes.Dhuhr;



document.getElementById("asrJamaat").innerHTML =
"Jamaat " + jamaatTimes.Asr;



document.getElementById("maghribJamaat").innerHTML =
"Jamaat " + jamaatTimes.Maghrib;



document.getElementById("ishaJamaat").innerHTML =
"Jamaat " + jamaatTimes.Isha;


}





function saveJamaatTimes(){


localStorage.setItem(
"jamaatTimes",
JSON.stringify(jamaatTimes)
);


loadJamaatTimes();


}

// ===============================
// EDIT JAMAAT TIME
// ===============================


function editJamaat(prayer){


let currentTime = jamaatTimes[prayer];


let newTime = prompt(
"Enter " + prayer + " Jamaat Time",
currentTime
);



if(newTime != null && newTime != ""){


jamaatTimes[prayer] = newTime;



localStorage.setItem(
"jamaatTimes",
JSON.stringify(jamaatTimes)
);



loadJamaatTimes();



alert(prayer + " Jamaat Updated");


}


}



// START JAMAAT


loadJamaatTimes();

getPrayerTimes();



console.log("My Prayer App Running");  


// ===============================
// SCREEN NAVIGATION
// ===============================

function showScreen(screen){

document.getElementById("homeScreen").style.display="none";
document.getElementById("quranScreen").style.display="none";
document.getElementById("duasScreen").style.display="none";
document.getElementById("tasbeehScreen").style.display="none";
document.getElementById("qiblaScreen").style.display="none";

if(screen=="home"){
document.getElementById("homeScreen").style.display="block";
}

if(screen=="quran"){
document.getElementById("quranScreen").style.display="block";
}

if(screen=="duas"){
document.getElementById("duasScreen").style.display="block";
}

if(screen=="tasbeeh"){
document.getElementById("tasbeehScreen").style.display="block";
}

if(screen=="qibla"){
document.getElementById("qiblaScreen").style.display="block";
}

}



// ===============================
// DIGITAL TASBEEH
// ===============================

let tasbeehCount =
Number(localStorage.getItem("tasbeehCount")) || 0;

let complete33 =
Number(localStorage.getItem("complete33")) || 0;

let complete99 =
Number(localStorage.getItem("complete99")) || 0;

let complete100 =
Number(localStorage.getItem("complete100")) || 0;

let selectedTarget = 33;

// ===============================
// SESSION TIMER
// ===============================

let timerSeconds = 0;
let timerInterval = null;
let timerStarted = false;

function startTasbeehTimer(){

if(timerStarted) return;

timerStarted = true;

timerInterval = setInterval(function(){

timerSeconds++;

let hrs = String(Math.floor(timerSeconds / 3600)).padStart(2,"0");

let mins = String(Math.floor((timerSeconds % 3600) / 60)).padStart(2,"0");

let secs = String(timerSeconds % 60).padStart(2,"0");

document.getElementById("tasbeehTimer").innerHTML =
hrs + ":" + mins + ":" + secs;

},1000);

}

// ===============================
// SELECT TARGET
// ===============================

function setTarget(target){

selectedTarget = target;

tasbeehCount = 0;

clearInterval(timerInterval);

timerInterval = null;

timerStarted = false;

timerSeconds = 0;

document.getElementById("tasbeehTimer").innerHTML =
"00:00:00";

document.getElementById("tasbeehCount").innerHTML = 0;

document.getElementById("tasbeehTarget").innerHTML =
"🎯 Target: " + target;

document.querySelectorAll(".target-buttons button").forEach(btn=>{

btn.classList.remove("active");

if(btn.innerHTML == target){

btn.classList.add("active");

}

});

document.getElementById("progressBar").style.width = "0%";

document.getElementById("progressText").innerHTML =
"0 / " + selectedTarget;

localStorage.setItem("tasbeehCount",0);

}

// ===============================
// COUNT TASBEEH
// ===============================

function increaseTasbeeh(){

startTasbeehTimer();

tasbeehCount++;

document.getElementById("tasbeehCount").innerHTML =
tasbeehCount;

localStorage.setItem("tasbeehCount", tasbeehCount);

// UPDATE PROGRESS BAR

let percent = (tasbeehCount / selectedTarget) * 100;

document.getElementById("progressBar").style.width =
percent + "%";

document.getElementById("progressText").innerHTML =
tasbeehCount + " / " + selectedTarget;

// TARGET COMPLETED

if(tasbeehCount == selectedTarget){

if(selectedTarget == 33){

complete33++;

localStorage.setItem("complete33", complete33);

document.getElementById("complete33").innerHTML =
complete33;

showTasbeehPopup(
"🎉 33 Complete",
"May Allah accept your Dhikr 🤲"
);

}

if(selectedTarget == 99){

complete99++;

localStorage.setItem("complete99", complete99);

document.getElementById("complete99").innerHTML =
complete99;

showTasbeehPopup(
"🌟 99 Complete",
"Excellent! Keep remembering Allah 🤲"
);

}

if(selectedTarget == 100){

complete100++;

localStorage.setItem("complete100", complete100);

document.getElementById("complete100").innerHTML =
complete100;

showTasbeehPopup(
"🤲 100 Complete",
"Allah Accept Your Dhikr ❤️"
);

}

tasbeehCount = 0;

localStorage.setItem("tasbeehCount",0);

document.getElementById("tasbeehCount").innerHTML = 0;

document.getElementById("progressBar").style.width = "0%";

document.getElementById("progressText").innerHTML =
"0 / " + selectedTarget;

clearInterval(timerInterval);

timerInterval = null;

timerStarted = false;

timerSeconds = 0;

document.getElementById("tasbeehTimer").innerHTML =
"00:00:00";

}

}

// ===============================
// RESET TASBEEH
// ===============================

function confirmResetTasbeeh(){

if(confirm("Reset Tasbeeh Counter?")){

tasbeehCount = 0;

localStorage.setItem("tasbeehCount",0);

document.getElementById("tasbeehCount").innerHTML = 0;

document.getElementById("progressBar").style.width = "0%";

document.getElementById("progressText").innerHTML =
"0 / " + selectedTarget;

clearInterval(timerInterval);

timerInterval = null;

timerStarted = false;

timerSeconds = 0;

document.getElementById("tasbeehTimer").innerHTML =
"00:00:00";

}

}

// ===============================
// TASBEEH POPUP
// ===============================

function showTasbeehPopup(title,message){

const popup =
document.getElementById("tasbeehPopup");

document.getElementById("popupTitle").innerHTML =
title;

document.getElementById("popupText").innerHTML =
message;

popup.classList.add("show");

// VIBRATION

if(navigator.vibrate){

navigator.vibrate(300);

}

// AUTO HIDE

setTimeout(function(){

popup.classList.remove("show");

},2000);

}

// ===============================
// ZIKR SELECT
// ===============================

function changeZikr(){

let value =
document.getElementById("zikrSelect").value;

localStorage.setItem("selectedZikr",value);

document.getElementById("tasbeehName").innerHTML =
value;

let arabic = "";

switch(value){

case "SubhanAllah":
arabic = "سُبْحَانَ ٱللَّٰهِ";
break;

case "Alhamdulillah":
arabic = "ٱلْحَمْدُ لِلَّٰهِ";
break;

case "Allahu Akbar":
arabic = "ٱللَّٰهُ أَكْبَر";
break;

case "La ilaha illallah":
arabic = "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ";
break;

case "Astaghfirullah":
arabic = "أَسْتَغْفِرُ ٱللَّٰهَ";
break;

case "Bismillah":
arabic = "بِسْمِ ٱللَّٰهِ";
break;

case "SubhanAllahi Wa Bihamdihi":
arabic = "سُبْحَانَ ٱللَّٰهِ وَبِحَمْدِهِ";
break;

case "SubhanAllahil Azeem":
arabic = "سُبْحَانَ ٱللَّٰهِ الْعَظِيم";
break;

default:
arabic = "";

}

document.getElementById("tasbeehArabic").innerHTML =
arabic;

}

// ===============================
// LOAD DEFAULT
// ===============================

window.onload = function(){

setTarget(33);

document.getElementById("tasbeehCount").innerHTML =
tasbeehCount;

document.getElementById("complete33").innerHTML =
complete33;

document.getElementById("complete99").innerHTML =
complete99;

document.getElementById("complete100").innerHTML =
complete100;

let saved =
localStorage.getItem("selectedZikr") || "SubhanAllah";

document.getElementById("zikrSelect").value =
saved;

changeZikr();

}
// ===============================
// JAMAAT REMINDER NOTIFICATION
// ===============================

function enableNotifications(){

if(!("Notification" in window)){

alert("Your browser does not support notifications.");

return;

}


Notification.requestPermission().then(function(permission){

if(permission === "granted"){

alert("🔔 Jamaat Reminder Enabled");

}

else{

alert("Notification permission denied");

}

});

}


/* ===============================
   QIBLA FINDER
================================ */

function findQibla(){


if(!navigator.geolocation){

document.getElementById("qiblaDirection").innerHTML =
"Location not supported";

return;

}


navigator.geolocation.getCurrentPosition(

function(position){


let lat = position.coords.latitude;

let lon = position.coords.longitude;


// Kaaba Coordinates

let kaabaLat = 21.4225;

let kaabaLon = 39.8262;


let dLon = (kaabaLon - lon) * Math.PI / 180;


let userLat = lat * Math.PI / 180;

let kLat = kaabaLat * Math.PI / 180;


let y = Math.sin(dLon) * Math.cos(kLat);

let x = Math.cos(userLat) * Math.sin(kLat)
-
Math.sin(userLat) * Math.cos(kLat) * Math.cos(dLon);


let bearing = Math.atan2(y,x);


bearing = bearing * 180 / Math.PI;


bearing = (bearing + 360) % 360;



document.getElementById("qiblaDirection").innerHTML =

"🕋 Qibla Direction: " + Math.round(bearing) + "°";



let needle = document.getElementById("qiblaNeedle");


if(needle){

needle.style.transform =
"rotate(" + bearing + "deg)";

}



startCompass();


},


function(){

document.getElementById("qiblaDirection").innerHTML =

"Please allow location access";

}


);


}



/* ===============================
   LIVE COMPASS
================================ */

function startCompass(){


if(window.DeviceOrientationEvent){


window.addEventListener(

"deviceorientation",

function(event){


let heading = event.alpha;


let needle = document.getElementById("qiblaNeedle");


if(needle && heading !== null){


needle.style.transform =
"rotate(" + heading + "deg)";


}


}


);


}

else{


document.getElementById("qiblaDirection").innerHTML =

"Compass not supported";


}


}

