function showElement(elem) {
    elem.style.display = 'flex';
}
function hideElement(elem) {
    elem.style.display = 'none';
}
function addSelectOption(select, optionValue, optionText) {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionText;
    select.appendChild(option);
}

function getInputValueStr(inputId) {
    return String(document.getElementById(inputId).value).trim();
}
function getInputValueDate(inputId) {
    return new Date(document.getElementById(inputId).value);
}
function getInputValueFloat(inputId) {
    return parseFloat(document.getElementById(inputId).value);
}

function getSelectValue(selectId) {
    return document.getElementById(selectId).value;
}
function validateEmptyInput(inputId, errorMessage) {
    const input = document.getElementById(inputId);
    clearInputError(input);
    const value = input.value;
    if (!value) {
        addInputError(input, errorMessage)
        return false
    }
    return true;
}

function validateEmailInput(inputId, errorMessage) {
    const input = document.getElementById(inputId);
    clearInputError(input);
    if (!isValidEmail(input.value)) {
        addInputError(input, errorMessage)
        return false
    }
    return true;
}

function validatePasswordInput(inputId, errorMessage) {
    const input = document.getElementById(inputId);
    clearInputError(input);
    if (!isValidPassword(input.value)) {
        addInputError(input, errorMessage)
        return false
    }
    return true;
}

function validateDateInput(inputId, errMsg) {
    const input = document.getElementById(inputId);
    clearInputError(input);
    if (!isValidDate(input.value)) {
        addInputError(input, errMsg);
        return false;
    }
    return true;
}

function clearInputError(input) {
    input.classList.remove("error");
    if (input.nextSibling.tagName == 'DIV' &&
        input.nextSibling.classList.contains("help")) {
        input.parentNode.removeChild(input.nextSibling);
    }
}

function addInputError(input, errorMessage) {
    input.classList.add("error");
    const help = document.createElement('div');
    help.classList.add("help");
    help.innerText = `* ${errorMessage}`;
    input.parentNode.insertBefore(help, input.nextSibling);
}


function addInputErrorMessage(inputId, errorMessage) {
    const input = document.getElementById(inputId);
    clearInputError(input);
    addInputError(input, errorMessage);
    return true;
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function isValidPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;,.?/~<>|\\-])[A-Za-z\d!@#$%^&*()_+={}:;,.?/~<>|\\-]{8}$/;
    return regex.test(password);
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

function formatCreditCardNumber(input) {
    const value = input.value.replace(/\D/g, ""); // Remove non-digit characters
    const formattedValue = value.match(/.{1,4}/g)?.join(" ") || value; // Group into 4
    input.value = formattedValue;
}

function forceDigitsInput(input) {
    input.value = input.value.replace(/\D/g, '')
}

function formatCurrency(amount, locale = "en-US", currency = "USD") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

// Padding to 2 digits with a zero char if the length is less than 2 chars
function padToTwoDigits(number) {
    return String(number).padStart(2, "0");
}

function getLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function delLocalStroage(key) {
    localStorage.removeItem(key);
}


let pageVer = 1;// Ignore browser cache
function loadHtmlPage(pageURL, containerId, callbackFunc) {
    fetch('pages/' + pageURL + '.html?ver=' + pageVer++)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            if (callbackFunc)
                callbackFunc();
        })
        .catch(error => console.error('Error loading page:' + pageURL, error));

}

