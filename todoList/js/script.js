import { LocalStorageTodo, Todo } from "./modelTodo";

(function () {
    const storageTodo = new LocalStorageTodo();

    function renderTodo(todo) {
        let labelEl, liClass, checkTag;

        if (todo.check == true) {
            liClass = 'class = "checked"';
            checkTag = "checked";
        } else {
            liClass = "";
            checkTag = "";
        }

        labelEl = `<li ${liClass}>
                    <input type="checkbox" ${checkTag} data-click-action="check" data-todo-id="${todo.id}" />
                    <span>${todo.title}</span>
                    <button class = "btnDel" data-click-action="delete" data-todo-id="${todo.id}">×</button>
                </li>`;

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
        outElement.innerHTML = `<ul class="todoList">${renderResult}</ul>`;
    }

    function onclickTodoCheck(todoId) {
        console.log(todoId);
        let todo = storageTodo.getTodoById(todoId);
        todo.check = !todo.check;
        storageTodo.changeCheckTodoById(todoId, todo.check);
        renderList(storageTodo.getList());
    }

    function onclickTodoDelete(todoId) {
        console.log(todoId);
        storageTodo.deleteTodoById(todoId);
        renderList(storageTodo.getList());
    }

    window.onload = function () {
        renderList(storageTodo.getList());

        document.getElementById("add").onclick = function () {
            let title = document.getElementById("in").value;
            let todo = new Todo(storageTodo.generateNewId(), title, false);
            storageTodo.addTodo(todo);
            renderList(storageTodo.getList());
        };
        document.getElementById("out").onclick = function (e) {
            console.log(e);
            let todoId = +e.target.dataset.todoId;
            let clickAction = e.target.dataset.clickAction;
            if (clickAction === "check") onclickTodoCheck(todoId);
            if (clickAction === "delete") onclickTodoDelete(todoId);
        };
    };
})();