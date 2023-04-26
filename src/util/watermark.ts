// interface WatermarkSettings {
//   watermark_id: string
//   watermark_prefix: string
//   watermark_txt: string
//   watermark_x: number
//   watermark_y: number
//   watermark_rows: number
//   watermark_cols: number
//   watermark_x_space: number
//   watermark_y_space: number
//   watermark_font: string
//   watermark_color: string
//   watermark_fontsize: string
//   watermark_alpha: number
//   watermark_width: number
//   watermark_height: number
//   watermark_angle: number
//   watermark_parent_width: number
//   watermark_parent_height: number
//   watermark_parent_node: HTMLElement | null
//   monitor: boolean
// }

// const watermark: any = {}
// let forceRemove = false
// const defaultSettings: WatermarkSettings = {
//   watermark_id: 'wm_div_id',
//   watermark_prefix: 'mask_div_id',
//   watermark_txt: '测试水印',
//   watermark_x: 20,
//   watermark_y: 20,
//   watermark_rows: 0,
//   watermark_cols: 0,
//   watermark_x_space: 50,
//   watermark_y_space: 50,
//   watermark_font: '微软雅黑',
//   watermark_color: 'black',
//   watermark_fontsize: '18px',
//   watermark_alpha: 0.15,
//   watermark_width: 100,
//   watermark_height: 100,
//   watermark_angle: 15,
//   watermark_parent_width: 0,
//   watermark_parent_height: 0,
//   watermark_parent_node: null,
//   monitor: true,
// }
// const globalSetting: WatermarkSettings | undefined
// const MutationObserver
//   = window.MutationObserver
//   || window.WebKitMutationObserver
//   || window.MozMutationObserver
// const domChangeCallback = function (records: MutationRecord[]) {
//   if (forceRemove) {
//     forceRemove = false
//     return
//   }
//   if (
//     (globalSetting && records.length === 1)
//     || (records.length === 1 && records[0].removedNodes.length >= 1)
//   ) {
//     // eslint-disable-next-line @typescript-eslint/no-use-before-define
//     loadMark(globalSetting)
//   }
// }
// const hasObserver: boolean = MutationObserver !== undefined
// const watermarkDom: MutationObserver | null = hasObserver
//   ? new MutationObserver(domChangeCallback)
//   : null
// const option = {
//   childList: true,
//   attributes: true,
//   subtree: true,
// }

// const loadMark = function (settings?: WatermarkSettings): void {
//   Object.assign(defaultSettings, settings)
//   const watermark_element = document.getElementById(defaultSettings.watermark_id)
// }
// // TODO: watermark 未完成 2021/10/20
