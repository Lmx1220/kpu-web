<script setup lang="ts">
import dayjs from '@/utils/dayjs'

const data = [{
  title: '文章标题1',
  date: dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
}, {
  title: '文章标题2',
  date: dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
}, {
  title: '文章标题3',
  date: dayjs().subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss'),
}, {
  title: '文章标题4',
  date: dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
}, {
  title: '文章标题5',
  date: dayjs().subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss'),
}]
const data1 = [{
  title: '文章标题1',
  date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}, {
  title: '文章标题2',
  date: dayjs().subtract(1, 'minute').format('YYYY-MM-DD HH:mm:ss'),
}]
const { format, render, cancel } = useTimeago()
const timeRef = ref()
onMounted(() => {
  render(timeRef.value, {
    minInterval: 2,
  })
},
)
onBeforeUnmount(() => {
  cancel(timeRef.value)
},
)
</script>

<template>
  <div>
    <KPageHeader title="可阅读时间" content="将时间格式化可阅读的格式" />
    <KPageMain title="指令（基础使用）">
      <ElTable :data="data" width="100%">
        <ElTableColumn label="标题" prop="title" />
        <ElTableColumn label="时间" prop="date" width="180">
          <template #default="{ row }">
            <span v-timeago="row.date" :title="row.date" />
          </template>
        </ElTableColumn>
      </ElTable>
    </KPageMain>
    <KPageMain title="指令（定时器）">
      <ElTable :data="data1" width="100%">
        <ElTableColumn label="标题" prop="title" />
        <ElTableColumn label="时间" prop="date" width="180">
          <template #default="{ row }">
            <span
              v-timeago.interval="row.date" :title="row.date"
            />
          </template>
        </ElTableColumn>
      </ElTable>
    </KPageMain>
    <KPageMain title="组合式函数（相对时间）">
      2020-01-01 相对于 2020-01-03 是 <b>{{ format('2020-01-01', { relativeDate: '2020-01-03' }) }}</b>
    </KPageMain>
    <KPageMain title="组合式函数（定时器）">
      每隔2秒更新 <b ref="timeRef" :datetime="dayjs().format()" />
    </KPageMain>
  </div>
</template>
