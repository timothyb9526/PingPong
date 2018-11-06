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
    function showProfileAfterRegister(event) {
        mainContent.style.display = "none";
        signUP.style.display = "none";
        signIN.style.display = "none";
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
                password_repeat: passwordRepeat.value
            })
        })
            .then(r => r.json())
            .then(obj => {
                console.log(userName.value);
                console.log(passWord.value);
                console.log(passwordRepeat.value);
                console.log(obj);
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
                console.log(name.value);
                console.log(logPassword.value);
                PAGE_DATA.token = obj.token;
                console.log(PAGE_DATA.token);
                console.log(PAGE_DATA);
            });
    }

    function addScore() {
        var modal = document.querySelector("#myModal");
        var winner = document.querySelector("#winner");
        var count = 0;
        var score = 0;

        score1.addEventListener("click", function() {
            count += 1;
            score1.innerText = count;
            if (score1.innerText === "10") {
                modal.style.display = "block";
                winner.innerHTML = "Player1 WINS!!!";
            }
        });

        score2.addEventListener("click", () => {
            score += 1;
            score2.innerText = score;
            if (score2.innerText === "10") {
                modal.style.display = "block";
                winner.innerHTML = "Player2 WINS!!!";
            }
        });
        var span = document.getElementsByClassName("close")[0];
        span.addEventListener("click", function() {
            modal.style.display = "none";
            score1.innerText = "0";
            count = 0;
            score2.innerText = "0";
            score = 0;
        });
    }

    function getUsers() {
        var invalid = document.querySelectorAll("#invalid");
        return fetch("https://bcca-pingpong.herokuapp.com/api/users/", {
            method: "GET",
            headers: {
                Authorization: `Token ${PAGE_DATA.token}`
            }
        })
            .then(function(r) {
                return r.json();
            })
            .then(function(obj) {
                if (!obj.token) {
                    console.log("ERROR");
                    name.classList.add("invalid");
                    logPassword.classList.add("invalid");
                    alert("Try Again");
                }
                return (PAGE_DATA.users = obj);
            });
    }
    function userValidation(event) {
        event.preventDefault();
        showProfileAfterLogin()
            .then(getUsers)
            .then(function() {
                usernameList = [];
                for (var user of PAGE_DATA.users) {
                    usernameList.push(user.username);
                }
                console.log(usernameList);
                if (usernameList.includes(name.value)) {
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
            });
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

    signUP.addEventListener("submit", showProfileAfterRegister);
    signIN.addEventListener("submit", userValidation);
    register.addEventListener("click", showRegister);
    login.addEventListener("click", showLogin);
    addScore();
})();
