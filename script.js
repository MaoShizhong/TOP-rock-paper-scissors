let playerSelection;
do {
    playerSelection = prompt("Enter either rock, paper or scissors in the box:")
} while (playerSelection.toLowerCase() !== "rock" && playerSelection.toLowerCase() !== "paper" && playerSelection.toLowerCase() !== "scissors")

playerSelection = playerSelection.toLowerCase();

let computerSelection = getComputerChoice();

console.log("You picked " + playerSelection + ".");
console.log("The computer picked " + computerSelection + ".");
console.log(playRound(playerSelection, computerSelection));


function getComputerChoice() {
    let result = Math.floor(Math.random() * 3);
    if (result === 0) {
        return "rock";
    } else if (result === 1) {
        return "paper";
    } else {
        return "scissors";
    }
}


function playRound(playerSelection, computerSelection) {
    if (playerSelection === "rock") {
        if (computerSelection === "rock") {
            console.log("Draw! You both picked rock!");
        } else if (computerSelection === "paper") {
            console.log("You lose! Paper beats rock!");
        } else {
            console.log("You win! Rock beats scissors!");
        }
    } else if (playerSelection === "paper") {
        if (computerSelection === "rock") {
            console.log("You win! Paper beats rock!");
        } else if (computerSelection === "paper") {
            console.log("Draw! You both picked paper!");
        } else {
            console.log("You lose! Scissors beats paper!");
        }
    } else {
        if (computerSelection === "scissors") {
            console.log("You lose! Rock beats scissors!");
        } else if (computerSelection === "paper") {
            console.log("You win! Scissors beats paper!");
        } else {
            console.log("Draw! You both picked scissors!");
        }
    }
}