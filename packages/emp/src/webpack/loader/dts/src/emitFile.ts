// import webpack from 'webpack'
// import ts from 'typescript'
// import fs from 'fs-extra'
// import {LoaderOptions} from '../index'
// import path from 'path'

// /**
//  * 编译结果缓存
//  * 因为 loader 每个文件都会执行
//  */
// const caches: any = {
//   entireDts: '',
//   keys: [],
// }

// /**
//  * 写入文件
//  * 想清空目标目录，再新建目标目录和文件
//  * @param filePath
//  * @param fileName
//  * @param data
//  */
// function writeDtsFile(filePath: string, fileName: string, data: string) {
//   const dtsEntryPath = path.resolve(filePath, fileName)
//   // fs.removeSync(filePath)
//   fs.ensureDirSync(filePath)
//   console.log('dtsEntryPath', fileName, filePath)
//   fs.writeFileSync(dtsEntryPath, data, 'utf8')
// }

// /**
//  * 包裹出 declare 表达式块
//  * @param name 项目名
//  * @param module 模块路径
//  * @param text 声明内容
//  * @returns
//  */
// function warpDeclareModule(name: string, module: string, text: string) {
//   const modifyText = text.replace(/declare/g, '')
//   return `declare module '${name}${module.replace('.', '')}' {\r\n${modifyText}}\r\n`
// }

// /**
//  * 根据 Typescript Service 编译结果和 expose 产出文件
//  * @param context
//  * @param languageService
//  * @param loaderOptions
//  */
// function emitFile(
//   context: webpack.LoaderContext<Partial<LoaderOptions>>,
//   languageService: ts.LanguageService,
//   loaderOptions: LoaderOptions,
//   outDir: string,
// ) {
//   const fileName = context.resourcePath
//   try {
//     const output = languageService.getEmitOutput(fileName)
//     console.log('output', output, outDir)
//     if (!output.emitSkipped) {
//       output.outputFiles.forEach(o => {
//         if (o.name.endsWith('.d.ts') && !caches.keys.includes(o.name)) {
//           // lib模式
//           // if (loaderOptions.lib) {
//           // o.text = warpDeclareModule(loaderOptions?.libName ?? '.', '.', o.text)
//           // const filename = path.basename(o.name)
//           // const dir = path.dirname(o.name)
//           caches.entireDts =
//             caches.entireDts + warpDeclareModule('', o.name.replace(`${outDir}/`, '').replace('.d.ts', ''), o.text)
//           // writeDtsFile(loaderOptions.typesOutputDir, `index.d.ts`, caches.entireDts)
//           caches.keys.push(o.name)
//           // } else {
//           // module federation 模式
//           // if (loaderOptions.exposes && JSON.stringify(loaderOptions.exposes) !== '{}' && !!loaderOptions.name) {
//           //   // 遍历 exposes 的声明结果
//           //   for (const [key, value] of Object.entries(loaderOptions.exposes)) {
//           //     if (key && value) {
//           //       context.resolve(context.rootContext, value, (err, inputFilePath) => {
//           //         if (err) {
//           //           console.error(err)
//           //           return
//           //         }
//           //         // expose 对应的文件路径和 TS 编译结果路径是否相等
//           //         if (inputFilePath === fileName) {
//           //           caches.entireDts = caches.entireDts + warpDeclareModule(loaderOptions.name ?? '.', key, o.text)
//           //         }
//           //       })
//           //     }
//           //   }
//           //   writeDtsFile(loaderOptions.typesOutputDir, `index.d.ts`, caches.entireDts)
//           // }
//           // }
//         }
//       })
//       console.log('caches.entireDts', caches)
//     }
//   } catch (e) {
//     console.log(`Skip ${fileName}:`, e)
//   }
// }

// export {emitFile}
