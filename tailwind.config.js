module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./pageComponents/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};
