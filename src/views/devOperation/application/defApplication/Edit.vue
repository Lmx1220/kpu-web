<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import DetailForm from './components/DetailForm/index.vue'
import useSettingsStore from '@/store/modules/settings'
import type { ActionEnum } from '@/enums/commonEnum'
import eventBus from '@/util/eventBus'

defineOptions({
  name: 'DevoperationApplicationDefApplicationDetail',
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
  return `${t(`common.title.${type.value}`)}应用`
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
    tabbar.close({ name: 'DevoperationApplicationDefApplicationList' })
  }
  else {
    router.push({ name: 'DevoperationApplicationDefApplicationList' })
  }
}
</script>

<template>
  <div>
    <page-header :title="tiltel">
      <el-button round size="default" @click="goBack">
        <template #icon>
          <svg-icon name="ep:arrow-left" />
        </template>
        {{ t('common.back') }}
      </el-button>
    </page-header>
    <page-main>
      <el-row>
        <el-col :lg="16" :md="24">
          <DetailForm
            :id="route.params.id as string" ref="form"
            :type="type"
          />
        </el-col>
      </el-row>
    </page-main>
    <fixed-action-bar>
      <el-button size="large" type="primary" @click="onSubmit">
        {{ t('common.okText') }}
      </el-button>
      <el-button size="large" @click="onCancel">
        {{ t('common.cancelText') }}
      </el-button>
    </fixed-action-bar>
  </div>
</template>
