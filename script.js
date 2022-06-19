(function(){

    "use strict"

    const startGame = document.getElementById('startgame') ;
    const gameControl = document.getElementById('gamecontrol') ;
    const game = document.getElementById('game') ;
    const score = document.getElementById('score') ;
    const actionArea = document.getElementById('actions') ;

    const gameData = {
        dice : ['1die.jpg' , '2die.jpg' , '3die.jpg' ,
                    '4die.jpg' , '5die.jpg' , '6die.jpg'] ,
        players : ['player 1' , 'player 2'] ,
        score : [0 ,0] ,
        roll1 : 0 , 
        roll2 : 0 ,
        rollsum: 0 ,
        index: 0 ,
        gameEnd: 29
    } ;

    
    // Starts the game for the user and gives the user the 
    // Option to quit the game
    startGame.addEventListener("click" , function(){

        gameData.index = Math.round(Math.random()) ;
        gameControl.innerHTML = "<h2>The game has started</h2>" ;
        gameControl.innerHTML += "<button id = 'quit' > Do you want to quit? </button>" ;

        document.getElementById('quit').addEventListener('click' , function(){

            // Refreshes the page
            location.reload() ;
        }) ;

        setUpTurn() ;


    })

    // Sets html to roll the dice for the correct player
    function setUpTurn(){

        game.innerHTML = `<p> Roll the dice for the ${gameData.players[gameData.index]}` ;
        actionArea.innerHTML = "<button id = 'roll'> Roll the dice ! </button>" ;

        document.getElementById('roll').addEventListener('click' , function(){
            throwDice() ;
        }) ;
    }


    function throwDice(){
        actionArea.innerHTML = '' ;
        gameData.roll1 = Math.floor((Math.random() * 6 ))+ 1 ;
        gameData.roll2 = Math.floor((Math.random() * 6 )) + 1 ;
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]} </p>` ;
        game.innerHTML += `<img src = "${gameData.dice[gameData.roll1 - 1]}" alt = "die">` ;
        game.innerHTML += `<img src = "${gameData.dice[gameData.roll2 - 1]}" alt = "die">` ;
        gameData.rollsum = gameData.roll1 + gameData.roll2 ;

        if( gameData.rollsum === 2 ){
            console.log("snake eyes") ;
            game.innerHTML += "<p>Oh snap! You got snake eyes!</p>" ;
            gameData.score[gameData.index] = 0 ;

            // tenary operator 
            // If its zero set to 1 and vice versa
            gameData.index ? (gameData.index = 0) : (gameData.index = 1) ;
            showCurrentScore() ;
            setTimeout(setUpTurn , 2000) ;

        }else if(gameData.roll1 === 1  || gameData.roll2 === 1){
            console.log("Your turn is over") ;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1) ;
            game.innerHTML += `<p>You rolled a 1, switching to ${gameData.players[gameData.index]}</p>` ;
            setTimeout(setUpTurn , 2000) ;
        }else {
            console.log("The game continues")
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollsum ;
            actionArea.innerHTML = '<button id = "rollagain"> Roll Again </button> or <button id = "pass"> Pass </button>' ;

            document.getElementById("rollagain").addEventListener('click' , function(){
                // setUpTurn() ;
                throwDice() ;
            }) ;

            document.getElementById("pass").addEventListener('click' , function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1) ; 
                setUpTurn() ;
            }) ;

            checkWinningCondition() ;

        }

        function checkWinningCondition(){
            if( gameData.score[gameData.index] > gameData.gameEnd){
                score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index] }
                    points ! </h2>`

                actionArea.innerHTML = "" ;

                document.getElementById('quit').innerHTML = "Start a New Game ?" ;
            }else{

                showCurrentScore() ;
            }
        }

        function showCurrentScore(){
            score.innerHTML = `<p> The score for player one is <strong> ${gameData.players[0]} is ${gameData.score[0]} 
                                        </strong> the score for player two is <strong> ${gameData.players[1]}
                                            is ${gameData.score[1]} </strong></p>` ;
        }

    }
})() ;