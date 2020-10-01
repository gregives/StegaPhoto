module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: [
        './components/**/*.js',
        './pages/**/*.js',
    ],
    theme: {
        fontFamily: {
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
        }
    },
    variants: {
        backgroundColor: ({ after }) => after(['checked']),
        boxShadow: ({ after}) => after(['focus-visible'], 'focus')
    }
}
