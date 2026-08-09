// ======================================
// MY PRAYER - DIGITAL TASBEEH
// VERSION 2.0
// ======================================


// ======================================
// ELEMENTS
// ======================================

const dhikrSelect = document.getElementById("dhikrSelect");
const arabicDhikr = document.getElementById("arabicDhikr");

const targetButtons = document.querySelectorAll(".target-btn");

const targetValue = document.getElementById("targetValue");
const countValue = document.getElementById("countValue");
const progressValue = document.getElementById("progressValue");

const countCard = document.querySelector(".count-card");

const progressBar = document.getElementById("progressBar");

const countBtn = document.getElementById("countBtn");
const resetBtn = document.getElementById("resetBtn");

const completed33 = document.getElementById("completed33");
const completed99 = document.getElementById("completed99");
const completed100 = document.getElementById("completed100");

const homeBtn = document.getElementById("homeBtn");
const settingsBtn = document.getElementById("settingsBtn");


// ======================================
// VARIABLES
// ======================================

let count = 0;

let target = 33;

let stats = {

    completed33: 0,

    completed99: 0,

    completed100: 0

};


// ======================================
// DHIKR LIST
// ======================================

const dhikrList = {

    bismillah: "بِسْمِ اللهِ",

    subhanallah: "سُبْحَانَ اللّٰهِ",

    alhamdulillah: "ٱلْحَمْدُ لِلَّٰهِ",

    allahuakbar: "اللّٰهُ أَكْبَر",

    astaghfirullah: "أَسْتَغْفِرُ اللّٰهَ",

    lailahaillallah: "لَا إِلٰهَ إِلَّا اللّٰهُ"

};

// ======================================
// UPDATE SCREEN
// ======================================

function updateScreen(){

    countValue.textContent = count;

    targetValue.textContent = target;

    let percent = Math.floor((count / target) * 100);

    if(percent > 100){

        percent = 100;

    }

    progressValue.textContent = percent + "%";

    progressBar.style.width = percent + "%";

}



// ======================================
// CHANGE DHIKR
// ======================================

dhikrSelect.addEventListener("change",()=>{

    const value = dhikrSelect.value;

    arabicDhikr.textContent = dhikrList[value];

});



// ======================================
// TARGET BUTTONS
// ======================================

targetButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        targetButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        target = Number(button.dataset.target);

        if(count > target){

            count = target;

        }

        updateScreen();

    });

});


// ======================================
// COUNT FUNCTION
// ======================================

function increaseCount(){

if(count >= target){

    return;

}

count++;

updateScreen();


// Count Number Animation

countValue.classList.add("count-pop");


// Count Card Glow

countCard.classList.add("active-count");


setTimeout(()=>{

    countValue.classList.remove("count-pop");

    countCard.classList.remove("active-count");

},200);


// Check Complete

if(count === target){

    checkCompleted();


    setTimeout(()=>{

        count = 0;

        updateScreen();

        saveData();

    },1000);


}else{

    saveData();

}


}


// ======================================
// BUTTON EVENT
// ======================================

countBtn.addEventListener("click",increaseCount);



// ======================================
// TARGET COMPLETED
// ======================================

function checkCompleted(){

    if(count !== target){

        return;

    }

    if(target === 33){

        stats.completed33++;

    }

    else if(target === 99){

        stats.completed99++;

    }

    else if(target === 100){

        stats.completed100++;

    }

    completed33.textContent = stats.completed33;

    completed99.textContent = stats.completed99;

    completed100.textContent = stats.completed100;

    alert("🤲 Alhamdulillah!\n\nTarget Completed!");

}

// ======================================
// SAVE DATA
// ======================================

function saveData(){

    localStorage.setItem("tasbeehCount", count);

    localStorage.setItem("tasbeehTarget", target);

    localStorage.setItem("tasbeehStats", JSON.stringify(stats));

}



// ======================================
// LOAD DATA
// ======================================

function loadData(){

    const savedCount = localStorage.getItem("tasbeehCount");

    const savedTarget = localStorage.getItem("tasbeehTarget");

    const savedStats = localStorage.getItem("tasbeehStats");

    if(savedCount !== null){

        count = Number(savedCount);

    }

    if(savedTarget !== null){

        target = Number(savedTarget);

    }

    if(savedStats){

        stats = JSON.parse(savedStats);

    }

    targetButtons.forEach(button=>{

        button.classList.remove("active");

        if(Number(button.dataset.target) === target){

            button.classList.add("active");

        }

    });

    completed33.textContent = stats.completed33;

    completed99.textContent = stats.completed99;

    completed100.textContent = stats.completed100;

    updateScreen();

}



// ======================================
// RESET
// ======================================

resetBtn.addEventListener("click",()=>{

    if(!confirm("Reset current Tasbeeh?")){

        return;

    }

    count = 0;

    updateScreen();

    saveData();

});



// ======================================
// HOME BUTTON
// ======================================

homeBtn.addEventListener("click",()=>{

    window.location.href="../index.html";

});



// ======================================
// SETTINGS BUTTON
// ======================================

settingsBtn.addEventListener("click",()=>{

    alert("Settings will be added in the next update.");

});



// ======================================
// APP START
// ======================================

window.addEventListener("DOMContentLoaded",()=>{

    loadData();

    updateScreen();

});

