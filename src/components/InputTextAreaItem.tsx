import React, { useEffect, useState, useRef } from 'react';
import { InputTextAreaProps } from '@/lib/type';

type Props = {
    id: string,
    value: string;
    rows?: number;
    cols?: number;
    shouldValidate?: boolean;
    onBlur: ({ id, value, valid }: InputTextAreaProps) => void;
    validateFunc?: (value: string, id?: string) => string | null;
    placeholder?: string; // Optional: For added flexibility
    name?: string; // Optional: For added flexibility
};

export default function InputTextAreaItem({
    id,
    value,
    shouldValidate,
    onBlur,
    validateFunc,
    rows = 6,
    placeholder = '',
    name = 'name',
}: Props) {
    const [errorMessage, setErrorMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        if(!textareaRef.current) return;
        textareaRef.current.value = value
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
        <div className={`items-center border  ${errorMessage !== "" ? 'border-danger-color' : 'border-input-default-color'} text-paragraph-medium p-1 px-4 rounded-md`}>
            <div className=''>
                <textarea
                    rows={rows}
                    ref={textareaRef}
                    name={name}
                    defaultValue={value}
                    onBlur={(e) => onBlurHandle(e.target.value)}
                    placeholder={placeholder}
                    className='p-1 w-full max-h-10 md:max-h-none overflow-y-auto dark:bg-dark-grey resize-none'
                />
            </div>
            <div className={`text-alert-color mt-3 ${errorMessage !== '' ? '' : 'hidden'}`}>
                {errorMessage}
            </div>
        </div>
    );
}
