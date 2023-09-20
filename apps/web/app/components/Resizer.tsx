"use client";

import React, { ReactNode, useEffect } from "react";

export const Resizer: React.FC<{ children: ReactNode }> = ({ children }) => {
    useEffect(() => {
        // ! FIXME: TEMP SSR PATCH
        if (typeof window === "undefined") {
            return;
        }

        const resizeFontSize = () => {
            const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

            // uniform scale for our game
            const scale = Math.min(screenWidth / 1920, screenHeight / 1080);

            // the "uniformly enlarged" size for our game
            const enlargedWidth = Math.floor(scale * 1920);

            // now we use css trickery to set the sizes and margins
            const documentStyle = document.documentElement.style;

            documentStyle.fontSize = `${enlargedWidth / 80}px`;
        };

        resizeFontSize();
        window.addEventListener("resize", resizeFontSize);

        return () => {
            window.removeEventListener("resize", resizeFontSize);
            const documentStyle = document.documentElement.style;
            documentStyle.fontSize = "";
        };
    }, []);

    return <>{children}</>;
};
