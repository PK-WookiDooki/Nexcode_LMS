/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#1890FF",
                lightBlue: "#F0F5FF",
                darkBlue: "#096DD9",
                danger: "#FF4D4F",
                secondary: "#F5F5F5",
                disabledGray: "#BFBFBF",
                c52 : "#52C41A"
            },
        },
        fontFamily: {
            sans: ["Montserrat", "sans-serif"],
        },
    },
    plugins: [],
    //corePlugins: {
    //    preflight: false,
    //},
};
