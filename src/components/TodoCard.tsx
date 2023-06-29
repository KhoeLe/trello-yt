"use client";
import { useBoardStore } from "@/store/useBoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
    DraggableProvided,
    DraggableProvidedDragHandleProps,
    DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

interface Props {
    todo: Todo;
    provided: DraggableProvided;
    index: number;
    id: TypeColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

function TodoCard({
    todo,
    provided,
    id,
    index,
    innerRef,
    draggableProps,
    dragHandleProps,
}: Props) {
    const { deleteTodo } = useBoardStore((state) => ({
        deleteTodo: state.deleteTodo,
    }));
    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="bg-white rounded-md space-y-2 drop-shadow-md">
            <div className="flex justify-between items-center p-5">
                <p> {todo.title}</p>
                <button
                    onClick={() => deleteTodo(index, todo, id)}
                    className="text-red-500 hover:text-red-600">
                    <XCircleIcon className="ml-5 h-8 w-8" />
                </button>
            </div>
        </div>
    );
}

export default TodoCard;
