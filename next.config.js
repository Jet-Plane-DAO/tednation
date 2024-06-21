/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["127.0.0.1", "localhost"],
        remotePatterns: [
            {
                hostname: "placekitten.com",
            },
            {
                hostname: "gerowallet.io",
            },
            { hostname: "firebasestorage.googleapis.com" },
            { hostname: "ipfs.blockfrost.dev" },
        ],
    },
    webpack: function (config, options) {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };
        // Remove critical dependancy warning
        config.plugins.push(
            new webpack.ContextReplacementPlugin(/@emurgo[\\/\\]cardano-serialization-lib-browser/, (data) => {
                data.dependencies.map((d) => delete d.critical);
                return data;
            })
        );
        return config;
    },
};
module.exports = nextConfig;
