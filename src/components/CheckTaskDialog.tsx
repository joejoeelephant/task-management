import React, { useState, useEffect, useCallback, useRef } from 'react'
import Dialog from './Dialog'
import Image from 'next/image'
import CheckListItem from './CheckListItem'
import InputSelect from './InputSelect'
import { Task, StatusItem } from '@/lib/type'
import { updateSubTaskStatus, updateTask } from '@/localAPI/TaskApi'
import PopMenu from './PopMenu'
import { useDialogs } from '@/context/useDialogsContext'
import { useAppSelector, useAppDispatch } from '@/hooks/storeHooks'
import { updateSubTaskIsCompleted, updateTask as updateTaskAction } from '@/lib/features/tasks/tasksSlice'
type Props = {
    id: string;
    isVisible: boolean;
    closeDialog: () => void;
}

export default function CheckTaskDialog({id, isVisible, closeDialog}: Props) {
    const {dispatch: dialogsDiapatch} = useDialogs()
    const [columns, setColumns] = useState<StatusItem[]>([])
    const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined)
    const PopMenuTriggerRef = useRef<HTMLDivElement | null>(null)
    const [popMenuVisible, setPopMenuVisible] = useState(false)
    const storeDispatch = useAppDispatch()
    const statusListState = useAppSelector(state => state.statusList)
    const tasksState = useAppSelector(state => state.tasks)
    const boardInfoState = useAppSelector(state => state.boardInfo)

    useEffect(() => {
        const tempTask = tasksState.tasks.find(item => item.id === id)
        if(!tempTask) return
        setCurrentTask(tempTask)
        setColumns(statusListState.statusList)
    }, [tasksState, statusListState, id])

    const subtaskChange = useCallback((subtaskId: string, isCompleted: boolean) => {
        storeDispatch(updateSubTaskIsCompleted({taskId: id, subtaskId, isCompleted}))
        updateSubTaskStatus(boardInfoState.id, id, subtaskId,  isCompleted)
    }, [id, boardInfoState, storeDispatch])

    const taskStatusIdChange = useCallback((statusId: string) => {
        if(!currentTask ) return;
        storeDispatch(updateTaskAction({...currentTask, statusId}))
        updateTask(boardInfoState.id, {...currentTask, statusId})
    }, [ currentTask, storeDispatch, boardInfoState])

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
