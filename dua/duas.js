// ======================================
// MY PRAYER - DAILY DUAS
// DUAS.JS (CLEANED - NO THEME SETTINGS)
// ======================================

const duas = [
    {
        title: "Ayatul Kursi",
        category: "protection",
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضِ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        meaning: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence.",
        urdu: "اللہ وہ ہے جس کے سوا کوئی معبود نہیں، وہ زندہ اور سب کو قائم رکھنے والا ہے۔",
        reference: "Surah Al-Baqarah 2:255",
        audio: "audio/ayatul kursi.mp3"
    },
    {
        title: "Morning Dua",
        category: "daily",
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
        meaning: "O Allah, by You we enter the morning and by You we enter the evening.",
        urdu: "اے اللہ! تیرے ہی حکم سے ہم صبح کرتے ہیں اور تیرے ہی حکم سے شام کرتے ہیں۔",
        reference: "Sunan Abu Dawood",
        audio: "audio/morning dua.mp3"
    },
    {
        title: "Sayyidul Istighfar",
        category: "daily",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        meaning: "O Allah, You are my Lord. There is no god except You. You created me and I am Your servant. I remain faithful to Your covenant and promise as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge before You all the blessings You have bestowed upon me, and I confess my sins. So forgive me, for none forgives sins except You.",
        urdu: "اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں۔ تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں۔ میں اپنی طاقت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے اعمال کے شر سے تیری پناہ مانگتا ہوں۔ میں تیرے اپنے اوپر کیے ہوئے احسانات کا اقرار کرتا ہوں اور اپنے گناہوں کا بھی اقرار کرتا ہوں، پس مجھے بخش دے، کیونکہ تیرے سوا گناہوں کو بخشنے والا کوئی نہیں۔",
        reference: "Sahih al-Bukhari 6306",
        audio: "audio/sayyidul istighfar.mp3"
    },
    {
        title: "Allahumma inni as'alukal-'afwa wal-'afiyah",
        category: "daily",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
        meaning: "O Allah, I ask You for pardon and well-being in this world and the Hereafter. O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family and my wealth. O Allah, conceal my faults and calm my fears. O Allah, protect me from in front of me, behind me, on my right, on my left and above me, and I seek refuge in Your greatness from being taken unaware from beneath me.",
        urdu: "اے اللہ! میں تجھ سے دنیا اور آخرت میں معافی اور عافیت مانگتا ہوں۔ اے اللہ! میں تجھ سے اپنے دین، دنیا، اہل و عیال اور مال میں معافی اور عافیت مانگتا ہوں۔ اے اللہ! میری پردہ پوشی فرما، میرے خوف کو امن میں بدل دے۔ اے اللہ! مجھے میرے آگے، پیچھے، دائیں، بائیں اور اوپر سے محفوظ رکھ، اور میں تیری عظمت کے ذریعے اس بات سے پناہ مانگتا ہوں کہ اچانک نیچے سے ہلاک کر دیا جاؤں۔",
        reference: "Sunan Abu Dawood 5074",
        audio: "audio/allahumma inni as'alukal.mp3"
    },
    {
        title: "Hasbiyallahu La ilaha illa Huwa",
        category: "daily",
        arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        meaning: "Allah is sufficient for me. There is no deity except Him. In Him I place my trust, and He is the Lord of the Mighty Throne.",
        urdu: "میرے لیے اللہ ہی کافی ہے۔ اس کے سوا کوئی معبود نہیں۔ میں نے اسی پر بھروسہ کیا ہے، اور وہ عرشِ عظیم کا رب ہے۔",
        reference: "Surah At-Tawbah 9:129",
        audio: "audio/hasbiyallahu la ilaha illa huwa.mp3"
    },
    {
        title: "La ilaha illallahu wahdahu la sharika lah",
        category: "daily",
        arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        meaning: "There is no god except Allah alone, without partner. To Him belongs all sovereignty and all praise, and He has power over everything.",
        urdu: "اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں۔ اسی کی بادشاہی ہے، اسی کے لیے تمام تعریف ہے، اور وہ ہر چیز پر پوری قدرت رکھتا ہے۔",
        reference: "Sahih al-Bukhari 3293, Sahih Muslim 2691",
        audio: "audio/la ilaha illallahu wahdahu la sharika lah.mp3"
    },
    {
        title: "Raditu billahi Rabba",
        category: "daily",
        arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا",
        meaning: "I am pleased with Allah as my Lord, Islam as my religion, and Muhammad ﷺ as my Prophet.",
        urdu: "میں اللہ کو اپنا رب، اسلام کو اپنا دین، اور محمد ﷺ کو اپنا نبی مان کر راضی ہوں۔",
        reference: "Sunan Abu Dawood 5072, Jami' at-Tirmidhi 3389",
        audio: "audio/raditu billahi rabba.mp3"
    },
    {
        title: "Before Sleeping",
        category: "daily",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        meaning: "In Your name O Allah, I die and I live.",
        urdu: "اے اللہ! تیرے نام کے ساتھ مرتا ہوں اور جیتا ہوں۔",
        reference: "Sahih al-Bukhari",
        audio: ""
    },
    {
        title: "After Eating",
        category: "daily",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا",
        meaning: "Praise is to Allah who fed me this.",
        urdu: "تمام تعریفیں اللہ کے لیے ہیں جس نے مجھے یہ کھانا عطا فرمایا۔",
        reference: "Sunan Abu Dawood",
        audio: ""
    },
    {
        title: "Travel Dua",
        category: "travel",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا",
        meaning: "Glory is to Him who has subjected this to us.",
        urdu: "پاک ہے وہ ذات جس نے اس کو ہمارے لیے مسخر کر دیا۔",
        reference: "Surah Az-Zukhruf 43:13",
        audio: ""
    }
];

