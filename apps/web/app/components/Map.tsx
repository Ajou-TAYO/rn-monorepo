"use client";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { Resizer } from "./Resizer";

interface MapComponentProps {
    lat: number;
    lng: number;
    level: number;
    children: React.ReactNode;
}

export const MapComponent: React.FC<MapComponentProps> = ({ lat, lng, level, children }) => {
    const [loading, error] = useKakaoLoader({
        appkey: "f1494ad8df2a9262259940f691221ac9",
    });

    return (
        <Resizer>
            <Map center={{ lat, lng }} level={level} className="z-0 h-[90vh] w-screen">
                {children}
            </Map>
        </Resizer>
    );
};
