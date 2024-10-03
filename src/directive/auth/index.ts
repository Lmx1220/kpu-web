import type { DirectiveBinding } from 'vue'

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  if (binding.modifiers.all ? useAuth().authAll(binding.value) : useAuth().auth(binding.value)) {
    el.style.display = ''
  }
  else {
    el.style.display = 'none'
  }
}

export default checkPermission
