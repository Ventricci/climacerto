'use client';
import { useState, useRef, useEffect } from "react";
import {
    SidebarContainer,
    SidebarHeader,
    SidebarContent,
    PlaceholderChart
} from "./style";

interface SidebarProps {
    children?: React.ReactNode;
    title?: string;
}

export default function Sidebar({
    children,
    title,
}: SidebarProps) {
    const [position, setPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, startPosition: 0 });
    const sidebarRef = useRef<HTMLDivElement>(null);
    const initialWidth = 400;
    const minPosition = 0;
    const maxPosition = initialWidth - 20;
    const threshold = initialWidth / 2;

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX,
            startPosition: position
        });

        if (sidebarRef.current) {
            sidebarRef.current.style.transition = 'none';
        }
        e.preventDefault();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setDragStart({
            x: e.touches[0].clientX,
            startPosition: position
        });

        if (sidebarRef.current) {
            sidebarRef.current.style.transition = 'none';
        }
        e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - dragStart.x;
        const newPosition = dragStart.startPosition + deltaX;

        const constrainedPosition = Math.max(minPosition, Math.min(maxPosition, newPosition));
        setPosition(constrainedPosition);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;

        const deltaX = e.touches[0].clientX - dragStart.x;
        const newPosition = dragStart.startPosition + deltaX;

        const constrainedPosition = Math.max(minPosition, Math.min(maxPosition, newPosition));
        setPosition(constrainedPosition);
        e.preventDefault();
    };

    const handleMouseUp = () => {
        if (isDragging) {
            if (sidebarRef.current) {
                sidebarRef.current.style.transition = '';
            }

            if (position >= threshold) {
                setPosition(maxPosition);
            } else {
                setPosition(minPosition);
            }
        }
        setIsDragging(false);
    };

    const handleTouchEnd = () => {
        if (isDragging) {
            if (sidebarRef.current) {
                sidebarRef.current.style.transition = '';
            }

            if (position >= threshold) {
                setPosition(maxPosition);
            } else {
                setPosition(minPosition);
            }
        }
        setIsDragging(false);
    };

    useEffect(() => {

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);

            document.body.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
            document.body.style.touchAction = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            document.body.style.touchAction = '';
        };
    }, [isDragging, dragStart, position, initialWidth]);

    return (
        <SidebarContainer
            ref={sidebarRef}
            width={initialWidth}
            style={{ transform: `translateX(${position}px)` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            <SidebarHeader style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                <h3>{title}</h3>
            </SidebarHeader>

            <SidebarContent>
                {children || (
                    <>
                        <PlaceholderChart>
                            Temperatura - Últimos 5 anos
                        </PlaceholderChart>
                        <PlaceholderChart>
                            NDVI - Últimos 5 anos
                        </PlaceholderChart>
                        <PlaceholderChart>
                            NDVI por AOD - Últimos 5 anos
                        </PlaceholderChart>
                    </>
                )}
            </SidebarContent>
        </SidebarContainer>
    );
}