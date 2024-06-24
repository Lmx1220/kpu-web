<script setup lang="ts">
function toWave(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <PageHeader title="水波纹" content="更多设置请查看文档">
      <ElButton @click="toWave(url)">
        <template #icon>
          <SvgIcon
            name="i-ep:link"
          />
        </template>
        访问 v-wave
        </svgicon>
      </elbutton>
    </pageheader>
  </div>
</template>

      </ElButton>
    </PageHeader>
    <PageMain title="Digital 7">
      <p class="digital-7">
        admin
      </p>
      <p class="digital-7">
        1234567890,.
      </p>
    </PageMain>

    <PageMain title="Digital 7（等宽）">
      <p class="digital-7_mono">
        admin
      </p>
      <p class="digital-7_mono">
        1234567890,.
      </p>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
</style>
