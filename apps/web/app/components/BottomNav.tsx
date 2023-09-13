import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiBus, BiHome, BiUser } from "react-icons/bi";

const BottomTab: React.FC = () => {
    const router = usePathname();

    const isActive = (pathname: string) => {
        return router === pathname;
    };

    return (
        <div className="absolute z-100 border-t inset-x-0 bottom-0 w-screen h-16 flex items-center justify-center bg-white">
            <Link
                href="/"
                className={`basis-1/5 flex justify-center ${isActive("/") ? "text-blue-500" : "text-[#b1d5ff]"}`}
            >
                <BiHome size={22} />
            </Link>

            <Link
                href="/bus"
                className={`basis-1/5 flex justify-center ${isActive("/bus") ? "text-blue-500" : "text-[#b1d5ff]"}`}
            >
                <BiBus size={22} />
            </Link>

            <Link
                href="/campus"
                className={`basis-1/5 flex justify-center ${isActive("/campus") ? "text-blue-500" : "text-[#b1d5ff]"}`}
            >
                <p className="font-semibold">편의시설</p>
            </Link>

            <Link
                href="/partnership"
                className={`basis-1/5 flex justify-center ${
                    isActive("/partnership") ? "text-blue-500" : "text-[#b1d5ff]"
                }`}
            >
                <p className="font-semibold">제휴업체</p>
            </Link>

            <Link
                href="/profile"
                className={`basis-1/5 flex justify-center ${isActive("/profile") ? "text-blue-500" : "text-[#b1d5ff]"}`}
            >
                <BiUser size={22} />
            </Link>
        </div>
    );
};

export default BottomTab;
