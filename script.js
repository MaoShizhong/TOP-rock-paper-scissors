const rockUser = document.querySelector("#rock-user");
const paperUser = document.querySelector("#paper-user");
const scissorsUser = document.querySelector("#scissors-user");
const shakeUser = document.querySelector("#shake-user");
const rockComp = document.querySelector("#rock-comp");
const paperComp = document.querySelector("#paper-comp");
const scissorsComp = document.querySelector("#scissors-comp");
const shakeComp = document.querySelector("#shake-comp");
let countdown = document.querySelector(".countdown");

let choice = document.querySelectorAll(".button");

let uScore = 0;
let cScore = 0;

// pressing button plays a round
for (let i = 0; i < choice.length; i++) {
    choice[i].addEventListener("click", function() {
        resetHands();
        
        // assign choices and get result
        let playerSelection = capitaliseFirstLetter(choice[i].innerHTML);
        let computerSelection = getComputerChoice();

        const countdown = ["3", "2"];
        playAnimation(playerSelection, computerSelection, countdown);
    });
}

function resetHands() {
    rockUser.classList.remove("hidden");
    paperUser.classList.add("hidden");
    scissorsUser.classList.add("hidden");
    shakeUser.classList.add("hidden");

    rockComp.classList.remove("hidden");
    paperComp.classList.add("hidden");
    scissorsComp.classList.add("hidden");
    shakeComp.classList.add("hidden");

    countdown.textContent = "";
}

function getComputerChoice() {
    let result = Math.floor(Math.random() * 3);
    
    return result === 0 ? "Rock"
         : result === 1 ? "Paper"
         : "Scissors";
}

function getRoundResult(player, computer) {
    if (player === "Rock") {
        return computer === "Rock" ? "draw"
             : computer === "Paper" ? "lose"
             : "win";
    } else if (player === "Paper") {
        return computer === "Rock" ? "win"
             : computer === "Paper" ? "draw"
             : "lose";
    } else {
        return computer === "Rock" ? "lose"
             : computer === "Paper" ? "win"
             : "draw";
    }
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function playAnimation(player, computer, count) {
    let result = getRoundResult(player, computer);

    for (let i = 0; i < 2; i++) {
        countdown.textContent = count[i];
        await delay(800);
        toggleCountdownHand();
        await delay(100);
        toggleCountdownHand();
    }
    countdown.textContent = "1";
    await delay(800);
    toggleCountdownHand();
    await delay(100);
    toggleResult(player, computer);
    updateScore(result);

    
}

function toggleCountdownHand() {
    rockUser.classList.toggle("hidden");
    rockComp.classList.toggle("hidden");
    shakeUser.classList.toggle("hidden");
    shakeComp.classList.toggle("hidden");
}

function toggleResult(player, computer) {
    if (player === "Rock") rockUser.classList.toggle("hidden");
    else if (player === "Paper") paperUser.classList.toggle("hidden");
    else if (player ==="Scissors") scissorsUser.classList.toggle("hidden");
    shakeUser.classList.toggle("hidden");

    if (computer === "Rock") rockComp.classList.toggle("hidden");
    else if (computer === "Paper") paperComp.classList.toggle("hidden");
    else if (computer === "Scissors") scissorsComp.classList.toggle("hidden");
    shakeComp.classList.toggle("hidden");
}

function capitaliseFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);
}

function updateScore(result) {

    let userScore = document.querySelector(".left-score");
    let compScore = document.querySelector(".right-score");

    if (result === "win") {
        userScore.textContent = `YOU: ${uScore++}`;
        countdown.textContent = "<-";
    } else if (result === "lose") {
        compScore.textContent = `CPU: ${cScore++}`;
        countdown.textContent = "->";
    } else {
        countdown.textContent = "DRAW";
    }
}