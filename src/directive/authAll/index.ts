import type { DirectiveBinding } from 'vue'

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding
  if (!useAuth().authAll(value) && el.parentNode) {
    el.parentNode.removeChild(el)
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
}
