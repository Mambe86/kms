class Game {
    constructor() {
        this.cell = [];
        this.nextSymbol = false;
        
    }
    
    showField() {
        //
        let divGame =
            '<div id="game" class="gameField" ns="false"></div>  <hr>';
        document.getElementById("btn").insertAdjacentHTML("afterend", divGame); // += divGame;
        let gameField = document.getElementsByClassName("gameField");

        //делаем клетки на добавленном ИП, новое ИП всегда будет нулевым в массиве game
        for (var i = 0; i < 9; i++) {
            gameField[0].innerHTML += '<div class="cell"></div>';
        }
        let gameFieldCell = gameField[0].getElementsByClassName("cell");
        for (var i = 0; i < 9; i++) {
            this.cell[i] = gameFieldCell[i];
        }
    }
    drawSymbol(numCell) {
        if (this.cell[numCell].innerHTML == "") {
            if (this.nextSymbol) {
                this.cell[numCell].innerHTML = "X";
            } else this.cell[numCell].innerHTML = "O";
        }
    }

    checkWinner() {
        //проверка победы
        if (
            this.cell[0].innerHTML == "X" &&
            this.cell[1].innerHTML == "X" &&
            this.cell[2].innerHTML == "X"
        )
            return "Xh1"; // ---
        if (
            this.cell[3].innerHTML == "X" &&
            this.cell[4].innerHTML == "X" &&
            this.cell[5].innerHTML == "X"
        )
            return "Xh2"; // ---
        if (
            this.cell[6].innerHTML == "X" &&
            this.cell[7].innerHTML == "X" &&
            this.cell[8].innerHTML == "X"
        )
            return "Xh3"; // ___
        if (
            this.cell[0].innerHTML == "X" &&
            this.cell[3].innerHTML == "X" &&
            this.cell[6].innerHTML == "X"
        )
            return "Xv1"; // |
        if (
            this.cell[1].innerHTML == "X" &&
            this.cell[4].innerHTML == "X" &&
            this.cell[7].innerHTML == "X"
        )
            return "Xv2"; //  |
        if (
            this.cell[2].innerHTML == "X" &&
            this.cell[5].innerHTML == "X" &&
            this.cell[8].innerHTML == "X"
        )
            return "Xv3"; //   |
        if (
            this.cell[0].innerHTML == "X" &&
            this.cell[4].innerHTML == "X" &&
            this.cell[8].innerHTML == "X"
        )
            return "Xd1"; // '\'
        if (
            this.cell[2].innerHTML == "X" &&
            this.cell[4].innerHTML == "X" &&
            this.cell[6].innerHTML == "X"
        )
            return "Xd2"; // '/'

        if (
            this.cell[0].innerHTML == "O" &&
            this.cell[1].innerHTML == "O" &&
            this.cell[2].innerHTML == "O"
        )
            return "Oh1"; // ---
        if (
            this.cell[3].innerHTML == "O" &&
            this.cell[4].innerHTML == "O" &&
            this.cell[5].innerHTML == "O"
        )
            return "Oh2"; // ---
        if (
            this.cell[6].innerHTML == "O" &&
            this.cell[7].innerHTML == "O" &&
            this.cell[8].innerHTML == "O"
        )
            return "Oh3"; // ___
        if (
            this.cell[0].innerHTML == "O" &&
            this.cell[3].innerHTML == "O" &&
            this.cell[6].innerHTML == "O"
        )
            return "Ov1"; // |
        if (
            this.cell[1].innerHTML == "O" &&
            this.cell[4].innerHTML == "O" &&
            this.cell[7].innerHTML == "O"
        )
            return "Ov2"; //  |
        if (
            this.cell[2].innerHTML == "O" &&
            this.cell[5].innerHTML == "O" &&
            this.cell[8].innerHTML == "O"
        )
            return "Ov3"; //   |
        if (
            this.cell[0].innerHTML == "O" &&
            this.cell[4].innerHTML == "O" &&
            this.cell[8].innerHTML == "O"
        )
            return "Od1"; // '\'
        if (
            this.cell[2].innerHTML == "O" &&
            this.cell[4].innerHTML == "O" &&
            this.cell[6].innerHTML == "O"
        )
            return "Od2"; // '/'

        return "gameContinues";
    }
}
