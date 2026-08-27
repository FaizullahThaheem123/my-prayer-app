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
        titleUrdu: "دعائے حضرت یونس علیہ السلام",
        category: "peace",
        arabic: "وَذَا النُّونِ إِذ ذَّهَبَ مُغَاضِبًا فَظَنَّ أَن لَّن نَّقْدِرَ عَلَيْهِ فَنَادَىٰ فِي الظُّلُمَاتِ أَن لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
        transliteration: "Wa dhan-nooni idh dhahaba mughadiban fazanna al-lan naqdira 'alayhi fanada fiz-zulumati al-la ilaha illa Anta subhanaka innee kuntu minaz-zalimeen.",
        meaning: "And [mention] the man of the fish, when he went off in anger and thought that We would not restrict him, and he called out in the darkness, 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.'",
        urdu: "اور مچھلی والے (حضرت یونس علیہ السلام) کو یاد کرو، جب وہ غصے میں چلے گئے اور خیال کیا کہ ہم ان پر تنگی نہیں کریں گے، پھر انہوں نے اندھیروں میں پکارا: تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے تھا۔",
        reference: "Surah Al-Anbiya 21:87",
        virtues: "غم، دلی پریشانی اور مصیبتوں سے نجات کے لیے اکسیر دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/021087.mp3"
    },
    {
        id: "adam-forgiveness",
        title: "Dua of Prophet Adam (Forgiveness)",
        titleUrdu: "دعائے حضرت آدم علیہ السلام (توبہ و مغفرت)",
        category: "forgiveness",
        arabic: "قَالَا رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
        transliteration: "Qala Rabbana zalamna anfusana wa il-lam taghfir lana wa tarhamna lanakoonanna minal-khasireen.",
        meaning: "They said, 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.'",
        urdu: "دونوں نے کہا: اے ہمارے رب! ہم نے اپنی جانوں پر ظلم کیا، اگر تو نے ہمیں معاف نہ کیا اور ہم پر رحم نہ کیا تو ہم ضرور نقصان اٹھانے والوں میں سے ہو جائیں گے۔",
        reference: "Surah Al-A'raf 7:23",
        virtues: "توبہ کی سب سے پہلی اور مقبول ترین قرآنی دعا، دل کو گناہوں کی معافی کا یقین دلاتی ہے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/007023.mp3"
    },
    {
        id: "tawakkul-verse",
        title: "Dua for Trust in Allah's Decree",
        titleUrdu: "توکل کی آیت (جو تقدیر میں لکھا ہے وہی ہوگا)",
        category: "peace",
        arabic: "قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا هُوَ مَوْلَانَا ۚ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ",
        transliteration: "Qul lan yuseebana illa ma katab Allahu lana, Huwa Mawlana, wa 'alallahi falyatawakkalil-mu'minoon.",
        meaning: "Say, 'Never will we be struck except by what Allah has decreed for us; He is our protector.' And upon Allah let the believers rely.",
        urdu: "کہہ دیجئے! ہمیں ہرگز کوئی چیز نہیں پہنچے گی مگر وہی جو اللہ نے ہمارے لیے لکھ دی ہے، وہی ہمارا کارساز ہے، اور مومنوں کو اللہ ہی پر بھروسہ کرنا چاہیے۔",
        reference: "Surah At-Tawbah 9:51",
        virtues: "پریشانی اور خوف کے وقت دل کو تقدیر پر راضی اور مطمئن رکھنے والی آیت۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/009051.mp3"
    },
    {
        id: "dua-hasanah",
        title: "Dua for Good in This World & Hereafter",
        titleUrdu: "دعائے ربنا آتنا (دنیا و آخرت کی بھلائی)",
        category: "daily",
        arabic: "وَمِنْهُم مَّن يَقُولُ رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Wa minhum man yaqoolu Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
        meaning: "And among them is he who says, 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.'",
        urdu: "اور انہی میں سے وہ بھی ہیں جو کہتے ہیں: اے ہمارے رب! ہمیں دنیا میں بھی بھلائی دے اور آخرت میں بھی بھلائی دے، اور ہمیں آگ کے عذاب سے بچا۔",
        reference: "Surah Al-Baqarah 2:201",
        virtues: "روزانہ پڑھی جانے والی سب سے جامع اور مقبول قرآنی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/002201.mp3"
    },
    {
        id: "dua-steadfast-heart",
        title: "Dua for a Steadfast Heart",
        titleUrdu: "دعائے ثباتِ قلب (دل کو ہدایت پر قائم رکھنے کی دعا)",
        category: "daily",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ",
        transliteration: "Rabbana la tuzigh quloobana ba'da idh hadaytana wa hab lana milladunka rahmah, innaka antal-Wahhab.",
        meaning: "Our Lord, let not our hearts deviate after You have guided us, and grant us mercy from Yourself. Indeed, You are the Bestower.",
        urdu: "اے ہمارے رب! ہمیں ہدایت دینے کے بعد ہمارے دلوں کو ٹیڑھا نہ کر، اور ہمیں اپنے پاس سے رحمت عطا فرما، بے شک تو ہی بہت عطا کرنے والا ہے۔",
        reference: "Surah Aal-e-Imran 3:8",
        virtues: "دل کو ایمان اور ہدایت پر ثابت قدم رکھنے کے لیے روزانہ پڑھنے کی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/003008.mp3"
    },
    {
        id: "dua-shifa",
        title: "Dua of Prophet Ibrahim for Healing (Shifa)",
        titleUrdu: "دعائے شفا (حضرت ابراہیم علیہ السلام)",
        category: "healing",
        arabic: "وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ",
        transliteration: "Wa idha maridtu fahuwa yashfeen.",
        meaning: "And when I am ill, it is He who cures me.",
        urdu: "اور جب میں بیمار ہوتا ہوں تو وہی مجھے شفا دیتا ہے۔",
        reference: "Surah Ash-Shu'ara 26:80",
        virtues: "بیماری میں شفا کے یقین اور اللہ پر توکل کی سب سے مختصر اور جامع قرآنی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/026080.mp3"
    },
    {
        id: "hasbiyallahu",
        title: "Sufficiency of Allah (Hasbiyallahu)",
        titleUrdu: "حسبی اللہ (اللہ میرے لیے کافی ہے)",
        category: "peace",
        arabic: "فَإِن تَوَلَّوْا فَقُلْ حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        transliteration: "Fa in tawallaw faqul hasbiyallahu la ilaha illa Huwa 'alayhi tawakkaltu wa Huwa Rabbul-'Arshil-'Azeem.",
        meaning: "But if they turn away, say, 'Allah is sufficient for me; there is no deity except Him. In Him I place my trust.'",
        urdu: "پھر اگر وہ منہ موڑ لیں تو کہہ دیجئے: میرے لیے اللہ ہی کافی ہے۔ اس کے سوا کوئی معبود نہیں۔ میں نے اسی پر بھروسہ کیا۔",
        reference: "Surah At-Tawbah 9:129",
        virtues: "صبح و شام ۷ بار پڑھنے سے اللہ تمام غموں کے لیے کافی ہو جاتا ہے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/009129.mp3"
    },
    {
        id: "musa-ease",
        title: "Dua for Mental Peace & Ease (Rabbi Ishrah Lee)",
        titleUrdu: "دعائے حضرت موسیٰ (رب اشرح لی صدری)",
        category: "peace",
        arabic: "قَالَ رَبِّ اشْرَحْ لِي صَدْرِي ﴿٢٥﴾ وَيَسِّرْ لِي أَمْرِي ﴿٢٦﴾ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي ﴿٢٧﴾ يَفْقَهُوا قَوْلِي ﴿٢٨﴾",
        transliteration: "Qala Rabbish-rah lee sadree wa yassir lee amree wahlul 'uqdatan min lisanee yafqahoo qawlee.",
        meaning: "He said, 'My Lord, expand for me my chest and ease for me my task and untie the knot from my tongue that they may understand my speech.'",
        urdu: "انہوں (موسیٰ علیہ السلام) نے کہا: اے میرے پروردگار! میرے لیے میرا سینہ کھول دے اور میرا کام آسان کر دے۔",
        reference: "Surah Ta-Ha 20:25-28",
        virtues: "امتحان، انٹرویو اور مشکل کاموں میں آسانی و دل کی کشادگی کے لیے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/020025.mp3"
    },
    {
        id: "rizq-musa",
        title: "Dua for Rizq & Job (Rabbi Inni Lima Anzalta)",
        titleUrdu: "رزق اور حلال روزی کی دعا",
        category: "sustenance",
        arabic: "فَسَقَىٰ لَهُمَا ثُمَّ تَوَلَّىٰ إِلَى الظِّلِّ فَقَالَ رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
        transliteration: "Fasaqa lahuma thumma tawalla ilaz-zilli faqala Rabbi innee lima anzalta ilayya min khayrin faqeer.",
        meaning: "So he watered [their flocks] for them; then he went back to the shade and said, 'My Lord, indeed I am, for whatever good You would send down to me, in need.'",
        urdu: "تو انہوں نے ان کے جانوروں کو پانی پلا دیا، پھر سائے کی طرف لوٹ کر کہا: اے میرے رب! جو بھلائی بھی تو میری طرف نازل فرمائے، میں اس کا محتاج ہوں۔",
        reference: "Surah Al-Qasas 28:24",
        virtues: "روزی، نوکری اور ضرورت پوری ہونے کے لیے نہایت مجرب دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/028024.mp3"
    },
    {
        id: "parents-dua",
        title: "Dua for Parents",
        titleUrdu: "والدین کے لیے رحمت و مغفرت کی دعا",
        category: "family",
        arabic: "وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        transliteration: "Wakhfid lahuma janahaz-zulli minar-rahmati wa qur-Rabbir-hamhuma kama rabbayanee sagheera.",
        meaning: "And lower to them the wing of humility out of mercy and say, 'My Lord, have mercy upon them as they brought me up when I was small.'",
        urdu: "اور ان کے سامنے نرمی اور محبت سے عاجزی کے ساتھ جھک جاؤ، اور کہو: اے میرے پروردگار! ان دونوں پر رحم فرما جیسا کہ انہوں نے بچپن میں مجھے پالا۔",
        reference: "Surah Al-Isra 17:24",
        virtues: "والدین کی خدمت اور ان کے لیے دعائے رحمت کا عظیم قرآنی تحفہ۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/017024.mp3"
    },
    {
        id: "travel-dua",
        title: "Dua for Traveling",
        titleUrdu: "سفر اور سواری کی دعا",
        category: "travel",
        arabic: "لِتَسْتَوُوا عَلَىٰ ظُهُورِهِ ثُمَّ تَذْكُرُوا نِعْمَةَ رَبِّكُمْ إِذَا اسْتَوَيْتُمْ عَلَيْهِ وَتَقُولُوا سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ ﴿١٣﴾ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ ﴿١٤﴾",
        transliteration: "Litastawoo 'ala zuhoorihee thumma tadhkuroo ni'mata rabbikum idhas-tawaytum 'alayhi wa taqooloo subhanal-ladhee sakhkhara lana hadha wa ma kunna lahu muqrineen, wa inna ila rabbina lamunqaliboon.",
        meaning: "That you may settle yourselves upon their backs and then remember the favor of your Lord when you have settled upon them and say, 'Exalted is He who has subjected this to us, and we could not have [otherwise] subdued it. And indeed we, to our Lord, will return.'",
        urdu: "تاکہ تم ان کی پیٹھوں پر ٹھیک طرح بیٹھو، پھر جب ان پر بیٹھ جاؤ تو اپنے رب کی نعمت کو یاد کرو اور کہو: پاک ہے وہ ذات جس نے اس کو ہمارے تابع کر دیا، ورنہ ہم اسے قابو میں نہیں لا سکتے تھے، اور بیشک ہم اپنے رب ہی کی طرف لوٹنے والے ہیں۔",
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
// MORE MENU LOGIC (Quran Style) - FIXED
// ======================================
document.addEventListener("DOMContentLoaded", function() {
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

// ======================================
// INITIALIZATION
// ======================================
document.addEventListener("DOMContentLoaded", () => {
    loadDuas();
    updateFavoriteCount();
});