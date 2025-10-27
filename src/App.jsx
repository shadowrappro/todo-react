import React from 'react'
import Header from "../src/components/Header"
import Main from "../src/components/Main"
import Todo from './components/Todos';

export let todos = null;

export function getTodo() {
  todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
  App()
}

export function setTodo(newTodo) {
  todos = newTodo;
  localStorage.setItem("todos", JSON.stringify(todos))
  App()
}

getTodo()



export default function App() {
  
  return (
    <div className='container'>
      <Header/>
      <Main/>
      <ul className='todoContainer'>
        {todos.map(({title, description, complete, id}) => {
          return <Todo key={id} id={id} title={title} description={description} complete={complete}/>
        })}
      </ul>
    </div>
  )
}