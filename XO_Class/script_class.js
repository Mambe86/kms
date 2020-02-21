function addGame() {
    let game = new Game;
    console.log(game);
    game.showField();
}


function proccesClick() {
    let tar = event.target
    console.log(game.drawSymbol.bind(tar));
    
    //this.drawSymbol.bind(tar)();
}

var el = document.addEventListener("click", proccesClick, false);