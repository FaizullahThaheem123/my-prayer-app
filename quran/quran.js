/**
 * ============================================================================
 * القرآن الكريم — HOLY QURAN COMPLETE ENGINE (PER-AYAH OFFLINE)
 * ============================================================================
 */

(function () {
  "use strict";

  // --- 1. CORE DATA: 114 SURAHS LIST ---
  const SURAHS_LIST = [
    { number: 1, englishName: "Al-Fatihah", name: "الفَاتِحَة", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "meccan", urduName: "فاتحہ", startJuz: 1, rukuCount: 1 },
    { number: 2, englishName: "Al-Baqarah", name: "البَقَرَة", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "medinan", urduName: "البقرہ", startJuz: 1, rukuCount: 40 },
    { number: 3, englishName: "Aal-E-Imran", name: "آلِ عِمْرَان", englishNameTranslation: "The Family of Imran", numberOfAyahs: 200, revelationType: "medinan", urduName: "آل عمران", startJuz: 3, rukuCount: 20 },
    { number: 4, englishName: "An-Nisa", name: "النِّسَاء", englishNameTranslation: "The Women", numberOfAyahs: 176, revelationType: "medinan", urduName: "النساء", startJuz: 4, rukuCount: 24 },
    { number: 5, englishName: "Al-Ma'idah", name: "المَائِدَة", englishNameTranslation: "The Table Spread", numberOfAyahs: 120, revelationType: "medinan", urduName: "المائدہ", startJuz: 6, rukuCount: 16 },
    { number: 6, englishName: "Al-An'am", name: "الأَنْعَام", englishNameTranslation: "The Cattle", numberOfAyahs: 165, revelationType: "meccan", urduName: "الانعام", startJuz: 7, rukuCount: 20 },
    { number: 7, englishName: "Al-A'raf", name: "الأَعْرَاف", englishNameTranslation: "The Heights", numberOfAyahs: 206, revelationType: "meccan", urduName: "الاعراف", startJuz: 8, rukuCount: 24 },
    { number: 8, englishName: "Al-Anfal", name: "الأَنْفَال", englishNameTranslation: "The Spoils of War", numberOfAyahs: 75, revelationType: "medinan", urduName: "الانفال", startJuz: 9, rukuCount: 10 },
    { number: 9, englishName: "At-Tawbah", name: "التَّوْبَة", englishNameTranslation: "The Repentance", numberOfAyahs: 129, revelationType: "medinan", urduName: "التوبہ", startJuz: 10, rukuCount: 16 },
    { number: 10, englishName: "Yunus", name: "يُونُس", englishNameTranslation: "Jonah", numberOfAyahs: 109, revelationType: "meccan", urduName: "یونس", startJuz: 11, rukuCount: 11 },
    { number: 11, englishName: "Hud", name: "هُود", englishNameTranslation: "Hud", numberOfAyahs: 123, revelationType: "meccan", urduName: "ہود", startJuz: 11, rukuCount: 10 },
    { number: 12, englishName: "Yusuf", name: "يُوسُف", englishNameTranslation: "Joseph", numberOfAyahs: 111, revelationType: "meccan", urduName: "یوسف", startJuz: 12, rukuCount: 12 },
    { number: 13, englishName: "Ar-Ra'd", name: "الرَّعْد", englishNameTranslation: "The Thunder", numberOfAyahs: 43, revelationType: "medinan", urduName: "الرعد", startJuz: 13, rukuCount: 6 },
    { number: 14, englishName: "Ibrahim", name: "إِبْرَاهِيم", englishNameTranslation: "Abraham", numberOfAyahs: 52, revelationType: "meccan", urduName: "ابراہیم", startJuz: 13, rukuCount: 7 },
    { number: 15, englishName: "Al-Hijr", name: "الحِجْر", englishNameTranslation: "The Rocky Tract", numberOfAyahs: 99, revelationType: "meccan", urduName: "الحجر", startJuz: 14, rukuCount: 6 },
    { number: 16, englishName: "An-Nahl", name: "النَّحْل", englishNameTranslation: "The Bee", numberOfAyahs: 128, revelationType: "meccan", urduName: "النحل", startJuz: 14, rukuCount: 16 },
    { number: 17, englishName: "Al-Isra", name: "الإِسْرَاء", englishNameTranslation: "The Night Journey", numberOfAyahs: 111, revelationType: "meccan", urduName: "الاسراء", startJuz: 15, rukuCount: 12 },
    { number: 18, englishName: "Al-Kahf", name: "الكَهْف", englishNameTranslation: "The Cave", numberOfAyahs: 110, revelationType: "meccan", urduName: "الکہف", startJuz: 15, rukuCount: 12 },
    { number: 19, englishName: "Maryam", name: "مَرْيَم", englishNameTranslation: "Mary", numberOfAyahs: 98, revelationType: "meccan", urduName: "مریم", startJuz: 16, rukuCount: 6 },
    { number: 20, englishName: "Ta-Ha", name: "طه", englishNameTranslation: "Ta-Ha", numberOfAyahs: 135, revelationType: "meccan", urduName: "طٰہٰ", startJuz: 16, rukuCount: 8 },
    { number: 21, englishName: "Al-Anbiya", name: "الأَنْبِيَاء", englishNameTranslation: "The Prophets", numberOfAyahs: 112, revelationType: "meccan", urduName: "الانبیاء", startJuz: 17, rukuCount: 7 },
    { number: 22, englishName: "Al-Hajj", name: "الحَجّ", englishNameTranslation: "The Pilgrimage", numberOfAyahs: 78, revelationType: "medinan", urduName: "الحج", startJuz: 17, rukuCount: 10 },
    { number: 23, englishName: "Al-Mu'minun", name: "المُؤْمِنُون", englishNameTranslation: "The Believers", numberOfAyahs: 118, revelationType: "meccan", urduName: "المؤمنون", startJuz: 18, rukuCount: 6 },
    { number: 24, englishName: "An-Nur", name: "النُّور", englishNameTranslation: "The Light", numberOfAyahs: 64, revelationType: "medinan", urduName: "النور", startJuz: 18, rukuCount: 9 },
    { number: 25, englishName: "Al-Furqan", name: "الفُرْقَان", englishNameTranslation: "The Criterion", numberOfAyahs: 77, revelationType: "meccan", urduName: "الفرقان", startJuz: 18, rukuCount: 6 },
    { number: 26, englishName: "Ash-Shu'ara", name: "الشُّعَرَاء", englishNameTranslation: "The Poets", numberOfAyahs: 227, revelationType: "meccan", urduName: "الشعراء", startJuz: 19, rukuCount: 11 },
    { number: 27, englishName: "An-Naml", name: "النَّمْل", englishNameTranslation: "The Ant", numberOfAyahs: 93, revelationType: "meccan", urduName: "النمل", startJuz: 19, rukuCount: 7 },
    { number: 28, englishName: "Al-Qasas", name: "القَصَص", englishNameTranslation: "The Stories", numberOfAyahs: 88, revelationType: "meccan", urduName: "القصص", startJuz: 20, rukuCount: 9 },
    { number: 29, englishName: "Al-Ankabut", name: "العَنْكَبُوت", englishNameTranslation: "The Spider", numberOfAyahs: 69, revelationType: "meccan", urduName: "العنکبوت", startJuz: 20, rukuCount: 7 },
    { number: 30, englishName: "Ar-Rum", name: "الرُّوم", englishNameTranslation: "The Romans", numberOfAyahs: 60, revelationType: "meccan", urduName: "الروم", startJuz: 21, rukuCount: 6 },
    { number: 31, englishName: "Luqman", name: "لُقْمَان", englishNameTranslation: "Luqman", numberOfAyahs: 34, revelationType: "meccan", urduName: "لقمان", startJuz: 21, rukuCount: 4 },
    { number: 32, englishName: "As-Sajdah", name: "السَّجْدَة", englishNameTranslation: "The Prostration", numberOfAyahs: 30, revelationType: "meccan", urduName: "السجدہ", startJuz: 21, rukuCount: 3 },
    { number: 33, englishName: "Al-Ahzab", name: "الأَحْزَاب", englishNameTranslation: "The Combined Forces", numberOfAyahs: 73, revelationType: "medinan", urduName: "الاحزاب", startJuz: 21, rukuCount: 9 },
    { number: 34, englishName: "Saba", name: "سَبَأ", englishNameTranslation: "Sheba", numberOfAyahs: 54, revelationType: "meccan", urduName: "سبا", startJuz: 22, rukuCount: 6 },
    { number: 35, englishName: "Fatir", name: "فَاطِر", englishNameTranslation: "Originator", numberOfAyahs: 45, revelationType: "meccan", urduName: "فاطر", startJuz: 22, rukuCount: 5 },
    { number: 36, englishName: "Ya-Sin", name: "يس", englishNameTranslation: "Ya-Sin", numberOfAyahs: 83, revelationType: "meccan", urduName: "یٰسٓ", startJuz: 22, rukuCount: 5 },
    { number: 37, englishName: "As-Saffat", name: "الصَّافَّات", englishNameTranslation: "Those Set in Ranks", numberOfAyahs: 182, revelationType: "meccan", urduName: "الصافات", startJuz: 23, rukuCount: 5 },
    { number: 38, englishName: "Sad", name: "ص", englishNameTranslation: "Sad", numberOfAyahs: 88, revelationType: "meccan", urduName: "صٓ", startJuz: 23, rukuCount: 5 },
    { number: 39, englishName: "Az-Zumar", name: "الزُّمَر", englishNameTranslation: "The Groups", numberOfAyahs: 75, revelationType: "meccan", urduName: "الزمر", startJuz: 23, rukuCount: 8 },
    { number: 40, englishName: "Ghafir", name: "غَافِر", englishNameTranslation: "The Forgiver", numberOfAyahs: 85, revelationType: "meccan", urduName: "المؤمن", startJuz: 24, rukuCount: 9 },
    { number: 41, englishName: "Fussilat", name: "فُصِّلَت", englishNameTranslation: "Explained in Detail", numberOfAyahs: 54, revelationType: "meccan", urduName: "فصلت", startJuz: 24, rukuCount: 6 },
    { number: 42, englishName: "Ash-Shura", name: "الشُّورَى", englishNameTranslation: "The Consultation", numberOfAyahs: 53, revelationType: "meccan", urduName: "الشوریٰ", startJuz: 25, rukuCount: 5 },
    { number: 43, englishName: "Az-Zukhruf", name: "الزُّخْرُف", englishNameTranslation: "The Gold Adornments", numberOfAyahs: 89, revelationType: "meccan", urduName: "الزخرف", startJuz: 25, rukuCount: 7 },
    { number: 44, englishName: "Ad-Dukhan", name: "الدُّخَان", englishNameTranslation: "The Smoke", numberOfAyahs: 59, revelationType: "meccan", urduName: "الدخان", startJuz: 25, rukuCount: 3 },
    { number: 45, englishName: "Al-Jathiyah", name: "الجَاثِيَة", englishNameTranslation: "The Crouching", numberOfAyahs: 37, revelationType: "meccan", urduName: "الجاثیہ", startJuz: 25, rukuCount: 4 },
    { number: 46, englishName: "Al-Ahqaf", name: "الأَحْقَاف", englishNameTranslation: "The Wind-Curved Sandhills", numberOfAyahs: 35, revelationType: "meccan", urduName: "الاحقاف", startJuz: 26, rukuCount: 4 },
    { number: 47, englishName: "Muhammad", name: "مُحَمَّد", englishNameTranslation: "Muhammad", numberOfAyahs: 38, revelationType: "medinan", urduName: "محمد", startJuz: 26, rukuCount: 4 },
    { number: 48, englishName: "Al-Fath", name: "الفَتْح", englishNameTranslation: "The Victory", numberOfAyahs: 29, revelationType: "medinan", urduName: "الفتح", startJuz: 26, rukuCount: 4 },
    { number: 49, englishName: "Al-Hujurat", name: "الحُجُرَات", englishNameTranslation: "The Rooms", numberOfAyahs: 18, revelationType: "medinan", urduName: "الحجرات", startJuz: 26, rukuCount: 2 },
    { number: 50, englishName: "Qaf", name: "ق", englishNameTranslation: "Qaf", numberOfAyahs: 45, revelationType: "meccan", urduName: "قٓ", startJuz: 26, rukuCount: 3 },
    { number: 51, englishName: "Adh-Dhariyat", name: "الذَّارِيَات", englishNameTranslation: "The Winnowing Winds", numberOfAyahs: 60, revelationType: "meccan", urduName: "الذاریات", startJuz: 26, rukuCount: 3 },
    { number: 52, englishName: "At-Tur", name: "الطُّور", englishNameTranslation: "The Mount", numberOfAyahs: 49, revelationType: "meccan", urduName: "الطور", startJuz: 27, rukuCount: 2 },
    { number: 53, englishName: "An-Najm", name: "النَّجْم", englishNameTranslation: "The Star", numberOfAyahs: 62, revelationType: "meccan", urduName: "النجم", startJuz: 27, rukuCount: 3 },
    { number: 54, englishName: "Al-Qamar", name: "القَمَر", englishNameTranslation: "The Moon", numberOfAyahs: 55, revelationType: "meccan", urduName: "القمر", startJuz: 27, rukuCount: 3 },
    { number: 55, englishName: "Ar-Rahman", name: "الرَّحْمَن", englishNameTranslation: "The Beneficent", numberOfAyahs: 78, revelationType: "medinan", urduName: "الرحمٰن", startJuz: 27, rukuCount: 3 },
    { number: 56, englishName: "Al-Waqi'ah", name: "الوَاِقَعَة", englishNameTranslation: "The Inevitable", numberOfAyahs: 96, revelationType: "meccan", urduName: "الواقعہ", startJuz: 27, rukuCount: 3 },
    { number: 57, englishName: "Al-Hadid", name: "الحَدِيد", englishNameTranslation: "The Iron", numberOfAyahs: 29, revelationType: "medinan", urduName: "الحدید", startJuz: 27, rukuCount: 4 },
    { number: 58, englishName: "Al-Mujadila", name: "المُجَادِلَة", englishNameTranslation: "The Pleading Woman", numberOfAyahs: 22, revelationType: "medinan", urduName: "المجادلہ", startJuz: 28, rukuCount: 3 },
    { number: 59, englishName: "Al-Hashr", name: "الحَشْر", englishNameTranslation: "The Exile", numberOfAyahs: 24, revelationType: "medinan", urduName: "الحشر", startJuz: 28, rukuCount: 3 },
    { number: 60, englishName: "Al-Mumtahanah", name: "المُمْتَحَنَة", englishNameTranslation: "The Examined One", numberOfAyahs: 13, revelationType: "medinan", urduName: "الممتحنہ", startJuz: 28, rukuCount: 2 },
    { number: 61, englishName: "As-Saff", name: "الصَّفّ", englishNameTranslation: "The Ranks", numberOfAyahs: 14, revelationType: "medinan", urduName: "الصف", startJuz: 28, rukuCount: 2 },
    { number: 62, englishName: "Al-Jumu'ah", name: "الجُمُعَة", englishNameTranslation: "Friday", numberOfAyahs: 11, revelationType: "medinan", urduName: "الجمعہ", startJuz: 28, rukuCount: 2 },
    { number: 63, englishName: "Al-Munafiqun", name: "المُنَافِقُون", englishNameTranslation: "The Hypocrites", numberOfAyahs: 11, revelationType: "medinan", urduName: "المنافقون", startJuz: 28, rukuCount: 2 },
    { number: 64, englishName: "At-Taghabun", name: "التَّغَابُن", englishNameTranslation: "Mutual Loss & Gain", numberOfAyahs: 18, revelationType: "medinan", urduName: "التغابن", startJuz: 28, rukuCount: 2 },
    { number: 65, englishName: "At-Talaq", name: "الطَّلَاق", englishNameTranslation: "Divorce", numberOfAyahs: 12, revelationType: "medinan", urduName: "الطلاق", startJuz: 28, rukuCount: 2 },
    { number: 66, englishName: "At-Tahrim", name: "التَّحْرِيم", englishNameTranslation: "The Prohibition", numberOfAyahs: 12, revelationType: "medinan", urduName: "التحریم", startJuz: 28, rukuCount: 2 },
    { number: 67, englishName: "Al-Mulk", name: "المُلْك", englishNameTranslation: "The Sovereignty", numberOfAyahs: 30, revelationType: "meccan", urduName: "الملک", startJuz: 29, rukuCount: 2 },
    { number: 68, englishName: "Al-Qalam", name: "القَلَم", englishNameTranslation: "The Pen", numberOfAyahs: 52, revelationType: "meccan", urduName: "القلم", startJuz: 29, rukuCount: 2 },
    { number: 69, englishName: "Al-Haqqah", name: "الحَاقَّة", englishNameTranslation: "The Inevitable Reality", numberOfAyahs: 52, revelationType: "meccan", urduName: "الحاقہ", startJuz: 29, rukuCount: 2 },
    { number: 70, englishName: "Al-Ma'arij", name: "المَعَارِج", englishNameTranslation: "The Ascending Stairways", numberOfAyahs: 44, revelationType: "meccan", urduName: "المعارج", startJuz: 29, rukuCount: 2 },
    { number: 71, englishName: "Nuh", name: "نُوح", englishNameTranslation: "Noah", numberOfAyahs: 28, revelationType: "meccan", urduName: "نوح", startJuz: 29, rukuCount: 2 },
    { number: 72, englishName: "Al-Jinn", name: "الجِنّ", englishNameTranslation: "The Jinn", numberOfAyahs: 28, revelationType: "meccan", urduName: "الجن", startJuz: 29, rukuCount: 2 },
    { number: 73, englishName: "Al-Muzzammil", name: "المُزَّمِّل", englishNameTranslation: "The Enshrouded One", numberOfAyahs: 20, revelationType: "meccan", urduName: "المزمل", startJuz: 29, rukuCount: 2 },
    { number: 74, englishName: "Al-Muddaththir", name: "المُدَّثِّر", englishNameTranslation: "The Cloaked One", numberOfAyahs: 56, revelationType: "meccan", urduName: "المدثر", startJuz: 29, rukuCount: 2 },
    { number: 75, englishName: "Al-Qiyamah", name: "القِيَامَة", englishNameTranslation: "The Resurrection", numberOfAyahs: 40, revelationType: "meccan", urduName: "القیامہ", startJuz: 29, rukuCount: 2 },
    { number: 76, englishName: "Al-Insan", name: "الإِنْسَان", englishNameTranslation: "Man", numberOfAyahs: 31, revelationType: "medinan", urduName: "الدھر / الانسان", startJuz: 29, rukuCount: 2 },
    { number: 77, englishName: "Al-Mursalat", name: "المُرْسَلَات", englishNameTranslation: "The Emissaries", numberOfAyahs: 50, revelationType: "meccan", urduName: "المرسلات", startJuz: 29, rukuCount: 2 },
    { number: 78, englishName: "An-Naba", name: "النَّبَأ", englishNameTranslation: "The Great News", numberOfAyahs: 40, revelationType: "meccan", urduName: "النباء", startJuz: 30, rukuCount: 2 },
    { number: 79, englishName: "An-Nazi'at", name: "النَّازِعَات", englishNameTranslation: "Those Who Drag Forth", numberOfAyahs: 46, revelationType: "meccan", urduName: "النازعات", startJuz: 30, rukuCount: 2 },
    { number: 80, englishName: "Abasa", name: "عَبَسَ", englishNameTranslation: "He Frowned", numberOfAyahs: 42, revelationType: "meccan", urduName: "عبس", startJuz: 30, rukuCount: 1 },
    { number: 81, englishName: "At-Takwir", name: "التَّكْوِير", englishNameTranslation: "The Overthrowing", numberOfAyahs: 29, revelationType: "meccan", urduName: "التکویر", startJuz: 30, rukuCount: 1 },
    { number: 82, englishName: "Al-Infitar", name: "الانْفِطَار", englishNameTranslation: "The Cleaving", numberOfAyahs: 19, revelationType: "meccan", urduName: "الانفطار", startJuz: 30, rukuCount: 1 },
    { number: 83, englishName: "Al-Mutaffifin", name: "المُطَفِّفِين", englishNameTranslation: "Defrauding", numberOfAyahs: 36, revelationType: "meccan", urduName: "المطففین", startJuz: 30, rukuCount: 1 },
    { number: 84, englishName: "Al-Inshiqaq", name: "الانْشِقَاق", englishNameTranslation: "The Splitting Open", numberOfAyahs: 25, revelationType: "meccan", urduName: "الانشقاق", startJuz: 30, rukuCount: 1 },
    { number: 85, englishName: "Al-Buruj", name: "البروج", englishNameTranslation: "The Constellations", numberOfAyahs: 22, revelationType: "meccan", urduName: "البروج", startJuz: 30, rukuCount: 1 },
    { number: 86, englishName: "At-Tariq", name: "الطَّارِق", englishNameTranslation: "The Morning Star", numberOfAyahs: 17, revelationType: "meccan", urduName: "الطارق", startJuz: 30, rukuCount: 1 },
    { number: 87, englishName: "Al-A'la", name: "الأَعْلَى", englishNameTranslation: "The Most High", numberOfAyahs: 19, revelationType: "meccan", urduName: "الاعلیٰ", startJuz: 30, rukuCount: 1 },
    { number: 88, englishName: "Al-Ghashiyah", name: "الغَاشِيَة", englishNameTranslation: "The Overwhelming Event", numberOfAyahs: 26, revelationType: "meccan", urduName: "الغاشیہ", startJuz: 30, rukuCount: 1 },
    { number: 89, englishName: "Al-Fajr", name: "الفَجْر", englishNameTranslation: "The Dawn", numberOfAyahs: 30, revelationType: "meccan", urduName: "الفجر", startJuz: 30, rukuCount: 1 },
    { number: 90, englishName: "Al-Balad", name: "البَلَد", englishNameTranslation: "The City", numberOfAyahs: 20, revelationType: "meccan", urduName: "البلد", startJuz: 30, rukuCount: 1 },
    { number: 91, englishName: "Ash-Shams", name: "الشَّمْس", englishNameTranslation: "The Sun", numberOfAyahs: 15, revelationType: "meccan", urduName: "الشمس", startJuz: 30, rukuCount: 1 },
    { number: 92, englishName: "Al-Layl", name: "اللَّيْل", englishNameTranslation: "The Night", numberOfAyahs: 21, revelationType: "meccan", urduName: "اللیل", startJuz: 30, rukuCount: 1 },
    { number: 93, englishName: "Ad-Duha", name: "الضُّحَى", englishNameTranslation: "The Morning Hours", numberOfAyahs: 11, revelationType: "meccan", urduName: "الضحیٰ", startJuz: 30, rukuCount: 1 },
    { number: 94, englishName: "Ash-Sharh", name: "الشَّرْح", englishNameTranslation: "The Relief", numberOfAyahs: 8, revelationType: "meccan", urduName: "الانشراح", startJuz: 30, rukuCount: 1 },
    { number: 95, englishName: "At-Tin", name: "التِّين", englishNameTranslation: "The Fig", numberOfAyahs: 8, revelationType: "meccan", urduName: "التین", startJuz: 30, rukuCount: 1 },
    { number: 96, englishName: "Al-Alaq", name: "العَلَق", englishNameTranslation: "The Clot", numberOfAyahs: 19, revelationType: "meccan", urduName: "العلق", startJuz: 30, rukuCount: 1 },
    { number: 97, englishName: "Al-Qadr", name: "القَدْر", englishNameTranslation: "The Power", numberOfAyahs: 5, revelationType: "meccan", urduName: "القدر", startJuz: 30, rukuCount: 1 },
    { number: 98, englishName: "Al-Bayyinah", name: "البَيِّنَة", englishNameTranslation: "The Clear Proof", numberOfAyahs: 8, revelationType: "medinan", urduName: "البینہ", startJuz: 30, rukuCount: 1 },
    { number: 99, englishName: "Az-Zalzalah", name: "الزَّلْزَلَة", englishNameTranslation: "The Earthquake", numberOfAyahs: 8, revelationType: "medinan", urduName: "الزلزلہ", startJuz: 30, rukuCount: 1 },
    { number: 100, englishName: "Al-Adiyat", name: "العَادِيَات", englishNameTranslation: "The Courser", numberOfAyahs: 11, revelationType: "meccan", urduName: "العادیات", startJuz: 30, rukuCount: 1 },
    { number: 101, englishName: "Al-Qari'ah", name: "القَارِعَة", englishNameTranslation: "The Calamity", numberOfAyahs: 11, revelationType: "meccan", urduName: "القارعة", startJuz: 30, rukuCount: 1 },
    { number: 102, englishName: "At-Takathur", name: "التَّكَاثُر", englishNameTranslation: "The Rivalry in World Increase", numberOfAyahs: 8, revelationType: "meccan", urduName: "التکاثر", startJuz: 30, rukuCount: 1 },
    { number: 103, englishName: "Al-Asr", name: "العَصْر", englishNameTranslation: "The Declining Day", numberOfAyahs: 3, revelationType: "meccan", urduName: "العصر", startJuz: 30, rukuCount: 1 },
    { number: 104, englishName: "Al-Humazah", name: "الهُمَزَة", englishNameTranslation: "The Traducer", numberOfAyahs: 9, revelationType: "meccan", urduName: "الہمزہ", startJuz: 30, rukuCount: 1 },
    { number: 105, englishName: "Al-Fil", name: "الفِيل", englishNameTranslation: "The Elephant", numberOfAyahs: 5, revelationType: "meccan", urduName: "الفیل", startJuz: 30, rukuCount: 1 },
    { number: 106, englishName: "Quraysh", name: "قُرَيْش", englishNameTranslation: "Quraysh", numberOfAyahs: 4, revelationType: "meccan", urduName: "قریش", startJuz: 30, rukuCount: 1 },
    { number: 107, englishName: "Al-Ma'un", name: "المَاعُون", englishNameTranslation: "The Small Kindness", numberOfAyahs: 7, revelationType: "meccan", urduName: "الماعون", startJuz: 30, rukuCount: 1 },
    { number: 108, englishName: "Al-Kawthar", name: "الكَوْثَر", englishNameTranslation: "The Abundance", numberOfAyahs: 3, revelationType: "meccan", urduName: "الکوثر", startJuz: 30, rukuCount: 1 },
    { number: 109, englishName: "Al-Kafirun", name: "الكَافِرُون", englishNameTranslation: "The Disbelievers", numberOfAyahs: 6, revelationType: "meccan", urduName: "الکافرون", startJuz: 30, rukuCount: 1 },
    { number: 110, englishName: "An-Nasr", name: "النَّصْر", englishNameTranslation: "The Help", numberOfAyahs: 3, revelationType: "medinan", urduName: "النصر", startJuz: 30, rukuCount: 1 },
    { number: 111, englishName: "Al-Masad", name: "المَسَد", englishNameTranslation: "The Palm Fiber", numberOfAyahs: 5, revelationType: "meccan", urduName: "اللھب / المسد", startJuz: 30, rukuCount: 1 },
    { number: 112, englishName: "Al-Ikhlas", name: "الإِخْلَاص", englishNameTranslation: "The Sincerity", numberOfAyahs: 4, revelationType: "meccan", urduName: "الاخلاص", startJuz: 30, rukuCount: 1 },
    { number: 113, englishName: "Al-Falaq", name: "الفَلَق", englishNameTranslation: "The Daybreak", numberOfAyahs: 5, revelationType: "meccan", urduName: "الفلق", startJuz: 30, rukuCount: 1 },
    { number: 114, englishName: "An-Nas", name: "النَّاس", englishNameTranslation: "Mankind", numberOfAyahs: 6, revelationType: "meccan", urduName: "الناس", startJuz: 30, rukuCount: 1 }
  ];

  const PARAS_LIST = [
    { number: 1, name: "الم", englishName: "Alif Lam Meem", urduName: "الم", startSurahNumber: 1, startSurahName: "Al-Fatihah", startAyah: 1 },
    { number: 2, name: "سَيَقُولُ", englishName: "Sayaqool", urduName: "سیقول", startSurahNumber: 2, startSurahName: "Al-Baqarah", startAyah: 142 },
    { number: 3, name: "تِلْكَ الرُّسُلُ", englishName: "Tilkal Rusul", urduName: "تلک الرسل", startSurahNumber: 2, startSurahName: "Al-Baqarah", startAyah: 253 },
    { number: 4, name: "لَنْ تَنَالُوا", englishName: "Lan Tana Loo", urduName: "لن تنالوا", startSurahNumber: 3, startSurahName: "Aal-E-Imran", startAyah: 92 },
    { number: 5, name: "وَالْمُحْصَنَاتُ", englishName: "Wal Mohsanat", urduName: "والمحصنت", startSurahNumber: 4, startSurahName: "An-Nisa", startAyah: 24 },
    { number: 6, name: "لَا يُحِبُّ اللَّهُ", englishName: "La Yuhibbullah", urduName: "لا یحب اللہ", startSurahNumber: 4, startSurahName: "An-Nisa", startAyah: 148 },
    { number: 7, name: "وَإِذَا سَمِعُوا", englishName: "Wa Iza Samiu", urduName: "واذا سمعوا", startSurahNumber: 5, startSurahName: "Al-Ma'idah", startAyah: 82 },
    { number: 8, name: "وَلَوْ أَنَّنَا", englishName: "Wa Lau Annana", urduName: "ولو اننا", startSurahNumber: 6, startSurahName: "Al-An'am", startAyah: 111 },
    { number: 9, name: "قَالَ الْمَلَأُ", englishName: "Qalal Malao", urduName: "قال الملاء", startSurahNumber: 7, startSurahName: "Al-A'raf", startAyah: 88 },
    { number: 10, name: "وَاعْلَمُوا", englishName: "Wa A'lamu", urduName: "واعلموا", startSurahNumber: 8, startSurahName: "Al-Anfal", startAyah: 41 },
    { number: 11, name: "يَعْتَذِرُونَ", englishName: "Yatazeroon", urduName: "یعتذرون", startSurahNumber: 9, startSurahName: "At-Tawbah", startAyah: 93 },
    { number: 12, name: "وَمَا مِنْ دَابَّةٍ", englishName: "Wa Mamin Da'abah", urduName: "وما من دابۃ", startSurahNumber: 11, startSurahName: "Hud", startAyah: 6 },
    { number: 13, name: "وَمَا أُبَرِّئُ", englishName: "Wa Ma Ubarri'u", urduName: "وما ابریٔ", startSurahNumber: 12, startSurahName: "Yusuf", startAyah: 53 },
    { number: 14, name: "رُبَمَا", englishName: "Rubama", urduName: "ربما", startSurahNumber: 15, startSurahName: "Al-Hijr", startAyah: 1 },
    { number: 15, name: "سُبْحَانَ الَّذِي", englishName: "Subhanallazi", urduName: "سبحٰن الذی", startSurahNumber: 17, startSurahName: "Al-Isra", startAyah: 1 },
    { number: 16, name: "قَالَ أَلَمْ", englishName: "Qal Alam", urduName: "قال الم", startSurahNumber: 18, startSurahName: "Al-Kahf", startAyah: 75 },
    { number: 17, name: "اقْتَرَبَ لِلنَّاسِ", englishName: "Iqtaraba", urduName: "اقترب للناس", startSurahNumber: 21, startSurahName: "Al-Anbiya", startAyah: 1 },
    { number: 18, name: "قَدْ أَفْلَحَ", englishName: "Qadd Aflaha", urduName: "قد افلح", startSurahNumber: 23, startSurahName: "Al-Mu'minun", startAyah: 1 },
    { number: 19, name: "وَقَالَ الَّذِينَ", englishName: "Wa Qalallazina", urduName: "وقال الذین", startSurahNumber: 25, startSurahName: "Al-Furqan", startAyah: 21 },
    { number: 20, name: "أَمَّنْ خَلَقَ", englishName: "A'man Khalaqa", urduName: "امن خلق", startSurahNumber: 27, startSurahName: "An-Naml", startAyah: 56 },
    { number: 21, name: "اتْلُ مَا أُوحِيَ", englishName: "Utlu Ma Oohiya", urduName: "اتل ما اوحی", startSurahNumber: 29, startSurahName: "Al-Ankabut", startAyah: 46 },
    { number: 22, name: "وَمَنْ يَقْنُتْ", englishName: "Wa Manyaqnut", urduName: "ومن یقنت", startSurahNumber: 33, startSurahName: "Al-Ahzab", startAyah: 31 },
    { number: 23, name: "وَمَا لِيَ", englishName: "Wa Mali", urduName: "وما لی", startSurahNumber: 36, startSurahName: "Ya-Sin", startAyah: 22 },
    { number: 24, name: "فَمَنْ أَظْلَمُ", englishName: "Faman Azlamu", urduName: "فمن اظلم", startSurahNumber: 39, startSurahName: "Az-Zumar", startAyah: 32 },
    { number: 25, name: "إِلَيْهِ يُرَدُّ", englishName: "Elahe Yuraddo", urduName: "الیہ یرد", startSurahNumber: 41, startSurahName: "Fussilat", startAyah: 47 },
    { number: 26, name: "حم", englishName: "Ha'a Meem", urduName: "حم", startSurahNumber: 46, startSurahName: "Al-Ahqaf", startAyah: 1 },
    { number: 27, name: "قَالَ فَمَا خَطْبُكُمْ", englishName: "Qala Fama Khatbukum", urduName: "قال فما خطبکم", startSurahNumber: 51, startSurahName: "Adh-Dhariyat", startAyah: 31 },
    { number: 28, name: "قَدْ سَمِعَ اللَّهُ", englishName: "Qadd Sami Allah", urduName: "قد سمع اللہ", startSurahNumber: 58, startSurahName: "Al-Mujadila", startAyah: 1 },
    { number: 29, name: "تَبَارَكَ الَّذِي", englishName: "Tabarakallazi", urduName: "تبارک الذی", startSurahNumber: 67, startSurahName: "Al-Mulk", startAyah: 1 },
    { number: 30, name: "عَمَّ", englishName: "Amma Yatasa'aloon", urduName: "عم یتساءلون", startSurahNumber: 78, startSurahName: "An-Naba", startAyah: 1 }
  ];

  const QARIS_LIST = [
    { id: "ar.alafasy", name: "Mishary Rashid Alafasy", arabic: "مشاري راشد العفاسي" }
  ];

  const QARI_EVERYAYAH_MAP = {
    "ar.alafasy": "Alafasy_128kbps"
  };

  function getEveryayahUrl(qariId, surahNum, ayahNum) {
    const folder = QARI_EVERYAYAH_MAP[qariId] || "Alafasy_128kbps";
    const s = String(surahNum).padStart(3, "0");
    const a = String(ayahNum).padStart(3, "0");
    return `https://everyayah.com/data/${folder}/${s}${a}.mp3`;
  }

  // ==========================================
  // FILESYSTEM HELPERS (Android Storage) — Per-Ayah
  // ==========================================
  const CapFilesystem = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Filesystem;
  const isNativeApp = !!(CapFilesystem) &&
    !(window.Capacitor.isNativePlatform && !window.Capacitor.isNativePlatform());

  const QURAN_BASE_DIR = "MyPrayer/Quran";
  const MIN_AUDIO_BYTES = 5000;

  const QURAN_SAVE_DIRS = ["DATA", "EXTERNAL"];
  const QURAN_READ_DIRS = ["DATA", "EXTERNAL", "EXTERNAL_STORAGE"];
  let resolvedSaveDir = null;

  function quranAyahPath(qariId, surahNum, ayahNum) {
    const s = String(surahNum).padStart(3, "0");
    const a = String(ayahNum).padStart(3, "0");
    return QURAN_BASE_DIR + "/" + qariId + "/" + s + "/" + a + ".mp3";
  }

  function fmtSize(bytes) {
    if (!bytes || bytes <= 0) return "0 MB";
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + " GB";
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + " MB";
    return Math.max(1, Math.round(bytes / 1024)) + " KB";
  }

  function blobToBase64(blob) {
    return new Promise(function(resolve, reject) {
      const reader = new FileReader();
      reader.onloadend = function() {
        try {
          const result = reader.result;
          resolve(result.substring(result.indexOf(",") + 1));
        } catch (e) { reject(e); }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function base64ToBlob(base64, mimeType) {
    const byteChars = atob(base64);
    const bytes = new Uint8Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      bytes[i] = byteChars.charCodeAt(i);
    }
    return new Blob([bytes], { type: mimeType || "audio/mpeg" });
  }

  async function getSaveDir() {
    if (resolvedSaveDir) return resolvedSaveDir;
    for (let i = 0; i < QURAN_SAVE_DIRS.length; i++) {
      try {
        await CapFilesystem.writeFile({
          path: QURAN_BASE_DIR + "/.probe",
          data: "ok",
          directory: QURAN_SAVE_DIRS[i],
          encoding: "utf8",
          recursive: true
        });
        resolvedSaveDir = QURAN_SAVE_DIRS[i];
        console.log("💾 Quran save directory:", resolvedSaveDir);
        return resolvedSaveDir;
      } catch (e) {
        console.warn("Save dir not usable:", QURAN_SAVE_DIRS[i], e);
      }
    }
    return null;
  }

  async function statAyah(qariId, surahNum, ayahNum) {
    if (!isNativeApp) return null;
    const path = quranAyahPath(qariId, surahNum, ayahNum);
    for (let i = 0; i < QURAN_READ_DIRS.length; i++) {
      try {
        const st = await CapFilesystem.stat({ path: path, directory: QURAN_READ_DIRS[i] });
        const size = Number(st && st.size) || 0;
        if (size >= MIN_AUDIO_BYTES) return { directory: QURAN_READ_DIRS[i], path: path, size: size };
      } catch (e) {}
    }
    return null;
  }

  async function writeAyahToStorage(qariId, surahNum, ayahNum, blob) {
    if (!isNativeApp) return 0;
    const dir = await getSaveDir();
    if (!dir) return 0;
    const path = quranAyahPath(qariId, surahNum, ayahNum);
    try {
      try { await CapFilesystem.deleteFile({ path: path, directory: dir }); } catch (e) {}
      const b64 = await blobToBase64(blob);
      await CapFilesystem.writeFile({ path: path, data: b64, directory: dir, recursive: true });
      const stat = await CapFilesystem.stat({ path: path, directory: dir });
      const size = Number(stat && stat.size) || 0;
      if (size >= MIN_AUDIO_BYTES) return size;
      try { await CapFilesystem.deleteFile({ path: path, directory: dir }); } catch (e) {}
      return 0;
    } catch (e) {
      console.warn("writeAyahToStorage failed:", e);
      return 0;
    }
  }

  async function readAyahFromStorage(qariId, surahNum, ayahNum) {
    if (!isNativeApp) return null;
    try {
      const found = await statAyah(qariId, surahNum, ayahNum);
      if (!found) return null;
      const res = await CapFilesystem.readFile({ path: found.path, directory: found.directory });
      return base64ToBlob(res.data, "audio/mpeg");
    } catch (e) {
      return null;
    }
  }

  async function listDownloadedFromStorage(qariId) {
    const set = new Set();
    set.totalBytes = 0;
    if (!isNativeApp) return set;

    const hints = getLocalDownloadedSet(qariId);
    for (const num of hints) {
      const surahInfo = SURAHS_LIST.find(s => s.number === num);
      if (!surahInfo) continue;
      let allPresent = true;
      let totalSize = 0;
      for (let a = 1; a <= surahInfo.numberOfAyahs; a++) {
        const st = await statAyah(qariId, num, a);
        if (!st) { allPresent = false; break; }
        totalSize += st.size;
      }
      if (allPresent) {
        set.add(num);
        set.totalBytes += totalSize;
      }
    }
    return set;
  }

  async function getOfflineAyahUrl(qariId, surahNum, ayahNum) {
    if (isNativeApp) {
      try {
        const found = await statAyah(qariId, surahNum, ayahNum);
        if (found && window.Capacitor && window.Capacitor.convertFileSrc) {
          const u = await CapFilesystem.getUri({ path: found.path, directory: found.directory });
          if (u && u.uri) return { url: window.Capacitor.convertFileSrc(u.uri), isBlob: false };
        }
      } catch (e) {}
    }
    const blob = await getCachedAyahAudio(qariId, surahNum, ayahNum);
    if (blob && blob.size > MIN_AUDIO_BYTES) {
      return { url: URL.createObjectURL(blob), isBlob: true };
    }
    return null;
  }

  // ==========================================
  // STATE
  // ==========================================
  const state = {
    currentView: "home",
    history: ["home"],
    selectedSurah: 1,
    selectedJuz: null,
    ayahsData: [],
    loadingAyahs: false,
    fontSize: 28,
    showUrdu: true,
    showEnglish: true,
    selectedQari: "ar.alafasy",
    downloadQari: "ar.alafasy",
    theme: "light",
    bookmarks: [],
    lastRead: { surah: 1, ayah: 1, name: "Al-Fatihah", arName: "الفَاتِحَة" },
    isPlaying: false,
    audioInstance: new Audio(),
    currentPlayingAyahIndex: 0,
    playbackSpeed: 1.0,
    isDownloadingText: false,
    isDownloadingAudio: false,
    audioCache: {},
    currentObjectURL: null
  };

  let persistentStorageRequested = false;
  let persistentStorageGranted = null;

  async function requestPersistentStorage() {
    if (persistentStorageRequested) return persistentStorageGranted;
    persistentStorageRequested = true;
    try {
      if (navigator.storage && navigator.storage.persist) {
        const granted = await navigator.storage.persist();
        console.log("💾 Persistent storage:", granted ? "GRANTED" : "DENIED");
        persistentStorageGranted = granted;
      }
    } catch (e) {
      console.warn("Persistent storage request failed:", e);
    }
    return persistentStorageGranted;
  }

  // ==========================================
  // AUDIO COMPLETE FLAG — instant check
  // ==========================================
  function isAudioMarkedComplete(qariId) {
    try {
      return localStorage.getItem("quran_audio_complete_" + qariId) === "true";
    } catch (e) { return false; }
  }

  function setAudioCompleteFlag(qariId, isComplete) {
    try {
      if (isComplete) {
        localStorage.setItem("quran_audio_complete_" + qariId, "true");
      } else {
        localStorage.removeItem("quran_audio_complete_" + qariId);
      }
    } catch (e) {}
  }

  function getLocalDownloadedSet(qariId) {
    try {
      const raw = localStorage.getItem("quran_downloaded_" + qariId);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(arr);
    } catch (e) { return new Set(); }
  }

  function saveLocalDownloadedSet(qariId, set) {
    try {
      localStorage.setItem("quran_downloaded_" + qariId, JSON.stringify(Array.from(set)));
    } catch (e) { console.warn("Local save failed:", e); }
  }

  function markSurahDownloadedLocal(qariId, surahNum) {
    const set = getLocalDownloadedSet(qariId);
    set.add(surahNum);
    saveLocalDownloadedSet(qariId, set);
  }

  // ==========================================
  // INIT
  // ==========================================
  function init() {
    loadSettings();
    renderSurahsGrid(SURAHS_LIST);
    renderParasGrid(PARAS_LIST);
    renderQariOptions();
    renderBookmarks();
    updateLastReadUI();
    setupEventListeners();

    requestPersistentStorage();
    checkTextDownloadStatus();
    checkAudioDownloadStatus();

    const moreNavBtn = document.getElementById("moreNavBtn");
    const moreMenu = document.getElementById("moreMenu");
    const closeMoreMenuBtn = document.getElementById("closeMoreMenuBtn");

    if (moreNavBtn && moreMenu) {
      moreNavBtn.addEventListener("click", () => moreMenu.classList.add("show"));
    }
    if (closeMoreMenuBtn) {
      closeMoreMenuBtn.addEventListener("click", () => moreMenu.classList.remove("show"));
    }
    document.addEventListener("click", (e) => {
      if (moreMenu && moreMenu.classList.contains("show") && !moreMenu.contains(e.target) && !moreNavBtn.contains(e.target)) {
        moreMenu.classList.remove("show");
      }
    });

    document.getElementById("searchNavBtn")?.addEventListener("click", () => navigate("surahs"));
    document.getElementById("btn-download-all-text")?.addEventListener("click", downloadAllQuranText);
    document.getElementById("btn-download-all-audio")?.addEventListener("click", downloadAllQuranAudio);
  }

  function loadSettings() {
    try {
      const savedTheme = localStorage.getItem("quran_theme") || "light";
      const savedQari = localStorage.getItem("quran_qari") || "ar.alafasy";
      const savedDownloadQari = localStorage.getItem("quran_download_qari") || savedQari;
      const savedFontSize = localStorage.getItem("quran_font_size");
      const savedBookmarks = localStorage.getItem("quran_bookmarks");
      const savedLastRead = localStorage.getItem("quran_last_read");

      state.theme = savedTheme;
      state.selectedQari = savedQari;
      state.downloadQari = savedDownloadQari;

      document.body.className = "theme-" + savedTheme;
      document.querySelectorAll(".theme-btn").forEach(btn =>
        btn.classList.toggle("active", btn.getAttribute("data-theme") === savedTheme)
      );

      if (savedFontSize) {
        state.fontSize = parseInt(savedFontSize);
        const rfs = document.getElementById("range-font-size");
        if (rfs) rfs.value = state.fontSize;
        const fsl = document.getElementById("font-size-label");
        if (fsl) fsl.innerText = state.fontSize + "px";
      }
      if (savedBookmarks) state.bookmarks = JSON.parse(savedBookmarks);
      if (savedLastRead) state.lastRead = JSON.parse(savedLastRead);
    } catch (e) { console.warn("Could not load settings:", e); }
  }

  function saveSettings() {
    try {
      localStorage.setItem("quran_theme", state.theme);
      localStorage.setItem("quran_qari", state.selectedQari);
      localStorage.setItem("quran_download_qari", state.downloadQari);
      localStorage.setItem("quran_font_size", state.fontSize);
      localStorage.setItem("quran_bookmarks", JSON.stringify(state.bookmarks));
      localStorage.setItem("quran_last_read", JSON.stringify(state.lastRead));
    } catch (e) { console.warn("Could not save settings:", e); }
  }

  async function checkTextDownloadStatus() {
    try {
      const db = await openDB();
      const result = await new Promise((resolve) => {
        const tx = db.transaction("text", "readonly");
        const store = tx.objectStore("text");
        const request = store.get("quran_text");
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
      });
      db.close();

      const statusEl = document.getElementById("text-offline-status");
      if (!statusEl) return;

      if (result && result.data && result.data.length === 114) {
        statusEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Downloaded';
        statusEl.className = "status-tag status-done";
      } else {
        const partial = await getDownloadedTextSurahSet();
        if (partial.size > 0) {
          statusEl.innerHTML = '<i class="fa-solid fa-circle-half-stroke"></i> ' + partial.size + '/114 (partial)';
          statusEl.className = "status-tag status-pending";
        } else {
          statusEl.innerHTML = '<i class="fa-solid fa-circle-dot"></i> Not Downloaded';
          statusEl.className = "status-tag status-pending";
        }
      }
    } catch (e) { console.warn("Check text download error:", e); }
  }

  async function getDownloadedSurahSet(qariId) {
    if (isNativeApp) {
      try {
        const storageSet = await listDownloadedFromStorage(qariId);
        if (storageSet.size > 0) {
          console.log("📂 Storage: " + storageSet.size + " surahs");
          return storageSet;
        }
      } catch (e) {
        console.warn("Storage list failed:", e);
      }
    }

    // Browser fallback: check each hinted surah in IDB for full completeness
    const localSet = getLocalDownloadedSet(qariId);
    const result = new Set();
    if (localSet.size === 0) return result;

    try {
      const db = await openDB();
      for (const surahNum of localSet) {
        const surahInfo = SURAHS_LIST.find(s => s.number === surahNum);
        if (!surahInfo) continue;

        const allPresent = await new Promise((resolve) => {
          const tx = db.transaction("audio", "readonly");
          const store = tx.objectStore("audio");
          let remaining = surahInfo.numberOfAyahs;
          let ok = true;
          for (let a = 1; a <= surahInfo.numberOfAyahs; a++) {
            const key = qariId + "_surah_" + surahNum + "_ayah_" + a;
            const req = store.get(key);
            req.onsuccess = () => {
              if (!req.result || !req.result.data || req.result.data.size < MIN_AUDIO_BYTES) ok = false;
              if (--remaining === 0) resolve(ok);
            };
            req.onerror = () => { ok = false; if (--remaining === 0) resolve(false); };
          }
          if (remaining === 0) resolve(ok);
        });

        if (allPresent) result.add(surahNum);
      }
      db.close();
    } catch (e) { console.warn("IDB read error:", e); }
    return result;
  }

  // ✅ checkAudioDownloadStatus — FAST PATH with flag
  async function checkAudioDownloadStatus() {
    if (state.isDownloadingAudio) return;
    try {
      const qariId = state.downloadQari;
      const btn = document.getElementById("btn-download-all-audio");
      const progressBar = document.getElementById("audio-download-progress-bar");
      const fill = progressBar ? progressBar.querySelector(".progress-bar-fill") : null;
      const label = progressBar ? progressBar.querySelector(".progress-label") : null;

      // ⚡ FAST PATH: Agar flag set hai to INSTANTLY complete dikhao
      if (isAudioMarkedComplete(qariId)) {
        if (progressBar && fill && label) {
          progressBar.classList.remove("hidden");
          fill.style.width = "100%";
          label.innerHTML = '<strong style="color:#22c55e;">Downloaded • 100% complete</strong>';
        }
        if (btn) {
          btn.disabled = true;
          btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> This Qari is already complete';
        }
        // Background me verify karo (user ko nahi dikhta)
        verifyAudioInBackground(qariId);
        return;
      }

      // Slow verify
      const set = await getDownloadedSurahSet(qariId);
      if (state.isDownloadingAudio) return;
      const count = set.size;

      if (count >= 114) {
        setAudioCompleteFlag(qariId, true);
        if (progressBar && fill && label) {
          progressBar.classList.remove("hidden");
          fill.style.width = "100%";
          label.innerHTML = '<strong style="color:#22c55e;">Downloaded • 100% complete</strong>';
        }
        if (btn) {
          btn.disabled = true;
          btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> This Qari is already complete';
        }
        return;
      }

      if (count > 0 && progressBar && fill && label) {
        const pct = Math.round((count / 114) * 100);
        progressBar.classList.remove("hidden");
        fill.style.width = pct + "%";
        label.innerHTML = '<strong style="color:var(--primary);">' + pct + '%</strong> • ' + count + '/114 saved';
      } else if (progressBar) {
        progressBar.classList.add("hidden");
      }

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = (count > 0)
          ? '<i class="fa-solid fa-cloud-arrow-down"></i> Resume Download'
          : '<i class="fa-solid fa-cloud-arrow-down"></i> Download Selected Qari Audio';
      }
    } catch (e) { console.warn("Check audio download error:", e); }
  }

  // ✅ Background verify — agar flag stale hai to hata do
  async function verifyAudioInBackground(qariId) {
    try {
      const set = await getDownloadedSurahSet(qariId);
      if (set.size < 114) {
        console.warn("⚠️ Flag was stale — actual:", set.size, "/114");
        setAudioCompleteFlag(qariId, false);
      }
    } catch (e) {
      console.warn("Background verify error:", e);
    }
  }

  // ✅ AUDIO STOP FUNCTION
  function stopAudio() {
    if (state.audioInstance) {
      try {
        state.audioInstance.pause();
        state.audioInstance.currentTime = 0;
        state.audioInstance.src = "";
        state.audioInstance.removeAttribute("src");
        state.audioInstance.load();
        state.audioInstance.onended = null;
        state.audioInstance.onerror = null;
      } catch (e) {
        console.warn("stopAudio error:", e);
      }
    }

    if (state.currentObjectURL) {
      try { URL.revokeObjectURL(state.currentObjectURL); } catch (e) {}
      state.currentObjectURL = null;
    }

    state.isPlaying = false;
    state.currentPlayingAyahIndex = 0;

    updatePlayPauseIcon(false);

    const bar = document.getElementById("audio-player-bar");
    if (bar) bar.classList.add("hidden");

    highlightPlayingAyah(-1);
  }

  function navigate(viewName) {
    // ✅ FIX: Reader se nikal rahe ho to audio band karo
    if (state.currentView === "reader" && viewName !== "reader") {
      stopAudio();
    }

    state.currentView = viewName;
    state.history.push(viewName);
    document.querySelectorAll(".view-screen").forEach(el => el.classList.remove("active"));
    const target = document.getElementById("view-" + viewName);
    if (target) target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (viewName === "downloads") {
      checkTextDownloadStatus();
      checkAudioDownloadStatus();
    }
  }

  function goBack() {
    if (state.history.length > 1) {
      state.history.pop();
      const prev = state.history.pop();
      navigate(prev || "home");
    } else {
      window.history.back();
    }
  }

  window.goBack = goBack;

  function renderSurahsGrid(list) {
    const grid = document.getElementById("surahs-grid");
    if (!grid) return;
    grid.innerHTML = list.map(s => `
      <div class="surah-card" onclick="quranApp.openSurah(${s.number})">
        <div class="surah-card-left">
          <div class="surah-number-badge">${s.number}</div>
          <div class="surah-names-box">
            <strong>${s.englishName}</strong>
            <span>${s.urduName} • ${s.englishNameTranslation}</span>
          </div>
        </div>
        <div class="surah-card-right">
          <span class="surah-card-arabic font-arabic">${s.name}</span>
          <span class="surah-verses-tag">${s.numberOfAyahs} Ayahs • ${s.revelationType === 'meccan' ? 'Makki' : 'Madani'}</span>
        </div>
      </div>
    `).join("");
  }

  function renderParasGrid(list) {
    const grid = document.getElementById("Separe-grid") || document.getElementById("paras-grid");
    if (!grid) return;
    grid.innerHTML = list.map(p => `
      <div class="para-card" onclick="quranApp.openPara(${p.number})">
        <div class="surah-card-left">
          <div class="surah-number-badge">Juz ${p.number}</div>
          <div class="surah-names-box">
            <strong>${p.englishName}</strong>
            <span>${p.urduName} • Starts: ${p.startSurahName} (${p.startAyah})</span>
          </div>
        </div>
        <div class="surah-card-right">
          <span class="surah-card-arabic font-arabic">${p.name}</span>
        </div>
      </div>
    `).join("");
  }

  function renderQariOptions() {
    state.selectedQari = "ar.alafasy";
    state.downloadQari = "ar.alafasy";
  }

  async function openSurah(surahNumber) {
    state.selectedSurah = surahNumber;
    const surah = SURAHS_LIST.find(s => s.number === surahNumber);
    document.getElementById("reader-title").innerText = `${surah.number}. Surah ${surah.englishName} (${surah.name})`;
    document.getElementById("reader-meta").innerText = `${surah.urduName} • ${surah.numberOfAyahs} Ayahs • ${surah.revelationType.toUpperCase()} • Juz ${surah.startJuz}`;
    const bismillahBox = document.getElementById("reader-bismillah-box");
    bismillahBox.classList.toggle("hidden", surahNumber === 9 || surahNumber === 1);
    navigate("reader");
    await fetchAndRenderSurah(surahNumber);
    state.lastRead = { surah: surah.number, ayah: 1, name: surah.englishName, arName: surah.name };
    saveSettings();
    updateLastReadUI();
  }

  function openPara(paraNumber) {
    const para = PARAS_LIST.find(p => p.number === paraNumber);
    if (para) { openSurah(para.startSurahNumber); showToast(`Opened Juz ${para.number} (${para.name})`); }
  }

  async function fetchAndRenderSurah(surahNumber) {
    const container = document.getElementById("ayahs-list-container");
    container.innerHTML = `<div style="text-align:center; padding:40px;"><i class="fa-solid fa-spinner fa-spin" style="font-size:32px;"></i><p>Loading Surah...</p></div>`;

    try {
      const offlineData = await getOfflineSurahText(surahNumber);
      if (offlineData && offlineData.ayahs && offlineData.ayahs.length > 0) {
        console.log("📂 Loaded surah " + surahNumber + " from OFFLINE storage");
        state.ayahsData = offlineData.ayahs.map((a) => ({
          number: a.number,
          numberInSurah: a.number,
          text: a.arabic,
          urdu: a.urdu || "",
          english: a.english || ""
        }));
        renderAyahs();
        return;
      }
    } catch (e) {
      console.warn("Offline read failed:", e);
    }

    try {
      const [resArabic, resUrdu, resEnglish] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`).then(r => r.json()),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ur.jalandhry`).then(r => r.json()),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`).then(r => r.json())
      ]);

      state.ayahsData = resArabic.data.ayahs.map((ayah, i) => ({
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        text: ayah.text,
        urdu: resUrdu.data.ayahs[i] ? resUrdu.data.ayahs[i].text : "",
        english: resEnglish.data.ayahs[i] ? resEnglish.data.ayahs[i].text : ""
      }));
      renderAyahs();

      try {
        const db = await openDB();
        const surahInfo = SURAHS_LIST.find(s => s.number === surahNumber) || {};
        const surahData = {
          surah: surahNumber,
          name: surahInfo.englishName || "",
          arabicName: surahInfo.name || "",
          ayahs: state.ayahsData.map(a => ({
            number: a.numberInSurah,
            arabic: a.text,
            urdu: a.urdu,
            english: a.english
          }))
        };
        await new Promise((resolve, reject) => {
          const tx = db.transaction("text", "readwrite");
          tx.objectStore("text").put({ id: "quran_surah_" + surahNumber, data: surahData });
          tx.oncomplete = resolve;
          tx.onerror = () => reject(tx.error);
        });
        db.close();
        console.log("💾 Cached surah " + surahNumber + " for offline use");
      } catch (cacheErr) {
        console.warn("Cache save failed:", cacheErr);
      }

    } catch (err) {
      console.error("Load failed:", err);
      container.innerHTML = `<div style="text-align:center; padding:40px; color:#e11d48;">
        <p>Internet nahi hai aur ye surah offline download bhi nahi hui.</p>
        <p style="margin-top:8px; font-size:12px; color:var(--text-muted);">Pehle Offline Hub se "Download All Quran Text" karein.</p>
        <button class="btn-primary" onclick="quranApp.openSurah(${surahNumber})" style="margin-top:12px;">Retry</button>
      </div>`;
    }
  }

  async function getOfflineSurahText(surahNumber) {
    try {
      const db = await openDB();
      const item = await new Promise((resolve) => {
        const tx = db.transaction("text", "readonly");
        const req = tx.objectStore("text").get("quran_surah_" + surahNumber);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      });
      db.close();
      if (item && item.data && item.data.ayahs && item.data.ayahs.length > 0) {
        return item.data;
      }
      return null;
    } catch (e) {
      console.warn("getOfflineSurahText error:", e);
      return null;
    }
  }

  function renderAyahs() {
    const container = document.getElementById("ayahs-list-container");
    if (!container) return;
    container.innerHTML = state.ayahsData.map((ayah, idx) => `
      <div id="ayah-item-${idx}" class="ayah-card ${state.isPlaying && state.currentPlayingAyahIndex === idx ? 'playing' : ''}">
        <div class="ayah-card-top">
          <span class="ayah-badge">Ayah ${ayah.numberInSurah}</span>
          <div class="ayah-actions">
            <button class="btn-ayah-action" onclick="quranApp.playAyahAudio(${idx})" title="Play Ayah"><i class="fa-solid fa-play"></i></button>
            <button class="btn-ayah-action" onclick="quranApp.toggleBookmark(${state.selectedSurah}, ${ayah.numberInSurah})" title="Bookmark">
              <i class="${isBookmarked(state.selectedSurah, ayah.numberInSurah) ? 'fa-solid fa-bookmark text-amber' : 'fa-regular fa-bookmark'}"></i>
            </button>
            <button class="btn-ayah-action" onclick="quranApp.copyAyah(${idx})" title="Copy Ayah"><i class="fa-solid fa-copy"></i></button>
          </div>
        </div>
        <div class="ayah-arabic-text font-arabic" style="font-size: ${state.fontSize}px;">${ayah.text}</div>
        <div class="ayah-translations">
          <div class="trans-urdu font-urdu ${state.showUrdu ? '' : 'hidden'}">${ayah.urdu}</div>
          <div class="trans-english ${state.showEnglish ? '' : 'hidden'}">${ayah.english}</div>
        </div>
      </div>
    `).join("");
  }

  async function playAyahAudio(index) {
    state.currentPlayingAyahIndex = index;
    const ayah = state.ayahsData[index];
    if (!ayah) return;
    const surah = SURAHS_LIST.find(s => s.number === state.selectedSurah);
    const qari = QARIS_LIST.find(q => q.id === state.selectedQari);
    if (!qari) return;

    if (state.audioInstance) {
      try {
        state.audioInstance.pause();
        state.audioInstance.src = "";
        state.audioInstance.removeAttribute("src");
        state.audioInstance.load();
        state.audioInstance.onended = null;
        state.audioInstance.onloadedmetadata = null;
        state.audioInstance.onerror = null;
      } catch (e) {}
    }
    if (state.currentObjectURL) {
      try { URL.revokeObjectURL(state.currentObjectURL); } catch (e) {}
      state.currentObjectURL = null;
    }

    document.getElementById("player-surah-name").innerText =
      `${surah.englishName} - Ayah ${ayah.numberInSurah}`;
    document.getElementById("player-reciter-name").innerText = qari.name;
    document.getElementById("audio-player-bar").classList.remove("hidden");

    let playUrl = getEveryayahUrl(state.selectedQari, surah.number, ayah.numberInSurah);
    let isOffline = false;

    try {
      const offline = await getOfflineAyahUrl(state.selectedQari, surah.number, ayah.numberInSurah);
      if (offline && offline.url) {
        playUrl = offline.url;
        if (offline.isBlob) state.currentObjectURL = offline.url;
        isOffline = true;
      }
    } catch (err) {}

    console.log("🎧 Playing:", state.selectedQari,
                "| Ayah:", ayah.numberInSurah,
                "| Mode:", isOffline ? "OFFLINE" : "ONLINE");

    state.audioInstance = new Audio();
    state.audioInstance.preload = "auto";
    state.audioInstance.src = playUrl;

    state.audioInstance.onerror = () => {
      console.warn("Audio load error for ayah", ayah.numberInSurah);
      showToast("Audio load nahi ho saka");
      state.isPlaying = false;
      updatePlayPauseIcon(false);
    };

    try {
      await state.audioInstance.play();
      state.isPlaying = true;
      updatePlayPauseIcon(true);
      highlightPlayingAyah(index);
    } catch (err) {
      console.warn("Play error:", err);
      showToast("Audio play nahi ho saka — internet check karein");
      state.isPlaying = false;
      updatePlayPauseIcon(false);
      return;
    }

    state.audioInstance.onended = () => {
      if (state.currentPlayingAyahIndex + 1 < state.ayahsData.length) {
        playAyahAudio(state.currentPlayingAyahIndex + 1);
      } else {
        state.isPlaying = false;
        updatePlayPauseIcon(false);
        showToast("Surah complete ✓");
      }
    };
  }

  function playFullSurah() {
    if (state.ayahsData.length) { playAyahAudio(0); showToast("Playing full surah recitation"); }
  }
  function togglePlayPause() {
    if (state.isPlaying) { state.audioInstance.pause(); state.isPlaying = false; updatePlayPauseIcon(false); }
    else { state.audioInstance.play(); state.isPlaying = true; updatePlayPauseIcon(true); }
  }
  function updatePlayPauseIcon(playing) {
    const btn = document.getElementById("btn-player-play-pause");
    if (btn) btn.innerHTML = playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
  }
  function highlightPlayingAyah(index) {
    document.querySelectorAll(".ayah-card").forEach(c => c.classList.remove("playing"));
    const current = document.getElementById(`ayah-item-${index}`);
    if (current) { current.classList.add("playing"); current.scrollIntoView({ behavior: "smooth", block: "center" }); }
  }

  function isBookmarked(surahNum, ayahNum) { return state.bookmarks.some(b => b.surahNumber === surahNum && b.ayahNumber === ayahNum); }
  function toggleBookmark(surahNum, ayahNum) {
    const surah = SURAHS_LIST.find(s => s.number === surahNum);
    const existingIndex = state.bookmarks.findIndex(b => b.surahNumber === surahNum && b.ayahNumber === ayahNum);
    if (existingIndex >= 0) { state.bookmarks.splice(existingIndex, 1); showToast("Bookmark removed"); }
    else {
      state.bookmarks.push({ surahNumber: surahNum, ayahNumber: ayahNum, surahName: surah.englishName, surahNameArabic: surah.name, date: new Date().toLocaleDateString() });
      showToast(`Saved Surah ${surah.englishName} Ayah ${ayahNum}`);
    }
    saveSettings(); renderAyahs(); renderBookmarks();
  }
  function renderBookmarks() {
    const list = document.getElementById("bookmarks-list");
    if (!list) return;
    if (state.bookmarks.length === 0) {
      list.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted);">No bookmarks saved yet.</p>`;
      return;
    }
    list.innerHTML = state.bookmarks.map(b => `
      <div class="surah-card" onclick="quranApp.openSurah(${b.surahNumber})">
        <div class="surah-card-left">
          <div class="surah-number-badge"><i class="fa-solid fa-bookmark text-amber"></i></div>
          <div class="surah-names-box">
            <strong>${b.surahName} (Ayah ${b.ayahNumber})</strong>
            <span>Saved on ${b.date}</span>
          </div>
        </div>
        <div class="surah-card-right">
          <span class="surah-card-arabic font-arabic">${b.surahNameArabic}</span>
        </div>
      </div>
    `).join("");
  }
  function copyAyah(index) {
    const ayah = state.ayahsData[index];
    const surah = SURAHS_LIST.find(s => s.number === state.selectedSurah);
    const text = `${ayah.text}\n\n[Urdu]\n${ayah.urdu}\n\n[English]\n${ayah.english}\n\n— Surah ${surah.englishName} (${surah.number}:${ayah.numberInSurah})`;
    navigator.clipboard.writeText(text).then(() => showToast("Ayah copied!"));
  }
  function updateLastReadUI() {
    const title = document.getElementById("last-read-title");
    const meta = document.getElementById("last-read-meta");
    if (title && state.lastRead) {
      title.innerText = `Surah ${state.lastRead.name}`;
      meta.innerText = `Ayah ${state.lastRead.ayah} • ${state.lastRead.arName}`;
    }
  }
  function setTheme(themeName) {
    state.theme = themeName;
    document.body.className = "theme-" + themeName;
    document.querySelectorAll(".theme-btn").forEach(btn => btn.classList.toggle("active", btn.getAttribute("data-theme") === themeName));
    saveSettings();
  }
  function showToast(msg) {
    const toast = document.getElementById("toast-popup");
    const label = document.getElementById("toast-message");
    if (!toast || !label) return;
    label.innerText = msg;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 2500);
  }

  // ==========================================
  // DOWNLOAD ALL QURAN TEXT
  // ==========================================
  async function downloadAllQuranText() {
    if (state.isDownloadingText) return;
    await requestPersistentStorage();

    const btn = document.getElementById("btn-download-all-text");
    const progressBar = document.getElementById("text-download-progress-bar");
    const fill = progressBar.querySelector(".progress-bar-fill");
    const label = progressBar.querySelector(".progress-label");

    let downloadedSurahs = new Set();
    try {
      downloadedSurahs = await getDownloadedTextSurahSet();
    } catch (e) { console.warn("Partial check failed:", e); }

    if (downloadedSurahs.size === 114) {
      try {
        const db = await openDB();
        const finalCheck = await new Promise(res => {
          const tx = db.transaction("text", "readonly");
          const req = tx.objectStore("text").get("quran_text");
          req.onsuccess = () => res(req.result);
          req.onerror = () => res(null);
        });
        if (!finalCheck || !finalCheck.data || finalCheck.data.length !== 114) {
          await assembleFinalQuranText();
        }
        db.close();
      } catch (e) { console.warn("Final assembly check failed:", e); }
      showToast("✅ Quran text already downloaded");
      return;
    }

    state.isDownloadingText = true;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Downloading...';
    progressBar.classList.remove("hidden");

    const total = SURAHS_LIST.length;
    const toDownload = SURAHS_LIST.filter(s => !downloadedSurahs.has(s.number));
    let completed = downloadedSurahs.size;

    const startPct = Math.round((completed / total) * 100);
    fill.style.width = startPct + "%";
    label.innerHTML = '<strong>' + startPct + '%</strong> (' + completed + '/' + total + ')';

    if (completed > 0) {
      showToast("Resuming from " + completed + "/114...");
    }

    let failedSurahs = [];
    let db;
    try { db = await openDB(); } catch (e) { console.warn("DB open failed:", e); }

    for (const surah of toDownload) {
      let surahData = null;
      let attempts = 0;
      const MAX_ATTEMPTS = 3;

      while (attempts < MAX_ATTEMPTS && !surahData) {
        attempts++;
        try {
          const [resArabic, resUrdu, resEnglish] = await Promise.all([
            fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/quran-uthmani`).then(r => r.json()),
            fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/ur.jalandhry`).then(r => r.json()),
            fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/en.sahih`).then(r => r.json())
          ]);

          if (resArabic && resArabic.code === 200 && resArabic.data) {
            surahData = {
              surah: surah.number,
              name: surah.englishName,
              arabicName: surah.name,
              ayahs: resArabic.data.ayahs.map((a, i) => ({
                number: a.numberInSurah,
                arabic: a.text,
                urdu: (resUrdu.data && resUrdu.data.ayahs[i]) ? resUrdu.data.ayahs[i].text : "",
                english: (resEnglish.data && resEnglish.data.ayahs[i]) ? resEnglish.data.ayahs[i].text : ""
              }))
            };
          }
        } catch (err) {
          console.warn(`Surah ${surah.number} attempt ${attempts}/${MAX_ATTEMPTS} failed:`, err);
          if (attempts < MAX_ATTEMPTS) {
            await new Promise(r => setTimeout(r, 800 * attempts));
          }
        }
      }

      if (surahData && db) {
        try {
          await new Promise((resolve, reject) => {
            const tx = db.transaction("text", "readwrite");
            const store = tx.objectStore("text");
            store.put({ id: "quran_surah_" + surah.number, data: surahData });
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error);
          });
          completed++;
        } catch (e) {
          console.warn("Save surah failed:", e);
          failedSurahs.push(surah.number);
        }
      } else if (!surahData) {
        failedSurahs.push(surah.number);
      }

      const pct = Math.round((completed / total) * 100);
      fill.style.width = pct + "%";
      label.innerHTML = '<strong>' + pct + '%</strong> (' + completed + '/' + total + ')';
    }

    if (completed === total) {
      try {
        await assembleFinalQuranText();
        localStorage.setItem("quran_offline_text_done", "true");
        const statusEl = document.getElementById("text-offline-status");
        if (statusEl) {
          statusEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Downloaded';
          statusEl.className = "status-tag status-done";
        }
        showToast("✅ All 114 Surahs downloaded successfully!");
      } catch (e) {
        console.warn("Assembly failed:", e);
        showToast("⚠️ Data saved. Tap again to finalize.");
      }
    } else {
      showToast("⚠️ " + completed + "/114 done. " + failedSurahs.length + " failed — tap again to retry.");
    }

    if (db) try { db.close(); } catch (e) {}

    state.isDownloadingText = false;
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-download"></i> Download All Quran Text';
    setTimeout(() => progressBar.classList.add("hidden"), 3000);
  }

  async function getDownloadedTextSurahSet() {
    const set = new Set();
    try {
      const db = await openDB();
      await new Promise((resolve) => {
        const tx = db.transaction("text", "readonly");
        const store = tx.objectStore("text");
        const range = IDBKeyRange.bound("quran_surah_", "quran_surah_\uffff");
        const req = store.openCursor(range);
        req.onsuccess = (ev) => {
          const cursor = ev.target.result;
          if (cursor) {
            if (cursor.value && cursor.value.data && cursor.value.data.ayahs && cursor.value.data.ayahs.length > 0) {
              const num = parseInt(cursor.key.replace("quran_surah_", ""), 10);
              if (!isNaN(num)) set.add(num);
            }
            cursor.continue();
          } else resolve();
        };
        req.onerror = () => resolve();
      });
      db.close();
    } catch (e) { console.warn("Text set read error:", e); }
    return set;
  }

  async function assembleFinalQuranText() {
    const db = await openDB();
    const allData = [];

    for (let i = 1; i <= 114; i++) {
      const item = await new Promise((resolve) => {
        const tx = db.transaction("text", "readonly");
        const req = tx.objectStore("text").get("quran_surah_" + i);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      });
      if (item && item.data) allData.push(item.data);
    }

    if (allData.length !== 114) {
      db.close();
      throw new Error("Not all surahs present for assembly");
    }

    await new Promise((resolve, reject) => {
      const tx = db.transaction("text", "readwrite");
      const store = tx.objectStore("text");
      store.put({ id: "quran_text", data: allData });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    db.close();
    return true;
  }

  // ==========================================
  // ✅ DOWNLOAD ALL AUDIO — PER-AYAH (same as online)
  // ==========================================
  async function downloadAllQuranAudio() {
    if (state.isDownloadingAudio) return;
    state.isDownloadingAudio = true;

    await requestPersistentStorage();

    const qariId = state.downloadQari;
    const qari = QARIS_LIST.find(q => q.id === qariId);
    const btn = document.getElementById("btn-download-all-audio");
    const progressBar = document.getElementById("audio-download-progress-bar");
    const fill = progressBar.querySelector(".progress-bar-fill");
    const label = progressBar.querySelector(".progress-label");

    // ✅ NAYA: Agar flag already set hai to turant return karo
    if (isAudioMarkedComplete(qariId)) {
      showToast("✅ This Qari is already complete");
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> This Qari is already complete';
      if (progressBar && fill && label) {
        progressBar.classList.remove("hidden");
        fill.style.width = "100%";
        label.innerHTML = '<strong style="color:#22c55e;">Downloaded • 100% complete</strong>';
      }
      state.isDownloadingAudio = false;
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking...';
    progressBar.classList.remove("hidden");

    const totalSurahs = SURAHS_LIST.length;
    const totalAyahs = SURAHS_LIST.reduce((sum, s) => sum + s.numberOfAyahs, 0);

    try {
      const downloadedSet = await getDownloadedSurahSet(qariId);
      const surahsToDownload = SURAHS_LIST.filter(s => !downloadedSet.has(s.number));

      if (surahsToDownload.length === 0) {
        setAudioCompleteFlag(qariId, true);
        showToast("✅ This Qari is already complete");
        fill.style.width = "100%";
        label.innerHTML = '<strong style="color:#22c55e;">Downloaded • 100% complete</strong>';
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> This Qari is already complete';
        state.isDownloadingAudio = false;
        return;
      }

      let successfulSurahs = downloadedSet.size;
      let failedSurahs = 0;
      let ayahsDone = 0;

      for (const n of downloadedSet) {
        const info = SURAHS_LIST.find(s => s.number === n);
        if (info) ayahsDone += info.numberOfAyahs;
      }

      function renderProgress() {
        const pct = Math.min(100, Math.floor((ayahsDone / totalAyahs) * 100));
        fill.style.width = pct + "%";
        label.innerHTML = '<strong>' + pct + '%</strong> (' +
                          successfulSurahs + '/' + totalSurahs + ' surahs, ' +
                          ayahsDone + '/' + totalAyahs + ' ayahs)';
      }
      renderProgress();

      const TIMEOUT_MS = 30000;
      const RETRY_PER_AYAH = 2;
      const AYAH_CONCURRENCY = 5;
      const DELAY_BETWEEN_SURAHS = 300;

      async function fetchBlob(url, timeout) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
          const response = await fetch(url, {
            signal: controller.signal,
            mode: 'cors',
            headers: { 'Accept': 'audio/mpeg,audio/*,*/*' }
          });
          clearTimeout(id);
          if (!response.ok) throw new Error("HTTP " + response.status);
          const blob = await response.blob();
          if (!blob || blob.size < MIN_AUDIO_BYTES) {
            throw new Error("Invalid size: " + (blob ? blob.size : 0));
          }
          return blob;
        } catch (e) {
          clearTimeout(id);
          throw e;
        }
      }

      async function downloadOneAyah(surahNum, ayahNum) {
        const existing = await statAyah(qariId, surahNum, ayahNum);
        if (existing && existing.size >= MIN_AUDIO_BYTES) return true;

        const url = getEveryayahUrl(qariId, surahNum, ayahNum);
        for (let attempt = 0; attempt < RETRY_PER_AYAH; attempt++) {
          try {
            const blob = await fetchBlob(url, TIMEOUT_MS);
            const size = await writeAyahToStorage(qariId, surahNum, ayahNum, blob);
            if (size >= MIN_AUDIO_BYTES) return true;
          } catch (e) {
            if (attempt < RETRY_PER_AYAH - 1) {
              await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
            }
          }
        }
        return false;
      }

      btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${qari.name}...`;

      for (const surah of surahsToDownload) {
        const total = surah.numberOfAyahs;
        const indices = [];
        for (let a = 1; a <= total; a++) indices.push(a);

        let cursor = 0;
        let failedInThisSurah = 0;

        async function worker() {
          while (cursor < indices.length) {
            const myIdx = cursor++;
            const ayahNum = indices[myIdx];
            const ok = await downloadOneAyah(surah.number, ayahNum);
            if (!ok) failedInThisSurah++;
            ayahsDone++;
            if (ayahsDone % 5 === 0) renderProgress();
          }
        }

        const workers = [];
        for (let w = 0; w < AYAH_CONCURRENCY; w++) {
          workers.push(worker());
        }
        await Promise.all(workers);

        if (failedInThisSurah === 0) {
          successfulSurahs++;
          markSurahDownloadedLocal(qariId, surah.number);
        } else {
          failedSurahs++;
          console.warn("Surah " + surah.number + " — " + failedInThisSurah + " ayahs failed");
        }

        renderProgress();
        await new Promise(r => setTimeout(r, DELAY_BETWEEN_SURAHS));
      }

      renderProgress();

      // ✅ NAYA: Agar sab 114 complete hai to flag set karo
      if (successfulSurahs >= 114 && failedSurahs === 0) {
        setAudioCompleteFlag(qariId, true);
        showToast("✅ All 114 surahs downloaded!");
      } else {
        setAudioCompleteFlag(qariId, false);
        let msg = "⚠️ " + successfulSurahs + "/114 done";
        if (failedSurahs > 0) msg = "⚠️ " + failedSurahs + " surah incomplete — Resume dabayein";
        showToast(msg);
      }

    } catch (err) {
      console.error(err);
      showToast("❌ Download failed: " + (err.message || "Unknown"));
    } finally {
      state.isDownloadingAudio = false;
      await checkAudioDownloadStatus();
    }
  }

  function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("QuranOfflineDB", 1);
      request.onupgradeneeded = (ev) => {
        const db = ev.target.result;
        if (!db.objectStoreNames.contains("text")) db.createObjectStore("text", { keyPath: "id" });
        if (!db.objectStoreNames.contains("audio")) db.createObjectStore("audio", { keyPath: "id" });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function putAyahAudioBlob(db, qariId, surahNum, ayahNum, blob) {
    if (isNativeApp) {
      const ok = await writeAyahToStorage(qariId, surahNum, ayahNum, blob);
      return ok > 0;
    }
    const key = qariId + "_surah_" + surahNum + "_ayah_" + ayahNum;
    await new Promise((resolve, reject) => {
      const tx = db.transaction("audio", "readwrite");
      tx.objectStore("audio").put({ id: key, data: blob });
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Aborted"));
    });
    return true;
  }

  async function getCachedAyahAudio(qariId, surahNum, ayahNum) {
    if (isNativeApp) {
      try {
        const blob = await readAyahFromStorage(qariId, surahNum, ayahNum);
        if (blob && blob.size > MIN_AUDIO_BYTES) return blob;
      } catch (e) {}
    }
    try {
      const db = await openDB();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction("audio", "readonly");
        const store = tx.objectStore("audio");
        const key = qariId + "_surah_" + surahNum + "_ayah_" + ayahNum;
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result ? request.result.data : null);
        request.onerror = () => reject(request.error);
      });
    } catch (err) { return null; }
  }

  function setupEventListeners() {
    document.getElementById("searchNavBtn")?.addEventListener("click", () => navigate("surahs"));
    document.getElementById("btn-resume-reading")?.addEventListener("click", () => { openSurah(state.lastRead.surah); });

    let surahFilter = "all";

    function applySurahFilter() {
      const searchInput = document.getElementById("surah-search-input");
      const clearBtn = document.getElementById("btn-clear-surah-search");
      const q = searchInput ? searchInput.value.toLowerCase().trim() : "";

      if (clearBtn) clearBtn.classList.toggle("hidden", !q);

      let list = SURAHS_LIST;

      if (surahFilter === "meccan" || surahFilter === "medinan") {
        list = list.filter(s => s.revelationType === surahFilter);
      }

      if (q) {
        list = list.filter(s =>
          s.englishName.toLowerCase().includes(q) ||
          s.englishNameTranslation.toLowerCase().includes(q) ||
          s.urduName.includes(q) ||
          s.name.includes(q) ||
          s.number.toString() === q
        );
      }

      renderSurahsGrid(list);
    }

    document.getElementById("surah-search-input")?.addEventListener("input", applySurahFilter);

    document.getElementById("btn-clear-surah-search")?.addEventListener("click", () => {
      const inp = document.getElementById("surah-search-input");
      if (inp) inp.value = "";
      applySurahFilter();
    });

    document.querySelectorAll(".filter-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-tab").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        surahFilter = btn.getAttribute("data-filter") || "all";
        applySurahFilter();
      });
    });

    document.getElementById("select-download-qari")?.addEventListener("change", (e) => {
      state.downloadQari = e.target.value;
      saveSettings();
      const qari = QARIS_LIST.find(q => q.id === state.downloadQari);
      showToast("Download Qari: " + (qari ? qari.name : ""));
      checkAudioDownloadStatus();
    });

    document.getElementById("range-font-size")?.addEventListener("input", (e) => {
      state.fontSize = parseInt(e.target.value);
      document.getElementById("font-size-label").innerText = state.fontSize + "px";
      saveSettings();
      renderAyahs();
    });

    document.getElementById("toggle-urdu-trans")?.addEventListener("change", (e) => {
      state.showUrdu = e.target.checked;
      renderAyahs();
    });
    document.getElementById("toggle-english-trans")?.addEventListener("change", (e) => {
      state.showEnglish = e.target.checked;
      renderAyahs();
    });

    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.addEventListener("click", () => setTheme(btn.getAttribute("data-theme")));
    });

    document.getElementById("btn-player-play-pause")?.addEventListener("click", togglePlayPause);
    document.getElementById("btn-player-close")?.addEventListener("click", () => {
      if (state.audioInstance) state.audioInstance.pause();
      state.isPlaying = false;
      document.getElementById("audio-player-bar").classList.add("hidden");
      highlightPlayingAyah(-1);
    });
    document.getElementById("btn-player-prev")?.addEventListener("click", () => {
      if (state.currentPlayingAyahIndex > 0) playAyahAudio(state.currentPlayingAyahIndex - 1);
    });
    document.getElementById("btn-player-next")?.addEventListener("click", () => {
      if (state.currentPlayingAyahIndex + 1 < state.ayahsData.length) playAyahAudio(state.currentPlayingAyahIndex + 1);
    });
    document.getElementById("btn-reader-play-surah")?.addEventListener("click", playFullSurah);

    document.getElementById("btn-reader-font-size")?.addEventListener("click", function () {
      var sizes = [24, 28, 32, 36];
      var current = state.fontSize || 28;
      var idx = sizes.indexOf(current);
      var next = sizes[(idx + 1) % sizes.length];
      state.fontSize = next;
      saveSettings();
      renderAyahs();
      showToast("Font size: " + next + "px");
    });

    document.getElementById("btn-reader-translation-toggle")?.addEventListener("click", function () {
      var anyOn = state.showUrdu || state.showEnglish;
      state.showUrdu = !anyOn;
      state.showEnglish = !anyOn;
      renderAyahs();
      showToast(anyOn ? "Translations off" : "Translations on");
    });

    document.getElementById("player-seek-slider")?.addEventListener("input", (e) => {
      if (!state.audioInstance) return;
      const dur = state.audioInstance.duration || 1;
      state.audioInstance.currentTime = (e.target.value / 100) * dur;
    });
    document.getElementById("btn-player-speed")?.addEventListener("click", (e) => {
      const speeds = [1.0, 1.25, 1.5];
      const next = speeds[(speeds.indexOf(state.playbackSpeed) + 1) % speeds.length];
      state.playbackSpeed = next;
      if (state.audioInstance) state.audioInstance.playbackRate = next;
      e.target.innerText = next + "x";
    });
  }

  setInterval(() => {
    const a = state.audioInstance;
    if (!a || !a.duration || isNaN(a.duration)) return;
    const cur = a.currentTime;
    const dur = a.duration;
    const slider = document.getElementById("player-seek-slider");
    if (slider) slider.value = (cur / dur) * 100;
    const formatTime = (sec) => {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    };
    const curEl = document.getElementById("player-current-time");
    const totEl = document.getElementById("player-total-time");
    if (curEl) curEl.innerText = formatTime(cur);
    if (totEl) totEl.innerText = formatTime(dur);
  }, 500);

  window.quranApp = {
    navigate,
    openSurah,
    openPara,
    playAyahAudio,
    toggleBookmark,
    copyAyah,
    setTheme
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


// ======================================
// UNIVERSAL BACK BUTTON HANDLER
// ======================================
(function () {
    "use strict";

    function isHomePage() {
        try {
            const path = window.location.pathname.toLowerCase();
            const filename = path.substring(path.lastIndexOf("/") + 1);
            return filename === "" || filename === "index.html";
        } catch (e) {
            return false;
        }
    }

    function initBackButton() {
        if (!window.Capacitor || !window.Capacitor.Plugins || !window.Capacitor.Plugins.App) {
            console.log("🌐 Browser mode — no native back");
            return;
        }

        const { App } = window.Capacitor.Plugins;

        App.addListener("backButton", async function () {
            const overlay = document.querySelector(
                ".dua-reader.show, .name-detail-overlay.active, .modal.show, .modal.active, " +
                ".ayah-detail.show, .more-menu.show, .more-menu.open"
            );
            if (overlay) {
                overlay.classList.remove("show", "active", "open");
                return;
            }

            const menu = document.getElementById("moreMenu");
            if (menu && (menu.classList.contains("show") || menu.classList.contains("open"))) {
                menu.classList.remove("show", "open");
                return;
            }

            const activeView = document.querySelector(".view-screen.active");
            if (activeView && activeView.id !== "view-home") {
                if (typeof window.goBack === "function") {
                    window.goBack();
                    return;
                }
            }

            try {
                const canGoBack = await App.canGoBack();
                if (canGoBack) { await App.goBack(); return; }
            } catch (e) {}

            if (!isHomePage()) {
                window.location.href = "../index.html";
                return;
            }

            App.exitApp();
        });

        console.log("✅ Native back button handler attached");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initBackButton);
    } else {
        initBackButton();
    }
})();

// ======================================
// STATE SAVE / RESTORE
// ======================================
document.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (href && !href.startsWith("#") && !href.startsWith("javascript")) {
        try {
            const searchInput = document.getElementById("surah-search-input");
            sessionStorage.setItem("quranState", JSON.stringify({
                view: "home", surah: 1, history: ["home"],
                searchQuery: searchInput ? searchInput.value : ""
            }));
        } catch (err) {}
    }
}, true);