
const card = {

    cardID :   [ [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],
                 ["p01.png","p02.png","p03.png","p04.png","p05.png","p06.png","p07.png","p08.png","p09.png","p10.png","p11.png","p12.png","p13.png","s01.png","s02.png","s03.png","s04.png","s05.png","s06.png","s07.png","s08.png","s09.png","s10.png","s11.png","s12.png","s13.png","k01.png","k02.png","k03.png","k04.png","k05.png","k06.png","k07.png","k08.png","k09.png","k10.png","k11.png","k12.png","k13.png","t01.png","t02.png","t03.png","t04.png","t05.png","t06.png","t07.png","t08.png","t09.png","t10.png","t11.png","t12.png","t13.png"], 
                 [2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11] ],
    karty   :   [1,2,3,4,5,6,7,8,9,10],

    cardsInDeck : 52,
    cardToRemove : 0,
    currentCardID: 0,
    playerPoints: 0,
    playerNewPoints: 0,
    playerCardInRow: 0,
    aceAmount: 0,
    aceComputerAmount: 0,
    computerCardInRow: 0,
    preventCardFlipCom: 0,
    computerStartingMaxScore: 0,
    computerStartingMinScore: 0,
    displayComputerPointsCounter: 0,
    playerFinalScore: 0,
    scoreArray: [],
    scoreComputerArray: [],

    createCard(){
       
        const newRandCard = Math.floor(Math.random() * (this.cardsInDeck));
        this.cardToRemove = newRandCard;
        this.playerNewPoints = newRandCard;

        const pileOfCards = document.querySelector(".deck-of-cards-starting-pos");

        const newCardContainer = document.createElement("div");
        newCardContainer.classList.add("card-container");
        newCardContainer.setAttribute("id", this.cardID[0][newRandCard] );

        this.currentCardID = this.cardID[0][newRandCard];

        const newCard = document.createElement("div");
        newCard.classList.add("card");

        const frontCard = document.createElement("div");
        frontCard.classList.add("front-card");

        const backCard = document.createElement("div");
        backCard.classList.add("back-card");
        backCard.style.backgroundImage = "url(img/" + this.cardID[1][newRandCard] + ")";

        pileOfCards.appendChild(newCardContainer);
        newCardContainer.appendChild(newCard);
        newCard.appendChild(frontCard);
        newCard.appendChild(backCard);

    },

    removeCard()
    {
        this.cardID[0].splice(this.cardToRemove,1);
        this.cardID[1].splice(this.cardToRemove,1);
        this.cardID[2].splice(this.cardToRemove,1);

        this.cardsInDeck--;
    },

    moveCardToPlayer(){

        cardToMoveID = this.currentCardID;

        const cardToMove = document.getElementById(cardToMoveID);

        let shiftPositionOfCard  = this.playerCardInRow;
        
        
        function movePlayerCard(move, rotation, shift) {
            if(shift == true)
            {
                let shiftPosition = -525 + (shiftPositionOfCard * 60);

                cardToMove.style.transform = "translate(" + shiftPosition + "px,300px)";

            }else
            cardToMove.style.transform = move;

            if(rotation == true)
                cardToMove.firstChild.classList.add("card-rotate");

        }
        setTimeout(movePlayerCard, 0,"translate(150px,0px)",false,false); 
        setTimeout(movePlayerCard, 1200,"translate(150px,300px)",false,false);
        setTimeout(movePlayerCard, 2400,"translate(150px,300px)",true,false);
        setTimeout(movePlayerCard, 3600,"translate(-525px,",false,true);

        this.playerCardInRow++;
    },

    addPlayerPoints(){
        
        let tempNewScore;
        let totalScore = 0;
        let totalMinScore = 0;

        tempNewScore = this.cardID[2][this.playerNewPoints];

        this.scoreArray.push(tempNewScore);
        
        loop1: for(let i = 0; i < this.scoreArray.length; i++)
        {
            totalScore = totalScore + this.scoreArray[i];

                if(totalScore > 21)
                {
                    
                    for(let i = 0; i < this.scoreArray.length; i++)
                    {
                        if(this.scoreArray[i] == 11)
                        {
                        this.aceAmount++;
                        for(let i = 0; i < this.scoreArray.length; i++)
                        {
                            if(this.scoreArray[i] == 11)
                                {
                                    this.scoreArray[i] = 1;
                                    
                                    this.aceAmount--;
                                    break;
                                }
                        }
                        }
                    }
                                                                
                    totalScore = 0;
                    
                    for(let i = 0; i < this.scoreArray.length; i++)
                    {
                        totalScore = totalScore + this.scoreArray[i];                      
                    }

                    if(totalScore > 21 && this.aceAmount > 0)
                    {
                        continue loop1;
                    }else if(totalScore > 21 && this.aceAmount == 0)   {
                                setTimeout(displayLooserWindow, 2800);
                                
                            }
                }
        }

        for(let i = 0; i < this.scoreArray.length; i++)
        {
            tempMinScoreValue = this.scoreArray[i];

            if(tempMinScoreValue == 11)
            {
                tempMinScoreValue = 1;
            }

            totalMinScore = totalMinScore + tempMinScoreValue;
        }

        totalScore = 0;

        for(let i = 0; i < this.scoreArray.length; i++)
        {          
            totalScore = totalScore + this.scoreArray[i];
            this.playerFinalScore = totalScore;
            if(totalScore == 21)
            {
                
                setTimeout(blackJackWin, 2800);
            }          
        }

        let sumCards; 
        sumCards = this.playerPoints + this.cardID[2][this.playerNewPoints];
        this.playerPoints = sumCards;

        setTimeout(displayPlayerPoints, 2800,totalScore,totalMinScore);
    },


////////////////////////////////////////
    moveCardToComputer(){

        cardToMoveID = this.currentCardID;

        preventCardFlipCom = this.preventCardFlipCom;

        const cardToMove = document.getElementById(cardToMoveID);

        let shiftPositionOfCard  = this.computerCardInRow;
        
        
        function moveComputerCard(move, rotation, shift) {
            if(shift == true)
            {
                let shiftPosition = -525 + (shiftPositionOfCard * 60);

                cardToMove.style.transform = "translate(" + shiftPosition + "px,-300px)";

                preventCardFlipCom++;
            }else
            cardToMove.style.transform = move;

            if(rotation == true && this.preventCardFlipCom == 0)
                cardToMove.firstChild.classList.add("card-rotate");

            if(rotation == true && this.preventCardFlipCom == 1)
                cardToMove.firstChild.classList.add("card-to-rotate");
        }
        setTimeout(moveComputerCard, 0,"translate(150px,0px)",false,false); 
        setTimeout(moveComputerCard, 1200,"translate(150px,-300px)",false,false);
        setTimeout(moveComputerCard, 2400,"translate(150px,-300px)",true,false);
        setTimeout(moveComputerCard, 3600,"translate(-525px,",false,true);

        this.computerCardInRow++;
    },

/////////////////////////////////////////////

addComputerPoints(){
        
    let tempNewScore;
    let totalScore = 0;
    let totalMinScore = 0;

    tempNewScore = this.cardID[2][this.playerNewPoints];

    this.scoreComputerArray.push(tempNewScore);
    
    loop1: for(let i = 0; i < this.scoreComputerArray.length; i++)
    {
        totalScore = totalScore + this.scoreComputerArray[i];

            if(totalScore > 21)
            {
                for(let i = 0; i < this.scoreComputerArray.length; i++)
                {
                    if(this.scoreComputerArray[i] == 11)
                    {
                    this.aceComputerAmount++;
                    for(let i = 0; i < this.scoreComputerArray.length; i++)
                    {
                        if(this.scoreComputerArray[i] == 11)
                            {
                                this.scoreComputerArray[i] = 1;
                                
                                this.aceComputerAmount--;
                                break;
                            }
                    }
                    }
                }
                                                            
                totalScore = 0;
                
                for(let i = 0; i < this.scoreComputerArray.length; i++)
                {
                    totalScore = totalScore + this.scoreComputerArray[i];
                    
                }

                if(totalScore > 21 && this.aceComputerAmount > 0)
                {
                    continue loop1;
                }else if(totalScore > 21 && this.aceComputerAmount == 0)   {
                        
                        }
            }
    }


    for(let i = 0; i < this.scoreComputerArray.length; i++)
    {

        tempMinScoreValue = this.scoreComputerArray[i];

        if(tempMinScoreValue == 11)
        {
            tempMinScoreValue = 1;
        }

        totalMinScore = totalMinScore + tempMinScoreValue;
        this.computerStartingMinScore = totalMinScore;
    }

    totalScore = 0;

    for(let i = 0; i < this.scoreComputerArray.length; i++)
    {
        
        totalScore = totalScore + this.scoreComputerArray[i];
        this.computerStartingMaxScore = totalScore;

        if(totalScore == 21)
        {
            ///         ????????????????
        }
        
    }

    let sumCards; 
    sumCards = this.playerPoints + this.cardID[2][this.playerNewPoints];
    this.playerPoints = sumCards;

    this.displayComputerPointsCounter++;

    if(this.displayComputerPointsCounter > 2)
    {
        setTimeout(displayComputerPoints, 2800,totalScore,totalMinScore);
    }

},
    

////////////////////////////////////////////////////////////////////////////

    showArray(){

        for(let i = 0; i < 3; i++)
        {

            for(let j = 0; j<this.cardsInDeck;j++)
                {

                }
        }
    },
}
















