window.onload = function() {
    todoList = [];
    if (localStorage.getItem("todo") != undefined) {
        todoList = JSON.parse(localStorage.getItem("todo"));
        out();
    }
    document.getElementById("add").onclick = function() {
        let d = document.getElementById("in").value;
        let temp = {};
        let i = todoList.length;
        temp.todo = d;
        temp.check = false;
        temp.i = i;
        todoList[i] = temp;
        
        console.log(todoList);
        out();
        localStorage.setItem("todo", JSON.stringify(todoList));
    };
    function out() {
        let out = "";
        for (let key in todoList) {
            if (todoList[key].check == true) {
                out += `<input type="checkbox" id ="inp${todoList[key].i}" checked>`;
            } else {
                out += `<input type="checkbox" id = "inp${todoList[key].i}">`;
            }
            out += todoList[key].todo + "<br>";
        }
        document.getElementById("out").innerHTML = out;
    }

    document.getElementById("out").onclick = function(e) {
        console.log(e.target.id);
        /* if (document.getElementById(e.target.id).value=="checkCC" && mass[e.target.id].check==false){
            mass[e.target.id].check=true; 
            document.getElementById(e.target.id).parentElement.style.textDecoration="line-through";
        }
        else if(document.getElementById(e.target.id).value=="checkCC" && mass[e.target.id].check==true){
            mass[e.target.id].check=false;
            document.getElementById(e.target.id).parentElement.style.textDecoration="none";
        }*/
    };
};
