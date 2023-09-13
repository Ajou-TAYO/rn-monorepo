import React, { useState, useEffect } from "react";
import "../../styles/land.css";

interface BottomSheetProps {
    initialPosition?: number;
    children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ initialPosition = 35, children }) => {
    const [position, setPosition] = useState(initialPosition);
    const [height, setHeight] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const startY = e.clientY;

        const handleMouseUp = () => {
            setIsDragging(false);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const deltaY = startY - e.clientY;
            const newHeight = height + deltaY;

            if (newHeight >= window.innerHeight * 0.05 && newHeight <= window.innerHeight * 0.5) {
                setHeight(newHeight);
                setPosition((newHeight / window.innerHeight) * 100);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    useEffect(() => {
        setHeight(window.innerHeight * (initialPosition / 100));
    }, [initialPosition]);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4">
            <div
                className={`w-16 h-2 bg-blue-500 m-auto rounded-md ${
                    isDragging ? "cursor-grabbing" : "cursor-pointer"
                }`}
                onMouseDown={handleMouseDown}
            />
            <div className="bg-gray-200 h-[1px] my-2" style={{ width: `${position}%` }}></div>
            <div className="p-2 bottomSheetChildren" style={{ height: `${height}px`, overflow: "auto" }}>
                {children}
            </div>
        </div>
    );
};

export default BottomSheet;
