/* Login user javascript script file - Handles functions of a login page */

const LOGIN_PAGE = 1;
const SIGN_UP_PAGE = 2;
const RESET_PAGE = 3;

// init login page - first loaded
document.addEventListener('DOMContentLoaded', function () {
    showLoginPage(LOGIN_PAGE);
});


function showLoginPage(page, callbackFunc) {
    switch (page) {
        case LOGIN_PAGE:
            loadHtmlPage('LoginForm/LoginForm', 'loginFormPlaceholder', callbackFunc);
            break;
        case SIGN_UP_PAGE:
            loadHtmlPage('SignUpForm/SignUpForm', 'loginFormPlaceholder', callbackFunc);
            break;
        case RESET_PAGE:
            loadHtmlPage('ResetPasswordForm/ResetPasswordForm', 'loginFormPlaceholder', callbackFunc);
            break;
    }
}

function loadSignUpPage() {
    showLoginPage(SIGN_UP_PAGE, function () {
        const newUserCreditCardTypeSelect = document.getElementById("newUserCreditCardTypeSelect");
        const newUserExpirationMonthSelect = document.getElementById("newUserExpirationMonthSelect");
        const newUserExpirationYearSelect = document.getElementById("newUserExpirationYearSelect");
        const newUserBillingDateSelect = document.getElementById("newUserBillingDateSelect");
        const newUserCreditCardStatusSelect = document.getElementById("newUserCreditCardStatusSelect");
        newUserCreditCardTypeSelect.innerHTML = "";
        newUserExpirationMonthSelect.innerHTML = ""; // Clear select options
        newUserExpirationYearSelect.innerHTML = "";
        newUserBillingDateSelect.innerHTML = "";
        newUserCreditCardStatusSelect.innerHTML = "";
        addSelectOption(newUserExpirationMonthSelect, 0, "--");
        addSelectOption(newUserExpirationYearSelect, 0, "----");
        addSelectOption(newUserCreditCardTypeSelect, "", "");

        CREDIT_CARD_TYPES.forEach((item) => {
            addSelectOption(newUserCreditCardTypeSelect, item.value, item.text);
        });

        for (let month = 1; month <= 12; month++) {
            addSelectOption(newUserExpirationMonthSelect, month, padToTwoDigits(month));
        }

        const currYear = new Date().getFullYear();
        for (let year = currYear; year <= currYear + 10; year++) {
            addSelectOption(newUserExpirationYearSelect, year, year);
        }

        BILLING_DATE_OPTIONS.forEach((item) => {
            addSelectOption(newUserBillingDateSelect, item.value, item.text);
        });

        CREDIT_CARD_STATUSES.forEach((item) => {
            addSelectOption(newUserCreditCardStatusSelect, item.value, item.text);
        });
        newUserCreditCardStatusSelect.value = 1;// Default value - active in new card
    });
}

function loadResetAccountPage() {
    showLoginPage(RESET_PAGE);
}

function loginUser() {
    let loggedInUser = null;
    const loginMessage = document.getElementById("loginMessage");
    loginMessage.classList.remove("error");
    loginMessage.innerText = '';
    const emailOk = validateEmptyInput("userEmailInput", "Email must be specified!")
    const passwordOk = validateEmptyInput("userPasswordInput", "Password must be specified!")
    if (emailOk && passwordOk) {
        const email = document.getElementById("userEmailInput").value;
        const password = document.getElementById("userPasswordInput").value;
        loggedInUser = findUser(email, password);
        if (!loggedInUser) {
            loginMessage.classList.add("error");
            loginMessage.innerText = "Invalid account!";
        }
    }
    if (loggedInUser) {
        setLoggedInUser(loggedInUser);
        location.href = 'Main.html';
    }
    return loggedInUser !== null;
}

function signUpUser() {
    const creditCard = new CreditCard(
        getSelectValue("newUserCreditCardTypeSelect"),
        getInputValueStr("newUserCreditCardNumberInput"),
        getInputValueStr("newUserExpirationMonthSelect"),
        getInputValueStr("newUserExpirationYearSelect"),
        getSelectValue("newUserBillingDateSelect"),
        getInputValueFloat("newUserCreditLimitInput"),
        getSelectValue("newUserCreditCardStatusSelect"));

    const user = new User(
        getInputValueStr("newUserFirstNameInput"),
        getInputValueStr("newUserLastNameInput"),
        getInputValueStr("newUserEmailInput"),
        getInputValueStr("newUserPasswordInput"),
        getInputValueDate("newUserBirthdayInput"),
        [creditCard])


    // Validate user fields
    if (!validateEmptyInput("newUserFirstNameInput", "First name must be specified!"))
        return;

    if (!validateEmptyInput("newUserLastNameInput", "Last name must be specified!"))
        return;
    if (!validateEmailInput("newUserEmailInput", "Email not valid!"))
        return;
    if (findUserByEmail(user.email)) {
        addInputErrorMessage("newUserEmailInput", "User with this email already exists!")
    }
    if (!validatePasswordInput("newUserPasswordInput", "Password not valid!"))
        return;
    if (!validateDateInput("newUserBirthdayInput", "Birthday must be specified!"))
        return;
    if (!user.isValidAge()) {
        addInputErrorMessage(
            "newUserBirthdayInput",
            `User age must be over ${USER_VALID_AGE} years old!`
        );
        return;
    }

    // Validate credit card fields
    if (!validateEmptyInput("newUserCreditCardTypeSelect", "Credit card type must be specified!"))
        return;
    if (!validateEmptyInput("newUserCreditCardNumberInput", "Credit card number must be specified!"))
        return;
    if (creditCard.number.length != 19) {
        addInputError("newUserCreditCardNumberInput", "Invalid card format!")
        return;
    }
    if (!validateEmptyInput("newUserExpirationMonthSelect", "Expiration month must be specified!"))
        return;
    if (!validateEmptyInput("newUserExpirationYearSelect", "Expiration year must be specified!"))
        return;

    addUser(user);
    backToLoginPage();
}

function resetUserPassword() {
    const email = getInputValueStr("resetUserEmailInput");
    const newPassword = getInputValueStr("resetUserPasswordInput");
    const user = findUserByEmail(email);
    if (!validateEmailInput("resetUserEmailInput", "Email not valid!"))
        return;
    if (!user) {
        addInputErrorMessage("resetUserEmailInput", "User with this email does not exist!")
    }
    if (!validatePasswordInput("resetUserPasswordInput", "Password not valid!"))
        return;
    user.password = newPassword;
    updateUser(user);
    backToLoginPage();
}

function backToLoginPage() {
    showLoginPage(LOGIN_PAGE);
}

function setCreditLimitSpan(input) {
    document.getElementById("newUserCreditLimitSpan").innerText = formatCurrency(input.value);
}
