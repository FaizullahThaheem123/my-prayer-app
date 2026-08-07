// ======================================
// MY PRAYER - DIGITAL TASBEEH
// CLEAN VERSION
// ======================================


let count = 0;

let target = 33;

let complete33 = 0;
let complete99 = 0;
let complete100 = 0;

let isCompleted = false;


// ======================================
// LOAD
// ======================================

window.onload = function(){


count = Number(localStorage.getItem("tasbeehCount")) || 0;

target = Number(localStorage.getItem("tasbeehTarget")) || 33;


complete33 = Number(localStorage.getItem("complete33")) || 0;

complete99 = Number(localStorage.getItem("complete99")) || 0;

complete100 = Number(localStorage.getItem("complete100")) || 0;



document.getElementById("tasbeehCount").innerText = count;


document.getElementById("complete33").innerText = complete33;

document.getElementById("complete99").innerText = complete99;

document.getElementById("complete100").innerText = complete100;



let savedZikr = localStorage.getItem("selectedZikr");


if(savedZikr){

document.getElementById("zikrSelect").value = savedZikr;

}


changeZikr();

setTarget(target);


updateProgress();


};




// ======================================
// CHANGE ZIKR
// ======================================

function changeZikr(){


let value =
document.getElementById("zikrSelect").value.split("|");


document.getElementById("tasbeehName").innerText =
value[0];


document.getElementById("tasbeehArabic").innerText =
value[1];


localStorage.setItem(
"selectedZikr",
document.getElementById("zikrSelect").value
);


}




// ======================================
// TARGET
// ======================================

function setTarget(newTarget){


target = newTarget;


document.getElementById("tasbeehTarget").innerText =
"🎯 Target : " + target;



document.querySelectorAll(".target-buttons button")
.forEach(btn=>{


btn.classList.remove("active");


if(btn.innerText == target){

btn.classList.add("active");

}


});


localStorage.setItem("tasbeehTarget",target);


updateProgress();


}





// ======================================
// COUNT
// ======================================

function increaseTasbeeh(){


if(isCompleted){

return;

}


count++;


document.getElementById("tasbeehCount").innerText =
count;


localStorage.setItem("tasbeehCount",count);



updateProgress();



if(count === target){


isCompleted=true;



document.getElementById("tasbeehStatus").innerText =
"✅ Target Complete";



saveHistory();


showPopup();



setTimeout(()=>{


resetCounter();


isCompleted=false;


},1000);



}



}




// ======================================
// UPDATE PROGRESS
// ======================================

function updateProgress(){


let percent =
(count / target) * 100;


if(percent > 100){

percent=100;

}



document.getElementById("progressBar").style.width =
percent+"%";


document.getElementById("progressText").innerText =
count+" / "+target;


}





// ======================================
// HISTORY
// ======================================

function saveHistory(){


if(target==33){

complete33++;

document.getElementById("complete33").innerText =
complete33;

localStorage.setItem("complete33",complete33);


}


else if(target==99){

complete99++;

document.getElementById("complete99").innerText =
complete99;

localStorage.setItem("complete99",complete99);


}


else if(target==100){

complete100++;

document.getElementById("complete100").innerText =
complete100;

localStorage.setItem("complete100",complete100);


}



}




// ======================================
// RESET COUNTER
// ======================================

function resetCounter(){


count=0;


document.getElementById("tasbeehCount").innerText=0;


document.getElementById("tasbeehStatus").innerText =
"Keep Counting...";


updateProgress();


localStorage.setItem("tasbeehCount",0);


}




// ======================================
// FULL RESET
// ======================================

function confirmResetTasbeeh(){


if(!confirm("Reset Tasbeeh Counter?")){

return;

}


resetCounter();


}




// ======================================
// POPUP
// ======================================

function showPopup(){


let popup =
document.getElementById("tasbeehPopup");


document.getElementById("popupTitle").innerText =
"🎉 "+target+" Complete";


document.getElementById("popupText").innerText =
"May Allah accept your Dhikr.";



popup.classList.add("show");



setTimeout(()=>{


popup.classList.remove("show");


},1000);


}

// ======================================
// INDEX APP CONNECTION
// ======================================


function connectWithMainApp(){


    localStorage.setItem(
        "lastOpenedModule",
        "tasbeeh"
    );


}



connectWithMainApp();



// ======================================
// THEME SYNC
// ======================================


function syncTasbeehTheme(){


let savedTheme =
localStorage.getItem("appTheme");



if(savedTheme){


document.body.classList.add(savedTheme);



}



}



syncTasbeehTheme();

// ======================================
// HOME NAVIGATION
// ======================================


function goHome(){


    localStorage.setItem(
        "lastOpenedModule",
        "home"
    );


    window.location.href =
    "../index.html";


}