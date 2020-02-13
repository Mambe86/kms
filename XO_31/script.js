function addGame() {
    //добавляем новое игровое поле(ИП)
    let divGame = '<div id="game" class="gameField" ns="false"></div>  <hr>';
    document.getElementById("btn").insertAdjacentHTML("afterend", divGame); // += divGame;
    let game = document.getElementsByClassName("gameField"); 
    
    //делаем клетки на добавленном ИП, новое ИП всегда будет нулевым в массиве game
    for (var i = 0; i < 9; i++) {
        game[0].innerHTML += '<div class="cell"></div>';
    }
    let cell = game[0].getElementsByClassName("cell");
    for (var i = 0; i < 9; i++) {
        cell[i].onclick = cellClick;
    }
}

function cellClick(event) {
    // клик на ячейки
    if (event.target.className == "cell") { 
        if (this.innerHTML == "") { //если ячейка пуста ставим символ
            if (this.parentNode.getAttribute("ns") == "true") {
                this.innerHTML = "O";
                this.parentNode.setAttribute("ns", false);
            } else {
                this.innerHTML = "X";
                this.parentNode.setAttribute("ns", true);
            }
        }
        
        switch (checkWinner(this)) { // зачеркивание 3 в ряд
            case "Xh1":
            case "Oh1":
                this.parentNode.innerHTML += '<div class="lineh1"></div>';
                break;
            case "Xh2":
            case "Oh2":
                this.parentNode.innerHTML += '<div class="lineh2"></div>';
                break;
            case "Xh3":
            case "Oh3":
                this.parentNode.innerHTML += '<div class="lineh3"></div>';
                break;
            case "Xd1":
            case "Od1":
                this.parentNode.innerHTML += '<div class="lined1"></div>';
                break;
            case "Xd2":
            case "Od2":
                this.parentNode.innerHTML += '<div class="lined2"></div>';
                break;
            case "Xv1":
            case "Ov1":
                this.parentNode.innerHTML += '<div class="linev1"></div>';
                break;
            case "Xv2":
            case "Ov2":
                this.parentNode.innerHTML += '<div class="linev2"></div>';
                break;
            case "Xv3":
            case "Ov3":
                this.parentNode.innerHTML += '<div class="linev3"></div>';
                break;
        }
    }
}
//0 1 2
//3 4 5
//6 7 8

function checkWinner(elem) { //проверка победы 
    let m = elem.parentNode.getElementsByClassName("cell");
    let symbol = [];
    for (i = 0; i < 9; i++) {
        symbol[i] = m[i].innerHTML;
    }
    if (symbol[0] == "X" && symbol[1] == "X" && symbol[2] == "X") return "Xh1"; // ---
    if (symbol[3] == "X" && symbol[4] == "X" && symbol[5] == "X") return "Xh2"; // ---
    if (symbol[6] == "X" && symbol[7] == "X" && symbol[8] == "X") return "Xh3"; // ___
    if (symbol[0] == "X" && symbol[3] == "X" && symbol[6] == "X") return "Xv1"; // |
    if (symbol[1] == "X" && symbol[4] == "X" && symbol[7] == "X") return "Xv2"; //  |
    if (symbol[2] == "X" && symbol[5] == "X" && symbol[8] == "X") return "Xv3"; //   |
    if (symbol[0] == "X" && symbol[4] == "X" && symbol[8] == "X") return "Xd1"; // '\'
    if (symbol[2] == "X" && symbol[4] == "X" && symbol[6] == "X") return "Xd2"; // '/'

    if (symbol[0] == "O" && symbol[1] == "O" && symbol[2] == "O") return "Oh1"; // ---
    if (symbol[3] == "O" && symbol[4] == "O" && symbol[5] == "O") return "Oh2"; // ---
    if (symbol[6] == "O" && symbol[7] == "O" && symbol[8] == "O") return "Oh3"; // ___
    if (symbol[0] == "O" && symbol[3] == "O" && symbol[6] == "O") return "Ov1"; // |
    if (symbol[1] == "O" && symbol[4] == "O" && symbol[7] == "O") return "Ov2"; //  |
    if (symbol[2] == "O" && symbol[5] == "O" && symbol[8] == "O") return "Ov3"; //   |
    if (symbol[0] == "O" && symbol[4] == "O" && symbol[8] == "O") return "Od1"; // '\'
    if (symbol[2] == "O" && symbol[4] == "O" && symbol[6] == "O") return "Od2"; // '/'

    return "gameContinues";
}
