import { setTodo, todos } from "../../App";
import { tempEditTodo } from "../Main";
import styles from "../Todos/Todos.module.css"

export default function Todo({id, title, description, complete}) {
    function deleteTodo() {
        const newTodos = todos.filter((todo) => {
            return todo.id != id;
        })

        setTodo(newTodos)
    }

    function findEdit() {
        const findEditElement = todos.find((todo) => {
            return todo.id == id
        })

        tempEditTodo(findEditElement)
    }
  return (
    <li className={styles.todoLi}>
        <h3 className={styles.todoTitle}>{title}</h3>
        <p className={styles.todoDescription}>{description}</p>
        <p className={styles.todoComplete}>{complete ? "✅" : "❌"}</p>
        <span className={styles.buttons}>
            <button onClick={deleteTodo} className={styles.deleteButton}>Delete</button>
            <button onClick={findEdit} className={styles.EditButton}>Edit</button>
        </span>
    </li>
  )
}
