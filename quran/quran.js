/**
 * ============================================================================
 * القرآن الكريم — HOLY QURAN COMPLETE ENGINE (FINAL)
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
    { id: "ar.alafasy",            name: "Mishary Rashid Alafasy",     arabic: "مشاري راشد العفاسي" },
    { id: "ar.abdurrahmaansudais", name: "Abdul Rahman Al-Sudais",     arabic: "عبدالرحمن السديس" },
    { id: "ar.husary",             name: "Mahmoud Khalil Al-Husary",   arabic: "محمود خليل الحصري" },
    { id: "ar.minshawi",           name: "Mohamed Siddiq Al-Minshawi", arabic: "محمد صديق المنشاوي" },
    { id: "ar.mahermuaiqly",       name: "Maher Al-Muaiqly",           arabic: "ماهر المعيقلي" },
    { id: "ar.abdulbasitmurattal", name: "Abdul Basit Abdul Samad",    arabic: "عبدالباسط عبدالصمد" },
    { id: "ar.saoodshuraym",       name: "Sa'ud Ash-Shuraym",          arabic: "سعود الشريم" },
    { id: "ar.ahmedajamy",         name: "Ahmed Al-Ajamy",             arabic: "أحمد بن علي العجمي" }
]
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

  async function requestPersistentStorage() {
    if (persistentStorageRequested) return;
    persistentStorageRequested = true;
    try {
      if (navigator.storage && navigator.storage.persist) {
        const granted = await navigator.storage.persist();
        console.log("💾 Persistent storage:", granted ? "GRANTED" : "DENIED");
      }
    } catch (e) {
      console.warn("Persistent storage request failed:", e);
    }
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

  // =====================================================
  // ✅ FIXED: checkTextDownloadStatus — shows partial progress
  // =====================================================
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

  // =====================================================
  // ✅ FIXED: getDownloadedSurahSet — intersection only
  // =====================================================
  async function getDownloadedSurahSet(qariId) {
    const localSet = getLocalDownloadedSet(qariId);
    const idbSet = new Set();

    try {
      const db = await openDB();
      await new Promise((resolve) => {
        const tx = db.transaction("audio", "readonly");
        const store = tx.objectStore("audio");
        const prefix = qariId + "_surah_";
        const range = IDBKeyRange.bound(prefix, prefix + "\uffff");
        const request = store.openCursor(range);
        request.onsuccess = (ev) => {
          const cursor = ev.target.result;
          if (cursor) {
            if (cursor.value && cursor.value.data && cursor.value.data.size > 1000) {
              const num = parseInt(cursor.key.replace(prefix, ""), 10);
              if (!isNaN(num)) idbSet.add(num);
            }
            cursor.continue();
          } else { resolve(); }
        };
        request.onerror = () => resolve();
      });
      db.close();
    } catch (e) { console.warn("IDB read error:", e); }

    // ✅ INTERSECTION: sirf wahi count karo jo DONO me hai
    const result = new Set();
    localSet.forEach(n => { if (idbSet.has(n)) result.add(n); });
    return result;
  }

  async function checkAudioDownloadStatus() {
    try {
      const qariId = state.downloadQari;
      const set = await getDownloadedSurahSet(qariId);
      const count = set.size;
      const progressBar = document.getElementById("audio-download-progress-bar");
      const fill = progressBar ? progressBar.querySelector(".progress-bar-fill") : null;
      const label = progressBar ? progressBar.querySelector(".progress-label") : null;

      if (count > 0 && progressBar && fill && label) {
        const pct = Math.round((count / 114) * 100);
        progressBar.classList.remove("hidden");
        fill.style.width = pct + "%";
        label.innerHTML = '<strong style="color:var(--primary);">' + pct + '%</strong> • ' + count + '/114 saved';
      } else if (progressBar) {
        progressBar.classList.add("hidden");
      }
    } catch (e) { console.warn("Check audio download error:", e); }
  }

  function navigate(viewName) {
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
    const settingsSel = document.getElementById("select-settings-qari");
    const downloadSel = document.getElementById("select-download-qari");

    if (settingsSel) {
      settingsSel.innerHTML = QARIS_LIST.map(q =>
        `<option value="${q.id}">${q.name} (${q.arabic})</option>`
      ).join("");
      settingsSel.value = state.selectedQari;
    }

    if (downloadSel) {
      downloadSel.innerHTML = QARIS_LIST.map(q =>
        `<option value="${q.id}">${q.name} (${q.arabic})</option>`
      ).join("");
      downloadSel.value = state.downloadQari;
    }
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
      container.innerHTML = `<div style="text-align:center; padding:40px; color:#e11d48;"><p>Failed to load.</p><button class="btn-primary" onclick="quranApp.openSurah(${surahNumber})" style="margin-top:12px;">Retry</button></div>`;
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
        state.audioInstance.removeAttribute('src');
        state.audioInstance.load();
      } catch (e) {}
    }
    if (state.currentObjectURL) {
      try { URL.revokeObjectURL(state.currentObjectURL); } catch (e) {}
      state.currentObjectURL = null;
    }

    const cacheBuster = `?v=${Date.now()}`;
    const onlineUrl = `https://cdn.islamic.network/quran/audio/128/${state.selectedQari}/${ayah.number}.mp3${cacheBuster}`;

    document.getElementById("player-surah-name").innerText = `${surah.englishName} - Ayah ${ayah.numberInSurah}`;
    document.getElementById("player-reciter-name").innerText = qari.name;
    document.getElementById("audio-player-bar").classList.remove("hidden");

    let playUrl = onlineUrl;
    let isSurahCache = false;

    try {
      let cachedBlob = await getCachedSurahAudio(state.selectedQari, surah.number);
      if (cachedBlob) {
        playUrl = URL.createObjectURL(cachedBlob);
        state.currentObjectURL = playUrl;
        isSurahCache = true;
      } else {
        cachedBlob = await getCachedAyahAudio(state.selectedQari, ayah.number);
        if (cachedBlob) {
          playUrl = URL.createObjectURL(cachedBlob);
          state.currentObjectURL = playUrl;
        }
      }
    } catch (err) { console.warn("Cache miss:", err); }

    state.audioInstance = new Audio();
    state.audioInstance.src = playUrl;
    state.audioInstance.playbackRate = state.playbackSpeed;

    if (isSurahCache) {
      state.audioInstance.onloadedmetadata = () => {
        const dur = state.audioInstance.duration;
        if (dur && state.ayahsData.length > 1) {
          const approx = (index / state.ayahsData.length) * dur;
          try { state.audioInstance.currentTime = approx; } catch(e) {}
        }
      };
    }

    state.audioInstance.play().catch(err => {
      console.warn("Play error:", err);
      showToast("Audio play nahi ho saka — internet check karein");
    });

    state.isPlaying = true;
    updatePlayPauseIcon(true);
    highlightPlayingAyah(index);

    state.audioInstance.onended = () => {
      if (isSurahCache) {
        state.isPlaying = false;
        updatePlayPauseIcon(false);
        return;
      }
      if (state.currentPlayingAyahIndex + 1 < state.ayahsData.length) {
        playAyahAudio(state.currentPlayingAyahIndex + 1);
      } else {
        state.isPlaying = false;
        updatePlayPauseIcon(false);
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

  // =====================================================
  // ✅ FIXED: downloadAllQuranText — retry + resume + partial save
  // =====================================================
  async function downloadAllQuranText() {
    if (state.isDownloadingText) return;
    await requestPersistentStorage();

    const btn = document.getElementById("btn-download-all-text");
    const progressBar = document.getElementById("text-download-progress-bar");
    const fill = progressBar.querySelector(".progress-bar-fill");
    const label = progressBar.querySelector(".progress-label");

    // 1. Check partial
    let downloadedSurahs = new Set();
    try {
      downloadedSurahs = await getDownloadedTextSurahSet();
    } catch (e) { console.warn("Partial check failed:", e); }

    // 2. Already complete?
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

    // Initial progress
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

    // Final assembly
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

  // Helper: Get downloaded text surah numbers
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

  // Helper: Assemble final quran_text from individual surahs
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

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking...';
    progressBar.classList.remove("hidden");

    const totalSurahs = SURAHS_LIST.length;

    try {
      const downloadedSet = await getDownloadedSurahSet(qariId);
      const surahsToDownload = SURAHS_LIST.filter(s => !downloadedSet.has(s.number));

      if (surahsToDownload.length === 0) {
        showToast("✅ All 114 Surahs already downloaded");
        fill.style.width = "100%";
        label.innerHTML = '<strong style="color:#22c55e;">✅ All 114 Downloaded</strong>';
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Download Selected Qari Audio';
        state.isDownloadingAudio = false;
        return;
      }

      let successful = downloadedSet.size;
      let failed = 0;
      let quotaError = false;

      const startPct = Math.round((successful / totalSurahs) * 100);
      fill.style.width = startPct + "%";

      const CONCURRENCY = 2;
      const TIMEOUT_MS = 120000;

      function buildSurahUrls(surahNumber) {
        const primary128 = `https://cdn.islamic.network/quran/audio-surah/128/${qariId}/${surahNumber}.mp3`;
        const fallback64 = `https://cdn.islamic.network/quran/audio-surah/64/${qariId}/${surahNumber}.mp3`;
        const proxies = [
          `https://api.allorigins.win/raw?url=${encodeURIComponent(primary128)}`,
          `https://corsproxy.io/?url=${encodeURIComponent(primary128)}`,
          `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(primary128)}`
        ];
        return [primary128, fallback64, ...proxies];
      }

      async function fetchWithTimeout(url, timeout) {
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
          if (!blob || blob.size < 1000) throw new Error("Empty file");
          return blob;
        } catch (err) {
          clearTimeout(id);
          throw err;
        }
      }

      async function downloadSurah(surahNumber) {
        const urls = buildSurahUrls(surahNumber);
        let lastError = null;
        for (let u = 0; u < urls.length; u++) {
          try {
            return await fetchWithTimeout(urls[u], TIMEOUT_MS);
          } catch (err) {
            lastError = err;
          }
        }
        throw lastError || new Error("All sources failed");
      }

      btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${qari.name}...`;
      const db = await openDB();

      for (let i = 0; i < surahsToDownload.length; i += CONCURRENCY) {
        if (quotaError) break;
        const batch = surahsToDownload.slice(i, i + CONCURRENCY);

        await Promise.allSettled(
          batch.map(async (surah) => {
            try {
              const blob = await downloadSurah(surah.number);
              await putSurahAudioBlob(db, qariId, surah.number, blob);
              successful++;
            } catch (err) {
              failed++;
              if (err && (err.name === "QuotaExceededError" || (err.message && err.message.includes("quota")))) {
                quotaError = true;
              }
            }
          })
        );

        const done = successful + failed;
        const pct = Math.round((done / totalSurahs) * 100);
        fill.style.width = pct + "%";
        label.innerHTML = '<strong>' + pct + '%</strong> (' + done + '/' + totalSurahs + ')';
      }

      try { db.close(); } catch (e) {}

      let msg = "✅ " + successful + "/" + totalSurahs + " saved!";
      if (quotaError) msg = "⚠️ Storage full! Only " + successful + " saved.";
      showToast(msg);
      fill.style.width = "100%";

    } catch (err) {
      console.error(err);
      showToast("❌ Download failed: " + (err.message || "Unknown"));
    } finally {
      state.isDownloadingAudio = false;
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Download Selected Qari Audio';
      setTimeout(() => progressBar.classList.add("hidden"), 5000);
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

  async function saveQuranToIndexedDB(data) {
    const db = await openDB();
    const tx = db.transaction("text", "readwrite");
    const store = tx.objectStore("text");
    store.put({ id: "quran_text", data });
    return new Promise((resolve, reject) => { tx.oncomplete = resolve; tx.onerror = reject; });
  }

  // =====================================================
  // ✅ FIXED: putSurahAudioBlob — mark AFTER commit
  // =====================================================
  async function putSurahAudioBlob(db, qariId, surahNum, blob) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction("audio", "readwrite");
      const store = tx.objectStore("audio");
      store.put({ id: `${qariId}_surah_${surahNum}`, data: blob });
      tx.oncomplete = () => {
        markSurahDownloadedLocal(qariId, surahNum);
        resolve(true);
      };
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Aborted"));
    });
  }

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
    } catch (err) { return null; }
  }

  async function getCachedSurahAudio(qariId, surahNum) {
    try {
      const db = await openDB();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction("audio", "readonly");
        const store = tx.objectStore("audio");
        const request = store.get(`${qariId}_surah_${surahNum}`);
        request.onsuccess = () => resolve(request.result ? request.result.data : null);
        request.onerror = () => reject(request.error);
      });
    } catch (err) { return null; }
  }

  function setupEventListeners() {
    document.getElementById("searchNavBtn")?.addEventListener("click", () => navigate("surahs"));
    document.getElementById("btn-resume-reading")?.addEventListener("click", () => { openSurah(state.lastRead.surah); });

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
      if (state.audioInstance) {
        try { state.audioInstance.pause(); state.audioInstance.removeAttribute('src'); state.audioInstance.load(); } catch (err) {}
      }
      if (state.currentObjectURL) {
        try { URL.revokeObjectURL(state.currentObjectURL); } catch (err) {}
        state.currentObjectURL = null;
      }
      state.isPlaying = false;
      updatePlayPauseIcon(false);
      document.getElementById("audio-player-bar")?.classList.add("hidden");
      const qari = QARIS_LIST.find(q => q.id === state.selectedQari);
      showToast("Qari: " + (qari ? qari.name : ""));
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
// UNIVERSAL BACK BUTTON HANDLER (Smart)
// ======================================
(function () {
    "use strict";

    // Detect if current page is HOME (index.html)
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
        if (
            !window.Capacitor ||
            !window.Capacitor.Plugins ||
            !window.Capacitor.Plugins.App
        ) {
            console.log("🌐 Browser mode — no native back");
            return;
        }

        const { App } = window.Capacitor.Plugins;

        App.addListener("backButton", async function () {

            // 1. Any overlay / modal / panel open? → close it
            const overlay = document.querySelector(
                ".dua-reader.show, " +
                ".name-detail-overlay.active, " +
                ".modal.show, " +
                ".modal.active, " +
                ".ayah-detail.show, " +
                ".more-menu.show, " +
                ".more-menu.open"
            );
            if (overlay) {
                overlay.classList.remove("show", "active", "open");
                return;
            }

            // 2. Campus settings panel (display-based)
            const campusPanel = document.getElementById("campusSettingsPanel");
            if (campusPanel && campusPanel.style.display === "block") {
                campusPanel.style.display = "none";
                return;
            }

            // 3. More menu (double check)
            const menu = document.getElementById("moreMenu");
            if (menu && (menu.classList.contains("show") || menu.classList.contains("open"))) {
                menu.classList.remove("show");
                menu.classList.remove("open");
                return;
            }

            // 4. Quran internal sub-view? → go to home view
            const activeView = document.querySelector(".view-screen.active");
            if (activeView && activeView.id !== "view-home") {
                if (typeof window.goBack === "function") {
                    window.goBack();
                    return;
                }
            }

            // 5. WebView history available? → go back
            try {
                const canGoBack = await App.canGoBack();
                if (canGoBack) {
                    await App.goBack();
                    return;
                }
            } catch (e) {
                console.warn("canGoBack failed:", e);
            }

            // 6. ✅ Not home page? → navigate to HOME instead of exiting
            if (!isHomePage()) {
                window.location.href = "../index.html";
                return;
            }

            // 7. ✅ Home page pe hain → exit app
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
// STATE SAVE / RESTORE (Quran ↔ Other pages)
// ======================================

document.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (href && !href.startsWith("#") && !href.startsWith("javascript")) {
        try {
            const searchInput = document.getElementById("surah-search-input");
            sessionStorage.setItem("quranState", JSON.stringify({
                view: (typeof state !== "undefined" ? state.currentView : "home"),
                surah: (typeof state !== "undefined" ? state.selectedSurah : 1),
                history: (typeof state !== "undefined" ? state.history : ["home"]),
                searchQuery: searchInput ? searchInput.value : ""
            }));
        } catch (err) {
            console.warn("Quran state save failed:", err);
        }
    }
}, true);

(function restoreQuranState() {
    const saved = sessionStorage.getItem("quranState");
    if (!saved) return;
    try {
        const s = JSON.parse(saved);
        sessionStorage.removeItem("quranState");

        if (!s || !s.history) return;

        function doRestore() {
            try {
                if (typeof state === "undefined") return;
                state.history = s.history || ["home"];
                state.selectedSurah = s.surah || 1;

                if (s.searchQuery) {
                    const inp = document.getElementById("surah-search-input");
                    if (inp) {
                        inp.value = s.searchQuery;
                        const evt = new Event("input", { bubbles: true });
                        inp.dispatchEvent(evt);
                    }
                }

                if (s.view === "reader" && s.surah) {
                    if (typeof window.quranApp !== "undefined") {
                        window.quranApp.openSurah(s.surah);
                    }
                } else if (s.view && s.view !== "home") {
                    if (typeof window.quranApp !== "undefined") {
                        window.quranApp.navigate(s.view);
                    }
                }
            } catch (err) {
                console.warn("Quran state restore failed:", err);
            }
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", doRestore);
        } else {
            setTimeout(doRestore, 100);
        }
    } catch (err) {
        console.warn("Quran state parse failed:", err);
    }
})();