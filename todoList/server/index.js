const express = require("express");
const app = express();
const port = 3000;


let nextId = 2;
class Database {
    /**
    * This is stored in an array for simplicity, but should be stored in a database
    */
    todos = [
        { id: 1, title: "Very first Todo", isDone: false }
    ];

    findAll() {
        return this.todos;
    }

    findById(id) {
        return this.todos.find(t => t.id === id);
    }

    remove(todo) {
        this.todos.splice(this.todos.findIndex(t => t.id === todo.id), 1);
    }

    add(todo) {
        const newTodo = {
            id: nextId++,
            title: todo.title,
            isDone: false
        };
    
        this.todos.push(newTodo);
    
        return newTodo;
    }

    update(todo, data) {
        if (data.title) {
            todo.title = data.title;
        }
    
        if (data.isDone) {
            todo.isDone = data.isDone;
        }    
    }
}

const database = new Database();

app.use(express.json());

/**
 * Returns all todos
 */
app.get('/todos', (req, res) => {
    res.json(ok(database.findAll()));
});

/**
 * Returns information about particular todo
 */
app.get('/todos/:todoId', (req, res) => {
    const id = parseInt(req.params.todoId, 10);
    if (isNaN(id)) {
        return res.json(error(`Invalid id '${id}'`));
    }

    const todo = database.findById(id);

    if (!todo) {
        return res.json(error(`Unable to find todo with id '${id}'`));
    }
 
    res.json(ok(todo));
});

/**
 * Update information
 */
app.put('/todos/:todoId', (req, res) => {
    const id = parseInt(req.params.todoId, 10);
    if (isNaN(id)) {
        return res.json(error(`Invalid id '${id}'`));
    }

    const newData = {};

    if (req.body.title) {
        if (typeof req.body.title !== "string") {
            return res.json(error("'title' should be of type string"));
        }
        newData.title = req.body.title;
    }

    if (req.body.isDone) {
        if (typeof req.body.isDone !== "boolean") {
            return res.json(error("'isDone' should be of type Boolean"));
        }
        newData.isDone = req.body.isDone;
    }

    const todo = database.findById(id);

    if (!todo) {
        return res.json(error(`Unable to find todo with id '${id}'`));
    }

    database.update(todo, newData);
 
    res.json(ok(todo));
});

/**
 * Removes a todo from the list
 */
app.delete('/todos/:todoId', (req, res) => {
    const id = parseInt(req.params.todoId, 10);
    if (isNaN(id)) {
        return res.json(error(`Invalid id '${id}'`));
    }

    const todo = database.findById(id);

    if (!todo) {
        return res.json(error(`Unable to find todo with id '${id}'`));
    }
 
    database.remove(todo);

    res.json(ok());
});

/**
 * Adds a new todo to the list
 */
app.post('/todos/add', (req, res) => {
    const newData = {};

    if (req.body.title) {
        if (typeof req.body.title !== "string") {
            return res.json(error("'title' should be of type string"));
        }
        newData.title = req.body.title;
    } else {
        return res.json(error("'title' can not be empty"));
    }

    if (req.body.isDone) {
        if (typeof req.body.isDone !== "boolean") {
            return res.json(error("'isDone' should be of type Boolean"));
        }
        newData.isDone = req.body.isDone;
    }

    const newTodo = database.add(newData);

    res.json(ok(newTodo));
});

function ok(data) {
    return {
        status: "OK",
        data: data
    }
}

function error(message) {
    return {
        status: "ERROR",
        message: message
    }
}

app.use(express.static('./'));

app.listen(port, () => console.log(`Example app listening on port ${port}!, try http://localhost:3000/`));
