const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, ""),
        },
        hot: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "assets", to: "assets" }, //to the dist root directory
            ],
        }),
    ],
};

module.exports = config;
