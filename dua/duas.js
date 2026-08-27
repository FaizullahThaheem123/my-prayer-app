// ======================================
// MY PRAYER - DAILY DUAS (ONLINE & OFFLINE DOWNLOAD)
// ======================================

const duas = [
    {
        id: "ayatul-kursi",
        title: "Ayatul Kursi",
        titleUrdu: "آیت الکرسی",
        category: "protection",
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضِ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        transliteration: "Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta'khudhuhu sinatuw-wa la nawm...",
        meaning: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence.",
        urdu: "اللہ وہ ہے جس کے سوا کوئی معبود نہیں، وہ زندہ اور سب کو قائم رکھنے والا ہے۔",
        reference: "Surah Al-Baqarah 2:255",
        virtues: "ہر فرض نماز کے بعد پڑھنے والا اللہ تعالیٰ کی خاص حفاظت میں رہتا ہے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/002255.mp3"
    },
    {
        id: "yunus-anxiety",
        title: "Dua of Prophet Yunus (Relief from Anxiety)",
        titleUrdu: "دعائے حضرت یونس علیہ السلام (آیت کریمہ)",
        category: "peace",
        arabic: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        transliteration: "La ilaha illa Anta Subhanaka innee kuntu minaz-zalimeen.",
        meaning: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        urdu: "تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے تھا۔",
        reference: "Surah Al-Anbiya 21:87",
        virtues: "غم، دلی پریشانی اور مصیبتوں سے نجات کے لیے اکسیر دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/021087.mp3"
    },
    {
        id: "sayyidul-istighfar",
        title: "Sayyidul Istighfar",
        titleUrdu: "سید الاستغفار (سب سے عظیم استغفار)",
        category: "forgiveness",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        transliteration: "Allahumma Anta Rabbee la ilaha illa Anta, khalaqtanee wa ana 'abduka...",
        meaning: "O Allah, You are my Lord. There is no god except You. You created me and I am Your servant.",
        urdu: "اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں۔ تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں۔",
        reference: "Sahih al-Bukhari 6306",
        virtues: "صبح یا شام یقین کے ساتھ پڑھ کر وفات پانے والا سیدھا جنتی ہے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/002286.mp3"
    },
    {
        id: "anxiety-grief",
        title: "Dua for Relief from Stress, Worry & Debt",
        titleUrdu: "پریشانی، غم اور قرض سے نجات کی دعا",
        category: "peace",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        transliteration: "Allahumma innee a'oodhu bika minal-hammi wal-hazan...",
        meaning: "O Allah, I seek refuge in You from grief and sadness, from weakness and laziness, and from heavy debt.",
        urdu: "اے اللہ! میں غم، پریشانی، سستی، بزدلی، کنجوسی اور قرض کے بوجھ سے تیری پناہ مانگتا ہوں۔",
        reference: "Sahih al-Bukhari 2893",
        virtues: "دل کے سکون اور بوجھ کو ہلکا کرنے والی مسنون دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/003008.mp3"
    },
    {
        id: "morning-dua",
        title: "Morning Dua",
        titleUrdu: "صبح کے وقت کی دعا",
        category: "daily",
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
        transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namootu wa ilaykan-nushoor.",
        meaning: "O Allah, by You we enter the morning and by You we enter the evening, and to You is the return.",
        urdu: "اے اللہ! تیرے ہی فضل سے ہم نے صبح کی اور شام کی، تیرے ہی حکم سے جیتے اور مرتے ہیں۔",
        reference: "Sunan Abu Dawood 5068",
        virtues: "پورے دن کو برکت اور اللہ کی پناہ میں رکھنے کے لیے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/030017.mp3"
    },
    {
        id: "evening-dua",
        title: "Evening Dua",
        titleUrdu: "شام کے وقت کی دعا",
        category: "daily",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        transliteration: "Amsayna wa amsal-mulku lillah, wal-hamdu lillah...",
        meaning: "We have reached the evening and at this evening all sovereignty belongs to Allah.",
        urdu: "ہم نے شام کی اور تمام بادشاہی اللہ ہی کے لیے ہے، اور تمام تعریف اللہ ہی کے لیے ہے۔",
        reference: "Sahih Muslim 2723",
        virtues: "رات بھر شرور اور آفات سے پناہ۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/030018.mp3"
    },
    {
        id: "afiyah-health",
        title: "Dua for Complete Health & Security (Al-Afiyah)",
        titleUrdu: "عافیت اور سلامتی کی جامع دعا",
        category: "healing",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
        transliteration: "Allahumma innee as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirah...",
        meaning: "O Allah, I ask You for pardon and well-being in this world and the Hereafter.",
        urdu: "اے اللہ! میں تجھ سے دنیا، آخرت، دین، اہل و عیال اور مال میں معافی اور عافیت مانگتا ہوں۔",
        reference: "Sunan Abu Dawood 5074",
        virtues: "حضور ﷺ صبح و شام یہ دعا کبھی ترک نہیں فرماتے تھے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/002286.mp3"
    },
    {
        id: "hasbiyallahu",
        title: "Sufficiency of Allah (Hasbiyallahu)",
        titleUrdu: "حسبی اللہ (اللہ میرے لیے کافی ہے)",
        category: "peace",
        arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        transliteration: "Hasbiyallahu la ilaha illa Huwa 'alayhi tawakkaltu wa Huwa Rabbul-'Arshil-'Azeem.",
        meaning: "Allah is sufficient for me. There is no deity except Him. In Him I place my trust.",
        urdu: "میرے لیے اللہ ہی کافی ہے۔ اس کے سوا کوئی معبود نہیں۔ میں نے اسی پر بھروسہ کیا۔",
        reference: "Surah At-Tawbah 9:129",
        virtues: "صبح و شام ۷ بار پڑھنے سے اللہ تمام غموں کے لیے کافی ہو جاتا ہے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/009129.mp3"
    },
    {
        id: "musa-ease",
        title: "Dua for Mental Peace & Ease (Rabbi Ishrah Lee)",
        titleUrdu: "دعائے حضرت موسیٰ (رب اشرح لی صدری)",
        category: "peace",
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي ﴿٢٥﴾ وَيَسِّرْ لِي أَمْرِي ﴿٢٦﴾ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي ﴿٢٧﴾ يَفْقَهُوا قَوْلِي ﴿٢٨﴾",
        transliteration: "Rabbish-rah lee sadree wa yassir leee amree...",
        meaning: "My Lord, expand for me my chest with peace, and ease for me my task.",
        urdu: "اے میرے پروردگار! میرے لیے میرا سینہ کھول دے اور میرا کام آسان کر دے۔",
        reference: "Surah Ta-Ha 20:25-28",
        virtues: "امتحان، انٹرویو اور مشکل کاموں میں آسانی و دل کی کشادگی کے لیے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/020025.mp3"
    },
    {
        id: "rizq-musa",
        title: "Dua for Rizq & Job (Rabbi Inni Lima Anzalta)",
        titleUrdu: "رزق اور حلال روزی کی دعا",
        category: "sustenance",
        arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
        transliteration: "Rabbi innee limaaa anzalta ilayya min khayrin faqeer.",
        meaning: "My Lord, truly I am in dire need of whatever good You bestow upon me.",
        urdu: "اے میرے رب! جو بھلائی بھی تو میری طرف نازل فرمائے، میں اس کا محتاج ہوں۔",
        reference: "Surah Al-Qasas 28:24",
        virtues: "روزی، نوکری اور ضرورت پوری ہونے کے لیے نہایت مجرب دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/028024.mp3"
    },
    {
        id: "parents-dua",
        title: "Dua for Parents",
        titleUrdu: "والدین کے لیے رحمت و مغفرت کی دعا",
        category: "family",
        arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        transliteration: "Rabbir-hamhuma kama rabbayanee sagheera.",
        meaning: "My Lord, have mercy upon them both as they brought me up when I was small.",
        urdu: "اے میرے پروردگار! ان دونوں پر رحم فرما جیسا کہ انہوں نے بچپن میں مجھے پالا۔",
        reference: "Surah Al-Isra 17:24",
        virtues: "والدین کی خدمت اور ان کے لیے دعائے رحمت کا عظیم قرآنی تحفہ۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/017024.mp3"
    },
    {
        id: "travel-dua",
        title: "Dua for Traveling",
        titleUrdu: "سفر اور سواری کی دعا",
        category: "travel",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ ﴿١٣﴾ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ ﴿١٤﴾",
        transliteration: "Subhanal-ladhee sakh-khara lana hadha wa ma kunna lahu muqrineen.",
        meaning: "Glory be to Him Who has subjected this to us, and indeed to our Lord we return.",
        urdu: "پاک ہے وہ ذات جس نے اس کو ہمارے تابع کر دیا، اور ہم اپنے رب ہی کی طرف لوٹنے والے ہیں۔",
        reference: "Surah Az-Zukhruf 43:13",
        virtues: "سفر میں ہر قسم کے حادثات اور پریشانیوں سے حفاظت۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/043013.mp3"
    }
];

