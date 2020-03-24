class Todo {
    constructor(id, title, check) {
        this.id = id;
        this.title = title;
        this.check = check;
    }
}

class StorageTodo {
    getLastId() {
        throw new Error("Нужно реализовать");
    }
    generateNewId() {
        throw new Error("Нужно реализовать");
    }
    getListTodo() {
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
class LocalStorageTodo extends StorageTodo {
    list = {};
    getLastId() {
        let lastId = JSON.parse(localStorage.getItem("todoLastId"));
        if (lastId == null) lastId = 0;
        return parseInt(lastId, 10);
    }
    generateNewId() {
        let newId = this.getLastId() + 1;
        localStorage.setItem("todoLastId", JSON.stringify(newId));
        return newId;
    }
    getListTodo() {
        this.list = JSON.parse(localStorage.getItem("listTodo"));
        if (this.list == null) this.list = {};
        return this.list;
    }
    getTodoById(id) {
        return this.getListTodo()[id];
    }
    saveList() {
        localStorage.setItem("listTodo", JSON.stringify(this.list));
    }
    deleteTodoById(id) {
        this.list.splice(id, 1);
        this.saveList();
    }
    changeCheckTodoById(id, check) {
        this.list[id].check = check;
        this.saveList();
    }
    addTodo(todo) {
        this.list[todo.id] = todo;
        this.saveList();
    }
}
