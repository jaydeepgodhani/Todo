import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { Box, Priority, TodoBox } from "./commons.ts";
import List from "./List.tsx";

const selectOptions = [
  { key: "high", label: "High" },
  { key: "medium", label: "Medium" },
  { key: "low", label: "Low" },
];

// drag and drop to and from
// why heavy application ?

function App() {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("medium");

  const [todoList, setTodoList] = useState<TodoBox[]>([]);
  const [doneList, setDoneList] = useState<TodoBox[]>([]);

  const addItem = (): void => {
    if (!inputValue) return;
    if (
      todoList.findIndex((elem) => elem.name === inputValue) < 0 &&
      doneList.findIndex((elem) => elem.name === inputValue) < 0
    ) {
      const itemToAdd = {
        done: false,
        name: inputValue,
        priority: priority as Priority,
        id: inputValue,
      };
      setTodoList([...todoList, itemToAdd]);
    }
    setInputValue("");
    setPriority("medium");
  };

  const checkUncheckItem: Box = (item, type) => {
    if (type === "todo") {
      item.done = false;
      setTodoList([...todoList, item]);
      setDoneList(doneList.filter((elem) => elem.name !== item.name));
    } else {
      item.done = true;
      setDoneList([...doneList, item]);
      setTodoList(todoList.filter((elem) => elem.name !== item.name));
    }
  };

  const deleteItem: Box = (item, type) => {
    if (type === "done") {
      setTodoList(todoList.filter((elem) => elem.name !== item.name));
    } else {
      setDoneList(doneList.filter((elem) => elem.name !== item.name));
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    if (!e.over) return;
    let activeIndex = -1;
    let overIndex = -1;
    if (e.active.id !== e.over.id) {
      activeIndex = todoList.findIndex((todo) => todo.id === e.active.id);
      if (activeIndex == -1) {
        activeIndex = doneList.findIndex((todo) => todo.id === e.active.id);
        overIndex = doneList.findIndex(
          (todo) => e.over && todo.id === e.over.id
        );
        setDoneList(arrayMove(doneList, activeIndex, overIndex));
      } else {
        activeIndex = todoList.findIndex((todo) => todo.id === e.active.id);
        overIndex = todoList.findIndex(
          (todo) => e.over && todo.id === e.over.id
        );
        setTodoList(arrayMove(todoList, activeIndex, overIndex));
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="my-12 text-4xl font-bold">{"Todo - Drag & Drop"}</h1>
      <DndContext onDragEnd={onDragEnd}>
        <div className="w-2/3 xl:w-1/2 2xl:w-2/5 mt-2">
          <div className="flex">
            <Input
              value={inputValue}
              onValueChange={setInputValue}
              aria-label={"add todo item"}
              variant={"bordered"}
              isClearable
            />
            <Select
              className="max-w-xs px-4"
              selectedKeys={[priority]}
              defaultSelectedKeys={["medium"]}
              onSelectionChange={(keys) =>
                setPriority(Array.from(keys)[0] as string)
              }
              aria-label={"select priority"}
            >
              {selectOptions.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <Button
              color="primary"
              onClick={addItem}
              className="px-4"
              onKeyDown={addItem}
            >
              ADD
            </Button>
          </div>

          <div className="mt-8">
            <h1>{"Todo"}</h1>
            <List
              list={todoList}
              type={"done"}
              checkUncheckItem={checkUncheckItem}
              deleteItem={deleteItem}
            />
          </div>

          <div className="mt-8">
            <h1>{"Done"}</h1>
            <List
              list={doneList}
              type={"todo"}
              checkUncheckItem={checkUncheckItem}
              deleteItem={deleteItem}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );
}

export default App;
