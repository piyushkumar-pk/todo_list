import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API } from './config';
import axios from "axios";

function App() {
  const [todoData, setTodoData] = useState([]);
  const [todo, setTodo] = useState("");
  const [selectAll, setSelectAll] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchTodoData();
  }, []);

  function fetchTodoDataC() {
    axios.post(API + "view-todo-c")
      .then(res => {
        if (res.data.status === "success") {
          setTodoData(res.data.result)
          fetchTodoCount()
        } else {
          console.log(res.data.message);
        }
      }).catch(err => console.log(err));

  };

  function fetchTodoCount() {
    axios.post(API + "count-todo-c")
      .then(res => {
        if (res.data.status === "success") {
          setCount(res.data.count)
        } else {
          console.log(res.data.message);
        }
      }).catch(err => console.log(err));

  };
  function fetchTodoDataNc() {
    axios.post(API + "view-todo-nc")
      .then(res => {
        if (res.data.status === "success") {
          setTodoData(res.data.result)
          fetchTodoCount()

        } else {
          console.log(res.data.message);
        }
      }).catch(err => console.log(err));

  };
  function fetchTodoData() {
    axios.post(API + "view-todo")
      .then(res => {
        if (res.data.status === "success") {
          setTodoData(res.data.result)
          fetchTodoCount()

        } else {
          console.log(res.data.message);
        }
      }).catch(err => console.log(err));

  };

  function handleSubmit() {
    if (todo) {
      axios.post(API + "create-todo", {
        title: todo
      })
        .then(res => {
          if (res.data.status == "success") {
            setTodo("");
            fetchTodoData()
          } else {
            console.log(res)
          }
        }).catch(err => console.log(err));
    }
  }

  const deleteTodo = (id) => {
    axios.post(API + "delete-todo", {
      id: id
    })
      .then(res => {
        if (res.data.status === "success") {
          fetchTodoData()
        } else {
          console.log(res.data.message);
        }
      }).catch(err => console.log(err));
  };

  const handleCheck = (checked, id) => {
    axios.post(API + "update-todo", {
      id: id,
      completed: checked
    })
      .then(res => {
        if (res.data.status === "success") {
          fetchTodoData();
        } else {
          console.log(res.data.message);
        }
      }).catch(err => console.log(err));
  }

  const handleKeypress = e => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  };


  const deleteTodoC = (id) => {
    axios.post(API + "delete-todo-c")
      .then(res => {
        if (res.data.status === "success") {
          fetchTodoData()
        } else {
          console.log(res.data.message);
        }
      }).catch(err => console.log(err));
  };

  const handelSelectMany = () => {
    for (var i = 0; i < todoData.length; i++) {
      handleCheck(selectAll, todoData[i]._id);
    }
  }

  const form = () => (
    <section className="todoapp" style={{ marginTop: '40%' }}>
      <header className="headder">
        <div className="">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What need's to be done?" value={todo} onChange={(e) => setTodo(e.target.value)} onKeyPress={(e) => handleKeypress(e)} />
        </div>
      </header>
      <section className="main">
        <input id="toggle-all" className="toggle-all" value={selectAll} type="checkbox" onChange={(e) => {
          selectAll ? setSelectAll(false): setSelectAll(true)
        }} onClick={() => {
          handelSelectMany();
          console.log(selectAll)
        }}  checked={selectAll}/>
        <label htmlFor="toggle-all" >Mark all as complete</label>
        <ul className="todo-list">
          {
            todoData && todoData.map((t, i) => (
              <li className={t.completed ? "completed" : ""} key={i}>
                <div className="view" style={{ height: '50px' }}>
                  {
                    t.completed ?
                      <input className="checkbox-round col-lg-2 mt-2" style={{ marginLeft: '8px', backgroundColor: "green" }} type="checkbox" onClick={() => handleCheck(false, t._id)} />
                      : <input className="checkbox-round col-lg-2 mt-2" style={{ marginLeft: '8px', backgroundColor: "#fff" }} type="checkbox" onClick={() => handleCheck(true, t._id)} />
                  }
                  <label style={{
                    display: "inline"
                  }} >{t.title}</label>
                  <button className="destroy" onClick={() => deleteTodo(t._id)}></button>
                </div>
                <input className="edit" />
              </li>
            ))
          }
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{count}</strong>
          <span>item</span>
          <span>left</span>
        </span>
        <ul className="filters">
          <li>
            <a href="#" onClick={() => fetchTodoData()}>All</a>
          </li>
          <span></span>
          <li onClick={() => fetchTodoDataNc(false)}>
            <a href="#">Active</a>
          </li>
          <span></span>
          <li onClick={() => fetchTodoDataC()}>
            <a href="#" >Completed</a>
          </li>
          <span></span>
        </ul>
        <button className="clear-completed" onClick={() => deleteTodoC()}>Clear completed</button>
      </footer>
    </section>
  )

  return (
    <div className="container mt-5" >
      <div className="mt-5">
        {form()}

        {console.log(todo, "todo")}

      </div>
    </div>
  );
}

export default App;
