const path = require("path");
const package = require('./package.json')

const libraryName = package.name


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
                root: libraryName,
                amd: libraryName,
                commonjs: libraryName,
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
    },
    plugins: [
        function () {
            this.hooks.done.tap({
                name: "dts-bundler"
            }, stats => {
                const dts = require('dts-bundle')
                dts.bundle({
                    name: libraryName,
                    main: './dist/types/index.d.ts',
                    out: "../index.d.ts",
                    removeSource: true,
                    outputAsModuleFolder: true
                })
            })
        }
    ]
}