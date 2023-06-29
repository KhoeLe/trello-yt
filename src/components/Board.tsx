"use client";
import { useBoardStore } from "@/store/useBoardStore";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
function Board() {
    // const getBoard = useBoardStore((state) => state.getBoard);
    // const board = useBoardStore((state) => state.board);

    const [getBoard, board,setBoardState,updateTodoInDB, searchString] = useBoardStore((state) => [
        state.getBoard,
        state.board,
        state.setBoardState,
        state.updateTodoInDB,
        state.searchString
    ]);



    const onDragEnd = (result: DropResult) => {
       const  {destination, source, type} = result;
       if(!destination) return;

       // this logic handle the drag and drop of the column and setBoardState
       if(type==='column'){
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const newColumns = new Map(entries);
            // keep the same order of the columns
            setBoardState({
                ...board, columns: newColumns
            });
       }

       const columns = Array.from(board.columns);
       const startColIndex = columns[Number(source.droppableId)];
        const finishColIndex = columns[Number(destination.droppableId)];

        const startCol : Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos
        }

        const finishCol : Column = {
            id: finishColIndex[0],
            todos: finishColIndex[1].todos

        }

        if(!startCol || !finishCol) return;

        if(source.index ===  destination.index && startCol === finishCol) return

        const newTodos = startCol.todos;

        const [todoMoved]  = newTodos.splice(source.index, 1);

        if(startCol.id === finishCol.id){
            newTodos.splice(destination.index, 0, todoMoved);

            const newCol = {
                id: startCol.id,
                todos: newTodos
            }

            const newColumns = new Map(board.columns);

            // set the value of the column with the new todos order
            newColumns.set(startCol.id, newCol);

            setBoardState({
                ...board, columns: newColumns
            })

            // ==> this logic using same column
        }else{
            const finishTodos = Array.from(finishCol.todos);

            finishTodos.splice(destination.index, 0, todoMoved);

            const newFinishCols = new Map(board.columns)

            const newCol = {
                id: startCol.id,
                todos: newTodos
            }

            newFinishCols.set(startCol.id, newCol);
            newFinishCols.set(finishCol.id, {
                id: finishCol.id,
                todos: finishTodos
            });



            updateTodoInDB(todoMoved, finishCol.id);

            setBoardState({
                ...board, columns: newFinishCols
            })
            // ==> this logic using different column
        }
    };

    useEffect(() => {
        getBoard();
    }, [getBoard]);


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="column">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
                            {/* grid
                                mobile: 1 column
                                desktop: 3 columns
                                gap-4 : gap between columns
                                max-w-7xl : max width 7xl
                            */}
                        {Array.from(board.columns.entries()).map(
                            ([id, column], index) => (
                                <Column
                                    key={id}
                                    id={id}
                                    todos={column.todos}
                                    index={index}
                                    searchString={searchString}
                                />
                            )
                        )}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default Board;
