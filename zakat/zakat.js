/* =========================================
   MY PRAYER - ZAKAT CALCULATOR
   COMPLETE JAVASCRIPT
   (Added Quran-style More Menu)
========================================= */


/* =========================================
   CONSTANTS
========================================= */

const ZAKAT_RATE = 0.025;

/*
    Nisab:
    Gold = 87.48 grams
    Silver = 612.36 grams

    1 tola = 11.6638125 grams
*/

const GOLD_NISAB_GRAMS = 87.48;
const SILVER_NISAB_GRAMS = 612.36;
const TOLA_GRAMS = 11.6638125;


/*
    Fallback rates.

    These are ONLY used if live Internet
    rates cannot be retrieved.
*/

let goldPricePerOunceUSD = 0;
let silverPricePerOunceUSD = 0;
let usdToPkr = 0;


/* =========================================
   CURRENT RATES
========================================= */

let goldRatePerTola = 0;
let silverRatePerTola = 0;


/* =========================================
   DOM ELEMENTS
========================================= */

const goldPurity =
    document.getElementById("goldPurity");

const goldWeight =
    document.getElementById("goldWeight");

const silverWeight =
    document.getElementById("silverWeight");

const cashAmount =
    document.getElementById("cashAmount");

const bankAmount =
    document.getElementById("bankAmount");

const businessAmount =
    document.getElementById("businessAmount");

const otherAmount =
    document.getElementById("otherAmount");

const debtAmount =
    document.getElementById("debtAmount");


const goldValue =
    document.getElementById("goldValue");

const silverValue =
    document.getElementById("silverValue");

const totalAssets =
    document.getElementById("totalAssets");

const totalDebt =
    document.getElementById("totalDebt");

const zakatableWealth =
    document.getElementById("zakatableWealth");

const zakatAmount =
    document.getElementById("zakatAmount");

const nisabAmount =
    document.getElementById("nisabAmount");

const nisabStatus =
    document.getElementById("nisabStatus");


const goldRateDisplay =
    document.getElementById("goldRateDisplay");

const silverRateDisplay =
    document.getElementById("silverRateDisplay");

const rateStatus =
    document.getElementById("rateStatus");

const rateUpdated =
    document.getElementById("rateUpdated");

const refreshRatesBtn =
    document.getElementById("refreshRatesBtn");


// More Menu Elements
const moreNavBtn = document.getElementById("moreNavBtn");
const moreMenu = document.getElementById("moreMenu");
const closeMoreMenuBtn = document.getElementById("closeMoreMenuBtn");
const settingsBtn = document.getElementById("settingsBtn");


/* =========================================
   NISAB STATE
========================================= */

let selectedNisab = "silver";


/* =========================================
   FORMAT MONEY
========================================= */

function formatPKR(value){

    if(!Number.isFinite(value)){
        value = 0;
    }

    return "Rs " + Math.round(value)
        .toLocaleString("en-PK");
}


/* =========================================
   NUMBER VALUE
========================================= */

function numberValue(element){

    if(!element){
        return 0;
    }

    const value =
        parseFloat(element.value);

    return Number.isFinite(value)
        ? Math.max(value,0)
        : 0;
}


/* =========================================
   GOLD PURITY FACTOR
========================================= */

function getGoldPurityFactor(){

    const purity =
        Number(goldPurity.value);

    return purity / 24;

}


/* =========================================
   CALCULATE GOLD RATE
========================================= */

function calculateGoldRate(){

    if(!goldPricePerOunceUSD || !usdToPkr){
        return 0;
    }

    /*
        1 troy ounce = 31.1034768 grams
        1 tola = 11.6638125 grams
    */

    const usdPerGram =
        goldPricePerOunceUSD /
        31.1034768;

    const pkrPerGram =
        usdPerGram *
        usdToPkr;

    return (
        pkrPerGram *
        TOLA_GRAMS
    );
}


/* =========================================
   CALCULATE SILVER RATE
========================================= */

function calculateSilverRate(){

    if(!silverPricePerOunceUSD || !usdToPkr){
        return 0;
    }

    const usdPerGram =
        silverPricePerOunceUSD /
        31.1034768;

    const pkrPerGram =
        usdPerGram *
        usdToPkr;

    return (
        pkrPerGram *
        TOLA_GRAMS
    );
}


/* =========================================
   GOLD VALUE
========================================= */

