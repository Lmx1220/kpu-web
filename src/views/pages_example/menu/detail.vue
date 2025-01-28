<script lang="ts" setup>
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/utils/eventBus'
import DetailForm from './components/DetailForm/index.vue'

defineOptions({
  name: 'StandardModuleExampleEdit',
})
const settingsStore = useSettingsStore()
const route = useRoute()
const router = useRouter()
const tabbar = useTabbar()
const form = ref<InstanceType<typeof DetailForm>>()

function onSubmit() {
  form.value?.submit(() => {
    eventBus.emit('get-data-list')
    goBack()
  })
}

function onCancel() {
  goBack()
}

// 返回列表页
function goBack() {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.close({ name: 'standardModuleExampleList' })
  }
  else {
    router.push({ name: 'standardModuleExampleList' })
  }
}
</script>

<template>
  <div>
    <KpuPageHeader :title="route.name === 'routerName' ? '新增' : '编辑'">
      <el-button size="default" round @click="goBack">
        <template #icon>
          <KpuIcon name="ep:arrow-left" />
        </template>
        返回
      </el-button>
    </KpuPageHeader>
    <kpu-page-main>
      <el-row>
        <el-col :md="24" :lg="16">
          <DetailForm
            :id="route.params.id as string" ref="form"
            :type="(route.params.type as 'add' | 'edit' | 'view' | undefined)"
          />
        </el-col>
      </el-row>
    </kpu-page-main>
    <kpu-fixed-action-bar>
      <el-button type="primary" size="large" @click="onSubmit">
        提交
      </el-button>
      <el-button size="large" @click="onCancel">
        取消
      </el-button>
    </kpu-fixed-action-bar>
  </div>
</template>
