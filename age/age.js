// ======================================
// MY PRAYER - AGE CALCULATOR
// ======================================


// ======================================
// ELEMENTS
// ======================================

const birthDateInput =
    document.getElementById("birthDate");

const calculateBtn =
    document.getElementById("calculateBtn");

const resetBtn =
    document.getElementById("resetBtn");

const resultSection =
    document.getElementById("resultSection");

const liveAgeCard =
    document.getElementById("liveAgeCard");

const statsSection =
    document.getElementById("statsSection");

const birthdayCard =
    document.getElementById("birthdayCard");

const birthDayCard =
    document.getElementById("birthDayCard");

const islamicCard =
    document.getElementById("islamicCard");


// Age values

const yearsValue =
    document.getElementById("yearsValue");

const monthsValue =
    document.getElementById("monthsValue");

const daysValue =
    document.getElementById("daysValue");


// Live age

const liveYears =
    document.getElementById("liveYears");

const liveMonths =
    document.getElementById("liveMonths");

const liveDays =
    document.getElementById("liveDays");

const liveTime =
    document.getElementById("liveTime");


// Statistics

const totalMonths =
    document.getElementById("totalMonths");

const totalWeeks =
    document.getElementById("totalWeeks");

const totalDays =
    document.getElementById("totalDays");


// Birthday

const birthdayDate =
    document.getElementById("birthdayDate");

const birthdayCountdown =
    document.getElementById("birthdayCountdown");


// Birth day

const birthDayName =
    document.getElementById("birthDayName");


// Islamic

const islamicBirthDate =
    document.getElementById("islamicBirthDate");


// More menu

const moreNavBtn =
    document.getElementById("moreNavBtn");

const moreMenu =
    document.getElementById("moreMenu");

const settingsBtn =
    document.getElementById("settingsBtn");


// ======================================
// VARIABLES
// ======================================

let birthDate = null;

let liveTimer = null;

let birthdayTimer = null;


// ======================================
// DATE HELPERS
// ======================================

function pad(number){

    return String(number).padStart(2,"0");

}


// ======================================
// CALCULATE AGE
// ======================================

function calculateAge(fromDate, toDate){

    let years =
        toDate.getFullYear() -
        fromDate.getFullYear();

    let months =
        toDate.getMonth() -
        fromDate.getMonth();

    let days =
        toDate.getDate() -
        fromDate.getDate();


    if(days < 0){

        months--;

        const previousMonth =
            new Date(
                toDate.getFullYear(),
                toDate.getMonth(),
                0
            );

        days += previousMonth.getDate();

    }


    if(months < 0){

        years--;

        months += 12;

    }


    return {
        years,
        months,
        days
    };

}


// ======================================
// TOTAL DAYS
// ======================================

function calculateTotalDays(){

    const now = new Date();

    const difference =
        now.getTime() -
        birthDate.getTime();

    return Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
    );

}


// ======================================
// FORMAT DATE
// ======================================

