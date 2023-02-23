const webpack = require('webpack'); // to access built-in plugins
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// NOTE: uncomment this if you want to analyze the bundles
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPngquant = require('imagemin-pngquant');
const ImageminSVGO = require('imagemin-svgo');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SharpBuild = require('./sharp');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            // Translates CSS into CommonJS
            loader: 'css-loader',
            options: { url: false },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            // Compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              sourceMap: true, // used to load files
            },
          },
        ],
      },
      { test: /\.svg$/, loader: 'svg-inline-loader' },
    ],
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.beforeCompile.tapAsync('MyPlugin', async (p, cb) => {
          await SharpBuild();
          cb();
        });
      },
    },
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            // CopyWebpackPlugin ignore file inside images folder
            ignore: ['**/images/**'],
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/images/'),
          to: path.resolve(__dirname, 'dist/images/[path][name]-large[ext]'),
          globOptions: {
            // CopyWebpackPlugin ignore some folders and files
            ignore: [
              '**/android/**',
              '**/ios/**',
              '**/windows11/**',
              'apple-touch-icon.png',
              'favicon-16x16.png',
              'favicon-32x32.png',
              'favicon.ico',
              'maskable_icon_x192.png',
            ],
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/images/'),
          to: path.resolve(__dirname, 'dist/images/[path][name][ext]'),
          globOptions: {
            // CopyWebpackPlugin ignore some folders and files
            ignore: ['**/reviews/**', 'logo.png'],
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'sharp/'),
          to: path.resolve(__dirname, 'dist/images/'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
    // new BundleAnalyzerPlugin(),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
        ImageminPngquant({ quality: [0.5, 0.6] }),
        ImageminSVGO({
          plugins: [
            {
              name: 'removeViewBox',
              active: false,
            },
          ],
        }),
      ],
    }),
  ],
};
