
import { useState,useEffect } from 'react';
function App() {
  const [item, setItem] = useState('')

  const [todosList, SetTodosList] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

   useEffect(() => {
      localStorage.setItem("ITEMS", JSON.stringify(todosList))
    }, [todosList])

  const addTodo = () => {
    SetTodosList([...todosList, { id: crypto.randomUUID(), name: item, isPacked: false }])
    setItem('')
    console.log(todosList)
  }

  const deleteTask = (id) => {
    SetTodosList(todosList.filter(todo => todo.id !== id))
    console.log(todosList)
  }

  function toggleTodo(id, isPacked) {
    SetTodosList(
      todosList.map(todo => {
        if (todo.id === id) {
          return { ...todo, isPacked }
        }

        return todo

      })
    )
    console.log(todosList)
  }
  return (
    <div className='App'>
      <div className="addtodo">
        <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
        <button className='' onClick={addTodo}>Add Task</button>
      </div>
      <div>
        {todosList.map((task) =>
          <div key={task.id}>
            <input type="checkbox" checked={task.isPacked}
              onChange={e => toggleTodo(task.id, e.target.checked)} />
              {task.isPacked ? <span><del> {task.name}</del> </span> : <span>{task.name}</span>}
              <button onClick={() => deleteTask(task.id)}>X</button>
          </div>
        )}
      </div>
    </div>
  )
}
export default App