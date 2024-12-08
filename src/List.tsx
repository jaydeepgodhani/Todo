import {Box, TodoBox} from "./commons.ts";
import {SortableContext} from "@dnd-kit/sortable";
import ListItem from "./ListItem.tsx";

const List = (
    {list, type, checkUncheckItem, deleteItem}: {
      list: TodoBox[],
      type: string,
      checkUncheckItem: Box,
      deleteItem: Box
    }) => {

  return (
      list && list.length > 0 &&
      <div className='w-full'>
        <ul className='mt-4'>
          <SortableContext items={list} id={type}>
            {list.map(item =>
                <ListItem item={item} type={type} checkUncheckItem={checkUncheckItem} deleteItem={deleteItem} key={item.id} />)}
          </SortableContext>
        </ul>
      </div>)
}

export default List;