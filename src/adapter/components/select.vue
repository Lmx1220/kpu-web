<script setup lang="ts">
import type { OptionsItem } from '@/api/modules/common/model/optionsModel.ts'

const props = withDefaults(defineProps<{
  modelValue?: any
  options?: OptionsItem[]
  join?: string
}>(), {
  options: () => ([]),
  join: ',',
})

const value = computed(() => {
  // 判断 props.value 是否为数组
  if (Array.isArray(props.modelValue)) {
    // 如果是数组，过滤出 props.modelValue 中包含的选项，映射成标签，并拼接成字符串
    return props.options
      .filter(option => props.modelValue.includes(option.value)) // 过滤出 props.modelValue 包含的选项
      .map(option => option.label) // 提取 label 字段
      .join(props.join) // 用 props.join 拼接标签
  }
  else {
    // 如果不是数组，找到与 props.modelValue 匹配的单个选项并返回其 label
    const selectedOption = props.options.find((option) => {
      const optionValue = option.value?.toString() // 获取选项值
      const targetValue = props.modelValue?.toString() // 获取 props.modelValue 的值
      return optionValue === targetValue // 匹配值
    })

    // 如果找到匹配项，返回其 label，否则返回 undefined
    return selectedOption?.label
  }
})
</script>

<template>
  <div>{{ value }}</div>
</template>
