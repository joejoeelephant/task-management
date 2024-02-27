import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type Option = {
    id: string;
    value: string;
}

type Props = {
    name?: string;
    initValue?: string;
    options: Option[];
    onChange: (value: Option) => void
}

export default function InputSelect({options, onChange, initValue}: Props) {
    const [isOptionsShow, setIsOptionsShow] = useState(false)
    const [currentOption, setCurrentOption] = useState('')

    useEffect(() => {
        if(initValue) {
            const optionName = options.find(item => item.id === initValue)
            optionName && setCurrentOption(optionName.value) 
        }else {
            options.length > 0 && setCurrentOption(options[0].value)
        }

    }, [options, initValue])

    const toggleOptions = () => {
        setIsOptionsShow(prev => !prev)
    }

    const onChangeHandle = (option: Option) => {
        setCurrentOption(option.value)
        onChange(option)
    }
    return (
        <div onClick={toggleOptions} className='select-none py-2 w-full dark:bg-dark-grey relative border border-input-default-color rounded-md text-paragraph-medium'>
            <div className='text-paragraph-medium px-3 cursor-pointer flex justify-between items-center'>
                <div data-testid="current-option">
                    {currentOption}
                </div>
                <div>
                    <Image src={`${isOptionsShow ? '/images/icon-chevron-up.svg' : '/images/icon-chevron-down.svg'}`} alt='icon-chevron' width={10} height={7} className='w-3'></Image>
                </div>
            </div>
            <div data-testid="options-wrapper" className={`${isOptionsShow ? '' : 'hidden'} py-2 bg-white border dark:border-line-dark-color dark:bg-very-dark-grey rounded-lg overflow-hidden w-full absolute bottom-12 md:top-12 md:bottom-auto left-0 text-heading-color dark:text-heading-on-dark-color`}>
                {
                    options.map((item, i) => {
                        return (
                            <div key={i} onClick={() => {onChangeHandle(item)}} className='cursor-pointer hover:bg-light-medium-grey dark:hover:bg-dark-grey min-h-7 flex items-center px-3'>
                                {item.value}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
