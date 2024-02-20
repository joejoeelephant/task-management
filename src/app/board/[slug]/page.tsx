'use client'
import React, {useEffect, useState} from 'react'
import { useBoardData } from '@/context/useBoardDataContext'
import ColumnEmptyScreen from '@/components/ColumnEmptyScreen';
import DragScrollContainer from '@/components/DragScrollContainer';
import { Task, StatusItem } from '@/lib/type';
import TaskItem from '@/components/TaskItem';
import { colors } from '@/lib/colors';
import { useDialogs } from '@/context/useDialogsContext';
import BoardNotFoundScreen from '@/components/BoardNotFoundScreen';

export default function Page() {
    const {state, loading} = useBoardData()
    const [columns, setColumns] = useState<StatusItem[]>([])
    const [columnColors, setColumnColors] = useState<string[]>([])
    const [tasks, setTasks] = useState<Task[]>([])
    const {dispatch} = useDialogs()
    
    useEffect(() => {
        if(!state) return;
        setColumns(state.statusList)
        setTasks(state.tasks)
    }, [state])

    useEffect(() => {
        setColumnColors(() => {
            return colors.slice(0, columns.length).map(item => `bg-${item}-400`)
        })
    }, [columns])

    if(!loading && !state) {
        return (
            <BoardNotFoundScreen/>
        )
    }

    if(!loading && state && state.statusList.length < 1) {
        return (<ColumnEmptyScreen/>)
    }

    return (
        <>
            <DragScrollContainer>
                <div className={`absolute min-w-fit flex gap-6 p-4 md:p-6 min-h-full ${!loading ? '' : 'hidden'}`}>
                    {
                        columns.map((item, index) => {
                            return (
                                <div key={index} className='self-stretch w-72 min-h-full '>
                                    <div className='flex gap-2 items-center'>
                                        <div className={`w-4 h-4 rounded-full ${columnColors[index]}`}></div>
                                        <div className=' text-heading-sm uppercase text-secondary-color'>{item.value}({tasks.filter(el => el.statusId === item.id).length})</div>
                                    </div>
                                    <div className='flow pt-8'>
                                        {
                                            tasks.filter(el => el.statusId === item.id).map(el => {
                                                return (
                                                    <TaskItem key={el.id} taskData={el} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div onClick={() => {dispatch({type: "OPEN_EDIT_BOARD_DIALOG"})}} className='bg-light-medium-grey dark:bg-dark-grey select-none self-stretch w-72 min-h-full text-heading-xl text-secondary-color flex justify-center items-center hover:cursor-pointer'>
                        + New Column
                    </div>
                </div>
            </DragScrollContainer>
        </>
    )
}
