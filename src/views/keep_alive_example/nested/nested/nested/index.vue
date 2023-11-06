<script lang="ts" setup>
defineOptions({
  name: 'TabExampleNestedTest',
})

const val = ref('')
</script>

<template>
  <div>
    <PageMain>
      <div>层级 1-1-1</div>
      <ElInput v-model="val" />
    </PageMain>
  </div>
</template>
