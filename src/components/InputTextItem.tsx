import React, { useEffect, useState, useRef } from 'react';
import { InputTextProps } from '@/lib/type';
type Props = {
    id: string,
    value: string;
    shouldValidate?: boolean;
    onBlur: ({ id, value, valid }: InputTextProps) => void;
    validateFunc?: (value: string, id?: string) => string | null;
    placeholder?: string; // Optional: For added flexibility
    name?: string; // Optional: For added flexibility
};

export default function InputTextItem({
    id,
    value,
    shouldValidate,
    onBlur,
    validateFunc,
    placeholder = '',
    name = 'name',
}: Props) {
    const [errorMessage, setErrorMessage] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if(!inputRef.current) return;
        inputRef.current.value = value
    }, [value])

    useEffect(() => {
        if(shouldValidate) {
            let errorMsg = "";
            if (validateFunc) {
                errorMsg = validateFunc(value, id) || "";
            }
            setErrorMessage(errorMsg);
        }
    }, [shouldValidate, validateFunc, value, id])

    const onBlurHandle = (value: string) => {
        let errorMsg = "";
        if (validateFunc) {
            errorMsg = validateFunc(value, id) || "";
        }
        setErrorMessage(errorMsg);
        onBlur({id: id, value, valid: errorMsg === '' });
    };

    return (
        <div className={`flex gap-3 items-center border rounded-md  ${errorMessage !== "" ? 'border-danger-color' : 'border-input-default-color'} text-paragraph-medium p-1 px-4`}>
            <div className='flex-1'>
                <input
                    ref={inputRef}
                    type="text"
                    name={name}
                    defaultValue={value}
                    onBlur={(e) => onBlurHandle(e.target.value)}
                    placeholder={placeholder}
                    className='p-1 w-full dark:bg-dark-grey'
                />
            </div>
            <div className='text-danger-color'>
                {errorMessage}
            </div>
        </div>
    );
}
