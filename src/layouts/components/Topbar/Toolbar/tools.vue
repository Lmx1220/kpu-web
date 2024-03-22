<script lang="ts" setup>
import useSettingsStore from '@/store/modules/settings.ts'

defineOptions({
  name: 'ToolbarTools',
})
const props = defineProps<{
  model?: string
}>()
const modules = import.meta.glob('./*/index.vue', {
  eager: true,
  import: 'default',
})
const settingsStore = useSettingsStore()
const components = computed(() => {
  const index = settingsStore.settings.toolbar.layout.findIndex(item => item === '->')
  const components: string[] = []
  if (props.model === 'left-side') {
    settingsStore.settings.toolbar.layout.forEach((item, i) => {
      i < index && item !== '->' && components.push(item)
    })
  }
  else {
    settingsStore.settings.toolbar.layout.forEach((item, i) => {
      i > index && item !== '->' && components.push(item)
    },
    )
  }
  return components
})
const regexDigit: RegExp = /\d/
const specialChars: string[] = ['-', '_', '/', '.']

function isUpperCase(char: string): boolean {
  return !regexDigit.test(char) && char !== char.toLowerCase()
}

function splitStringBySpecialChars(input: string, specialCharsArray?: string[]): string[] {
  const specialCharsToUse = specialCharsArray ?? specialChars
  const result: string[] = []
  if (!input || typeof input !== 'string') {
    return result
  }
  let temp: string = ''
  let prevIsSpecialChar: boolean | undefined, currentIsSpecialChar: boolean
  for (const char of input) {
    const isSpecialChar: boolean = specialCharsToUse.includes(char)
    if (isSpecialChar) {
      result.push(temp)
      temp = ''
      prevIsSpecialChar = undefined
      continue
    }
    const isUpper: boolean = isUpperCase(char)
    if (!currentIsSpecialChar) {
      if (prevIsSpecialChar === false && isUpper) {
        result.push(temp)
        temp = char
        prevIsSpecialChar = isUpper
        continue
      }
      if (prevIsSpecialChar === true && !isUpper && temp.length > 1) {
        const lastChar: string = temp.charAt(temp.length - 1)
        result.push(temp.slice(0, Math.max(0, temp.length - 1)))
        temp = lastChar + char
        prevIsSpecialChar = isUpper
        continue
      }
    }
    temp += char
    prevIsSpecialChar = isUpper
    currentIsSpecialChar = isSpecialChar
  }
  result.push(temp)
  return result
}

function capitalizeFirstLetter(string: string): string {
  return string ? string[0].toUpperCase() + string.slice(1) : ''
}

interface TransformStringOptions {
  normalize?: boolean
}

// console.log(modules['./NavSearch/index.vue'])
function transformString(input: string | string[], options?: TransformStringOptions): string {
  return input ? (Array.isArray(input) ? input : splitStringBySpecialChars(input)).map(item => capitalizeFirstLetter(options != null && options.normalize ? item.toLowerCase() : item)).join('') : ''
}
</script>

<template>
  <Component :is="modules[`./${transformString(item)}/index.vue`]" v-for="item in components" :key="item" />
<!--  <NavSearch /> -->
</template>

<style lang="scss" scoped>
  .item {
  --at-apply: flex px-2 py-1 cursor-pointer;
  }
</style>
