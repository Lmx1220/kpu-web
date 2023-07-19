<script lang="ts" setup name="SystemRoleDetail">
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/util/eventBus'
import DetailForm from '@/views/system/role/components/DetailForm/index.vue'

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
    <page-header :title="route.name === 'routerName' ? '新增角色' : '编辑角色'">
      <el-button size="default" round @click="goBack">
        <template #icon>
          <svg-icon name="ep:arrow-left" />
        </template>
        返回
      </el-button>
    </page-header>
    <page-main>
      <el-row>
        <el-col :md="24" :lg="16">
          <DetailForm :id="route.params.id as string" ref="form" />
        </el-col>
      </el-row>
    </page-main>
    <fixed-action-bar>
      <el-button type="primary" size="large" @click="onSubmit">
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
