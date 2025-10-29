import React from "react";
import styles from "../Todos/Todos.module.css"
import { Button } from "@/components/ui/button"

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
          <Button variant="destructive" onClick={startEdit}>
            Edit
          </Button>
          <Button variant="ghost" onClick={deleteTodo}>
            Delete
          </Button>
        </div>
      </div>

    </li>
  );
}
