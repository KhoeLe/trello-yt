import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useModalStore } from "@/store/useModalStore";

interface Props {
    id: string;
    todos: Todo[];
    index: number;
    searchString: string;
}
const idToColumnText: {
    [key in TypeColumn as string]: string;
} = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done",
};
function Column({ id, todos, index, searchString }: Props) {

    const [openModal, isOpen] = useModalStore((state) => ([
        state.openModal,
       state.isOpen,
   ]))


    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    {/* render dropable todos in the colums */}

                    <Droppable droppableId={index.toString()} type="card">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`p-2 rounded-2xl shadow-sm ${
                                    snapshot.isDraggingOver
                                        ? "bg-green-200"
                                        : "bg-white/50"
                                } `}>
                                <h2 className="flex justify-between font-bold text-xl p-2">
                                    {idToColumnText[id]}
                                    <span className="text-gray-500 bg-gray-200  rounded-full px-2 py-1 text-sm font-normal">
                                        {!searchString
                                            ? todos.length
                                            : todos.filter((todo) =>
                                                  todo.title
                                                      .toLocaleLowerCase()
                                                      .includes(
                                                          searchString.toLocaleLowerCase()
                                                      )
                                              ).length}
                                    {/*
                                        => if searchString empty, return all todos
                                        => if searchString not empty, return filtered todos
                                    */}

                                    </span>
                                </h2>

                                <div className="space-y-2">
                                    {todos.map((todo, index) => {
                                        if (
                                            searchString &&
                                            !todo.title
                                                .toLocaleLowerCase()
                                                .includes(
                                                    searchString.toLocaleLowerCase()
                                                )
                                        )
                                            return null;
                                        // => if the search string is empty, return all todos and then filter them

                                        return (
                                            <Draggable
                                                key={todo.$id}
                                                draggableId={todo.$id}
                                                index={index}>
                                                {(provided) => (
                                                    <TodoCard
                                                        todo={todo}
                                                        provided={provided}
                                                        index={index}
                                                        innerRef={
                                                            provided.innerRef
                                                        }
                                                        draggableProps={
                                                            provided.draggableProps
                                                        }
                                                        dragHandleProps={
                                                            provided.dragHandleProps
                                                        }
                                                        id={id}
                                                    />
                                                )}
                                            </Draggable>
                                        );
                                    })}

                                    {provided.placeholder}

                                    <div className="flex items-end justify-end p-2 ">
                                        <button onClick={() => openModal()}  className="text-green-500 hover:text-green-600">
                                            <PlusCircleIcon className="h-10 w-10" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
}

export default Column;
