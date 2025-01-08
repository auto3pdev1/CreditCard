/* Main page javascript script file - Handles functions of a main page */

const DASHBOARD_PAGE = 1;
const CHARGES_PAGE = 2;
const ACTIONS_PAGE = 3;

function loadMainPage(menuItem, page) {
    if (menuItem) {

        if (menuItem.classList.contains('active'))
            return;

        const mainMenu = document.getElementsByClassName('main-menu')[0];

        let menuItems = mainMenu.querySelectorAll('a.active');
        menuItems.forEach((element) => {
            element.classList.remove('active');
        });
        menuItem.classList.add('active');
    }

    const pageTitle = document.getElementById('pageTitle');
    pageTitle.innerText = 'CreditMate';

    

    switch (page) {
        case DASHBOARD_PAGE:
            pageTitle.innerText += ' / Dashboard';
            //loadHtmlPage('DashboardPage/DashboardPage', 'mainPagePlaceholder', callbackFunc);
            break;
        case CHARGES_PAGE:
            pageTitle.innerText += ' / Charges';
            //loadHtmlPage('ChargesPage/ChargesPage', 'mainPagePlaceholder', callbackFunc);
            break;
        case ACTIONS_PAGE:
            pageTitle.innerText += ' / Actions';
            //loadHtmlPage('ActionsPage/ActionsPage', 'mainPagePlaceholder', callbackFunc);
            break;
    }
}






//function loadDashboardPage() {
//    const cardsContainer = document.getElementsByClassName("cards-container")[0]
//    cardsContainer.innerHTML = "";
//    const user = getLoggedInUser();
//    if (!user) return;

//    user.cards.forEach((card) => {
//        const cardDiv = document.createElement("div");
//        cardDiv.classList.add("credit-card")
//        const spn = document.createElement("span");
//        spn.innerText = card.number;
//        cardDiv.appendChild(spn);
//        cardsContainer.appendChild(cardDiv);
//        cardDiv.addEventListener("click", function (event) {
//            loadCardDashboardData(card);
//        });
//    })
//    loadCardDashboardData(user.cards[0]);
//}

//function loadCardDashboardData(card) {
//    //const chargesContainer = document.getElementsByClassName("charges-container");
//    //const limitContainer = document.getElementsByClassName("limit-container");
//    const previousMonthCharge = document.getElementById("previousMonthCharge");
//    const nextMonthCharge = document.getElementById("nextMonthCharge");
//    const limitAndUsed = document.getElementById("limitAndUsed");
//    let previousMonthChargeAmount = 0;
//    let nextMonthChargeAmount = 0;
//    let used = 0;
//    previousMonthCharge.innerText = formatCurrency(previousMonthChargeAmount);
//    nextMonthCharge.innerText = formatCurrency(nextMonthChargeAmount);
//    limitAndUsed.innerText = formatCurrency(card.limit) + " / " + formatCurrency(used)
//}

