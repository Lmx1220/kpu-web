/**
 * Generation packaging analysis
 * 生成打包分析
 */
import { visualizer } from 'rollup-plugin-visualizer'

export default function createVisualizer() {
  return visualizer({
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  }) as any
}
