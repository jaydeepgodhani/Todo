import {useSortable} from "@dnd-kit/sortable";
import {Checkbox} from "@nextui-org/checkbox";
import {LettersPullUp} from "./LettersPullUp.tsx";
import {RxCross2} from "react-icons/rx";
import {Box, TodoBox} from "./commons.ts";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineDragIndicator } from "react-icons/md";

const mapName = (item: TodoBox) => {
  return item.name + ' / ' + item.priority;
}

const liStyle = 'py-2 flex flex-row justify-between hover:bg-gray-100 hover:rounded-md items-center break-all text-pretty list-none cursor-pointer';

const ListItem = ({item, type, checkUncheckItem, deleteItem}: {
  item: TodoBox,
  type: string,
  checkUncheckItem: Box,
  deleteItem: Box
}) => {

  const {attributes, listeners, transition, transform, setNodeRef} = useSortable({id: item.id});

  return (
      <li key={item.id}
          style={{transform: CSS.Transform.toString(transform), transition: transition, zIndex: 2}}
          className={liStyle}
          ref={setNodeRef}
          {...attributes}
          onClick={() => checkUncheckItem(item, type)}
      >
        <div className='ml-3 max-w-[90%] flex items-center'>
          <MdOutlineDragIndicator className={'mr-2 cursor-grab'} {...listeners}/>
          <Checkbox isSelected={item.done}
                    onChange={() => checkUncheckItem(item, type)}
                    
          >
            {/*<BlurIn>{mapName(item)}</BlurIn>*/}
            <LettersPullUp text={mapName(item)}/>
          </Checkbox>
        </div>
        <div className='max-w-[10%] mx-2 cursor-pointer'>
          <RxCross2 onClick={() => deleteItem(item, type)}/>
        </div>
      </li>)
}

export default ListItem;