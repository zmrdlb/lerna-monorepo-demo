module.exports = function (api) {
    const isDevelopment = api.env('development');
    api.cache.using(() => isDevelopment);

    const presets = [
    [
        "@babel/preset-env",
        {
            useBuiltIns: false
        }
    ]
  ];

  const plugins = [
      [
          "@babel/plugin-transform-runtime"
      ]
  ];

  return {
      presets,
      plugins
  };
}
