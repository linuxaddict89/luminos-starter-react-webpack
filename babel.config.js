const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: 'last 2 versions, > 5%, safari tp',
      },
    },
  ],
  ['@babel/preset-react'],
];

const plugins = [
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['@babel/plugin-transform-async-to-generator'],
  [
    'babel-plugin-styled-components',
    {
      minify: true,
      pure: true,
    },
  ],
  ['@babel/plugin-syntax-dynamic-import'],

  ['react-hot-loader/babel'],
];

module.exports = { presets, plugins };
