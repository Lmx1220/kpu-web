<script setup lang="ts">
const mainPage = useMainPage()
// 标题设置为「 测试标题 」
function setCustomTitle() {
  mainPage.setCustomTitle('测试标题')
}
function resetCustomTitle() {
  mainPage.resetCustomTitle()
}
</script>

<template>
  <div>
    <PageMain>
      <ElButton @click="setCustomTitle">
        标题设置为「 测试标题 」
      </ElButton>
      <ElButton @click="resetCustomTitle">
        标题重置
      </ElButton>
    </PageMain>
  </div>
</template>
