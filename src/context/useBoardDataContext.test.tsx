import { boardReducer, Action } from './useBoardDataContext'; // Adjust the import path
import { Board } from '@/lib/type';; // Adjust the import path

describe('boardReducer', () => {
    const initialState: Board | null = {
        id: "board1",
        name: 'Test Board',
        tasks: [
            { id: 'task1', title: 'Task 1', description: 'Desc 1', subtasks: [], statusId: 'status1' },
            { id: 'task2', title: 'Task 2', description: 'Desc 2', subtasks: [{ id: 'subtask1', title: 'Subtask 1', isCompleted: false }], statusId: 'status2' },
        ],
        statusList: [{ id: 'status1', value: 'Todo' }, { id: 'status2', value: 'Done' }],
    };

    it('should handle INITIAL_BOARD', () => {
        const action: Action = { type: 'INITIAL_BOARD', payload: { id: '2', name: 'New Board', tasks: [], statusList: [] } };
        const result = boardReducer(null, action);
        expect(result).toEqual(action.payload);
    });

    it('should handle UPDATE_STATUS_LIST', () => {
        const action: Action = { type: 'UPDATE_STATUS_LIST', payload: [{ id: 'status1', value: 'Todo' }] };
        const result = boardReducer(initialState, action);
        expect(result?.statusList).toEqual(action.payload);
    });

    it('should handle UPDATE_NAME', () => {
        const newName = 'Updated Board Name';
        const action: Action = { type: 'UPDATE_NAME', payload: newName };
        const result = boardReducer(initialState, action);
        expect(result?.name).toBe(newName);
    });

    it('should handle ADD_TASK', () => {
        const newTask = { id: 'task1', title: 'New Task', description: '', statusId: 'status1', subtasks: [] };
        const action: Action = { type: 'ADD_TASK', payload: newTask };
        const result = boardReducer(initialState, action);
        expect(result?.tasks).toContainEqual(newTask);
    });

    it('should handle DELETE_TASK', () => {
        const stateWithTask: Board = { ...initialState, tasks: [{ id: 'task1', title: 'Task to Delete', description: '', statusId: 'status1', subtasks: [] }] };
        const action: Action = { type: 'DELETE_TASK', payload: { taskId: 'task1' } };
        const result = boardReducer(stateWithTask, action);
        expect(result?.tasks.length).toBe(0);
    });

    // Example for UPDATE_TASK
    it('should handle UPDATE_TASK', () => {
        const taskToUpdate = { id: 'task1', title: 'Updated Task', description: '', statusId: 'status1', subtasks: [] };
        const stateWithTask: Board = { ...initialState, tasks: [{ id: 'task1', title: 'Original Task', description: '', statusId: 'status1', subtasks: [] }] };
        const action: Action = { type: 'UPDATE_TASK', payload: taskToUpdate };
        const result = boardReducer(stateWithTask, action);
        expect(result?.tasks).toContainEqual(taskToUpdate);
    });

    it('handles UPDATE_TASK_STATUS_ID action correctly', () => {
        const taskId = 'task1';
        const newStatusId = 'status2'; // Moving Task 1 to 'Done'
        const action: Action = { type: 'UPDATE_TASK_STATUS_ID', payload: { taskId, statusId: newStatusId } };
        const newState = boardReducer(initialState, action);

        const taskWithUpdatedStatus = newState?.tasks.find(task => task.id === taskId);
        expect(taskWithUpdatedStatus?.statusId).toEqual(newStatusId);
    });

    it('handles UPDATE_SUBTASK action correctly', () => {
        const taskId = 'task2';
        const subtaskId = 'subtask1';
        const isCompleted = true; // Marking the subtask as completed
        const action: Action = { type: 'UPDATE_SUBTASK', payload: { taskId, subtaskId, isCompleted } };
        const newState = boardReducer(initialState, action);

        const taskWithUpdatedSubtask = newState?.tasks.find(task => task.id === taskId);
        const updatedSubtask = taskWithUpdatedSubtask?.subtasks.find(subtask => subtask.id === subtaskId);
        expect(updatedSubtask?.isCompleted).toEqual(isCompleted);
    });
});
