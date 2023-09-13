"use client";

import { Map } from "react-kakao-maps-sdk";

interface MapComponentProps {
    lat: number;
    lng: number;
    level: number;
    children: React.ReactNode;
}

export const MapComponent: React.FC<MapComponentProps> = ({ lat, lng, level, children }) => {
    return (
        <Map center={{ lat, lng }} level={level} className="z-0 h-screen w-screen">
            {children}
        </Map>
    );
};
