require("webpack");
const config   = {
    mode: "production",
    entry: "./src/index.js",
    watch: true,
    output: {
        path: __dirname + "/src",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};
module.exports = config;
