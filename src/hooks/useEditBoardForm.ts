// useEditBoardForm.ts
import { useState, useCallback } from 'react';
import { validateRequired } from '@/utils/FormValidate.utils';
import { v4 as uuidv4 } from 'uuid';
import { InputTextProps, StatusItem } from '@/lib/type'

export function useEditBoardForm() {

    const [boardName, setBoardName] = useState({
        id: uuidv4(),
        value: "",
        valid: false,
        shouldValidate: false,
    });

    const [columns, setColumns] = useState<InputTextProps[]>([]);

    
    
    const boardNameChange = ({value, valid}:InputTextProps) => {
        setBoardName(prev => {return {...prev, value, valid}})
    }

    const notifyBoardName = () => {
        setBoardName(prev => {return {...prev, shouldValidate: true}})
    }

    const updateColumnById = ({id, value, valid}:InputTextProps) => {
        setColumns(prev => {
            return prev.map(item => item.id === id ? {...item, value, valid} : item)
        })
    }

    const deleteColumnById = (id: string) => {
        setColumns(prev => {
            return prev.filter(item => item.id !== id)
        })
    }

    const notifyColumns = () => {
        setColumns(prev => {
            return prev.map(item => {return {...item, shouldValidate: true}})
        })
    }

    const validateColumn = useCallback((value: string, id?: string) => {
        let errMsg = validateRequired(value) || '';
        if(errMsg) return errMsg;
        if(!id) return "";
        let repeatColumn = columns.find(item => item.value === value && item.id !== id)
        if(repeatColumn) {
            errMsg = `column repeat "${value}"`
        }
        return errMsg;
    }, [columns])

    const validateColumns = useCallback((): Boolean => {
        const result = columns.find(item => !item.valid)
        return !Boolean(result)
    }, [columns])

    const addColumn = () => {
        notifyColumns()
        if(!validateColumns() && columns.length > 0) return;
        setColumns(prev => {
            return [...prev, {id: uuidv4(), value: '', valid: false, shouldValidate: false}]
        })
    }

    const resetEditBoardForm = () => {
        setBoardName({
            id: uuidv4(),
            value: "",
            valid: false,
            shouldValidate: false,
        })

        setColumns([])
    }

    return {
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
        deleteColumnById,
        resetEditBoardForm
    }
}