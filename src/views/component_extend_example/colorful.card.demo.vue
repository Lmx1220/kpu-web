<script setup lang="ts">

</script>

<template>
  <div>
    <PageHeader title="多彩渐变卡片" content="ColorfulCard" />
    <PageMain>
      <ElRow :gutter="20">
        <ElCol :md="6">
          <ColorfulCard
            header="开发文档"
            :num="123"
            tip="较上周上升50%"
          />
        </ElCol>
        <ElCol :md="6">
          <ColorfulCard
            color-from="#fbaaa2"
            color-to="#fc5286"
            header="开发文档"
            :num="12323"
            tip="较上周上升50%"
            icon="ep:element-plus"
          />
        </ElCol>
        <ElCol :md="6">
          <ColorfulCard
            color-from="#ff763b"
            color-to="#ffc480"
            header="扩展组件"
            :num="123"
            tip="较上周上升50%"
            icon="ri:pages-line"
          />
        </ElCol>
        <ElCol :md="6">
          <ColorfulCard
            color-from="#6a8eff"
            color-to="#0e4cfd"
            header="业务应用页面"
            :num="123"
            tip="较上周上升50%"
            icon="ep:link"
          />
        </ElCol>
      </ElRow>
    </PageMain>
  </div>
</template>
