"use client"
import { DragDropContext, Droppable } from "react-beautiful-dnd";
function Board() {

  const onDragEnd = (result: any) => {
    console.log(result);
  }

  


    return <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div>
            <div className="flex" {...provided.droppableProps} ref={provided.innerRef}>
              <div className="flex flex-col w-80 min-h-screen bg-gray-100 rounded-md p-2 m-2">
                <h2 className="text-lg font-medium">To do</h2>

                <div className="flex flex-col mt-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm text-gray-500">
                    <p className="text-sm font-medium">Create new project</p>
                    <p className="text-xs">12:30</p>
                    </div>
                </div>

                <div className="flex flex-col mt-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm text-gray-500">
                    <p className="text-sm font-medium">Create new project</p>
                    <p className="text-xs">12:30</p>
                    </div>
                </div>

                <div className="flex flex-col mt-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm text-gray-500">
                    <p className="text-sm font-medium">Create new project</p>
                    <p className="text-xs">12:30</p>
                    </div>
                </div>

                </div>

              </div>
          </div>
        )}

      </Droppable>
    </DragDropContext>;
}

export default Board;
