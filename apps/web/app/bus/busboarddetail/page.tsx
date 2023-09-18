"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import BottomTab from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import "../../../styles/land.css";

//버스 상세 공지사항 페이지
const BusBoardDetail = () => {
    const [boards, setBoards] = useState<{ bus_notice_id: number; url: string; title: string }[]>([]);

    useEffect(() => {
        const getBoard = async () => {
            try {
                const response = await axios.get("http://121.137.66.90:8080/bus/notices", {});
                setBoards(response.data.data);
            } catch (error) {
                console.error(error);
                setBoards([{ bus_notice_id: 0, url: "", title: "" }]);
            }
        };
        getBoard();
    }, []);

    console.log(boards);

    return (
        <div>
            <TopBar />
            {boards.map(board => {
                return (
                    <div
                        className="flex flex-col items-center justify-center w-full h-20 border-b border-black bg-white"
                        onClick={() => {
                            window.location.href = board.url;
                        }}
                    >
                        <div className="flex items-center justify-left w-11/12 h-full">
                            <p className="text-lg font-bold text-primary">{board.title}</p>
                        </div>
                    </div>
                );
            })}
            <BottomTab />
        </div>
    );
};

export default BusBoardDetail;
