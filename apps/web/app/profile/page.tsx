"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import axios from "axios";
import BottomTab from "../components/BottomNav";
import TopBar from "../components/TopBar";
import { Resizer } from "../components/Resizer";

function Profile() {
    const [value, setValue] = useState(0);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <Resizer>
            <div className="h-screen w-screen">
                <TopBar />

                <div className="absolute inset-x-0 top-20 z-10">
                    <div className="p-3 pb-5 text-2xl font-bold">nickname 님, 반갑습니다.</div>
                    <div>
                        <div className="border-t-2" />
                        <Link href="/nickname/reset">
                            <button className="w-full border-b-2 py-4 pl-3 text-left font-semibold">닉네임 변경</button>
                        </Link>
                        <Link href="/password/reset">
                            <button className="w-full border-b-2 py-4 pl-3 text-left font-semibold">
                                비밀번호 변경
                            </button>
                        </Link>

                        <button className="w-full border-b-2 py-4 pl-3 text-left font-semibold">
                            백그라운드 알림 설정
                        </button>
                        <Link href="/policy">
                            <button className="w-full border-b-2 py-4 pl-3 text-left font-semibold">
                                개인정보 처리 방침
                            </button>
                        </Link>

                        <button className="w-full border-b-2 py-4 pl-3 text-left font-semibold">로그아웃</button>
                        <button className="w-full border-b-2 py-4 pl-3 text-left font-semibold">회원탈퇴</button>
                    </div>
                </div>
                <BottomTab />
            </div>
        </Resizer>
    );
}

export default Profile;