function formatDate(date){

    return date.toLocaleDateString(
        "en-US",
        {
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );

}


// ======================================
// DAY NAME
// ======================================

function getDayName(date){

    return date.toLocaleDateString(
        "en-US",
        {
            weekday:"long"
        }
    );

}


// ======================================
// NEXT BIRTHDAY
// ======================================

function getNextBirthday(){

    const now = new Date();

    let nextBirthday =
        new Date(
            now.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );


    if(nextBirthday < now){

        nextBirthday =
            new Date(
                now.getFullYear() + 1,
                birthDate.getMonth(),
                birthDate.getDate()
            );

    }


    return nextBirthday;

}


// ======================================
// BIRTHDAY COUNTDOWN
// ======================================

function updateBirthdayCountdown(){

    if(!birthDate) return;


    const now = new Date();

    const nextBirthday =
        getNextBirthday();


    let difference =
        nextBirthday.getTime() -
        now.getTime();


    if(difference < 0){

        difference = 0;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference %
            (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (difference %
            (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (difference %
            (1000 * 60)) /
            1000
        );


    birthdayDate.textContent =
        formatDate(nextBirthday);


    birthdayCountdown.textContent =
        `${days} Days : ${pad(hours)} Hours : ${pad(minutes)} Minutes : ${pad(seconds)} Seconds`;

}


// ======================================
// LIVE AGE
// ======================================

function updateLiveAge(){

    if(!birthDate) return;


    const now = new Date();

    const age =
        calculateAge(
            birthDate,
            now
        );


    liveYears.textContent =
        age.years;

    liveMonths.textContent =
        age.months;

    liveDays.textContent =
        age.days;


    const totalDaysValue =
        calculateTotalDays();


    const yearsDate =
        new Date(
            birthDate.getFullYear() +
            age.years,

            birthDate.getMonth(),

            birthDate.getDate()
        );


    let remainingTime =
        now.getTime() -
        yearsDate.getTime();


    if(remainingTime < 0){

        remainingTime = 0;

    }


    const hours =
        Math.floor(
            remainingTime /
            (1000 * 60 * 60)
        ) % 24;


    const minutes =
        Math.floor(
            remainingTime /
            (1000 * 60)
        ) % 60;


    const seconds =
        Math.floor(
            remainingTime /
            1000
        ) % 60;


    liveTime.textContent =
        `${pad(hours)} Hours : ${pad(minutes)} Minutes : ${pad(seconds)} Seconds`;

}


// ======================================
// ISLAMIC DATE
// ======================================

function getIslamicDate(date){

    try{

        return new Intl.DateTimeFormat(
            "en-US-u-ca-islamic",
            {
                day:"numeric",
                month:"long",
                year:"numeric"
            }
        ).format(date);

    }catch(error){

        return "Islamic date unavailable";

    }

}


// ======================================
// SHOW RESULT
// ======================================

function showResult(){

    const now = new Date();

    const age =
        calculateAge(
            birthDate,
            now
        );


    yearsValue.textContent =
        age.years;

    monthsValue.textContent =
        age.months;

    daysValue.textContent =
        age.days;


    document.getElementById(
        "birthDateDisplay"
    ).textContent =
        "Born: " + formatDate(birthDate);


    // Total months

    const totalMonthsValue =
        age.years * 12 +
        age.months;


    totalMonths.textContent =
        totalMonthsValue;


    // Total weeks

    const days =
        calculateTotalDays();

    totalWeeks.textContent =
        Math.floor(days / 7);


    // Total days

    totalDays.textContent =
        days.toLocaleString();


    // Birth day

    birthDayName.textContent =
        getDayName(birthDate);


    // Islamic date

    islamicBirthDate.textContent =
        getIslamicDate(birthDate);


    // Show cards

    resultSection.classList.remove("hidden");

    liveAgeCard.classList.remove("hidden");

    statsSection.classList.remove("hidden");

    birthdayCard.classList.remove("hidden");

    birthDayCard.classList.remove("hidden");

    islamicCard.classList.remove("hidden");


    // Clear previous timers

    clearInterval(liveTimer);

    clearInterval(birthdayTimer);


    updateLiveAge();

    updateBirthdayCountdown();


    liveTimer =
        setInterval(
            updateLiveAge,
            1000
        );


    birthdayTimer =
        setInterval(
            updateBirthdayCountdown,
            1000
        );

}


// ======================================
// CALCULATE BUTTON
// ======================================

calculateBtn.addEventListener(
    "click",
    function(){

        if(!birthDateInput.value){

            alert(
                "Please select your date of birth."
            );

            return;

        }


        const selectedDate =
            new Date(
                birthDateInput.value +
                "T00:00:00"
            );


        const now =
            new Date();


        if(selectedDate > now){

            alert(
                "Date of birth cannot be in the future."
            );

            return;

        }


        birthDate =
            selectedDate;


        showResult();

    }
);


// ======================================
// RESET
// ======================================

resetBtn.addEventListener(
    "click",
    function(){

        birthDateInput.value = "";

        birthDate = null;


        clearInterval(liveTimer);

        clearInterval(birthdayTimer);


        resultSection.classList.add("hidden");

        liveAgeCard.classList.add("hidden");

        statsSection.classList.add("hidden");

        birthdayCard.classList.add("hidden");

        birthDayCard.classList.add("hidden");

        islamicCard.classList.add("hidden");

    }
);


// ======================================
// MORE MENU
// ======================================

if(moreNavBtn && moreMenu){

    moreNavBtn.addEventListener(
        "click",
        function(event){

            event.preventDefault();

            event.stopPropagation();

            moreMenu.classList.toggle("show");

        }
    );


    moreMenu.addEventListener(
        "click",
        function(event){

            event.stopPropagation();

        }
    );


    document.addEventListener(
        "click",
        function(){

            moreMenu.classList.remove("show");

        }
    );

}


// ======================================
// SETTINGS
// ======================================

if(settingsBtn){

    settingsBtn.addEventListener(
        "click",
        function(){

            moreMenu.classList.remove("show");

            alert(
                "Settings will be available in the next update."
            );

        }
    );

}


// ======================================
// MAX DATE
// ======================================

const today =
    new Date();


birthDateInput.max =
    today.toISOString().split("T")[0];