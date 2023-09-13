"use client";

import { useState } from "react";

// 버스 대여 페이지

function BusPage2({ closeModal }) {
    const openPopup = () => {
        window.open("/bus2", "PopupWindow", "width=100,height=300");
        closeModal();
    };

    return (
        <div className="h-screen/2 w-screen/2">
            <div className="flex h-full flex-col space-y-4 p-4 items-center">
                <div className="flex flex-col items-center space-y-4 text-4xl">버스 대여</div>
                <div className="flex items-center space-x-20">
                    <div className="flex flex-col bg-gray-200 items-center object-fit">
                        출발일
                        <input type="date" className="border-2 border-black rounded-md h-30" />
                    </div>
                    <div className="flex flex-col bg-gray-200 items-center">
                        도착일
                        <input type="date" className="border-2 border-black rounded-md h-30" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusPage2;
