module.exports = {
    webpack(config, { defaultLoaders }) {
        config.module.rules.push({
            test: /\.worker.js$/,
            use: ["worker-loader", defaultLoaders.babel],
        });

        return config;
    },
};
