/**
 * ============================================================================
 * القرآن الكريم — HOLY QURAN COMPLETE ENGINE
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

  // --- 2. 30 PARAS ---
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

  // --- 3. QARIS LIST ---
  const QARIS_LIST = [
    { id: "ar.alafasy", name: "Mishary Rashid Alafasy", arabic: "مشاري راشد العفاسي" },
    { id: "ar.abdurrahmaansudais", name: "Abdul Rahman Al-Sudais", arabic: "عبدالرحمن السديس" },
    { id: "ar.husary", name: "Mahmoud Khalil Al-Husary", arabic: "محمود خليل الحصري" },
    { id: "ar.minshawi", name: "Mohamed Siddiq Al-Minshawi", arabic: "محمد صديق المنشاوي" },
    { id: "ar.mahermuaiqly", name: "Maher Al-Muaiqly", arabic: "ماهر المعيقلي" },
    { id: "ar.abdulbasitmujawwad", name: "Abdul Basit Abdul Samad", arabic: "عبدالباسط عبدالصمد" },
    { id: "ar.saoodshuraym", name: "Sa'ud Ash-Shuraym", arabic: "سعود الشريم" },
    { id: "ar.ahmedajamy", name: "Ahmed Al-Ajamy", arabic: "أحمد بن علي العجمي" }
  ];

  // --- 4. STATE ---
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

  // --- 5. INIT ---
  function init() {
    loadSettings();
    renderSurahsGrid(SURAHS_LIST);
    renderParasGrid(PARAS_LIST);
    renderQariOptions();
    renderBookmarks();
    updateLastReadUI();
    setupEventListeners();

    document.getElementById("btn-download-all-text")?.addEventListener("click", downloadAllQuranText);
    document.getElementById("btn-download-all-audio")?.addEventListener("click", downloadAllQuranAudio);
  }

  function loadSettings() {
    try {
      const savedTheme = localStorage.getItem("quran_theme") || "light";
      setTheme(savedTheme);
      const savedQari = localStorage.getItem("quran_qari") || "ar.alafasy";
      state.selectedQari = savedQari;
      const savedFontSize = localStorage.getItem("quran_font_size");
      if (savedFontSize) {
        state.fontSize = parseInt(savedFontSize);
        document.getElementById("range-font-size").value = state.fontSize;
        document.getElementById("font-size-label").innerText = state.fontSize + "px";
      }
      const savedBookmarks = localStorage.getItem("quran_bookmarks");
      if (savedBookmarks) state.bookmarks = JSON.parse(savedBookmarks);
      const savedLastRead = localStorage.getItem("quran_last_read");
      if (savedLastRead) state.lastRead = JSON.parse(savedLastRead);
    } catch (e) {
      console.warn("Could not load local settings:", e);
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem("quran_theme", state.theme);
      localStorage.setItem("quran_qari", state.selectedQari);
      localStorage.setItem("quran_font_size", state.fontSize);
      localStorage.setItem("quran_bookmarks", JSON.stringify(state.bookmarks));
      localStorage.setItem("quran_last_read", JSON.stringify(state.lastRead));
    } catch (e) {
      console.warn("Could not save settings:", e);
    }
  }

  // --- 6. NAVIGATION ---
  function navigate(viewName) {
    state.currentView = viewName;
    state.history.push(viewName);
    document.querySelectorAll(".view-screen").forEach(el => el.classList.remove("active"));
    const target = document.getElementById("view-" + viewName);
    if (target) target.classList.add("active");
    const backBtn = document.getElementById("btn-back");
    if (viewName === "home") {
      backBtn.classList.add("hidden");
    } else {
      backBtn.classList.remove("hidden");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    if (state.history.length > 1) {
      state.history.pop();
      const prev = state.history.pop();
      navigate(prev || "home");
    } else {
      navigate("home");
    }
  }

  // --- 7. RENDER ---
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
    const grid = document.getElementById("paras-grid");
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
    const selects = [document.getElementById("select-settings-qari"), document.getElementById("select-download-qari")];
    selects.forEach(sel => {
      if (!sel) return;
      sel.innerHTML = QARIS_LIST.map(q => `
        <option value="${q.id}" ${q.id === state.selectedQari ? 'selected' : ''}>
          ${q.name} (${q.arabic})
        </option>
      `).join("");
    });
  }

  // --- 8. SURAH LOADING ---
  async function openSurah(surahNumber) {
    state.selectedSurah = surahNumber;
    const surah = SURAHS_LIST.find(s => s.number === surahNumber);
    document.getElementById("reader-title").innerText = `${surah.number}. Surah ${surah.englishName} (${surah.name})`;
    document.getElementById("reader-meta").innerText = `${surah.urduName} • ${surah.numberOfAyahs} Ayahs • ${surah.revelationType.toUpperCase()} • Juz ${surah.startJuz}`;
    const bismillahBox = document.getElementById("reader-bismillah-box");
    if (surahNumber === 9 || surahNumber === 1) {
      bismillahBox.classList.add("hidden");
    } else {
      bismillahBox.classList.remove("hidden");
    }
    navigate("reader");
    await fetchAndRenderSurah(surahNumber);
    state.lastRead = {
      surah: surah.number,
      ayah: 1,
      name: surah.englishName,
      arName: surah.name
    };
    saveSettings();
    updateLastReadUI();
  }

  function openPara(paraNumber) {
    const para = PARAS_LIST.find(p => p.number === paraNumber);
    if (para) {
      openSurah(para.startSurahNumber);
      showToast(`Opened Juz ${para.number} (${para.name})`);
    }
  }

  async function fetchAndRenderSurah(surahNumber) {
    const container = document.getElementById("ayahs-list-container");
    container.innerHTML = `<div style="text-align:center; padding:40px;"><i class="fa-solid fa-spinner fa-spin" style="font-size:32px;"></i><p>Loading Surah...</p></div>`;
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
    } catch (err) {
      console.error(err);
      container.innerHTML = `<div style="text-align:center; padding:40px; color:#e11d48;"><p>Failed to load. Please check internet.</p><button class="btn-primary" onclick="quranApp.openSurah(${surahNumber})" style="margin-top:12px;">Retry</button></div>`;
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
            <button class="btn-ayah-action" onclick="quranApp.playAyahAudio(${idx})" title="Play Ayah">
              <i class="fa-solid fa-play"></i>
            </button>
            <button class="btn-ayah-action" onclick="quranApp.toggleBookmark(${state.selectedSurah}, ${ayah.numberInSurah})" title="Bookmark">
              <i class="${isBookmarked(state.selectedSurah, ayah.numberInSurah) ? 'fa-solid fa-bookmark text-amber' : 'fa-regular fa-bookmark'}"></i>
            </button>
            <button class="btn-ayah-action" onclick="quranApp.copyAyah(${idx})" title="Copy Ayah">
              <i class="fa-solid fa-copy"></i>
            </button>
          </div>
        </div>
        <div class="ayah-arabic-text font-arabic" style="font-size: ${state.fontSize}px;">
          ${ayah.text}
        </div>
        <div class="ayah-translations">
          <div class="trans-urdu font-urdu ${state.showUrdu ? '' : 'hidden'}">
            ${ayah.urdu}
          </div>
          <div class="trans-english ${state.showEnglish ? '' : 'hidden'}">
            ${ayah.english}
          </div>
        </div>
      </div>
    `).join("");
  }

  // --- 9. AUDIO PLAYER ---
  async function playAyahAudio(index) {
    state.currentPlayingAyahIndex = index;
    const ayah = state.ayahsData[index];
    if (!ayah) return;

    const surah = SURAHS_LIST.find(s => s.number === state.selectedSurah);
    const qari = QARIS_LIST.find(q => q.id === state.selectedQari);
    const onlineUrl = `https://cdn.islamic.network/quran/audio/128/${state.selectedQari}/${ayah.number}.mp3`;

    document.getElementById("player-surah-name").innerText = `${surah.englishName} - Ayah ${ayah.numberInSurah}`;
    document.getElementById("player-reciter-name").innerText = qari.name;
    document.getElementById("audio-player-bar").classList.remove("hidden");

    // Purani offline blob URL ho to usko free kar dein (memory leak se bachne ke liye)
    if (state.currentObjectURL) {
      URL.revokeObjectURL(state.currentObjectURL);
      state.currentObjectURL = null;
    }

    // Pehle offline (downloaded) audio check karein, warna online stream karein
    let playUrl = onlineUrl;
    try {
      const cachedBlob = await getCachedAyahAudio(state.selectedQari, ayah.number);
      if (cachedBlob) {
        playUrl = URL.createObjectURL(cachedBlob);
        state.currentObjectURL = playUrl;
      }
    } catch (err) {
      console.warn("Offline audio check failed, streaming online instead:", err);
    }

    state.audioInstance.src = playUrl;
    state.audioInstance.playbackRate = state.playbackSpeed;
    state.audioInstance.play();
    state.isPlaying = true;
    updatePlayPauseIcon(true);
    highlightPlayingAyah(index);

    state.audioInstance.onended = () => {
      if (state.currentPlayingAyahIndex + 1 < state.ayahsData.length) {
        playAyahAudio(state.currentPlayingAyahIndex + 1);
      } else {
        state.isPlaying = false;
        updatePlayPauseIcon(false);
      }
    };
  }

  function playFullSurah() {
    if (state.ayahsData.length > 0) {
      playAyahAudio(0);
      showToast("Playing full surah recitation");
    }
  }

  function togglePlayPause() {
    if (state.isPlaying) {
      state.audioInstance.pause();
      state.isPlaying = false;
      updatePlayPauseIcon(false);
    } else {
      state.audioInstance.play();
      state.isPlaying = true;
      updatePlayPauseIcon(true);
    }
  }

  function updatePlayPauseIcon(playing) {
    const btn = document.getElementById("btn-player-play-pause");
    if (btn) {
      btn.innerHTML = playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
    }
  }

  function highlightPlayingAyah(index) {
    document.querySelectorAll(".ayah-card").forEach(c => c.classList.remove("playing"));
    const current = document.getElementById(`ayah-item-${index}`);
    if (current) {
      current.classList.add("playing");
      current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // --- 10. BOOKMARKS ---
  function isBookmarked(surahNum, ayahNum) {
    return state.bookmarks.some(b => b.surahNumber === surahNum && b.ayahNumber === ayahNum);
  }

  function toggleBookmark(surahNum, ayahNum) {
    const surah = SURAHS_LIST.find(s => s.number === surahNum);
    const existingIndex = state.bookmarks.findIndex(b => b.surahNumber === surahNum && b.ayahNumber === ayahNum);
    if (existingIndex >= 0) {
      state.bookmarks.splice(existingIndex, 1);
      showToast("Bookmark removed");
    } else {
      state.bookmarks.push({
        surahNumber: surahNum,
        ayahNumber: ayahNum,
        surahName: surah.englishName,
        surahNameArabic: surah.name,
        date: new Date().toLocaleDateString()
      });
      showToast(`Saved Surah ${surah.englishName} Ayah ${ayahNum}`);
    }
    saveSettings();
    renderAyahs();
    renderBookmarks();
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
    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-theme") === themeName);
    });
    saveSettings();
  }

  function showToast(msg) {
    const toast = document.getElementById("toast-popup");
    const label = document.getElementById("toast-message");
    label.innerText = msg;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 2500);
  }

  // ============================================================
  //  DOWNLOAD TEXT
  // ============================================================
  async function downloadAllQuranText() {
    if (state.isDownloadingText) return;
    state.isDownloadingText = true;

    const btn = document.getElementById("btn-download-all-text");
    const progressBar = document.getElementById("text-download-progress-bar");
    const fill = progressBar.querySelector(".progress-bar-fill");
    const label = progressBar.querySelector(".progress-label");

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Downloading...';
    progressBar.classList.remove("hidden");
    fill.style.width = "0%";
    label.innerText = "0%";

    try {
      const total = SURAHS_LIST.length;
      let completed = 0;
      const allData = [];

      for (const surah of SURAHS_LIST) {
        const [resArabic, resUrdu, resEnglish] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/quran-uthmani`).then(r => r.json()),
          fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/ur.jalandhry`).then(r => r.json()),
          fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/en.sahih`).then(r => r.json())
        ]);

        allData.push({
          surah: surah.number,
          name: surah.englishName,
          arabicName: surah.name,
          ayahs: resArabic.data.ayahs.map((a, i) => ({
            number: a.numberInSurah,
            arabic: a.text,
            urdu: resUrdu.data.ayahs[i]?.text || "",
            english: resEnglish.data.ayahs[i]?.text || ""
          }))
        });

        completed++;
        const pct = Math.round((completed / total) * 100);
        fill.style.width = pct + "%";
        label.innerText = pct + "%";
      }

      await saveQuranToIndexedDB(allData);
      localStorage.setItem("quran_offline_text", JSON.stringify(allData));
      document.getElementById("text-offline-status").innerHTML = '<i class="fa-solid fa-circle-check"></i> Downloaded';
      document.getElementById("text-offline-status").className = "status-tag status-done";
      showToast("✅ All 114 Surahs downloaded successfully!");
    } catch (err) {
      console.error(err);
      showToast("❌ Download failed. Check internet.");
    } finally {
      state.isDownloadingText = false;
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-download"></i> Download All Quran Text';
      setTimeout(() => progressBar.classList.add("hidden"), 2000);
    }
  }

// ============================================================
//  DOWNLOAD FULL AUDIO — Har Ayah ka audio IndexedDB mein save hota hai
//  Ab MB (Megabytes) ka bhi live hisaab dikhega.
// ============================================================
async function downloadAllQuranAudio() {
  if (state.isDownloadingAudio) return;
  state.isDownloadingAudio = true;

  const qariId = document.getElementById("select-download-qari").value;
  const qari = QARIS_LIST.find(q => q.id === qariId);
  const btn = document.getElementById("btn-download-all-audio");
  const progressBar = document.getElementById("audio-download-progress-bar");
  const fill = progressBar.querySelector(".progress-bar-fill");
  const label = progressBar.querySelector(".progress-label");

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing...';
  progressBar.classList.remove("hidden");
  fill.style.width = "0%";
  label.innerText = "0%";

  // Backup proxy
  const PROXY_URL = "https://corsproxy.io/?url=";

  async function fetchAudioBlob(url, retries = 2) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url);
        if (response.ok) return await response.blob();
        throw new Error(`HTTP ${response.status}`);
      } catch (err) {
        if (attempt === retries) break;
        await new Promise(r => setTimeout(r, 800 * attempt));
      }
    }
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(PROXY_URL + encodeURIComponent(url));
        if (response.ok) return await response.blob();
        throw new Error(`HTTP ${response.status}`);
      } catch (err) {
        if (attempt === retries) throw err;
        await new Promise(r => setTimeout(r, 1200 * attempt));
      }
    }
  }

  // Har ayah ka global number nikalte hain
  const ayahJobs = [];
  let globalAyahNumber = 1;
  for (const surah of SURAHS_LIST) {
    for (let i = 1; i <= surah.numberOfAyahs; i++) {
      ayahJobs.push(globalAyahNumber);
      globalAyahNumber++;
    }
  }

  const total = ayahJobs.length;
  let successful = 0;
  let failed = 0;

  // ====== MB ka hisaab rakhne ke liye ======
  let downloadedBytes = 0;
  const AVG_AUDIO_SIZE = 45 * 1024; // ~45 KB per ayah (andaraz)
  const totalBytesEstimate = total * AVG_AUDIO_SIZE;

  const CONCURRENCY = 8;

  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Downloading ${qari.name}...`;

  try {
    const db = await openDB();

    async function downloadOne(ayahNumber) {
      const audioUrl = `https://cdn.islamic.network/quran/audio/128/${qariId}/${ayahNumber}.mp3`;
      try {
        const blob = await fetchAudioBlob(audioUrl, 2);
        await putAyahAudioBlob(db, qariId, ayahNumber, blob);
        successful++;
        downloadedBytes += blob.size; // Actual bytes add karein
      } catch (err) {
        failed++;
      }
      const done = successful + failed;
      const pct = Math.round((done / total) * 100);

      // MB mein convert karein
      const downloadedMB = (downloadedBytes / 1048576).toFixed(1);
      const totalMB = (totalBytesEstimate / 1048576).toFixed(1);

      fill.style.width = pct + "%";
      label.innerText = `${pct}% (${done}/${total}) • ${downloadedMB} MB / ${totalMB} MB`;
    }

    for (let i = 0; i < ayahJobs.length; i += CONCURRENCY) {
      const batch = ayahJobs.slice(i, i + CONCURRENCY);
      await Promise.all(batch.map(downloadOne));
    }

    localStorage.setItem("quran_offline_audio_qari", qariId);
    localStorage.setItem("quran_audio_cached", failed === 0 ? "true" : "partial");

    let msg = `✅ ${successful}/${total} Ayahs saved for ${qari.name} — ab offline chalega.`;
    if (failed > 0) {
      msg = `⚠️ ${successful}/${total} Ayahs saved. ${failed} download nahi ho sake — dobara try karein.`;
    }
    showToast(msg);

    fill.style.width = "100%";
    label.innerText = `✅ Done! ${successful}/${total} • ${(downloadedBytes / 1048576).toFixed(1)} MB saved`;

  } catch (err) {
    console.error(err);
    showToast("❌ Audio download failed. Check internet.");
  } finally {
    state.isDownloadingAudio = false;
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Download Selected Qari Audio';
    setTimeout(() => progressBar.classList.add("hidden"), 3000);
  }
}

  // --- INDEXEDDB HELPERS ---
  function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("QuranOfflineDB", 1);
      request.onupgradeneeded = (ev) => {
        const db = ev.target.result;
        if (!db.objectStoreNames.contains("text")) {
          db.createObjectStore("text", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("audio")) {
          db.createObjectStore("audio", { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function saveQuranToIndexedDB(data) {
    const db = await openDB();
    const tx = db.transaction("text", "readwrite");
    const store = tx.objectStore("text");
    store.put({ id: "quran_text", data });
    return new Promise((resolve, reject) => {
      tx.oncomplete = resolve;
      tx.onerror = reject;
    });
  }

  // Ek ayah ka audio Blob IndexedDB mein save karta hai
  function putAyahAudioBlob(db, qariId, ayahNumber, blob) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction("audio", "readwrite");
      const store = tx.objectStore("audio");
      store.put({ id: `${qariId}_${ayahNumber}`, data: blob });
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }

  // Player ke liye: agar ayah ka audio pehle se download ho chuka ho to Blob wapas deta hai
  async function getCachedAyahAudio(qariId, ayahNumber) {
    try {
      const db = await openDB();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction("audio", "readonly");
        const store = tx.objectStore("audio");
        const request = store.get(`${qariId}_${ayahNumber}`);
        request.onsuccess = () => resolve(request.result ? request.result.data : null);
        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      return null;
    }
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    document.getElementById("btn-back")?.addEventListener("click", goBack);
    document.getElementById("btn-search-trigger")?.addEventListener("click", () => navigate("surahs"));
    document.getElementById("btn-downloads-trigger")?.addEventListener("click", () => navigate("downloads"));
    document.getElementById("btn-theme-quick")?.addEventListener("click", () => {
      const themes = ["light", "dark", "sepia"];
      const next = themes[(themes.indexOf(state.theme) + 1) % themes.length];
      setTheme(next);
    });

    document.getElementById("btn-resume-reading")?.addEventListener("click", () => {
      openSurah(state.lastRead.surah);
    });

    document.getElementById("surah-search-input")?.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = SURAHS_LIST.filter(s =>
        s.englishName.toLowerCase().includes(q) ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        s.urduName.includes(q) ||
        s.name.includes(q) ||
        s.number.toString() === q
      );
      renderSurahsGrid(filtered);
    });

    document.getElementById("select-settings-qari")?.addEventListener("change", (e) => {
      state.selectedQari = e.target.value;
      saveSettings();
      showToast("Qari updated");
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
      state.audioInstance.pause();
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

    state.audioInstance.ontimeupdate = () => {
      const cur = state.audioInstance.currentTime;
      const dur = state.audioInstance.duration || 1;
      const slider = document.getElementById("player-seek-slider");
      if (slider) slider.value = (cur / dur) * 100;
      const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
      };
      document.getElementById("player-current-time").innerText = formatTime(cur);
      if (!isNaN(dur)) document.getElementById("player-total-time").innerText = formatTime(dur);
    };

    document.getElementById("player-seek-slider")?.addEventListener("input", (e) => {
      const dur = state.audioInstance.duration || 1;
      state.audioInstance.currentTime = (e.target.value / 100) * dur;
    });

    document.getElementById("btn-player-speed")?.addEventListener("click", (e) => {
      const speeds = [1.0, 1.25, 1.5];
      const next = speeds[(speeds.indexOf(state.playbackSpeed) + 1) % speeds.length];
      state.playbackSpeed = next;
      state.audioInstance.playbackRate = next;
      e.target.innerText = next + "x";
    });

    // More Menu
    const moreNavBtn = document.getElementById("moreNavBtn");
    const moreMenu = document.getElementById("moreMenu");
    const settingsBtn = document.getElementById("settingsBtn");

    if (moreNavBtn && moreMenu) {
      moreNavBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        moreMenu.classList.toggle("show");
      });
      document.addEventListener("click", () => moreMenu.classList.remove("show"));
      moreMenu.addEventListener("click", (e) => e.stopPropagation());
    }

    if (settingsBtn) {
      settingsBtn.addEventListener("click", () => {
        moreMenu?.classList.remove("show");
        navigate("settings");
      });
    }
  }

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