// ======================================
// MY PRAYER - ISLAMIC CALENDAR WITH EVENTS
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
// ISLAMIC EVENTS
// ======================================
const islamicEvents = {
    // Month: { day: "Event Name" }
    1: { // Muharram
        1: "🌙 Islamic New Year",
        10: "🕊️ Day of Ashura"
    },
    3: { // Rabi al-Awwal
        12: "🌹 Mawlid an-Nabi (PBUH)"
    },
    7: { // Rajab
        27: "🕌 Al-Isra wal-Mi'raj"
    },
    8: { // Sha'ban
        15: "🌙 Shab-e-Barat"
    },
    9: { // Ramadan
        1: "🌙 First Day of Ramadan",
        27: "⭐ Laylat al-Qadr"
    },
    10: { // Shawwal
        1: "🎉 Eid al-Fitr"
    },
    12: { // Dhu al-Hijjah
        9: "🤲 Day of Arafah",
        10: "🐐 Eid al-Adha"
    }
};

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
// GET EVENT
// ======================================
function getEventForDate(day, month) {
    const monthEvents = islamicEvents[month];
    if (!monthEvents) return null;
    return monthEvents[day] || null;
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

    // Event display
    const event = getEventForDate(hijri.day, hijri.month);
    const eventElement = document.getElementById("eventDisplay");
    if (eventElement) {
        eventElement.textContent = event || "—";
        eventElement.style.color = event ? "#fbbf24" : "var(--text-muted)";
    }
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

    englishMonth.textContent = monthYearFormatter.format(currentDate);

    const firstDay = new Date(year, month, 1);
    let startingDay = firstDay.getDay();
    startingDay = startingDay === 0 ? 6 : startingDay - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();
    const totalCells = Math.ceil((startingDay + daysInMonth) / 7) * 7;

    for (let index = 0; index < totalCells; index++) {
        const dayElement = document.createElement("div");
        dayElement.className = "calendar-day";
        let cellDate;

        if (index < startingDay) {
            const day = previousMonthDays - startingDay + index + 1;
            cellDate = new Date(year, month - 1, day);
            dayElement.classList.add("other-month");
        } else if (index < startingDay + daysInMonth) {
            const day = index - startingDay + 1;
            cellDate = new Date(year, month, day);
        } else {
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

        // Event badge
        const event = getEventForDate(hijri.day, hijri.month);
        if (event) {
            const badge = document.createElement("span");
            badge.className = "event-badge";
            badge.style.cssText = `
                font-size: 7px;
                background: var(--primary);
                color: #000;
                padding: 1px 4px;
                border-radius: 10px;
                margin-top: 2px;
                font-weight: 700;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
                line-height: 1.2;
            `;
            badge.textContent = event.length > 10 ? event.substring(0, 10) + "…" : event;
            dayElement.appendChild(badge);
        }

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
// MORE MENU LOGIC (Quran Style)
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
// INITIALIZE
// ======================================
document.addEventListener("DOMContentLoaded", function() {
    currentDate = new Date();
    selectedDate = new Date();
    updateSelectedDate();
    renderCalendar();

    // If event row doesn't exist in HTML, create it
    const eventRow = document.getElementById("eventRow");
    if (!eventRow) {
        const detailsCard = document.querySelector(".date-details-card");
        if (detailsCard) {
            const newRow = document.createElement("div");
            newRow.className = "details-row";
            newRow.id = "eventRow";
            newRow.innerHTML = `
                <span><i class="fa-solid fa-star" style="color: var(--primary);"></i> Islamic Event</span>
                <strong id="eventDisplay" style="color: #fbbf24;">—</strong>
            `;
            detailsCard.appendChild(newRow);
        }
    }
});

// ======================================
// ISLAMIC EVENTS COUNTDOWN
// ======================================
function calculateIslamicEvents() {
    const currentHijri = getHijriDate(currentDate);
    let hijriYear = currentHijri.year;
    let hijriMonth = currentHijri.month;
    let hijriDay = currentHijri.day;

    const events = [
        { name: 'Ramadan', month: 9, day: 1, id: 'ramadanDays' },
        { name: 'Eid al-Fitr', month: 10, day: 1, id: 'eidFitrDays' },
        { name: 'Day of Arafah', month: 12, day: 9, id: 'arafahDays' },
        { name: 'Eid al-Adha', month: 12, day: 10, id: 'eidAdhaDays' }
    ];

    events.forEach(event => {
        let days = daysUntilHijri(hijriYear, hijriMonth, hijriDay, event.month, event.day);
        if (days < 0) {
            days = daysUntilHijri(hijriYear + 1, hijriMonth, hijriDay, event.month, event.day);
        }
        document.getElementById(event.id).textContent = days >= 0 ? days : '--';
    });
}

function daysUntilHijri(currentYear, currentMonth, currentDay, targetMonth, targetDay) {
    const daysInMonth = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    let days = 0;
    if (targetMonth < currentMonth || (targetMonth === currentMonth && targetDay < currentDay)) {
        // Next year
        for (let m = currentMonth - 1; m < 12; m++) days += daysInMonth[m] || 30;
        for (let m = 0; m < targetMonth - 1; m++) days += daysInMonth[m] || 30;
        days += targetDay;
        days -= currentDay;
        return days;
    } else {
        for (let m = currentMonth - 1; m < targetMonth - 1; m++) days += daysInMonth[m] || 30;
        days += targetDay - currentDay;
        return days;
    }
}

// انٹرویو میں کال کریں (DOMContentLoaded کے اندر)
calculateIslamicEvents();
setInterval(calculateIslamicEvents, 600000); // ہر 10 منٹ بعد اپ ڈیٹ