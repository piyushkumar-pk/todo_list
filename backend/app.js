const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

//app
const app = express();


//db
mongoose.connect(
    "mongodb://localhost:27017/todoList"
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>
        console.log("DB connected")
    ).catch(err => console.log("Database not connected" + err))

//middlewares   
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

////Routes
require("./routes/Todo.js")(app);


const port = 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})