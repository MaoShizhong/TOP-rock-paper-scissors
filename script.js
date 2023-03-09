const rockUser = document.querySelector("#rock-user");
const paperUser = document.querySelector("#paper-user");
const scissorsUser = document.querySelector("#scissors-user");
const countdownUser = document.querySelector("#countdown-user");
const rockComp = document.querySelector("#rock-comp");
const paperComp = document.querySelector("#paper-comp");
const scissorsComp = document.querySelector("#scissors-comp");
const countdownComp = document.querySelector("#countdown-comp");

let choice = document.querySelectorAll(".button");

// pressing button plays a round
for (let i = 0; i < choice.length; i++) {
    choice[i].addEventListener("click", function(e) {
        resetHands();
        
        // assign choices and get result
        let playerSelection = capitaliseFirstLetter(choice[i].innerHTML);
        let computerSelection = getComputerChoice();
        let result = getRoundResult(playerSelection, computerSelection);

        playAnimation(playerSelection, computerSelection);

        // updateScore(result);
    });
}

function resetHands() {
    rockUser.classList.remove("hidden");
    paperUser.classList.add("hidden");
    scissorsUser.classList.add("hidden");
    countdownUser.classList.add("hidden");

    rockComp.classList.remove("hidden");
    paperComp.classList.add("hidden");
    scissorsComp.classList.add("hidden");
    countdownComp.classList.add("hidden");
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

async function playAnimation(player, computer) {
    for (let i = 0; i < 2; i++) {
        await delay(800);
        toggleCountdown();
        await delay(100);
        toggleCountdown();
    }
    await delay(800);
    toggleCountdown();
    await delay(100);
    toggleResult(player, computer);
}

function toggleCountdown() {
    rockUser.classList.toggle("hidden");
    rockComp.classList.toggle("hidden");
    countdownUser.classList.toggle("hidden");
    countdownComp.classList.toggle("hidden");
}

function toggleResult(player, computer) {
    if (player === "Rock") rockUser.classList.toggle("hidden");
    else if (player === "Paper") paperUser.classList.toggle("hidden");
    else if (player ==="Scissors") scissorsUser.classList.toggle("hidden");
    countdownUser.classList.toggle("hidden");

    if (computer === "Rock") rockComp.classList.toggle("hidden");
    else if (computer === "Paper") paperComp.classList.toggle("hidden");
    else if (computer === "Scissors") scissorsComp.classList.toggle("hidden");
    countdownComp.classList.toggle("hidden");
}

function capitaliseFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);
}