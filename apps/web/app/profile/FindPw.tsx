import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function FindPw() {
    const [idForFind, setIdForFind] = useState("");

    function findPassword() {
        console.log(idForFind);
        return axios
            .post(
                "http://121.137.66.90:9000/members/password/find",
                {
                    email: idForFind,
                },
                { withCredentials: true },
            )
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                alert("비밀번호 찾기에 실패했습니다. 이메일을 확인해 주세요.");
                console.error(error);
            });
    }

    const SubmitForm = (e: any) => {
        e.preventDefault();
    };

    return (
        <div>
            <div className="relative">
                <div>
                    <div className="my-36 w-auto px-5">
                        <p className="pb-10 text-center text-2xl font-bold text-blue-600">비밀번호 찾기</p>
                        <div className="mb-10">
                            <form onSubmit={SubmitForm}>
                                <div className="mb-8">
                                    <div className="box-border pb-3">
                                        <label htmlFor="email">이메일</label>
                                    </div>
                                    <div className="auto container box-border">
                                        <div className="container relative rounded-sm border border-gray-300">
                                            <input
                                                type="text"
                                                onChange={event => setIdForFind(event.target.value)}
                                                className="text-m relative inline-flex w-full p-2"
                                                placeholder="ajoulife@ajou.ac.kr"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 align-top">
                                    <button
                                        type="submit"
                                        onClick={findPassword}
                                        className="h-9 w-full rounded-sm bg-blue-500 text-sm font-bold text-white"
                                    >
                                        비밀번호 찾기
                                    </button>
                                </div>
                                <Link to="/password/find">
                                    <div className="mb-5 align-top">
                                        <button className="h-9 w-full rounded-sm text-xs font-bold text-blue-500 underline">
                                            비밀번호 재설정
                                        </button>
                                    </div>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
