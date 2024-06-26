import type { Opts, TDate } from 'timeago.js'
import { format as TAformat, render as TArender, cancel } from 'timeago.js'

export default function useTimeago() {
  function format(data: TDate, opts?: Opts) {
    return TAformat(data, 'zh_CN', opts)
  }

  function render(nodes: HTMLElement | HTMLElement[] | NodeList, opts?: Opts) {
    return TArender(nodes, 'zh_CN', opts)
  }

  return {
    format,
    render,
    cancel,
  }
}