// ======================================
// GLOBAL VARIABLES
// ======================================
let favorites = JSON.parse(localStorage.getItem("duaFavorites")) || [];
let currentCategory = "all";
let currentDuaIndex = 0;
let currentDuaList = duas;
let touchStartX = 0;

// ======================================
// DOM ELEMENTS
// ======================================
const duaReader = document.getElementById("duaReader");
const duaAudio = document.getElementById("duaAudio");
const duaAudioBtn = document.getElementById("duaAudioBtn");
const duaAudioStatus = document.getElementById("duaAudioStatus");
const duaAudioProgressFill = document.getElementById("duaAudioProgressFill");

// ======================================
// LOAD DUAS
// ======================================
function loadDuas(list = duas){
    closeMoreMenu();
    currentDuaList = list;
    window.currentDuaList = list;
    const container = document.getElementById("duaList");
    if(!container) return;
    container.innerHTML = "";
    list.forEach((dua) => {
        const realIndex = duas.indexOf(dua);
        container.innerHTML += `
            <div class="dua-card" onclick="openReader(${realIndex})">
                <div class="dua-header">
                    <h3>${dua.title}</h3>
                    <span>📖</span>
                </div>
            </div>
        `;
    });
}

// ======================================
// OPEN READER
// ======================================
function openReader(index){
    closeMoreMenu();
    if(index < 0 || index >= duas.length) return;
    currentDuaIndex = index;
    const dua = duas[index];
    stopDuaAudio();

    document.getElementById("readerTitle").textContent = dua.title;
    document.getElementById("readerArabic").textContent = dua.arabic;
    document.getElementById("readerMeaning").textContent = dua.meaning;
    document.getElementById("readerUrdu").textContent = dua.urdu;
    document.getElementById("readerReference").textContent = dua.reference;

    const currentPosition = currentDuaList.findIndex(item => item === dua);
    document.getElementById("readerCount").textContent = (currentPosition + 1) + " / " + currentDuaList.length;

    document.getElementById("readerFavBtn").textContent = favorites.includes(index) ? "❤️" : "🤍";

    setDuaAudio(dua.audio);
    duaReader.classList.add("show");
    document.querySelector(".reader-content").scrollTop = 0;
}

// ======================================
// SET DUA AUDIO
// ======================================
function setDuaAudio(audioPath){
    if(!duaAudio) return;
    duaAudio.pause();
    duaAudio.currentTime = 0;
    if(duaAudioProgressFill) duaAudioProgressFill.style.width = "0%";
    if(duaAudioBtn) duaAudioBtn.textContent = "▶️";
    if(!audioPath){
        duaAudio.removeAttribute("src");
        duaAudio.load();
        if(duaAudioStatus) duaAudioStatus.textContent = "Audio Not Available";
        return;
    }
    duaAudio.src = encodeURI(audioPath);
    duaAudio.preload = "auto";
    duaAudio.load();
    if(duaAudioStatus) duaAudioStatus.textContent = "Play Audio";
}

// ======================================
// PLAY / PAUSE / STOP AUDIO
// ======================================
function toggleDuaAudio(){
    if(!duaAudio) return;
    if(!duaAudio.src){
        if(duaAudioStatus) duaAudioStatus.textContent = "Audio Not Available";
        return;
    }
    if(duaAudio.paused){
        duaAudio.play().then(() => {
            if(duaAudioBtn) duaAudioBtn.textContent = "⏸️";
            if(duaAudioStatus) duaAudioStatus.textContent = "Playing Audio";
        }).catch((error) => {
            console.log("Dua Audio Error:", error);
            if(duaAudioBtn) duaAudioBtn.textContent = "▶️";
            if(duaAudioStatus) duaAudioStatus.textContent = "Unable to Play Audio";
        });
    } else {
        duaAudio.pause();
        if(duaAudioBtn) duaAudioBtn.textContent = "▶️";
        if(duaAudioStatus) duaAudioStatus.textContent = "Audio Paused";
    }
}

function stopDuaAudio(){
    if(!duaAudio) return;
    duaAudio.pause();
    duaAudio.currentTime = 0;
    if(duaAudioBtn) duaAudioBtn.textContent = "▶️";
    if(duaAudioStatus) duaAudioStatus.textContent = "Play Audio";
    if(duaAudioProgressFill) duaAudioProgressFill.style.width = "0%";
}

