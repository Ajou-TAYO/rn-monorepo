"use client";

import BottomSheet from "../components/BottomSheet";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import BusMap from "./BusMap";
import BottomNav from "../components/BottomNav";
import BusPage2 from "./BusRental";
import "../../styles/land.css";
import BottomTab from "../components/BottomNav";
import TopBar from "../components/TopBar";
import Link from "next/link";
import { Resizer } from "../components/Resizer";

function currentTimer() {
    const date = new Date();
    const hours = date.getHours();
    const min = date.getMinutes();
    return hours * 60 + min;
}

//Overlay들(바텀시트, 상단 바, 공지)
export default function BusPage() {
    const [boardContent, setBoardContent] = useState("");
    const fromGawngTime = [510, 530, 570, 605, 615, 705, 800, 885, 975, 1050]; // max 9
    const toGawngTime = [500, 520, 560, 595, 605, 695, 790, 875, 965, 1040, 1085]; // max 10
    const fromSuwonTime = [510, 590, 680]; // max 2
    const toSuwonTime = [910, 1000, 1085];
    const [nowTime, setNow] = useState(currentTimer());
    const [queue, setQueue] = useState(new Array(8).fill(""));
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [timeTable, setTimeTable] = useState(false);

    const setModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    function findTimeZone(now: number) {
        // from g1 g2 to g1 g2 from s1 s2 to s1 s2
        let gf: number;
        let sf: number;
        let gt: number;
        let st: number;
        for (let i = 0; i < fromGawngTime.length; i++) {
            if (fromGawngTime[i] - now > 0) {
                gf = i;
                break;
            }
        }
        for (let j = 0; j < fromSuwonTime.length; j++) {
            if (fromSuwonTime[j] - now > 0) {
                sf = j;
                break;
            }
        }
        for (let k = 0; k < toGawngTime.length; k++) {
            if (toGawngTime[k] - now > 0) {
                gt = k;
                break;
            }
        }
        for (let l = 0; l < toSuwonTime.length; l++) {
            if (toSuwonTime[l] - now > 0) {
                st = l;
                break;
            }
        }

        return [
            fromGawngTime[gf] ? fromGawngTime[gf] - nowTime : -1,
            fromGawngTime[gf + 1] ? fromGawngTime[gf + 1] - nowTime : -1,
            toGawngTime[gt] ? toGawngTime[gt] - nowTime : -1,
            toGawngTime[gt + 1] ? toGawngTime[gt + 1] - nowTime : -1,
            fromSuwonTime[sf] ? fromSuwonTime[sf] - nowTime : -1,
            fromSuwonTime[sf + 1] ? fromSuwonTime[sf + 1] - nowTime : -1,
            toSuwonTime[st] ? toSuwonTime[st] - nowTime : -1,
            toSuwonTime[st + 1] ? toSuwonTime[st + 1] - nowTime : -1,
        ];
    }

    function convertQueue(numQueue: number[]) {
        const convertString = (min: number) => {
            if (min === -1) {
                return "운행 종료";
            }
            return Math.trunc(min / 60)
                ? `${String(Math.trunc(min / 60))} 시간 ${String(min % 60).padStart(2, "0")} 분 뒤 출발`
                : `${String(min % 60)} 분 뒤 출발`;
        };
        return [
            convertString(numQueue[0]),
            convertString(numQueue[1]),
            convertString(numQueue[2]),
            convertString(numQueue[3]),
            convertString(numQueue[4]),
            convertString(numQueue[5]),
            convertString(numQueue[6]),
            convertString(numQueue[7]),
        ];
    }

    useEffect(() => {
        const getBoard = async () => {
            try {
                const response = await axios.get("http://121.137.66.90:9000/bus/notices", {});
                setBoardContent(response.data[0].title);
            } catch (error) {
                console.error(error);
                setBoardContent("");
            }
        };
        setQueue(convertQueue(findTimeZone(nowTime)));
        getBoard();
    }, []);

    setInterval(() => {
        setNow(currentTimer());
        setQueue(convertQueue(findTimeZone(nowTime)));
    }, 30000);

    return (
        <Resizer>
            <div className="h-screen w-screen">
                <TopBar />
                <BusMap />

                <div className="absolute inset-x-0 top-20 z-10 flex flex-col items-center">
                    <div className="badge badge-error gap-2">
                        <Link className="text-xs bg-yellow-500 rounded-full px-3 py-1" href="/bus/busboarddetail">
                            <span className="mr-2 font-bold">[공지]</span>
                            {boardContent}
                        </Link>
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-4 w-4 stroke-current"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg> */}
                    </div>
                </div>

                {/* <div className="fixed right-2 top-20 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
                        <button type="button" onClick={setModal}>
                            <img
                                src="/rent_bus.png"
                                className="h-3/4 w-3/4"
                                style={{ transform: "translate(15%, 0%)" }}
                            />
                        </button>
                        <ReactModal
                            isOpen={modalIsOpen}
                            onRequestClose={setModal}
                            contentLabel="BusPage2 Modal"
                            style={{
                                content: {
                                    width: "500px", // Set the desired width
                                    height: "700px", // Set the desired height
                                    margin: "auto", // Center the modal horizontally
                                },
                            }}
                        >
                            {modalIsOpen && <BusPage2 closeModal={setModal} />}
                        </ReactModal>
                    </div>
                </div> */}

                {!modalIsOpen && (
                    <BottomSheet>
                        <div className="flex flex-col gap-4 px-4">
                            <h2 className="font-bold">운행정보 </h2>
                            <div className="flex flex-col rounded-2xl bg-white p-5 shadow">
                                <header className="mb-4 flex">
                                    <p className="font-bold">아주대 - 광교중앙역</p>
                                    <div
                                        className="ml-auto right-0 text-white bg-blue-600 py-1 px-2 rounded-lg text-sm"
                                        onClick={() => {
                                            setTimeTable(!timeTable);
                                        }}
                                    >
                                        시간표보기
                                    </div>
                                </header>

                                <ul className="divide-y pl-4">
                                    <li className="flex flex-row items-center justify-between text-sm">
                                        <div className="font-bold">아주대행</div>

                                        <div className="flex flex-col text-red-500">
                                            <div className="ml-auto right-0">{queue[0]}</div>
                                            <div className="ml-auto right-0">{queue[1]}</div>
                                        </div>
                                    </li>

                                    <li className="flex flex-row items-center justify-between text-sm">
                                        <div className="font-bold">광교중앙역행</div>

                                        <div className="flex flex-col text-red-500">
                                            <div className="ml-auto right-0">{queue[2]}</div>
                                            <div className="ml-auto right-0">{queue[3]}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col rounded-2xl bg-white p-5 shadow">
                                <header className="mb-4 font-bold">아주대 - 수원역</header>

                                <ul className="divide-y pl-4">
                                    <li className="flex flex-row items-center justify-between text-sm">
                                        <div className="font-bold">아주대행</div>

                                        <div className="flex flex-col text-red-500">
                                            <div className="ml-auto right-0">{queue[4]}</div>
                                            <div className="ml-auto right-0">{queue[5]}</div>
                                        </div>
                                    </li>

                                    <li className="flex flex-row items-center justify-between text-sm">
                                        <div className="font-bold">수원역행</div>

                                        <div className="flex flex-col text-red-500">
                                            <div className="ml-auto right-0">{queue[6]}</div>
                                            <div className="ml-auto right-0">{queue[7]}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </BottomSheet>
                )}

                <BottomNav />
                <ReactModal
                    isOpen={timeTable}
                    contentLabel="BusTimeTable Modal"
                    onRequestClose={() => setTimeTable(false)}
                    style={{
                        content: {
                            width: "500px", // Set the desired width
                            height: "700px", // Set the desired height
                            margin: "auto", // Center the modal horizontally
                        },
                    }}
                >
                    {timeTable && <img src="/timeTable.png" className="h-full w-full" />}
                </ReactModal>

                <BottomTab />
            </div>
        </Resizer>
    );
}
