'use client'
import React, { useState, CSSProperties, useCallback, useEffect } from 'react'
import Dialog from './Dialog'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'
import InputTextItem from './InputTextItem'
import { validateRequired } from '@/utils/FormValidate.utils'
import { v4 as uuidv4 } from 'uuid';
import { useBoardNavList } from '@/context/useBoardNavContext'
import { useBoardData } from '@/context/useBoardDataContext'
import { useEditBoardForm } from '@/hooks/useEditBoardForm'
import { updateBoard } from '@/localAPI/BoardApi'
type Props = {
    isVisible: boolean;
    closeDialog: () => void;
}

export default function EditBoardDialog({isVisible, closeDialog}: Props) {
    const {dispatch: boardNavListDispatch} = useBoardNavList()
    const {state: boardData,dispatch: boardDataDispatch} = useBoardData()

    const {
        boardName, 
        columns,
        setBoardName, 
        setColumns, 
        boardNameChange,
        notifyBoardName,
        notifyColumns,
        updateColumnById,
        validateColumns,
        validateColumn,
        addColumn,
        deleteColumnById 
    } = useEditBoardForm()

    const initBoardDialog = useCallback(() => {
        if (!boardData) return;
        setBoardName({
            id: uuidv4(),
            value: boardData.name,
            valid: true,// must be true
            shouldValidate: false,
        });
        setColumns(boardData.statusList.map(item => ({
            id: item.id,
            value: item.value,
            valid: true,// must be true
            shouldValidate: false,
        })));
    }, [boardData, setBoardName, setColumns])

    useEffect(() => {
        initBoardDialog()
    }, [initBoardDialog]);

    const editBoard = useCallback(() => {
        if (!boardName.valid || !validateColumns() || !boardData) return;
        notifyBoardName()
        notifyColumns()
        boardDataDispatch({ type: "UPDATE_NAME", payload: boardName.value });
        boardDataDispatch({ type: "UPDATE_STATUS_LIST", payload: columns.map(column => {return {id: column.id, value: column.value}}) });
        boardNavListDispatch({ type: "UPDATE_BOARD_NAME", payload: { id: boardData.id, name: boardName.value } });
        updateBoard({ ...boardData, name: boardName.value, statusList: columns.map(column => {return {id: column.id, value: column.value}}) });
    }, [boardName, columns, boardData, boardDataDispatch, boardNavListDispatch, validateColumns, notifyBoardName, notifyColumns]);
    

    return (
        <Dialog isVisible={isVisible} closeDialog={closeDialog}>
            {
                !boardData && "error: get boardData"
            }
            {
                boardData &&
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
            }
        </Dialog>
    )
}
