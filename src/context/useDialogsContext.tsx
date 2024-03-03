import React, { createContext, useContext, useReducer } from 'react';
import LoadingDialog from '@/components/LoadingDialog';
import dynamic from 'next/dynamic';

type Action = 
    | {type: 'OPEN_ADD_BOARD_DIALOG'; payload?: {id?: string}}
    | {type: 'CLOSE_ADD_BOARD_DIALOG'; payload?: {id?: string}}
    | {type: 'OPEN_EDIT_BOARD_DIALOG'; payload?: {id?: string}}
    | {type: 'CLOSE_EDIT_BOARD_DIALOG'; payload?: {id?: string}}
    | {type: 'OPEN_DELETE_BOARD_DIALOG'; payload?: {id?: string}}
    | {type: 'CLOSE_DELETE_BOARD_DIALOG'; payload?: {id?: string}}
    | {type: 'OPEN_ADD_TASK_DIALOG'; payload?: {id?: string}}
    | {type: 'CLOSE_ADD_TASK_DIALOG'; payload?: {id?: string}}
    | {type: 'OPEN_CHECK_TASK_DIALOG'; payload: {id: string}}
    | {type: 'CLOSE_CHECK_TASK_DIALOG'; payload?: {id?: string}}
    | {type: 'OPEN_EDIT_TASK_DIALOG'; payload: {id: string}}
    | {type: 'CLOSE_EDIT_TASK_DIALOG'; payload?: {id?: string}}
    | {type: 'OPEN_DELETE_TASK_DIALOG'; payload: {id: string}}
    | {type: 'CLOSE_DELETE_TASK_DIALOG'; payload?: {id?: string}}

type BaseDialogProps = {
    isVisible: boolean;
    closeDialog: () => void;
}

type WithIdDialogProps = BaseDialogProps & {
    id: string
}

type BaseStateItemProps = {
    isVisible: boolean
}

type withIdStateItemProps = BaseStateItemProps & {
    id: string
}

type StateProps = {
    addBoardDialog: BaseStateItemProps;
    editBoardDialog: BaseStateItemProps;
    deleteBoardDialog: BaseStateItemProps;
    addTaskDialog: BaseStateItemProps;
    checkTaskDialog: withIdStateItemProps;
    deleteTaskDialog: withIdStateItemProps;
    editTaskDialog: withIdStateItemProps;
}

const loadDynamicDialog = <T extends BaseDialogProps>(fileName: string): React.ComponentType<T> => {
    return dynamic<T>(() => import(`@/components/${fileName}`), {
        loading: () => (<LoadingDialog/>),
        ssr: false
    });
}

const AddBoardDialog = loadDynamicDialog<BaseDialogProps>('AddBoardDialog')
const EditBoardDialog = loadDynamicDialog<BaseDialogProps>('EditBoardDialog')
const DeleteBoardDialog = loadDynamicDialog<BaseDialogProps>('DeleteBoardDialog')
const AddTaskDialog = loadDynamicDialog<BaseDialogProps>('AddTaskDialog')
const CheckTaskDialog = loadDynamicDialog<WithIdDialogProps>('CheckTaskDialog')
const EditTaskDialog = loadDynamicDialog<WithIdDialogProps>('EditTaskDialog')
const DeleteTaskDialog = loadDynamicDialog<WithIdDialogProps>('DeleteTaskDialog')

const actionToStateKey: Record<string, keyof StateProps> = {
    'OPEN_ADD_BOARD_DIALOG': 'addBoardDialog',
    'CLOSE_ADD_BOARD_DIALOG': 'addBoardDialog',
    'OPEN_EDIT_BOARD_DIALOG': 'editBoardDialog',
    'CLOSE_EDIT_BOARD_DIALOG': 'editBoardDialog',
    'OPEN_DELETE_BOARD_DIALOG': 'deleteBoardDialog',
    'CLOSE_DELETE_BOARD_DIALOG': 'deleteBoardDialog',
    'OPEN_ADD_TASK_DIALOG': 'addTaskDialog',
    'CLOSE_ADD_TASK_DIALOG': 'addTaskDialog',
    'OPEN_CHECK_TASK_DIALOG': 'checkTaskDialog',
    'CLOSE_CHECK_TASK_DIALOG': 'checkTaskDialog',
    'OPEN_EDIT_TASK_DIALOG': 'editTaskDialog',
    'CLOSE_EDIT_TASK_DIALOG': 'editTaskDialog',
    'OPEN_DELETE_TASK_DIALOG': 'deleteTaskDialog',
    'CLOSE_DELETE_TASK_DIALOG': 'deleteTaskDialog',
};

const dialogReducerEdited = (state: StateProps, action: Action): StateProps => {
    const stateKey = actionToStateKey[action.type];
    if (!stateKey) return state;

    const isOpenAction = action.type.startsWith("OPEN");
    
    return {
        ...state,
        [stateKey]: {
        ...state[stateKey],
        isVisible: isOpenAction,
        ...action.payload,
        },
    };
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

    const [state, dispatch] = useReducer(dialogReducerEdited, initState);

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