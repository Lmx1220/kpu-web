<script setup lang="ts">
import hotkeys from 'hotkeys-js'

defineOptions({
  name: 'KSystemInfo',
})

const isShow = ref(false)

const { pkg, lastBuildTime } = __SYSTEM_INFO__

onMounted(() => {
  hotkeys('command+i, ctrl+i', () => {
    isShow.value = true
  })
})
</script>

<template>
  <KDrawer v-model="isShow" title="系统信息" :footer="false">
    <div v-if="pkg.version">
      <KDivider>
        系统信息
      </KDivider>
      <div class="text-center text-lg font-bold font-sans">
        {{ pkg.version }}
      </div>
    </div>
    <div>
      <KDivider>
        最后编译时间
      </KDivider>
      <div class="text-center text-lg font-bold font-sans">
        {{ lastBuildTime }}
      </div>
    </div>
    <div>
      <KDivider>
        生产环境依赖
      </KDivider>
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
      <KDivider>
        开发环境依赖
      </KDivider>
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
