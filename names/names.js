// ======================================
// 99 NAMES OF ALLAH - WITH BENEFITS
// + GRID VIEW + DETAIL MODAL (NO AUDIO INSIDE)
// ======================================

// All 99 Names Data (same as before)
const namesOfAllah = [
    { number:1, arabic:"الرَّحْمَنُ", english:"Ar-Rahman", meaning_en:"The Most Merciful", urdu:"نہایت رحم کرنے والا", benefit_en:"Reciting it 100 times after every obligatory prayer will enhance memory and awareness. The reciter will feel the burden vanishing away from his heart.", benefit_ur:"ہر فرض نماز کے بعد 100 مرتبہ پڑھنے سے حافظہ اور شعور میں اضافہ ہوگا۔ تلاوت کرنے والا اپنے دل سے بوجھ ہلکا ہوتا محسوس کرے گا۔" },
    { number:2, arabic:"الرَّحِيمُ", english:"Ar-Raheem", meaning_en:"The Especially Merciful", urdu:"بہت رحم کرنے والا", benefit_en:"Reciting this name 100 times brings mercy and forgiveness from Allah. It softens the heart and increases kindness.", benefit_ur:"اس نام کو 100 بار پڑھنے سے اللہ کی رحمت اور مغفرت ملتی ہے۔ دل نرم ہوتا ہے اور شفقت میں اضافہ ہوتا ہے۔" },
    { number:3, arabic:"الْمَلِكُ", english:"Al-Malik", meaning_en:"The Absolute Ruler", urdu:"بادشاہ", benefit_en:"He who repeats this name many times every day after the Fajr prayer will become rich by the grace of Allah.", benefit_ur:"جو اس نام کو روزانہ فجر کی نماز کے بعد کئی بار پڑھے گا، وہ اللہ کے فضل سے غنی ہو جائے گا۔" },
    { number:4, arabic:"الْقُدُّوسُ", english:"Al-Quddus", meaning_en:"The Holy", urdu:"نہایت پاک", benefit_en:"Reciting this name 100 times purifies the soul and removes anxiety. It brings peace of mind.", benefit_ur:"اس نام کو 100 بار پڑھنے سے روح پاک ہوتی ہے اور بے چینی دور ہوتی ہے۔ دل کو سکون ملتا ہے۔" },
    { number:5, arabic:"السَّلَامُ", english:"As-Salam", meaning_en:"The Source of Peace", urdu:"سلامتی دینے والا", benefit_en:"Reciting this name 100 times removes fear and grants safety from all calamities.", benefit_ur:"اس نام کو 100 بار پڑھنے سے خوف دور ہوتا ہے اور ہر آفت سے سلامتی ملتی ہے۔" },
    { number:6, arabic:"الْمُؤْمِنُ", english:"Al-Mu'min", meaning_en:"The Giver of Faith", urdu:"امن دینے والا", benefit_en:"He who recites this name 100 times will have his faith strengthened and his heart protected from doubts.", benefit_ur:"جو اس نام کو 100 بار پڑھے گا، اس کا ایمان مضبوط ہوگا اور اس کا دل شکوک و شبہات سے محفوظ رہے گا۔" },
    { number:7, arabic:"الْمُهَيْمِنُ", english:"Al-Muhaymin", meaning_en:"The Guardian", urdu:"نگہبان", benefit_en:"Reciting this name 100 times grants protection against evil people and bad thoughts.", benefit_ur:"اس نام کو 100 بار پڑھنے سے برے لوگوں اور برے خیالات سے حفاظت ملتی ہے۔" },
    { number:8, arabic:"الْعَزِيزُ", english:"Al-Aziz", meaning_en:"The Almighty", urdu:"زبردست، غالب", benefit_en:"Reciting this name 100 times grants dignity and honor. It protects the reciter from humiliation.", benefit_ur:"اس نام کو 100 بار پڑھنے سے عزت اور وقار ملتا ہے۔ ذلت سے حفاظت ہوتی ہے۔" },
    { number:9, arabic:"الْجَبَّارُ", english:"Al-Jabbar", meaning_en:"The Compeller", urdu:"زبردست اقتدار والا", benefit_en:"He who recites this name will have his broken heart mended and will gain strength against oppressors.", benefit_ur:"جو اس نام کو پڑھے گا، اس کا ٹوٹا ہوا دل ٹھیک ہوگا اور ظالموں کے خلاف طاقت ملے گی۔" },
    { number:10, arabic:"الْمُتَكَبِّرُ", english:"Al-Mutakabbir", meaning_en:"The Supreme", urdu:"بڑائی والا", benefit_en:"Reciting this name helps the soul submit to Allah's majesty and purifies it from arrogance.", benefit_ur:"اس نام کو پڑھنے سے روح اللہ کی عظمت کے سامنے جھکتی ہے اور تکبر سے پاک ہوتی ہے۔" },
    { number:11, arabic:"الْخَالِقُ", english:"Al-Khaliq", meaning_en:"The Creator", urdu:"پیدا کرنے والا", benefit_en:"Reciting this name 100 times brings blessings in provision and helps in finding solutions to difficult problems.", benefit_ur:"اس نام کو 100 بار پڑھنے سے رزق میں برکت ہوتی ہے اور مشکل مسائل کا حل نکلتا ہے۔" },
    { number:12, arabic:"الْبَارِئُ", english:"Al-Bari", meaning_en:"The Evolver", urdu:"وجود میں لانے والا", benefit_en:"Reciting this name 100 times helps in healing from physical ailments and diseases.", benefit_ur:"اس نام کو 100 بار پڑھنے سے جسمانی بیماریوں اور امراض سے شفاء ملتی ہے۔" },
    { number:13, arabic:"الْمُصَوِّرُ", english:"Al-Musawwir", meaning_en:"The Bestower of Forms", urdu:"صورت بنانے والا", benefit_en:"Reciting this name 100 times grants beauty to one's character and face.", benefit_ur:"اس نام کو 100 بار پڑھنے سے کردار اور چہرے میں خوبصورتی آتی ہے۔" },
    { number:14, arabic:"الْغَفَّارُ", english:"Al-Ghaffar", meaning_en:"The Forgiver", urdu:"بہت بخشنے والا", benefit_en:"Reciting this name 100 times after Fajr prayer leads to forgiveness of sins.", benefit_ur:"فجر کی نماز کے بعد اس نام کو 100 بار پڑھنے سے گناہ معاف ہو جاتے ہیں۔" },
    { number:15, arabic:"الْقَهَّارُ", english:"Al-Qahhar", meaning_en:"The Subduer", urdu:"سب پر غالب", benefit_en:"Reciting this name 100 times helps in overcoming enemies and bad habits.", benefit_ur:"اس نام کو 100 بار پڑھنے سے دشمنوں اور بری عادات پر غلبہ ملتا ہے۔" },
    { number:16, arabic:"الْوَهَّابُ", english:"Al-Wahhab", meaning_en:"The Bestower", urdu:"بہت عطا کرنے والا", benefit_en:"Reciting this name 100 times opens the doors of sustenance and grants desired things.", benefit_ur:"اس نام کو 100 بار پڑھنے سے رزق کے دروازے کھلتے ہیں اور مطلوبہ چیزیں ملتی ہیں۔" },
    { number:17, arabic:"الرَّزَّاقُ", english:"Ar-Razzaq", meaning_en:"The Provider", urdu:"رزق دینے والا", benefit_en:"Reciting this name 100 times after prayer increases abundance in wealth and food.", benefit_ur:"نماز کے بعد اس نام کو 100 بار پڑھنے سے مال اور کھانے میں فراوانی ہوتی ہے۔" },
    { number:18, arabic:"الْفَتَّاحُ", english:"Al-Fattah", meaning_en:"The Opener", urdu:"فتح دینے والا", benefit_en:"Reciting this name 100 times opens the doors of success and victory in all matters.", benefit_ur:"اس نام کو 100 بار پڑھنے سے ہر معاملے میں کامیابی اور فتح کے دروازے کھلتے ہیں۔" },
    { number:19, arabic:"الْعَلِيمُ", english:"Al-Alim", meaning_en:"The All-Knowing", urdu:"سب کچھ جاننے والا", benefit_en:"Reciting this name 100 times increases knowledge, wisdom, and understanding.", benefit_ur:"اس نام کو 100 بار پڑھنے سے علم، حکمت اور سمجھ میں اضافہ ہوتا ہے۔" },
    { number:20, arabic:"الْقَابِضُ", english:"Al-Qabid", meaning_en:"The Constrictor", urdu:"قبض کرنے والا", benefit_en:"Reciting this name 100 times helps in restraining one's desires and controlling the ego.", benefit_ur:"اس نام کو 100 بار پڑھنے سے خواہشات کو قابو کرنے اور نفس پر کنٹرول کرنے میں مدد ملتی ہے۔" },
    { number:21, arabic:"الْبَاسِطُ", english:"Al-Basit", meaning_en:"The Expander", urdu:"کشادگی دینے والا", benefit_en:"Reciting this name 100 times brings ease in life and expands one's sustenance and heart.", benefit_ur:"اس نام کو 100 بار پڑھنے سے زندگی میں آسانی آتی ہے اور رزق اور دل میں کشادگی ہوتی ہے۔" },
    { number:22, arabic:"الْخَافِضُ", english:"Al-Khafid", meaning_en:"The Abaser", urdu:"پست کرنے والا", benefit_en:"Reciting this name 100 times humbles the soul and protects against pride.", benefit_ur:"اس نام کو 100 بار پڑھنے سے روح عاجز ہوتی ہے اور تکبر سے حفاظت ہوتی ہے۔" },
    { number:23, arabic:"الرَّافِعُ", english:"Ar-Rafi", meaning_en:"The Exalter", urdu:"بلند کرنے والا", benefit_en:"Reciting this name 100 times raises one's status in this world and the Hereafter.", benefit_ur:"اس نام کو 100 بار پڑھنے سے دنیا اور آخرت میں درجہ بلند ہوتا ہے۔" },
    { number:24, arabic:"الْمُعِزُّ", english:"Al-Mu'izz", meaning_en:"The Giver of Honor", urdu:"عزت دینے والا", benefit_en:"Reciting this name 100 times grants honor and respect among people.", benefit_ur:"اس نام کو 100 بار پڑھنے سے لوگوں میں عزت اور احترام ملتا ہے۔" },
    { number:25, arabic:"الْمُذِلُّ", english:"Al-Mudhill", meaning_en:"The Giver of Disgrace", urdu:"ذلت دینے والا", benefit_en:"Reciting this name 100 times protects against the humiliation of enemies.", benefit_ur:"اس نام کو 100 بار پڑھنے سے دشمنوں کی ذلت سے حفاظت ہوتی ہے۔" },
    { number:26, arabic:"السَّمِيعُ", english:"As-Sami", meaning_en:"The All-Hearing", urdu:"سب کچھ سننے والا", benefit_en:"Reciting this name 100 times helps in getting one's prayers heard and answered.", benefit_ur:"اس نام کو 100 بار پڑھنے سے دعائیں سنی اور قبول ہوتی ہیں۔" },
    { number:27, arabic:"الْبَصِيرُ", english:"Al-Basir", meaning_en:"The All-Seeing", urdu:"سب کچھ دیکھنے والا", benefit_en:"Reciting this name 100 times gives inner sight and protects from evil eyes.", benefit_ur:"اس نام کو 100 بار پڑھنے سے باطنی بینائی ملتی ہے اور نظرِ بد سے حفاظت ہوتی ہے۔" },
    { number:28, arabic:"الْحَكَمُ", english:"Al-Hakam", meaning_en:"The Judge", urdu:"فیصلہ کرنے والا", benefit_en:"Reciting this name 100 times grants justice and clarity in making decisions.", benefit_ur:"اس نام کو 100 بار پڑھنے سے انصاف اور فیصلے کرنے میں وضاحت ملتی ہے۔" },
    { number:29, arabic:"الْعَدْلُ", english:"Al-Adl", meaning_en:"The Just", urdu:"نہایت انصاف کرنے والا", benefit_en:"Reciting this name 100 times helps in establishing fairness and truth in one's life.", benefit_ur:"اس نام کو 100 بار پڑھنے سے زندگی میں انصاف اور سچائی قائم کرنے میں مدد ملتی ہے۔" },
    { number:30, arabic:"اللَّطِيفُ", english:"Al-Latif", meaning_en:"The Subtle", urdu:"نہایت مہربان، باریک بین", benefit_en:"Reciting this name 100 times attracts subtle kindness from Allah and helps solve complex problems.", benefit_ur:"اس نام کو 100 بار پڑھنے سے اللہ کی لطیف مہربانی ملتی ہے اور پیچیدہ مسائل حل ہوتے ہیں۔" },
    { number:31, arabic:"الْخَبِيرُ", english:"Al-Khabir", meaning_en:"The Aware", urdu:"باخبر", benefit_en:"Reciting this name 100 times grants awareness of the unseen and protection from deception.", benefit_ur:"اس نام کو 100 بار پڑھنے سے غیب کی آگاہی اور دھوکہ دہی سے حفاظت ملتی ہے۔" },
    { number:32, arabic:"الْحَلِيمُ", english:"Al-Halim", meaning_en:"The Forbearing", urdu:"بہت بردبار", benefit_en:"Reciting this name 100 times grants forbearance and patience in difficult times.", benefit_ur:"اس نام کو 100 بار پڑھنے سے مشکل وقت میں برداشت اور صبر ملتا ہے۔" },
    { number:33, arabic:"الْعَظِيمُ", english:"Al-Azim", meaning_en:"The Great", urdu:"بہت عظمت والا", benefit_en:"Reciting this name 100 times fills the heart with awe of Allah and grants greatness in character.", benefit_ur:"اس نام کو 100 بار پڑھنے سے دل اللہ کی عظمت سے بھر جاتا ہے اور کردار میں عظمت آتی ہے۔" },
    { number:34, arabic:"الْغَفُورُ", english:"Al-Ghafur", meaning_en:"The Forgiving", urdu:"بہت بخشنے والا", benefit_en:"Reciting this name 100 times invites forgiveness and erases past sins.", benefit_ur:"اس نام کو 100 بار پڑھنے سے مغفرت ملتی ہے اور گزشتہ گناہ مٹ جاتے ہیں۔" },
    { number:35, arabic:"الشَّكُورُ", english:"Ash-Shakur", meaning_en:"The Appreciative", urdu:"قدر دان", benefit_en:"Reciting this name 100 times helps the reciter become grateful and draws Allah's appreciation.", benefit_ur:"اس نام کو 100 بار پڑھنے سے بندہ شکرگزار بنتا ہے اور اللہ کی قدردانی ملتی ہے۔" },
    { number:36, arabic:"الْعَلِيُّ", english:"Al-Ali", meaning_en:"The Most High", urdu:"سب سے بلند", benefit_en:"Reciting this name 100 times elevates one's spiritual rank and worldly status.", benefit_ur:"اس نام کو 100 بار پڑھنے سے روحانی مرتبہ اور دنیاوی درجہ بلند ہوتا ہے۔" },
    { number:37, arabic:"الْكَبِيرُ", english:"Al-Kabir", meaning_en:"The Great", urdu:"بہت بڑا", benefit_en:"Reciting this name 100 times grants authority and commands respect from others.", benefit_ur:"اس نام کو 100 بار پڑھنے سے دوسروں میں عزت اور اثر پیدا ہوتا ہے۔" },
    { number:38, arabic:"الْحَفِيظُ", english:"Al-Hafiz", meaning_en:"The Preserver", urdu:"حفاظت کرنے والا", benefit_en:"Reciting this name 100 times protects the reciter and his family from harm.", benefit_ur:"اس نام کو 100 بار پڑھنے سے پڑھنے والا اور اس کا خاندان نقصان سے محفوظ رہتا ہے۔" },
    { number:39, arabic:"الْمُقِيتُ", english:"Al-Muqit", meaning_en:"The Sustainer", urdu:"روزی اور قوت دینے والا", benefit_en:"Reciting this name 100 times grants strength and adequate provision.", benefit_ur:"اس نام کو 100 بار پڑھنے سے طاقت اور مناسب رزق ملتا ہے۔" },
    { number:40, arabic:"الْحسِيبُ", english:"Al-Hasib", meaning_en:"The Reckoner", urdu:"حساب لینے والا", benefit_en:"Reciting this name 100 times gives peace regarding financial matters and accountabilities.", benefit_ur:"اس نام کو 100 بار پڑھنے سے مالی معاملات اور حساب کتاب میں سکون ملتا ہے۔" },
    { number:41, arabic:"الْجَلِيلُ", english:"Al-Jalil", meaning_en:"The Majestic", urdu:"بزرگی والا", benefit_en:"Reciting this name 100 times grants majesty and solemnity to the reciter.", benefit_ur:"اس نام کو 100 بار پڑھنے سے پڑھنے والے میں وقار اور عظمت آتی ہے۔" },
    { number:42, arabic:"الْكَرِيمُ", english:"Al-Karim", meaning_en:"The Generous", urdu:"نہایت سخی", benefit_en:"Reciting this name 100 times attracts generosity and opens doors of divine blessings.", benefit_ur:"اس نام کو 100 بار پڑھنے سے سخاوت آتی ہے اور اللہ کی برکات کے دروازے کھلتے ہیں۔" },
    { number:43, arabic:"الرَّقِيبُ", english:"Ar-Raqib", meaning_en:"The Watchful", urdu:"نگرانی کرنے والا", benefit_en:"Reciting this name 100 times makes the reciter mindful of Allah's watchfulness.", benefit_ur:"اس نام کو 100 بار پڑھنے سے بندہ اللہ کی نگرانی کا خیال رکھنے لگتا ہے۔" },
    { number:44, arabic:"الْمُجِيبُ", english:"Al-Mujib", meaning_en:"The Responsive", urdu:"دعا قبول کرنے والا", benefit_en:"Reciting this name 100 times ensures quick acceptance of prayers.", benefit_ur:"اس نام کو 100 بار پڑھنے سے دعائیں جلدی قبول ہوتی ہیں۔" },
    { number:45, arabic:"الْوَاسِعُ", english:"Al-Wasi", meaning_en:"The Vast", urdu:"کشادگی والا", benefit_en:"Reciting this name 100 times expands one's knowledge and wealth.", benefit_ur:"اس نام کو 100 بار پڑھنے سے علم اور مال میں کشادگی ہوتی ہے۔" },
    { number:46, arabic:"الْحَكِيمُ", english:"Al-Hakim", meaning_en:"The Wise", urdu:"حکمت والا", benefit_en:"Reciting this name 100 times grants deep wisdom and maturity in judgment.", benefit_ur:"اس نام کو 100 بار پڑھنے سے گہری حکمت اور فیصلہ کرنے میں پختگی آتی ہے۔" },
    { number:47, arabic:"الْوَدُودُ", english:"Al-Wadud", meaning_en:"The Loving", urdu:"محبت کرنے والا", benefit_en:"Reciting this name 100 times fills the heart with love for Allah and His creation.", benefit_ur:"اس نام کو 100 بار پڑھنے سے دل اللہ اور اس کی مخلوق سے محبت سے بھر جاتا ہے۔" },
    { number:48, arabic:"الْمَجِيدُ", english:"Al-Majid", meaning_en:"The Glorious", urdu:"بزرگ و برتر", benefit_en:"Reciting this name 100 times grants glory and sublimity in character.", benefit_ur:"اس نام کو 100 بار پڑھنے سے کردار میں شان و شوکت اور بلندی آتی ہے۔" },
    { number:49, arabic:"الْبَاعِثُ", english:"Al-Ba'ith", meaning_en:"The Resurrector", urdu:"اٹھانے والا", benefit_en:"Reciting this name 100 times revives the soul and brings it to life with faith.", benefit_ur:"اس نام کو 100 بار پڑھنے سے روح میں جان آتی ہے اور ایمان کے ساتھ زندگی ملتی ہے۔" },
    { number:50, arabic:"الشَّهِيدُ", english:"Ash-Shahid", meaning_en:"The Witness", urdu:"گواہ", benefit_en:"Reciting this name 100 times grants consciousness of Allah's presence and truthfulness.", benefit_ur:"اس نام کو 100 بار پڑھنے سے اللہ کی موجودگی اور سچائی کا شعور بیدار ہوتا ہے۔" },
    { number:51, arabic:"الْحَقُّ", english:"Al-Haqq", meaning_en:"The Truth", urdu:"حق", benefit_en:"Reciting this name 100 times attracts the reality of truth and removes falsehood.", benefit_ur:"اس نام کو 100 بار پڑھنے سے حق کا نور ملتا ہے اور باطل دور ہوتا ہے۔" },
    { number:52, arabic:"الْوَكِيلُ", english:"Al-Wakil", meaning_en:"The Trustee", urdu:"کارساز", benefit_en:"Reciting this name 100 times relieves the reciter from worries and he is safeguarded in his affairs.", benefit_ur:"اس نام کو 100 بار پڑھنے سے فکریں دور ہوتی ہیں اور معاملات میں حفاظت ہوتی ہے۔" },
    { number:53, arabic:"الْقَوِيُّ", english:"Al-Qawiyy", meaning_en:"The Strong", urdu:"بہت طاقتور", benefit_en:"Reciting this name 100 times grants extraordinary physical and spiritual strength.", benefit_ur:"اس نام کو 100 بار پڑھنے سے جسمانی اور روحانی طاقت ملتی ہے۔" },
    { number:54, arabic:"الْمَتِينُ", english:"Al-Matin", meaning_en:"The Firm", urdu:"مضبوط", benefit_en:"Reciting this name 100 times gives steadfastness and firmness in difficult situations.", benefit_ur:"اس نام کو 100 بار پڑھنے سے مشکل حالات میں ثابت قدمی اور استحکام ملتا ہے۔" },
    { number:55, arabic:"الْوَلِيُّ", english:"Al-Wali", meaning_en:"The Protecting Friend", urdu:"مددگار", benefit_en:"Reciting this name 100 times brings Allah's support and closeness.", benefit_ur:"اس نام کو 100 بار پڑھنے سے اللہ کی مدد اور قربت حاصل ہوتی ہے۔" },
    { number:56, arabic:"الْحَمِيدُ", english:"Al-Hamid", meaning_en:"The Praiseworthy", urdu:"قابل حمد", benefit_en:"Reciting this name 100 times makes the reciter praiseworthy and loved by people.", benefit_ur:"اس نام کو 100 بار پڑھنے سے پڑھنے والا قابل تعریف اور لوگوں میں محبوب بن جاتا ہے۔" },
    { number:57, arabic:"الْمُحْصِي", english:"Al-Muhsi", meaning_en:"The Reckoner", urdu:"شمار کرنے والا", benefit_en:"Reciting this name 100 times protects one from being deceived by worldly calculations.", benefit_ur:"اس نام کو 100 بار پڑھنے سے دنیاوی گنتی میں دھوکہ کھانے سے بچاؤ ہوتا ہے۔" },
    { number:58, arabic:"الْمُبْدِئُ", english:"Al-Mubdi", meaning_en:"The Originator", urdu:"پہلی بار پیدا کرنے والا", benefit_en:"Reciting this name 100 times grants creativity and initiates new blessings.", benefit_ur:"اس نام کو 100 بار پڑھنے سے تخلیقی صلاحیت ملتی ہے اور نئی برکات کا آغاز ہوتا ہے۔" },
    { number:59, arabic:"الْمُعِيدُ", english:"Al-Muid", meaning_en:"The Restorer", urdu:"دوبارہ پیدا کرنے والا", benefit_en:"Reciting this name 100 times helps in restoring things to their original state.", benefit_ur:"اس نام کو 100 بار پڑھنے سے کھوئی ہوئی چیزیں یا حالات بحال ہونے میں مدد ملتی ہے۔" },
    { number:60, arabic:"الْمُحْيِي", english:"Al-Muhyi", meaning_en:"The Giver of Life", urdu:"زندگی دینے والا", benefit_en:"Reciting this name 100 times brings spiritual life and revitalization of faith.", benefit_ur:"اس نام کو 100 بار پڑھنے سے روحانی زندگی اور ایمان میں تازگی آتی ہے۔" },
    { number:61, arabic:"الْمُمِيتُ", english:"Al-Mumit", meaning_en:"The Giver of Death", urdu:"موت دینے والا", benefit_en:"Reciting this name 100 times reminds of death and gives humility to the soul.", benefit_ur:"اس نام کو 100 بار پڑھنے سے موت کی یاد آتی ہے اور روح میں عاجزی آتی ہے۔" },
    { number:62, arabic:"الْحَيُّ", english:"Al-Hayy", meaning_en:"The Living", urdu:"ہمیشہ زندہ", benefit_en:"Reciting this name 100 times grants vitality and awareness of Allah's eternal life.", benefit_ur:"اس نام کو 100 بار پڑھنے سے زندگی میں تازگی اور اللہ کی ہمیشہ زندہ ہونے کی آگاہی ملتی ہے۔" },
    { number:63, arabic:"الْقَيُّومُ", english:"Al-Qayyum", meaning_en:"The Self-Subsisting", urdu:"سب کو قائم رکھنے والا", benefit_en:"Reciting this name 100 times prevents falling into laziness and grants stability.", benefit_ur:"اس نام کو 100 بار پڑھنے سے سستی سے بچاؤ اور استحکام ملتا ہے۔" },
    { number:64, arabic:"الْوَاجِدُ", english:"Al-Wajid", meaning_en:"The Finder", urdu:"پانے والا", benefit_en:"Reciting this name 100 times helps in finding lost or desired things.", benefit_ur:"اس نام کو 100 بار پڑھنے سے کھوئی ہوئی یا مطلوبہ اشیاء ملنے میں مدد ملتی ہے۔" },
    { number:65, arabic:"الْمَاجِدُ", english:"Al-Majid", meaning_en:"The Glorious", urdu:"بزرگ و کریم", benefit_en:"Reciting this name 100 times grants grandeur and magnificence.", benefit_ur:"اس نام کو 100 بار پڑھنے سے عظمت اور رفعت ملتی ہے۔" },
    { number:66, arabic:"الْوَاحِدُ", english:"Al-Wahid", meaning_en:"The One", urdu:"ایک", benefit_en:"Reciting this name 100 times strengthens faith in the oneness of Allah and removes idolatry.", benefit_ur:"اس نام کو 100 بار پڑھنے سے اللہ کی وحدانیت پر ایمان مضبوط ہوتا ہے اور شرک دور ہوتا ہے۔" },
    { number:67, arabic:"الْأَحَدُ", english:"Al-Ahad", meaning_en:"The Unique", urdu:"یکتا", benefit_en:"Reciting this name 100 times purifies the soul from attachments to worldly things.", benefit_ur:"اس نام کو 100 بار پڑھنے سے روح دنیاوی چیزوں کے لگاؤ سے پاک ہوتی ہے۔" },
    { number:68, arabic:"الصَّمَدُ", english:"As-Samad", meaning_en:"The Eternal", urdu:"بے نیاز", benefit_en:"Reciting this name 100 times makes the reciter self-sufficient and content.", benefit_ur:"اس نام کو 100 بار پڑھنے سے بندہ بے نیاز اور قناعت پسند بن جاتا ہے۔" },
    { number:69, arabic:"الْقَادِرُ", english:"Al-Qadir", meaning_en:"The All-Powerful", urdu:"قدرت والا", benefit_en:"Reciting this name 100 times grants ability and competence to achieve goals.", benefit_ur:"اس نام کو 100 بار پڑھنے سے مقاصد کے حصول کے لیے صلاحیت اور اہلیت ملتی ہے۔" },
    { number:70, arabic:"الْمُقْتَدِرُ", english:"Al-Muqtadir", meaning_en:"The All-Determining", urdu:"مکمل قدرت والا", benefit_en:"Reciting this name 100 times gives control over difficult circumstances.", benefit_ur:"اس نام کو 100 بار پڑھنے سے مشکل حالات پر قابو پانے کی طاقت ملتی ہے۔" },
    { number:71, arabic:"الْمُقَدِّمُ", english:"Al-Muqaddim", meaning_en:"The Foremost", urdu:"آگے کرنے والا", benefit_en:"Reciting this name 100 times helps prioritize matters and advance in life.", benefit_ur:"اس نام کو 100 بار پڑھنے سے معاملات کو ترجیح دینے اور زندگی میں آگے بڑھنے میں مدد ملتی ہے۔" },
    { number:72, arabic:"الْمُؤَخِّرُ", english:"Al-Mu'akhkhir", meaning_en:"The Delayer", urdu:"پیچھے کرنے والا", benefit_en:"Reciting this name 100 times helps in delaying or avoiding harmful things.", benefit_ur:"اس نام کو 100 بار پڑھنے سے نقصان دہ چیزوں کو مؤخر کرنے یا بچنے میں مدد ملتی ہے۔" },
    { number:73, arabic:"الْأَوَّلُ", english:"Al-Awwal", meaning_en:"The First", urdu:"سب سے پہلا", benefit_en:"Reciting this name 100 times gives consciousness of Allah's precedence over all things.", benefit_ur:"اس نام کو 100 بار پڑھنے سے ہر چیز پر اللہ کی سبقت کا شعور ملتا ہے۔" },
    { number:74, arabic:"الْآخِرُ", english:"Al-Akhir", meaning_en:"The Last", urdu:"سب سے آخر", benefit_en:"Reciting this name 100 times reminds of the final end and the Hereafter.", benefit_ur:"اس نام کو 100 بار پڑھنے سے انجام اور آخرت کی یاد آتی ہے۔" },
    { number:75, arabic:"الظَّاهِرُ", english:"Az-Zahir", meaning_en:"The Manifest", urdu:"ظاہر", benefit_en:"Reciting this name 100 times grants clarity and visibility of truth.", benefit_ur:"اس نام کو 100 بار پڑھنے سے حق کی وضاحت اور روشنی ملتی ہے۔" },
    { number:76, arabic:"الْبَاطِنُ", english:"Al-Batin", meaning_en:"The Hidden", urdu:"پوشیدہ", benefit_en:"Reciting this name 100 times grants insight into the hidden realities.", benefit_ur:"اس نام کو 100 بار پڑھنے سے پوشیدہ حقائق کا ادراک ملتا ہے۔" },
    { number:77, arabic:"الْوَالِي", english:"Al-Wali", meaning_en:"The Governor", urdu:"حاکم", benefit_en:"Reciting this name 100 times grants governance and authority.", benefit_ur:"اس نام کو 100 بار پڑھنے سے حکمرانی اور اختیار ملتا ہے۔" },
    { number:78, arabic:"الْمُتَعَالِي", english:"Al-Muta'ali", meaning_en:"The Supreme", urdu:"بہت بلند", benefit_en:"Reciting this name 100 times elevates the soul to high spiritual states.", benefit_ur:"اس نام کو 100 بار پڑھنے سے روح بلند روحانی مقامات تک پہنچتی ہے۔" },
    { number:79, arabic:"الْبَرُّ", english:"Al-Barr", meaning_en:"The Source of Goodness", urdu:"نیکی اور احسان کرنے والا", benefit_en:"Reciting this name 100 times attracts immense goodness and virtue.", benefit_ur:"اس نام کو 100 بار پڑھنے سے بے پناہ بھلائی اور نیکی ملتی ہے۔" },
    { number:80, arabic:"التَّوَابُ", english:"At-Tawwab", meaning_en:"The Acceptor of Repentance", urdu:"توبہ قبول کرنے والا", benefit_en:"Reciting this name 100 times opens the door to repentance and acceptance.", benefit_ur:"اس نام کو 100 بار پڑھنے سے توبہ اور قبولیت کا دروازہ کھلتا ہے۔" },
    { number:81, arabic:"الْمُنْتَقِمُ", english:"Al-Muntaqim", meaning_en:"The Avenger", urdu:"بدلہ لینے والا", benefit_en:"Reciting this name 100 times protects from the revenge of enemies.", benefit_ur:"اس نام کو 100 بار پڑھنے سے دشمنوں کے انتقام سے حفاظت ہوتی ہے۔" },
    { number:82, arabic:"الْعَفُوُّ", english:"Al-Afuww", meaning_en:"The Pardoner", urdu:"معاف کرنے والا", benefit_en:"Reciting this name 100 times invites Allah's pardon and forgetfulness of sins.", benefit_ur:"اس نام کو 100 بار پڑھنے سے اللہ کی معافی اور گناہوں کی بھولنے کی دعا ملتی ہے۔" },
    { number:83, arabic:"الرَّؤُوفُ", english:"Ar-Ra'uf", meaning_en:"The Compassionate", urdu:"نہایت شفقت کرنے والا", benefit_en:"Reciting this name 100 times brings divine compassion and gentleness.", benefit_ur:"اس نام کو 100 بار پڑھنے سے اللہ کی شفقت اور نرمی آتی ہے۔" },
    { number:84, arabic:"مَالِكُ الْمُلْكِ", english:"Malik-ul-Mulk", meaning_en:"King of Kings", urdu:"بادشاہی کا مالک", benefit_en:"Reciting this name 100 times grants sovereignty and power over one's affairs.", benefit_ur:"اس نام کو 100 بار پڑھنے سے معاملات پر حکمرانی اور طاقت ملتی ہے۔" },
    { number:85, arabic:"ذُو الْجَلَالِ وَالْإِكْرَامِ", english:"Dhul-Jalali wal-Ikram", meaning_en:"Lord of Majesty and Generosity", urdu:"جلال اور اکرام والا", benefit_en:"Reciting this name 100 times grants glory and honor from Allah.", benefit_ur:"اس نام کو 100 بار پڑھنے سے اللہ کی طرف سے جلال اور عزت ملتی ہے۔" },
    { number:86, arabic:"الْمُقْسِطُ", english:"Al-Muqsit", meaning_en:"The Equitable", urdu:"انصاف قائم کرنے والا", benefit_en:"Reciting this name 100 times helps in establishing fairness.", benefit_ur:"اس نام کو 100 بار پڑھنے سے انصاف قائم کرنے میں مدد ملتی ہے۔" },
    { number:87, arabic:"الْجَامِعُ", english:"Al-Jami", meaning_en:"The Gatherer", urdu:"جمع کرنے والا", benefit_en:"Reciting this name 100 times brings together scattered things and blessings.", benefit_ur:"اس نام کو 100 بار پڑھنے سے بکھری ہوئی چیزیں اور برکات اکھٹی ہوتی ہیں۔" },
    { number:88, arabic:"الْغَنِيُّ", english:"Al-Ghani", meaning_en:"The Self-Sufficient", urdu:"بے نیاز", benefit_en:"Reciting this name 100 times makes one financially independent and content.", benefit_ur:"اس نام کو 100 بار پڑھنے سے مالی طور پر خود کفیل اور قناعت حاصل ہوتی ہے۔" },
    { number:89, arabic:"الْمُغْنِي", english:"Al-Mughni", meaning_en:"The Enricher", urdu:"غنی کرنے والا", benefit_en:"Reciting this name 100 times removes poverty and grants self-sufficiency.", benefit_ur:"اس نام کو 100 بار پڑھنے سے غربت دور ہوتی ہے اور خود کفالت ملتی ہے۔" },
    { number:90, arabic:"الْمَانِعُ", english:"Al-Mani", meaning_en:"The Withholder", urdu:"روکنے والا", benefit_en:"Reciting this name 100 times protects from calamities and prevents harm.", benefit_ur:"اس نام کو 100 بار پڑھنے سے آفات سے حفاظت ہوتی ہے اور نقصان روکا جاتا ہے۔" },
    { number:91, arabic:"الضَّارُّ", english:"Ad-Darr", meaning_en:"The Distressor", urdu:"نقصان پہنچانے پر قادر", benefit_en:"Reciting this name 100 times helps understanding the purpose of trials.", benefit_ur:"اس نام کو 100 بار پڑھنے سے آزمائشوں کے مقصد کو سمجھنے میں مدد ملتی ہے۔" },
    { number:92, arabic:"النَّافِعُ", english:"An-Nafi", meaning_en:"The Benefactor", urdu:"نفع پہنچانے والا", benefit_en:"Reciting this name 100 times increases beneficial deeds and outcomes.", benefit_ur:"اس نام کو 100 بار پڑھنے سے نفع بخش اعمال اور نتائج میں اضافہ ہوتا ہے۔" },
    { number:93, arabic:"النُّورُ", english:"An-Nur", meaning_en:"The Light", urdu:"نور", benefit_en:"Reciting this name 100 times illuminates the heart and removes darkness.", benefit_ur:"اس نام کو 100 بار پڑھنے سے دل روشن ہوتا ہے اور تاریکی دور ہوتی ہے۔" },
    { number:94, arabic:"الْهَادِي", english:"Al-Hadi", meaning_en:"The Guide", urdu:"ہدایت دینے والا", benefit_en:"Reciting this name 100 times grants guidance on the right path.", benefit_ur:"اس نام کو 100 بار پڑھنے سے سیدھے راستے پر ہدایت ملتی ہے۔" },
    { number:95, arabic:"الْبَدِيعُ", english:"Al-Badi", meaning_en:"The Incomparable Originator", urdu:"بے مثال پیدا کرنے والا", benefit_en:"Reciting this name 100 times invites unique and wonderful blessings.", benefit_ur:"اس نام کو 100 بار پڑھنے سے انوکھی اور حیرت انگیز برکات ملتی ہیں۔" },
    { number:96, arabic:"الْبَاقِي", english:"Al-Baqi", meaning_en:"The Ever-Enduring", urdu:"ہمیشہ باقی رہنے والا", benefit_en:"Reciting this name 100 times grants steadfastness in faith until the end.", benefit_ur:"اس نام کو 100 بار پڑھنے سے ایمان پر آخر تک استقامت ملتی ہے۔" },
    { number:97, arabic:"الْوَارِثُ", english:"Al-Warith", meaning_en:"The Inheritor", urdu:"وارث", benefit_en:"Reciting this name 100 times grants inheritance of divine blessings.", benefit_ur:"اس نام کو 100 بار پڑھنے سے اللہ کی نعمتوں کی وراثت ملتی ہے۔" },
    { number:98, arabic:"الرَّشِيدُ", english:"Ar-Rashid", meaning_en:"The Rightly-Guided", urdu:"درست راہ دکھانے والا", benefit_en:"Reciting this name 100 times grants maturity and the ability to act wisely.", benefit_ur:"اس نام کو 100 بار پڑھنے سے پختگی اور دانشمندی سے کام لینے کی صلاحیت ملتی ہے۔" },
    { number:99, arabic:"الصَّبُورُ", english:"As-Sabur", meaning_en:"The Patient", urdu:"بہت صبر کرنے والا", benefit_en:"Reciting this name 100 times grants immense patience in times of hardship.", benefit_ur:"اس نام کو 100 بار پڑھنے سے مصیبت کے وقت بے پناہ صبر ملتا ہے۔" }
];

