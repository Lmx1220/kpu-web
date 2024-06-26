import mediumZoom from 'medium-zoom'

export default {
  mounted(el: HTMLElement) {
    mediumZoom(el, {
      background: 'var(--g-bg)',
    })
  },
}
