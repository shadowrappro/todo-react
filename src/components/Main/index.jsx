import React, { useState } from 'react'
import styles from "../Main/Main.module.css"
import { getTodo, setTodo, todos } from '../../App';

let elEdID = null;

export function tempEditTodo(editedElement) {
  localStorage.setItem("editedElement", JSON.stringify(editedElement))
}

export default function Main() {

  function addTodo(newTodo) {
      let maxID = 0;

      todos.forEach((todo) => {
        if (todo.id > maxID) {
          maxID = todo.id;
        }
      })

      newTodo.id = maxID + 1;

      const result = [newTodo, ...todos]
      

      setTodo(result);
  }

  function editTodo(editedTodo) {
    editedTodo.id = elEdID   
    const result = todos.map((todo) => {
        if (todo.id == editedTodo.id) {
            return editedTodo
        } else {
            return todo
        }
    })
    setTodo(result)
  }

  const [title, setName] = useState("")
  const [description, setDescription] = useState("")
  const [completed, setCompleted] = useState(false)

  function editedTodoo() {
    let temp = localStorage.getItem("editedElement")
    let edTo = JSON.parse(temp)
    elEdID = edTo.id;
    

    setName(edTo.title)
    setDescription(edTo.description)
    setCompleted(edTo.complete)
  }

  function editYigish(e) {
    e.preventDefault()
    let editData = {
      title,
      description,
      completed,
    }

    editTodo(editData);
  }

  if (localStorage.getItem("editedElement")) {
    
    editedTodoo()
    localStorage.removeItem("editedElement")
  }

  function handleSubmit(e) {
    e.preventDefault()

    const data = {
      title,
      description,
      completed,
    }

    addTodo(data)
  }

  
  getTodo()
  return (
    <div className={styles.mainSection}>
      <form className={styles.form} id='form' onSubmit={handleSubmit}>
        <h1>Todo title</h1>

        <input
          className={styles.formName}
          type="text"
          placeholder="Ismingizni kiriting"
          value={title}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <p>To-Do uchun izoh yozing:</p>
        <textarea
          className={styles.formDescription}
          rows="5"
          placeholder="Xabaringizni yozing"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <div className={styles.footer}>
          <label
            className={styles.compCheck}
          >
            <input
              className={styles.compCheck}
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Bajarilganmi?
          </label>


          <button onClick={editYigish} className={styles.submitButton} type="submit">Tahrirlash</button>
          <button className={styles.submitButton} type="submit">Qo'shish</button>
        </div>
      </form>
    </div>
  )
}