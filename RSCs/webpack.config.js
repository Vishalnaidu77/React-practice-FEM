import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactServerWebpackPlugin from 'react-server-dom-webpack/plugin'
import plugin from 'react-server-dom-webpack/plugin'
import { fileURLToPath } from "url";
import { dirname } from "path";

const mode = process.env.NODE_ENV || "development"
const development = mode === "development"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
    mode,
    entry: "./src/Client.jsx",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    resolve: {
        extension: [".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            publicPath: "/assets/",
            template: "./index.html"
        }),
        new ReactServerWebpackPlugin({ isServer: false })
    ],
    output: {
        chunkFilename: development
      ? "[id].chunk.js"
      : "[id].[contenthash].chunk.js",
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      clean: true
    }
}

export default config;