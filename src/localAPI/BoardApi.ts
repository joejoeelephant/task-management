import { Board } from "@/lib/type";
import { BoardsData } from "@/lib/boardData";
export const getBoards = (): Board[] => {
    try {
        if (typeof window === 'undefined') {
            // Optionally handle server-side or static generation logic here
            throw new Error('localStorage is not available');
        }
        const boardsString = window.localStorage.getItem('boards');
        if (!boardsString) {
            setBoards(BoardsData)
            throw new Error('No boards found');
        }
        const boards: Board[] = JSON.parse(boardsString);
        return boards
    } catch (error: any) {
        console.error(error)
        return []
    }
}

export const setBoards = (boards: Board[]) => {
    try {
        if (typeof window === 'undefined') {
            // Optionally handle server-side or static generation logic here
            throw new Error('localStorage is not available');
        }
        window.localStorage.setItem('boards', JSON.stringify(boards));
    } catch (error: any) {
        console.error(error)
        return []
    }
}

export const getBoard = (id: string): Board | undefined => {
    const boards = getBoards()
    return boards.find(board => board.id === id)
}

export const deleteBoard = (id: string) => {
    const boards = getBoards()
    const filteredBoards = boards.filter(board => board.id !== id);
    setBoards(filteredBoards)
}

export const addBoard = (board: Board) => {
    const boards = getBoards()
    setBoards([...boards, board])
}

export const updateBoard = (updatedBoard: Board) => {
    const boards = getBoards()
    const updatedBoards = boards.map(board => board.id === updatedBoard.id ? updatedBoard : board);
    setBoards(updatedBoards);
}