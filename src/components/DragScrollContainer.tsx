import React, { useState, useRef, useEffect } from 'react';

const DragScrollContainer = ({children}: {children: React.ReactNode}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 });
    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Damping factor: lower values result in smoother scrolling, but too low may feel sluggish
    const dampingFactor = 0.5;

    const handleMouseDown = (event: React.MouseEvent) => {
        if (scrollRef.current && event.button === 1) {
            setIsDragging(true);
            setStartX(event.clientX);
            setStartY(event.clientY);
            setScrollPos({
                left: scrollRef.current.scrollLeft,
                top: scrollRef.current.scrollTop
            });
            event.preventDefault(); // Prevent default drag behavior
        }
    };

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging && scrollRef.current) {
                const dx = (event.clientX - startX) * dampingFactor;
                const dy = (event.clientY - startY) * dampingFactor;
                scrollRef.current.scrollLeft = scrollPos.left - dx;
                scrollRef.current.scrollTop = scrollPos.top - dy;
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, startX, startY, scrollPos]);

    return (
        <div
            ref={scrollRef}
            className='w-full h-full overflow-auto relative scroller-decoration'
            onMouseDown={handleMouseDown}
            // Prevent default middle-click scroll behavior
            onAuxClick={(e) => e.button === 1 && e.preventDefault()}
        >
            {children}
        </div>
    );
};

export default DragScrollContainer;
