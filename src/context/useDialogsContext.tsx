import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AddBoardDialog from '@/components/AddBoardDialog';
import EditBoardDialog from '@/components/EditBoardDialog';
import DeleteBoardDialog from '@/components/DeleteBoardDialog';
import AddTaskDialog from '@/components/AddTaskDialog';
import CheckTaskDialog from '@/components/CheckTaskDialog';
import EditTaskDialog from '@/components/EditTaskDialog';
import DeleteTaskDialog from '@/components/DeleteTaskDialog';
type Action = 
    | {type: 'OPEN_ADD_BOARD_DIALOG';}
    | {type: 'CLOSE_ADD_BOARD_DIALOG';}
    | {type: 'OPEN_EDIT_BOARD_DIALOG';}
    | {type: 'CLOSE_EDIT_BOARD_DIALOG';}
    | {type: 'OPEN_DELETE_BOARD_DIALOG';}
    | {type: 'CLOSE_DELETE_BOARD_DIALOG';}
    | {type: 'OPEN_ADD_TASK_DIALOG';}
    | {type: 'CLOSE_ADD_TASK_DIALOG';}
    | {type: 'OPEN_CHECK_TASK_DIALOG'; payload: {id: string}}
    | {type: 'CLOSE_CHECK_TASK_DIALOG';}
    | {type: 'OPEN_EDIT_TASK_DIALOG'; payload: {id: string}}
    | {type: 'CLOSE_EDIT_TASK_DIALOG';}
    | {type: 'OPEN_DELETE_TASK_DIALOG'; payload: {id: string}}
    | {type: 'CLOSE_DELETE_TASK_DIALOG';}

type DialogProps = {
    isVisible: boolean;
}

type StateProps = {
    addBoardDialog: DialogProps;
    editBoardDialog: DialogProps;
    deleteBoardDialog: DialogProps;
    addTaskDialog: DialogProps;
    checkTaskDialog: {id: string, isVisible: boolean};
    deleteTaskDialog: {id: string, isVisible: boolean};
    editTaskDialog: {id: string, isVisible: boolean};
}

// Reducer
const dialogReducer = (state: StateProps, action: Action): StateProps => {
    switch (action.type) {
        case "OPEN_ADD_BOARD_DIALOG":
            return {...state, addBoardDialog: {...state.addBoardDialog, isVisible: true}}
        case "CLOSE_ADD_BOARD_DIALOG":
            return {...state, addBoardDialog: {...state.addBoardDialog, isVisible: false}}
        case "OPEN_EDIT_BOARD_DIALOG":
            return {...state, editBoardDialog: {...state.editBoardDialog, isVisible: true}}
        case "CLOSE_EDIT_BOARD_DIALOG":
            return {...state, editBoardDialog: {...state.editBoardDialog, isVisible: false}}
        case "OPEN_DELETE_BOARD_DIALOG":
            return {...state, deleteBoardDialog: {...state.deleteBoardDialog, isVisible: true}}
        case "CLOSE_DELETE_BOARD_DIALOG":
            return {...state, deleteBoardDialog: {...state.deleteBoardDialog, isVisible: false}}
        case "OPEN_ADD_TASK_DIALOG":
            return {...state, addTaskDialog: {...state.addTaskDialog, isVisible: true}}
        case "CLOSE_ADD_TASK_DIALOG":
            return {...state, addTaskDialog: {...state.addTaskDialog, isVisible: false}}
        case "OPEN_CHECK_TASK_DIALOG":
            return {...state, checkTaskDialog: {...state.checkTaskDialog, id: action.payload.id, isVisible: true}}
        case "CLOSE_CHECK_TASK_DIALOG":
            return {...state, checkTaskDialog: {...state.checkTaskDialog, isVisible: false}}
        case "OPEN_EDIT_TASK_DIALOG":
            return {...state, editTaskDialog: {...state.editTaskDialog, id: action.payload.id, isVisible: true}}
        case "CLOSE_EDIT_TASK_DIALOG":
            return {...state, editTaskDialog: {...state.editTaskDialog, isVisible: false}}
        case "OPEN_DELETE_TASK_DIALOG":
            return {...state, deleteTaskDialog: {...state.deleteTaskDialog, id: action.payload.id, isVisible: true}}
        case "CLOSE_DELETE_TASK_DIALOG":
                return {...state, deleteTaskDialog: {...state.deleteTaskDialog, isVisible: false}}
        // Implement other actions
        default:
            return state;
    }
};

// Context
const DialogsContext = createContext<{ 
    state: StateProps; 
    dispatch: React.Dispatch<Action>,
} | undefined>(undefined);

// Provider
export const DialogsProvider: React.FC<{children: React.ReactNode }> = ({children }) => {
    const initState: StateProps = {
        addBoardDialog: {isVisible: false},
        editBoardDialog: {isVisible: false},
        deleteBoardDialog: {isVisible: false},
        addTaskDialog: {isVisible: false},
        checkTaskDialog: {id: "" ,isVisible: false},
        deleteTaskDialog: {id: "", isVisible: false},
        editTaskDialog: {id: "", isVisible: false}
    }

    const [state, dispatch] = useReducer(dialogReducer, initState);

    return (
        <DialogsContext.Provider value={{ state, dispatch}}>
            {children}
            <AddBoardDialog isVisible={state.addBoardDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_ADD_BOARD_DIALOG"})}}/>
            <DeleteBoardDialog isVisible={state.deleteBoardDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_DELETE_BOARD_DIALOG"})}}/>
            <EditBoardDialog isVisible={state.editBoardDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_EDIT_BOARD_DIALOG"})}}/>
            <AddTaskDialog isVisible={state.addTaskDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_ADD_TASK_DIALOG"})}}/>
            <CheckTaskDialog id={state.checkTaskDialog.id} isVisible={state.checkTaskDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_CHECK_TASK_DIALOG"})}}/>
            <EditTaskDialog id={state.editTaskDialog.id} isVisible={state.editTaskDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_EDIT_TASK_DIALOG"})}}/>
            <DeleteTaskDialog id={state.deleteTaskDialog.id} isVisible={state.deleteTaskDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_DELETE_TASK_DIALOG"})}}/>
        </DialogsContext.Provider>
    );
};


// Custom Hook
export const useDialogs = () => {
    const context = useContext(DialogsContext);
    if (!context) throw new Error('useDialogs must be used within a DialogsProvider');
    return context;
};