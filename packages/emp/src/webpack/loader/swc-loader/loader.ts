import type {ResovleConfig} from 'src'
export const loader = (options: ResovleConfig) => {
  // console.log('options', options)
  return {
    loader: require.resolve('./swc'),
    options,
  }
}
export const compileType = 'swc'
