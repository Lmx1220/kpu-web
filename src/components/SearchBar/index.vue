<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    fold?: boolean
    showToggle?: boolean
    background?: boolean
  }>(),
  {
    fold: true,
    showToggle: true,
    background: false,
  },
)

const emits = defineEmits<{
  'update:fold': [
    value: boolean,
  ]
  'toggle': [
    value: boolean,
  ]
}>()
defineOptions({
  name: 'SearchBar',
})
const isFold = ref(!props.fold)

watch(() => props.fold, (value) => {
  isFold.value = value
  emits('update:fold', value)
}, {
  immediate: true,
})

function toggle() {
  isFold.value = !isFold.value
  emits('toggle', isFold.value)
}
</script>

<template>
  <div class="search-container" :class="{ 'has-bg': background }">
    <slot :fold="isFold" />
    <div v-if="showToggle" class="toggle">
      <el-button text size="small" @click="toggle">
        <template #icon>
          <el-icon>
            <svg-icon :name="isFold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
          </el-icon>
        </template>
        {{ isFold ? '展开' : '收起' }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  position: relative;

  &.has-bg[data-v-0fbc6299] {
    padding: 20px;
    background-color: var(--el-fill-color-lighter);
    transition: background-color .3s
  }

  :deep(.el-form){
    margin-bottom: -10px;

    .el-select , .el-date-editor{
      width: 100%;
    }
  }

  .toggle {
    position: relative;
    text-align: center;
    margin-bottom: -10px;
  }
}
</style>
