import type { IntervalHandle } from '#/index'
import type { DirectiveBinding } from 'vue'

interface TimeagoElement extends HTMLElement {
  __timeagoSetInterval__: IntervalHandle
}

export default {
  mounted: (el: TimeagoElement, binding: DirectiveBinding) => {
    el.textContent = useTimeago().format(binding.value)
    if (binding.modifiers.interval) {
      el.__timeagoSetInterval__ = setInterval(() => {
        el.textContent = useTimeago().format(binding.value)
      }, 1000)
    }
  },
  beforeUnmount: (el: TimeagoElement, binding: DirectiveBinding) => {
    if (binding.modifiers.interval) {
      clearInterval(el.__timeagoSetInterval__)
    }
  },
}
