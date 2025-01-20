<script lang="ts" setup>
defineOptions({
  name: 'TabExampleNestedTest',
})

const val = ref('')
</script>

<template>
  <div>
    <KPageMain>
      <div>层级 1-1-1</div>
      <ElInput v-model="val" />
    </KPageMain>
  </div>
</template>
