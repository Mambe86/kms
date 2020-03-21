window.onload = function() {
    todoList = [];
    if (localStorage.getItem("todo") != undefined) {
        todoList = JSON.parse(localStorage.getItem("todo"));
        out();
    }
    document.getElementById("add").onclick = function() {
        let title = document.getElementById("in").value;
       let id =todoList.length;
              
        todoList[id] = new Todo(id, title, false);
        
        console.log(todoList);
        out();
        localStorage.setItem("todo", JSON.stringify(todoList));
    };

///При добавлении нового туду зачеркивание пропадает на старых туду


    function out() {
        let out = "";
        for (let key in todoList) {
            out += `<label>`;
           let checked = "";
            if (todoList[key].check == true) {
                checked = "checked";
            }
            out += `<input type="checkbox" id ="${todoList[key].id}" ${checked}>`;            
            out += todoList[key].title;
            out += `</label>`;
            out += `<br>`;
       
        }

        document.getElementById("out").innerHTML = out;
    }

    document.getElementById("out").onclick = function(e) {
        console.log(e.target.id);
         if ((document.getElementById(e.target.id).type == "checkbox")&&(document.getElementById(e.target.id).checked)){
            todoList[e.target.id].check=true; 
            document.getElementById(e.target.id).parentElement.style.textDecoration="line-through";
        }
        else if (document.getElementById(e.target.id).type == "checkbox") {
            todoList[e.target.id].check=false;
            document.getElementById(e.target.id).parentElement.style.textDecoration="none";
        }
    };
};
