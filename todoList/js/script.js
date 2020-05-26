import { LocalTodoStorage, Todo, RemoteTodoStorage } from "./modelTodo";

(function () {
    const storageTodo = new LocalTodoStorage();
    const remoteTodo = new RemoteTodoStorage();

    function renderTodo(todo) {
        let labelEl, liClass, checkTag;

        if (todo.isDone == true) {
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
       // remoteTodo.getRemoteList();
       console.log(remoteTodo.receivedList);
        renderList(remoteTodo.receivedList || storageTodo.getList());

        document.getElementById("add").onclick = function () {
            let title = document.getElementById("in").value;
            let todo = new Todo(storageTodo.generateNewId(), title, false);
            storageTodo.addTodo(todo);
            console.log(receivedList);
            renderList(remoteTodo.receivedList || storageTodo.getList());
        };
        document.getElementById("out").onclick = function (e) {
            console.log(e);
            let todoId = +e.target.dataset.todoId;
            let clickAction = e.target.dataset.clickAction;
            if (clickAction === "check") onclickTodoCheck(todoId);
            if (clickAction === "delete") onclickTodoDelete(todoId);
        };

        function loadTodos(onLoadDone, onError) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:3000/todos");

            xhr.onload = function () {
                //  получили ответ от бекенда, парсим
                let responseObj = JSON.parse(xhr.response || "[]");

                // и возвращаем вызовом колбека
                onLoadDone(responseObj);
                receivedList = responseObj;
                console.log(`полученный список ${receivedList}`)
            };

            xhr.onerror = function () {
                // что-то пошло не так, вызываем колбек ошибки
                onError();
            };

            xhr.send();
        }
        function getList() {
            loadTodos(
                function (todos) {
                    console.log("Получили список туду от бекенда :)");
                    console.log(todos);
                    
                },
                function () {
                    console.log("Что-то пошло не так при запросе к бекенду :(");
                }
            );

            console.log(
                "Запустили, и передали колбеки, ждем когда одна из них будет вызвана."
            );
        }

        document.getElementById("get").onclick = function () {
            console.log("Запускаем получаение списка с бекенда...");
            loadTodos(
                function (todos) {
                    console.log("Получили список туду от бекенда :)");
                    console.log(todos);
                    
                },
                function () {
                    console.log("Что-то пошло не так при запросе к бекенду :(");
                }
            );

            console.log(
                "Запустили, и передали колбеки, ждем когда одна из них будет вызвана."
            );
           

        };

        function loadTodoByID(id, onLoadDone, onError) {
            const xhr = new XMLHttpRequest();

            xhr.open("GET", `http://localhost:3000/todos/${id}`);

            xhr.onload = function () {
                //  получили ответ от бекенда, парсим
                let responseObj = JSON.parse(xhr.response || "[]");

                // и возвращаем вызовом колбека
                onLoadDone(responseObj);
            };

            xhr.onerror = function () {
                // что-то пошло не так, вызываем колбек ошибки
                onError();
            };

            xhr.send();
        }

        document.getElementById("byId").onclick = function () {
            let id = +document.getElementById("numId").value;
            console.log("Запускаем получаение todo по id с бекенда...");
            loadTodoByID(
                id,
                function (todo) {
                    console.log("Получили туду по id от бекенда :)");
                    console.log(todo);
                },
                function () {
                    console.log("Что-то пошло не так при запросе к бекенду :(");
                }
            );

            console.log(
                "Запустили, и передали колбеки, ждем когда одна из них будет вызвана."
            );
        };

        function refreshTodoByID(id, json, onLoadDone, onError) {
            const xhr = new XMLHttpRequest();

            xhr.open("PUT", `http://localhost:3000/todos/${id}`);
            xhr.setRequestHeader(
                "Content-type",
                "application/json; charset=utf-8"
            );

            xhr.onload = function () {
                //  получили ответ от бекенда, парсим
                let responseObj = JSON.parse(xhr.response || "[]");

                // и возвращаем вызовом колбека
                onLoadDone(responseObj);
            };

            xhr.onerror = function () {
                // что-то пошло не так, вызываем колбек ошибки
                onError();
            };

            xhr.send(json);
        }

        document.getElementById("refresh").onclick = function () {
            let id = +document.getElementById("numId").value;
            let title = document.getElementById("in").value;
            let json = JSON.stringify({
                title: title,
                isDone: false,
            });
            console.log("Запускаем обновление todo по id на бекенде...");
            refreshTodoByID(
                id,
                json,
                function (todo) {
                    console.log("Получили туду по id от бекенда :)");
                    console.log(todo);
                },
                function () {
                    console.log("Что-то пошло не так при запросе к бекенду :(");
                }
            );

            console.log(
                "Запустили, и передали колбеки, ждем когда одна из них будет вызвана."
            );
        };

        function deleteTodoByID(id, onLoadDone, onError) {
            const xhr = new XMLHttpRequest();

            xhr.open("DELETE", `http://localhost:3000/todos/${id}`);
            xhr.setRequestHeader(
                "Content-type",
                "application/json; charset=utf-8"
            );

            xhr.onload = function () {
                //  получили ответ от бекенда, парсим
                let responseObj = JSON.parse(xhr.response || "[]"); // ?

                // и возвращаем вызовом колбека
                onLoadDone(responseObj);
            };

            xhr.onerror = function () {
                // что-то пошло не так, вызываем колбек ошибки
                onError();
            };

            xhr.send();
        }

        document.getElementById("delete").onclick = function () {
            let id = +document.getElementById("numId").value;
            console.log("Запускаем удаление todo по id на бекенде...");
            deleteTodoByID(
                id,
                function (rspns) {
                    console.log(`Удаление туду по id на бекенде :) - ${rspns}`);
                    console.log(rspns);
                },
                function () {
                    console.log("Что-то пошло не так при запросе к бекенду :(");
                }
            );

            console.log(
                "Запустили, и передали колбеки, ждем когда одна из них будет вызвана."
            );
        };

        document.getElementById("post").onclick = function () {
            let xhr = new XMLHttpRequest();
            let title = document.getElementById("in").value;
            let json = JSON.stringify({
                title: title,
                isDone: false,
            });

            console.log(json);
            xhr.open("POST", "http://localhost:3000/todos/add");
            xhr.setRequestHeader(
                "Content-type",
                "application/json; charset=utf-8"
            );
            //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
            xhr.send(json);

            xhr.onerror = function () {
                console.log("error");
            };
        };
    };
})();
