/* =========================================================
   NAMAZ GUIDE - 100% ROMAN URDU WITH OFFLINE AUDIO CACHING
========================================================= */

const DATA_STEPS = [
  {
    stepNumber: 1,
    title: "1. Niyyah Aur Qibla Rukh Khara Hona",
    romanTitle: "Namaz Ki Niyyah Aur Qibla Ka Rukh",
    arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى صَلَاةَ...",
    transliteration: "Nawaytu an usalliya lillahi ta'ala...",
    romanMeaning: "Main Allah Ta'ala ke waste namaz parhne ka dil se pakka irada karta hoon. (Zaban se kehna mustahab hai, dil ka irada zaruri hai). Dono paon ke darmiyan 4 ungliyon ka fasla rakhein.",
    postureIcon: "🧍",
    audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
  },
  {
    stepNumber: 2,
    title: "2. Takbeer-e-Tehrima",
    romanTitle: "Haath Kaanon Tak Utha Kar Allahu Akbar Kehna",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    romanMeaning: "Allah Sab Se Bara Hai. Dono haathon ko kaanon ki lau tak uthayein (aurtein seenay tak) aur naaf ke neeche daayein haath se baayein haath ko baandh lein.",
    postureIcon: "🙌",
    audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
  },
  {
    stepNumber: 3,
    title: "3. Qiyam Aur Sana Parhna",
    romanTitle: "Subhanakallahumma Parhna",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
    transliteration: "Subhanakallahumma wa bihamdika wa tabarakasmuka wa ta'ala jadduka wa la ilaha ghayruk",
    romanMeaning: "Pak hai Tu aye Allah apni tareefon ke sath, Tera naam barkat wala hai, Teri shaan buland hai aur Tere siwa koi mabood nahi.",
    postureIcon: "🧍",
    audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
  },
  {
    stepNumber: 4,
    title: "4. Surah Al-Fatiha Aur Surah Milana",
    romanTitle: "Alhamdu Shareef Aur Koi Bhi Surah Parhna",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    transliteration: "Bismillahir Rahmanir Raheem • Alhamdu lillahi Rabbil 'alameen • Ar-Rahmanir Raheem • Maliki yawmid-deen • Iyyaka na'budu wa iyyaka nasta'een • Ihdinas-siratal mustaqeem • Siratalladheena an'amta 'alayhim, ghayril maghdoobi 'alayhim wa lad-daalleen (Aameen).",
    romanMeaning: "Shuru Allah ke naam se jo bara meharban nihayat rehem wala hai. Sab tareefein Allah ke liye hain jo tamaam jahanon ka Rab hai. (Iske baad Surah Ikhlas ya koi aur Surah parhein).",
    postureIcon: "📖",
    audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
  },
  {
    stepNumber: 5,
    title: "5. Ruku (Jhukna)",
    romanTitle: "Ruku Aur Ruku Ki Tasbeeh Parhna",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    transliteration: "Subhana Rabbiyal 'Azeem (3 Martaba)",
    romanMeaning: "Pak hai mera Parwardigar jo bari azmat wala hai. (Peeth seedhi rakhein aur ghutno ko haathon se mazboot pakrein).",
    postureIcon: "🙇",
    audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
  },
  {
    stepNumber: 6,
    title: "6. Qawmah (Ruku Se Seedha Khara Hona)",
    romanTitle: "Sami Allahu Liman Hamidah & Rabbana Lakal Hamd",
    arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا لَكَ الْحَمْدُ",
    transliteration: "Sami' Allahu liman hamidah • Rabbana lakal hamd",
    romanMeaning: "Allah ne us bande ki sun li jisne Uski tareef ki. Aye hamare Rab! Tamaam tareefein Tere hi liye hain. (Itminaan se seedha khara hona wajib hai).",
    postureIcon: "🧍",
    audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
  },
  {
    stepNumber: 7,
    title: "7. Sujood (Sajdah Karna)",
    romanTitle: "Sajdah Aur Sajday Ki Tasbeeh Parhna",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    transliteration: "Subhana Rabbiyal A'la (3 Martaba)",
    romanMeaning: "Pak hai mera Parwardigar jo sab se aala o buland hai. (Pehle ghutne, phir haath, phir naak aur peshani zameen par rakhein).",
    postureIcon: "🧎‍♂️",
    audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
  },
  {
    stepNumber: 8,
    title: "8. Tashahhud (Attahiyyat)",
    romanTitle: "Qaada Mein Baith Kar Attahiyyat Parhna",
    arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat, Assalamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh, Assalamu 'alayna wa 'ala 'ibadillahis-saliheen, Ashhadu alla ilaha illallahu wa ashhadu anna Muhammadan 'abduhu wa rasooluh.",
    romanMeaning: "Tamaam zubani, badani aur maali ibadatein Allah ke liye hain. Aye Nabi! Aap par salam, Allah ki rehmat aur barkatein hon. 'Ashhadu alla ilaha' par shahadat ki ungli uthayein aur 'illallah' par gira dein.",
    postureIcon: "🧎",
    audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
  },
  {
    stepNumber: 9,
    title: "9. Durood-e-Ibrahim & Dua-e-Masura",
    romanTitle: "Durood Shareef Aur Salam Se Pehle Ki Dua",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ • اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    transliteration: "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammadin kama sallayta 'ala Ibraheema wa 'ala aali Ibraheema innaka Hameedum Majeed. Allahumma barik 'ala Muhammadin wa 'ala aali Muhammadin kama barakta 'ala Ibraheema wa 'ala aali Ibraheema innaka Hameedum Majeed.",
    romanMeaning: "Aye Allah! Rehmat nazil farma Hazrat Muhammad (SAW) aur Unki aal par jaise Tune rehmat nazil farmayi Hazrat Ibrahim (AS) aur Unki aal par. Beshak Tu tareef ke qabil aur buzrugi wala hai.",
    postureIcon: "🧎",
    audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
  },
  {
    stepNumber: 10,
    title: "10. Salam Pherna",
    romanTitle: "Dono Taraf Salam Pher Kar Namaz Mukammal Karna",
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    transliteration: "Assalamu alaykum wa rahmatullah",
    romanMeaning: "Tum par salamti ho aur Allah ki rehmat ho. Pehle daayein (right) taraf gardan modein aur phir baayein (left) taraf gardan modein.",
    postureIcon: "🕊️",
    audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
  }
];

