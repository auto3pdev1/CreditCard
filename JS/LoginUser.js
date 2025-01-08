/* Login user javascript script file - Handles functions of a logged-in user & list of users */

const LIST_OF_USERS_STORAGE_KEY = 'listOfUsers';
const LOOGED_IN_USER_STORAGE_KEY = 'loggedInUser';
function setLoggedInUser(loggedInUser) {
    setLocalStorage(LOOGED_IN_USER_STORAGE_KEY, loggedInUser);
}

function setLoggedOutUser() {
    delLocalStroage(LOOGED_IN_USER_STORAGE_KEY);
}

function getLoggedInUser() {
    return getLocalStorage(LOOGED_IN_USER_STORAGE_KEY)
}

function checkUserLoggedIn() {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser)
        location.href = 'Login.html';
    return loggedInUser;
}

function logoutUser() {
    setLoggedOutUser();
    location.href = 'Login.html';
}

function getUserList() {
    const listOfUsers = [];
    const users = getLocalStorage(LIST_OF_USERS_STORAGE_KEY);
    if (users) {
        users.forEach((user) => {
            listOfUsers.push(user);
        })
    }
    return listOfUsers;
}
function addUser(user) {
    const listOfUsers = getUserList();
    listOfUsers.push(user);
    setLocalStorage(LIST_OF_USERS_STORAGE_KEY, listOfUsers)
}

function updateUser(user) {
    const listOfUsers = getUserList();
    for (let i = 0; i < listOfUsers.length; i++) {
        if (listOfUsers[i].email == user.email) {
            listOfUsers[i] = user;
            setLocalStorage(LIST_OF_USERS_STORAGE_KEY, listOfUsers);
            return;
        }
    }
}

function findUser(email, password) {
    email = email.toLowerCase();
    const listOfUsers = getUserList();
    return listOfUsers.find((user) => user.email.toLowerCase() === email && user.password === password);
}

function findUserByEmail(email) {
    email = email.toLowerCase();
    const listOfUsers = getUserList();
    return listOfUsers.find((user) => user.email.toLowerCase() === email);
}
