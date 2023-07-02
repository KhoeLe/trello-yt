import { ID, databases, storage } from "@/appwrite";
import { getBoardTodo } from "@/lib/getBoardTodo";
import uploadImage from "@/lib/uploadImage";
import { create } from "zustand";

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, column: TypeColumn) => void;

    searchString: string;
    setSearchString: (searchString: string) => void;

    addTask: (todo: string, columnId: TypeColumn, image?: File | null) => void;
    deleteTodo: (taskIndex: number, todo: Todo, id: TypeColumn) => void;

    newTodoInput: string;
    setNewTodoInput: (newTodoInput: string) => void;

    newTodoTaskType: TypeColumn;
    setNewTodoTaskType: (newTodoTaskType: TypeColumn) => void;

    image: File | null;
    setImage: (image: File | null) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        columns: new Map<TypeColumn, Column>(),
    },
    getBoard: async () => {
        const board = await getBoardTodo();
        set({ board });
    },
    setBoardState: (board) => set({ board }),
    updateTodoInDB: async (todo, columnId) => {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_COLLECTION_ID!,
            todo.$id,
            {
                title: todo.title,
                status: columnId,
            }
        );
    },

    searchString: "",
    setSearchString: (searchString) => set({ searchString }),

    deleteTodo: async (taskIndex, todo, id) => {
        const newColumns = new Map<TypeColumn, Column>(get().board.columns);

        newColumns.get(id)?.todos.splice(taskIndex, 1);

        set({
            board: {
                columns: newColumns,
            },
        });

        if (todo.images) {
            await storage.deleteFile(todo.images.bucketId, todo.images.fileId);
        }

        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_COLLECTION_ID!,
            todo.$id
        );
    },

    newTodoInput: "",
    setNewTodoInput: (newTodoInput) => set({ newTodoInput }),

    newTodoTaskType: "todo",
    setNewTodoTaskType: (newTodoTaskType) => set({ newTodoTaskType }),

    image: null,
    setImage: (image) => set({ image }),

    addTask: async (todo:string, columnId: TypeColumn, image? : File |null) => {
        let file: Image | undefined;

        if (image) {
            const fileUploaded = await uploadImage(image);


            if (fileUploaded) {
                file = {
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id,
                };
            }
        }

        console.log(columnId)

        const { $id } = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                status: columnId,
                ...(file && { images: JSON.stringify(file) }),
            }
        );


        set({ newTodoInput: "" });

        set((state) => {
            const newColumns = new Map(state.board.columns);

            const newTodo: Todo = {
                $id,
                $createdAt: new Date().toISOString(),
                title: todo,
                status: columnId,
                ...(file && { images: file }),
            };

            const column = newColumns.get(columnId);

            if (!column) {
                newColumns.set(columnId, {
                    id: columnId,
                    todos: [newTodo],
                });
            } else {
                newColumns.get(columnId)?.todos.push(newTodo);
            }

            return {
                board: {
                    columns: newColumns,
                },
            };
        });
    },
}));
