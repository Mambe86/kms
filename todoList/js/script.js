(function() {
    storageTodo = getStorageTodo();

    function renderTodo(todo) {
        let labelEl, labelElStyle;
        /*labelEl.innerHTML = "";
    labelEl.dataset.todoId = todo.id;

    let checkboxEl = document.createElement("input");
    checkboxEl.setAttribute("type", "checkbox");
    checkboxEl.setAttribute("id", todo.id);*/

        if (todo.check == true) {
           // checkboxEl.setAttribute("checked", "");
            labelElStyle = "line-through";
        } else {
            labelElStyle = "none";
        }
        /*checkboxEl.onclick = onclickTodoCheck;
    labelEl.append(checkboxEl);
    labelEl.append(todo.title);

    let buttonEl = document.createElement("button");
    buttonEl.dataset.todoId = todo.id;
    buttonEl.innerHTML = "x";
    buttonEl.onclick = onclickTodoDelete;
    labelEl.append(buttonEl);
    labelEl.append(document.createElement("br"));*/
        labelEl = `<label data-todo-id="${todo.id}" style="text-decoration: ${labelElStyle};"><input type="checkbox" data-todo-id="${todo.id}">${todo.title}<button data-todo-id="${todo.id}">x</button><br></label>`;
       // console.log(labelEl);
        return labelEl;
    }

    function renderList(todoList) {
        const outElement = document.getElementById("out");
        outElement.innerHTML = "";
        let renderResult = "";
        for (let key in todoList) {
            let todo = todoList[key];
            renderResult += renderTodo(todo);

            
            
        }
        outElement.innerHTML = renderResult;
    }

    function onclickTodoCheck(e) {
        let todoId =+e.target.dataset.todoId;
        console.log(this);
        let todo = storageTodo.getTodoById(todoId);
        let labelElement = document.getElementById(todoId).parentElement;
        todo.check = !todo.check;
        renderList(storageTodo.getList());
        storageTodo.changeCheckTodoById(todoId, todo.check);
    }

    function onclickTodoDelete(e) {
        let todoId = +e.target.dataset.todoId;
        console.log(todoId);
        storageTodo.deleteTodoById(todoId);
        renderList(storageTodo.getList());
    }

    window.onload = function() {
        renderList(storageTodo.getList());

        document.getElementById("add").onclick = function() {
            let title = document.getElementById("in").value;
            let todo = new Todo(storageTodo.generateNewId(), title, false);
            storageTodo.addTodo(todo);
            renderList(storageTodo.getList());
        };
        document.getElementById("out").onclick = function(e) {
            console.log(e);
            let todoId = +e.target.dataset.todoId;
            if (e.target.type === "checkbox") onclickTodoCheck(e);
            if (e.target.tagName === "BUTTON") onclickTodoDelete(e);
        }
    };
})();