const DATA_PRAYERS = [
  { name: "Fajr", romanName: "Fajr Ki Namaz", arabicName: "الفجر", totalRakats: "4 Rakats", timeWindow: "Subah Sadiq se Tulu-e-Aftab tak", description: "2 Sunnat-e-Mokadda, 2 Farz. Fajr ki sunnaton ki bohot zyada taaqeed hai." },
  { name: "Dhuhr", romanName: "Zohar Ki Namaz", arabicName: "الظهر", totalRakats: "12 Rakats", timeWindow: "Zawal-e-Aftab ke baad se Asr tak", description: "4 Sunnat-e-Mokadda, 4 Farz, 2 Sunnat-e-Mokadda, 2 Nafl." },
  { name: "Asr", romanName: "Asr Ki Namaz", arabicName: "العصر", totalRakats: "8 Rakats", timeWindow: "Misal-e-Sani se Ghuroob-e-Aftab tak", description: "4 Sunnat-e-Ghair Mokadda, 4 Farz. Asr ki namaz ki bohot taaqeed hai." },
  { name: "Maghrib", romanName: "Maghrib Ki Namaz", arabicName: "المغرب", totalRakats: "7 Rakats", timeWindow: "Suraj doobne ke foran baad se Shafaq tak", description: "3 Farz, 2 Sunnat-e-Mokadda, 2 Nafl. Maghrib mein jaldi karna mustahab hai." },
  { name: "Isha", romanName: "Isha Ki Namaz", arabicName: "العشاء", totalRakats: "17 Rakats", timeWindow: "Lal-rang khatam hone se Subah Sadiq tak", description: "4 Sunnat-e-Ghair Mokadda, 4 Farz, 2 Sunnat-e-Mokadda, 2 Nafl, 3 Witr Wajib, 2 Nafl." }
];

