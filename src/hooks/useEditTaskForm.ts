import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { InputTextProps, InputTextAreaProps, Task,  Status} from '@/lib/type'

export function useEditTaskForm() {
    const [taskTitle, setTaskTitle] = useState<InputTextProps>({
        id: uuidv4(),
        value: "",
        valid: false,
        shouldValidate: false,
    });

    const [description, setDescription] = useState<InputTextProps>({
        id: uuidv4(),
        value: "",
        valid: false,
        shouldValidate: false,
    });

    const [subtasks, setSubtasks] = useState<InputTextProps[]>([])

    const [columns, setColumns] = useState<{id: string, value: string}[]>([]);


    const [statusId, setStatusId] = useState('')

    const updateTaskTitle = ({value, valid}:InputTextProps) => {
        setTaskTitle(prev => {return {...prev, value, valid}})
    }

    const notifyTaskTitle = () => {
        setTaskTitle(prev => {return {...prev, shouldValidate: true}})
    }

    const updateSubTaskById = ({id, value, valid}:InputTextProps) => {
        setSubtasks(prev => {
            return prev.map(item => item.id === id ? {...item, value, valid} : item)
        })
    }

    const deleteSubtaskById = (id: string) => {
        setSubtasks(prev => {
            return prev.filter(item => item.id !== id)
        })
    }

    const notifySubtasks = () => {
        setSubtasks(prev => {
            return prev.map(item => {return {...item, shouldValidate: true}})
        })
    }

    const validateSubtasks = useCallback((): Boolean => {
        const result = subtasks.find(item => !item.valid)
        return !Boolean(result)
    }, [subtasks])

    const addSubTask = () => {
        notifySubtasks()
        if(!validateSubtasks() && subtasks.length > 0) return;
        setSubtasks(prev => {
            return [...prev, {id: uuidv4(), value: '', valid: false, shouldValidate: false}]
        })
    }

    const updateDescription = ({value, valid}:InputTextAreaProps) => {
        setDescription(prev => {return {...prev, value, valid}})
    }

    return {
        taskTitle, setTaskTitle,
        description, setDescription,
        subtasks, setSubtasks,
        columns, setColumns,
        statusId, setStatusId, 
        updateTaskTitle,
        notifyTaskTitle,
        updateDescription,
        addSubTask,
        validateSubtasks,
        notifySubtasks,
        deleteSubtaskById,
        updateSubTaskById
    }
}