// ======================================
// DOM ELEMENTS
// ======================================
const namesGrid = document.getElementById("namesGrid");
const detailOverlay = document.getElementById("nameDetailOverlay");
const closeDetailBtn = document.getElementById("closeDetailBtn");

// Detail elements
const detailNumber = document.getElementById("detailNameNumber");
const detailArabic = document.getElementById("detailArabic");
const detailEnglish = document.getElementById("detailEnglish");
const detailEnglishMeaning = document.getElementById("detailEnglishMeaning");
const detailUrdu = document.getElementById("detailUrdu");
const detailBenefitEn = document.getElementById("detailBenefitEn");
const detailBenefitUr = document.getElementById("detailBenefitUr");
const detailFavBtn = document.getElementById("detailFavoriteBtn");
const detailPrevBtn = document.getElementById("detailPrevBtn");
const detailNextBtn = document.getElementById("detailNextBtn");

// Audio elements (SEPARATE CARD - no sync with names)
const mainAudioBtn = document.getElementById("mainAudioBtn");
const nameAudio = document.getElementById("nameAudio");
const audioProgressBar = document.getElementById("audioProgressBar");
const audioNameText = document.getElementById("audioNameText");

// More menu
const moreNavBtn = document.getElementById("moreNavBtn");
const moreMenu = document.getElementById("moreMenu");
const closeMoreMenuBtn = document.getElementById("closeMoreMenuBtn");
const namesSettingsBtn = document.getElementById("namesSettingsBtn");

