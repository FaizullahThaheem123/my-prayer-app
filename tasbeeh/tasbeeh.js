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
// DHIKR LIST — 30 ADHKAR
// ======================================

const dhikrList = [

{
arabic:"سُبْحَانَ اللَّهِ",
meaning:"اللہ پاک ہے۔"
},

{
arabic:"الْحَمْدُ لِلَّهِ",
meaning:"تمام تعریفیں اللہ ہی کے لیے ہیں۔"
},

{
arabic:"اللَّهُ أَكْبَرُ",
meaning:"اللہ سب سے بڑا ہے۔"
},

{
arabic:"لَا إِلَٰهَ إِلَّا اللَّهُ",
meaning:"اللہ کے سوا کوئی معبود نہیں۔"
},

{
arabic:"أَسْتَغْفِرُ اللَّهَ",
meaning:"میں اللہ سے بخشش مانگتا ہوں۔"
},

{
arabic:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
meaning:"اللہ پاک ہے اور اسی کے لیے تمام تعریف ہے۔"
},

{
arabic:"سُبْحَانَ اللَّهِ الْعَظِيمِ",
meaning:"پاک ہے اللہ جو عظمت والا ہے۔"
},

{
arabic:"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
meaning:"اللہ کے بغیر نہ کوئی طاقت ہے نہ قوت۔"
},

{
arabic:"حَسْبِيَ اللَّهُ",
meaning:"میرے لیے اللہ کافی ہے۔"
},

{
arabic:"حَسْبِيَ اللَّهُ وَنِعْمَ الْوَكِيلُ",
meaning:"میرے لیے اللہ کافی ہے اور وہ بہترین کارساز ہے۔"
},

{
arabic:"رَبِّ اغْفِرْ لِي",
meaning:"اے میرے رب! مجھے بخش دے۔"
},

{
arabic:"اللَّهُمَّ اغْفِرْ لِي",
meaning:"اے اللہ! مجھے بخش دے۔"
},

{
arabic:"رَبِّ زِدْنِي عِلْمًا",
meaning:"اے میرے رب! میرے علم میں اضافہ فرما۔"
},

{
arabic:"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
meaning:"اے ہمارے رب! ہمیں دنیا میں بھلائی عطا فرما۔"
},

{
arabic:"رَبَّنَا اغْفِرْ لَنَا",
meaning:"اے ہمارے رب! ہمیں بخش دے۔"
},

{
arabic:"اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ",
meaning:"اے اللہ! اپنے ذکر پر میری مدد فرما۔"
},

{
arabic:"اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
meaning:"اے اللہ! محمد ﷺ پر رحمت نازل فرما۔"
},

{
arabic:"صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ",
meaning:"اللہ تعالیٰ ان پر رحمت اور سلامتی نازل فرمائے۔"
},

{
arabic:"سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ",
meaning:"اللہ پاک ہے اور تمام تعریف اللہ ہی کے لیے ہے۔"
},

{
arabic:"سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَاللَّهُ أَكْبَرُ",
meaning:"اللہ پاک ہے، تمام تعریف اللہ کے لیے ہے اور اللہ سب سے بڑا ہے۔"
},

{
arabic:"لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ",
meaning:"اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے۔"
},

{
arabic:"اللَّهُمَّ أَنْتَ رَبِّي",
meaning:"اے اللہ! تو ہی میرا رب ہے۔"
},

{
arabic:"اللَّهُمَّ إِنَّكَ عَفُوٌّ",
meaning:"اے اللہ! بے شک تو معاف کرنے والا ہے۔"
},

{
arabic:"رَبِّ اشْرَحْ لِي صَدْرِي",
meaning:"اے میرے رب! میرا سینہ کھول دے۔"
},

{
arabic:"رَبِّ يَسِّرْ وَلَا تُعَسِّرْ",
meaning:"اے میرے رب! آسانی فرما اور مشکل نہ فرما۔"
},

{
arabic:"اللَّهُمَّ اهْدِنِي",
meaning:"اے اللہ! مجھے ہدایت عطا فرما۔"
},

{
arabic:"اللَّهُمَّ ارْحَمْنِي",
meaning:"اے اللہ! مجھ پر رحم فرما۔"
},

{
arabic:"اللَّهُمَّ ارْزُقْنِي",
meaning:"اے اللہ! مجھے رزق عطا فرما۔"
},

{
arabic:"رَبِّيَ اللَّهُ",
meaning:"میرا رب اللہ ہے۔"
},

{
arabic:"تَوَكَّلْتُ عَلَى اللَّهِ",
meaning:"میں نے اللہ پر بھروسہ کیا۔"
}

];

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

arabicDhikr.textContent = dhikrList[value].arabic;

dhikrMeaning.textContent = dhikrList[value].meaning;

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

