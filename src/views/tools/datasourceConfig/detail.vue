<script lang="ts" setup>
import DetailForm from './components/DetailForm/index.vue'
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/util/eventBus'
import type { ActionEnum } from '@/enums/commonEnum.ts'

defineOptions({
  name: 'ToolsDatasourceConfigDetail',
})
const settingsStore = useSettingsStore()
const route = useRoute()
const router = useRouter()
const tabbar = useTabbar()
const { t } = useI18n()
const form = ref<InstanceType<typeof DetailForm>>()

const type = computed(() => {
  return route.params.type as ActionEnum
})
const tiltel = computed(() => {
  return t(`common.title.${type.value}`)
})
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
    tabbar.close({ name: 'ToolsDatasourceConfigList' })
  }
  else {
    router.push({ name: 'ToolsDatasourceConfigList' })
  }
}
</script>

<template>
  <div>
    <PageHeader :title="tiltel">
      <ElButton round size="default" @click="goBack">
        <template #icon>
          <SvgIcon name="ep:arrow-left" />
        </template>
        {{ t('common.back') }}
      </ElButton>
    </PageHeader>
    <PageMain>
      <ElRow>
        <ElCol :lg="16" :md="24">
          <DetailForm
            :id="route.params.id as string" ref="form"
            :type="type"
          />
        </ElCol>
      </ElRow>
    </PageMain>
    <FixedActionBar>
      <ElButton size="large" type="primary" @click="onSubmit">
        {{ t('common.okText') }}
      </ElButton>
      <ElButton size="large" @click="onCancel">
        {{ t('common.cancelText') }}
      </ElButton>
    </FixedActionBar>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
