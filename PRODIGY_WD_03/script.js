const selectBox = document.querySelector(".game_box"),
selectBtnX = selectBox.querySelector(".buttons .playerX"),
selectBtnO = selectBox.querySelector(".buttons .playerO"),
playBoard = document.querySelector(".board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".resultbox"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
};

selectBtnX.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
};

selectBtnO.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
};

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

function clickedBox(element) {
    if (players.classList.contains("player")) {
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let randomTimeDelay = (Math.random() * 1000) + 200;
    setTimeout(() => {
        bot();
    }, randomTimeDelay);
}

function bot() {
    let array = [];
    if (runBot) {
        playerSign = "O";
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class ="${playerXIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
    if (getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) ||
        checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) ||
        checkIdSign(2, 5, 8, playerSign) || checkIdSign(1, 5, 9, playerSign) ||
        checkIdSign(3, 6, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        runBot = false;
    setTimeout(() => {
        resultBox.classList.add("show");
        playBoard.classList.remove("show");
        wonText.classList.add("winner-message");
    }, 700);
    if (playerSign === "X") {
        wonText.innerHTML = "Winner:     Player X";
    } else {
        wonText.innerHTML = "Winner:     Player O";
    }
} else {
    if (getIdVal(1) !== "" && getIdVal(2) !== "" && getIdVal(3) !== "" &&
        getIdVal(4) !== "" && getIdVal(5) !== "" && getIdVal(6) !== "" &&
        getIdVal(7) !== "" && getIdVal(8) !== "" && getIdVal(9) !== "") {
        runBot = false;
    bot();
    setTimeout(() => {
        resultBox.classList.add("show");
        playBoard.classList.remove("show");
        wonText.textContent = "Match has been drawn";
    }, 700);
}
}
}
replayBtn.onclick = () => {
    window.location.reload();
};
