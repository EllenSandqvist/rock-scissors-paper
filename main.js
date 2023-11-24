//-----------------------------------------------------------
//---------CODE FOR GETTING PLAYER'S NAME---------------------
//-----------------------------------------------------------
const playerName = prompt("Vad är ditt namn?");

//If player typed a name replace "spelare" with player's name
if(playerName !== null && playerName !== "") {
    alert("Välkommen, " + playerName + "! Lycka till!");
    const playerNameText = document.getElementById('player-name');
    playerNameText.textContent = playerName;
} 


//GLOBAL VARIABLES

//variable to stop player from chosing another item before current game is over
let gameRunning = false;

//variables for player choice
const rock = document.getElementById('rock');
const scissors = document.getElementById('scissors');
const paper = document.getElementById('paper');

//variable needed for printing game outcome
let WinOrLosePlayer = document.getElementById('win-or-loose-player');

//variables for player's playarea and chosen item
const gameBoardPlayer = document.querySelector('.game-board-player');
let playerChosenImg = document.getElementById('player-chosen-img');

//variable for computer's chosen item
const computerChosenImg = document.getElementById('computer-chosen-img');

//variable for countdown number
const countDownParagraph = document.querySelector('.countdown');

//variable for scores
let scorePlayer = document.getElementById('score-player');
let scoreComputer = document.getElementById('score-computer');

//variabels for points
let playerPoints = 0;
let computerPoints = 0;

//start values for chosen items
let computerChoice;
let playerChoice = "";

//----------------------------------------------------------
//---------EVENTLISTENERS ON PLAYER CHOICHE ----------------
//----------------------------------------------------------

//Add eventlisteners to rock, scissors and paper
rock.addEventListener('click', function(){
    startGame("rock");
});
scissors.addEventListener('click', function(){
    startGame("scissors");
});
paper.addEventListener('click', function(){
    startGame("paper");
});


//----------------------------------------------------------------------
//---------FUNCTION TO START GAME AND DISPLAY PLAYER CHOICHE -----------
//----------------------------------------------------------------------


function startGame(playItem) {
    //if game is allready running, return to prevent user from starting another round
    if (gameRunning){
        return;
    }
    //setting gameRunning to true so that another round can't be started
    gameRunning = true;

    WinOrLosePlayer.textContent = "";
    countDownParagraph.classList.remove('countdown-hidden');
    computerChosenImg.classList.add('hidden-img');
    playerChoice = playItem;
    playerChosenImg.src = `./images/${playerChoice}.svg`;
    getComputerChoice();
    displayComputerChoiche();
}


//---------------------------------------------------------------------
//---------FUNKTION TO GET COMPUTER CHOICE-----------------------------
//---------------------------------------------------------------------
function getComputerChoice(){
    const randomNr = Math.floor(Math.random()*3 + 1);

    switch(randomNr) {
        case 1:
            computerChoice = "rock";
            break;
        case 2:
            computerChoice = "scissors";
            break;
        case 3:
            computerChoice = "paper";
            break;
    }
}

// -----------------------------------------------------------------------
// ---------FUNCTION TO DISPLAY COMPUTER CHOICE --------------------------
// -----------------------------------------------------------------------
function displayComputerChoiche(){
    
    //index used for countdown
    let i = 4;

    //setInterval will run with the speed of "speed" until countdown ends. 
    let timer = setInterval(function(){
        
        if(i > 0){
            countDownParagraph.textContent = i-1;
            i--;
        } else {
            clearInterval(timer);
            countDownParagraph.textContent = "";
            countDownParagraph.classList.add('countdown-hidden');
            computerChosenImg.src = `./images/${computerChoice}.svg`;
            computerChosenImg.classList.remove('hidden-img');
            gameToPlay();
        }
    }, 450);
};

//--------------------------------------------------------------------
//---------FUNCTION FOR GAME TO PLAY ---------------------------------
//--------------------------------------------------------------------
function gameToPlay(){
    switch(playerChoice){
        case "rock":
            playRock();
            break;
        case "scissors":
            playScissors();
            break;
        case "paper":
            playPaper();
            break;
    }
}

//------------------------------------------------------------------------
//-------FUNCTIONS FOR WHEN USER PLAYS ROCK, SCISSORS OR PAPER------------
//-------------------------------------------------------------------------

//function for when user plays ROCK---------------------
function playRock(){

    if (computerChoice === "rock"){
        resultDraw();   
    } else if (computerChoice === "scissors"){
        resultWin();
    } else {
        resultLose();
    }

    //function to check points
    checkPoints();
}

//function for when user plays SCISSORS---------------------------
function playScissors(){

    if (computerChoice === "rock"){
        resultLose();   
    } else if (computerChoice === "scissors"){
        resultDraw();
    } else {
        resultWin();
    }

    checkPoints();
}

//function for when user plays PAPER ---------------------------
function playPaper(){

    if (computerChoice === "rock"){
        resultWin();   
    } else if (computerChoice === "scissors"){
        resultLose();
    } else {
        resultDraw();
    }

    checkPoints();
}


//----------------------------------------------------------------
//---------FUNCTION FOR DRAW -------------------------------------
//----------------------------------------------------------------
function resultDraw(){
    WinOrLosePlayer.textContent = "Oavgjort. Prova igen!";
}

//----------------------------------------------------------------
//---------FUNCTION FOR WIN---------------------------------------
//----------------------------------------------------------------
function resultWin(){
    WinOrLosePlayer.textContent = "Du vann! Fortsätt så!";

    playerPoints ++;
    
    scorePlayer.textContent = playerPoints;
}

//---------------------------------------------------------------
//---------FUNCTION FOR LOSE ------------------------------------
//---------------------------------------------------------------
function resultLose(){
    WinOrLosePlayer.textContent = "Du förlorade! Ta revansch!";

    computerPoints ++;
   
    scoreComputer.textContent = computerPoints;
}


//---------------------------------------------------------------
//---------FUNCTION TO CHECK POINTS -----------------------------
//---------------------------------------------------------------
function checkPoints(){
    const resultModal = document.querySelector('.result-modal');
    const resultText = document.getElementById('result-text');

    //If statement to check if player or computer has reached 5 wins
    if(playerPoints === 5 || computerPoints === 5){
        setTimeout(function() {
            resultModal.classList.remove('modal-hidden');

            if(playerPoints === 5){
                resultText.innerHTML = "GRATTIS!!!<br>Du vann omgången. <br>Du var först till fem vinster!";
            } else {
                resultText.innerHTML = "Du förlorade...<br>Datorn var först till fem vinster. <br>Bättre lycka nästa gång.";
            }
            //Timeout function so that the player can se the result of current round before modal is shown
        }, 1500);
    }
    
    resultModal.addEventListener('click', function(){
        resultModal.classList.add('modal-hidden');
        location.reload();
    });
    gameRunning = false;
}

