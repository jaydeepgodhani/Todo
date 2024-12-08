import {useRef, useState} from 'react'
import './App.css'
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import {Priority, TodoBox} from "./interfaces.ts";
import List from "./List.tsx";

const selectOptions = [
  {key: "high", label: "High"},
  {key: "medium", label: "Medium"},
  {key: "low", label: "Low"},
];

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
        setTodoList([...todoList, itemToAdd]);
        selectedInput.current.value = "";
      }
    }
  }

  const checkOrUncheckItem = (item: TodoBox, type: string): void => {
    if (type === 'todo') {
      item.done = false;
      setTodoList([...todoList, item]);
      setDoneList(doneList.filter(elem => elem.name !== item.name));
    } else {
      item.done = true;
      setDoneList([...doneList, item]);
      setTodoList(todoList.filter(elem => elem.name !== item.name));
    }
  }

  const deleteItem = (item: TodoBox, type: string): void => {
    if (type === 'done') {
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
            <Select className="max-w-xs px-4" ref={selectedPriority} defaultSelectedKeys={["medium"]}
                    aria-label={'select priority'}>
              {selectOptions.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Button color="primary" onClick={addItem} className='px-4'>ADD</Button>
          </div>

          <div className='mt-8'>
            <h1>{'Todo'}</h1>
            <List list={todoList} type={'done'} onTickUntick={checkOrUncheckItem} deleteItem={deleteItem}/>
          </div>

          <div className='mt-8'>
            <h1>{'Done'}</h1>
            <List list={doneList} type={'todo'} onTickUntick={checkOrUncheckItem} deleteItem={deleteItem}/>
          </div>
        </div>
      </div>
  )
}

export default App
