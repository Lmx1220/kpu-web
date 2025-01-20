<script lang="ts" setup>
defineOptions({
  name: 'TabExampleNestedTest2',
})

const val = ref('')
</script>

<template>
  <div>
    <KPageMain>
      <div>层级 1-1-2</div>
      <ElInput v-model="val" />
    </KPageMain>
  </div>
</template>
