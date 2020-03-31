function renderTodo(todo, labelEl) {
    labelEl.innerHTML = "";
    labelEl.dataset.todoId = todo.id;
    let checkboxEl = document.createElement("input");
    checkboxEl.setAttribute("type", "checkbox");
    checkboxEl.setAttribute("id", todo.id);
    if (todo.check == true) {
        checkboxEl.setAttribute("checked", "");
        labelEl.style.textDecoration = "line-through";
    } else {
        labelEl.style.textDecoration = "none";
    }

    checkboxEl.onclick = onclickTodoCheck;
    labelEl.append(checkboxEl);


    labelEl.append(todo.title);

    let buttonEl = document.createElement("button");
    buttonEl.dataset.todoId = todo.id;
    buttonEl.innerHTML = "delete";
    buttonEl.onclick = onclickTodoDelete;
    labelEl.append(buttonEl)
}

function renderList(todoList) {
    let outElement = document.getElementById("out");
    outElement.innerHTML = "";
    for (let key in todoList) {
        let todo = todoList[key];
        let labelEl = document.createElement("labal");

        renderTodo(todo, labelEl);

        outElement.append(labelEl);
        outElement.append(document.createElement("br"));

    }
}


function onclickTodoCheck(e) {
    //  let todoList = storageTodo.getListTodo();
    storageTodo = getStorageTodo();
    let todoId = e.target.id;
    console.log(todoId);

    let todo = storageTodo.getTodoById(todoId);
    let labelElement = document.getElementById(todoId).parentElement;
    todo.check = !todo.check;
    renderTodo(todo, labelElement);

    storageTodo.changeCheckTodoById(todoId, todo.check);
}

function onclickTodoDelete(e) {
    //  let todoList = storageTodo.getListTodo();
    storageTodo = getStorageTodo();
    let todoId = e.target.dataset.todoId;
    console.log(todoId);

    storageTodo.deleteTodoById(todoId);
    renderList(storageTodo.list);

}

window.onload = function () {
    storageTodo = getStorageTodo();

    //let todoList = storageTodo.getListTodo();
    renderList(storageTodo.getListTodo());

    document.getElementById("add").onclick = function () {
        let title = document.getElementById("in").value;
        let todo = new Todo(storageTodo.generateNewId(), title, false);
        storageTodo.addTodo(todo);
        console.log(storageTodo);
        console.log(storageTodo.getListTodo());
        renderList(storageTodo.getListTodo());
    };


    ///При добавлении нового туду зачеркивание пропадает на старых туду
    // document.getElementById("out").onclick = onclickTodoCheck;
};
