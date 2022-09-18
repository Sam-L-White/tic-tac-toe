const gameBoard = (() => {
    let boardArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    

    return {boardArray}
})();

const player = (name,marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    const placeMarker = (div_id) => {
        //update array with marker value
        let coordinates = div_id.split(",")
        let x = coordinates[0]
        let y = coordinates[1]
        gameBoard.boardArray[x][y] = marker
        displayController.updateBoard(div_id,x,y)
        gameController.checkBoard()
        
    }
    return {getName, getMarker, placeMarker}
}

const displayController = (() => {

    let gameStarted = "No"
    const displayBoard = () => {
        let container = document.querySelector(".gameboard")
        for(x = 0; x<3; x++){

            for(y = 0; y<3; y++){
                //for each array item, create a div within the gameboard container
                
                let div = document.createElement("div")
                div.classList.add("gridbox")
                div.id = `${x},${y}`
                div.textContent = gameBoard.boardArray[x][y]
                if (div.textContent == ""){
                    div.addEventListener("click", function clickevent(){
                        gameController.playerTurn(div.id)
                    })
                    
                }
                
                
                container.appendChild(div)
                
            }
        }
        
    }
    

    const updateBoard = (div_id, x, y) => {
        //apply updated array value to display, then remove event listener
        let div = document.getElementById(div_id)
        div.textContent = gameBoard.boardArray[x][y]
        let new_div = div.cloneNode(true);
        div.parentNode.replaceChild(new_div, div);
        
    }

    return {updateBoard, displayBoard, gameStarted}
})();


const gameController = (function game(){
    let buttonStart = document.querySelector(".start-button")
    
    buttonStart.addEventListener("click", function startGame(){
        if (displayController.gameStarted === "No"){
            displayController.displayBoard()
            displayController.gameStarted = "Yes"
            buttonStart.textContent = "Restart"
        } else {
            document.querySelector(".gameboard").textContent = ""
            gameBoard.boardArray = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ];
            displayController.gameStarted = "No"
            buttonStart.textContent = "Start"
        }
        
        
    })
    
    
    
    
    let playerOne = player("One","X")
    let playerTwo = player("Two","O")
    let playerOneTurn = true
    
    
    
    //displayController.displayBoard()
    const playerTurn = (div_id) => {

        //swap between players
        if (playerOneTurn == true){
            playerOne.placeMarker(div_id)
            playerOneTurn = false
        } else {
            playerTwo.placeMarker(div_id)
            playerOneTurn = true
        }    
    }
    const checkBoard = () => {
        //create array of possible win combinations, and check against board array values
        const winCombos = [
            ["0,0","1,0","2,0"],
            ["0,1","1,1","2,1"],
            ["0,2","1,2","2,2"],
            ["0,0","0,1","0,2"],
            ["1,0","1,1","1,2"],
            ["2,0","2,1","2,2"],
            ["0,0","1,1","2,2"],
            ["0,2","1,1","2,0"]
        ];
        
        winCombos.forEach(function(row){
            pos1 = row[0].split(",")
            pos2 = row[1].split(",")
            pos3 = row[2].split(",")
            
            if(gameBoard.boardArray[pos1[0]][pos1[1]] === gameBoard.boardArray[pos2[0]][pos2[1]]){
                if(gameBoard.boardArray[pos2[0]][pos2[1]] === gameBoard.boardArray[pos3[0]][pos3[1]]){
                    switch(gameBoard.boardArray[pos3[0]][pos3[1]]){

                        case(playerOne.getMarker()):

                            console.log(`${playerOne.getName()} wins!`)
                            break;

                        case(playerTwo.getMarker()):

                            console.log(`${playerTwo.getName()} wins!`)
                            break;
                        
                    }
                }
            } 

            
        })
        
    };
        
        
        


    return {playerTurn, checkBoard}
})();


