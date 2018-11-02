var registerBtn = document.querySelector("#register");
var loginBtn = document.querySelector("#login");
var registerForm = document.querySelector(".register");
var mainContent = document.getElementById("main-content");
var loginDiv = document.querySelector(".login");
var register = document.querySelector(".register-btn");
var login = document.querySelector(".login-btn");
var profile = document.querySelector("#profile");

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
function showProfile(event) {
    mainContent.style.display = "none";
    registerForm.style.display = "none";
    loginDiv.style.display = "none";
    profile.style.display = "block";
    event.preventDefault();
    console.log(profile);
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

registerForm.addEventListener("submit", showProfile);
loginDiv.addEventListener("submit", showProfile);
registerBtn.addEventListener("click", showRegister);
loginBtn.addEventListener("click", showLogin);
