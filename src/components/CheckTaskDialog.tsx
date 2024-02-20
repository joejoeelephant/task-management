import React, { useState, useEffect, useCallback, useRef } from 'react'
import Dialog from './Dialog'
import Image from 'next/image'
import CheckListItem from './CheckListItem'
import InputSelect from './InputSelect'
import { useBoardData } from '@/context/useBoardDataContext'
import { Task, StatusItem } from '@/lib/type'
import { updateSubTaskStatus, updateTask } from '@/localAPI/TaskApi'
import PopMenu from './PopMenu'
import { useDialogs } from '@/context/useDialogsContext'

type Props = {
    id: string;
    isVisible: boolean;
    closeDialog: () => void;
}

export default function CheckTaskDialog({id, isVisible, closeDialog}: Props) {
    const {state, dispatch} = useBoardData()
    const {dispatch: dialogsDiapatch} = useDialogs()
    const [columns, setColumns] = useState<StatusItem[]>([])
    const [statusId, setStatusId] = useState("")
    const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined)
    const PopMenuTriggerRef = useRef<HTMLDivElement | null>(null)
    const [popMenuVisible, setPopMenuVisible] = useState(false)

    useEffect(() => {
        if(!state) return;
        const tempTask = state.tasks.find(item => item.id === id)
        setCurrentTask(tempTask)
        state.statusList.length > 0 && setColumns(state.statusList)
        tempTask?.statusId && setStatusId(tempTask.statusId)
    }, [state, id])

    const subtaskChange = useCallback((id: string, value: boolean) => {
        if(!currentTask || !state) return;
        dispatch({type: "UPDATE_SUBTASK", payload: {taskId: currentTask.id, subtaskId: id, isCompleted: value}})
        updateSubTaskStatus(state.id, currentTask.id, id, value)
    }, [state, currentTask, dispatch])

    const taskStatusIdChange = useCallback((statusId: string) => {
        if(!currentTask || !state) return;
        dispatch({type: "UPDATE_TASK_STATUS_ID", payload: {taskId: currentTask.id, statusId: statusId}})
        updateTask(state.id, {...currentTask, statusId: statusId})
    }, [state, currentTask, dispatch])

    const closePopMenu = () => {
        setPopMenuVisible(false)
    }

    const openEditTaskDialog = useCallback(() => {
        dialogsDiapatch({type: "OPEN_EDIT_TASK_DIALOG", payload: {id}})
        dialogsDiapatch({type: "CLOSE_CHECK_TASK_DIALOG"})
        closePopMenu()
    }, [id, dialogsDiapatch])

    const openDeleteTaskDialog = useCallback(() => {
        dialogsDiapatch({type: "OPEN_DELETE_TASK_DIALOG", payload: {id}})
        dialogsDiapatch({type: "CLOSE_CHECK_TASK_DIALOG"})
        closePopMenu()
    }, [id, dialogsDiapatch])


    return (
        <>
            <Dialog isVisible={isVisible} closeDialog={() => { closePopMenu();closeDialog()}}>
                {
                    !currentTask && 
                    <div>
                        task undefined
                    </div>
                }
                {
                    currentTask &&
                    <div>
                        <div className='text-heading-lg flex justify-between items-center'>
                            <div>
                                {currentTask.title}
                            </div>
                            <div className='px-2 cursor-pointer shrink-0 select-none' ref={PopMenuTriggerRef} onClick={() => {setPopMenuVisible(prev => !prev)}}>
                                <Image src={'/images/icon-vertical-ellipsis.svg'} alt='ellipsis' width={5} height={20} className='w-1'></Image>
                            </div>
                        </div>
                        <div className='mt-6 flow'>
                            <div className=' text-paragraph-medium text-secondary-color'>
                                {
                                    currentTask.description
                                }
                            </div>
                            <div>
                                <label className='text-paragraph-xs font-bold text-secondary-color'>
                                    Subtasks ({currentTask.subtasks.filter(item => item.isCompleted).length} of {currentTask.subtasks.length})
                                </label>
                                <div className='mt-4 grid gap-2 max-h-28 md:max-h-40 overflow-auto scroller-decoration'>
                                    {
                                        currentTask &&
                                        currentTask.subtasks.map(item => {
                                            return (
                                                <CheckListItem key={item.id} id={item.id} name='subtask' value={item.title} checked={item.isCompleted} onChange={subtaskChange}></CheckListItem>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div>
                                <label className='text-paragraph-xs font-bold text-secondary-color'>Current Status</label>
                                <div className='mt-4'>
                                    <InputSelect options={columns} initValue={currentTask.statusId} onChange={(option) => {taskStatusIdChange(option.id)}}/>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                }
            </Dialog>
            <PopMenu key={String(popMenuVisible)} triggerRef={PopMenuTriggerRef} isVisible={popMenuVisible}>
                <div className='text-paragraph-medium bg-white dark:bg-dark-grey p-5 md:w-48' >
                    <div className='text-secondary-color cursor-pointer' onClick={openEditTaskDialog}>
                        Edit Task
                    </div>
                    <div className='text-alert-color mt-5 cursor-pointer' onClick={openDeleteTaskDialog}>
                        Delete Task
                    </div>
                </div>
            </PopMenu>
        </>
    )
}
