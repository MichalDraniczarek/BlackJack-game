
let winCondition = 0;
let roundCounter = 3;
let restartWinCondition = 0;


const addRound = document.querySelector(".add-victory-points-button");
addRound.addEventListener("click",addRoundToCounter);

const subtractRound = document.querySelector(".subtract-victory-point-button");
subtractRound.addEventListener("click",subtractRoundToCounter);

const startGameButton = document.querySelector(".start-game");
startGameButton.addEventListener("click",startGameButtonAction);


if (localStorage.getItem("winCondition") === null) {
    
    localStorage.setItem("winCondition",winCondition);
}else   {
            winCondition = localStorage.getItem("winCondition");           
        }   


winCondition = 3;
localStorage.setItem("winCondition",winCondition);


if (localStorage.getItem("restartWinCondition") === null) {
    
    localStorage.setItem("restartWinCondition",restartWinCondition);
}else   {
            localStorage.setItem("restartWinCondition",restartWinCondition);           
        }   



function addRoundToCounter()
{

    if(roundCounter < 20)
        {
            roundCounter ++;
        }else   {
                roundCounter = 20; 
                }


    pointContainerBox = document.querySelector(".point-slot");
    addPointButton = document.querySelector(".point-slot-container");
    el = document.createElement("div");
    el.classList.add("point-slot");
    el.innerHTML =  roundCounter;

    pointContainerBox.remove();
    addPointButton.append(el);
    newWinCondition(roundCounter);
}


function subtractRoundToCounter()
{
    if(roundCounter > 3)
        {
            roundCounter --;
        }else   {
                roundCounter = 3; 
                }


    pointContainerBox = document.querySelector(".point-slot");
    addPointButton = document.querySelector(".point-slot-container");
    el = document.createElement("div");
    el.classList.add("point-slot");
    el.innerHTML =  roundCounter;

    pointContainerBox.remove();
    addPointButton.append(el);
    
    newWinCondition(roundCounter);
}



showRulesButton = document.querySelector(".game-rules");
showRulesButton.addEventListener("click",showRules);

const closeRulesWindow = document.querySelector(".exit-game-rules-screen-btn");
closeRulesWindow.addEventListener("click",closeRulesWindowFn);

function showRules()
{
    const showRules = document.querySelector(".popup-rules");
    showRules.classList.remove("popup-rules");
    showRules.classList.add("visibility-attr-start");    

}

function closeRulesWindowFn()
{
    const showRules = document.querySelector(".visibility-attr-start");
    showRules.classList.remove("visibility-attr-start");
    showRules.classList.add("popup-rules");    
}

function newWinCondition(x)
{
    localStorage.setItem("winCondition",x);
}

function startGameButtonAction()
{
    restartWinCondition = 0;

    localStorage.setItem("restartWinCondition",restartWinCondition);    
}


