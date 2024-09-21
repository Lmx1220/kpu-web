<script setup lang="ts">
import type { Settings } from '#/global'
import useSettingsStore from '@/store/modules/settings'
import { pascalCase } from 'scule'

defineOptions({
  name: 'ToolbarTools',
})

const props = defineProps<{
  mode: 'left-side' | 'right-side'
}>()

const modules = import.meta.glob('./*/index.vue', { import: 'default', eager: true })

const settingsStore = useSettingsStore()

const tools = computed(() => {
  const index = settingsStore.settings.toolbar.layout.findIndex(item => item === '->')
  const tools: Exclude<keyof Settings.toolbar, 'layout'>[] = []
  if (props.mode === 'left-side') {
    settingsStore.settings.toolbar.layout.forEach((item, i) => {
      if (i < index && item !== '->') {
        tools.push(item)
      }
    })
  }
  else {
    settingsStore.settings.toolbar.layout.forEach((item, i) => {
      if (i > index && item !== '->') {
        tools.push(item)
      }
    })
  }
  return tools
})
</script>

<template>
  <template v-for="item in tools" :key="item">
    <Component :is="modules[`./${pascalCase(item)}/index.vue`]" v-if="settingsStore.settings.toolbar[item]" />
  </template>
</template>
