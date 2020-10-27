module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: ["./components/**/*.js", "./pages/**/*.js"],
    theme: {
        extend: {
            boxShadow: {
                invalid: "0 0 0 3px rgba(245, 101, 101, 0.5)",
            },
        },
        fontFamily: {
            sans: [
                "Inter",
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe UI",
                "Roboto",
                "Helvetica",
                "Arial",
                "sans-serif",
            ],
        },
    },
    variants: {
        backgroundColor: ({ after }) => after(["checked"]),
        boxShadow: ({ after }) => after(["focus-visible"], "focus"),
    },
};
