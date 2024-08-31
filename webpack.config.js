const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

const htmlFiles = glob.sync("./src/**/*.html"); // find all .html in src folder

console.log("HTML Files Found:", htmlFiles); // found .html log files

// create an instance of HtmlWebpackPlugin for each .html file
const htmlPlugins = htmlFiles.map(
  (file) =>
    new HtmlWebpackPlugin({
      inject: "body", // ensure the script is loaded at the end of the body
      template: file, // File .html as template
      filename: path.relative("./src", file), // output in dist folder with same file name
    }),
);

module.exports = {
  mode: "production", // webpack  mode build  
  entry: {
    app: "./src/js/app.js", // entry point input .js
  },
  output: {
    path: path.resolve(__dirname, "dist"), // entry output .js (dist/js)
    filename: "js/[name].bundle.js",   
  //  
    assetModuleFilename: 'assets/images/[name][ext]', // entry output .img (dist/assets)
  },
  plugins: [
    ...htmlPlugins, // HtmlWebpackPlugin instances
  ],
  module: {
    // rules style
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", 
        ],
      },
     // rules images
     {
      test: /\.(png|jpg|jpeg|gif|svg)$/i, // type of img
      type: 'asset/resource',  // use asset/resource for build image
    },
    ],
  },
  // config webpack-dev-server
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
