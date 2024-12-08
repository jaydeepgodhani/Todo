import {TodoBox} from "./interfaces.ts";
import {Checkbox} from "@nextui-org/checkbox";
import {LettersPullUp} from "./LettersPullUp.tsx";
import {ImCross} from "react-icons/im";

const mapName = (item: TodoBox) => {
  return item.name + ' / ' + item.priority;
}

const liStyle = 'py-2 flex flex-row justify-between hover:bg-gray-100 hover:rounded-md items-center break-all text-pretty';

const List = (
    { list, type, onTickUntick, deleteItem } :
        { list: TodoBox[], type: string,
          onTickUntick: (item: TodoBox, type: string) => void,
          deleteItem: (item: TodoBox, type: string) => void } ) => {
  return (
      list && list.length > 0 &&
      <div className='w-full'>
        <ul className='mt-4'>
          {list.map((item, index) => <li key={index} style={{listStyleType: "none"}} className={liStyle}>
            <div className='ml-3 max-w-[90%] cursor-pointer inline-block'>
              <Checkbox isSelected={item.done}
                        onChange={() => onTickUntick(item, type)}>
                {/*<BlurIn>{mapName(item)}</BlurIn>*/}
                <LettersPullUp text={mapName(item)}/>
              </Checkbox>
            </div>
            <div className='max-w-[10%] mx-2 cursor-pointer'>
              <ImCross onClick={() => deleteItem(item, type)}/>
            </div>
          </li>)}
        </ul>
      </div>)
}

export default List;