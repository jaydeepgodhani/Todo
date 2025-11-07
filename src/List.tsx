import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { AnimatePresence, motion } from "framer-motion";
import { RiListCheck3, RiListIndefinite } from "react-icons/ri";
import { Box, TodoBox } from "./commons.ts";
import ListItem from "./ListItem.tsx";

const List = ({
  id,
  list,
  type,
  checkUncheckItem,
  deleteItem,
}: {
  id: string;
  list: TodoBox[];
  type: string;
  checkUncheckItem: Box;
  deleteItem: Box;
}) => {
  const { setNodeRef } = useDroppable({
    id: id, // container itself is a droppable target — important for dropping into empty lists
  });

  if (list.length == 0) {
    return (
      <div className="h-24 rounded-lg flex items-center justify-center w-full border-2 border-gray-100 mt-4">
        {type === "done" ? (
          <RiListIndefinite className="w-8 h-auto text-gray-200" />
        ) : (
          <RiListCheck3 className="w-8 h-auto text-gray-200" />
        )}
      </div>
    );
  }

  return (
    list &&
    list.length > 0 && (
      <div className="w-full" ref={setNodeRef}>
        <AnimatePresence initial={false}>
          <motion.ul layout className="mt-4">
            <SortableContext items={list} id={type}>
              {list.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ListItem
                    item={item}
                    type={type}
                    checkUncheckItem={checkUncheckItem}
                    deleteItem={deleteItem}
                  />
                </motion.li>
              ))}
            </SortableContext>
          </motion.ul>
        </AnimatePresence>
      </div>
    )
  );
};

export default List;
