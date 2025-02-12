<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { DescItem } from './typing.ts'
import { componentMap } from '@/adapter/vxe-table.ts'

withDefaults(
  defineProps<{
    title?: string
    bordered?: boolean
    size?: '' | 'large' | 'default' | 'small'
    column?: number
    labelStyle?: CSSProperties
    contentStyle?: CSSProperties
    schema?: DescItem[]
    data?: Recordable
  }>(),
  {
    title: '',
    bordered: true,
    column: 12,
    labelStyle: () => ({
      width: '120px',
    }),
    contentStyle: () => ({
      width: '0px',
    }),
    schema: () => [],
  },
)
</script>

<template>
  <ADescriptions
    :column="column"
    :size="size"
    :bordered="bordered"
    :label-style="labelStyle"
    :content-style="contentStyle"
    :title
  >
    <ADescriptionsItem v-for="item in schema" :key="item.field" :label="item.label" :span="item.span">
      <template v-if="componentMap.has(item.component)">
        <Component :is="componentMap.get(item.component)" :model-value="data ? data[item.field] : undefined" v-bind="item.componentProps" />
      </template>
      <template v-else-if="!componentMap.has(item.component) && item.render">
        <Component :is="item.render(data ? data[item.field] : undefined, data!)" :model-value="data ? data[item.field] : undefined" v-bind="item.componentProps" />
      </template>
      <template v-else>
        {{ data ? data[item.field] : undefined }}
      </template>
    </ADescriptionsItem>
  </ADescriptions>
</template>
