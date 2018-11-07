(function() {
    var register = document.querySelector("#register");
    var login = document.querySelector("#login");
    var signUP = document.querySelector(".register");
    var mainContent = document.getElementById("main-content");
    var signIN = document.querySelector(".login");
    var profile = document.querySelector("#profile");
    var userName = document.querySelector("#name");
    var passWord = document.querySelector("#code");
    var passwordRepeat = document.querySelector("#code_repeat");
    var name = document.getElementById("username");
    var logPassword = document.getElementById("password");
    const score1 = document.getElementById("score-1");
    const score2 = document.getElementById("score-2");
    var PAGE_DATA = {};

    function showRegister() {
        mainContent.style.display = "none";
        signUP.style.display = "block";
        signIN.style.display = "none";
    }
    function showLogin() {
        mainContent.style.display = "none";
        signIN.style.display = "block";
        signUP.style.display = "none";
        register.disabled = true;
    }
    function showProfileAfterRegister() {
        fetch("https://bcca-pingpong.herokuapp.com/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                username: userName.value,
                password: passWord.value,
                password_repeat: passwordRepeat.value
            })
        })
            .then(r => r.json())
            .then(obj => {
                // console.log(userName.value);
                // console.log(passWord.value);
                // console.log(passwordRepeat.value);
                // console.log(obj);
            });
    }

    function showProfileAfterLogin() {
        return fetch("https://bcca-pingpong.herokuapp.com/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                username: name.value,
                password: logPassword.value
            })
        })
            .then(r => r.json())
            .then(obj => {
                // console.log(name.value);
                // console.log(logPassword.value);
                PAGE_DATA.token = obj.token;
                // console.log(PAGE_DATA.token);
                // console.log(PAGE_DATA);
            });
    }

    function getUsers() {
        var invalid = document.querySelector("#invalid");
        var notAvailable = document.querySelector("#invalid");
        return fetch("https://bcca-pingpong.herokuapp.com/api/users/", {
            method: "GET",
            headers: {
                Authorization: `Token ${PAGE_DATA.token}`
            }
        })
            .then(function(r) {
                console.log(PAGE_DATA.token);
                return r.json();
            })
            .then(function(obj) {
                if (!obj.token) {
                    console.log("ERROR");
                    name.classList.add("invalid");
                    logPassword.classList.add("invalid");
                    userName.classList.add("invalid");
                    passWord.classList.add("invalid");
                    passwordRepeat.classList.add("invalid");
                    notAvailable.innerText =
                        "Username is already taken, Please select another one";
                    invalid.innerText =
                        "Username or password is incorrect, Please try again.";
                }
                return (PAGE_DATA.users = obj);
            });
    }
    function userValidation(event) {
        event.preventDefault();
        showProfileAfterRegister();
        showProfileAfterLogin()
            .then(getUsers)
            .then(function() {
                usernameList = [];
                console.log(PAGE_DATA);
                for (var user of PAGE_DATA.users) {
                    usernameList.push(user.username);
                }
                console.log(usernameList);
                if (
                    usernameList.includes(name.value) ||
                    !usernameList.includes(userName.value)
                ) {
                    console.log("SUCCESS");
                    mainContent.style.display = "none";
                    signUP.style.display = "none";
                    signIN.style.display = "none";
                    profile.style.display = "block";
                    // console.log({
                    //     username: userName.value,
                    //     password: passWord.value
                    // });
                    var welcome = document.getElementById("welcome-user");

                    welcome.innerHTML = name.value;
                }
                for (var username of usernameList) {
                    var datalist = document.getElementById("usernames");
                    var option = document.createElement("option");
                    option.innerText = username;
                    datalist.appendChild(option);
                }
            });
    }

    // function addScore() {
    //     var modal = document.querySelector("#myModal");
    //     var winner = document.querySelector("#winner");
    //     var count = 0;
    //     var score = 0;

    //     score1.addEventListener("click", function() {
    //         count += 1;
    //         score1.innerText = count;
    //         if (score1.innerText === "10") {
    //             modal.style.display = "block";
    //             winner.innerHTML = "Player1 WINS!!!";
    //         }
    //     });

    //     score2.addEventListener("click", () => {
    //         score += 1;
    //         score2.innerText = score;
    //         if (score2.innerText === "10") {
    //             modal.style.display = "block";
    //             winner.innerHTML = "Player2 WINS!!!";
    //         }
    //     });
    //     var span = document.getElementsByClassName("close")[0];
    //     span.addEventListener("click", function() {
    //         modal.style.display = "none";
    //         score1.innerText = "0";
    //         count = 0;
    //         score2.innerText = "0";
    //         score = 0;
    //     });
    // }

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

    signUP.addEventListener("submit", userValidation);
    signIN.addEventListener("submit", userValidation);
    register.addEventListener("click", showRegister);
    login.addEventListener("click", showLogin);
    // addScore();
})();
