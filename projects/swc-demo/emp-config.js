const {defineConfig} = require('@efox/emp')
module.exports = defineConfig(() => {
  return {
    css: {
      minType: 'swc',
    },
    build: {
      sourcemap: true,
    },
    debug: {
      clearLog: false,
      // level: 'debug',
      webpackCache: false,
    },
  }
})
