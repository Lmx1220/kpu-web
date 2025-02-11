<script setup lang="ts">
import type { DescItem } from './typing.ts'
import { componentMap } from '@/adapter/vxe-table.ts'

withDefaults(
  defineProps<{
    title?: string
    bordered?: boolean
    size?: '' | 'large' | 'default' | 'small'
    column?: number
    labelClass?: string
    contentClass?: string
    schema?: DescItem[]
    data?: Recordable
  }>(),
  {
    title: '',
    bordered: true,
    column: 12,
    labelClass: 'w-36',
    contentClass: 'w-0',
    schema: () => [],
  },
)
</script>

<template>
  <ElDescriptions
    :column="column"
    :size="size"
    :border="bordered"
    :title
  >
    <ElDescriptionsItem v-for="item in schema" :key="item.field" :label-class-name="labelClass" :class-name="contentClass" :label="item.label" :span="item.span">
      <template v-if="componentMap.has(item.component)">
        <Component :is="componentMap.get(item.component)" :model-value="data ? data[item.field] : undefined" v-bind="item.componentProps" />
      </template>
      <template v-else-if="!componentMap.has(item.component) && item.render">
        <Component :is="item.render(data ? data[item.field] : undefined, data!)" :model-value="data ? data[item.field] : undefined" v-bind="item.componentProps" />
      </template>
      <template v-else>
        {{ data ? data[item.field] : undefined }}
      </template>
    </ElDescriptionsItem>
  </ElDescriptions>
</template>