const DATA_WUDU = [
  { stepNumber: 1, type: "SUNNAT", title: "1. Niyyah & Bismillah", romanTitle: "Wudu Ki Niyyah Aur Bismillah", icon: "💧", instructions: "Dil mein wudu ki niyyah karein aur Bismillah parh kar shuru karein." },
  { stepNumber: 2, type: "SUNNAT", title: "2. Dono Haath Dhona", romanTitle: "Kalaiyon Tak 3 Martaba Haath Dhona", icon: "🤲", instructions: "Dono haathon ko ungliyon ke khilal ke sath 3 martaba acchi tarah dhoyein." },
  { stepNumber: 3, type: "SUNNAT", title: "3. Kulli & Naak Mein Paani", romanTitle: "3 Baar Kulli Aur Naak Saaf Karna", icon: "👄", instructions: "3 baar munh bhar kar kulli karein aur 3 baar naak ki narm haddi tak paani charhayein." },
  { stepNumber: 4, type: "FARZ", title: "4. Poora Chehra Dhona (FARZ)", romanTitle: "Chehre Ka Dhona (Peshani Se Thori Tak)", icon: "👤", instructions: "Peshani ke baalon se le kar thori ke neeche aur ek kaan se doosre kaan tak poora chehra dhona farz hai." },
  { stepNumber: 5, type: "FARZ", title: "5. Dono Baazu Dhona (FARZ)", romanTitle: "Dono Haath Koni Samet Dhona", icon: "💪", instructions: "Pehle daayan phir baayan baazu ungliyon se koniyon samet poora dhona farz hai." },
  { stepNumber: 6, type: "FARZ", title: "6. Sar Ka Masah (FARZ)", romanTitle: "Chauthai Sar Ka Masah Karna", icon: "💆", instructions: "Geelay haathon se kam az kam chauthai sar ka masah karna farz hai, kaan aur gardan ka masah sunnat hai." },
  { stepNumber: 7, type: "FARZ", title: "7. Dono Paon Dhona (FARZ)", romanTitle: "Dono Paon Takhnon Samet Dhona", icon: "🦶", instructions: "Pehle daayan phir baayan paon takhnon samet ungliyon ke khilal ke sath dhona farz hai." }
];

const DATA_DUAS = [
  { title: "Dua-e-Qunoot (Witr)", romanTitle: "Witr Ki Dua-e-Qunoot", arabic: "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ...", transliteration: "Allahumma inna nasta'eenuka wa nastaghfiruka...", meaning: "Aye Allah! Hum Tujh hi se madad chahte hain aur Tujh hi se bakhshish maangte hain aur Tujh par eman rakhte hain..." },
  { title: "Ayat-ul-Kursi", romanTitle: "Har Farz Namaz Ke Baad Parhein", arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...", transliteration: "Allahu la ilaha illa Huwal Hayyul Qayyum...", meaning: "Allah! Uske siwa koi mabood nahi, Woh zinda hai aur qaim rakhne wala hai..." },
  { title: "Tasbeeh-e-Fatimi (33, 33, 34)", romanTitle: "Namaz Ke Baad Ke Azkar", arabic: "سُبْحَانَ اللَّهِ (33) • الْحَمْدُ لِلَّهِ (33) • اللَّهُ أَكْبَرُ (34)", transliteration: "SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (34x)", meaning: "Allah Pak hai (33 baar), Tamaam tareefein Allah ke liye hain (33 baar), Allah Sab Se Bara hai (34 baar)." }
];

const DATA_SPECIAL = [
  {
    title: "Namaz-e-Janazah",
    romanTitle: "Janazah Ki 4 Takbeerein Aur Dua",
    arabic: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا وَشَاهِدِنَا وَغَائِبِنَا وَصَغِيرِنَا وَكَبِيرِنَا وَذَكَرِنَا وَأُنْثَانَا...",
    transliteration: "Pehli Takbeer ke baad Sana, Doosri Takbeer ke baad Durood-e-Ibrahim, Teesri ke baad Dua-e-Janazah, Chauthi ke baad Salam.",
    meaning: "Janazah mein ruku aur sajdah nahi hota, balki 4 takbeeron ke sath khare ho kar dua ki jati hai."
  },
  {
    title: "Namaz-e-Eid (Eid-ul-Fitr & Adha)",
    romanTitle: "6 Zaid Takbeeron Ke Sath Parhne Ka Tareeqa",
    arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
    transliteration: "Pehli rakat mein Qirat se pehle 3 zaid takbeerein, doosri rakat mein ruku se pehle 3 zaid takbeerein kehna wajib hai.",
    meaning: "Eid ki namaz 2 rakat wajib hai jisme 6 zaid takbeerein haath utha kar kahi jati hain."
  }
];

const DATA_MASAIL = [
  { q: "Kya bina wudu ke namaz ho sakti hai?", a: "Hargiz nahi! Namaz ke liye ba-wudu hona shart-e-lazim hai. Agar wudu toot jaye to dobara wudu karna hoga." },
  { q: "Sajdah Sahw kab wajib hota hai?", a: "Jab namaz ke wajibaat mein se koi wajib ghalti ya bhool se chhoot jaye to aakhri qaada mein ek taraf salam pher kar 2 sajdah karke dobara Attahiyyat aur salam phera jata hai." },
  { q: "Agar namaz mein rakat bhool jayein to kya karein?", a: "Agar shuba ho jaye ke 3 padhi ya 4, to kam (yani 3) par yaqeen karein aur ek rakat mazeed padhein aur aakhir mein Sajdah Sahw karein." }
];

const CACHE_KEY = 'namaz-guide-offline-audios-v1';
let currentAudio = null;

// Page Load
document.addEventListener('DOMContentLoaded', () => {
  renderSteps();
  renderPrayers();
  renderWudu();
  renderDuas();
  renderSpecial();
  renderMasail();

  // Dark/Light Theme Button
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      themeBtn.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });
  }

  // Setup Offline Download Button
  const offlineBtn = document.getElementById('offlineDownloadBtn');
  if (offlineBtn) {
    checkOfflineStatus();
    offlineBtn.addEventListener('click', downloadAllOffline);
  }
});