function calculateGoldValue(){

    const grams =
        numberValue(goldWeight);

    if(!grams){
        return 0;
    }

    const purityFactor =
        getGoldPurityFactor();

    /*
        24K live rate is adjusted according
        to selected purity.
    */

    const ratePerGram =
        (goldRatePerTola /
        TOLA_GRAMS) *
        purityFactor;

    return grams * ratePerGram;
}


/* =========================================
   SILVER VALUE
========================================= */

function calculateSilverValue(){

    const grams =
        numberValue(silverWeight);

    if(!grams){
        return 0;
    }

    const ratePerGram =
        silverRatePerTola /
        TOLA_GRAMS;

    return grams * ratePerGram;
}


/* =========================================
   TOTAL ASSETS
========================================= */

function calculateTotalAssets(){

    const gold =
        calculateGoldValue();

    const silver =
        calculateSilverValue();

    const cash =
        numberValue(cashAmount);

    const bank =
        numberValue(bankAmount);

    const business =
        numberValue(businessAmount);

    const other =
        numberValue(otherAmount);


    return (
        gold +
        silver +
        cash +
        bank +
        business +
        other
    );
}


/* =========================================
   UPDATE CALCULATION
========================================= */

function calculateZakat(){

    const gold =
        calculateGoldValue();

    const silver =
        calculateSilverValue();

    const total =
        calculateTotalAssets();

    const debt =
        numberValue(debtAmount);


    /*
        Debt cannot make wealth negative.
    */

    const wealth =
        Math.max(total - debt,0);

    const zakat =
        wealth * ZAKAT_RATE;


    /* Gold */

    goldValue.textContent =
        formatPKR(gold);


    /* Silver */

    silverValue.textContent =
        formatPKR(silver);


    /* Totals */

    totalAssets.textContent =
        formatPKR(total);

    totalDebt.textContent =
        formatPKR(debt);

    zakatableWealth.textContent =
        formatPKR(wealth);

    zakatAmount.textContent =
        formatPKR(zakat);


    updateNisab(wealth);

}


/* =========================================
   UPDATE NISAB
========================================= */

function updateNisab(wealth){

    let threshold = 0;

    if(selectedNisab === "silver"){

        const silverPerGram =
            silverRatePerTola /
            TOLA_GRAMS;

        threshold =
            silverPerGram *
            SILVER_NISAB_GRAMS;

    }else{

        const goldPerGram =
            goldRatePerTola /
            TOLA_GRAMS;

        threshold =
            goldPerGram *
            GOLD_NISAB_GRAMS;

    }


    nisabAmount.textContent =
        formatPKR(threshold);


    if(!wealth){

        nisabStatus.textContent =
            "Enter your assets";

        nisabStatus.className =
            "status-pending";

        return;
    }


    if(wealth >= threshold){

        nisabStatus.textContent =
            "Above Nisab ✓";

        nisabStatus.className =
            "status-success";

    }else{

        nisabStatus.textContent =
            "Below Nisab";

        nisabStatus.className =
            "status-danger";

    }

}


/* =========================================
   FETCH GOLD
========================================= */

async function fetchGoldPrice(){

    const response =
        await fetch(
            "https://api.gold-api.com/price/XAU",
            {
                cache:"no-store"
            }
        );

    if(!response.ok){
        throw new Error(
            "Gold API error"
        );
    }

    const data =
        await response.json();

    /*
        gold-api returns USD price
        of one troy ounce.
    */

    if(!data.price){
        throw new Error(
            "Invalid gold price"
        );
    }

    return Number(data.price);

}


/* =========================================
   FETCH SILVER
========================================= */

async function fetchSilverPrice(){

    const response =
        await fetch(
            "https://api.gold-api.com/price/XAG",
            {
                cache:"no-store"
            }
        );

    if(!response.ok){
        throw new Error(
            "Silver API error"
        );
    }

    const data =
        await response.json();

    if(!data.price){
        throw new Error(
            "Invalid silver price"
        );
    }

    return Number(data.price);

}


/* =========================================
   FETCH USD / PKR
========================================= */

async function fetchUsdPkr(){

    const response =
        await fetch(
            "https://open.er-api.com/v6/latest/USD",
            {
                cache:"no-store"
            }
        );

    if(!response.ok){
        throw new Error(
            "Currency API error"
        );
    }

    const data =
        await response.json();

    if(
        !data.rates ||
        !data.rates.PKR
    ){
        throw new Error(
            "PKR rate unavailable"
        );
    }

    return Number(
        data.rates.PKR
    );

}


