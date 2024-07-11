<script lang="ts" setup>
import BuildNow from './BuildNow.vue'
import CodePreview from './CodePreview.vue'
import ColumnInfo from './ColumnInfo.vue'
import GenInfo from './GenInfo.vue'
import { ActionEnum } from '@/enums/commonEnum.ts'

defineOptions({
  name: 'DetailForm',
})
withDefaults(defineProps<Props>(), {
  id: '',
  type: ActionEnum.EDIT,
})
export interface Props {
  id?: string | string[]
  type?: ActionEnum
}

const { activeStatus } = inject('activeStatus') as {
  activeStatus: Ref<{
    active: number
    processStatus: string
  }>
}
const activeList = ref<number[]>([])

watch(() => activeStatus.value.active, (val) => {
  if (!activeList.value.includes(val)) {
    activeList.value.push(val)
  }
}, { immediate: true })

const genInfo = ref<InstanceType<typeof GenInfo>>()

defineExpose({
  submit(callback: any) {
    genInfo.value?.submit(callback)
  },
  validate() {
    return genInfo.value?.validate()
  },
})
</script>

<template>
  <div>
    <GenInfo v-if="activeList.includes(0)" v-show="activeStatus.active === 0" :id="id" ref="genInfo" />
    <ColumnInfo v-if="activeList.includes(1)" v-show="activeStatus.active === 1" :id="id" />
    <CodePreview v-if="activeStatus.active === 2" :id="id" />
    <BuildNow v-if="activeList.includes(3)" v-show="activeStatus.active === 3" :id="id" />
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
