var registerBtn = document.querySelector("#register");
var loginBtn = document.querySelector("#login");
var registerForm = document.querySelector(".register");
var mainContent = document.getElementById("main-content");
var loginDiv = document.querySelector(".login");
var register = document.querySelector(".register-btn");
var login = document.querySelector(".login-btn");
var profile = document.querySelector("#profile");
var userName = document.querySelector("#username");
var passWord = document.querySelector("#password");
var passwordRepeat = document.querySelector("#password_repeat");
var LoginInput = document.getElementById("username-login");
var PAGE_DATA = {};

function showRegister() {
    mainContent.style.display = "none";
    registerForm.style.display = "block";
    loginBtn.disabled = true;
}
function showLogin() {
    mainContent.style.display = "none";
    loginDiv.style.display = "block";
    registerBtn.disabled = true;
}
function showProfileAfterRegister(event) {
    var userName = document.querySelector("#username");
    var passWord = document.querySelector("#password");
    var passwordRepeat = document.querySelector("#password_repeat");
    mainContent.style.display = "none";
    registerForm.style.display = "none";
    loginDiv.style.display = "none";
    profile.style.display = "block";
    event.preventDefault();
    console.log(profile);
    var welcome = document.getElementById("welcome-user");

    welcome.innerHTML = userName.value;

    fetch("https://bcca-pingpong.herokuapp.com/api/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            username: userName.value,
            password: passWord.value,
            passwordRepeat: passwordRepeat.value
        })
    })
        .then(r => r.json())
        .then(obj => {
            console.log(obj);
        });
}

function showProfileAfterLogin(event) {
    mainContent.style.display = "none";
    registerForm.style.display = "none";
    loginDiv.style.display = "none";
    profile.style.display = "block";
    event.preventDefault();
    console.log({
        username: userName.value,
        password: passWord.value
    });
    var welcome = document.getElementById("welcome-user");

    welcome.innerHTML = LoginInput.value;

    fetch("https://bcca-pingpong.herokuapp.com/api/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            username: userName.value,
            password: passWord.value
        })
    })
        .then(r => r.json())
        .then(obj => {
            PAGE_DATA.token = obj.token;
            console.log(PAGE_DATA);
        });
}

function addScore() {
    const score1 = document.getElementById("score-1");
    const score2 = document.getElementById("score-2");
    var count = 0;
    var score = 0;

    score1.addEventListener("click", function() {
        count += 1;
        score1.innerText = count;
        if (score1.innerText === "10") {
            score1.disabled = true;
            score2.disabled = true;
        }
    });

    score2.addEventListener("click", () => {
        score += 1;
        score2.innerText = score;
        if (score2.innerText === "10") {
            score2.disabled = true;
            score1.disabled = true;
        }
    });
}
function getInfo() {
    fetch('https://bcca-pingpong.herokuapp.com/api/login/',
    )
}
// fetch("https://bcca-pingpong.herokuapp.com/api/login/", {
//     method: "post",
//     headers: {
//         "Content-Type": "application/json;charset=utf-8"
//     },
//     body: JSON.stringify({ username: "Timothy", password: "password" })
// })
//     .then(r => r.json())
//     .then(obj => {
//         console.log(obj);
//     });

registerForm.addEventListener("submit", showProfileAfterRegister);
loginDiv.addEventListener("submit", showProfileAfterLogin);
registerBtn.addEventListener("click", showRegister);
loginBtn.addEventListener("click", showLogin);
addScore();
