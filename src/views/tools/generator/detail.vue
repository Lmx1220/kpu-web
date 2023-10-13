<script lang="ts" setup>
import DetailForm from './components/DetailForm/index.vue'
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/util/eventBus'

defineOptions({
  name: 'ToolsGeneratorDetail',
})
const settingsStore = useSettingsStore()
const route = useRoute()
const router = useRouter()
const tabbar = useTabbar()
const form = ref<InstanceType<typeof DetailForm>>()

function onSubmit() {
  form.value?.submit(() => {
    eventBus.emit('get-data-list')
  })
}

function onCancel() {
  goBack()
}

// 返回列表页
function goBack() {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.close({ name: 'ToolsGeneratorList' })
  }
  else {
    router.push({ name: 'ToolsGeneratorList' })
  }
}

const steps = ref([{
  title: '生成信息',

}, {
  title: '字段信息',

}, {
  title: '代码预览',

}, {
  title: '立即生成',

}])
const activeStatus = ref({
  active: 0,
  processStatus: 'finish',
})

function updateActiveStatus(val: {
  active?: number
  processStatus?: string
}) {
  activeStatus.value = { ...activeStatus.value, ...val }
}

provide('activeStatus', { activeStatus, updateActiveStatus })

async function onStep(index: number) {
  if (activeStatus.value.active === 0) {
    const res = await form.value?.validate()
    if (!res) {
      activeStatus.value.processStatus = 'error'
      return
    }
    else {
      activeStatus.value.processStatus = 'finish'
    }
  }
  if (activeStatus.value.processStatus === 'error') {
    return
  }
  activeStatus.value.active = index
}

const id = computed(() => {
  const idStr = route.params.id as string | undefined
  if (idStr) {
    const len = idStr.split(',').length
    if (len > 1) {
      return idStr.split(',')
    }
    return idStr.split(',')[0]
  }
  return ''
})
</script>

<template>
  <div class="toolsGeneratorDetail">
    <page-header :title="route.query?.title as string">
      <el-button round size="default" @click="goBack">
        <template #icon>
          <svg-icon name="ep:arrow-left" />
        </template>
        返回
      </el-button>
      <template v-if="route.query.content" #content>
        {{ route.query.content }}
      </template>
    </page-header>
    <div class="steps">
      <el-steps
        :active="activeStatus.active" :process-status="activeStatus.processStatus" align-center
        finish-status="success"
      >
        <el-step v-for="(item, index) in steps" :key="index" :title="item.title" @click="onStep(index)" />
      </el-steps>
    </div>
    <page-main>
      <el-row>
        <el-col :lg="24" :md="24">
          <DetailForm
            :id="id" ref="form"
            :type="(route.params.type as 'add'|'edit'| 'view'| undefined)"
          />
        </el-col>
      </el-row>
    </page-main>
    <!--    <fixed-action-bar> -->
    <!--      <el-button type="primary" size="large" @click="onSubmit"> -->
    <!--        提交 -->
    <!--      </el-button> -->
    <!--      <el-button size="large" @click="onCancel"> -->
    <!--        取消 -->
    <!--      </el-button> -->
    <!--    </fixed-action-bar> -->
  </div>
</template>

<style lang="scss" scoped>
// scss
.toolsGeneratorDetail {
  .page-header {
    margin-bottom: 0;
  }

  .steps {
    margin-bottom: 20px;
    padding: 0 16px 20px;
    background-color: var(--g-app-bg);
    transition: background-color 0.3s;
  }
}
</style>