// ======================================
// APP STATE
// ======================================
let favorites = JSON.parse(localStorage.getItem("duaFavorites")) || [];
let currentCategory = "all";
let currentDuaIndex = 0;
let currentDuaList = duas;

// ======================================
// DOM ELEMENTS
// ======================================
const duaReader = document.getElementById("duaReader");
const duaAudio = document.getElementById("duaAudio");
const duaAudioBtn = document.getElementById("duaAudioBtn");
const duaAudioStatus = document.getElementById("duaAudioStatus");
const duaAudioTime = document.getElementById("duaAudioTime");
const duaAudioProgressFill = document.getElementById("duaAudioProgressFill");

// ======================================
// RENDER DUA CARDS
// ======================================
function loadDuas(list = duas) {
    currentDuaList = list;
    const container = document.getElementById("duaList");
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:30px; color:#888;">
                <p>No duas found in this category.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";
    list.forEach((dua) => {
        const realIndex = duas.indexOf(dua);
        container.innerHTML += `
            <div class="dua-card" onclick="openReader(${realIndex})">
                <div class="dua-card-top">
                    <div>
                        <span class="dua-card-badge">${dua.category}</span>
                        <h3 class="dua-card-title">${dua.title}</h3>
                        <p class="dua-card-urdu-title">${dua.titleUrdu || ''}</p>
                    </div>
                    <span style="font-size:18px;">📖</span>
                </div>
                <p class="dua-card-arabic">${dua.arabic}</p>
                <div class="dua-card-bottom">
                    <span>📜 ${dua.reference}</span>
                    <span>▶️ Listen Online & Download</span>
                </div>
            </div>
        `;
    });
}

