import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { InputTextProps, InputTextAreaProps, Task, Subtask, StatusItem} from '@/lib/type'

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

    const resetEditTaskForm = () => {
        setTaskTitle({
            id: uuidv4(),
            value: "",
            valid: false,
            shouldValidate: false,
        })

        setDescription({
            id: uuidv4(),
            value: "",
            valid: false,
            shouldValidate: false,
        })

        setSubtasks([])

        setColumns([])

        setStatusId("")
    }

    const initTaskTitle = (title: string) => {
        setTaskTitle({
            id: uuidv4(),
            value: title,
            valid: true,// must be true
            shouldValidate: false,
        })
    }

    const initDescription = (description: string) => {
        setDescription({
            id: uuidv4(),
            value: description,
            valid: true,// must be true
            shouldValidate: false,
        })
    }

    const initSubTasks = (subtasks: Subtask[]) => {
        setSubtasks(() => {
            return subtasks.map(item => {
                return {
                    id: item.id,
                    value: item.title,
                    valid: true,
                    shouldValidate: false,
                }
            })
        })
    }

    const initColumns = useCallback((statusList: StatusItem[]) => {
        setColumns(statusList)
    }, [])

    const initEditTaskForm = useCallback((taskData: Task, statusList: StatusItem[]) => {
        initTaskTitle(taskData.title)
        initDescription(taskData.description)
        initSubTasks(taskData.subtasks)
        setStatusId(taskData.statusId)
        initColumns(statusList)
    }, [initColumns])

    return {
        taskTitle, setTaskTitle,
        description, setDescription,
        subtasks, setSubtasks,
        columns, setColumns,
        initColumns,
        statusId, setStatusId,
        initEditTaskForm,
        updateTaskTitle,
        notifyTaskTitle,
        updateDescription,
        addSubTask,
        validateSubtasks,
        notifySubtasks,
        deleteSubtaskById,
        updateSubTaskById,
        resetEditTaskForm
    }
}
