const { createTodo, updateTodo, deleteTodo, viewTodo, viewTodoC, deleteTodoC, viewTodoNC, countTodo } = require("../controller/Todo");

module.exports = function (app) {
    app
        .post("/api/create-todo", createTodo)
        .post("/api/update-todo", updateTodo)
        .post("/api/delete-todo",  deleteTodo)
        .post("/api/view-todo", viewTodo)
        .post("/api/view-todo-nc", viewTodoNC)
        .post("/api/view-todo-c", viewTodoC)
        .post("/api/delete-todo-c", deleteTodoC)
        .post("/api/count-todo-c", countTodo)

};