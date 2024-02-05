/*  store game score   */
let playerWinsCount = 0;
let computerWinsCount = 0;

finalWinConditionCounter = localStorage.getItem("winCondition");
restartScore = localStorage.getItem("restartWinCondition");

finalWinConditionCounter = parseInt(finalWinConditionCounter, 10);


/*      Restart Points Needed to win and set them value to 0 when playing New Game     */
if(restartScore == 0)
{
    restartingCounter = 0;

    localStorage.setItem("playerWinsCount",restartingCounter);
    localStorage.setItem("computerWinsCount",restartingCounter);

    restartScore++;
    localStorage.setItem("restartWinCondition",restartScore);
}


if (localStorage.getItem("playerWinsCount") === null) {
    
    localStorage.setItem("playerWinsCount",playerWinsCount);
}else   {
            playerWinsCount = localStorage.getItem("playerWinsCount");
            
        }   

if (localStorage.getItem("computerWinsCount") === null) {
    
    localStorage.setItem("computerWinsCount",computerWinsCount);
}else   {
            computerWinsCount = localStorage.getItem("computerWinsCount");
        }


convertLocalStorageScoreToInteger(playerWinsCount,computerWinsCount);


/*  base variables  */

let computerWins = false;
let playerWins = false;

let playerActionDetector = false;
let playerActionState = false;

let computerPass = false;
let playerPass = false;

let hitCardActionButtonActive = true;

let playerTotalScore = 0;
let computerTotalScore = 0


/*  call all functions below before the game starts */

displayStateOfScore();


card.createCard();

setTimeout(takeFirstPlayerCard,10);
setTimeout(takeSecondPlayerCard,3000);
setTimeout(permissionToTakeCardOrigin,8100);

setTimeout(takeFirstComputerCard,1500);
setTimeout(takeSecondComputerCard,4500);


/*  action buttons  */

const takeTheCard = document.querySelector(".hit-card-action-button");
takeTheCard.addEventListener("click", takeCard);
takeTheCard.addEventListener("click", addPlayerPoints);
takeTheCard.addEventListener("click", addCardToStack);
takeTheCard.addEventListener("click", forbidHitCard);
takeTheCard.addEventListener("click", permissionToTakeCardManual);
takeTheCard.addEventListener("click", hitCardButtonActivationState);



const endTurn = document.querySelector(".pass-card-action-button");
endTurn.addEventListener("click", endMyTurn);










