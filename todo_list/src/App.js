import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [isEdit, toggleEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = document.getElementById("todoAdd").value;

    if (value != "") {
      setTodos((prev) => [
        ...prev,
        {
          id: new Date().getTime(),
          text: value.trim(),
          completed: false,
        },
      ]);
      document.getElementById("todoAdd").value = "";
    } else alert("Enter valid todo!");
  };

  const togglecomplete = (id) => {
    let updatedTodo = [...todos].map((val) => {
      if (id === val.id) {
        val.completed = !val.completed;
      }
      return val;
    });
    setTodos(updatedTodo);
  };

  const submitEdits = (todo) => {
    let editedTodo = [...todos].map((val) => {
      if (todo.id === val.id) {
        val.text = document.getElementById(todo.id).value;
      }
      return val;
    });
    setTodos(editedTodo);
    toggleEdit(false);
  };

  const deleteTodo = (id)=>{
    let filteredTodo =[...todos].filter(val=> val.id != id)
    setTodos(filteredTodo)
  }

  console.log(todos);
  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" align="right" id="todoAdd" />
        <button type="submit">Add Todo</button>
      </form>

      {todos.map(({ id, text, completed }) => {
        return (
          <div className="todo" key={id}>
            <div className="todo-text">
              <input
                type="checkbox"
                id="completed"
                checked={completed}
                onChange={() => togglecomplete(id)}
              />
              {isEdit ? (
                <input type="text" id={id} defaultValue={text} />
              ) : (
                <div>{text}</div>
              )}
            </div>
            <div className="todo-actions">
              {id === isEdit ? (
                <button onClick={() => submitEdits({ id, text, completed })}>
                  Submit Edits
                </button>
              ) : (
                <button onClick={() => toggleEdit(id)}>Edit</button>
              )}
              <button onClick={() => deleteTodo(id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default App;
