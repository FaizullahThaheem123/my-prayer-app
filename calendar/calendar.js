// ======================================
// MY PRAYER - ISLAMIC CALENDAR
// ======================================

// ======================================
// VARIABLES
// ======================================
let currentDate = new Date();
let selectedDate = new Date();

// ======================================
// HIJRI MONTHS
// ======================================
const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabi al-Awwal",
    "Rabi al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah"
];

// ======================================
// ELEMENTS
// ======================================
const calendarGrid = document.getElementById("calendarGrid");
const englishMonth = document.getElementById("englishMonth");
const islamicMonth = document.getElementById("islamicMonth");
const selectedEnglishDate = document.getElementById("selectedEnglishDate");
const selectedIslamicDate = document.getElementById("selectedIslamicDate");
const detailDay = document.getElementById("detailDay");
const detailEnglish = document.getElementById("detailEnglish");
const detailHijriDay = document.getElementById("detailHijriDay");
const detailHijriMonth = document.getElementById("detailHijriMonth");
const detailHijriYear = document.getElementById("detailHijriYear");
const previousMonthBtn = document.getElementById("previousMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const todayBtn = document.getElementById("todayBtn");

// ======================================
// DATE FORMATTERS
// ======================================
const englishDateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

const shortEnglishFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
});

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric"
});

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long"
});

// ======================================
// GET HIJRI DATE
// ======================================
function getHijriDate(date) {
    const formatter = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });
    const parts = formatter.formatToParts(date);
    let day = 0,
        month = 0,
        year = 0;
    parts.forEach(part => {
        if (part.type === "day") day = Number(part.value);
        if (part.type === "month") month = Number(part.value);
        if (part.type === "year") year = Number(part.value);
    });
    return { day, month, year };
}

// ======================================
// FORMAT HIJRI
// ======================================
function formatHijri(date) {
    const hijri = getHijriDate(date);
    const monthName = hijriMonths[hijri.month - 1] || "";
    return `${hijri.day} ${monthName} ${hijri.year} AH`;
}

// ======================================
// UPDATE SELECTED DATE
// ======================================
function updateSelectedDate() {
    const hijri = getHijriDate(selectedDate);
    selectedEnglishDate.textContent = englishDateFormatter.format(selectedDate);
    selectedIslamicDate.textContent = formatHijri(selectedDate);
    detailDay.textContent = weekdayFormatter.format(selectedDate);
    detailEnglish.textContent = shortEnglishFormatter.format(selectedDate);
    detailHijriDay.textContent = hijri.day;
    detailHijriMonth.textContent = hijriMonths[hijri.month - 1];
    detailHijriYear.textContent = `${hijri.year} AH`;
}

// ======================================
// SAME DAY CHECK
// ======================================
function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

// ======================================
// RENDER CALENDAR
// ======================================
function renderCalendar() {
    calendarGrid.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Month title
    englishMonth.textContent = monthYearFormatter.format(currentDate);

    const firstDay = new Date(year, month, 1);
    let startingDay = firstDay.getDay();
    // Convert Sunday=0 to Monday=0
    startingDay = startingDay === 0 ? 6 : startingDay - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();
    const totalCells = Math.ceil((startingDay + daysInMonth) / 7) * 7;

    for (let index = 0; index < totalCells; index++) {
        const dayElement = document.createElement("div");
        dayElement.className = "calendar-day";
        let cellDate;

        if (index < startingDay) {
            // Previous month
            const day = previousMonthDays - startingDay + index + 1;
            cellDate = new Date(year, month - 1, day);
            dayElement.classList.add("other-month");
        } else if (index < startingDay + daysInMonth) {
            // Current month
            const day = index - startingDay + 1;
            cellDate = new Date(year, month, day);
        } else {
            // Next month
            const day = index - startingDay - daysInMonth + 1;
            cellDate = new Date(year, month + 1, day);
            dayElement.classList.add("other-month");
        }

        const hijri = getHijriDate(cellDate);

        const englishNumber = document.createElement("span");
        englishNumber.className = "english-number";
        englishNumber.textContent = cellDate.getDate();

        const hijriNumber = document.createElement("span");
        hijriNumber.className = "hijri-number";
        hijriNumber.textContent = hijri.day;

        dayElement.appendChild(englishNumber);
        dayElement.appendChild(hijriNumber);

        // Today
        const today = new Date();
        if (isSameDay(cellDate, today)) {
            dayElement.classList.add("today");
        }

        // Selected
        if (isSameDay(cellDate, selectedDate)) {
            dayElement.classList.add("selected");
        }

        // Click event
        dayElement.addEventListener("click", function() {
            selectedDate = new Date(cellDate);
            updateSelectedDate();
            renderCalendar();
        });

        calendarGrid.appendChild(dayElement);
    }

    // Hijri month title
    const middleDate = new Date(year, month, 15);
    const middleHijri = getHijriDate(middleDate);
    islamicMonth.textContent = `${hijriMonths[middleHijri.month - 1]} ${middleHijri.year} AH`;
}

// ======================================
// PREVIOUS MONTH
// ======================================
previousMonthBtn.addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

// ======================================
// NEXT MONTH
// ======================================
nextMonthBtn.addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// ======================================
// TODAY
// ======================================
todayBtn.addEventListener("click", function() {
    const today = new Date();
    currentDate = new Date(today);
    selectedDate = new Date(today);
    updateSelectedDate();
    renderCalendar();
});

// ======================================
// MORE MENU LOGIC (Quran Style) - FIXED
// ======================================
document.addEventListener("DOMContentLoaded", function() {
    const moreNavBtn = document.getElementById("moreNavBtn");
    const moreMenu = document.getElementById("moreMenu");
    const closeMoreMenuBtn = document.getElementById("closeMoreMenuBtn");
    const settingsBtn = document.getElementById("settingsBtn");

    // Open More menu
    if (moreNavBtn && moreMenu) {
        moreNavBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            moreMenu.classList.add("show");
        });
    } else {
        console.error("moreNavBtn or moreMenu not found!");
    }

    // Close with X button
    if (closeMoreMenuBtn && moreMenu) {
        closeMoreMenuBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            moreMenu.classList.remove("show");
        });
    }

    // Close when clicking outside
    document.addEventListener("click", function(e) {
        if (moreMenu && moreMenu.classList.contains("show") &&
            !moreMenu.contains(e.target) &&
            !moreNavBtn.contains(e.target)) {
            moreMenu.classList.remove("show");
        }
    });

    // Settings button
    if (settingsBtn && moreMenu) {
        settingsBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            moreMenu.classList.remove("show");
            alert("Settings page will be added soon.");
        });
    }
});

// ======================================
// INITIALIZE
// ======================================
document.addEventListener("DOMContentLoaded", function() {
    currentDate = new Date();
    selectedDate = new Date();
    updateSelectedDate();
    renderCalendar();
});