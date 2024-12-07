import {useRef, useState} from 'react'
import './App.css'
import {Checkbox} from "@nextui-org/checkbox"
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import { ImCross } from "react-icons/im";
import {LettersPullUp} from "./LettersPullUp.tsx";

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
  {key: "high", label: "High"},
  {key: "medium", label: "Medium"},
  {key: "low", label: "Low"},
];

const liStyle = 'py-2 flex w-full flex-row justify-between hover:bg-gray-100 hover:rounded-md items-center break-words';

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

  const checkItem = (item: TodoBox): void => {
    item.done = true;
    setDoneList([...doneList, item]);
    setTodoList(todoList.filter(elem => elem.name !== item.name));
  }

  const uncheckItem = (item: TodoBox): void => {
    item.done = false;
    setTodoList([...todoList, item]);
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

  const mapName = (item:TodoBox) => {
    return item.name + ' / ' + item.priority;
  }

  return (
      <div className='w-full flex flex-col items-center justify-center'>
        <div className='w-1/3 mt-8'>
          <div className='flex'>
            <Input ref={selectedInput} aria-label={'add todo item'} variant={'bordered'} onClick={inputClicked}/>
            <Select className="max-w-xs px-4" ref={selectedPriority} defaultSelectedKeys={["medium"]} aria-label={'select priority'}>
              {selectOptions.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Button color="primary" onClick={addItem} className='px-4'>ADD</Button>
          </div>

          <div className='mt-8'>
            {todoList && todoList.length > 0 &&
                <div>
                  <h1>{'Todo'}</h1>
                  <ul className='mt-4'>
                    {todoList.map((item, index) => <li key={index} style={{listStyleType: "none"}} className={liStyle}>
                      <Checkbox isSelected={item.done}
                                onChange={() => checkItem(item)} className='w-[95%] ml-3'>
                        {/*<BlurIn>{mapName(item)}</BlurIn>*/}
                        <LettersPullUp text={mapName(item)} />
                      </Checkbox>
                      <ImCross onClick={() => deleteItem("todo", item)} className='cursor-pointer mx-4'/>
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
                                onChange={() => uncheckItem(item)} className='w-[95%] ml-3'>
                        <LettersPullUp text={mapName(item)} />
                      </Checkbox>
                      <ImCross onClick={() => deleteItem("done", item)} className='cursor-pointer mx-4'/>
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
