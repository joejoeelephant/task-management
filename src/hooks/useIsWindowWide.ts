'use client'
import React, {useEffect, useState} from 'react'

export const useIsWindowWide = () => {
    const isWindowWide = () => window.innerWidth > 767;
    const [windowWide, setWindowWide] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setWindowWide(isWindowWide());
        };

        handleResize()
    
        // Add event listener
        window.addEventListener('resize', handleResize);
    
        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowWide;
}