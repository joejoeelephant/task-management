import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/lib/type';

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Set the entire list of tasks
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        // Add a single task
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        // Delete a task by its id
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        // Update a task by its id
        updateTask: (state, action: PayloadAction<Task>) => {

            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        updateSubTaskIsCompleted: (state, action: PayloadAction<{taskId: string, subtaskId: string, isCompleted: boolean}>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.taskId);
            if (index !== -1) {
                const tempTask = state.tasks[index]
                const newTask: Task = {...tempTask, subtasks: tempTask.subtasks.map(item => item.id === action.payload.subtaskId ? {...item, isCompleted: action.payload.isCompleted} : item)}
                state.tasks[index] = newTask;
            }
        }
    },
});

export const { setTasks, addTask, deleteTask, updateTask, updateSubTaskIsCompleted } = tasksSlice.actions;
export default tasksSlice.reducer;
