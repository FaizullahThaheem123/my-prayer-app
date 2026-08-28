// ======================================
// MY PRAYER - DAILY DUAS (ONLINE & OFFLINE DOWNLOAD)
// FIXED: Mobile navigation + audio
// ======================================

const duas = [
    {
        id: "ayatul-kursi",
        title: "Ayatul Kursi",
        titleUrdu: "آیت الکرسی",
        category: "protection",
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضِ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        transliteration: "Allahu la ilaha illa Huwal-Hayyul-Qayyum...",
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
        transliteration: "Wa dhan-nooni idh dhahaba mughadiban...",
        meaning: "And [mention] the man of the fish...",
        urdu: "اور مچھلی والے (حضرت یونس علیہ السلام) کو یاد کرو...",
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
        transliteration: "Allahumma Anta Rabbee...",
        meaning: "O Allah, You are my Lord...",
        urdu: "اے اللہ! تو ہی میرا رب ہے...",
        reference: "Sahih al-Bukhari 6306",
        virtues: "صبح یا شام یقین کے ساتھ پڑھ کر وفات پانے والا سیدھا جنتی ہے۔",
        audio: "https://archive.org/download/SayyidulIstighfar/Sayyidul%20Istighfar.mp3"
    },
    {
        id: "anxiety-grief",
        title: "Dua for Relief from Stress, Worry & Debt",
        titleUrdu: "پریشانی، غم اور قرض سے نجات کی دعا",
        category: "peace",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        transliteration: "Allahumma innee a'oodhu bika...",
        meaning: "O Allah, I seek refuge in You from grief...",
        urdu: "اے اللہ! میں غم، پریشانی...",
        reference: "Sahih al-Bukhari 2893",
        virtues: "دل کے سکون اور بوجھ کو ہلکا کرنے والی مسنون دعا۔",
        audio: "https://archive.org/download/DuaForAnxiety/Dua%20for%20Anxiety.mp3"
    },
    {
        id: "morning-dua",
        title: "Morning Dua",
        titleUrdu: "صبح کے وقت کی دعا",
        category: "daily",
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
        transliteration: "Allahumma bika asbahna...",
        meaning: "O Allah, by You we enter the morning...",
        urdu: "اے اللہ! تیرے ہی فضل سے ہم نے صبح کی...",
        reference: "Sunan Abu Dawood 5068",
        virtues: "پورے دن کو برکت اور اللہ کی پناہ میں رکھنے کے لیے۔",
        audio: "https://archive.org/download/MorningDua/Morning%20Dua.mp3"
    },
    {
        id: "evening-dua",
        title: "Evening Dua",
        titleUrdu: "شام کے وقت کی دعا",
        category: "daily",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        transliteration: "Amsayna wa amsal-mulku lillah...",
        meaning: "We have reached the evening...",
        urdu: "ہم نے شام کی اور تمام بادشاہی اللہ ہی کے لیے ہے...",
        reference: "Sahih Muslim 2723",
        virtues: "رات بھر شرور اور آفات سے پناہ۔",
        audio: "https://archive.org/download/EveningDua/Evening%20Dua.mp3"
    },
    {
        id: "afiyah-health",
        title: "Dua for Complete Health & Security (Al-Afiyah)",
        titleUrdu: "عافیت اور سلامتی کی جامع دعا",
        category: "healing",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
        transliteration: "Allahumma innee as'alukal-'afwa...",
        meaning: "O Allah, I ask You for pardon and well-being...",
        urdu: "اے اللہ! میں تجھ سے دنیا، آخرت، دین...",
        reference: "Sunan Abu Dawood 5074",
        virtues: "حضور ﷺ صبح و شام یہ دعا کبھی ترک نہیں فرماتے تھے۔",
        audio: "https://archive.org/download/DuaAlAfiyah/Dua%20Al%20Afiyah.mp3"
    },
    {
        id: "hasbiyallahu",
        title: "Sufficiency of Allah (Hasbiyallahu)",
        titleUrdu: "حسبی اللہ (اللہ میرے لیے کافی ہے)",
        category: "peace",
        arabic: "فَإِن تَوَلَّوْا فَقُلْ حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        transliteration: "Fa in tawallaw faqul hasbiyallahu...",
        meaning: "But if they turn away, say, 'Allah is sufficient for me...'",
        urdu: "پھر اگر وہ منہ موڑ لیں تو کہہ دیجئے: میرے لیے اللہ ہی کافی ہے...",
        reference: "Surah At-Tawbah 9:129",
        virtues: "صبح و شام ۷ بار پڑھنے سے اللہ تمام غموں کے لیے کافی ہو جاتا ہے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/009129.mp3"
    },
    {
        id: "musa-ease",
        title: "Dua for Mental Peace & Ease (Rabbi Ishrah Lee)",
        titleUrdu: "دعائے حضرت موسیٰ (رب اشرح لی صدری)",
        category: "peace",
        arabic: " قَالَ رَبِّ اشْرَحْ لِي صَدْرِي ﴿٢٥﴾",
        transliteration: "Rabbish-rah lee sadree.",
        meaning: "My Lord, expand for me my chest.",
        urdu: "اے میرے پروردگار! میرے لیے میرا سینہ کھول دے۔",
        reference: "Surah Ta-Ha 20:25",
        virtues: "امتحان، انٹرویو اور مشکل کاموں میں آسانی و دل کی کشادگی کے لیے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/020025.mp3"
    },
    {
        id: "rizq-musa",
        title: "Dua for Rizq & Job (Rabbi Inni Lima Anzalta)",
        titleUrdu: "رزق اور حلال روزی کی دعا",
        category: "sustenance",
        arabic: "فَسَقَىٰ لَهُمَا ثُمَّ تَوَلَّىٰ إِلَى الظِّلِّ فَقَالَ رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
        transliteration: "Fasaqa lahuma...",
        meaning: "So he watered [their flocks] for them...",
        urdu: "تو انہوں نے ان کے جانوروں کو پانی پلا دیا...",
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
        transliteration: "Wakhfid lahuma...",
        meaning: "And lower to them the wing of humility...",
        urdu: "اور ان کے سامنے نرمی اور محبت سے عاجزی کے ساتھ جھک جاؤ...",
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
        transliteration: "Litastawoo 'ala zuhoorihee...",
        meaning: "That you may settle yourselves upon their backs...",
        urdu: "تاکہ تم ان کی پیٹھوں پر ٹھیک طرح بیٹھو...",
        reference: "Surah Az-Zukhruf 43:13-14",
        virtues: "سفر میں ہر قسم کے حادثات اور پریشانیوں سے حفاظت۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/043013.mp3"
    },
    // 18 NEW DUAS (as before, all have correct audio URLs)
    {
        id: "adam-forgiveness",
        title: "Dua of Prophet Adam (Forgiveness)",
        titleUrdu: "دعائے حضرت آدم علیہ السلام (توبہ و مغفرت)",
        category: "forgiveness",
        arabic: "قَالَا رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
        transliteration: "Qala Rabbana zalamna anfusana...",
        meaning: "They said, 'Our Lord, we have wronged ourselves...'",
        urdu: "دونوں نے کہا: اے ہمارے رب! ہم نے اپنی جانوں پر ظلم کیا...",
        reference: "Surah Al-A'raf 7:23",
        virtues: "توبہ کی سب سے پہلی اور مقبول ترین قرآنی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/007023.mp3"
    },
    {
        id: "tawakkul-verse",
        title: "Dua for Trust in Allah's Decree",
        titleUrdu: "توکل کی آیت",
        category: "peace",
        arabic: "قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا هُوَ مَوْلَانَا ۚ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ",
        transliteration: "Qul lan yuseebana...",
        meaning: "Say, 'Never will we be struck except by what Allah has decreed...'",
        urdu: "کہہ دیجئے! ہمیں ہرگز کوئی چیز نہیں پہنچے گی...",
        reference: "Surah At-Tawbah 9:51",
        virtues: "پریشانی اور خوف کے وقت دل کو تقدیر پر راضی رکھنے والی آیت۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/009051.mp3"
    },
    {
        id: "dua-hasanah",
        title: "Dua for Good in This World & Hereafter",
        titleUrdu: "دعائے ربنا آتنا",
        category: "daily",
        arabic: "وَمِنْهُم مَّن يَقُولُ رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Wa minhum man yaqoolu...",
        meaning: "And among them is he who says...",
        urdu: "اور انہی میں سے وہ بھی ہیں جو کہتے ہیں...",
        reference: "Surah Al-Baqarah 2:201",
        virtues: "روزانہ پڑھی جانے والی سب سے جامع اور مقبول قرآنی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/002201.mp3"
    },
    {
        id: "dua-steadfast-heart",
        title: "Dua for a Steadfast Heart",
        titleUrdu: "دعائے ثباتِ قلب",
        category: "daily",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ",
        transliteration: "Rabbana la tuzigh quloobana...",
        meaning: "Our Lord, let not our hearts deviate...",
        urdu: "اے ہمارے رب! ہمیں ہدایت دینے کے بعد ہمارے دلوں کو ٹیڑھا نہ کر...",
        reference: "Surah Aal-e-Imran 3:8",
        virtues: "دل کو ایمان اور ہدایت پر ثابت قدم رکھنے کے لیے روزانہ پڑھنے کی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/003008.mp3"
    },
    {
        id: "dua-shifa",
        title: "Dua of Prophet Ibrahim for Healing (Shifa)",
        titleUrdu: "دعائے شفا",
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
        id: "ibrahim-acceptance",
        title: "Dua of Prophet Ibrahim (Acceptance of Deeds)",
        titleUrdu: "دعائے حضرت ابراہیم علیہ السلام (قبولیتِ عمل)",
        category: "quranic",
        arabic: "وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
        transliteration: "Wa idh yarfa'u Ibraheemul...",
        meaning: "And when Ibrahim was raising the foundations...",
        urdu: "اور جب ابراہیم اور اسماعیل علیہما السلام خانہ کعبہ کی بنیادیں اٹھا رہے تھے...",
        reference: "Surah Al-Baqarah 2:127",
        virtues: "کسی نیک عمل کی تکمیل کے بعد اس کی قبولیت کی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/002127.mp3"
    },
    {
        id: "muslimayn-dua",
        title: "Dua for Steadfastness in Islam",
        titleUrdu: "دعائے استقامتِ اسلام",
        category: "quranic",
        arabic: "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مِّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا ۖ إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ",
        transliteration: "Rabbana waj'alna muslimayni...",
        meaning: "Our Lord, and make us Muslims...",
        urdu: "اے ہمارے رب! ہمیں اپنا فرمانبردار بنا...",
        reference: "Surah Al-Baqarah 2:128",
        virtues: "اپنی اور اپنی نسل کی ہدایت اور دین پر استقامت کے لیے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/002128.mp3"
    },
    {
        id: "dawud-patience",
        title: "Dua for Patience & Victory (Dawud & Talut)",
        titleUrdu: "دعائے صبر و نصرت",
        category: "peace",
        arabic: "وَلَمَّا بَرَزُوا لِجَالُوتَ وَجُنُودِهِ قَالُوا رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
        transliteration: "Wa lamma barazoo li-Jaloota...",
        meaning: "And when they went forth to face Goliath...",
        urdu: "اور جب وہ جالوت اور اس کے لشکر کے مقابلے میں نکلے...",
        reference: "Surah Al-Baqarah 2:250",
        virtues: "مشکل اور خوفناک حالات میں صبر اور فتح کے لیے مجرب دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/002250.mp3"
    },
    {
        id: "yawm-al-qiyamah",
        title: "Dua Affirming Faith in the Day of Judgment",
        titleUrdu: "دعائے یقینِ آخرت",
        category: "quranic",
        arabic: "رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لَّا رَيْبَ فِيهِ ۚ إِنَّ اللَّهَ لَا يُخْلِفُ الْمِيعَادَ",
        transliteration: "Rabbana innaka jami'un-nasi...",
        meaning: "Our Lord, surely You will gather the people...",
        urdu: "اے ہمارے رب! بے شک تو ہی لوگوں کو اس دن جمع کرنے والا ہے...",
        reference: "Surah Aal-e-Imran 3:9",
        virtues: "آخرت پر ایمان اور یقین کو مضبوط کرنے والی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/003009.mp3"
    },
    {
        id: "dua-belief-forgiveness",
        title: "Dua of the Believers for Forgiveness",
        titleUrdu: "اہلِ ایمان کی دعائے مغفرت",
        category: "forgiveness",
        arabic: "الَّذِينَ يَقُولُونَ رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Alladheena yaqooloona...",
        meaning: "Those who say, 'Our Lord, indeed we have believed...'",
        urdu: "وہ لوگ جو کہتے ہیں: اے ہمارے رب! بے شک ہم ایمان لائے...",
        reference: "Surah Aal-e-Imran 3:16",
        virtues: "سچے ایمان والوں کی صفت اور ان کی دعائے مغفرت۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/003016.mp3"
    },
    {
        id: "witness-truth",
        title: "Dua to be Counted Among the Witnesses of Truth",
        titleUrdu: "دعائے شہادتِ حق",
        category: "quranic",
        arabic: "رَبَّنَا آمَنَّا بِمَا أَنزَلْتَ وَاتَّبَعْنَا الرَّسُولَ فَاكْتُبْنَا مَعَ الشَّاهِدِينَ",
        transliteration: "Rabbana amanna bima anzalta...",
        meaning: "Our Lord, we have believed in what You revealed...",
        urdu: "اے ہمارے رب! ہم اس پر ایمان لائے جو تو نے نازل فرمایا...",
        reference: "Surah Aal-e-Imran 3:53",
        virtues: "ایمان اور اتباعِ رسول پر ثابت قدمی کی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/003053.mp3"
    },
    {
        id: "steadfast-victory",
        title: "Dua for Forgiveness & Firmness in Trials",
        titleUrdu: "دعائے مغفرت و ثباتِ قدم",
        category: "forgiveness",
        arabic: "وَمَا كَانَ قَوْلَهُمْ إِلَّا أَن قَالُوا رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
        transliteration: "Wa ma kana qawlahum...",
        meaning: "And their words were not but that they said...",
        urdu: "اور ان کا قول اس کے سوا کچھ نہ تھا...",
        reference: "Surah Aal-e-Imran 3:147",
        virtues: "جنگ، مشکل اور آزمائش کے وقت اہلِ ایمان کی مجرب دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/003147.mp3"
    },
    {
        id: "isa-sustenance",
        title: "Dua of Prophet Isa for Provision",
        titleUrdu: "دعائے حضرت عیسیٰ علیہ السلام (رزق کے لیے)",
        category: "sustenance",
        arabic: "قَالَ عِيسَى ابْنُ مَرْيَمَ اللَّهُمَّ رَبَّنَا أَنزِلْ عَلَيْنَا مَائِدَةً مِّنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِّأَوَّلِنَا وَآخِرِنَا وَآيَةً مِّنكَ ۖ وَارْزُقْنَا وَأَنتَ خَيْرُ الرَّازِقِينَ",
        transliteration: "Qala 'Eesabnu Maryamal-lahumma...",
        meaning: "Isa, the son of Maryam, said...",
        urdu: "عیسیٰ بن مریم علیہ السلام نے کہا...",
        reference: "Surah Al-Ma'idah 5:114",
        virtues: "رزق اور برکت کے لیے حضرت عیسیٰ علیہ السلام کی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/005114.mp3"
    },
    {
        id: "ibrahim-parents-forgiveness",
        title: "Dua of Prophet Ibrahim for Parents & Believers",
        titleUrdu: "دعائے حضرت ابراہیم علیہ السلام (والدین اور مومنین کے لیے)",
        category: "family",
        arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
        transliteration: "Rabbanagh-fir lee...",
        meaning: "Our Lord, forgive me and my parents...",
        urdu: "اے ہمارے رب! مجھے اور میرے والدین کو اور تمام مومنوں کو...",
        reference: "Surah Ibrahim 14:41",
        virtues: "اپنے، والدین اور تمام مومنین کے لیے مغفرت کی جامع دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/014041.mp3"
    },
    {
        id: "ashab-al-kahf",
        title: "Dua of the Youths of the Cave",
        titleUrdu: "دعائے اصحابِ کہف",
        category: "peace",
        arabic: "إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
        transliteration: "Idh awal-fityatu ilal-kahfi...",
        meaning: "When the youths retreated to the cave...",
        urdu: "جب وہ نوجوان غار کی طرف پناہ لے گئے...",
        reference: "Surah Al-Kahf 18:10",
        virtues: "دین کی حفاظت اور مشکل حالات میں درست راہنمائی کے لیے۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/018010.mp3"
    },
    {
        id: "musa-harun-fear",
        title: "Dua of Musa & Harun (Fear of Oppression)",
        titleUrdu: "دعائے حضرت موسیٰ و ہارون علیہما السلام (خوف سے حفاظت)",
        category: "protection",
        arabic: "قَالَا رَبَّنَا إِنَّنَا نَخَافُ أَن يَفْرُطَ عَلَيْنَا أَوْ أَن يَطْغَىٰ",
        transliteration: "Qala Rabbana innana nakhafu...",
        meaning: "They said, 'Our Lord, indeed we are afraid...'",
        urdu: "دونوں نے کہا: اے ہمارے رب! ہمیں خدشہ ہے...",
        reference: "Surah Ta-Ha 20:45",
        virtues: "ظالم اور طاقتور دشمن کے سامنے حفاظت اور حوصلے کی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/020045.mp3"
    },
    {
        id: "increase-knowledge",
        title: "Dua for Increase in Knowledge",
        titleUrdu: "دعائے علم میں اضافہ",
        category: "quranic",
        arabic: "فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ ۗ وَلَا تَعْجَلْ بِالْقُرْآنِ مِن قَبْلِ أَن يُقْضَىٰ إِلَيْكَ وَحْيُهُ ۖ وَقُل رَّبِّ زِدْنِي عِلْمًا",
        transliteration: "Fata'alal-lahul Malikul-Haqq...",
        meaning: "So exalted is Allah...",
        urdu: "پس بلند و بالا ہے اللہ...",
        reference: "Surah Ta-Ha 20:114",
        virtues: "علم میں برکت اور اضافے کے لیے سب سے مختصر اور مجرب قرآنی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/020114.mp3"
    },
    {
        id: "zakariya-offspring",
        title: "Dua of Prophet Zakariya for Offspring",
        titleUrdu: "دعائے حضرت زکریا علیہ السلام (اولاد کے لیے)",
        category: "family",
        arabic: "وَزَكَرِيَّا إِذْ نَادَىٰ رَبَّهُ رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ",
        transliteration: "Wa Zakariyya idh nada Rabbahu...",
        meaning: "And [mention] Zakariyya...",
        urdu: "اور زکریا علیہ السلام کو یاد کرو...",
        reference: "Surah Al-Anbiya 21:89",
        virtues: "اولاد اور جانشین کی طلب کے لیے حضرت زکریا علیہ السلام کی مجرب دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/021089.mp3"
    },
    {
        id: "mercy-forgiveness-servants",
        title: "Dua of the Sincere Servants for Mercy",
        titleUrdu: "مخلص بندوں کی دعائے رحمت",
        category: "forgiveness",
        arabic: "إِنَّهُ كَانَ فَرِيقٌ مِّنْ عِبَادِي يَقُولُونَ رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ",
        transliteration: "Innahoo kana fareequm-min 'ibadee...",
        meaning: "Indeed, there was a party of My servants...",
        urdu: "بے شک میرے بندوں میں سے ایک گروہ کہتا تھا...",
        reference: "Surah Al-Mu'minun 23:109",
        virtues: "اخلاص کے ساتھ مغفرت اور رحمت طلب کرنے کی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/023109.mp3"
    },
    {
        id: "avert-hellfire",
        title: "Dua for Protection from Hellfire",
        titleUrdu: "دعائے حفاظت از عذابِ جہنم",
        category: "protection",
        arabic: "وَالَّذِينَ يَقُولُونَ رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ ۖ إِنَّ عَذَابَهَا كَانَ غَرَامًا",
        transliteration: "Walladheena yaqooloona...",
        meaning: "And those who say...",
        urdu: "اور وہ لوگ جو کہتے ہیں...",
        reference: "Surah Al-Furqan 25:65",
        virtues: "عذابِ جہنم سے پناہ مانگنے کی مجرب دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/025065.mp3"
    },
    {
        id: "family-comfort",
        title: "Dua for a Righteous Family",
        titleUrdu: "دعائے نیک اہل و عیال و اولاد",
        category: "family",
        arabic: "وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        transliteration: "Walladheena yaqooloona...",
        meaning: "And those who say...",
        urdu: "اور وہ لوگ جو کہتے ہیں...",
        reference: "Surah Al-Furqan 25:74",
        virtues: "نیک بیوی، شوہر اور اولاد کے لیے سب سے مقبول قرآنی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/025074.mp3"
    },
    {
        id: "forgive-predecessors",
        title: "Dua for Forgiveness of Fellow Believers",
        titleUrdu: "دعائے مغفرتِ اہلِ ایمان",
        category: "forgiveness",
        arabic: "وَالَّذِينَ جَاءُوا مِن بَعْدِهِمْ يَقُولُونَ رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ",
        transliteration: "Walladheena ja'oo mim ba'dihim...",
        meaning: "And [there is a share for] those who came after them...",
        urdu: "اور وہ لوگ جو ان کے بعد آئے...",
        reference: "Surah Al-Hashr 59:10",
        virtues: "اپنے اور تمام مومنین کے لیے مغفرت اور دلوں کی صفائی کی جامع دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/059010.mp3"
    },
    {
        id: "protection-from-fitnah",
        title: "Dua for Protection from Being a Trial for Disbelievers",
        titleUrdu: "دعائے حفاظت از فتنۂ کفار",
        category: "protection",
        arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلَّذِينَ كَفَرُوا وَاغْفِرْ لَنَا رَبَّنَا ۖ إِنَّكَ أَنتَ الْعَزِيزُ الْحَكِيمُ",
        transliteration: "Rabbana la taj'alna fitnatal...",
        meaning: "Our Lord, make us not [objects of] torment for the disbelievers...",
        urdu: "اے ہمارے رب! ہمیں کافروں کے لیے آزمائش کا سبب نہ بنا...",
        reference: "Surah Al-Mumtahanah 60:5",
        virtues: "دشمنانِ دین کے سامنے ذلت سے بچنے اور مغفرت کی دعا۔",
        audio: "https://everyayah.com/data/Alafasy_128kbps/060005.mp3"
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
            <div class="dua-card" data-index="${realIndex}" onclick="openReader(${realIndex})">
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

    // Find position in current filtered list
    const pos = currentDuaList.findIndex(item => item === dua);
    document.getElementById("readerCount").textContent = (pos + 1) + " / " + currentDuaList.length;
    
    const favKey = dua.id || index;
    document.getElementById("readerFavBtn").textContent = favorites.includes(favKey) ? "❤️" : "🤍";

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
    else if (cat === "favorite") result = duas.filter((d, idx) => favorites.includes(d.id || idx));
    else result = duas.filter(d => d.category === cat);

    loadDuas(result);
}

// ======================================
// FAVORITES SYSTEM
// ======================================
function toggleCurrentFavorite() {
    const dua = duas[currentDuaIndex];
    const key = dua.id || currentDuaIndex;
    if (favorites.includes(key)) {
        favorites = favorites.filter(i => i !== key);
    } else {
        favorites.push(key);
    }
    localStorage.setItem("duaFavorites", JSON.stringify(favorites));
    document.getElementById("readerFavBtn").textContent = favorites.includes(key) ? "❤️" : "🤍";
    updateFavoriteCount();
}

function updateFavoriteCount() {
    const countEl = document.getElementById("favoriteCount");
    if (countEl) {
        countEl.textContent = favorites.length ? `(${favorites.length})` : "";
    }
}

// ======================================
// NAVIGATION (FIXED - works on mobile)
// ======================================
function closeReader() {
    stopDuaAudio();
    duaReader.classList.remove("show");
}

function nextDua() {
    if (!currentDuaList.length) return;
    const currentDua = duas[currentDuaIndex];
    const pos = currentDuaList.findIndex(d => d === currentDua);
    if (pos >= 0 && pos < currentDuaList.length - 1) {
        const nextDuaObj = currentDuaList[pos + 1];
        const idx = duas.indexOf(nextDuaObj);
        if (idx >= 0) openReader(idx);
    }
}

function previousDua() {
    if (!currentDuaList.length) return;
    const currentDua = duas[currentDuaIndex];
    const pos = currentDuaList.findIndex(d => d === currentDua);
    if (pos > 0) {
        const prevDuaObj = currentDuaList[pos - 1];
        const idx = duas.indexOf(prevDuaObj);
        if (idx >= 0) openReader(idx);
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

    // ======================================
    // FIX: Navigation buttons work on mobile
    // ======================================
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (prevBtn) {
        prevBtn.addEventListener("click", previousDua);
        prevBtn.addEventListener("touchstart", function(e) { e.preventDefault(); }, { passive: true });
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", nextDua);
        nextBtn.addEventListener("touchstart", function(e) { e.preventDefault(); }, { passive: true });
    }

    // Also handle the favorite button in reader
    const favBtn = document.getElementById("readerFavBtn");
    if (favBtn) {
        favBtn.addEventListener("click", toggleCurrentFavorite);
    }

    // Load initial data
    loadDuas();
    updateFavoriteCount();
});