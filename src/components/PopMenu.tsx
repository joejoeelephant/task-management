import React, { useEffect, useState } from 'react'

type Props = {
    isVisible: boolean;
    children: React.ReactNode;
    triggerRef: React.MutableRefObject<HTMLDivElement | null>; // For a div element
}

export default function PopMenu({isVisible, children, triggerRef}: Props) {
    const [position, setPosition] = useState<{x: number, y: number}>({x: 0, y: 0})
    const [showMenu, setShowMenu] = useState(false)
    useEffect(() => {
        if(!triggerRef.current) return;
        const {height, top, left} = triggerRef.current.getBoundingClientRect()
        setPosition({x: left - 64, y: height + top + 8})
        setShowMenu(isVisible)
    }, [triggerRef, isVisible])

    return (
        <div className={`absolute z-40 min-w-32 min-h-16 bg-white border rounded-lg overflow-clip ${showMenu ? '' : 'hidden'}`} style={{top: `${position.y}px`, left: `${position.x}px`}}>
            {children}
        </div>
    )
}
