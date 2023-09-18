"use client";

import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "../../styles/land.css";
import { BiCoffee, BiPrinter } from "react-icons/bi";
import { PiBowlFood } from "react-icons/pi";
import { GiVendingMachine } from "react-icons/gi";
import { LuCigarette } from "react-icons/lu";
import { MdOutlineLocalConvenienceStore } from "react-icons/md";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";
import BottomSheet from "../components/BottomSheet";
import { Resizer } from "../components/Resizer";
import { MapComponent } from "../components/Map";

async function getData() {
    // Fetch data from an API or any other source
    const response = await axios.get("http://121.137.66.90:8080/campus", {});
    return response.data.data;
}

const category = {
    PRINTER: {
        title: "프린터",
        icon: <BiPrinter />,
    },
    CAFE: {
        title: "카페",
        icon: <BiCoffee />,
    },
    CAFETERIA: {
        title: "식당",
        icon: <PiBowlFood />,
    },
    VENDINGMACHINE: {
        title: "자판기",
        icon: <GiVendingMachine />,
    },
    SMOKE: {
        title: "흡연구역",
        icon: <LuCigarette />,
    },
    STORE: {
        title: "편의점",
        icon: <MdOutlineLocalConvenienceStore />,
    },
};

type TCategoryKey = keyof typeof category;

export default function SchoolMap() {
    const categoryKeys = Object.keys(category) as unknown as TCategoryKey[];

    const [categoryFilterStatus, setCategoryFilterStatus] = useState(
        Object.fromEntries(categoryKeys.map(categoryKey => [categoryKey, true])) as unknown as {
            [key in TCategoryKey]: boolean;
        },
    );

    const [Open, setOpen] = useState(new Array(107).fill(false)); //각 항목 마다 bottom sheet가 열려있는지 여부
    const [facilityDatas, setFacilityDatas] = useState<any[]>([]);
    const [list, setList] = useState(true);
    const [center, setCenter] = useState({ lat: 37.27771738352343, lng: 127.04382834467262 });

    useEffect(() => {
        getData()
            .then(d => {
                setFacilityDatas(d);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const filteredPartnershipDatas = useMemo(() => {
        return facilityDatas.filter(facilityDatas => categoryFilterStatus[facilityDatas.category as TCategoryKey]);
    }, [facilityDatas, categoryFilterStatus]);

    console.log(filteredPartnershipDatas);

    function onDismiss(markerindex: number) {
        const newBottomSheetStates = [...Open];
        newBottomSheetStates[markerindex] = false;
        setOpen(newBottomSheetStates);
        setList(true);
    }

    return (
        <Resizer>
            <div className="h-screen w-screen">
                <TopBar />

                <MapComponent lat={center.lat} lng={center.lng} level={3}>
                    {filteredPartnershipDatas.map(filteredPartnershipData => (
                        <CustomOverlayMap
                            position={{ lat: filteredPartnershipData.lat, lng: filteredPartnershipData.lng }}
                        >
                            <div
                                className={`h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full border-2 bg-white border-slate-700`}
                                onClick={() => {
                                    const newBottomSheetStates = [...Open];
                                    newBottomSheetStates[filteredPartnershipData.id] = true;
                                    setOpen(newBottomSheetStates);
                                    setList(false);
                                }}
                            />
                        </CustomOverlayMap>
                    ))}
                </MapComponent>
                <div className="absolute inset-0 w-screen h-[90vh] flex justify-center items-end pointer-events-none">
                    <div className="absolute w-[34rem] h-24 bg-white border-2 border-black rounded-full flex items-center justify-center pointer-events-auto">
                        <div className="flex justify-center">
                            {categoryKeys.map(categoryKey => (
                                <button
                                    className={`flex flex-col rounded-full p-1 w-20 h-20 items-center`}
                                    onClick={() => {
                                        setCategoryFilterStatus(prev => ({
                                            ...prev,
                                            [categoryKey]: !prev[categoryKey],
                                        }));
                                    }}
                                >
                                    <div
                                        className={`mx-1 my-auto h-10 w-10 rounded-full items-center justify-center flex border-2 ${
                                            categoryFilterStatus[categoryKey] ? "bg-base-100" : "bg-base-300"
                                        } `}
                                    >
                                        {category[categoryKey].icon}
                                    </div>
                                    <p className={`mr-1 md:text-base text-sm font-bold`}>
                                        {category[categoryKey].title}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* {facilityDatas.map(content => (
                    <BottomSheet key={content.id}>
                        <p className="m-8 text-center text-3xl font-bold">{content.name}</p>
                        <img
                            src={`/img/alliance/${content.id}.jpg`}
                            className="object-contain px-12 py-6"
                            alt="해당 점포 이미지"
                        />
                        <p className="text-center text-2xl">{content.detail}</p>
                    </BottomSheet>
                ))} */}
                <BottomNav />
            </div>
        </Resizer>
    );
}
