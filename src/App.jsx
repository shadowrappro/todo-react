import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import Todo from "./components/Todos";
import Header from "./components/Header";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(data);
  }, []);

  function updateTodos(newList) {
    setTodos(newList);
    localStorage.setItem("todos", JSON.stringify(newList));
  }

  return (
    <div className="container">
      <Header/>
      <Main
        todos={todos}
        updateTodos={updateTodos}
        editItem={editItem}
        setEditItem={setEditItem}
      />

      <ul className="todoContainer" style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            todos={todos}
            updateTodos={updateTodos}
            setEditItem={setEditItem}
          />
        ))}
      </ul>
    </div>
  );
}