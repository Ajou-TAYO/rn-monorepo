/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontSize: {
                xxs: "0.5rem",
            },
            grayscale: {
                10: "10%",
                30: "30%",
                50: "50%",
                70: "70%",
                90: "90%",
            },
            width: {
                112: "28rem",
                116: "29rem",
                120: "30rem",
                124: "31rem",
                128: "32rem",
                132: "33rem",
            },
            maxWidth: {
                stat: "21.875rem",
            },
            minWidth: {
                game: "67rem",
            },
            inset: {
                21: "5.25rem",
            },
            height: {
                "real-screen": "calc(var(vh) * 100)",
            },
        },
    },
    darkMode: "class",
    plugins: [],
};
