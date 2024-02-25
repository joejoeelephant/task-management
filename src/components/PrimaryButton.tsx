import React from 'react'

type Props = {
    text: string;
    onClick: () => void
}

export default function PrimaryButton({text, onClick}: Props) {
    return (
        <div onClick={onClick} className='text-paragraph-medium font-bold primary-button'>
            {text}
        </div>
    )
}
 