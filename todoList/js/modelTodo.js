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
}