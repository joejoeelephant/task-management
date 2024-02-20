import React, { useCallback, useEffect, useState } from 'react'
import Dialog from './Dialog'
import SecondaryButton from './SecondaryButton'
import AlertButton from './AlertButton'
import { useBoardData } from '@/context/useBoardDataContext'
import { deleteTask } from '@/localAPI/TaskApi'
import { useParams } from 'next/navigation'
import { Task } from '@/lib/type'

type Props = {
    id: string;
    isVisible: boolean;
    closeDialog: () => void;
}

export default function DeleteTaskDialog({closeDialog, isVisible, id}: Props) {
    const {state, dispatch} = useBoardData()
    const [taskData, setTaskData] = useState<Task | undefined>(undefined)

    useEffect(() => {
        if(!state) return;
        const task = state.tasks.find(item => item.id === id)
        setTaskData(task)
    }, [state, id])

    const deleteTaskHandle = useCallback(() => {
        if(!state) return;
        dispatch({type: "DELETE_TASK", payload: {taskId: id}})
        deleteTask(state.id, id)
        closeDialog()

    }, [state, id, dispatch, closeDialog])
    return (
        <Dialog isVisible={isVisible} closeDialog={closeDialog}>
            <div className=''>
                <div className='text-alert-color text-heading-lg'>Delete this task?</div>
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
