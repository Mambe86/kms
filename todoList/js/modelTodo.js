class Todo {
    constructor(id, title, check) {
        this.id = id;
        this.title = title;
        this.check = check;
    }
}

class StorageTodo {
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
    list = [];

    [
        {id: 4}, // 0
        {id: 5}  // 1
    ]

    nextId;
    constructor() {
        super();
        this.nextId = parseInt(
            JSON.parse(localStorage.getItem("todoLastId") || "0"),
            10
        );
        let rawData = JSON.parse(localStorage.getItem("listTodo") || "[]");
        this.list = rawData.map(i => new Todo(i.id, i.title, i.check));
    }
    // шас микрофон найду. погоди
    getListTodo() {
        return this.list;
    }
    
    generateNewId() {
        this.nextId++;
        localStorage.setItem("todoLastId", JSON.stringify(this.nextId));
        return this.nextId;
    }
    getTodoById(id) {
        return this.getListTodo()[id];
    }
    saveList() {
        localStorage.setItem("listTodo", JSON.stringify(this.list));
    }
    deleteTodoById(id) {
      /*  [{id: 4}, {id:5}, {id: 6}].findIndex(t => {
            return t.id === 6;
            })*/
        this.list.splice(id, 1);
        this.saveList();
    }
    changeCheckTodoById(id, check) {
        this.list[id].check = check;
        this.saveList();
    }
    addTodo(todo) {
        this.list.push(todo);
       // this.list[todo.id] = todo;
        this.saveList();
    }
}
