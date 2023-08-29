const path = require("path");


/** @type {import("webpack").Configuration} */
module.exports = {
    entry: "./src/index.ts",
    resolve: {
        extensions: [".ts", "js"],
        alias: {
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@error": path.resolve(__dirname, "./src/errors"),
            "@nodes": path.resolve(__dirname, "./src/errors"),
        }
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: {
            name: {
                root: "step-parser",
                amd: "step-parser",
                commonjs: "step-parser",
            },
            type: "umd",
        },
        globalObject: "globalThis",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts?/,
                exclude: "node_modules",
                loader: "ts-loader"
            }
        ]
    }
}