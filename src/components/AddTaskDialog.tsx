import React, {  CSSProperties, useCallback, useEffect } from 'react'
import Dialog from './Dialog'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'
import { Task, Subtask } from '@/lib/type'
import InputTextItem from './InputTextItem'
import InputTextAreaItem from './InputTextAreaItem'
import InputSelect from './InputSelect'
import { validateRequired } from '@/utils/FormValidate.utils'
import { v4 as uuidv4 } from 'uuid';
import { useEditTaskForm } from '@/hooks/useEditTaskForm'
import { addTask as addTaskToLocal } from '@/localAPI/TaskApi'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { addTask } from '@/lib/features/tasks/tasksSlice'
type Props = {
    isVisible: boolean;
    closeDialog: () => void;
}


export default function AddTaskDialog({isVisible, closeDialog}: Props) {
    const storeDispatch = useAppDispatch()
    const statusListState = useAppSelector(state => state.statusList)
    const boardInfoState = useAppSelector(state => state.boardInfo)
    const {
        taskTitle, 
        description, 
        subtasks,
        statusId,setStatusId,
        columns, setColumns,
        updateTaskTitle,
        notifyTaskTitle,
        updateDescription,
        addSubTask,
        validateSubtasks,
        notifySubtasks,
        deleteSubtaskById,
        updateSubTaskById,
        resetEditTaskForm
    } = useEditTaskForm();

    useEffect(() => {
        statusListState.statusList.length && setStatusId(statusListState.statusList[0].id)
        setColumns(statusListState.statusList);
    }, [statusListState, setColumns, setStatusId])

    const saveTask = useCallback(() => {
        const subtasksData: Subtask[] = subtasks.map(item => {
            return {
                id: uuidv4(),
                title: item.value,
                isCompleted: false
            }
        })
        const taskData = {
            id: '',
            title: taskTitle.value, 
            description: description.value,
            subtasks: subtasksData, 
            statusId: statusId
        }
        const id = addTaskToLocal(boardInfoState.id, taskData)
        storeDispatch(addTask({...taskData, id: id}))
    }, [taskTitle, statusId, description,subtasks, boardInfoState, storeDispatch])

    const createTask = () => {
        notifySubtasks()
        notifyTaskTitle()
        if(!taskTitle.valid || !validateSubtasks()) return;
        saveTask()
        resetEditTaskForm()
        closeDialog()
    }
    
    
    return (
        <Dialog isVisible={isVisible} closeDialog={closeDialog}>
            <div>
                <div className='text-heading-lg'>Add New Task</div>
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
                        <InputSelect options={columns} onChange={(option) => {setStatusId(option.id)}}/>
                    </div>
                    <div>
                        <PrimaryButton text='Create Task' onClick={createTask}></PrimaryButton>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
