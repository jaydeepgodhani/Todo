import {useRef, useState} from 'react'
import './App.css'

enum Priority {
  default = "default",
  high = "high",
  medium = "medium",
  low = "low"
}

interface TodoBox {
  done: boolean;
  name: string;
  priority: Priority;
}

// Add reordering

function App() {

  const textInput = useRef<HTMLInputElement>(null);
  const priorityInput = useRef<HTMLSelectElement>(null);
  const [todoList, setTodoList] = useState<TodoBox[]>([]);
  const [doneList, setDoneList] = useState<TodoBox[]>([]);

  const addItem = () => {
    if(textInput.current != null && priorityInput.current != null && textInput.current.value != "") {

      const inputValue: string = textInput.current.value;
      const inputPriority: string = priorityInput.current.value;

      if (todoList.findIndex(elem => elem.name === inputValue) < 0) {
        if (doneList.findIndex(elem => elem.name === inputValue) < 0) {
          const itemToAdd = {
            done: false,
            name: textInput.current.value,
            priority: inputPriority as Priority,
          }
          setTodoList([itemToAdd, ...todoList]);
          textInput.current.value = "";
        }
      }

    }
  }

  const checkItem = (item: TodoBox) => {
    item.done = true;
    setDoneList([item, ...doneList]);
    setTodoList(todoList.filter(elem => elem.name !== item.name ));
  }

  const uncheckItem = (item: TodoBox) => {
    item.done = false;
    setTodoList([item, ...todoList]);
    setDoneList(doneList.filter(elem => elem.name !== item.name ));
  }

  const deleteItem = (type: string, item: TodoBox) => {
    if(type === 'todo') {
      setTodoList(todoList.filter(elem => elem.name !== item.name ));
    } else {
      setDoneList(doneList.filter(elem => elem.name !== item.name ));
    }
  }

  return (
    <>
      <div>
        <input type={"text"} ref={textInput} />
        <select name={"prioritySelect"} ref={priorityInput} defaultValue={'default'}>
          <option value={"default"}>Default</option>
          <option value={"high"}>High</option>
          <option value={"medium"}>Medium</option>
          <option value={"low"}>Low</option>
        </select>
        <button onClick={addItem}>ADD</button>
      </div>

      {todoList && todoList.length > 0 &&
        <ul>
          {todoList.map((item, index) => <li key={index} style={{listStyleType: "none"}}>
            <input type={"checkbox"} onChange={() => checkItem(item)} checked={item.done}/>{item.name} / {item.priority}
            <input type={"checkbox"} onChange={() => deleteItem("todo", item)} checked={false}/></li>)}
        </ul>
      }

      {doneList && doneList.length > 0 &&
        <ul>
          {doneList.map((item, index) => <li key={index} style={{listStyleType: "none"}}>
            <input type={"checkbox"} checked={item.done} onChange={() => uncheckItem(item)}/>{item.name} / {item.priority}
            <input type={"checkbox"} onChange={() => deleteItem("done", item)} checked={false}/></li>)}
        </ul>
      }
    </>
  )
}

export default App
