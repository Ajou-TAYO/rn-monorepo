import { useNavigate } from "react-router-dom";

function Policy() {
    const navigate = useNavigate();
    
    return (
        <div className="h-screen w-screen">
            <nav className="inset-x-0 top-0">
                <div className="navbar bg-[#4E5FFF] shadow-xl">
                    <div className="flex-1 justify-center">
                        <a className="px-3 text-2xl font-bold normal-case text-white">Ajou-life</a>
                    </div>
                </div>
            </nav>
            <div className="m-3">
                정책어쩌고저쩌고내용주르륵
            </div>
            <div className="align-top p-8">
                <button type="submit" onClick={() => navigate("/profile")} className="btn w-full">
                    확인
                </button>
            </div>
        </div>
    );
}

export default Policy;