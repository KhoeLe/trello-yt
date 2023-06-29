import { format } from "path";
import { formatBoardToText } from "./formatBoardToText";

export const fetchSuggestions = async (board: Board) => {


    const todos = await formatBoardToText(board);


    const response = await fetch('/api/getData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            todos
        })
    });

    const data = await response.json();

    const {content} = data

    return content;


}
