// SignUp.tsx
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUp() {
    const [id, setId] = useState("");
    const [num, setVerifyNum] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPwck] = useState("");
    const [isEqual, setIsEqual] = useState(false);
    const [isValid, setIsValid] = useState(false);

    function postSignUpData() {
        console.log(id, num, password);
        return axios
            .post(
                "http://121.137.66.90:8080/my/signup/",
                {
                    email: id,
                    verificationCode: num,
                    password,
                },
                { withCredentials: true },
            )
            .then(response => {
                console.log(response.data);
                window.location.href = "/login";
                // 회원가입 성공 처리
            })
            .catch(error => {
                alert("가입에 실패했습니다. 입력한 내용을 다시 확인해 주세요.");
                console.error(error);
                // 회원가입 실패 처리
            });
    }

    function postEmailCert() {
        return axios
            .post(
                "http://121.137.66.90:8080/my/signup/email",
                {
                    email: id,
                },
                { withCredentials: true },
            )
            .then(response => {
                return axios
                    .post("http://121.137.66.90:8080/my/signup/email/request", {
                        email: id,
                    })
                    .then(response => {
                        alert("입력하신 이메일로 인증번호가 전송되었습니다.");
                        console.log(response.data);
                        // 이메일 인증 성공 처리
                    })
                    .catch(error => {
                        alert("인증코드 전송에 실패하였습니다.");
                        console.error(error);
                        // 이메일 인증 실패 처리
                    });
            })
            .catch(error => {
                alert("이미 가입된 이메일입니다.");
                console.error(error);
                console.log("123");
                // 이메일 인증 실패 처리
            });
    }

    const SignFunc = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    };

    const validatePassword = (password: string) => {
        console.log("test : ", password);
        if (password.length <= 8) {
            setIsValid(false);
        } else if (!/[a-zA-Z]/.test(password)) {
            setIsValid(false);
        } else if (!/\d/.test(password)) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    };

    const passwordChange = (event: any) => {
        console.log(event);
        const pwvalue = event.target.value;
        setPassword(pwvalue);
        console.log("password : ", pwvalue);
        validatePassword(pwvalue);
    };

    const checkPassword = (passwordCheck: string) => {
        console.log("check : ", passwordCheck);
        console.log("check2 : ", password);
        if (passwordCheck.length == 0) {
            console.log("false");
            setIsEqual(false);
        } else if (password != passwordCheck) {
            setIsEqual(false);
        } else {
            setIsEqual(true);
        }
    };

    return (
        <div>
            <div className="relative">
                <div>
                    <div className="my-20 w-auto px-5">
                        <p className="pb-4 text-center text-xl font-bold text-blue-900">회원가입</p>
                        <div className="mb-10">
                            <form onSubmit={SignFunc}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">* 이메일</span>
                                    </label>
                                    <label className="input-group">
                                        <input
                                            type="text"
                                            placeholder="ajoulife@ajou.ac.kr"
                                            className="input input-bordered flex-1"
                                            value={id}
                                            onChange={event => setId(event.target.value)}
                                        />
                                        <button className="btn" onClick={postEmailCert}>
                                            인증
                                        </button>
                                    </label>

                                    <label className="label">
                                        <span className="label-text text-xs text-gray-400">
                                            아주대학교 포탈에서 사용 중인 이메일을 정확하게 입력해 주세요. 해당 이메일로
                                            가입 인증 메일이 발송됩니다.
                                        </span>
                                    </label>

                                    <label className="label">
                                        <span className="label-text">* 인증번호</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="인증번호"
                                        className="input input-bordered "
                                        value={num}
                                        onChange={event => setVerifyNum(event.target.value)}
                                    />

                                    <label className="label">
                                        <span className="label-text text-xs text-gray-400">
                                            입력한 이메일로 전송된 인증번호를 정확하게 입력해주세요.
                                        </span>
                                    </label>
                                </div>

                                <div className="mb-5">
                                    <div className="box-border pb-3">
                                        <label htmlFor="email">* 비밀번호</label>
                                    </div>
                                    <div className="auto container box-border">
                                        <div className="container relative rounded-sm border border-gray-300">
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={passwordChange}
                                                className="text-m relative inline-flex w-full p-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative mt-2 flex items-center">
                                        {!isValid ? (
                                            <span className="text-xs text-gray-400">
                                                8자 이상의 영문 숫자 혼합의 비밀번호를 설정해 주세요.
                                            </span>
                                        ) : (
                                            <span className="text-xs text-green-400">
                                                올바른 형식의 비밀번호입니다!
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <div className="box-border pb-3">
                                        <label htmlFor="email">* 비밀번호 확인</label>
                                    </div>
                                    <div className="auto container box-border">
                                        <div className="container relative rounded-sm border border-gray-300">
                                            <input
                                                type="password"
                                                onChange={event => checkPassword(event.target.value)}
                                                className="text-m relative inline-flex w-full p-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative mt-2 flex items-center">
                                        {!isEqual ? (
                                            <span className="text-xs text-gray-400">
                                                비밀번호를 한 번 더 입력해 주세요.
                                            </span>
                                        ) : (
                                            <span className="text-xs text-green-400">비밀번호와 일치합니다!</span>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-5 align-top">
                                    <button type="submit" onClick={postSignUpData} className="btn w-full">
                                        가입
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
