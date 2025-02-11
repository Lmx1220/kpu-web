<script setup lang="ts">
import useAppDictStore from '@/store/modules/appDict.ts'

const props = withDefaults(defineProps<{
  type?: string
  modelValue?: any
  split?: string
  join?: string
}>(), {
  split: ',',
  join: ',',
})

const appDictStore = useAppDictStore()
const value = computed(() => {
  // 如果 props.modelValue 为 falsy 且不等于 0，则返回空字符串
  if (!props.modelValue && props.modelValue !== 0) {
    return ''
  }

  const result = []

  // 如果 props.modelValue 是数组，直接推入到 result 中；否则，将其转为字符串并按 t.split 分隔
  if (Array.isArray(props.modelValue)) {
    result.push(...props.modelValue)
  }
  else {
    result.push(...props.modelValue.toString().split(props.split))
  }

  // 获取字典数据
  const dictData = appDictStore.getDictData(props.type)
  const labels: string[] = []

  // 遍历 result 中的每个值
  result.forEach((value) => {
    let matched = false

    // 遍历字典数据，寻找匹配项
    for (let i = 0; i < dictData.length; i++) {
      const dictValue = dictData[i].value?.toString()

      // 如果匹配成功，将字典标签推入 labels
      if (dictValue === value?.toString()) {
        labels.push(dictData[i].label)
        matched = true
        break
      }

      // 如果是最后一个元素且没有找到匹配项，直接将值推入 labels
      if (i === dictData.length - 1 && !matched) {
        labels.push(value)
      }
    }
  })

  // 返回通过 props.join 拼接后的结果
  return labels.join(props.join)
})

onMounted(() => {
  appDictStore.requestData(props.type)
})
</script>

<template>
  <div>{{ value }}</div>
</template>
