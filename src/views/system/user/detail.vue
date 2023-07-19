<script lang="ts" setup>
import DetailForm from './components/DetailForm/index.vue'
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/util/eventBus'

defineOptions({
  name: 'SystemUserDetail',
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
    tabbar.close({ name: 'pagesExampleGeneralFormModeList' })
  }
  else {
    router.push({ name: 'pagesExampleGeneralFormModeList' })
  }
}
</script>

<template>
  <div>
    <page-header :title="route.name === 'routerName' ? '新增用户' : '编辑用户'">
      <el-button round size="default" @click="goBack">
        <template #icon>
          <svg-icon name="ep:arrow-left" />
        </template>
        返回
      </el-button>
    </page-header>
    <page-main>
      <el-row>
        <el-col :lg="16" :md="24">
          <DetailForm
            :id="route.params.id as string" ref="form"
            :type="(route.params.type as 'add'|'edit'| 'view'| undefined)"
          />
        </el-col>
      </el-row>
    </page-main>
    <fixed-action-bar>
      <el-button size="large" type="primary" @click="onSubmit">
        提交
      </el-button>
      <el-button size="large" @click="onCancel">
        取消
      </el-button>
    </fixed-action-bar>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
