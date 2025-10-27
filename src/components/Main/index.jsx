import React, { useEffect, useState } from "react";
import styles from "../Main/Main.module.css"

export default function Main({ todos, updateTodos, editItem, setEditItem }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || "");
      setDescription(editItem.description || "");
      setCompleted(Boolean(editItem.completed));
    } else {
      setTitle("");
      setDescription("");
      setCompleted(false);
    }
  }, [editItem]);

  function clearForm() {
    setTitle("");
    setDescription("");
    setCompleted(false);
    setEditItem(null);
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Iltimos title kiriting");

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: Boolean(completed),
    };

    updateTodos([newTodo, ...todos]);
    clearForm();
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    if (!editItem) return;

    const updated = todos.map((t) =>
      t.id === editItem.id
        ? { ...t, title: title.trim(), description: description.trim(), completed: Boolean(completed) }
        : t
    );

    updateTodos(updated);
    clearForm();
  }

  return (
    <div className={styles.mainSection}>
      <form className={styles.form} onSubmit={editItem ? handleSaveEdit : handleAdd}>
        <h2 className={styles.todoTitle}>{editItem ? "Todo tahrirlash" : "Yangi todo qo'shish"}</h2>

        <div>
          <label className={styles.desCont}>
            Title:
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className={styles.formName}
            />
          </label>
        </div>

        <div>
          <label className={styles.desCont}>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={4}
              className={styles.formDescription}
            />
          </label>
        </div>


        <div className={styles.footer}>
        <div>
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className={styles.compCheck}
            />{" "}
            Bajarilganmi?
          </label>
        </div>

          {editItem ? (
            <>
              <button type="submit" style={{ marginRight: 8 }}>
                Saqlash
              </button>
              <button type="button" onClick={clearForm}>
                Bekor qilish
              </button>
            </>
          ) : (
            <button className={styles.addButton} type="submit">Qo'shish</button>
          )}
        </div>
      </form>
    </div>
  );
}
