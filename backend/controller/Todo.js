const Todo = require("../model/todo");

exports.createTodo = (req, res) => {
    var todoData = new Todo({
        title: req.body.title,
    });

    todoData.save(function (err, response) {
        if (err) {
            res.status(200).send({
                status: "error",
                message: err,
            });
        } else {
            res.status(200).send({
                status: "success",
                message: "Task added to the todo list",
            });
        }
    });
}

exports.viewTodo = (req, res) => {
  
    Todo.find()
        .sort("createdAt")
        .then((response) => {
            res.status(200).send({
                status: "success",
                result: response,
            });
        })
        .catch((error) => {
            res.status(200).send({
                status: "error",
                message: error,
            });
        });
}

exports.viewTodoC = (req, res) => {
    var where = {};

    where["completed"] = true
    Todo.find(where)
        .sort("createdAt")
        .then((response) => {
            res.status(200).send({
                status: "success",
                result: response,
            });
        })
        .catch((error) => {
            res.status(200).send({
                status: "error",
                message: error,
            });
        });
}
exports.viewTodoNC = (req, res) => {
    var where = {};

    where["completed"] = false

    Todo.find(where)
        .sort("createdAt")
        .then((response) => {
            res.status(200).send({
                status: "success",
                result: response,
            });
        })
        .catch((error) => {
            res.status(200).send({
                status: "error",
                message: error,
            });
        });
}

exports.updateTodo = (req, res) => {
    var where = {};
    if (req.body.id) {
        where['_id'] = req.body.id;

        Todo.findByIdAndUpdate(
            where,
            {
                completed: req.body.completed 
            },
            { new: true, useFindAndModify: false },
            (err, todo) => {
                if (err) {
                    return res.status(200).send({
                        status: "error",
                        message: err,
                    });
                }

                res.status(200).send({
                    status: "success",
                    message: "Todo list updated.",
                });
            })
    }
}


exports.deleteTodo = (req, res) => {
    var where = {};
    if (req.body.id) {
        where['_id'] = req.body.id;

        Todo.findByIdAndDelete(
            where,
            (err, todo) => {
                if (err) {
                    return res.status(200).send({
                        status: "error",
                        message: err,
                    });
                }

                res.status(200).send({
                    status: "success",
                    message: "task deleted.",
                });
            })
    }
}

exports.deleteTodoC = (req, res) => {
    var where = {};

        where['completed'] = true;
        Todo.deleteMany(
            where,
            (err, todo) => {
                if (err) {
                    return res.status(200).send({
                        status: "error",
                        message: err,
                    });
                }

                res.status(200).send({
                    status: "success",
                    message: "task deleted.",
                });
            })
  
}



exports.countTodo = async (req, res) => {
    var where = {};
    where["completed"] = false;

    const count = await Todo.find(where).countDocuments();
    res.status(200).send({
        status: "success",
        message: "todo counted",
        count: count
    });
};