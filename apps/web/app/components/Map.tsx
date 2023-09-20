"use client";

import { CustomOverlayMap, Map, MapMarker, useInjectKakaoMapApi } from "react-kakao-maps-sdk";
import { Resizer } from "./Resizer";
import { useCallback, useEffect, useState } from "react";
import Script from "next/script";

interface MapComponentProps {
    lat: number;
    lng: number;
    level: number;
    children: React.ReactNode;
}

export const defaultMapLevel = 6;
export let mapLevel = defaultMapLevel;

export const MapComponent: React.FC<MapComponentProps> = ({ lat, lng, level, children }) => {
    // const { loading, error } = useInjectKakaoMapApi({
    //     appkey: "f1494ad8df2a9262259940f691221ac9",
    // });

    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => {
        updateState({});
        console.log("update map");
    }, []);

    const [userState, setUserState] = useState({
        center: {
            lat: 37.27771738352343,
            lng: 127.04382834467262,
        },
        errMsg: null,
        isLoading: false,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setUserState({
                        center: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                        errMsg: null,
                        isLoading: true,
                    });
                },
                err => {
                    setUserState({
                        center: {
                            lat: 37.27771738352343,
                            lng: 127.04382834467262,
                        },
                        errMsg: err.message,
                        isLoading: false,
                    });
                },
            );
        } else {
            setUserState({
                center: {
                    lat: 37.27771738352343,
                    lng: 127.04382834467262,
                },
                errMsg: "위치 정보를 사용할 수 없습니다.",
                isLoading: false,
            });
        }
    }, []);

    return (
        <Resizer>
            <Script
                src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f1494ad8df2a9262259940f691221ac9&libraries=services,clusterer&autoload=false"
                strategy="beforeInteractive"
            />
            <Map
                center={{ lat, lng }}
                level={level}
                className="z-0 h-[90vh] w-screen"
                onZoomChanged={map => {
                    mapLevel = map.getLevel();
                    forceUpdate();
                }}
            >
                {userState.isLoading && (
                    <CustomOverlayMap position={userState.center}>
                        <div className="p-3 bg-blue-500 rounded-full border-2 border-black" />
                    </CustomOverlayMap>
                )}
                {children}
            </Map>
        </Resizer>
    );
};
