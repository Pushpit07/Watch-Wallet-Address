module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./pageComponents/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#fa6e48",
                    200: "#f56842",
                    300: "#d9603f",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
