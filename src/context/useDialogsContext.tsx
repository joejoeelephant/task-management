import React, { createContext, useContext, useReducer } from 'react';
import LoadingDialog from '@/components/LoadingDialog';
import dynamic from 'next/dynamic';

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

type CommonDialogProps = {
    isVisible: boolean;
    closeDialog: () => void;
}

type TaskDialogProps = CommonDialogProps & {
    id: string
}

type CommonStateItemProps = {
    isVisible: boolean
}

type TaskStateItemProps = CommonStateItemProps & {
    id: string
}

type StateProps = {
    addBoardDialog: CommonStateItemProps;
    editBoardDialog: CommonStateItemProps;
    deleteBoardDialog: CommonStateItemProps;
    addTaskDialog: CommonStateItemProps;
    checkTaskDialog: TaskStateItemProps;
    deleteTaskDialog: TaskStateItemProps;
    editTaskDialog: TaskStateItemProps;
}

const loadDynamicDialog = <T extends {}>(fileName: string): React.ComponentType<T> => {
    return dynamic<T>(() => import(`@/components/${fileName}`), {
        loading: () => (<LoadingDialog/>),
        ssr: false
    });
}

const AddBoardDialog = loadDynamicDialog<CommonDialogProps>('AddBoardDialog')
const EditBoardDialog = loadDynamicDialog<CommonDialogProps>('EditBoardDialog')
const DeleteBoardDialog = loadDynamicDialog<CommonDialogProps>('DeleteBoardDialog')
const AddTaskDialog = loadDynamicDialog<CommonDialogProps>('AddTaskDialog')
const CheckTaskDialog = loadDynamicDialog<TaskDialogProps>('CheckTaskDialog')
const EditTaskDialog = loadDynamicDialog<TaskDialogProps>('EditTaskDialog')
const DeleteTaskDialog = loadDynamicDialog<TaskDialogProps>('DeleteTaskDialog')



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
            {
                state.addBoardDialog.isVisible && 
                <AddBoardDialog isVisible={state.addBoardDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_ADD_BOARD_DIALOG"})}}/>
            }
            {
                state.deleteBoardDialog.isVisible && 
                <DeleteBoardDialog isVisible={state.deleteBoardDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_DELETE_BOARD_DIALOG"})}}/>
            }
            {
                state.editBoardDialog.isVisible && 
                <EditBoardDialog isVisible={state.editBoardDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_EDIT_BOARD_DIALOG"})}}/>
            }
            {
                state.addTaskDialog.isVisible && 
                <AddTaskDialog isVisible={state.addTaskDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_ADD_TASK_DIALOG"})}}/>
            }
            {
                state.checkTaskDialog.isVisible && 
                <CheckTaskDialog id={state.checkTaskDialog.id} isVisible={state.checkTaskDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_CHECK_TASK_DIALOG"})}}/>
            }
            {
                state.editTaskDialog.isVisible && 
                <EditTaskDialog id={state.editTaskDialog.id} isVisible={state.editTaskDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_EDIT_TASK_DIALOG"})}}/>
            }
            {
                state.deleteTaskDialog.isVisible && 
                <DeleteTaskDialog id={state.deleteTaskDialog.id} isVisible={state.deleteTaskDialog.isVisible} closeDialog={() => {dispatch({type: "CLOSE_DELETE_TASK_DIALOG"})}}/>
            }
        </DialogsContext.Provider>
    );
};


// Custom Hook
export const useDialogs = () => {
    const context = useContext(DialogsContext);
    if (!context) throw new Error('useDialogs must be used within a DialogsProvider');
    return context;
};