// ======================================
// VARIABLES
// ======================================
let currentIndex = 0;
let favoriteNames = JSON.parse(localStorage.getItem("favoriteNames") || "[]");
let isPlaying = false;

// ======================================
// RENDER GRID
// ======================================
function renderGrid(){
    namesGrid.innerHTML = "";
    namesOfAllah.forEach(name => {
        const card = document.createElement("div");
        card.className = "name-grid-card";
        card.innerHTML = `
            <span class="grid-number">${String(name.number).padStart(2,"0")}</span>
            <span class="grid-arabic">${name.arabic}</span>
            <span class="grid-english">${name.english}</span>
        `;
        card.addEventListener("click", ()=>{
            openDetail(name.number - 1);
        });
        namesGrid.appendChild(card);
    });
}

// ======================================
// OPEN DETAIL
// ======================================
function openDetail(index){
    if(index < 0) index = 0;
    if(index >= namesOfAllah.length) index = namesOfAllah.length - 1;
    currentIndex = index;
    showNameInDetail(currentIndex);
    detailOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeDetail(){
    detailOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

function showNameInDetail(index){
    const name = namesOfAllah[index];
    detailNumber.textContent = String(name.number).padStart(2,"0");
    detailArabic.textContent = name.arabic;
    detailEnglish.textContent = name.english;
    detailEnglishMeaning.textContent = name.meaning_en;
    detailUrdu.textContent = name.urdu;
    detailBenefitEn.textContent = name.benefit_en;
    detailBenefitUr.textContent = name.benefit_ur;
    
    const isFav = favoriteNames.includes(name.number);
    detailFavBtn.innerHTML = isFav ? '<i class="fa-solid fa-heart"></i> Favorite' : '<i class="fa-regular fa-heart"></i> Favorite';
    detailFavBtn.classList.toggle("favorite-active", isFav);
    
    detailPrevBtn.disabled = index === 0;
    detailNextBtn.disabled = index === namesOfAllah.length - 1;
}

// ======================================
// NAVIGATION (Detail)
// ======================================
detailPrevBtn.addEventListener("click", ()=>{
    if(currentIndex > 0) openDetail(currentIndex - 1);
});
detailNextBtn.addEventListener("click", ()=>{
    if(currentIndex < namesOfAllah.length - 1) openDetail(currentIndex + 1);
});

// ======================================
// FAVORITE (Detail)
// ======================================
detailFavBtn.addEventListener("click", ()=>{
    const number = namesOfAllah[currentIndex].number;
    if(favoriteNames.includes(number)){
        favoriteNames = favoriteNames.filter(item => item !== number);
    } else {
        favoriteNames.push(number);
    }
    localStorage.setItem("favoriteNames", JSON.stringify(favoriteNames));
    showNameInDetail(currentIndex);
});

// ======================================
// CLOSE DETAIL
// ======================================
closeDetailBtn.addEventListener("click", closeDetail);
detailOverlay.addEventListener("click", (e)=>{
    if(e.target === detailOverlay) closeDetail();
});

// Keyboard: Escape to close
document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && detailOverlay.classList.contains("active")) closeDetail();
});

