module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', {
      unstable_transformImportMeta: true
    }]],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        helpers: true,
        regenerator: true,
      }],
    ],
    overrides: [
      {
        test: './node_modules/zustand',
        plugins: [
          ['@babel/plugin-transform-runtime', {
            helpers: true,
            regenerator: true,
          }],
        ],
      },
    ],
  };
}; 