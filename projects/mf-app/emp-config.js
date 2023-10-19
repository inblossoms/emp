const {defineConfig} = require('@efox/emp')
module.exports = defineConfig(() => {
  return {
    server: {
      port: 8882,
    },
    empShare: {
      name: 'mfApp',
      remotes: {
        '@mfHost': `mfHost@http://127.0.0.1:8881/emp.js`,
      },
      exposes: {
        './App': './src/App',
      },
      shared: {
        react: {requiredVersion: '^17.0.1', singleton: true},
        'react-dom': {requiredVersion: '^17.0.1', singleton: true},
      },
    },
    debug: {
      clearLog: false,
      // level: 'debug',
      webpackCache: false,
    },
  }
})