// ======================================
// AUDIO SYSTEM (SEPARATE CARD - NO SYNC)
// ======================================
mainAudioBtn.addEventListener("click", ()=>{
    if(nameAudio.paused){
        nameAudio.play().catch(()=>{
            alert("Audio is loading. Please try again.");
        });
    } else {
        nameAudio.pause();
    }
});

nameAudio.addEventListener("play", ()=>{
    mainAudioBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;
    audioNameText.textContent = "Playing...";
});

nameAudio.addEventListener("pause", ()=>{
    mainAudioBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    isPlaying = false;
    audioNameText.textContent = "Paused";
});

nameAudio.addEventListener("timeupdate", ()=>{
    if(!nameAudio.duration || !isFinite(nameAudio.duration)) return;
    const percent = (nameAudio.currentTime / nameAudio.duration) * 100;
    audioProgressBar.style.width = percent + "%";
});

nameAudio.addEventListener("ended", ()=>{
    audioProgressBar.style.width = "0%";
    mainAudioBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    isPlaying = false;
    audioNameText.textContent = "Complete Recitation";
});

// ======================================
// DOWNLOAD AUDIO
// ======================================
function downloadAudio(){
    const link = document.createElement('a');
    link.href = 'name of allah.mp3';
    link.download = '99_Names_of_Allah.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
window.downloadAudio = downloadAudio;

// ======================================
// MORE MENU
// ======================================
if(moreNavBtn && moreMenu && closeMoreMenuBtn){
    moreNavBtn.addEventListener("click", (e)=>{
        e.stopPropagation();
        moreMenu.classList.add("show");
    });
    closeMoreMenuBtn.addEventListener("click", (e)=>{
        e.stopPropagation();
        moreMenu.classList.remove("show");
    });
    document.addEventListener("click", (e)=>{
        if(moreMenu.classList.contains("show") && !moreMenu.contains(e.target) && !moreNavBtn.contains(e.target)){
            moreMenu.classList.remove("show");
        }
    });
    if(namesSettingsBtn){
        namesSettingsBtn.addEventListener("click", (e)=>{
            e.stopPropagation();
            moreMenu.classList.remove("show");
            alert("Settings will be added soon.");
        });
    }
}

// ======================================
// START
// ======================================
document.addEventListener("DOMContentLoaded", ()=>{
    renderGrid();
});