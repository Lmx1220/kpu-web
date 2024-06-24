<script setup lang="ts">
defineOptions({
  name: 'ComponentExampleIconpicker',
})
const icon = ref('')
const icon1 = ref('ep:success-filled')
const icon2 = ref('')
</script>

<template>
  <div>
    <PageHeader title="图标选择器" content="IconPicker" />
    <PageMain>
      <div mb4>
        <IconPicker v-model="icon" />
      </div>
      <div>
        <IconPicker v-model="icon1" />
      </div>
    </PageMain>
    <PageMain title="尺寸">
      <ElSpace>
        <IconPicker v-model="icon2" size="small" />
        <IconPicker v-model="icon2" />
        <IconPicker v-model="icon2" size="large" />
      </ElSpace>
    </PageMain>
  </div>
</template>