// ======================================
// OPEN READER
// ======================================
function openReader(index) {
    if (index < 0 || index >= duas.length) return;
    currentDuaIndex = index;
    const dua = duas[index];
    stopDuaAudio();

    document.getElementById("readerTitle").textContent = dua.title;
    document.getElementById("readerTitleUrdu").textContent = dua.titleUrdu || "";
    document.getElementById("readerCategoryBadge").textContent = dua.category.toUpperCase();
    document.getElementById("readerArabic").textContent = dua.arabic;
    document.getElementById("readerTransliteration").textContent = dua.transliteration || "";
    document.getElementById("readerUrdu").textContent = dua.urdu;
    document.getElementById("readerMeaning").textContent = dua.meaning;
    document.getElementById("readerReference").textContent = "📜 " + dua.reference;

    const virtuesBox = document.getElementById("readerVirtuesBox");
    const virtuesText = document.getElementById("readerVirtues");
    if (dua.virtues) {
        virtuesBox.style.display = "block";
        virtuesText.textContent = dua.virtues;
    } else {
        virtuesBox.style.display = "none";
    }

    const currentPos = currentDuaList.findIndex(item => item === dua);
    document.getElementById("readerCount").textContent = (currentPos + 1) + " / " + currentDuaList.length;
    document.getElementById("readerFavBtn").textContent = favorites.includes(index) ? "❤️" : "🤍";

    setDuaAudio(dua.audio);
    duaReader.classList.add("show");
    document.querySelector(".reader-content").scrollTop = 0;
}

