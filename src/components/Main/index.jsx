import React, { useEffect, useState } from "react";
import styles from "../Main/Main.module.css";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Main({ todos, updateTodos, editItem, setEditItem }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || "");
      setDescription(editItem.description || "");
      setCompleted(Boolean(editItem.completed));
      setOpen(true);
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
    setOpen(false);
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Iltimos, title kiriting");

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="openDialog" variant="outline" onClick={() => setOpen(true)}>
            +
          </Button>
        </DialogTrigger>

        <DialogContent className="dialogCSS">
          <DialogHeader>
            <h2 className={styles.todoTitle}>
              {editItem ? "Todo tahrirlash" : "Yangi todo qo'shish"}
            </h2>
          </DialogHeader>

          <form className={styles.form} onSubmit={editItem ? handleSaveEdit : handleAdd}>
            <div>
              <label className={styles.desCont}>
                Title:
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-[400px]"
                />
              </label>
            </div>

            <div>
              <label className={styles.desCont}>
                Description:
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  rows={4}
                  className="w-[400px]"
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

              <DialogFooter>
                {editItem ? (
                  <>
                    <Button type="submit">Saqlash</Button>
                    <DialogClose asChild>
                      <Button type="button" variant="outline" onClick={clearForm}>
                        Bekor qilish
                      </Button>
                    </DialogClose>
                  </>
                ) : (
                  <Button type="submit">Qo'shish</Button>
                )}
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}