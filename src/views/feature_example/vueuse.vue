<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { useClipboard, useDebounceFn, useThrottleFn } from '@vueuse/core'
import { ElMessage } from 'element-plus'

function message() {
  ElMessage.success({
    message: '恭喜你，这是一条成功消息',
  })
}

const debounce = useDebounceFn(() => {
  message()
}, 1000)

const throttle = useThrottleFn(() => {
  message()
}, 1000)

const input = ref('')
const { text, copy, copied, isSupported } = useClipboard()
watch(copied, (val) => {
  val && ElMessage.success(`复制成功：${text.value}`)
})

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <KpuPageHeader title="VueUse" content="VueUse 是一个 Vue Composition API 实用程序的集合，更多 API 和例子请查看 VueUse 官网。">
      <ElButton @click="open('https://vueuse.org/')">
        <template #icon>
          <KpuIcon name="i-ep:link" />
        </template>
        VueUse 官网
      </ElButton>
    </KpuPageHeader>
    <KpuPageMain title="防抖：debounce">
      <p class="mt-0">
        所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
      </p>
      <ElButton @click="debounce">
        连续点击我，只会执行最后一次点击事件
      </ElButton>
    </KpuPageMain>
    <KpuPageMain title="节流：throttle">
      <p class="mt-0">
        所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。
      </p>
      <ElButton @click="throttle">
        连续点击我，每一秒只会执行一次点击事件
      </ElButton>
    </KpuPageMain>
    <KpuPageMain v-if="isSupported" title="复制：clipboard">
      <ElInput v-model="input" placeholder="输入内容，并点击复制按钮">
        <template #append>
          <ElButton @click="copy(input)">
            复制
          </ElButton>
        </template>
      </ElInput>
    </KpuPageMain>
  </div>
</template>
