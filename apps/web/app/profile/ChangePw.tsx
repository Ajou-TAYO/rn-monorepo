import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TopBar from "../components/TopBar";

function ChangePw() {
    const navigate = useNavigate();

    const [orgpw, setOrgpw] = useState("");
    const [pw, setPw] = useState("");
    const [ckpw, setCkpw] = useState("");
    const [isEqual, setIsEqual] = useState(false);

    function postPasswordReset() {
        console.log(pw);
        return axios
            .post(
                "http://127.0.0.1:8080/my/password/reset",
                {
                    originalPw: orgpw,
                    newPw: pw,
                    checkPw: ckpw,
                },
                { withCredentials: true },
            )
            .then(response => {
                console.log(response.data);
                alert("비밀번호가 성공적으로 변경되었습니다.");
                navigate("/profile");
                // 비밀번호 변경 성공 처리
            })
            .catch(error => {
                alert("비밀번호 변경에 실패했습니다. 다시 확인해주세요.");
                console.error(error);
            });
    }

    const checkPassword = (ckpw: string) => {
        console.log("check : ", ckpw);
        console.log("check2 : ", pw);
        if (ckpw.length == 0) {
            console.log("false");
            setIsEqual(false);
        } else if (pw != ckpw) {
            setIsEqual(false);
        } else {
            setIsEqual(true);
        }
    };

    return (
        <div className="h-screen w-screen">
            <TopBar />

            <div className="flex h-full w-full flex-col items-center my-12">
                <p className="pb-10 text-center text-xl font-bold">비밀번호 변경</p>
                <div className="w-full p-8 flex flex-col gap-4 max-w-xl mx-auto">
                    <div className="form-control mb-1">
                        <input
                            type="text"
                            placeholder="현재 비밀번호"
                            className="input input-bordered w-full"
                            onChange={event => setOrgpw(event.target.value)}
                            value={orgpw}
                        />
                    </div>
                    <div className="form-control mb-1">
                        <input
                            type="password"
                            placeholder="새로운 비밀번호"
                            className="input input-bordered w-full"
                            onChange={event => setPw(event.target.value)}
                            value={pw}
                        />
                    </div>
                    <div className="form-control mb-3">
                        <input
                            type="password"
                            placeholder="새로운 비밀번호 재입력"
                            className="input input-bordered w-full"
                            onChange={event => setCkpw(event.target.value)}
                            value={ckpw}
                        />
                    </div>

                    <div className="align-top">
                        <button
                            type="submit"
                            onChange={event => {
                                checkPassword(event.toString());
                            }}
                            onClick={postPasswordReset}
                            className="btn btn-primary w-full"
                        >
                            적용
                        </button>
                    </div>
                    <div className="align-top">
                        <button type="submit" onClick={() => navigate("/profile")} className="btn w-full">
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePw;
