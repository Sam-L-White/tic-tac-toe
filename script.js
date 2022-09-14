const gameBoard = (() => {
    let boardArray = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"]
    ];
    let boardValue = (x,y) => {
        return boardArray[x][y]
    }

    return {boardValue}
})();

const player = () => {

}

const displayController = (() => {
    let container = document.querySelector(".gameboard")
    for(x = 0; x<3; x++){

        for(y = 0; y<3; y++){
            console.log(gameBoard.boardValue(x,y))
            let div = document.createElement("div")
            div.classList.add("gridbox")
            div.textContent = gameBoard.boardValue(x,y)
            container.appendChild(div)
        }
    }
})();

