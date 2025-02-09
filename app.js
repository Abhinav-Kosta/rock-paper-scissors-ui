let systemChoice = []; //Array to store System answer
let playerChoice = []; //Array to store user answer

let round = 0;  //Value of total number of rounds user selected(3/5/7)
let roundStarted = false; //flag for hiding round button and unhiding answers button

let currentRound = 1;

let roundSelection = document.querySelector(".round-selection");//For unhide and hide
let roundbtns = document.querySelectorAll(".round-btn"); //taking user answer

let choices = document.querySelector(".choices"); // For hide and unhide rock,paper..

let body = document.querySelector("body");//Flashing color according to winner

let hitSound = new Audio("hitting.wav");

for(let btn of roundbtns){
    btn.addEventListener("click", function(){
        if(roundStarted == false){
            round = parseInt(btn.innerText);
            roundStarted = true;
            // console.log(round);

            btn.parentElement.classList.add("stay-hide");
            choices.classList.remove("stay-hide");

            hitSound.play();
            gameStart();
        }
    });
}

let h2 = document.querySelector("h2");
let gameChoice = ["Rock", "Paper", "Scissors"];

//System choosing his answer(Rock, Paper, Scissors)
function gameStart(){
    h2.innerText = `Current Round: ${currentRound}`;
    let sychidx = Math.floor(Math.random() * 3);
    let sych = gameChoice[sychidx];
    systemChoice.push(sych);
}


//Player choosing his answer by clicking on button on web page
let choicebtns = document.querySelectorAll(".choice-btn");

for(let btn of choicebtns){
    btn.addEventListener("click", function(){
        if(currentRound <= round){
            userch = btn.innerText;
            playerChoice.push(userch);

            hitSound.play();
            result(); //Calculating result and incrementing currentRound value
        }
    })
}

let playerWon = 0;
let systemWon = 0; //Counter of who won how many rounds
let winner;

let pCount = document.querySelector(".scoreP");
let sCount = document.querySelector(".scoreS"); //Displaying Score on webpages

function result(){
    //Image to be displayed
    // let imgLeft = document.getElementById(`${playerChoice[0]}L`);

    // imgLeft.classList.remove(`${playerChoice[0]}L`);

    // setTimeout(function(){
    //     imgLeft.classList.add(`${playerChoice[0]}L`);
    // }, 2000);

    // let imgRight = document.getElementById(`${systemChoice[0]}R`);

    // imgRight.classList.remove(`${systemChoice[0]}R`);

    // setTimeout(function(){
    //     imgRight.classList.add(`${systemChoice[0]}R`);
    // }, 2000);

    let imgLeft = document.getElementById(`${playerChoice[0]}L`);
    let imgRight = document.getElementById(`${systemChoice[0]}R`);

    // Hide all left-side images first
    document.querySelectorAll(".player-section .img").forEach(img => {
        img.style.display = "none";
    });

    // Hide all right-side images first
    document.querySelectorAll(".player-section:last-child .img").forEach(img => {
        img.style.display = "none";
    });

    // Display the chosen images
    imgLeft.style.display = "block";
    imgRight.style.display = "block";

    // Hide after 2 seconds
    setTimeout(function(){
        imgLeft.style.display = "none";
        imgRight.style.display = "none";
    }, 2000);

    if(systemChoice[0] === playerChoice[0]){
        h2.innerHTML = `Round: ${currentRound}<br><b>Round Tied<b>`;
        systemChoice = [];
        playerChoice = [];

        if(currentRound == round){
            setTimeout(restart, 2000);
            //If final round completed, restart the game with 2 second delay
        }
        else{
            setTimeout(() => {
                ++currentRound;
                gameStart();  // Delay gameStart() so round result is visible
            }, 1500);
            //Incrementing currentRound and making system to again choose his answer
        }
    }
    else if(systemChoice[0] == "Rock" && playerChoice[0] == "Paper"){
        h2.innerHTML = `Round: ${currentRound}<br><b>Player Won<b>`;

        //Simple Logic for updating playerWon counter and 
        //Displaying it on webpage
        playerWon++;
        pCount.innerText = `Player Won: ${playerWon}`;

        systemChoice = [];
        playerChoice = [];

        if(currentRound == round){
            setTimeout(restart, 2000);
        }
        else{
            setTimeout(() => {
                ++currentRound;
                gameStart();  // Delay gameStart() so round result is visible
            }, 1500);
        }
    }
    else if(systemChoice[0] == "Paper" && playerChoice[0] == "Scissors"){
        h2.innerHTML = `Round: ${currentRound}<br><b>Player Won<b>`;
        
        playerWon++;
        pCount.innerText = `Player Won: ${playerWon}`;

        systemChoice = [];
        playerChoice = [];

        if(currentRound == round){
            setTimeout(restart, 2000);
        }
        else{
            setTimeout(() => {
                ++currentRound;
                gameStart();  // Delay gameStart() so round result is visible
            }, 1500);
        }
    }
    else if(systemChoice[0] == "Scissors" && playerChoice[0] == "Rock"){
        h2.innerHTML = `Round: ${currentRound}<br><b>Player Won<b>`;
        
        playerWon++;
        pCount.innerText = `Player Won: ${playerWon}`;

        systemChoice = [];
        playerChoice = [];

        if(currentRound == round){
            setTimeout(restart, 2000);
        }
        else{
            setTimeout(() => {
                ++currentRound;
                gameStart();  // Delay gameStart() so round result is visible
            }, 1500);
        }
    }
    else{
        h2.innerHTML = `Round: ${currentRound}<br><b>System Won<b>`;
        
        systemWon++;
        sCount.innerText = `System Won: ${systemWon}`;

        systemChoice = [];
        playerChoice = [];

        if(currentRound == round){
            setTimeout(restart, 2000);
        }
        else{
            setTimeout(() => {
                ++currentRound;
                gameStart();  // Delay gameStart() so round result is visible
            }, 1500);
        }
    }
}

//For restarting, making round = 0 and roundStarted = false
//reverting back h2 heading of webpage
//Unhiding round number selection
//Hiding choices(Rock, Paper, Scissors) buttons
function restart(){
    if(currentRound === round){
        if(playerWon > systemWon){
            winner = "Player Won!";

            //Flashing Background Color according to Winner
            body.classList.add("lightgreen");
            setTimeout(function(){
                body.classList.remove("lightgreen");
            }, 2000);
        }
        else if(systemWon > playerWon){
            winner = "System Won!";

            body.classList.add("red");
            setTimeout(function(){
                body.classList.remove("red");
            }, 2000);
        }
        else{
            winner = "Match Tied!";

            body.classList.add("aqua");
            setTimeout(function(){
                body.classList.remove("aqua");
            }, 2000);
        }
        
        round = 0;
        currentRound = 1;
        roundStarted = false;

        h2.innerHTML = `<b>${winner}<b><br>Player select your choice to
                        start the game`;

        playerWon = 0;
        pCount.innerText = `Player Won: ${playerWon}`;
        systemWon = 0;
        sCount.innerText = `System Won: ${systemWon}`;

        choices.classList.add("stay-hide");
        roundSelection.classList.remove("stay-hide");
    }
}