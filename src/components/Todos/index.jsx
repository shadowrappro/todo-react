import React from "react";
import styles from "../Todos/Todos.module.css"

export default function Todo({ id, title, description, completed, todos, updateTodos, setEditItem }) {
  function deleteTodo() {
    const filtered = todos.filter((t) => t.id !== id);
    updateTodos(filtered);
  }

  function startEdit() {
    setEditItem({ id, title, description, completed });
  }

  function toggleComplete() {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    updateTodos(updated);
  }

  return (
    <li className={styles.todoLi}>
      <div className={styles.todoDiv}>
        <h3 className={styles.todoTitle}>{title}</h3>
        
        {description && <p className={styles.description}>{description}</p>}
        
        <button className={styles.complete} onClick={toggleComplete}>
          {completed ? "✅" : "❌"}
        </button>
        
        <div className={styles.buttons}>
          <button className={styles.EditButton} onClick={startEdit} style={{ marginRight: 8 }}>
            Edit
          </button>
          <button onClick={deleteTodo} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>

    </li>
  );
}
