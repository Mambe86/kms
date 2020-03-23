class Todo{
    constructor(id,title,check){
        this.id = id;
        this.title = title;
        this.check = check;
    }
    

}

class StorageTodo {
    getLastId () {
        throw new Error("Нужно реализовать");
    }
    generateNewId () {
        throw new Error("Нужно реализовать");
    }
    getListTodo () {
        throw new Error("Нужно реализовать");
    }
    getTodoById (id) {
        throw new Error("Нужно реализовать");
    }
    deleteTodoById(id) {
        throw new Error("Нужно реализовать");
    }
    changeCheckTodoById (id, check){
        throw new Error("Нужно реализовать");
    }
    saveTodo (todo) {
        throw new Error("Нужно реализовать");
    }
}
class LocalStorageTodo extends StorageTodo {
    getLastId () {
        let lastId = JSON.parse(localStorage.getItem("todoLastId"));
        if (lastId == null) lastId=0;
        return parseInt(lastId,10);
    }
    generateNewId () {
        let newId = this.getLastId() +1;
        localStorage.setItem("todoLastId", JSON.stringify(newId));
        return newId;
    }
    getListTodo () {
        let listTodo = JSON.parse(localStorage.getItem("listTodo"));
        if (listTodo == null) listTodo = {};
        return listTodo;
    }
    getTodoById (id) {
       return this.getListTodo()[id];
    }
    deleteTodoById(id) {
        let listTodo = this.getListTodo();
        listTodo.splice(id,1);
        localStorage.setItem("listTodo", JSON.stringify(listTodo));

    }
    changeCheckTodoById (id, check){
        let listTodo = this.getListTodo();
        listTodo[id].check = check;
        localStorage.setItem("listTodo", JSON.stringify(listTodo));
    }
    addTodo (todo) {
        let listTodo = this.getListTodo();
        listTodo[todo.id] = todo;
        localStorage.setItem("listTodo", JSON.stringify(listTodo));
    }
}