// ======================================
// AUDIO SYSTEM (ONLINE STREAMING)
// ======================================
function setDuaAudio(url) {
    if (!duaAudio) return;
    duaAudio.pause();
    duaAudio.currentTime = 0;
    if (duaAudioProgressFill) duaAudioProgressFill.style.width = "0%";
    if (duaAudioBtn) duaAudioBtn.textContent = "▶";
    if (duaAudioTime) duaAudioTime.textContent = "0:00 / 0:00";

    if (!url) {
        duaAudio.removeAttribute("src");
        if (duaAudioStatus) duaAudioStatus.textContent = "Audio Not Available";
        return;
    }

    duaAudio.src = url;
    duaAudio.load();
    if (duaAudioStatus) duaAudioStatus.textContent = "Online Recitation (Ready)";
}

function toggleDuaAudio() {
    if (!duaAudio || !duaAudio.src) return;

    if (duaAudio.paused) {
        duaAudio.play().then(() => {
            if (duaAudioBtn) duaAudioBtn.textContent = "⏸";
            if (duaAudioStatus) duaAudioStatus.textContent = "Playing Recitation...";
        }).catch(() => {
            if (duaAudioStatus) duaAudioStatus.textContent = "Error playing audio";
        });
    } else {
        duaAudio.pause();
        if (duaAudioBtn) duaAudioBtn.textContent = "▶";
        if (duaAudioStatus) duaAudioStatus.textContent = "Paused";
    }
}

function stopDuaAudio() {
    if (!duaAudio) return;
    duaAudio.pause();
    duaAudio.currentTime = 0;
    if (duaAudioBtn) duaAudioBtn.textContent = "▶";
    if (duaAudioProgressFill) duaAudioProgressFill.style.width = "0%";
}

function seekDuaAudio(e) {
    if (!duaAudio || !duaAudio.duration) return;
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    duaAudio.currentTime = percent * duaAudio.duration;
}

