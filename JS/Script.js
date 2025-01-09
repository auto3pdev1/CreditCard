/* Global javascript script file - Handles functions of a global & shared */

//document.addEventListener('DOMContentLoaded', function () {

//});

const BILLING_DATE_OPTIONS = [
    { value: 1, text: '1st' },
    { value: 10, text: '10th' },
    { value: 15, text: '15th' },
    { value: 20, text: '20th' },
];
const CREDIT_CARD_TYPES = [
    { value: 1, text: 'MasterCard', icon: 'fa-cc-mastercard' },
    { value: 2, text: 'Visa', icon: 'fa-cc-visa' },
    { value: 3, text: 'American Express', icon: 'fa-credit-card' },
    { value: 4, text: 'Diners', icon: 'fa-cc-diners-club' },
];
const CREDIT_CARD_STATUSES = [
    { value: 1, text: 'Active' },
    { value: 2, text: 'Blocked' },
    { value: 3, text: 'Canceled' },
];

const USER_VALID_AGE = 16;

function User(firstName, lastName, email, password, birthday, cards) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.cards = cards;
    this.isValidAge = function () {
        const today = new Date();
        const birthDate = new Date(this.birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        // Adjust age if the birthday has not occurred yet this year
        const hasBirthdayPassed =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
                today.getDate() >= birthDate.getDate());

        if (!hasBirthdayPassed) {
            age--;
        }
        return age >= USER_VALID_AGE;
    };
    this.displayUserName = function () {
        return `${this.firstName} ${this.lastName}`;
    };
}

function CreditCard(type, number, expirationMonth, expirationYear, billingDate, limit, status) {
    this.type = type;
    this.number = number;
    this.expirationMonth = expirationMonth;
    this.expirationYear = expirationYear;
    this.billingDate = billingDate;
    this.limit = limit;
    this.status = status;
    this.getBalance = function () {
        return 0;
    };
    this.getTypeIcon = function ()
    {
        return CREDIT_CARD_TYPES.find((type) => type.value == this.type).icon;
    };
    this.displayBillingDate = function (month, year)
    {
        const billingOption = BILLING_DATE_OPTIONS.find((option) => option.value == this.billingDate);
        return `${billingOption.value}/${month}/${year}`;
    };
    this.displayExpirationDate = function () {
        return `${this.expirationMonth} / ${this.expirationYear}`;
    };
    this.displayCardNumber = function () {

        return `**** **** **** ${this.number.slice(-4)}`;
    };
    this.displayCardStatus = function () {
        return CREDIT_CARD_STATUSES.find((status) => status.value == (this.status ?? 1)).text;
    };
    this.getCardStatusClass = function () {
        return CREDIT_CARD_STATUSES.find((status) => status.value == (this.status ?? 1)).text.toLowerCase();
    };
}

// convert user stract to object
function convertToUserObject(user) {
    if (!user)
        return null;

    const userObj = new User(
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.birthday,
        user.cards);
    return userObj;
}

// convert user stract to object
function convertToCardObject(card) {
    if (!card)
        return null;
    
    const cardObj = new CreditCard(
        card.type,
        card.number,
        card.expirationMonth,
        card.expirationYear,
        card.billingDate,
        card.limit,
        card.status);
    return cardObj;
}



