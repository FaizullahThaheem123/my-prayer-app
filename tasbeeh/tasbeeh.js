// ======================================
// MY PRAYER - DIGITAL TASBEEH (WITH PERIOD STATS)
// ======================================

// ======================================
// ELEMENTS
// ======================================
const dhikrSelect = document.getElementById("dhikrSelect");
const arabicDhikr = document.getElementById("arabicDhikr");
const dhikrMeaning = document.getElementById("dhikrMeaning");

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

// Period Stats Elements
const dailyCount = document.getElementById("dailyCount");
const weeklyCount = document.getElementById("weeklyCount");
const monthlyCount = document.getElementById("monthlyCount");

// MORE MENU ELEMENTS
const moreNavBtn = document.getElementById("moreNavBtn");
const moreMenu = document.getElementById("moreMenu");
const settingsBtn = document.getElementById("settingsBtn");

// ======================================
// VARIABLES
// ======================================
let count = 0;
let target = 33;
let stats = { completed33: 0, completed99: 0, completed100: 0 };

// Period Stats (Daily, Weekly, Monthly)
let periodStats = {
    daily: { count: 0, date: getToday() },
    weekly: { count: 0, weekStart: getWeekStart() },
    monthly: { count: 0, monthStart: getMonthStart() }
};

// ======================================
// DHIKR LIST
// ======================================
const dhikrList = [
    { arabic:"بِسْمِ اللهِ", meaning:"اللہ کے نام سے۔" },
    { arabic:"سُبْحَانَ اللَّهِ", meaning:"اللہ پاک ہے۔" },
    { arabic:"الْحَمْدُ لِلَّهِ", meaning:"تمام تعریفیں اللہ ہی کے لیے ہیں۔" },
    { arabic:"اللَّهُ أَكْبَرُ", meaning:"اللہ سب سے بڑا ہے۔" },
    { arabic:"أَسْتَغْفِرُ اللَّهَ", meaning:"میں اللہ سے بخشش مانگتا ہوں۔" },
    { arabic:"لَا إِلَٰهَ إِلَّا اللَّهُ", meaning:"اللہ کے سوا کوئی معبود نہیں۔" },
    { arabic:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", meaning:"اللہ پاک ہے اور اسی کے لیے تمام تعریف ہے۔" },
    { arabic:"سُبْحَانَ اللَّهِ الْعَظِيمِ", meaning:"پاک ہے اللہ جو عظمت والا ہے۔" },
    { arabic:"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", meaning:"اللہ کے بغیر نہ کوئی طاقت ہے نہ قوت۔" },
    { arabic:"حَسْبِيَ اللَّهُ", meaning:"میرے لیے اللہ کافی ہے۔" },
    { arabic:"حَسْبِيَ اللَّهُ وَنِعْمَ الْوَكِيلُ", meaning:"میرے لیے اللہ کافی ہے اور وہ بہترین کارساز ہے۔" },
    { arabic:"رَبِّ اغْفِرْ لِي", meaning:"اے میرے رب! مجھے بخش دے۔" },
    { arabic:"اللَّهُمَّ اغْفِرْ لِي", meaning:"اے اللہ! مجھے بخش دے۔" },
    { arabic:"رَبِّ زِدْنِي عِلْمًا", meaning:"اے میرے رب! میرے علم میں اضافہ فرما۔" },
    { arabic:"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", meaning:"اے ہمارے رب! ہمیں دنیا میں بھلائی عطا فرما۔" },
    { arabic:"رَبَّنَا اغْفِرْ لَنَا", meaning:"اے ہمارے رب! ہمیں بخش دے۔" },
    { arabic:"اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ", meaning:"اے اللہ! اپنے ذکر پر میری مدد فرما۔" },
    { arabic:"اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ", meaning:"اے اللہ! محمد ﷺ پر رحمت نازل فرما۔" },
    { arabic:"صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ", meaning:"اللہ تعالیٰ ان پر رحمت اور سلامتی نازل فرمائے۔" },
    { arabic:"سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ", meaning:"اللہ پاک ہے اور تمام تعریف اللہ ہی کے لیے ہے۔" },
    { arabic:"سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَاللَّهُ أَكْبَرُ", meaning:"اللہ پاک ہے، تمام تعریف اللہ کے لیے ہے اور اللہ سب سے بڑا ہے۔" },
    { arabic:"لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ", meaning:"اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے۔" },
    { arabic:"اللَّهُمَّ أَنْتَ رَبِّي", meaning:"اے اللہ! تو ہی میرا رب ہے۔" },
    { arabic:"اللَّهُمَّ إِنَّكَ عَفُوٌّ", meaning:"اے اللہ! بے شک تو معاف کرنے والا ہے۔" },
    { arabic:"رَبِّ اشْرَحْ لِي صَدْرِي", meaning:"اے میرے رب! میرا سینہ کھول دے۔" },
    { arabic:"رَبِّ يَسِّرْ وَلَا تُعَسِّرْ", meaning:"اے میرے رب! آسانی فرما اور مشکل نہ فرما۔" },
    { arabic:"اللَّهُمَّ اهْدِنِي", meaning:"اے اللہ! مجھے ہدایت عطا فرما۔" },
    { arabic:"اللَّهُمَّ ارْحَمْنِي", meaning:"اے اللہ! مجھ پر رحم فرما۔" },
    { arabic:"اللَّهُمَّ ارْزُقْنِي", meaning:"اے اللہ! مجھے رزق عطا فرما۔" },
    { arabic:"رَبِّيَ اللَّهُ", meaning:"میرا رب اللہ ہے۔" },
    { arabic:"تَوَكَّلْتُ عَلَى اللَّهِ", meaning:"میں نے اللہ پر بھروسہ کیا۔" }
];

// ======================================
// PERIOD STATS HELPERS
// ======================================
function getToday() {
    return new Date().toISOString().split('T')[0];
}

function getWeekStart() {
    const now = new Date();
    const day = now.getDay();
    const diff = (day === 0 ? 6 : day - 1); // Monday as start
    const monday = new Date(now);
    monday.setDate(now.getDate() - diff);
    return monday.toISOString().split('T')[0];
}

function getMonthStart() {
    const now = new Date();
    return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-01';
}

function loadPeriodStats() {
    const saved = localStorage.getItem("tasbeehPeriodStats");
    if (saved) {
        try {
            periodStats = JSON.parse(saved);
        } catch(e) {}
    }
    // Check resets
    const today = getToday();
    if (periodStats.daily.date !== today) {
        periodStats.daily.count = 0;
        periodStats.daily.date = today;
    }
    const weekStart = getWeekStart();
    if (periodStats.weekly.weekStart !== weekStart) {
        periodStats.weekly.count = 0;
        periodStats.weekly.weekStart = weekStart;
    }
    const monthStart = getMonthStart();
    if (periodStats.monthly.monthStart !== monthStart) {
        periodStats.monthly.count = 0;
        periodStats.monthly.monthStart = monthStart;
    }
    updatePeriodUI();
    savePeriodStats();
}

function savePeriodStats() {
    localStorage.setItem("tasbeehPeriodStats", JSON.stringify(periodStats));
}

function updatePeriodUI() {
    dailyCount.textContent = periodStats.daily.count;
    weeklyCount.textContent = periodStats.weekly.count;
    monthlyCount.textContent = periodStats.monthly.count;
}

// ======================================
// EXISTING FUNCTIONS
// ======================================
function updateScreen(){
    countValue.textContent = count;
    targetValue.textContent = target;
    let percent = Math.floor((count / target) * 100);
    if(percent > 100) percent = 100;
    progressValue.textContent = percent + "%";
    progressBar.style.width = percent + "%";
}

dhikrSelect.addEventListener("change", ()=>{
    const value = dhikrSelect.value;
    arabicDhikr.textContent = dhikrList[value].arabic;
    dhikrMeaning.textContent = dhikrList[value].meaning;
});

targetButtons.forEach(button=>{
    button.addEventListener("click", ()=>{
        targetButtons.forEach(btn=> btn.classList.remove("active"));
        button.classList.add("active");
        target = Number(button.dataset.target);
        if(count > target) count = target;
        updateScreen();
    });
});

function increaseCount(){
    if(count >= target) return;
    count++;
    updateScreen();

    countValue.classList.add("count-pop");
    countCard.classList.add("active-count");

    setTimeout(()=>{
        countValue.classList.remove("count-pop");
        countCard.classList.remove("active-count");
    },200);

    if(count === target){
        checkCompleted();
        // Increment period stats
        periodStats.daily.count++;
        periodStats.weekly.count++;
        periodStats.monthly.count++;
        updatePeriodUI();
        savePeriodStats();

        setTimeout(()=>{
            count = 0;
            updateScreen();
            saveData();
        },1000);
    } else {
        saveData();
    }
}
countBtn.addEventListener("click", increaseCount);

function checkCompleted(){
    if(target === 33) stats.completed33++;
    else if(target === 99) stats.completed99++;
    else if(target === 100) stats.completed100++;
    completed33.textContent = stats.completed33;
    completed99.textContent = stats.completed99;
    completed100.textContent = stats.completed100;
    alert("🤲 Alhamdulillah!\n\nTarget Completed!");
}

function saveData(){
    localStorage.setItem("tasbeehCount", count);
    localStorage.setItem("tasbeehTarget", target);
    localStorage.setItem("tasbeehStats", JSON.stringify(stats));
}

function loadData(){
    const savedCount = localStorage.getItem("tasbeehCount");
    const savedTarget = localStorage.getItem("tasbeehTarget");
    const savedStats = localStorage.getItem("tasbeehStats");

    if(savedCount !== null) count = Number(savedCount);
    if(savedTarget !== null) target = Number(savedTarget);
    if(savedStats) stats = JSON.parse(savedStats);

    targetButtons.forEach(button=>{
        button.classList.remove("active");
        if(Number(button.dataset.target) === target) button.classList.add("active");
    });
    completed33.textContent = stats.completed33;
    completed99.textContent = stats.completed99;
    completed100.textContent = stats.completed100;
    updateScreen();
}

resetBtn.addEventListener("click", ()=>{
    if(!confirm("Reset current Tasbeeh?")) return;
    count = 0;
    updateScreen();
    saveData();
});

// ======================================
// MORE MENU LOGIC
// ======================================
moreNavBtn.addEventListener("click", (event)=>{
    event.stopPropagation();
    moreMenu.classList.toggle("show");
});

document.addEventListener("click", ()=>{
    moreMenu.classList.remove("show");
});
document.addEventListener("touchstart", (event)=>{
    if(!moreMenu.contains(event.target) && !moreNavBtn.contains(event.target)){
        moreMenu.classList.remove("show");
    }
}, { passive: true });

if(settingsBtn){
    settingsBtn.addEventListener("click", ()=>{
        moreMenu.classList.remove("show");
        alert("Settings will be available in the next update.");
    });
}

// ======================================
// APP START
// ======================================
window.addEventListener("DOMContentLoaded", ()=>{
    loadData();
    updateScreen();
    loadPeriodStats();
});