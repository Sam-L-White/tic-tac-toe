const gameBoard = (() => {
    let boardArray = [
        ["X", "X", "X"],
        ["X", "O", "X"],
        ["X", "X", "X"]
    ];
    let displayArray = () => console.log(boardArray);
    
    return {displayArray}
})();

const player = () => {

}

const displayController = (() => {
    gameBoard.displayArray()
})();

