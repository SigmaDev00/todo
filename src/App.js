import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import React from "react";
import collect from "collect.js";

const App = () => {
  const [msg, setMsg] = useState("");
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modifyText, setModifyText] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const data = collect(todos);
  const total = data.count();

  const [completedTodos, setCompletedTodos] = useState([]);

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleClick = () => {
    if (msg.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: msg }]);
      setMsg("");
    }
  };

  const handleModify = (id) => {
    setModalVisible(true);
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setModifyText(todo.text);
      setSelectedTodoId(id);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setModifyText("");
    setSelectedTodoId(null);
  };

  const handleModalSave = () => {
    if (selectedTodoId !== null) {
      handleModifyText(selectedTodoId, modifyText);
      handleModalClose();
    }
  };

  const handleModifyText = (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCheck = (id) => {
    const completedTodo = todos.find((todo) => todo.id === id);
    if (completedTodo) {
      setCompletedTodos([...completedTodos, completedTodo]);
      handleDelete(id);
    }
  };

  return (
    <>
      <div className="container">
        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-content">
                <input
                  type="text"
                  value={modifyText}
                  onChange={(e) => setModifyText(e.target.value)}
                />
                <button onClick={handleModalSave}>Save</button>
                <button onClick={handleModalClose}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        <div className="innerBox">
          <h2>Smatyx Todos App</h2>
          <div>
            <input style={{paddingLeft:'2%'}}
              type="text"
              value={msg}
              onChange={handleChange}
              placeholder="Add todos"
            />
            <button onClick={handleClick}>Add Todos</button>
          </div>
          <h3>Pending Tasks:</h3>
          {todos.length <= 0 ? <h4>No pending Tasks yet!</h4>:
          <div>
            {todos.map((todo) => (
              <div style={{backgroundColor:'white',margin:'1%',padding:'1%'}} className="todo" key={todo.id}>
                <div> {todo.text} </div>
                <div>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                  <button onClick={() => handleModify(todo.id)}>Modify</button>
                  <button onClick={() => handleCheck(todo.id)}>Check</button>
                </div>
              </div>
            ))}
          </div>
          }
            <h3>Completed Tasks:</h3>
            {completedTodos.length <= 0 ? <h4>No Completed Tasks yet!</h4>:
          <div >
            {completedTodos.map((completedTodo) => (
              <div style={{backgroundColor:'white',margin:'1%',padding:'1%',border:'1px solid gray',color:'rgb(94, 94, 94)'}} className="completed-todo" key={completedTodo.id}>
                {completedTodo.text}
              </div>
            ))}
          </div>
              }
        </div>
      </div>
    </>
  );
};

export default App;
