const path = require('path');
const { spawn } = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = process.env.PORT || 8080;

module.exports = (env, argv) => {
  const { mode } = argv;

  const CssModules = [];
  CssModules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: mode === 'development',
        },
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 100,
          modules: {
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
        },
      },
      'postcss-loader',
      'sass-loader',
    ],
  });
  return {
    entry: './src/index.js',
    devtool: mode === 'development' ? 'cheap-module-source-map' : false,
    output: {
      filename: mode === 'development' ? '[name].[hash].js' : '[name].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
      path: path.resolve(__dirname, 'myapp', 'app'),
    },
    devServer: {
      port,
      contentBase: path.join(__dirname, 'myapp', 'app'),
      compress: true,
      quiet: false,
      hot: mode === 'development',
      open: false,
      lazy: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      before() {
        console.log('Staring Main Process...');
        if (mode === 'development') {
          spawn('python3', ['-m', 'myapp', `http://localhost:${port}`], {
            shell: true,
            env: process.env,
            stdio: 'inherit',
          })
            .on('close', code => process.exit(code))
            .on('error', spawnError => console.error(spawnError));
        }
      },
    },
    optimization: {
      minimize: mode !== 'development',
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            parse: {
              ecma: 8,
            },
            mangle: { safari10: true },
            output: {
              ecma: 5,
              safari10: true,
              comments: false,
              /* eslint-disable-next-line camelcase */
              ascii_only: true,
            },
          },
          parallel: true,
          sourceMap: false,
          cache: true,
        }),
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
          main: {
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true,
            enforce: true,
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
      runtimeChunk: true,
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          type: 'javascript/auto',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['react-hot-loader/webpack', 'babel-loader?cacheDirectory=true'],
        },
        {
          test: /\.css$/,
          use: [
            'cache-loader',
            ExtractCssChunks.loader,
            'css-loader',
            'clean-css-loader',
          ],
        },
        {
          test: /\.(jpe?g|png|webp|gif|svg|ico)$/i,
          use: [
            'cache-loader',
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                fallback: 'file-loader?name="[path][name].[ext]"',
              },
            },
          ],
        },
        {
          test: /\.(woff2|woff)$/,
          use: [
            'cache-loader',
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },

        ...CssModules,
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: 'src/themes', to: 'themes' },
        { from: 'src/assets', to: 'assets' },
      ]),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        // favicon: './public/favicon.png',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeScriptTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new ExtractCssChunks({
        filename: '[name].css',
        chunkFilename: '[id].css',
        hot: mode === 'development',
      }),
      new ScriptExtHtmlWebpackPlugin({
        prefetch: [/\.js$/],
        defaultAttribute: 'async',
      }),
      new HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),
      /* eslint-disable camelcase */
      new WebpackPwaManifest({
        name: 'Runcy Server',
        short_name: 'Runcy',
        theme_color: '#3498DB',
        background_color: '#FFF',
        start_url: '/#/home',
        // "icons": [
        //   {
        //     "src": "assets/icons/manifest/icon-192x192.png",
        //     "sizes": "192x192",
        //     "type": "image/png"
        //   },
        //   {
        //     "src": "assets/icons/manifest/icon-512x512.png",
        //     "sizes": "512x512",
        //     "type": "image/png"
        //   }
        // ]
        // icons: [
        //   {
        //     src: path.resolve('public/favicon.png'),
        //     sizes: [36, 48, 72, 96, 144, 192, 512],
        //     ios: true,
        //   },
        // ],
      }),
      /* eslint-enable camelcase */
      new GenerateSW({
        swDest: 'sw.js',
        importWorkboxFrom: 'local',
        clientsClaim: true,
        skipWaiting: true,
      }),
      new HardSourceWebpackPlugin.ExcludeModulePlugin([
        {
          // HardSource works with mini-css-extract-plugin but due to how
          // mini-css emits assets, assets are not emitted on repeated builds with
          // mini-css and hard-source together. Ignoring the mini-css loader
          // modules, but not the other css loader modules, excludes the modules
          // that mini-css needs rebuilt to output assets every time.
          test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
        },
      ]),
      new HardSourceWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin(),
    ],
  };
};