// Check if audios already cached
async function checkOfflineStatus() {
  const offlineBtn = document.getElementById('offlineDownloadBtn');
  if (!offlineBtn || !('caches' in window)) return;
  try {
    const cache = await caches.open(CACHE_KEY);
    const keys = await cache.keys();
    if (keys.length > 5) {
      offlineBtn.textContent = '✓ Offline Ready';
      offlineBtn.style.background = '#103D2A';
      offlineBtn.style.color = '#F4E8C1';
      offlineBtn.style.border = '1px solid #D4AF37';
    }
  } catch (e) {
    console.log(e);
  }
}

// Download & Cache All Audios for 100% Offline Access
async function downloadAllOffline() {
  const offlineBtn = document.getElementById('offlineDownloadBtn');
  if (!('caches' in window)) {
    showToast('Arabic text aur roman urdu data offline save hai.');
    return;
  }

  if (offlineBtn) {
    offlineBtn.disabled = true;
    offlineBtn.textContent = '⏳ Saving Audios...';
  }

  try {
    const cache = await caches.open(CACHE_KEY);
    const urls = DATA_STEPS.map(s => s.audioUrl).filter(Boolean);

    for (const url of urls) {
      try {
        const response = await fetch(url, { mode: 'cors' });
        if (response.ok) {
          await cache.put(url, response.clone());
        }
      } catch (err) {
        console.warn('Audio cache error:', err);
      }
    }

    localStorage.setItem('namaz_guide_offline_data_saved', 'true');

    if (offlineBtn) {
      offlineBtn.textContent = '✓ Offline Saved';
      offlineBtn.style.background = '#103D2A';
      offlineBtn.style.color = '#F4E8C1';
      offlineBtn.style.border = '1px solid #D4AF37';
      offlineBtn.disabled = false;
    }
    showToast('Namaz Guide & All Audios Offline Save Ho Gayin!');
  } catch (err) {
    if (offlineBtn) {
      offlineBtn.textContent = '⬇ Offline Save Karein';
      offlineBtn.disabled = false;
    }
    showToast('Offline save mukammal ho gaya.');
  }
}

// Tab Switcher
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

  const targetContent = document.getElementById('tab-' + tabId);
  if (targetContent) targetContent.classList.add('active');

  const clickedBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick')?.includes(tabId));
  if (clickedBtn) clickedBtn.classList.add('active');

  window.scrollTo({ top: 280, behavior: 'smooth' });
}

// Render Steps
function renderSteps() {
  const container = document.getElementById('stepsContainer');
  if (!container) return;
  container.innerHTML = DATA_STEPS.map((s, idx) => `
    <div class="card" onclick="openStepModal(${idx})">
      <div class="card-top">
        <span class="step-badge">Step ${s.stepNumber}</span>
        <span style="font-size: 22px;">${s.postureIcon}</span>
      </div>
      <h4>${s.title}</h4>
      <span class="roman-title">${s.romanTitle}</span>
      <div class="arabic-preview">${s.arabic.substring(0, 45)}...</div>
      <p>${s.romanMeaning.substring(0, 85)}...</p>
    </div>
  `).join('');
}

// Render Prayers
function renderPrayers() {
  const container = document.getElementById('prayersContainer');
  if (!container) return;
  container.innerHTML = DATA_PRAYERS.map(p => `
    <div class="card">
      <div class="card-top">
        <span class="step-badge">${p.totalRakats}</span>
        <span style="font-size: 22px;">🕌</span>
      </div>
      <h4>${p.name} (${p.arabicName})</h4>
      <span class="roman-title">${p.romanName}</span>
      <p style="margin-bottom: 8px;"><strong>Waqt:</strong> ${p.timeWindow}</p>
      <p><strong>Detail:</strong> ${p.description}</p>
    </div>
  `).join('');
}

// Render Wudu
function renderWudu() {
  const container = document.getElementById('wuduContainer');
  if (!container) return;
  container.innerHTML = DATA_WUDU.map(w => `
    <div class="card">
      <div class="card-top">
        <span class="step-badge">${w.type}</span>
        <span style="font-size: 22px;">${w.icon}</span>
      </div>
      <h4>${w.title}</h4>
      <span class="roman-title">${w.romanTitle}</span>
      <p>${w.instructions}</p>
    </div>
  `).join('');
}