/* =========================================
   LOAD LIVE RATES
========================================= */

async function loadLiveRates(){

    rateStatus.textContent =
        "Updating live rates...";


    refreshRatesBtn.disabled = true;


    try{

        const results =
            await Promise.all([
                fetchGoldPrice(),
                fetchSilverPrice(),
                fetchUsdPkr()
            ]);


        goldPricePerOunceUSD =
            results[0];

        silverPricePerOunceUSD =
            results[1];

        usdToPkr =
            results[2];


        goldRatePerTola =
            calculateGoldRate();

        silverRatePerTola =
            calculateSilverRate();


        updateRateUI();


        localStorage.setItem(
            "zakatGoldRate",
            goldRatePerTola
        );

        localStorage.setItem(
            "zakatSilverRate",
            silverRatePerTola
        );

        localStorage.setItem(
            "zakatRateTime",
            Date.now()
        );


        rateStatus.textContent =
            "Live rates updated";


    }catch(error){

        console.error(
            "Live rate error:",
            error
        );


        /*
            Try previously saved rates.
        */

        const savedGold =
            Number(
                localStorage.getItem(
                    "zakatGoldRate"
                )
            );

        const savedSilver =
            Number(
                localStorage.getItem(
                    "zakatSilverRate"
                )
            );


        if(savedGold && savedSilver){

            goldRatePerTola =
                savedGold;

            silverRatePerTola =
                savedSilver;


            updateRateUI();


            rateStatus.textContent =
                "Using last saved rates";

        }else{

            rateStatus.textContent =
                "Live rates unavailable";

            goldRateDisplay.textContent =
                "Unavailable";

            silverRateDisplay.textContent =
                "Unavailable";

        }

    }


    refreshRatesBtn.disabled = false;

    calculateZakat();

}


/* =========================================
   UPDATE RATE UI
========================================= */

function updateRateUI(){

    goldRateDisplay.textContent =
        formatPKR(goldRatePerTola);

    silverRateDisplay.textContent =
        formatPKR(silverRatePerTola);


    const now =
        new Date();


    rateUpdated.textContent =
        now.toLocaleString(
            "en-PK",
            {
                dateStyle:"medium",
                timeStyle:"short"
            }
        );

}


/* =========================================
   NISAB BUTTONS
========================================= */

document
    .querySelectorAll(".nisab-btn")
    .forEach(function(button){

        button.addEventListener(
            "click",
            function(){

                document
                    .querySelectorAll(
                        ".nisab-btn"
                    )
                    .forEach(function(btn){

                        btn.classList.remove(
                            "active"
                        );

                    });


                this.classList.add(
                    "active"
                );


                selectedNisab =
                    this.dataset.nisab;


                calculateZakat();

            }
        );

    });


/* =========================================
   INPUT EVENTS
========================================= */

[
    goldPurity,
    goldWeight,
    silverWeight,
    cashAmount,
    bankAmount,
    businessAmount,
    otherAmount,
    debtAmount
]
.forEach(function(element){

    if(!element){
        return;
    }

    element.addEventListener(
        "input",
        calculateZakat
    );

    element.addEventListener(
        "change",
        calculateZakat
    );

});


/* =========================================
   REFRESH BUTTON
========================================= */

refreshRatesBtn.addEventListener(
    "click",
    loadLiveRates
);


/* =========================================
   AUTO UPDATE
========================================= */

/*
    Refresh every 15 minutes.
*/

setInterval(
    loadLiveRates,
    15 * 60 * 1000
);


/* =========================================
   MORE MENU LOGIC (Quran Style) - FIXED
========================================= */

if (moreNavBtn && moreMenu && closeMoreMenuBtn) {

    // Open More menu
    moreNavBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        moreMenu.classList.add("show");
    });

    // Close with X button
    closeMoreMenuBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        moreMenu.classList.remove("show");
    });

    // Close when clicking outside
    document.addEventListener("click", function(e) {
        if (moreMenu.classList.contains("show") &&
            !moreMenu.contains(e.target) &&
            !moreNavBtn.contains(e.target)) {
            moreMenu.classList.remove("show");
        }
    });

    // Settings button inside More
    if (settingsBtn) {
        settingsBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            moreMenu.classList.remove("show");
            alert("Settings will be available in the next update.");
        });
    }
}


/* =========================================
   INITIAL LOAD
========================================= */

calculateZakat();

loadLiveRates();