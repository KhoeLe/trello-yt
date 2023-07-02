"use client";
import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/useBoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
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

    const [imageUrl , setImageUrl] = useState<string | null> (null)

    useEffect(() => {
        if(todo.images){
            const fetchImage = async () => {
                const url  =  await getUrl(todo.images!)

                if(url){
                    setImageUrl(url.toString())
                }
            }
         fetchImage()

        }


    }, [todo])


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

            {imageUrl && (
                <div className="h-full w-full rounded-b-md">
                    <Image
                        src={imageUrl}
                        alt="Task image"
                        width={300}
                        height={100}
                        className="w-full object-contain rounded-b-md"
                    />
                </div>
            )}
        </div>
    );
}

export default TodoCard;
