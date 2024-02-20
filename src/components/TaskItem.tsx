import React from 'react'
import { Task } from '@/lib/type'
import { useDialogs } from '@/context/useDialogsContext'
export default function TaskItem({taskData}: {taskData: Task}) {
    const {dispatch} = useDialogs()
    const openCheckTaskDialog = () => {
        dispatch({type: "OPEN_CHECK_TASK_DIALOG", payload: {id: taskData.id}})
    }
    return (
        <div onClick={openCheckTaskDialog} className='px-4 py-6 rounded-xl shadow-lg shadow-light-medium-grey dark:shadow-very-dark-grey bg-white dark:bg-dark-grey cursor-pointer select-none'>
            <div className='text-heading-medium text-primary-heading-color dark:text-primary-dark-heading-color'>
                {taskData.title}
            </div>
            <div className='mt-4 text-paragraph-medium text-secondary-color'>
                {taskData.subtasks.filter(item => item.isCompleted).length} of {taskData.subtasks.length} subtasks
            </div>
        </div>
    )
}
