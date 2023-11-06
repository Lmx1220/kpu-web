<script lang="ts" setup>
import VueBlocksTree from 'vue3-blocks-tree'
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css'

defineOptions({
  name: 'BlocksTrees',
})
const props = withDefaults(defineProps<Props>(), {
  treeProps: () => ({}),
})
const emits = defineEmits<{
  'node-click': [
    e: Event,
    data: Record<string, any>,
    nodeContext: Record<string, any>,
  ]
}>()

interface Props {
  treeProps: Record<string, any>
  data: Record<string, any>
}

const treeProp = computed(() => props.treeProps)
const horizontal = ref(false)
const collapsable = ref(false)
const labelClassName = ref<string>('bg-primary') // 主题背景类名
const labelClassNameItem = reactive([{
  value: 'bg-primary',
  label: '主题背景',
}, {
  value: 'bg-white',
  label: '洁白无瑕',
}, {
  value: 'bg-orange',
  label: '金橙',
}, {
  value: 'bg-gold',
  label: '金光灿灿',
}, {
  value: 'bg-gray',
  label: '珊瑚灰',
}, {
  value: 'bg-lightpink',
  label: '姹紫嫣红',
}, {
  value: 'bg-chocolate',
  label: '黑朱古力',
}, {
  value: 'bg-tomato',
  label: '红彤彤',
}])
</script>

<template>
  <div>
    <div class="m-4">
      <div>
        <div class="inline-flex items-center" style="gap: 8px;">
          <slot name="operation" />
        </div>
        <div class="inline-flex items-center" style="gap: 8px;">
          <ElCheckbox v-model="horizontal" label="垂直展示" />
          <ElCheckbox v-model="collapsable" label="折叠节点" />
          <ElSelect
            v-model="labelClassName" clearable placeholder="请选择"
            style="width: 120px;"
          >
            <ElOption
              v-for="item in labelClassNameItem" :key="item.value" :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>
      </div>
    </div>
    <VueBlocksTree
      :collapsable="collapsable" :data="data" :horizontal="horizontal" :label-class-name="labelClassName"
      :props="treeProp"
      @node-click="(e: Event, data: Record<string, any>, nodeContext: Record<string, any>) => emits('node-click', e, data, nodeContext)"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.bg-primary) {
  background-color: var(--g-theme-color);
}

:deep(.bg-white) {
  background-color: #fff;
}

:deep(.bg-orange) {
  background-color: orange;
}

:deep(.bg-gold) {
  background-color: gold;
}

:deep(.bg-gray) {
  background-color: gray;
}

:deep(.bg-lightpink) {
  background-color: #ffb6c1;
}

:deep(.bg-chocolate) {
  background-color: #d2691e;
}

:deep(.bg-tomato) {
  background-color: tomato;
}
</style>
