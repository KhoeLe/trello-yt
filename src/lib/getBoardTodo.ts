import { databases } from "@/appwrite";

export const getBoardTodo = async() => {
    const data   = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_COLLECTION_ID!);
    // return data.documents;

    // console.log(data.documents);

    const todos = data.documents;


    const columns  = todos.reduce((acc, todo ) => {
        if(!acc.get(todo.status) ){
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }

        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            // ...(todo.images && {images: JSON.parse(todo.image) })
        });

        return acc;

    }, new Map<TypeColumn, Column>());


    // if columns is empty, set default columns

    const columnsTypes : TypeColumn[] = ["todo", "inprogress", "done"]

    for(const columnsType of columnsTypes){
        if(!columns.get(columnsType)){
            columns.set(columnsType, {
                id: columnsType,
                todos: []
            })

        }
    }

    const sortedColumns = new Map(
        Array.from(columns.entries()).sort(
            (a, b) => columnsTypes.indexOf(a[0]) - columnsTypes.indexOf(b[0])
        )
    )

    const board : Board = {
        columns: sortedColumns
    }

    return board;
}
