
function rockPaperScissors() {

    let userChoice
    const validChoices = ["rock", "paper", "scissors"];

    while (true) {

        userChoice = prompt("Enter your choice: Rock, Paper, or Scissors").toLowerCase();
    
        if (validChoices.includes(userChoice)) {
            
            break;

        } else {

            alert("Invalid choice. Please enter Rock, Paper, or Scissors.");

        }

    }

    const computerChoices = ["rock", "paper", "scissors"];
    const computerChoice = computerChoices[Math.floor(Math.random() * 3)];

    console.log("User chose: " + userChoice);
    console.log("Computer chose: " + computerChoice);

    if (userChoice === computerChoice) {

        console.log("It's a tie!");

    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "scissors" && computerChoice === "paper") ||
        (userChoice === "paper" && computerChoice === "rock")
    ) {
        
        console.log("User wins!");

    } else {

        console.log("Computer wins!");

    }

    const playAgain = confirm("Do you want to play again?");

    if (playAgain) {

        rockPaperScissors();

    }

}