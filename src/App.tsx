import {useRef, useState} from 'react'
import './App.css'
import {Checkbox} from "@nextui-org/checkbox"
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import { ImCross } from "react-icons/im";


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

const selectOptions = [
  {key: "default", label: "Default"},
  {key: "high", label: "High"},
  {key: "medium", label: "Medium"},
  {key: "low", label: "Low"},
];

const liStyle = 'py-2 flex w-full flex-row justify-between hover:bg-gray-100 hover:rounded-md';

// Add reordering

function App() {

  const selectedInput = useRef<HTMLInputElement>(null);
  const selectedPriority = useRef<HTMLSelectElement>(null);
  const [todoList, setTodoList] = useState<TodoBox[]>([]);
  const [doneList, setDoneList] = useState<TodoBox[]>([]);

  const addItem = (): void => {
    if (selectedInput.current != null && selectedPriority.current != null && selectedInput.current.value != "") {

      const inputValue: string = selectedInput.current.value;
      const inputPriority: string = selectedPriority.current.value;

      if (todoList.findIndex(elem => elem.name === inputValue) < 0 &&
          doneList.findIndex(elem => elem.name === inputValue) < 0) {
        const itemToAdd = {
          done: false,
          name: selectedInput.current.value,
          priority: inputPriority as Priority,
        }
        setTodoList([itemToAdd, ...todoList]);
        selectedInput.current.value = "";
      }

    }
  }

  const checkItem = (item: TodoBox): void => {
    item.done = true;
    setDoneList([item, ...doneList]);
    setTodoList(todoList.filter(elem => elem.name !== item.name));
  }

  const uncheckItem = (item: TodoBox): void => {
    item.done = false;
    setTodoList([item, ...todoList]);
    setDoneList(doneList.filter(elem => elem.name !== item.name));
  }

  const deleteItem = (type: string, item: TodoBox): void => {
    if (type === 'todo') {
      setTodoList(todoList.filter(elem => elem.name !== item.name));
    } else {
      setDoneList(doneList.filter(elem => elem.name !== item.name));
    }
  }

  const inputClicked = () => {
    if (selectedInput.current != null) {
      selectedInput.current.value = "";
    }
  }

  return (
      <div className='w-full flex flex-col items-center justify-center'>
        <div className='w-1/3 mt-8'>
          <div className='flex'>
            <Input ref={selectedInput} aria-label={'add todo item'} variant={'bordered'} onClick={inputClicked}/>
            <Select className="max-w-xs px-4" ref={selectedPriority} defaultSelectedKeys={["default"]} aria-label={'select priority'}>
              {selectOptions.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Button color="primary" onClick={addItem} className='px-4'>ADD</Button>
          </div>

          <div className='mt-8'>
            {todoList && todoList.length > 0 &&
                <div>
                  <h1>{'ToDo'}</h1>
                  <ul className='mt-4'>
                    {todoList.map((item, index) => <li key={index} style={{listStyleType: "none"}} className={liStyle}>
                      <Checkbox isSelected={item.done}
                                onChange={() => checkItem(item)}>{item.name} / {item.priority} </Checkbox>
                      <ImCross onClick={() => deleteItem("todo", item)} className='cursor-pointer m-1.5 mx-4'/>
                    </li>)}
                  </ul>
                </div>
            }
          </div>

          <div className='mt-8'>
            {doneList && doneList.length > 0 &&
                <div>
                  <h1>{'Done'}</h1>
                  <ul className='mt-4'>
                    {doneList.map((item, index) => <li key={index} style={{listStyleType: "none"}} className={liStyle}>
                      <Checkbox isSelected={item.done}
                                onChange={() => uncheckItem(item)}>{item.name} / {item.priority} </Checkbox>
                      <ImCross onClick={() => deleteItem("done", item)} className='cursor-pointer m-1.5'/>
                    </li>)}
                  </ul>
                </div>
            }
          </div>
        </div>
      </div>
  )
}

export default App
