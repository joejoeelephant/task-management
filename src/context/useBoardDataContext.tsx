import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
// Types
import { Board, Task, Subtask, StatusItem } from '@/lib/type'; // Assuming BoardTypes.ts contains your type definitions
import { useBoard } from "@/hooks/useBoard";
import { useParams } from "next/navigation";
// Actions
export type Action =
    | { type: 'INITIAL_BOARD'; payload: Board }
    | { type: 'UPDATE_STATUS_LIST'; payload: StatusItem[] }
    | { type: 'UPDATE_NAME'; payload: string }
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'UPDATE_TASK_STATUS_ID'; payload: { taskId: string , statusId: string} }
    | { type: 'UPDATE_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: { taskId: string } }
    | { type: 'UPDATE_SUBTASK'; payload: { taskId: string; subtaskId: string; isCompleted: boolean } };

// Reducer
export const boardReducer = (state: Board | null, action: Action): Board | null => {
    switch (action.type) {
        case 'INITIAL_BOARD':
            return {...action.payload}
        case 'UPDATE_STATUS_LIST':
            if(!state) return null;
            return {...state, statusList: action.payload};
        case 'UPDATE_NAME':
            if(!state) return null;
            return {...state, name: action.payload};
        case 'ADD_TASK':
            if(!state) return null;
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'DELETE_TASK':
            if(!state) return null;
            return { ...state, tasks: state.tasks.filter(item => item.id !== action.payload.taskId) };
        case 'UPDATE_TASK':
            if(!state) return null;
            return { ...state, tasks: state.tasks.map(item => item.id === action.payload.id ? action.payload : item) };
        case 'UPDATE_TASK_STATUS_ID':
            if(!state) return null;
            return { ...state, tasks: state.tasks.map(item => item.id === action.payload.taskId ? {...item, statusId: action.payload.statusId} : item) };
        case 'UPDATE_SUBTASK': 
            if(!state) return null;
            const task = state.tasks.find(item => item.id === action.payload.taskId)
            if(!task) return null;
            const subtask = task.subtasks.find(item => item.id === action.payload.subtaskId)
            if(!subtask) return null;
            const newSubTask: Subtask = {...subtask, isCompleted: action.payload.isCompleted}
            const newTask: Task = {...task, subtasks: task.subtasks.map(item => item.id === newSubTask.id ? newSubTask : item)}
            return { ...state, tasks: state.tasks.map(item => item.id === action.payload.taskId ? newTask : item) };
        // Implement other actions
        default:
            return state;
    }
};

// Context
const BoardDataContext = createContext<{ 
        state: Board | null; 
        dispatch: React.Dispatch<Action>,
        loading: boolean;
        errorMessage: string;
    } | undefined>(undefined);

// Provider
export const BoardDataProvider: React.FC<{children: React.ReactNode }> = ({children }) => {
    const {slug} = useParams<{slug: string}>()
    const {currentBoard, loading, errorMessage} = useBoard(slug)
    const [state, dispatch] = useReducer(boardReducer, currentBoard);

    useEffect(() => {
        if (currentBoard) {
            dispatch({ type: 'INITIAL_BOARD', payload: currentBoard });
        }
    }, [currentBoard]);

    return (
        <BoardDataContext.Provider value={{ state, dispatch, loading, errorMessage }}>
            {children}
        </BoardDataContext.Provider>
    );
};

// Custom Hook
export const useBoardData = () => {
    const context = useContext(BoardDataContext);
    if (!context) throw new Error('useBoardData must be used within a BoardDataProvider');
    return context;
};