// Audio Events
if(duaAudio){
    duaAudio.addEventListener("timeupdate", function(){
        if(!duaAudio.duration || isNaN(duaAudio.duration)) return;
        const percent = (duaAudio.currentTime / duaAudio.duration) * 100;
        if(duaAudioProgressFill) duaAudioProgressFill.style.width = percent + "%";
    });
    duaAudio.addEventListener("ended", function(){
        if(duaAudioBtn) duaAudioBtn.textContent = "▶️";
        if(duaAudioStatus) duaAudioStatus.textContent = "Play Audio";
        if(duaAudioProgressFill) duaAudioProgressFill.style.width = "0%";
    });
    duaAudio.addEventListener("error", function(){
        console.log("Audio file could not be loaded:", duaAudio.src);
        if(duaAudioBtn) duaAudioBtn.textContent = "▶️";
        if(duaAudioStatus) duaAudioStatus.textContent = "Audio Not Available";
    });
}

// ======================================
// COPY DUA
// ======================================
function copyDua(index){
    const dua = duas[index];
    if(!dua) return;
    const text = dua.title + "\n\n" + dua.arabic + "\n\n" + dua.meaning + "\n\n" + dua.urdu + "\n\n" + dua.reference;
    navigator.clipboard.writeText(text).then(() => alert("✅ Dua Copied")).catch(() => alert("Copy Failed"));
}

// ======================================
// SEARCH & CATEGORIES
// ======================================
function searchDua(){
    const search = document.getElementById("duaSearch");
    if(!search) return;
    const value = search.value.trim().toLowerCase();
    if(!value){ showCategory(currentCategory); return; }
    const filtered = duas.filter((dua) => {
        return dua.title.toLowerCase().includes(value) ||
               dua.category.toLowerCase().includes(value) ||
               dua.arabic.includes(value) ||
               dua.meaning.toLowerCase().includes(value) ||
               dua.urdu.includes(value);
    });
    currentDuaList = filtered;
    loadDuas(filtered);
}

function showCategory(category){
    currentCategory = category;
    let result = [];
    if(category === "all") result = duas;
    else if(category === "favorite") result = duas.filter((dua, index) => favorites.includes(index));
    else result = duas.filter(dua => dua.category === category);
    currentDuaList = result;
    loadDuas(result);
}

// ======================================
// FAVORITE SYSTEM
// ======================================
function toggleCurrentFavorite(){
    const index = currentDuaIndex;
    if(favorites.includes(index)) favorites = favorites.filter(item => item !== index);
    else favorites.push(index);
    localStorage.setItem("duaFavorites", JSON.stringify(favorites));
    document.getElementById("readerFavBtn").textContent = favorites.includes(index) ? "❤️" : "🤍";
    updateFavoriteCount();
    loadDuas(currentDuaList);
}

function updateFavoriteCount(){
    const element = document.getElementById("favoriteCount");
    if(!element) return;
    element.textContent = "(" + favorites.length + ")";
}

// ======================================
// CLOSE / NEXT / PREVIOUS DUA
// ======================================
function closeReader(){
    stopDuaAudio();
    duaReader.classList.remove("show");
}

function nextDua(){
    if(!currentDuaList.length) return;
    const currentPosition = currentDuaList.findIndex(dua => dua === duas[currentDuaIndex]);
    if(currentPosition >= 0 && currentPosition < currentDuaList.length - 1){
        const nextItem = currentDuaList[currentPosition + 1];
        const nextIndex = duas.indexOf(nextItem);
        openReader(nextIndex);
    }
}

function previousDua(){
    if(!currentDuaList.length) return;
    const currentPosition = currentDuaList.findIndex(dua => dua === duas[currentDuaIndex]);
    if(currentPosition > 0){
        const previousItem = currentDuaList[currentPosition - 1];
        const previousIndex = duas.indexOf(previousItem);
        openReader(previousIndex);
    }
}

// ======================================
// SWIPE SYSTEM
// ======================================
function setupDuaSwipe(){
    const reader = document.getElementById("duaReader");
    if(!reader) return;
    reader.addEventListener("touchstart", function(e){ touchStartX = e.changedTouches[0].clientX; }, {passive:true});
    reader.addEventListener("touchend", function(e){
        const touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;
        if(difference > 80) nextDua();
        else if(difference < -80) previousDua();
    }, {passive:true});
}

// ======================================
// MORE MENU
// ======================================
function toggleMoreMenu(){
    const menu = document.getElementById("moreMenu");
    if(!menu) return;
    menu.classList.toggle("show");
}

function closeMoreMenu(){
    const menu = document.getElementById("moreMenu");
    if(!menu) return;
    menu.classList.remove("show");
}

// ======================================
// INITIALIZE APP
// ======================================
function initializeDuas(){
    loadDuas();
    updateFavoriteCount();
    setupDuaSwipe();
}

if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initializeDuas);
} else {
    initializeDuas();
}