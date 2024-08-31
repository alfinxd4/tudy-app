const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

// Temukan semua file HTML di folder src
const htmlFiles = glob.sync("./src/**/*.html");

// Log file HTML yang ditemukan
console.log("HTML Files Found:", htmlFiles);

// Buat instance HtmlWebpackPlugin untuk setiap file HTML
const htmlPlugins = htmlFiles.map(
  (file) =>
    new HtmlWebpackPlugin({
      inject: "body", // memastikan script di-load di akhir body
      template: file, // File HTML sebagai template
      filename: path.relative("./src", file), // Output di folder dist dengan nama file yang sama
    }),
);

module.exports = {
  mode: "production",
  entry: {
    app: "./src/js/app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js",
 
    assetModuleFilename: 'assets/images/[name][ext]',
  },
  plugins: [
    ...htmlPlugins, // Menyertakan semua HtmlWebpackPlugin instances
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", // Menggunakan postcss-loader untuk Tailwind
        ],
      },
     // Rule untuk gambar
     {
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      type: 'asset/resource',  // Menggunakan asset/resource untuk build gambar
    },
    ],
  },
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
