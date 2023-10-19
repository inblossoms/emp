# CSS
## css.unit
+ 类型 `vw` | `rem` | `undefined`
+ 默认 `undefined`
  - 单位转换 同时设置 vw 与 rem 默认切换到 vw
## css.vw
+ [`PostcssViewPortOptions`](https://github.com/efoxTeam/emp/blob/next/packages/emp/src/config/css.ts#L6)
+ 默认 `null`
  - `postcss-px-to-viewport` 设置

## css.rem
+ [`PostcssREMOptions`](https://github.com/efoxTeam/emp/blob/next/packages/emp/src/config/css.ts#L86)
+ 默认 `null`
  - `postcss-rem` 设置

## css.minType `beta`
+ 类型 `nano` | `swc`
+ 默认 `swc`
  - 当使用 `swc` 编译时可以开启 `css.minType` 为 `swc`
	- 目前部分 代码会产生报错 [@efox/emp-compile-swc@1.3.1](https://github.com/efoxTeam/emp/tree/main/packages/compile-swc) 观察已经修复 有问题可以提交到 [issue](https://github.com/efoxTeam/emp/issues)
