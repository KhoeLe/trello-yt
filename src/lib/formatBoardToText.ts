export const formatBoardToText  =  async(board: Board) => {

    const todos =  Array.from(board.columns.entries());

    const todosText = todos.reduce((map, [key, value]) => {
        map[key] = value.todos;
        return map

    }, {} as {[key in TypeColumn]: Todo[]})


    // reduce to key  = column, value = array of todos
    const flatArrayCounted = Object.entries(todosText).reduce((map, [key, value]) => {
        map[key as TypeColumn] = value.length;

        return map

    }, {} as {[key in TypeColumn]: number})


    return flatArrayCounted
}
