// ======================================
// MY PRAYER - 99 NAMES OF ALLAH
// DETAIL PAGE SYSTEM
// AUDIO TOP + NAVIGATION INSIDE CARD
// ======================================



// ======================================
// 99 NAMES
// ======================================

const namesOfAllah = [

    {
        number: 1,
        arabic: "الرَّحْمَنُ",
        english: "Ar-Rahman",
        urdu: "نہایت رحم کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 2,
        arabic: "الرَّحِيمُ",
        english: "Ar-Raheem",
        urdu: "بہت رحم کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 3,
        arabic: "الْمَلِكُ",
        english: "Al-Malik",
        urdu: "بادشاہ",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 4,
        arabic: "الْقُدُّوسُ",
        english: "Al-Quddus",
        urdu: "نہایت پاک",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 5,
        arabic: "السَّلَامُ",
        english: "As-Salam",
        urdu: "سلامتی دینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 6,
        arabic: "الْمُؤْمِنُ",
        english: "Al-Mu'min",
        urdu: "امن دینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 7,
        arabic: "الْمُهَيْمِنُ",
        english: "Al-Muhaymin",
        urdu: "نگہبان",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 8,
        arabic: "الْعَزِيزُ",
        english: "Al-Aziz",
        urdu: "زبردست، غالب",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 9,
        arabic: "الْجَبَّارُ",
        english: "Al-Jabbar",
        urdu: "زبردست اقتدار والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 10,
        arabic: "الْمُتَكَبِّرُ",
        english: "Al-Mutakabbir",
        urdu: "بڑائی والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 11,
        arabic: "الْخَالِقُ",
        english: "Al-Khaliq",
        urdu: "پیدا کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 12,
        arabic: "الْبَارِئُ",
        english: "Al-Bari",
        urdu: "وجود میں لانے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 13,
        arabic: "الْمُصَوِّرُ",
        english: "Al-Musawwir",
        urdu: "صورت بنانے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 14,
        arabic: "الْغَفَّارُ",
        english: "Al-Ghaffar",
        urdu: "بہت بخشنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 15,
        arabic: "الْقَهَّارُ",
        english: "Al-Qahhar",
        urdu: "سب پر غالب",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 16,
        arabic: "الْوَهَّابُ",
        english: "Al-Wahhab",
        urdu: "بہت عطا کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 17,
        arabic: "الرَّزَّاقُ",
        english: "Ar-Razzaq",
        urdu: "رزق دینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 18,
        arabic: "الْفَتَّاحُ",
        english: "Al-Fattah",
        urdu: "فتح دینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 19,
        arabic: "الْعَلِيمُ",
        english: "Al-Alim",
        urdu: "سب کچھ جاننے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 20,
        arabic: "الْقَابِضُ",
        english: "Al-Qabid",
        urdu: "قبض کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 21,
        arabic: "الْبَاسِطُ",
        english: "Al-Basit",
        urdu: "کشادگی دینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 22,
        arabic: "الْخَافِضُ",
        english: "Al-Khafid",
        urdu: "پست کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 23,
        arabic: "الرَّافِعُ",
        english: "Ar-Rafi",
        urdu: "بلند کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 24,
        arabic: "الْمُعِزُّ",
        english: "Al-Mu'izz",
        urdu: "عزت دینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 25,
        arabic: "الْمُذِلُّ",
        english: "Al-Mudhill",
        urdu: "ذلت دینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 26,
        arabic: "السَّمِيعُ",
        english: "As-Sami",
        urdu: "سب کچھ سننے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 27,
        arabic: "الْبَصِيرُ",
        english: "Al-Basir",
        urdu: "سب کچھ دیکھنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 28,
        arabic: "الْحَكَمُ",
        english: "Al-Hakam",
        urdu: "فیصلہ کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 29,
        arabic: "الْعَدْلُ",
        english: "Al-Adl",
        urdu: "نہایت انصاف کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 30,
        arabic: "اللَّطِيفُ",
        english: "Al-Latif",
        urdu: "نہایت مہربان، باریک بین",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 31,
        arabic: "الْخَبِيرُ",
        english: "Al-Khabir",
        urdu: "باخبر",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 32,
        arabic: "الْحَلِيمُ",
        english: "Al-Halim",
        urdu: "بہت بردبار",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 33,
        arabic: "الْعَظِيمُ",
        english: "Al-Azim",
        urdu: "بہت عظمت والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 34,
        arabic: "الْغَفُورُ",
        english: "Al-Ghafur",
        urdu: "بہت بخشنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 35,
        arabic: "الشَّكُورُ",
        english: "Ash-Shakur",
        urdu: "قدر دان",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 36,
        arabic: "الْعَلِيُّ",
        english: "Al-Ali",
        urdu: "سب سے بلند",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 37,
        arabic: "الْكَبِيرُ",
        english: "Al-Kabir",
        urdu: "بہت بڑا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 38,
        arabic: "الْحَفِيظُ",
        english: "Al-Hafiz",
        urdu: "حفاظت کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 39,
        arabic: "الْمُقِيتُ",
        english: "Al-Muqit",
        urdu: "روزی اور قوت دینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 40,
        arabic: "الْحسِيبُ",
        english: "Al-Hasib",
        urdu: "حساب لینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 41,
        arabic: "الْجَلِيلُ",
        english: "Al-Jalil",
        urdu: "بزرگی والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 42,
        arabic: "الْكَرِيمُ",
        english: "Al-Karim",
        urdu: "نہایت سخی",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 43,
        arabic: "الرَّقِيبُ",
        english: "Ar-Raqib",
        urdu: "نگرانی کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 44,
        arabic: "الْمُجِيبُ",
        english: "Al-Mujib",
        urdu: "دعا قبول کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 45,
        arabic: "الْوَاسِعُ",
        english: "Al-Wasi",
        urdu: "کشادگی والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 46,
        arabic: "الْحَكِيمُ",
        english: "Al-Hakim",
        urdu: "حکمت والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 47,
        arabic: "الْوَدُودُ",
        english: "Al-Wadud",
        urdu: "محبت کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 48,
        arabic: "الْمَجِيدُ",
        english: "Al-Majid",
        urdu: "بزرگ و برتر",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 49,
        arabic: "الْبَاعِثُ",
        english: "Al-Ba'ith",
        urdu: "اٹھانے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 50,
        arabic: "الشَّهِيدُ",
        english: "Ash-Shahid",
        urdu: "گواہ",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 51,
        arabic: "الْحَقُّ",
        english: "Al-Haqq",
        urdu: "حق",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 52,
        arabic: "الْوَكِيلُ",
        english: "Al-Wakil",
        urdu: "کارساز",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 53,
        arabic: "الْقَوِيُّ",
        english: "Al-Qawiyy",
        urdu: "بہت طاقتور",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 54,
        arabic: "الْمَتِينُ",
        english: "Al-Matin",
        urdu: "مضبوط",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 55,
        arabic: "الْوَلِيُّ",
        english: "Al-Wali",
        urdu: "مددگار",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 56,
        arabic: "الْحَمِيدُ",
        english: "Al-Hamid",
        urdu: "قابل حمد",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 57,
        arabic: "الْمُحْصِي",
        english: "Al-Muhsi",
        urdu: "شمار کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 58,
        arabic: "الْمُبْدِئُ",
        english: "Al-Mubdi",
        urdu: "پہلی بار پیدا کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 59,
        arabic: "الْمُعِيدُ",
        english: "Al-Muid",
        urdu: "دوبارہ پیدا کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 60,
        arabic: "الْمُحْيِي",
        english: "Al-Muhyi",
        urdu: "زندگی دینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 61,
        arabic: "الْمُمِيتُ",
        english: "Al-Mumit",
        urdu: "موت دینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 62,
        arabic: "الْحَيُّ",
        english: "Al-Hayy",
        urdu: "ہمیشہ زندہ",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 63,
        arabic: "الْقَيُّومُ",
        english: "Al-Qayyum",
        urdu: "سب کو قائم رکھنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 64,
        arabic: "الْوَاجِدُ",
        english: "Al-Wajid",
        urdu: "پانے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 65,
        arabic: "الْمَاجِدُ",
        english: "Al-Majid",
        urdu: "بزرگ و کریم",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 66,
        arabic: "الْوَاحِدُ",
        english: "Al-Wahid",
        urdu: "ایک",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 67,
        arabic: "الْأَحَدُ",
        english: "Al-Ahad",
        urdu: "یکتا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 68,
        arabic: "الصَّمَدُ",
        english: "As-Samad",
        urdu: "بے نیاز",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 69,
        arabic: "الْقَادِرُ",
        english: "Al-Qadir",
        urdu: "قدرت والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 70,
        arabic: "الْمُقْتَدِرُ",
        english: "Al-Muqtadir",
        urdu: "مکمل قدرت والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 71,
        arabic: "الْمُقَدِّمُ",
        english: "Al-Muqaddim",
        urdu: "آگے کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 72,
        arabic: "الْمُؤَخِّرُ",
        english: "Al-Mu'akhkhir",
        urdu: "پیچھے کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 73,
        arabic: "الْأَوَّلُ",
        english: "Al-Awwal",
        urdu: "سب سے پہلا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 74,
        arabic: "الْآخِرُ",
        english: "Al-Akhir",
        urdu: "سب سے آخر",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 75,
        arabic: "الظَّاهِرُ",
        english: "Az-Zahir",
        urdu: "ظاہر",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 76,
        arabic: "الْبَاطِنُ",
        english: "Al-Batin",
        urdu: "پوشیدہ",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 77,
        arabic: "الْوَالِي",
        english: "Al-Wali",
        urdu: "حاکم",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 78,
        arabic: "الْمُتَعَالِي",
        english: "Al-Muta'ali",
        urdu: "بہت بلند",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 79,
        arabic: "الْبَرُّ",
        english: "Al-Barr",
        urdu: "نیکی اور احسان کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 80,
        arabic: "التَّوَابُ",
        english: "At-Tawwab",
        urdu: "توبہ قبول کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 81,
        arabic: "الْمُنْتَقِمُ",
        english: "Al-Muntaqim",
        urdu: "بدلہ لینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 82,
        arabic: "الْعَفُوُّ",
        english: "Al-Afuww",
        urdu: "معاف کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 83,
        arabic: "الرَّؤُوفُ",
        english: "Ar-Ra'uf",
        urdu: "نہایت شفقت کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 84,
        arabic: "مَالِكُ الْمُلْكِ",
        english: "Malik-ul-Mulk",
        urdu: "بادشاہی کا مالک",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 85,
        arabic: "ذُو الْجَلَالِ وَالْإِكْرَامِ",
        english: "Dhul-Jalali wal-Ikram",
        urdu: "جلال اور اکرام والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 86,
        arabic: "الْمُقْسِطُ",
        english: "Al-Muqsit",
        urdu: "انصاف قائم کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 87,
        arabic: "الْجَامِعُ",
        english: "Al-Jami",
        urdu: "جمع کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 88,
        arabic: "الْغَنِيُّ",
        english: "Al-Ghani",
        urdu: "بے نیاز",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 89,
        arabic: "الْمُغْنِي",
        english: "Al-Mughni",
        urdu: "غنی کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 90,
        arabic: "الْمَانِعُ",
        english: "Al-Mani",
        urdu: "روکنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 91,
        arabic: "الضَّارُّ",
        english: "Ad-Darr",
        urdu: "نقصان پہنچانے پر قادر",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 92,
        arabic: "النَّافِعُ",
        english: "An-Nafi",
        urdu: "نفع پہنچانے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 93,
        arabic: "النُّورُ",
        english: "An-Nur",
        urdu: "نور",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 94,
        arabic: "الْهَادِي",
        english: "Al-Hadi",
        urdu: "ہدایت دینے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 95,
        arabic: "الْبَدِيعُ",
        english: "Al-Badi",
        urdu: "بے مثال پیدا کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 96,
        arabic: "الْبَاقِي",
        english: "Al-Baqi",
        urdu: "ہمیشہ باقی رہنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 97,
        arabic: "الْوَارِثُ",
        english: "Al-Warith",
        urdu: "وارث",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 98,
        arabic: "الرَّشِيدُ",
        english: "Ar-Rashid",
        urdu: "درست راہ دکھانے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    },

    {
        number: 99,
        arabic: "الصَّبُورُ",
        english: "As-Sabur",
        urdu: "بہت صبر کرنے والا",
        when: "مخصوص وقت مقرر نہیں",
        count: "مخصوص تعداد مقرر نہیں"
    }

];



// ======================================
// ELEMENTS
// ======================================

const currentNameNumber =
    document.getElementById("currentNameNumber");

const detailArabic =
    document.getElementById("detailArabic");

const detailEnglish =
    document.getElementById("detailEnglish");

const detailUrdu =
    document.getElementById("detailUrdu");

const detailWhen =
    document.getElementById("detailWhen");

const detailCount =
    document.getElementById("detailCount");

const favoriteNameBtn =
    document.getElementById("favoriteNameBtn");

const previousNameBtn =
    document.getElementById("previousNameBtn");

const nextNameBtn =
    document.getElementById("nextNameBtn");

const mainAudioBtn =
    document.getElementById("mainAudioBtn");

const nameAudio =
    document.getElementById("nameAudio");

const audioProgressBar =
    document.getElementById("audioProgressBar");

const namesHomeBtn =
    document.getElementById("namesHomeBtn");

const namesSettingsBtn =
    document.getElementById("namesSettingsBtn");



// ======================================
// VARIABLES
// ======================================

let currentIndex = 0;


let favoriteNames =
    JSON.parse(
        localStorage.getItem("favoriteNames") || "[]"
    );



// ======================================
// GET READING INFO
// ======================================

function getReadingInfo(name){

    return {

        when:
            name.when ||
            "مخصوص وقت مقرر نہیں",

        count:
            name.count ||
            "مخصوص تعداد مقرر نہیں"

    };

}



// ======================================
// SHOW NAME
// ======================================

function showName(index){

    if(index < 0){

        index = 0;

    }


    if(index >= namesOfAllah.length){

        index =
            namesOfAllah.length - 1;

    }


    currentIndex = index;


    const name =
        namesOfAllah[currentIndex];


    const readingInfo =
        getReadingInfo(name);



    // ==================================
    // UPDATE CONTENT
    // ==================================

    currentNameNumber.textContent =
        String(name.number).padStart(2, "0");


    detailArabic.textContent =
        name.arabic;


    detailEnglish.textContent =
        name.english;


    detailUrdu.textContent =
        name.urdu;


    detailWhen.textContent =
        readingInfo.when;


    detailCount.textContent =
        readingInfo.count;



    // ==================================
    // UPDATE FAVORITE
    // ==================================

    updateFavoriteButton();



    // ==================================
    // UPDATE NAVIGATION
    // ==================================

    updateNavigation();



    // ==================================
    // RESET AUDIO FOR NEW NAME
    // ==================================

    resetAudio();


    // IMPORTANT:
    // No window.scrollTo()
    // Screen will stay at current position.

}



// ======================================
// NEXT NAME
// ======================================

nextNameBtn.addEventListener(
    "click",
    function(){

        if(
            currentIndex <
            namesOfAllah.length - 1
        ){

            showName(
                currentIndex + 1
            );

        }

    }
);



// ======================================
// PREVIOUS NAME
// ======================================

previousNameBtn.addEventListener(
    "click",
    function(){

        if(currentIndex > 0){

            showName(
                currentIndex - 1
            );

        }

    }
);



// ======================================
// UPDATE NAVIGATION
// ======================================

function updateNavigation(){

    previousNameBtn.disabled =
        currentIndex === 0;


    nextNameBtn.disabled =
        currentIndex ===
        namesOfAllah.length - 1;

}



// ======================================
// FAVORITE BUTTON
// ======================================

function updateFavoriteButton(){

    const number =
        namesOfAllah[currentIndex].number;


    const isFavorite =
        favoriteNames.includes(number);


    if(isFavorite){

        favoriteNameBtn.innerHTML =

            '<i class="fa-solid fa-heart"></i>' +
            ' Favorite';


        favoriteNameBtn.classList.add(
            "favorite-active"
        );

    }
    else{

        favoriteNameBtn.innerHTML =

            '<i class="fa-regular fa-heart"></i>' +
            ' Favorite';


        favoriteNameBtn.classList.remove(
            "favorite-active"
        );

    }

}



// ======================================
// FAVORITE CLICK
// ======================================

favoriteNameBtn.addEventListener(
    "click",
    function(){

        const number =
            namesOfAllah[currentIndex].number;


        if(
            favoriteNames.includes(number)
        ){

            favoriteNames =
                favoriteNames.filter(
                    function(item){

                        return item !== number;

                    }
                );

        }
        else{

            favoriteNames.push(number);

        }


        localStorage.setItem(
            "favoriteNames",
            JSON.stringify(favoriteNames)
        );


        updateFavoriteButton();

    }
);



// ======================================
// AUDIO PLAY / PAUSE
// ======================================

mainAudioBtn.addEventListener(
    "click",
    function(){

        if(nameAudio.paused){

            nameAudio.play()
            .catch(function(error){

                console.log(
                    "Audio error:",
                    error
                );

            });

        }
        else{

            nameAudio.pause();

        }

    }
);



// ======================================
// AUDIO PLAY
// ======================================

nameAudio.addEventListener(
    "play",
    function(){

        mainAudioBtn.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

    }
);



// ======================================
// AUDIO PAUSE
// ======================================

nameAudio.addEventListener(
    "pause",
    function(){

        mainAudioBtn.innerHTML =
            '<i class="fa-solid fa-play"></i>';

    }
);



// ======================================
// AUDIO PROGRESS
// ======================================

nameAudio.addEventListener(
    "timeupdate",
    function(){

        if(
            !nameAudio.duration ||
            !isFinite(nameAudio.duration)
        ){

            return;

        }


        const percent =

            (
                nameAudio.currentTime /
                nameAudio.duration
            ) * 100;


        audioProgressBar.style.width =
            percent + "%";

    }
);



// ======================================
// AUDIO ENDED
// ======================================

nameAudio.addEventListener(
    "ended",
    function(){

        audioProgressBar.style.width =
            "0%";


        mainAudioBtn.innerHTML =
            '<i class="fa-solid fa-play"></i>';

    }
);



// ======================================
// RESET AUDIO
// ======================================

function resetAudio(){

    nameAudio.pause();


    nameAudio.currentTime = 0;


    audioProgressBar.style.width =
        "0%";


    mainAudioBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';

}



// ======================================
// HOME BUTTON
// ======================================

namesHomeBtn.addEventListener(
    "click",
    function(){

        window.location.href =
            "../index.html";

    }
);



// ======================================
// SETTINGS
// ======================================

namesSettingsBtn.addEventListener(
    "click",
    function(){

        alert(
            "Settings will be added soon."
        );

    }
);



// ======================================
// AUDIO ERROR
// ======================================

nameAudio.addEventListener(
    "error",
    function(){

        console.log(
            "99 Names audio file could not be loaded."
        );

    }
);



// ======================================
// KEYBOARD NAVIGATION
// ======================================

document.addEventListener(
    "keydown",
    function(event){

        if(event.key === "ArrowRight"){

            nextNameBtn.click();

        }


        if(event.key === "ArrowLeft"){

            previousNameBtn.click();

        }

    }
);



// ======================================
// SWIPE NAVIGATION
// ======================================

let touchStartX = 0;


let touchEndX = 0;



document.addEventListener(
    "touchstart",
    function(event){

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive:true }
);



document.addEventListener(
    "touchend",
    function(event){

        touchEndX =
            event.changedTouches[0].screenX;


        const difference =
            touchEndX - touchStartX;


        if(Math.abs(difference) < 60){

            return;

        }


        if(difference < 0){

            nextNameBtn.click();

        }
        else{

            previousNameBtn.click();

        }

    },
    { passive:true }
);



// ======================================
// START APP
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        showName(0);

    }
);