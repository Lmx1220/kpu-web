<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings.ts'

const development = import.meta.env.MODE
const settingsStore = useSettingsStore()
const text = ref('')
const data = computed(() => text.value ? [JSON.parse(text.value)] : [])

function onError(type: number) {
  nextTick(() => {
    text.value = sessionStorage.getItem('errorLog') || ''
  })
  switch (type) {
    case 1:
      // 模拟错误
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      a = abc
      break
    case 2:
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      testMethod()
      break
  }
}
function to(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <KPageHeader title="错误日志" content="错误日志通过 Vue 提供的全局错误钩子 errorHandler 进行拦截，如果需要上报给后端，需自行实现">
      <ElButton @click="to('https://cn.vuejs.org/api/application.html#app-config-errorhandler')">
        <template #icon>
          <SvgIcon
            name="i-ep:link"
          />
        </template>
        Vue errorHandler 说明
      </ElButton>
    </KPageHeader>
    <KPageMain>
      <div v-if="development !== 'development'">
        <div v-if="settingsStore.settings.app.enableErrorLog">
          <ElButton type="danger" @click="onError(1)">
            模拟触发错误1
          </ElButton>
          <ElButton type="danger" @click="onError(2)">
            模拟触发错误2
          </ElButton>
          <ElTable :data="data" border>
            <ElTableColumn label="错误信息" width="200" align="center">
              <template #default="{ row }">
                <div>{{ row.err.message }}</div>
                <ElTag type="danger">
                  {{ row.info }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn label="错误详情">
              <template #default="{ row }">
                <div style="white-space: pre-wrap;">
                  {{ row.err.stack }}
                </div>
              </template>
            </ElTableColumn>
            <ElTableColumn label="错误链接" width="200" align="center">
              <template #default="{ row }">
                <ElLink :href="row.url" target="_blank">
                  {{ row.url }}
                </ElLink>
              </template>
            </ElTableColumn>
            <ElTableColumn label="时间" prop="datetime" width="200" align="center">
              <template #default="{ row }">
                <span v-timeago="row.datetime" :title="row.datetime" />
              </template>
            </ElTableColumn>
          </ElTable>
        </div>
        <div v-else>
          请到 /src/settings.ts 里打开错误日志功能，再进入该页面查看演示
        </div>
      </div>
      <div v-else>
        当前为开发环境，该功能关闭演示
      </div>
    </KPageMain>
  </div>
</template>
