import React, { useCallback, useEffect, useState } from 'react'
import Dialog from './Dialog'
import SecondaryButton from './SecondaryButton'
import AlertButton from './AlertButton'
import { deleteTask as deleteTaskApi } from '@/localAPI/TaskApi'
import { Task } from '@/lib/type'
import { useAppSelector, useAppDispatch } from '@/hooks/storeHooks'
import { deleteTask } from '@/lib/features/tasks/tasksSlice'
type Props = {
    id: string;
    isVisible: boolean;
    closeDialog: () => void;
}

export default function DeleteTaskDialog({closeDialog, isVisible, id}: Props) {
    const [taskData, setTaskData] = useState<Task | undefined>(undefined)
    const tasksState = useAppSelector(state => state.tasks)
    const boardInfoState = useAppSelector(state => state.boardInfo)
    const storeDispatch = useAppDispatch()

    useEffect(() => {
        const task = tasksState.tasks.find(item => item.id === id)
        setTaskData(task)
    }, [id, tasksState])

    const deleteTaskHandle = useCallback(() => {
        deleteTaskApi(boardInfoState.id, id)
        storeDispatch(deleteTask(id))
        closeDialog()
    }, [id, storeDispatch, boardInfoState, closeDialog])
    
    return (
        <Dialog isVisible={isVisible} closeDialog={closeDialog}>
            <div className=''>
                <div className='text-danger-color text-heading-lg'>Delete this task?</div>
                <div className='text-secondary-color text-paragraph-medium mt-6'>
                    Are you sure you want to delete the ‘{taskData !== undefined && taskData.title}’ task and its subtasks? This action cannot be reversed.
                </div>
                <div className='mt-6 grid md:grid-cols-2 gap-6'>
                    <AlertButton text='Delete' onClick={deleteTaskHandle} />
                    <SecondaryButton text='Cancle' onClick={closeDialog} />
                </div>
            </div>
        </Dialog>
    )
}
