import {Box, TodoBox} from "./commons.ts";
import {SortableContext} from "@dnd-kit/sortable";
import ListItem from "./ListItem.tsx";
import {RiListCheck3, RiListIndefinite} from "react-icons/ri";

const List = (
    {list, type, checkUncheckItem, deleteItem}: {
      list: TodoBox[],
      type: string,
      checkUncheckItem: Box,
      deleteItem: Box
    }) => {

  if (list.length == 0) {
    return <div className='h-24 rounded-lg flex items-center justify-center w-full border-2 border-gray-100 mt-4'>
      {type === 'done' ? <RiListIndefinite className='w-8 h-auto text-gray-200'/> :
          <RiListCheck3 className='w-8 h-auto text-gray-200'/>}
    </div>
  }

  return (
      list && list.length > 0 &&
    <div className='w-full'>
      <ul className='mt-4'>
        <SortableContext items={list} id={type}>
          {list.map(item =>
              <ListItem item={item} type={type} checkUncheckItem={checkUncheckItem} deleteItem={deleteItem}
                        key={item.id}/>)}
        </SortableContext>
      </ul>
    </div>)
}

export default List;