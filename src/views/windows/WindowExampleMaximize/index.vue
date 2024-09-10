<script setup lang="ts">
const appWindow = useWindow()
</script>

<template>
  <div>
    <PageHeader
      title="主页面最大化" content="扩大可视范围和操作区域，能更专注于主页面上的操作"
    />
    <PageMain>
      <p>同时框架还提供全局函数，可自由控制主页面是否最大化。</p>
      <p>可通过双击标签页，或在标签页上右键并选择“最大化”进入。</p>
      <ElButton @click="appWindow.toggleMaximize('WindowExampleMaximize')">
        {{ appWindow.isMaximize("WindowExampleMaximize") ? '退出最大化' : '当前窗口最大化' }}
      </ElButton>
    </PageMain>
  </div>
</template>
