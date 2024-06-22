import SpinkitLoading from '../components/SpinkitLoading/index.vue'

let spinkit: any
let div: any
function loading(props?: {
  type: 'plane' | 'chase' | 'bounce' | 'wave' | 'pulse' | 'flow' | 'swing' | 'circle' | 'circle-fade' | 'grid' | 'fold' | 'wander'
  size: number
  color: string
  text?: any
}) {
  spinkit = createApp(SpinkitLoading, props)
  div = document.createElement('div')
  document.body.appendChild(div)
  spinkit.mount(div)
}
function close() {
  spinkit.unmount()
  document.body.removeChild(div)
}
export { loading, close }
