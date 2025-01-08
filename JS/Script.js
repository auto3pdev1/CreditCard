/* Global javascript script file - Handles functions of a global & shared */

//document.addEventListener('DOMContentLoaded', function () {

//});

const BILLING_DATE_OPTIONS = [
    { value: 1, text: "1st" },
    { value: 10, text: "10th" },
    { value: 15, text: "15th" },
    { value: 20, text: "20th" },
];
const CREDIT_CARD_TYPES = [
    { value: 1, text: "MasterCard" },
    { value: 2, text: "Visa" },
    { value: 3, text: "American Express" },
    { value: 4, text: "Diners" },
];
const CREDIT_CARD_STATUSES = [
    { value: 1, text: "Active" },
    { value: 2, text: "Blocked" },
    { value: 3, text: "Canceled" },
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
}

function CreditCard(type, number, expirationMonth, expirationYear, billingDate, limit, status) {
    this.type = type;
    this.number = number;
    this.expirationMonth = expirationMonth;
    this.expirationYear = expirationYear;
    this.billingDate = billingDate;
    this.limit = limit;
    this.status = status;
}
