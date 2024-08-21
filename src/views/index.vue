<route lang="yaml">
name: home
meta:
title: 主页
icon: ant-design:home-twotone
</route>

<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import type { Dayjs } from 'dayjs'
import { RequestClient, authenticateResponseInterceptor, errorMessageResponseInterceptor } from '@/util/request-client'

const inputValue = ref<string>('')
const inputValue1 = ref<string>('')

const radioValue = ref<number>(1)

const datePickerValue1 = ref<Dayjs>()
const datePickerValue2 = ref<Dayjs>()
const datePickerValue3 = ref<Dayjs>()
const datePickerValue4 = ref<Dayjs>()
const datePickerValue5 = ref<Dayjs>()

const rateValue = ref<number>(2)

const selectValue1 = ref('lucy')
const selectValue2 = ref('lucy')
const selectValue3 = ref('lucy')
const selectOptions1 = ref<SelectProps['options']>([
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'disabled', label: 'Disabled', disabled: true },
  { value: 'yiminghe', label: 'Yiminghe' },
])
const selectOptions2 = ref<SelectProps['options']>([
  { value: 'lucy', label: 'Lucy' },
])
const selectOptions3 = ref<SelectProps['options']>([
  { value: 'lucy', label: 'Lucy' },
])

const sliderValue1 = ref<number>(0)
const sliderValue2 = ref<[number, number]>([20, 50])

const switchChecked = ref<boolean>(false)

const columns = [
  { name: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Tags', key: 'tags', dataIndex: 'tags' },
  { title: 'Action', key: 'action' },
]
const data = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', tags: ['nice', 'developer'] },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', tags: ['loser'] },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
]
const requestClient = new RequestClient({ baseURL: '/mock' })
requestClient.addResponseInterceptor({
  fulfilled: (response) => {
    const { data: responseData, status } = response

    const { code, data, message: msg } = responseData
    if (status >= 200 && status < 400 && code === 0) {
      return data
    }
    throw new Error(`Error ${status}: ${msg}`)
  },
})
requestClient.addResponseInterceptor(
  authenticateResponseInterceptor({
    client: requestClient,
    doReAuthenticate: () => Promise.resolve(),
    doRefreshToken: () => Promise.resolve(''),
    enableRefreshToken: false,
    formatToken: token => token,
  }),
)

// 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
requestClient.addResponseInterceptor(
  errorMessageResponseInterceptor((msg: string) => message.error(msg)),
)
onMounted(() => {
  console.log('onMounted')
  requestClient.get<{ total: number, records: any[] }>('/system/role/list').then((res) => {
    console.log(res.total)
    console.log(res.records)
  })
  requestClient.get<{ total: number, records: any[] }>('/system/role/list1').then((res) => {
    console.log(res.total)
    console.log(res.records)
  })
})
</script>

<template>
  <div>
    <PageHeader>
      <template #title>
        <div class="flex items-center gap-4">
          欢迎使用 Fantastic-admin
        </div>
      </template>
      <template #content>
        <div class="text-sm/6">
          本演示站基于 Fantastic-admin 源码开发，将 Element Plus 替换为 Ant Design Vue ，详细操作步骤请阅读官方文档。
        </div>
      </template>
    </PageHeader>
    <PageMain>
      <ASpace wrap>
        <AButton type="primary">
          Primary Button
        </AButton>
        <AButton>Default Button</AButton>
        <AButton type="dashed">
          Dashed Button
        </AButton>
        <AButton type="text">
          Text Button
        </AButton>
        <AButton type="link">
          Link Button
        </AButton>
      </ASpace>
    </PageMain>
    <PageMain>
      <ASpace direction="vertical">
        <AInput v-model:value="inputValue" placeholder="Basic usage" />
        <AInput v-model:value.lazy="inputValue1" autofocus placeholder="Lazy usage" />
      </ASpace>
    </PageMain>
    <PageMain>
      <ARadioGroup v-model:value="radioValue">
        <ARadio :value="1">
          A
        </ARadio>
        <ARadio :value="2">
          B
        </ARadio>
        <ARadio :value="3">
          C
        </ARadio>
        <ARadio :value="4">
          D
        </ARadio>
      </ARadioGroup>
    </PageMain>
    <PageMain>
      <ASpace direction="vertical" :size="12">
        <ADatePicker v-model:value="datePickerValue1" />
        <ADatePicker v-model:value="datePickerValue2" picker="week" />
        <ADatePicker v-model:value="datePickerValue3" picker="month" />
        <ADatePicker v-model:value="datePickerValue4" picker="quarter" />
        <ADatePicker v-model:value="datePickerValue5" picker="year" />
      </ASpace>
    </PageMain>
    <PageMain>
      <ARate v-model:value="rateValue" />
    </PageMain>
    <PageMain>
      <ASpace>
        <ASelect v-model:value="selectValue1" style="width: 120px;" :options="selectOptions1" />
        <ASelect v-model:value="selectValue2" style="width: 120px;" disabled :options="selectOptions2" />
        <ASelect v-model:value="selectValue3" style="width: 120px;" loading :options="selectOptions3" />
      </ASpace>
    </PageMain>
    <PageMain>
      <ASlider id="test" v-model:value="sliderValue1" />
      <ASlider v-model:value="sliderValue2" range />
    </PageMain>
    <PageMain>
      <ASwitch v-model:checked="switchChecked" />
    </PageMain>
    <PageMain>
      <ATable :columns="columns" :data-source="data">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span>
              Name
            </span>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'tags'">
            <span>
              <ATag
                v-for="tag in record.tags"
                :key="tag"
                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
              >
                {{ tag.toUpperCase() }}
              </ATag>
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a>Invite 一 {{ record.name }}</a>
              <ADivider type="vertical" />
              <a>Delete</a>
              <ADivider type="vertical" />
              <a class="ant-dropdown-link">
                More actions
              </a>
            </span>
          </template>
        </template>
      </ATable>
    </PageMain>
  </div>
</template>
