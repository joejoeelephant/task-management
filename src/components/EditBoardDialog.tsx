'use client'
import React, { CSSProperties, useCallback, useEffect } from 'react'
import Dialog from './Dialog'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'
import InputTextItem from './InputTextItem'
import { validateRequired } from '@/utils/FormValidate.utils'
import { useEditBoardForm } from '@/hooks/useEditBoardForm'
import { updateBoard } from '@/localAPI/BoardApi'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { updateBoardNav } from '@/lib/features/boardNavigationList/boardNavigationListSlice'
import { setStatusList } from '@/lib/features/statusList/statusListSlice'
import { updateBoardName } from '@/lib/features/boardInfo/boardInfo'
type Props = {
    isVisible: boolean;
    closeDialog: () => void;
}

export default function EditBoardDialog({isVisible, closeDialog}: Props) {
    const storeDispatch = useAppDispatch()
    const boardInfoState = useAppSelector(state => state.boardInfo)
    const {statusList} = useAppSelector(state => state.statusList)

    const {
        boardName, 
        columns,
        boardNameChange,
        notifyBoardName,
        notifyColumns,
        updateColumnById,
        validateColumns,
        validateColumn,
        addColumn,
        deleteColumnById ,
        initBoardName,
        initColumns
    } = useEditBoardForm()

    const initBoardDialog = useCallback(() => {
        initBoardName(boardInfoState.name)

        initColumns(statusList)
    }, [boardInfoState, statusList, initBoardName, initColumns])

    useEffect(() => {
        initBoardDialog()
    }, [initBoardDialog]);

    const editBoard = useCallback(() => {
        if (!boardName.valid || !validateColumns()) return;
        notifyBoardName()
        notifyColumns()
        storeDispatch(setStatusList(columns.map(column => {return {id: column.id, value: column.value}})))
        storeDispatch(updateBoardNav({ id: boardInfoState.id, name: boardName.value }))
        storeDispatch(updateBoardName(boardName.value))
        updateBoard({name: boardName.value, statusList: columns.map(column => {return {id: column.id, value: column.value}}), tasks: [], id: boardInfoState.id });
        closeDialog()
    }, [boardName, columns, boardInfoState, storeDispatch, validateColumns, notifyBoardName, notifyColumns, closeDialog]);
    

    return (
        <Dialog isVisible={isVisible} closeDialog={closeDialog}>
            <div>
                <div className=' text-heading-lg'>Edit Board</div>
                <div className='mt-6'>
                    <div>
                        <label className='text-paragraph-xs font-bold text-secondary-color'>Board Name</label>
                        <div className='mt-2'>
                            <InputTextItem 
                                id={boardName.id} 
                                value={boardName.value}
                                shouldValidate={boardName.shouldValidate}
                                validateFunc={validateRequired} 
                                onBlur={boardNameChange} 
                                placeholder='e.g WebDesign'
                                name='boardName'
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label className='text-paragraph-xs font-bold text-secondary-color'>Board Columns</label>
                        <div className='mt-2 max-h-48 overflow-auto scroller-decoration grid gap-3'>
                            {
                                columns.map(item => {
                                    return (
                                        <div key={item.id} className='flex items-center gap-4'>
                                            <div className='flex-1'>
                                                <InputTextItem 
                                                    id={item.id} 
                                                    value={item.value}
                                                    shouldValidate={item.shouldValidate}
                                                    validateFunc={validateColumn} 
                                                    onBlur={updateColumnById} 
                                                    placeholder='e.g todo'
                                                />
                                            </div>
                                            <div onClick={() => {deleteColumnById(item.id)}} className={`w-4 h-4  bg-medium-grey icon-box hover:bg-alert-color cursor-pointer`} style={{'--mask-image-url': 'url("/images/icon-cross.svg")'} as CSSProperties}>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='mt-6 grid lg:grid-cols-2 gap-6'>
                        <SecondaryButton text='+ Add New Column' onClick={addColumn} />
                        <PrimaryButton text='Save Changes' onClick={editBoard} />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
