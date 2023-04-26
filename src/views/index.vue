<script setup lang="ts" name="Home">
const form = ref<{ [key: string]: string }>({})
const inputs = ref<{ key: string; label: string; value: any | undefined }[]>([
  { key: 'input1', label: 'Input 1', value: '' },
  { key: 'input2', label: 'Input 2', value: '' },
  { key: 'input3', label: 'Input 3', value: '' },
])
const g = ref<number>(8)
function updateModelValue(value: string, key: string) {
  form.value[key] = value
}
</script>

<template>
  <el-form :model="form">
    <el-row :gutter="40">
      <el-col v-for="(item) in inputs" :key="item.key" :span="g">
        <svg aria-hidden="true">
          <use xlink:href="#icon-404" />
        </svg>
        <el-input v-model="item.value" @input="() => updateModelValue(item.value, item.key)" />
      </el-col>
    </el-row>
  </el-form>
</template>