// Audio Time Formatting helper
function formatSeconds(sec) {
    if (isNaN(sec) || sec < 0) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Audio Listeners
if (duaAudio) {
    duaAudio.addEventListener("timeupdate", function () {
        if (!duaAudio.duration) return;
        const pct = (duaAudio.currentTime / duaAudio.duration) * 100;
        if (duaAudioProgressFill) duaAudioProgressFill.style.width = pct + "%";
        if (duaAudioTime) {
            duaAudioTime.textContent = `${formatSeconds(duaAudio.currentTime)} / ${formatSeconds(duaAudio.duration)}`;
        }
    });

    duaAudio.addEventListener("ended", function () {
        if (duaAudioBtn) duaAudioBtn.textContent = "▶";
        if (duaAudioStatus) duaAudioStatus.textContent = "Completed";
        if (duaAudioProgressFill) duaAudioProgressFill.style.width = "0%";
    });
}

// ======================================
// OFFLINE MP3 DOWNLOAD SYSTEM
// ======================================
function downloadCurrentDuaAudio() {
    const dua = duas[currentDuaIndex];
    if (!dua || !dua.audio) {
        alert("Audio file not available for download.");
        return;
    }

    const safeTitle = dua.title.toLowerCase().replace(/[^a-z0-9]/g, "_");
    const fileName = `${safeTitle}.mp3`;

    // Fetch and download as MP3 Blob
    fetch(dua.audio)
        .then(res => res.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            alert(`✅ "${dua.title}" downloaded successfully for offline listening!`);
        })
        .catch(() => {
            // Fallback for direct download link
            const link = document.createElement("a");
            link.href = dua.audio;
            link.target = "_blank";
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
}

// ======================================
// CATEGORY & SEARCH FILTER
// ======================================
function searchDua() {
    const input = document.getElementById("duaSearch");
    if (!input) return;
    const q = input.value.trim().toLowerCase();
    if (!q) {
        showCategory(currentCategory);
        return;
    }

    const filtered = duas.filter(d => {
        return d.title.toLowerCase().includes(q) ||
               (d.titleUrdu && d.titleUrdu.includes(q)) ||
               d.arabic.includes(q) ||
               d.urdu.includes(q) ||
               d.meaning.toLowerCase().includes(q) ||
               d.category.toLowerCase().includes(q);
    });
    loadDuas(filtered);
}

function showCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll(".dua-categories button").forEach(b => b.classList.remove("active"));
    
    let result = [];
    if (cat === "all") result = duas;
    else if (cat === "favorite") result = duas.filter((_, idx) => favorites.includes(idx));
    else result = duas.filter(d => d.category === cat);

    loadDuas(result);
}

// ======================================
// FAVORITES SYSTEM
// ======================================
function toggleCurrentFavorite() {
    const idx = currentDuaIndex;
    if (favorites.includes(idx)) {
        favorites = favorites.filter(i => i !== idx);
    } else {
        favorites.push(idx);
    }
    localStorage.setItem("duaFavorites", JSON.stringify(favorites));
    document.getElementById("readerFavBtn").textContent = favorites.includes(idx) ? "❤️" : "🤍";
    updateFavoriteCount();
}

function updateFavoriteCount() {
    const countEl = document.getElementById("favoriteCount");
    if (countEl) {
        countEl.textContent = favorites.length ? `(${favorites.length})` : "";
    }
}

// ======================================
// NAVIGATION
// ======================================
function closeReader() {
    stopDuaAudio();
    duaReader.classList.remove("show");
}

function nextDua() {
    if (!currentDuaList.length) return;
    const pos = currentDuaList.findIndex(d => d === duas[currentDuaIndex]);
    if (pos >= 0 && pos < currentDuaList.length - 1) {
        const nextDua = currentDuaList[pos + 1];
        openReader(duas.indexOf(nextDua));
    }
}

function previousDua() {
    if (!currentDuaList.length) return;
    const pos = currentDuaList.findIndex(d => d === duas[currentDuaIndex]);
    if (pos > 0) {
        const prevDua = currentDuaList[pos - 1];
        openReader(duas.indexOf(prevDua));
    }
}

// ======================================
// INITIALIZATION
// ======================================
document.addEventListener("DOMContentLoaded", () => {
    loadDuas();
    updateFavoriteCount();

    // ======================================
    // MORE MENU LOGIC (Quran Style) - FIXED
    // ======================================
    const moreNavBtn = document.getElementById("moreNavBtn");
    const moreMenu = document.getElementById("moreMenu");
    const closeMoreMenuBtn = document.getElementById("closeMoreMenuBtn");
    const settingsBtn = document.getElementById("settingsBtn");

    if (moreNavBtn && moreMenu) {
        moreNavBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            moreMenu.classList.add("show");
        });
    } else {
        console.error("moreNavBtn or moreMenu not found!");
    }

    if (closeMoreMenuBtn && moreMenu) {
        closeMoreMenuBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            moreMenu.classList.remove("show");
        });
    }

    document.addEventListener("click", function(e) {
        if (moreMenu && moreMenu.classList.contains("show") &&
            !moreMenu.contains(e.target) &&
            !moreNavBtn.contains(e.target)) {
            moreMenu.classList.remove("show");
        }
    });

    if (settingsBtn && moreMenu) {
        settingsBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            moreMenu.classList.remove("show");
            alert("Settings page will be added soon.");
        });
    }
});