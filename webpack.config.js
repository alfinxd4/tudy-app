const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');


// Temukan semua file HTML di folder src
const htmlFiles = glob.sync('./src/**/*.html');

// Log file HTML yang ditemukan
console.log('HTML Files Found:', htmlFiles);

// Buat instance HtmlWebpackPlugin untuk setiap file HTML
const htmlPlugins = htmlFiles.map(file => new HtmlWebpackPlugin({
  template: file,                    // File HTML sebagai template
  filename: path.relative('./src', file)     // Output di folder dist dengan nama file yang sama
}));

module.exports = {
  mode: 'development',
  entry: {
    app: './src/js/[filename].js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
  },
  plugins: [
    /* HTML Webpack Plugin */
    ...htmlPlugins,  // Menambahkan semua plugin HTML yang ditemukan  
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader', // Menggunakan postcss-loader untuk Tailwind
        ],
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