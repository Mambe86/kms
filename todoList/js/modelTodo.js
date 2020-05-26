export class Todo {
    constructor(id, title, check) {
        this.id = id;
        this.title = title;
        this.isDone = check;
    }
}

export class TodoStorage {
    generateNewId() {
        throw new Error("Нужно реализовать");
    }

    getList() {
        throw new Error("Нужно реализовать");
    }

    getTodoById(id) {
        throw new Error("Нужно реализовать");
    }

    deleteTodoById(id) {
        throw new Error("Нужно реализовать");
    }

    changeCheckTodoById(id, check) {
        throw new Error("Нужно реализовать");
    }

    saveTodo(todo) {
        throw new Error("Нужно реализовать");
    }
}

export class LocalTodoStorage extends TodoStorage {
    list = [];
    nextId;

    constructor() {
        super();
        this.nextId = parseInt(
            JSON.parse(localStorage.getItem("todoLastId") || "0"),
            10
        );
        let rawData = JSON.parse(localStorage.getItem("listTodo") || "[]");
        this.list = rawData.map((i) => {
            return new Todo(i.id, i.title, i.isDone);
        });
    }

    getList() {
        return this.list;
    }

    generateNewId() {
        this.nextId++;
        localStorage.setItem("todoLastId", JSON.stringify(this.nextId));
        return this.nextId;
    }

    getTodoById(id) {
        return this.list.find((t) => {
            return t.id === id;
        });
    }

    saveList() {
        localStorage.setItem("listTodo", JSON.stringify(this.list));
    }

    deleteTodoById(id) {
        let index = this.list.findIndex((t) => {
            return t.id === id;
        });

        this.list.splice(index, 1);
        this.saveList();
    }

    changeCheckTodoById(id, check) {
        let index = this.list.findIndex((t) => {
            return t.id === id;
        });
        this.list[index].isDone = check;
        this.saveList();
    }

    addTodo(todo) {
        this.list.push(todo);
        this.saveList();
    }
} //=================================================================

export class RemoteTodoStorage {
    receivedList = [];
    nextId;
    getRemoteList() {
        //получение листа
        console.log("getRemoteList() запушен...");
        const xhr = new XMLHttpRequest();
        let responseObj;
        xhr.open("GET", "http://localhost:3000/todos");

        xhr.onload = function () {
            //  получили ответ от бекенда, парсим
            responseObj = JSON.parse(xhr.response || "[]");

            // и возвращаем вызовом колбека

            console.log("Получили список туду от бекенда :)");
            console.log(responseObj);
            this.receivedList = responseObj;
        };

        xhr.onerror = function () {
            console.log("Что-то пошло не так при запросе к бекенду :(");
        };

        xhr.send();
        this.receivedList = responseObj;
    }

    loadTodoByID(id, onLoadDone, onError) {
        //получение туду по id
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

    refreshTodoByID(id, json, onLoadDone, onError) {
        //обновление тудушки по id
        const xhr = new XMLHttpRequest();

        xhr.open("PUT", `http://localhost:3000/todos/${id}`);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

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

    deleteTodoByID(id, onLoadDone, onError) {
        //удаление туду по id
        const xhr = new XMLHttpRequest();

        xhr.open("DELETE", `http://localhost:3000/todos/${id}`);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

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
    addNewTodo(json, onLoadDone, onError) {
        //добавление туду в лист
        let xhr = new XMLHttpRequest();
        let title = document.getElementById("in").value;

        console.log(json);
        xhr.open("POST", "http://localhost:3000/todos/add");
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.onload = function () {
            //  получили ответ от бекенда, парсим
            let responseObj = JSON.parse(xhr.response || "[]");
            // и возвращаем вызовом колбека
            onLoadDone(responseObj);
        };

        xhr.onerror = function () {
            onError();
        };

        xhr.send(json);
    }
}
