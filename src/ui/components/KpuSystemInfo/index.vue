<script setup lang="ts">
import hotkeys from 'hotkeys-js'
import { useKpuDrawer } from '../KpuDrawer'

defineOptions({
  name: 'KpuSystemInfo',
})

// const isShow = ref(false)

const { pkg, lastBuildTime } = __SYSTEM_INFO__
const [KDrawer, drawerApi] = useKpuDrawer({
  // zIndex: 2000,
})
onMounted(() => {
  hotkeys('command+i, ctrl+i', () => {
    drawerApi.open()
  })
})
</script>

<template>
  <KDrawer title="系统信息" :closable="false" :footer="false">
    <div v-if="pkg.version">
      <KpuDivider>
        系统信息
      </KpuDivider>
      <div class="text-center text-lg font-bold font-sans">
        {{ pkg.version }}
      </div>
    </div>
    <div>
      <KpuDivider>
        最后编译时间
      </KpuDivider>
      <div class="text-center text-lg font-bold font-sans">
        {{ lastBuildTime }}
      </div>
    </div>
    <div>
      <KpuDivider>
        生产环境依赖
      </KpuDivider>
      <ul class="list-none pl-0 text-sm">
        <li v-for="(val, key) in (pkg.dependencies as object)" :key="key" class="flex items-center justify-between rounded px-2 py-1.5 hover-bg-stone-1 dark-hover-bg-stone-9">
          <div class="font-bold">
            {{ key }}
          </div>
          <div class="font-sans">
            {{ val }}
          </div>
        </li>
      </ul>
    </div>
    <div class="px-4">
      <KpuDivider>
        开发环境依赖
      </KpuDivider>
      <ul class="list-none pl-0 text-sm">
        <li v-for="(val, key) in (pkg.devDependencies as object)" :key="key" class="flex items-center justify-between rounded px-2 py-1.5 hover-bg-stone-1 dark-hover-bg-stone-9">
          <div class="font-bold">
            {{ key }}
          </div>
          <div class="font-sans">
            {{ val }}
          </div>
        </li>
      </ul>
    </div>
  </KDrawer>
</template>
