import React from 'react'
import Image from 'next/image'
import './CheckListItem.css'

type Props = {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (id: string, value: boolean) => void
}

export default function CheckListItem({id, name, value, checked, onChange}: Props) {
    return (
        <label className='flex gap-3 items-center p-3 bg-light-medium-grey dark:bg-very-dark-grey hover:bg-secondary-purple cursor-pointer rounded-md check-list-item select-none'>
            <input type="checkbox" defaultChecked={checked} name={name} className='hidden check-list-checkbox' onChange={(e) => {onChange(id, !checked)}} />
            <div className='w-4 h-4 shrink-0 bg-white flex justify-center items-center rounded-sm check-list-checkbox-ui'>
                <Image src={'/images/icon-check.svg'} alt='check' width={10} height={8} className='w-2'/>
            </div>
            <div className='text-paragraph-xs font-bold text-primary-heading-color dark:text-primary-dark-heading-color break-all check-list-item-value'>
                {value}
            </div>
        </label>
    )
}
