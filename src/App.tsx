import { DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useRef, useState } from "react";
import { Box, Priority, TodoBox } from "./commons.ts";
import List from "./List.tsx";
import ListItem from "./ListItem.tsx";

const selectOptions = [
  { key: "high", label: "High" },
  { key: "medium", label: "Medium" },
  { key: "low", label: "Low" },
];

const initialTodo = [
  { id: "t1", name: "Task A", done: false, priority: "high" as Priority },
  { id: "t2", name: "Task B", done: false, priority: "high" as Priority },
  { id: "t3", name: "Task C", done: false, priority: "high" as Priority },
];
const initialDone = [
  { id: "d1", name: "Task Z", done: true, priority: "high" as Priority },
];

function App() {
  const [lists, setLists] = useState<{ todo: TodoBox[]; done: TodoBox[] }>({
    todo: initialTodo,
    done: initialDone,
  });
  const [activeId, setActiveId] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("medium");

  const draggedItem = useRef<TodoBox | undefined>(null);

  function findListContaining(id: string) {
    if (!id) return null;
    if (lists.todo.find((i: any) => i.id === id)) return "todo";
    if (lists.done.find((i: any) => i.id === id)) return "done";
    return null;
  }

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }
  draggedItem.current = lists.todo.find((i: any) => i.id === activeId);
  if (!draggedItem.current) {
    draggedItem.current = lists.done.find((i: any) => i.id === activeId);
  }

  console.log("draggedItem...", draggedItem, activeId);

  const checkUncheckItem: Box = (item, type) => {
    // if (type === "todo") {
    //   item.done = false;
    //   setTodoList([...todoList, item]);
    //   setDoneList(doneList.filter((elem) => elem.name !== item.name));
    //   const newList = lists.done.filter((elem) => elem.name !== item.name);
    //   setLists((prev) => ({ ...prev, done: newList }));
    // } else {
    //   item.done = true;
    //   setDoneList([...doneList, item]);
    //   setTodoList(todoList.filter((elem) => elem.name !== item.name));
    // }
  };

  const deleteItem: Box = (item, type) => {
    if (type === "done") {
      const newList = lists.todo.filter((elem) => elem.name !== item.name)
      setLists((prev) => ({ ...prev, todo: newList }));
    } else {
      const newList = lists.done.filter((elem) => elem.name !== item.name);
      setLists((prev) => ({ ...prev, done: newList }));
    }
  };

  const addItem = (): void => {
    if (!inputValue) return;
    if (
      lists.todo.findIndex((elem) => elem.name === inputValue) < 0 &&
      lists.done.findIndex((elem) => elem.name === inputValue) < 0
    ) {
      const itemToAdd = {
        done: false,
        name: inputValue,
        priority: priority as Priority,
        id: inputValue,
      };
      lists.todo.push(itemToAdd);
      setLists((prev) => ({ ...prev, todo: lists.todo }));
    }
    setInputValue("");
    setPriority("medium");
  };

  function handleDragEnd(event: any) {
    const { active, over } = event;
    setActiveId(null);

    // if nothing under pointer, ignore
    if (!over) return;

    const fromListId = findListContaining(active.id);
    // over.id could be either an item id OR a container id (if we dropped on empty area)
    const overListId =
      findListContaining(over.id) ??
      (over.id === "todo" || over.id === "done" ? over.id : null);

    console.log("overlist id... ", overListId);

    if (!fromListId || !overListId) return; // safety

    // same list -> reorder
    if (fromListId === overListId) {
      const list = lists[fromListId];
      const oldIndex = list.findIndex((i: any) => i.id === active.id);
      const newIndex = list.findIndex((i: any) => i.id === over.id);
      // if over.id was containerId (dropped in empty area), newIndex will be -1; just push to end
      const targetIndex = newIndex === -1 ? list.length - 1 : newIndex;
      const newList = arrayMove(list, oldIndex, targetIndex);
      setLists((prev) => ({ ...prev, [fromListId]: newList }));
      return;
    }

    // moving between lists
    const fromList = lists[fromListId];
    const toList = lists[overListId];

    // remove from source
    const item = fromList.find((i: any) => i.id === active.id);
    const newFrom = fromList.filter((i: any) => i.id !== active.id);

    // determine insert index in target:
    // if over.id is a containerId (dropped into empty area), put at end
    let insertIndex = 0;
    const overIndex = toList.findIndex((i: any) => i.id === over.id);
    if (overIndex === -1) {
      insertIndex = toList.length; // drop at end
    } else {
      // decide whether to insert before or after the hovered item. Here we insert at hovered index.
      insertIndex = overIndex;
    }

    const newTo = [
      ...toList.slice(0, insertIndex),
      item,
      ...toList.slice(insertIndex),
    ];

    setLists((prev) => ({
      ...prev,
      [fromListId]: newFrom,
      [overListId]: newTo,
    }));
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="my-12 text-4xl font-bold">{"Todo - Drag & Drop"}</h1>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
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
              id={"todo"}
              list={lists.todo}
              type={"done"}
              checkUncheckItem={checkUncheckItem}
              deleteItem={deleteItem}
            />
          </div>

          <div className="mt-8">
            <h1>{"Done"}</h1>
            <List
              id={"done"}
              list={lists.done}
              type={"todo"}
              checkUncheckItem={checkUncheckItem}
              deleteItem={deleteItem}
            />
          </div>
        </div>
        <DragOverlay>
          {activeId ? (
            // simple overlay representation
            <div>
              <ListItem
                item={draggedItem.current}
                type={"done"}
                checkUncheckItem={checkUncheckItem}
                deleteItem={deleteItem}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;
