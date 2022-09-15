const gameBoard = (() => {
    let boardArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    const boardValue = (x,y) => {
        return boardArray[x][y]
    }

    return {boardArray,boardValue}
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
        console.log(gameBoard.boardArray)
        displayController.updateBoard(div_id,x,y)
        
    }
    return {getName, getMarker, placeMarker}
}

const gameController = (() => {
    let playerOne = player("One","X")
    let playerTwo = player("Two","O")
    let playerOneTurn = true
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

    return {playerTurn}
})();

const displayController = (() => {

    let container = document.querySelector(".gameboard")
    for(x = 0; x<3; x++){

        for(y = 0; y<3; y++){
            //for each array item, create a div within the gameboard container
            
            let div = document.createElement("div")
            div.classList.add("gridbox")
            div.id = `${x},${y}`
            div.textContent = gameBoard.boardValue(x,y)
            if (div.textContent == ""){
                div.addEventListener("click", function clickevent(){
                    gameController.playerTurn(div.id)
                })
                console.log("added")
            }
            
            
            container.appendChild(div)
        }
    }

    const updateBoard = (div_id, x, y) => {
        //apply updated array value to display, then remove event listener
        let div = document.getElementById(div_id)
        div.textContent = gameBoard.boardArray[x][y]
        let new_div = div.cloneNode(true);
        div.parentNode.replaceChild(new_div, div);
        console.log("removed")
    }

    return {updateBoard}
})();

