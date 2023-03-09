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

// pressing button plays a round
for (let i = 0; i < choice.length; i++) {
    choice[i].addEventListener("click", function(e) {
        resetHands();
        
        // assign choices and get result
        let playerSelection = capitaliseFirstLetter(choice[i].innerHTML);
        let computerSelection = getComputerChoice();
        let result = getRoundResult(playerSelection, computerSelection);

        const countdown = [3, 2, 1, "GO"];
        playAnimation(playerSelection, computerSelection, countdown);

        // updateScore(result);
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
        return computer === "Rock" ? "lose"
             : computer === "Paper" ? "draw"
             : "win";
    } else {
        return computer === "Rock" ? "draw"
             : computer === "Paper" ? "win"
             : "lose";
    }
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function playAnimation(player, computer, count) {
    for (let i = 0; i < 2; i++) {
        await delay(800);
        toggleCountdownHand();
        await delay(100);
        toggleCountdownHand();
    }
    await delay(800);
    toggleCountdown();
    await delay(100);
    toggleResult(player, computer);
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