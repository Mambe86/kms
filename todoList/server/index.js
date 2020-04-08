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
        }
    
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
    res.json(database.findAll());
});

/**
 * Returns information about particular todo
 */
app.get('/todos/:todoId', (req, res) => {
    const id = parseInt(req.params.todoId, 10);

    const todo = database.findById(id);

    if (!todo) {
        return res.status(404).send("Sorry can't find that!")
    }
 
    res.json(todo);
});

/**
 * Update information
 */
app.put('/todos/:todoId', (req, res) => {
    const id = parseInt(req.params.todoId, 10);

    const newData = {};

    if (req.body.title) {
        if (typeof req.body.title !== "string") {
            return res.status(400).send("'title' should be of type string");
        }
        newData.title = req.body.title;
    }

    if (req.body.isDone) {
        if (typeof req.body.isDone !== "boolean") {
            return res.status(400).send("'isDone' should be of type Boolean");
        }
        newData.isDone = req.body.isDone;
    }

    const todo = database.findById(id);

    if (!todo) {
        return res.status(404).send("Sorry can't find that!")
    }

    database.update(todo, newData);
 
    res.json(todo);
});

/**
 * Removes a todo from the list
 */
app.delete('/todos/:todoId', (req, res) => {
    const id = parseInt(req.params.todoId, 10);

    const todo = database.findById(id);

    if (!todo) {
        return res.status(404).send("Sorry can't find that!");
    }
 
    database.remove(todo);

    res.json("OK");
});

/**
 * Adds a new todo to the list
 */
app.post('/todos/add', (req, res) => {
    const newData = {};

    if (req.body.title) {
        if (typeof req.body.title !== "string") {
            return res.status(400).send("'title' should be of type string");
        }
        newData.title = req.body.title;
    } else {
        return res.status(400).send("'title' can not be empty");
    }

    if (req.body.isDone) {
        if (typeof req.body.isDone !== "boolean") {
            return res.status(400).send("'isDone' should be of type Boolean");
        }
        newData.isDone = req.body.isDone;
    }

    const newTodo = database.add(newData);

    res.json(newTodo);
});

app.use(express.static('./'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
