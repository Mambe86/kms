function render(todoList) {
    let out = "";
    for (let key in todoList) {
        out += `<label>`;
        let checked = "";
        if (todoList[key].check == true) {
            checked = "checked";
        }
        out += `<input type="checkbox" id ="${todoList[key].id}" ${checked}> `;
        out += todoList[key].title;
        out += `</label>`;
        out += `<br>`;
    }

    document.getElementById("out").innerHTML = out;
}


window.onload = function() {
    let storageTodo = new LocalStorageTodo();
    //let todoList = storageTodo.getListTodo();
    render(storageTodo.getListTodo());

    document.getElementById("add").onclick = function() {
        let title = document.getElementById("in").value;
        let todo = new Todo(storageTodo.generateNewId(), title, false);
        storageTodo.addTodo(todo);
console.log(storageTodo);
        console.log(storageTodo.getListTodo());
        render(storageTodo.getListTodo());
    };

    ///При добавлении нового туду зачеркивание пропадает на старых туду

    

    document.getElementById("out").onclick = function(e) {
      //  let todoList = storageTodo.getListTodo();
        console.log(e.target.id);

        if (document.getElementById(e.target.id).type == "checkbox") {
            let isCheck = document.getElementById(e.target.id).checked;

            if (isCheck) {
                document.getElementById(
                    e.target.id
                ).parentElement.style.textDecoration = "line-through";
            } else {
                document.getElementById(
                    e.target.id
                ).parentElement.style.textDecoration = "none";
            }
            storageTodo.changeCheckTodoById(e.target.id, isCheck);
        }
    };
};
