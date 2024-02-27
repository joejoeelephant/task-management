import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type Props = {
    isVisible: boolean;
    toggleSidebar: () => void
}

export default function ShowSidebarButton({isVisible, toggleSidebar}: Props) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        let timer:number;
        if(isVisible) {
            setShow(isVisible)
        }else {
            timer = window.setTimeout(() => {
                setShow(isVisible)
            }, 500)
        }
        return () => clearTimeout(timer);
    }, [isVisible])
    return (
        <div onClickCapture={toggleSidebar} className={`${show ? '' : '!hidden'} ${isVisible ? '' : 'opacity-0'} hidden md:flex justify-center items-center transition duration-500 absolute left-0 bottom-20 w-14 h-12 bg-main-purple rounded-tl-none rounded-bl-none rounded-tr-full rounded-br-full cursor-pointer select-none`}>
            <Image src={'/images/icon-show-sidebar.svg'} alt='showSidebar' width={16} height={16} className='w-5'></Image>
        </div>
    )
}
