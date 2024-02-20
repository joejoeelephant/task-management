import React, {  CSSProperties, useCallback, useEffect, useState } from 'react'
import Dialog from './Dialog'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'
import { Task, Subtask, InputTextProps } from '@/lib/type'
import InputTextItem from './InputTextItem'
import InputTextAreaItem from './InputTextAreaItem'
import InputSelect from './InputSelect'
import { validateRequired } from '@/utils/FormValidate.utils'
import { v4 as uuidv4 } from 'uuid';
import { useEditTaskForm } from '@/hooks/useEditTaskForm'
import { useBoardData } from '@/context/useBoardDataContext'
import { updateTask as updateTaskToLocal } from '@/localAPI/TaskApi'

type Props = {
    id: string;
    isVisible: boolean;
    closeDialog: () => void;
}


export default function EditTaskDialog({isVisible, closeDialog, id}: Props) {
    const {state, dispatch} = useBoardData()
    const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined)
    const {
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
    } = useEditTaskForm();

    useEffect(() => {
        if(!state) return
        const task = state.tasks.find(item => item.id === id)
        if(!task) return
        setCurrentTask(task)
        setTaskTitle({
            id: uuidv4(),
            value: task.title,
            valid: true,// must be true
            shouldValidate: false,
        })
        setDescription({
            id: uuidv4(),
            value: task.description,
            valid: true,// must be true
            shouldValidate: false,
        })
        setSubtasks(() => {
            return task.subtasks.map(item => {
                return {
                    id: item.id,
                    value: item.title,
                    valid: true,
                    shouldValidate: false,
                }
            })
        })
        setColumns(state.statusList)
        setStatusId(task.statusId)
    }, [state, setColumns, id, setTaskTitle, setDescription, setSubtasks, setStatusId])

    function prepareUpdatedTaskData(currentTask: Task, taskTitle: InputTextProps, description: InputTextProps, statusId: string, subtasks: InputTextProps[]): Task {
        const updatedSubTasks: Subtask[] = subtasks.map(item => {
            const temp = currentTask.subtasks.find((el) => el.id === item.id)
            return (
                temp
                ? {...temp, title: item.value}
                : {
                    id: uuidv4(),
                    title: item.value,
                    isCompleted: false
                })
        })
        const updatedTaskData: Task = {
            id: currentTask.id,
            title: taskTitle.value,
            description: description.value,
            subtasks: updatedSubTasks,
            statusId
        }
        return updatedTaskData;
    }

    const updateTask = useCallback( () => {
        if(!currentTask || !state) return;
        notifySubtasks()
        notifyTaskTitle()
        if(!taskTitle.valid || !validateSubtasks()) return;
        
        const updatedTaskData: Task = prepareUpdatedTaskData(currentTask, taskTitle, description, statusId, subtasks)

        updateTaskToLocal(state.id, updatedTaskData)
        
        dispatch({type: "UPDATE_TASK", payload: updatedTaskData})
        closeDialog()
    }, [state, currentTask, description, taskTitle, subtasks, dispatch, notifySubtasks, notifyTaskTitle, validateSubtasks, statusId, closeDialog])
    
    
    return (
        <Dialog isVisible={isVisible} closeDialog={closeDialog}>
            <div>
                <div className='text-heading-lg'>Edit Task</div>
                <div className='mt-6 flow'>
                    <div>
                        <label className='text-paragraph-xs font-bold text-secondary-color'>Task Name</label>
                        <div className='mt-2'>
                            <InputTextItem 
                                id={taskTitle.id} 
                                value={taskTitle.value}
                                shouldValidate={taskTitle.shouldValidate}
                                validateFunc={validateRequired} 
                                onBlur={updateTaskTitle} 
                                placeholder='e.g Take coffee break'
                                name='taskTitle'
                            />
                        </div>
                    </div>
                    <div>
                        <label className='text-paragraph-xs font-bold text-secondary-color'>Description</label>
                        <div className='mt-2'>
                            <InputTextAreaItem 
                                id={description.id}
                                rows={5}
                                value={description.value}
                                shouldValidate={description.shouldValidate}
                                onBlur={updateDescription} 
                                placeholder='e.g Take coffee break'
                                name='description'
                            />
                        </div> 
                    </div>
                    <div>
                        <label className='text-paragraph-xs font-bold text-secondary-color'>Subtasks</label>
                        <div className='mt-2 max-h-28 md:max-h-40 overflow-auto scroller-decoration grid gap-3'>
                            {
                                subtasks.map(item => {
                                    return (
                                        <div key={item.id} className='flex items-center gap-4'>
                                            <div className='flex-1'>
                                                <InputTextItem 
                                                    id={item.id} 
                                                    value={item.value}
                                                    shouldValidate={item.shouldValidate}
                                                    validateFunc={validateRequired} 
                                                    onBlur={updateSubTaskById} 
                                                    placeholder='e.g. Make coffee'
                                                />
                                            </div>
                                            <div onClick={() => {deleteSubtaskById(item.id)}} className={`w-4 h-4  bg-medium-grey icon-box hover:bg-alert-color cursor-pointer`} style={{'--mask-image-url': 'url("/images/icon-cross.svg")'} as CSSProperties}>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <SecondaryButton text='+ Add New Subtask' onClick={addSubTask} />
                    </div>
                    <div>
                        <label className='text-paragraph-xs font-bold text-secondary-color'>Current Status</label>
                        <InputSelect options={columns} onChange={(option) => { setStatusId(option.id)}} initValue={statusId}/>
                    </div>
                    <div>
                        <PrimaryButton text='Save Changes' onClick={updateTask}></PrimaryButton>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