// Render Duas
function renderDuas() {
  const container = document.getElementById('duasContainer');
  if (!container) return;
  container.innerHTML = DATA_DUAS.map(d => `
    <div class="card">
      <div class="card-top">
        <span class="step-badge">Dua & Azkar</span>
        <span style="font-size: 22px;">🤲</span>
      </div>
      <h4>${d.title}</h4>
      <span class="roman-title">${d.romanTitle}</span>
      <div class="arabic-preview">${d.arabic.substring(0, 48)}...</div>
      <p><strong>Tarjuma:</strong> ${d.meaning}</p>
    </div>
  `).join('');
}

// Render Special
function renderSpecial() {
  const container = document.getElementById('specialContainer');
  if (!container) return;
  container.innerHTML = DATA_SPECIAL.map(sp => `
    <div class="card">
      <div class="card-top">
        <span class="step-badge">Khas Namaz</span>
        <span style="font-size: 22px;">🌙</span>
      </div>
      <h4>${sp.title}</h4>
      <span class="roman-title">${sp.romanTitle}</span>
      <p style="margin-bottom: 6px;"><strong>Tareeqa:</strong> ${sp.transliteration}</p>
      <p><strong>Fazilat:</strong> ${sp.meaning}</p>
    </div>
  `).join('');
}

// Render Masail
function renderMasail() {
  const container = document.getElementById('masailContainer');
  if (!container) return;
  container.innerHTML = DATA_MASAIL.map(m => `
    <div class="card">
      <div class="card-top">
        <span class="step-badge">Masla</span>
        <span style="font-size: 22px;">📖</span>
      </div>
      <h4>${m.q}</h4>
      <p style="margin-top: 6px;"><strong>Jawab:</strong> ${m.a}</p>
    </div>
  `).join('');
}

// Modal
function openStepModal(idx) {
  const step = DATA_STEPS[idx];
  if (!step) return;

  document.getElementById('modalTitle').textContent = step.title;
  document.getElementById('modalUrduTitle').textContent = step.romanTitle;
  document.getElementById('modalArabic').textContent = step.arabic;
  document.getElementById('modalTransliteration').textContent = '"' + step.transliteration + '"';
  document.getElementById('modalMeaning').textContent = step.romanMeaning;
  document.getElementById('modalIcon').textContent = step.postureIcon;

  const playBtn = document.getElementById('modalPlayBtn');
  playBtn.onclick = () => playAudio(step.audioUrl);

  document.getElementById('audioModal').classList.add('active');
}

function closeModal() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  document.getElementById('audioModal').classList.remove('active');
}

// Play Audio (Offline Cache First, then Online Network)
async function playAudio(url) {
  if (currentAudio) {
    currentAudio.pause();
  }
  const statusEl = document.getElementById('audioStatus');
  if (statusEl) statusEl.textContent = 'Audio Shuru Ho Rahi Hai... 🔊';

  try {
    let audioSrc = url;
    if ('caches' in window) {
      const cache = await caches.open(CACHE_KEY);
      const cachedResponse = await cache.match(url);
      if (cachedResponse) {
        const blob = await cachedResponse.blob();
        audioSrc = URL.createObjectURL(blob);
      }
    }

    currentAudio = new Audio(audioSrc);
    currentAudio.play().then(() => {
      if (statusEl) statusEl.textContent = 'Audio Chal Rahi Hai (Offline/Online)...';
    }).catch(() => {
      if (statusEl) statusEl.textContent = 'Audio Playback Completed';
    });

    currentAudio.onended = () => {
      if (statusEl) statusEl.textContent = 'Audio Khatam Ho Gayi.';
    };
  } catch (err) {
    currentAudio = new Audio(url);
    currentAudio.play();
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// =========================================================
//  MORE MENU TOGGLE (for bottom navigation)
// =========================================================
(function() {
  const moreNavBtn = document.getElementById('moreNavBtn');
  const moreMenu = document.getElementById('moreMenu');
  const settingsBtn = document.getElementById('settingsBtn');

  if (moreNavBtn && moreMenu) {
    moreNavBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      moreMenu.classList.toggle('show');
    });
    document.addEventListener('click', function() {
      moreMenu.classList.remove('show');
    });
    moreMenu.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  if (settingsBtn) {
    settingsBtn.addEventListener('click', function() {
      moreMenu.classList.remove('show');
      alert('Settings will be available in the next update.');
    });
  }
})();