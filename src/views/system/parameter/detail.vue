<script lang="ts" setup>
import DetailForm from './components/DetailForm/index.vue'
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/util/eventBus'
import type { ActionEnum } from '@/enums/commonEnum.ts'

defineOptions({
  name: 'SystemParameterDetail',
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
    <PageHeader :title="route.name === 'routerName' ? '新增参数配置' : '编辑参数配置'">
      <ElButton round size="default" @click="goBack">
        <template #icon>
          <SvgIcon name="ep:arrow-left" />
        </template>
        返回
      </ElButton>
    </PageHeader>
    <PageMain>
      <ElRow>
        <ElCol :lg="16" :md="24">
          <DetailForm
            :id="route.params.id as string" ref="form"
            :type="route.params.type as ActionEnum"
          />
        </ElCol>
      </ElRow>
    </PageMain>
    <FixedActionBar>
      <ElButton size="large" type="primary" @click="onSubmit">
        提交
      </ElButton>
      <ElButton size="large" @click="onCancel">
        取消
      </ElButton>
    </FixedActionBar>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
