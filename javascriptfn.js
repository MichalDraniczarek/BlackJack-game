/*      calling all base functions      */

function takeFirstPlayerCard()
{
    card.moveCardToPlayer();
    card.addPlayerPoints();
    card.removeCard(); 
    card.createCard();
}

function takeSecondPlayerCard()
{
    card.moveCardToPlayer();
    card.addPlayerPoints();
    card.removeCard(); 
    card.createCard();
}

function takeFirstComputerCard()
{
    card.moveCardToComputer();
    card.addComputerPoints();
    card.removeCard(); 
    card.createCard();
}

function takeSecondComputerCard()
{
    card.moveCardToComputer();
    card.addComputerPoints();
    card.removeCard(); 
    card.createCard();
}

function permissionToTakeCardOrigin()
{
    playerActionState = true;   
}


/*      checking conditions and for hit-card-action-button BUTTON       */

function forbidHitCard()
{
    if(playerActionState == true)
    {
        playerActionState = false;
    }
}

function permissionToTakeCard()
{
    playerActionState = true;

    hitCardActionButtonActive = true;
}

function permissionToTakeCardManual()
{
    if(playerActionState == false && hitCardActionButtonActive == true  && playerPass == false)
    {
        setTimeout(permissionToTakeCard,3800);
    }
    hitCardActionButtonActive == false;
}

function hitCardButtonActivationState()
{
    hitCardActionButtonActive = false;
}


/*      mian functions for hit-card-action-button BUTTON       */

function takeCard()
{
    if(playerActionState == true && hitCardActionButtonActive == true && playerPass == false)
    {
        //playerActionState = false;
        card.moveCardToPlayer();
        
                
    }
}

function addPlayerPoints()
{
    if(playerActionState == true && hitCardActionButtonActive == true && playerPass == false)
    {
        card.addPlayerPoints();
    }
}

function addCardToStack()
{
    if(playerActionState == true && hitCardActionButtonActive == true && playerPass == false)
    {
        card.removeCard();   
        card.createCard();
    }
    
}


/*      Inner functions of object "card"    */

function displayPlayerPoints(totalScore,totalMinScore)
{
    const pointsContainer = document.querySelector(".score-value-player");
    pointsContainer.children[0].innerHTML = totalScore;
    pointsContainer.children[1].innerHTML = totalMinScore;
}


/*      display popup windows depending on victory or loose conditions      */

function displayLooserWindow()
{
    addPointToComputerCounter();

    const looseWindow = document.querySelector(".popup-lose");
    looseWindow.classList.remove("popup-lose");
    looseWindow.classList.add("visibility-attr");  
}


function blackJackWin()
{
    addPointToPlayerCounter();

    const blackJackWindow = document.querySelector(".popup-blackjack");
    blackJackWindow.classList.remove("popup-blackjack");
    blackJackWindow.classList.add("visibility-attr");     
}

function blackJackWinComputer()
{
    addPointToComputerCounter();

    const blackJackWindowCom = document.querySelector(".popup-blackjack-computer");
    blackJackWindowCom.classList.remove("popup-blackjack-computer");
    blackJackWindowCom.classList.add("visibility-attr");      
}

function computerLoose()
{
    addPointToPlayerCounter();

    const looseWindowCom = document.querySelector(".popup-lose-computer");
    looseWindowCom.classList.remove("popup-lose-computer");
    looseWindowCom.classList.add("visibility-attr");      
}

function beatOnPoints()
{
    addPointToPlayerCounter();

    const beatOnPoints = document.querySelector(".popup-beat-on-points");
    beatOnPoints.classList.remove("popup-beat-on-points");
    beatOnPoints.classList.add("visibility-attr");    
}

function loseOnPoints()
{
    addPointToComputerCounter();

    const loseOnPoints = document.querySelector(".popup-lose-on-points");
    loseOnPoints.classList.remove("popup-lose-on-points");
    loseOnPoints.classList.add("visibility-attr");       
}

function evenScore()
{
    const evenScore = document.querySelector(".popup-even-score");
    evenScore.classList.remove("popup-even-score");
    evenScore.classList.add("visibility-attr");    
}


/*  end of player turn  */

function endMyTurn()
{
    playerPass = true;
    
    startComputerTurns();
}



/*      computer turns      */

function startComputerTurns()
{

    const cardToRotate = document.querySelector(".card-to-rotate");
    cardToRotate.classList.add("card-rotate");

    displayComputerPoints(card.computerStartingMaxScore, card.computerStartingMinScore);

    const computerTurnCall = setInterval(() => {
        
           
        if(card.computerStartingMaxScore >= 17 && card.computerStartingMaxScore < 21)
            {
                compareScore();
                clearInterval(computerTurnCall);
            }else if(card.computerStartingMaxScore <= 16)
                    {
                        card.moveCardToComputer();
                        card.addComputerPoints();
                        card.removeCard(); 
                        card.createCard();
                    }else if(card.computerStartingMaxScore == 21)
                            {
                                setTimeout(blackJackWinComputer, 100);

                                clearInterval(computerTurnCall);
                            }else if(card.computerStartingMaxScore > 21)
                                    {
                                        setTimeout(computerLoose, 100);
                                        clearInterval(computerTurnCall);
                                    }
    }, 4800);

}


function displayComputerPoints(totalScore,totalMinScore)
{
    const pointsComputerContainer = document.querySelector(".score-value-computer");
    pointsComputerContainer.children[0].innerHTML = totalScore;
    pointsComputerContainer.children[1].innerHTML = totalMinScore; 
}

function compareScore()
{

    if(card.playerFinalScore > card.computerStartingMaxScore)
    {
        beatOnPoints();
    }else if(card.playerFinalScore < card.computerStartingMaxScore)
            {
                loseOnPoints();
            }else if(card.playerFinalScore = card.computerStartingMaxScore)
                    {
                        evenScore();
                    }

}



function convertLocalStorageScoreToInteger(playerWins1,computerWins1)
{
    playerWinsCount = parseInt(playerWins1, 10);
    localStorage.setItem("playerWinsCount",playerWinsCount);

    computerWinsCount = parseInt(computerWins1, 10);
    localStorage.setItem("computerWinsCount",computerWinsCount);
}

function addPointToPlayerCounter()
{
    playerWinsCount++;
    localStorage.setItem("playerWinsCount",playerWinsCount);
    winningEntireGame();
}

function addPointToComputerCounter()
{
    computerWinsCount++;
    localStorage.setItem("computerWinsCount",computerWinsCount);
    winningEntireGame();
}

function displayStateOfScore()
{
    const computerScore = document.querySelector(".computer-score-container");
    computerScore.innerHTML = computerWinsCount;

    const playerScore = document.querySelector(".player-score-container");
    playerScore.innerHTML = playerWinsCount;
}



/*      Main menu functions    */

function winningEntireGame()
{

    if(playerWinsCount >= finalWinConditionCounter)
    {
        playerWinsTheGame = document.querySelector(".player-final-win");
        playerWinsTheGame.classList.remove("player-final-win");
        playerWinsTheGame.classList.add("visibility-attr");
    }

    if(computerWinsCount >= finalWinConditionCounter)
    {
        computerWinsTheGame = document.querySelector(".computer-final-win");
        computerWinsTheGame.classList.remove("computer-final-win");
        computerWinsTheGame.classList.add("visibility-attr"); 
    }

}

