game()

function game() {
    
    let playerScore = 0;
    let computerScore = 0;
    const rounds = 5;

    for (let i = 1; i <= rounds; i++) {
        let playerSelection;
        do {
            playerSelection = prompt("Enter either rock, paper or scissors in the box:")
        } while (playerSelection.toLowerCase() !== "rock" && playerSelection.toLowerCase() !== "paper" && playerSelection.toLowerCase() !== "scissors")

        playerSelection = playerSelection.toLowerCase();
        let computerSelection = getComputerChoice();

        let result = playRound(playerSelection, computerSelection);

        if (result === "win") {
            console.log(`You win! ${capitaliseFirstLet(playerSelection)} beats ${computerSelection}!`);
            playerScore++;
        } else if (result === "lose") {
            console.log(`You lose! ${capitaliseFirstLet(computerSelection)} beats ${playerSelection}!`);
            computerScore++;
        } else {
            console.log(`Draw! You both picked ${playerSelection}!`);
        }

        console.log(`Player ${playerScore} - ${computerScore} Computer`);
    }

    if (playerScore > computerScore) {
        console.log(`\nAfter ${rounds} rounds, you win!\nThe final score is ${playerScore} - ${computerScore}`);
    } else if (playerScore < computerScore) {
        console.log(`\nAfter ${rounds} rounds, you lose!\nThe final score is ${playerScore} - ${computerScore}`);
    } else {
        console.log(`\nAfter ${rounds} rounds, it's a draw!\nThe final score is ${playerScore} - ${computerScore}`);
    }
}

function capitaliseFirstLet(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

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
            return "draw";
        } else if (computerSelection === "paper") {
            return "lose";
        } else {
            return "win";
        }
    } else if (playerSelection === "paper") {
        if (computerSelection === "rock") {
            return "lose";
        } else if (computerSelection === "paper") {
            return "draw";
        } else {
            return "win";
        }
    } else {
        if (computerSelection === "scissors") {
            return "draw";
        } else if (computerSelection === "paper") {
            return "win";
        } else {
            return "lose";
        }
    }
}