export default {
  mounted: (el: any, binding: any) => {
    el.textContent = useTimeago().format(binding.value)
    if (binding.modifiers.interval) {
      el.__timeagoSetInterval__ = setInterval(() => {
        el.textContent = useTimeago().format(binding.value)
      }, 1000)
    }
  },
  beforeUnmount: (el: any, binding: any) => {
    if (binding.modifiers.interval) {
      clearInterval(el.__timeagoSetInterval__)
    }
  },
}
