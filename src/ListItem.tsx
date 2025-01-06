import {useSortable} from "@dnd-kit/sortable";
import {Checkbox} from "@nextui-org/checkbox";
import {RxCross2} from "react-icons/rx";
import {Box, TodoBox} from "./commons.ts";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineDragIndicator } from "react-icons/md";
import {BlurIn} from "./BlurIn.tsx";

const mapName = (item: TodoBox) => {
  return item.name + ' - ' + item.priority;
}

const liStyle = 'py-2 flex flex-row justify-between hover:bg-gray-100 hover:rounded-md items-center break-all text-pretty list-none';

const ListItem = ({item, type, checkUncheckItem, deleteItem}: {
  item: TodoBox,
  type: string,
  checkUncheckItem: Box,
  deleteItem: Box
}) => {

  const {attributes, listeners, transition, transform, setNodeRef} = useSortable({id: item.id});

  return (
      <li key={item.id}
          style={{transform: CSS.Translate.toString(transform), transition: transition, zIndex: 2}}
          className={liStyle}
          ref={setNodeRef}
          {...attributes}
      >
        <MdOutlineDragIndicator className={'cursor-grab w-[10%]'} {...listeners}/>
        <div className='max-w-[90%] flex items-center cursor-pointer w-full' onClick={() => checkUncheckItem(item, type)}>
          <Checkbox isSelected={item.done}
                    onChange={() => checkUncheckItem(item, type)}
          >
            <BlurIn>{mapName(item)}</BlurIn>
            {/*<LettersPullUp text={mapName(item)}/>*/}
            {/*{mapName(item)}*/}
          </Checkbox>
        </div>
        <div className='max-w-[10%] px-2'>
          <RxCross2 onClick={() => deleteItem(item, type)}/>
        </div>
      </li>)
}

export default ListItem;