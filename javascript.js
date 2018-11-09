(function() {
    var register = document.querySelector("#register");
    var login = document.querySelector("#login");
    var signUP = document.querySelector(".register");
    var mainContent = document.getElementById("main-content");
    var signIN = document.querySelector(".login");
    var userProfile = document.querySelector("#profile");
    var game = document.querySelector(".game");
    var newGame = document.getElementById("player-choice");
    var userName = document.querySelector("#name");
    var passWord = document.querySelector("#code");
    var passwordRepeat = document.querySelector("#code_repeat");
    var name = document.getElementById("username");
    var logPassword = document.getElementById("password");
    const score1 = document.getElementById("score-1");
    const score2 = document.getElementById("score-2");
    var PAGE_DATA = {};
    var logout = document.getElementById("logout");

    // function profile() {
    //     var player1 = document.querySelector(".player1");
    //     var player2 = document.querySelector(".player2");
    //     score1.disabled = true;
    //     score2.disabled = true;
    //     if (
    //         player1.value === player2.value &&
    //         player1.value !== "" &&
    //         player2.value !== ""
    //     ) {
    //         var same = document.getElementById("same_name");
    //         same.innerText = "They cannot be the same person";
    //     }
    // }

    function createGame(event) {
        event.preventDefault();
        var user1 = document.querySelector("#user1");
        var user2 = document.querySelector("#user2");
        var name1 = document.querySelector(".player1").value;
        var name2 = document.querySelector(".player2").value;

        PAGE_DATA.player1Id = getId(name1);
        PAGE_DATA.player2Id = getId(name2);

        // console.log(PAGE_DATA.player1Id, PAGE_DATA.player2Id);

        game.style.display = "block";
        userProfile.style.display = "none";
        user1.innerText = name1;
        user2.innerText = name2;

        // console.log(`token: ${PAGE_DATA.token}`);

        fetch("https://bcca-pingpong.herokuapp.com/api/new-game/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Token ${PAGE_DATA.token}`
            },
            body: JSON.stringify({
                player_1: PAGE_DATA.player1Id,
                player_2: PAGE_DATA.player2Id
            })
        })
            .then(r => r.json())
            .then(obj => {
                PAGE_DATA.gameId = obj.id;
                PAGE_DATA.points = obj.points;
            });
    }

    function getId(name) {
        for (obj of PAGE_DATA.users) {
            if (name == obj.username) {
                return obj.id;
            }
        }
    }

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
    function newGameAfterRegister() {
        // event.preventDefault();
        // mainContent.style.display = "none";
        // signUP.style.display = "none";
        // signIN.style.display = "none";
        // userProfile.style.display = "block";
        // console.log({
        // //     username: userName.value,
        // //     password: passWord.value
        // // });
        // var welcome = document.getElementById("welcome-user");

        // welcome.innerHTML = userName.value;
        return fetch("https://bcca-pingpong.herokuapp.com/api/register/", {
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
                return new Promise((resolve, reject) => {
                    if (obj.token) {
                        PAGE_DATA.token = obj.token;
                        // console.log("SUCCESS");
                        mainContent.style.display = "none";
                        signUP.style.display = "none";
                        signIN.style.display = "none";
                        userProfile.style.display = "block";
                        logout.style.display = "block";

                        // console.log({
                        //     username: userName.value,
                        //     password: passWord.value
                        // });
                        var welcome = document.getElementById("welcome-user");

                        welcome.innerHTML = userName.value;
                        resolve();
                    } else {
                        // console.log("OINASONSAODINSAOIN NO!!!!");
                        userName.classList.add("invalid");
                        passWord.classList.add("invalid");
                        passwordRepeat.classList.add("invalid");
                        reject();
                    }
                    // console.log(obj);
                });
            });
    }

    function newGameAfterLogin() {
        // mainContent.style.display = "none";
        // signUP.style.display = "none";
        // signIN.style.display = "none";
        // userProfile.style.display = "block";
        // console.log({
        // //     username: userName.value,
        // //     password: passWord.value
        // // });
        // var welcome = document.getElementById("welcome-user");

        // welcome.innerHTML = userName.value;
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
        return fetch("https://bcca-pingpong.herokuapp.com/api/users/", {
            method: "GET",
            headers: {
                Authorization: `Token ${PAGE_DATA.token}`
            }
        })
            .then(function(r) {
                // console.log(PAGE_DATA.token);
                return r.json();
            })
            .then(function(obj) {
                // console.log(obj.token);
                if (!obj.token) {
                    // console.log("ERROR");
                    name.classList.add("invalid");
                    logPassword.classList.add("invalid");
                    // userName.classList.add("invalid");
                    // passWord.classList.add("invalid");
                    // passwordRepeat.classList.add("invalid");
                    // notAvailable.innerText =
                    //     "Username is already taken, Please select another one";
                    invalid.innerText =
                        "Username or password is incorrect, Please try again.";
                }
                return (PAGE_DATA.users = obj);
            });
    }

    function registerValidation(event) {
        event.preventDefault();
        newGameAfterRegister()
            .then(getUsers)
            .then(function() {
                usernameList = [];
                // console.log(PAGE_DATA);
                for (var user of PAGE_DATA.users) {
                    usernameList.push(user.username);
                }
                // console.log(usernameList);
                for (var username of usernameList) {
                    var datalist = document.getElementById("usernames");
                    var option = document.createElement("option");
                    option.innerText = username;
                    datalist.appendChild(option);
                }
                // var player1 = document.querySelector(".player1");
                // var player2 = document.querySelector(".player2");

                // if (
                //     player1.value !== player2.value &&
                //     player1.value !== "" &&
                //     player2.value !== ""
                // ) {
                //     score1.removeAttribute("disabled");
                //     score2.removeAttribute("disabled");
                // }
            });
    }

    function logInValidation(event) {
        event.preventDefault();
        newGameAfterLogin()
            .then(getUsers)
            .then(function() {
                usernameList = [];
                // console.log(PAGE_DATA);
                for (var user of PAGE_DATA.users) {
                    usernameList.push(user.username);
                }
                // console.log(usernameList);
                if (usernameList.includes(name.value)) {
                    // console.log("SUCCESS");
                    mainContent.style.display = "none";
                    signUP.style.display = "none";
                    signIN.style.display = "none";
                    userProfile.style.display = "block";
                    logout.style.display = "block";
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
                // var player1 = document.querySelector(".player1");
                // var player2 = document.querySelector(".player2");

                // if (
                //     player1.value !== player2.value &&
                //     player1.value !== "" &&
                //     player2.value !== ""
                // ) {
                //     score1.removeAttribute("disabled");
                //     score2.removeAttribute("disabled");
                // }
            });
    }

    function submitScore() {
        fetch(
            `https://bcca-pingpong.herokuapp.com/api/score-game/${
                PAGE_DATA.gameId
            }/`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Token ${PAGE_DATA.token}`,
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({
                    points: PAGE_DATA.points
                })
            }
        )
            .then(r => r.json())
            .then(obj => {
                // console.log(obj);
            });
    }

    function addScore() {
        var modal = document.querySelector("#myModal");
        var winner = document.querySelector("#winner");
        var count = 0;
        var score = 0;
        var player1 = document.querySelector(".player1");
        var player2 = document.querySelector(".player2");

        score1.addEventListener("click", function() {
            count += 1;
            score1.innerText = count;
            PAGE_DATA.points.push(PAGE_DATA.player1Id);

            if (score1.innerText === "10") {
                modal.style.display = "block";
                winner.innerHTML = player1.value + " WINS!!!";
                submitScore();
            }
        });

        score2.addEventListener("click", () => {
            score += 1;
            score2.innerText = score;
            PAGE_DATA.points.push(PAGE_DATA.player2Id);
            if (score2.innerText === "10") {
                modal.style.display = "block";
                winner.innerHTML = player2.value + " WINS!!!";
                submitScore();
            }
        });
        var span = document.getElementsByClassName("close")[0];
        span.addEventListener("click", function() {
            modal.style.display = "none";
            score1.innerText = "0";
            player1.value = "";
            count = 0;
            score2.innerText = "0";
            player2.value = "";
            score = 0;
            game.style.display = "none";
            userProfile.style.display = "block";
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
    // console.log(obj);
    //     });

    signUP.addEventListener("submit", registerValidation);
    signIN.addEventListener("submit", logInValidation);
    register.addEventListener("click", showRegister);
    login.addEventListener("click", showLogin);
    newGame.addEventListener("submit", createGame);
    // profile();
    addScore();
})();
