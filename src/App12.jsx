import {useState,useEffect} from 'react'
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

  const addTodo=()=>{

    SetTodosList([...todosList,{id: crypto.randomUUID(),name:item,isChecked:false}])
    setItem('')

  }
  const toggleTodo=(id, isChecked)=>{
    SetTodosList(
      todosList.map(todo=>{
        if(todo.id==id){
          return { ...todo, isChecked }
        }
        return todo
      })
    )

  }
  const deleteTask=(id)=>{
    SetTodosList(todosList.filter(todo=>todo.id!=id))

  }
  return (
    <div>

      <div>
        <input type="text" value={item} onChange={(e) => setItem(e.target.value)}/>
        <button onClick={addTodo}>Add Item</button>
      </div>

      <div>
     {
      todosList.map((task)=>
       
          <div key={task.id}>
            <input type="checkbox"  checked={task.isChecked}
              onChange={e => toggleTodo(task.id, e.target.checked)}/>
           {
            task.isChecked? <span><del>{task.name}</del></span>:<span>{task.name}</span>
           }
           
           <button onClick={() => deleteTask(task.id)}>X</button>

          </div>
        

      )
     }


      </div>
    </div>
  );
}

export default App