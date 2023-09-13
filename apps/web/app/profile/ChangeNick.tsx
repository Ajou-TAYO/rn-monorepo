import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TopBar from "../components/TopBar";

function ChangeNick() {
    const navigate = useNavigate();

    const [nickname, setNn] = useState("");

    function postNicknameReset() {
        console.log(nickname);
        return axios
            .post(
                "http://121.137.66.90:8080/my/nickname/reset",
                {
                    // originalNickname : ,
                    newNickname: nickname,
                },
                { withCredentials: true },
            )
            .then(response => {
                console.log(response.data);
                alert("닉네임이 변경되었습니다. Profile 창에서 변경된 닉네임을 확인할 수 있습니다.");
                navigate("/profile");
                // 닉네임 변경 성공 처리
            })
            .catch(error => {
                alert("닉네임 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
                console.error(error);
            });
    }

    return (
        <div className="h-screen w-screen">
            <TopBar />

            <div className="flex h-full w-full flex-col items-center my-12">
                <p className="pb-10 text-center text-xl font-bold">닉네임 변경</p>
                <div className="w-full p-8 flex flex-col gap-4 max-w-xl mx-auto">
                    <div className="form-control mb-7">
                        <input
                            type="text"
                            placeholder="닉네임"
                            className="input input-bordered w-full"
                            onChange={event => setNn(event.target.value)}
                            value={nickname}
                        />
                        <p className="text-sm pt-3">
                            한글 및 영문, 숫자, 일부 특수문자 (-,_,.)만 사용 가능하며, 최대 15자까지만 등록 가능합니다.
                        </p>
                    </div>

                    <div className="align-top">
                        <button type="submit" onClick={postNicknameReset} className="btn btn-primary w-full">
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

export default ChangeNick;
