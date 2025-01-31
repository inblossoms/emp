# 全局配置
## root
+ 类型 `string`
+ 默认 `process.cwd()`

项目根目录、自动获取

## appSrc
+ 类型 `string`
+ 默认 `src`

项目代码来源文件夹

## appEntry
+ 类型 `string`
+ 默认 `index.js`

项目代码入口文件 如 `main.js`


## base
+ 类型 `string`
+ 默认 app 模式下为 `auto`,lib 模式下 为 `空` 屏蔽import auto 模式

相关介绍
- 绝对 URL 路径名，例如 /
- 完整的 URL，例如 https://baidu.com/
- 替代 webpack `publicPath` 的设置，并做了统一化处理

## publicDir
+ 类型 `string`
+ 默认 `public`

静态文件路径


## cacheDir
+ 类型 `string`
+ 默认 `node_modules/.emp-cache`

缓存目录

## resolve.extends
+ 类型 `boolean`
+ 默认为 `true`

是否继承系统默认设置 默认继承
设置 `false` 后，会按需替换 不设置则还是按照系统配置

## resolve.alias
+ 类型 `{[key:string]:string}`
+ 默认为 `{src: config.appSrc}`

## resolve.modules
+ 类型 `string[]`

## resolve.extensions
+ 类型 `string[]`
+ 默认为 `['.js','.jsx','.mjs','.ts','.tsx','.css','.less','.scss','.sass','.json','.wasm','.vue','.svg','.svga']`

## mode
+ 类型 `string`
  - 调试模式为 development
  - 构建模式为 production
  - 正式环境为 none

模式根据执行指令自动变换 <b>暂不支持设置</b>

## define
+ 类型 `Record<string, string|number|boolean>`

全局环境替换
+ 配置
```js
module.exports={
  define: {emp: {name: 'empName', value: ['a', 'b', 'c']}},
}
```
+ 使用
```js
console.log('process.env.emp', process.env.emp)
```

## plugins
+ 类型 `ConfigPluginType[]`

## webpackChain
+ 类型 `WebpackChainType`

暴露到 emp-config.js 可以自定义 webpack 配置
深入了解 Webpack Chain 使用，请看详细文档: https://github.com/neutrinojs/webpack-chain#getting-started
例如:
```js
const {defineConfig} = require('@efox/emp')
const WebpackAssetsManifest = require('webpack-assets-manifest')
module.exports = defineConfig(({mode, env}) => {
  return {
    webpackChain: (chain, config) => {
      // 创建 assets-manifest.json -> 所有资源文件路径
      chain.plugin('WebpackAssetsManifest').use(WebpackAssetsManifest)
    },
  }
})
```
## webpack
+ 类型 `WebpackConfiguration`
+ 默认 `undefined`

跟进 `webpack config` 覆盖之前的内容或者 webpack-chain 没有提供的属性
## empshare
+ 类型 `EMPShareExport`
   - emp share 配置
   - 实现3重共享模型
   - empshare 与 module federation 只能选择一个配置

 详情点击 [了解更多](/develop/#empshare-配置)

+ 使用方法 `emp-config.js`
```js
module.exports={
  // objects
  empshare:{}
  // or funciton
  empshare(o: EMPConfig){}
  // or async function
  async empshare(o: EMPConfig){}
}
```
 + 配置用例如下
 ```js
 module.exports={
    empShare: {
    name: 'microApp',
    remotes: {
      '@microHost': `microHost@http://localhost:8001/emp.js`,
    },
    exposes: {
      './App': './src/App',
    },
    shareLib: {
      react: 'React@https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.development.js',
      'react-dom': 'ReactDOM@https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.development.js',
    }
    },
 }
 ```

##  externals

+ module?: `string` 模块名 @example react-dom
+ global?: `string` 全局变量 @example ReactDom
+ entry?: `string` 入口地址 @example http://
  * 入口地址
  * 不填则可以通过 emp-config 里的 html.files.js[url] 传入合并后的请求
  * 如 http://...?react&react-dom&react-router&mobx
+ type?: `string` 类型入口 js | css

+ 使用方法 `emp-config.js`
```js
module.exports={
  // objects
  externals:{}
  // or funciton
  externals(o: EMPConfig){}
  // or async function
  async externals(o: EMPConfig){}
}
```

## moduleFederation
> module federation 配置、2.0更推荐用  empShare 替代 module federation的配置 [了解更多](/develop/#empshare-配置)
+ 类型 `MFExport`
  + exposes?: 导出模块
  + filename?: 导出文件名 默认为 `emp.js`
  + library?: 库模式
  + name?: 导出名，amd umd cjs
  + remotes?: 远程引用、基站
  + shared?: 共享库、对象

+ 使用方法 `emp-config.js`
```js
module.exports={
  // objects
  moduleFederation:{}
  // or funciton
  moduleFederation(o: EMPConfig){}
  // or async function
  async moduleFederation(o: EMPConfig){}
}
```
使用用例：以 `micro-host` 为例
```js
module.exports={
    moduleFederation:{
      name: 'microHost',
      exposes: {
        './App': './src/App',
      },
      shared: {
        react: {requiredVersion: '^17.0.1'},
        'react-dom': {requiredVersion: '^17.0.1'},
      },
    }
}
```

## useImportMeta
+ 类型 `boolean`
+ 默认 `false`
  - 启用 import.meta
  - 需要在 script type=module 才可以执行

## jsCheck
+ 类型 `boolean`
+ 默认 `false`

启用 ForkTsChecker or Eslint

## splitCss
+ 类型 `boolean`
+ 默认 `true`
  - 启动 mini-css-extract-plugin
  - 分离 js里的css

## html
+ 类型 `HtmlOptions`
> template 与 favicon 不建议 放到 public 静态文件夹 避免copy时报错
> (*)entries 设置后 会继承这里的操作
  - template `string` html模板 默认 `src/index.html` 路径基于当前项目根目录
  - favicon `string` favicon连接 默认 `src/favicon.ico` 路径基于当前项目根目录
  - files 文件插入到html 与 `externals` 叠加 类型 `{css:string[] js:string:[]}`
    - css `string[]` 插入 css
    - js `string[]` 插入 js
	- tags 自定义 头部脚步内容
	  - headTags `string[]` 插入顶部代码 如 `['<script>console.log('headTags1')</script>','<script>console.log('headTags2')</script>']`
		- bodyTags `string[]` 插入 body代码  `['<script>console.log('bodyTags1')</script>','<script>console.log('bodyTags2')</script>']`

其他可以参考 html-webpack-plugin [相关设置](https://github.com/jantimon/html-webpack-plugin)
配置详情请 [点击查看](/develop/#多入口模式)

## entries
+ 类型 `EntriesType`
  - entryFilename 为基于 src目录如 `info/index`
  - HtmlOptions 为 html 的独立配置; `favicon` 请在 `html.favicon` 配置
> (*)entries 设置后 会继承 html 的配置
多页面模式

## reactRuntime
+ 类型 `automatic` | `classic`
+ 默认 `undefined`
  - React Runtime 手动切换jsx模式
  - 当 external react时需要设置
  - 本地安装时会自动判断 不需要设置

## typingsPath
+ 类型 `string`
+ 默认 `src/empShareType`

`emp dts` 指令 同步基站 d.ts 目录
