/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "placekitten.com",
      },
    ],
  },
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
    };
    // Remove critical dependancy warning
    config.plugins.push(
      new webpack.ContextReplacementPlugin(
        /@emurgo[\\/\\]cardano-serialization-lib-browser/,
        (data) => {
          data.dependencies.map((d) => delete d.critical);
          return data;
        }
      )
    );
    return config;
  },
};
module.exports = nextConfig;
