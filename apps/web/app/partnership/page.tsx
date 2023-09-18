"use client";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import BottomSheet from "../components/BottomSheet";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import "../../styles/land.css";
import TopBar from "../components/TopBar";
import { BiCoffee, BiDrink } from "react-icons/bi";
import { PiBowlFood, PiGuitar } from "react-icons/pi";
import { MapComponent, defaultMapLevel, mapLevel } from "../components/Map";
import { Resizer } from "../components/Resizer";

async function getData() {
    // Fetch data from an API or any other source
    const response = await axios.get("http://121.137.66.90:8080/partnerships", {});
    return response.data.data;
}

const categoryType = {
    CAFE: {
        title: "카페",
        className: "bg-red-500",
        icon: <BiCoffee className="w-full h-full p-1" />,
    },
    RESTAURANT: {
        title: "식당",
        className: "bg-blue-500",
        icon: <PiBowlFood className="w-full h-full p-1" />,
    },
    PUB: {
        title: "주점",
        className: "bg-green-500",
        icon: <BiDrink className="w-full h-full p-1" />,
    },
    ETC: {
        title: "기타",
        className: "bg-yellow-500",
        icon: <PiGuitar className="w-full h-full p-1" />,
    },
};

type TCategoryKey = keyof typeof categoryType;

export default function AllianceMap() {
    const categoryKeys = Object.keys(categoryType) as unknown as TCategoryKey[];

    const [categoryFilterStatus, setCategoryFilterStatus] = useState(
        Object.fromEntries(categoryKeys.map(categoryKey => [categoryKey, true])) as unknown as {
            [key in TCategoryKey]: boolean;
        },
    );

    const [Open, setOpen] = useState(new Array(107).fill(false));
    const [partnershipDatas, setPartnershipDatas] = useState<any[]>([]);
    const [list, setList] = useState(true);
    const [center, setCenter] = useState({ lat: 37.27771738352343, lng: 127.04382834467262 });

    useEffect(() => {
        getData()
            .then(d => {
                setPartnershipDatas(d);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const filteredPartnershipDatas = useMemo(() => {
        return partnershipDatas.filter(
            partnershipData => categoryFilterStatus[partnershipData.category as TCategoryKey],
        );
    }, [partnershipDatas, categoryFilterStatus]);

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
                    {filteredPartnershipDatas.map((filteredPartnershipData, index) => (
                        <CustomOverlayMap
                            position={{ lat: filteredPartnershipData.lat, lng: filteredPartnershipData.lng }}
                        >
                            <div
                                className={`translate-x-1/2 translate-y-1/2 rounded-full border-2 border-black flex items-center justify-center ${
                                    categoryType[filteredPartnershipData.category as TCategoryKey].className
                                }`}
                                onClick={() => {
                                    const newBottomSheetStates = [...Open];
                                    newBottomSheetStates[filteredPartnershipData.id] = true;
                                    setOpen(newBottomSheetStates);
                                    setList(false);
                                }}
                                style={{
                                    width: 0.8 * (defaultMapLevel / mapLevel) + "rem",
                                    height: 0.8 * (defaultMapLevel / mapLevel) + "rem",
                                }}
                                key={index}
                            >
                                {categoryType[filteredPartnershipData.category as TCategoryKey].icon}
                            </div>
                        </CustomOverlayMap>
                    ))}
                    <BottomSheet>
                        <div className="px-2 my-2 flex flex-row gap-2 justify-around">
                            {categoryKeys.map(categoryKey => (
                                <button
                                    className={`flex flex-row rounded-full border-2 p-1 w-fit h-8 ${
                                        categoryFilterStatus[categoryKey] ? "bg-base-100" : "bg-base-300"
                                    } `}
                                    onClick={() => {
                                        setCategoryFilterStatus(prev => ({
                                            ...prev,
                                            [categoryKey]: !prev[categoryKey],
                                        }));
                                    }}
                                >
                                    <div
                                        className={`mx-1 my-auto h-5 w-5 rounded-full ${categoryType[categoryKey].className} items-center justify-center flex`}
                                    >
                                        {categoryType[categoryKey].icon}
                                    </div>
                                    <p
                                        className={`mr-1 md:text-base text-sm ${
                                            categoryFilterStatus[categoryKey] ? "font-bold" : ""
                                        }`}
                                    >
                                        {categoryType[categoryKey].title}
                                    </p>
                                </button>
                            ))}
                        </div>

                        <div id="partnershipContainer" className="pt-4 flex flex-col gap-3 px-4">
                            {filteredPartnershipDatas.map(filteredPartnershipData => (
                                <div className="card bg-base-100 ">
                                    <div
                                        className="flex py-4 px-2 space-x-4 border-2 rounded-xl"
                                        onClick={() => {
                                            setCenter({
                                                lat: filteredPartnershipData.lat,
                                                lng: filteredPartnershipData.lng,
                                            });
                                        }}
                                    >
                                        <div>
                                            <span
                                                className={`rounded-full px-2 ${
                                                    categoryType[filteredPartnershipData.category as TCategoryKey]
                                                        .className
                                                }`}
                                            >
                                                {categoryType[filteredPartnershipData.category as TCategoryKey].title}
                                            </span>
                                        </div>
                                        <h2 className="card-title">{filteredPartnershipData.name}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="h-20" />
                    </BottomSheet>
                </MapComponent>
                <BottomNav />
            </div>
        </Resizer>
    );
}
