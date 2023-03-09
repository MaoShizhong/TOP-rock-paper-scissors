// images
const rockUser = document.querySelector("#rock-user");
const paperUser = document.querySelector("#paper-user");
const scissorsUser = document.querySelector("#scissors-user");
const shakeUser = document.querySelector("#shake-user");
const rockComp = document.querySelector("#rock-comp");
const paperComp = document.querySelector("#paper-comp");
const scissorsComp = document.querySelector("#scissors-comp");
const shakeComp = document.querySelector("#shake-comp");

// main game elements
let userScore = document.querySelector(".left-score");
let compScore = document.querySelector(".right-score");
let countdown = document.querySelector(".countdown");
let uScore = 0;
let cScore = 0;

// main divs
let intro = document.querySelector(".intro");
let game = document.querySelector(".game");
let gameArea = document.querySelector(".game-area");
let outcome = document.querySelector(".outcome");

// player choice of R, P or S
let choice = document.querySelectorAll(".button");

// select score limit
let scoreLimit;
let rounds = document.querySelectorAll(".round");
for (let i = 0; i < rounds.length; i++) {
    rounds[i].addEventListener("click", function() {
        scoreLimit = parseInt(rounds[i].textContent);
        intro.classList.toggle("hidden");
        game.classList.toggle("hidden");
        gameArea.classList.toggle("hidden");
    });
}

// pressing button plays a round
for (let i = 0; i < choice.length; i++) {
    choice[i].addEventListener("click", function() {
        resetHands();
        outcome.textContent = "";
        
        // assign choices and get result
        let playerSelection = choice[i].textContent.toLowerCase();
        let computerSelection = getComputerChoice();

        const countdown = ["3", "2"];
        playAnimation(playerSelection, computerSelection, countdown);
    });
}

// ends game when score limit reached
function checkGameOver() {
    if (uScore === scoreLimit || cScore === scoreLimit) {
        choice.forEach(button => button.disabled = true);

        again.classList.toggle("hidden");

        if (uScore > cScore) {
            outcome.textContent = `YOU WON!\r\nYou reached ${scoreLimit} wins first!`;
        } else {
            outcome.textContent = `YOU LOST!\r\nThe computer beat you to ${scoreLimit} wins...`;
        }
    }
}

// reset everything to play again
const again = document.querySelector("#playAgain");
again.addEventListener("click", function() {
    uScore = cScore = 0;
    userScore.textContent = "YOU: 0";
    compScore.textContent = "CPU: 0";

    resetHands();

    choice.forEach(button => button.disabled = false);

    intro.classList.toggle("hidden");
    game.classList.toggle("hidden");
    gameArea.classList.toggle("hidden");
    outcome.classList.toggle("hidden");
    again.classList.toggle("hidden");
});


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
    
    return result === 0 ? "rock"
         : result === 1 ? "paper"
         : "scissors";
}

function getRoundResult(player, computer) {
    if (player === "rock") {
        return computer === "rock" ? "draw"
             : computer === "paper" ? "lose"
             : "win";
    } else if (player === "paper") {
        return computer === "rock" ? "win"
             : computer === "paper" ? "draw"
             : "lose";
    } else {
        return computer === "rock" ? "lose"
             : computer === "paper" ? "win"
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
        await delay(600);
        toggleCountdownHand();
        await delay(80);
        toggleCountdownHand();
    }
    countdown.textContent = "1";
    await delay(600);
    toggleCountdownHand();
    await delay(80);
    toggleResult(player, computer);
    countdown.textContent = "";
    updateScore(result, player, computer); 
}

function toggleCountdownHand() {
    rockUser.classList.toggle("hidden");
    rockComp.classList.toggle("hidden");
    shakeUser.classList.toggle("hidden");
    shakeComp.classList.toggle("hidden");
}

function toggleResult(player, computer) {
    if (player === "rock") rockUser.classList.toggle("hidden");
    else if (player === "paper") paperUser.classList.toggle("hidden");
    else if (player ==="scissors") scissorsUser.classList.toggle("hidden");
    shakeUser.classList.toggle("hidden");

    if (computer === "rock") rockComp.classList.toggle("hidden");
    else if (computer === "paper") paperComp.classList.toggle("hidden");
    else if (computer === "scissors") scissorsComp.classList.toggle("hidden");
    shakeComp.classList.toggle("hidden");
}

function updateScore(result, playerSelection, computerSelection) {

    if (result === "win") {
        userScore.textContent = `YOU: ${++uScore}`;
        outcome.textContent = `Your ${playerSelection} beats CPU's ${computerSelection} - you win!`;
        checkGameOver();
    } else if (result === "lose") {
        compScore.textContent = `CPU: ${++cScore}`;
        outcome.textContent = `Your ${playerSelection} couldn't beat CPU's ${computerSelection} - you lose!`;
        checkGameOver();
    } else {
        outcome.textContent = "Draw!";
    }
}