import { updateBoard, getBoard } from "./BoardApi";
import { Board, Task, Subtask } from "@/lib/type";
import { v4 as uuidv4 } from 'uuid';

export const addTask = (boardId: string, task: Task): string => {
    const board = getBoard(boardId)
    if(!board) throw new Error('board not existed')
    task.id = uuidv4()
    const updatedBoard: Board = {...board, tasks: [...board.tasks, task]}
    updateBoard(updatedBoard)
    return task.id;
}

export const getTask = (boardId: string, taskId: string): Task => {
    const board = getBoard(boardId)
    if(!board) throw new Error('board not existed')
    const task = board.tasks.find(item => item.id === taskId)
    if(!task) throw new Error('task not existed')
    return task;
}

export const getSubTask = (boardId: string, taskId: string, subtaskId: string,): Subtask => {
    const task = getTask(boardId, taskId)
    if(!task) throw new Error('task not existed')
    const subtask = task.subtasks.find(item => item.id === subtaskId)
    if(!subtask) throw new Error('subtask not existed')
    return subtask;
}

export const updateTask = (boardId: string, taskData: Task) => {
    const board = getBoard(boardId)
    if(!board) throw new Error('board not existed')
    const updatedBoard: Board = { ...board, tasks: board.tasks.map(item => item.id === taskData.id ? taskData : item) }
    updateBoard(updatedBoard)
}

export const deleteTask = (boardId: string, taskId: string) => {
    const board = getBoard(boardId)
    if(!board) throw new Error('board not existed')
    const updatedBoard: Board = { ...board, tasks: board.tasks.filter(item => item.id !== taskId) }
    updateBoard(updatedBoard)
}

export const updateSubTaskStatus = (boardId: string, taskId: string, subtaskId: string, value: boolean) => {
    const board = getBoard(boardId)
    if(!board) throw new Error('board not existed')
    const task = getTask(boardId, taskId)
    if(!task) throw new Error('task not existed')
    const subtask = getSubTask(boardId, taskId, subtaskId);
    if(!subtask) throw new Error('subtask not existed')
    const newSubTask: Subtask = {...subtask, isCompleted: value}
    const newTask: Task = {...task, subtasks: task.subtasks.map(item => item.id === newSubTask.id ? newSubTask : item)}
    const updatedBoard: Board = { ...board, tasks: board.tasks.map(item => item.id === taskId ? newTask : item) }
    updateBoard(updatedBoard)
}