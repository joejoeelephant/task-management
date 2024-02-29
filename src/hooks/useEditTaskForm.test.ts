import { renderHook, act } from "@testing-library/react";
import { useEditTaskForm } from "./useEditTaskForm";
import { Task } from "@/lib/type";

describe('useEditTaskForm', () => {
    it('initializes with default values', () => {
        const { result } = renderHook(() => useEditTaskForm());
    
        expect(result.current.taskTitle.value).toBe("");
        expect(result.current.description.value).toBe("");
        expect(result.current.subtasks).toEqual([]);
        expect(result.current.columns).toEqual([]);
        expect(result.current.statusId).toBe("");
    });
  
    it('updates task title', () => {
        const { result } = renderHook(() => useEditTaskForm());
    
        act(() => {
            result.current.updateTaskTitle({ id: 'taskTitle1', value: 'New Task Title', valid: true });
        });
    
        expect(result.current.taskTitle.value).toBe('New Task Title');
        expect(result.current.taskTitle.valid).toBe(true);
    });
  
    it('adds and validates a subtask', () => {
        const { result } = renderHook(() => useEditTaskForm());
    
        act(() => {
            result.current.addSubTask();
        });
    
        expect(result.current.subtasks.length).toBe(1);
    
        act(() => {
            result.current.notifySubtasks();
        });
    
        const isValidBefore = result.current.validateSubtasks();
        expect(isValidBefore).toBe(false); // Should be invalid because the subtask is empty
    
        act(() => {
            result.current.updateSubTaskById({ id: result.current.subtasks[0].id, value: 'Subtask 1', valid: true });
        });
    
        const isValidAfter = result.current.validateSubtasks();
        expect(isValidAfter).toBe(true); // Should be valid now
    });
  
    it('updates description', () => {
        const { result } = renderHook(() => useEditTaskForm());
    
        act(() => {
            result.current.updateDescription({ id: 'desc1', value: 'Updated Description', valid: true });
        });
    
        expect(result.current.description.value).toBe('Updated Description');
        expect(result.current.description.valid).toBe(true);
    });
  
    it('deletes a subtask by id', () => {
        const { result } = renderHook(() => useEditTaskForm());
    
        // First, add a subtask
        act(() => {
            result.current.addSubTask();
        });
        
        const subtaskId = result.current.subtasks[0].id;
    
        // Delete the added subtask
        act(() => {
            result.current.deleteSubtaskById(subtaskId);
        });
    
        expect(result.current.subtasks.length).toBe(0);
    });
    
    it('notifies subtasks to validate', () => {
        const { result } = renderHook(() => useEditTaskForm());
    
        // Add a new subtask and update it without setting valid to true
        act(() => {
            result.current.addSubTask();
        });

        act(() => {
            result.current.updateSubTaskById({ id: result.current.subtasks[0].id, value: 'Incomplete Subtask', valid: false });
        })

    
        // Notify subtasks to trigger validation
        act(() => {
            result.current.notifySubtasks();
        });
    
        // Since subtask is not valid, validation should fail
        const isValid = result.current.validateSubtasks();
        expect(isValid).toBe(false);
    });
    
    it('updates statusId', () => {
        const { result } = renderHook(() => useEditTaskForm());
    
        // Set a new status ID
        act(() => {
            result.current.setStatusId('newStatusId');
        });
    
        expect(result.current.statusId).toBe('newStatusId');
    });

    it('reset EditTaskForm', () => {
        const { result } = renderHook(() => useEditTaskForm());
    
        // Set a new status ID
        act(() => {
            result.current.resetEditTaskForm();
        });
        
        expect(result.current.taskTitle.value).toBe('');
        expect(result.current.description.value).toBe('');
        expect(result.current.subtasks.length).toBe(0);
        expect(result.current.columns.length).toBe(0);
        expect(result.current.statusId).toBe('');
    });

    it('should initialize form with task data', () => {
        
        const taskData: Task = {
            id: "task1",
            title: 'Test Task',
            description: 'Test Description',
            subtasks: [
                { id: 'subtask1', title: 'Subtask 1', isCompleted: false },
                { id: 'subtask2', title: 'Subtask 2', isCompleted: false },
            ],
            statusId: 'status123',
        };
    
        // Render the hook in an isolated test environment
        const { result } = renderHook(() => useEditTaskForm());
    
        // Act to simulate running the initEditTaskForm function with the taskData
        act(() => {
            result.current.initEditTaskForm(taskData);
        });
        
        expect(result.current.taskTitle.value).toBe(taskData.title);
        expect(result.current.taskTitle.valid).toBe(true);

        expect(result.current.description.value).toBe(taskData.description);
        expect(result.current.description.valid).toBe(true);

        result.current.subtasks.map(item => {
            expect(item.valid).toBe(true)
        })

        expect(result.current.statusId).toBe(taskData.statusId);
      });
});