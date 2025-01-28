<script lang="ts" setup>
import type { KpuFormProps } from '@/adapter/form'
import type { VxeTableGridOptions } from '@/adapter/vxe-table'

import { useKpuVxeGrid } from '@/adapter/vxe-table'

import { page as getExampleTableApi } from '@/api/modules/standardModuleExample'

// import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

interface RowType {
  category: string
  color: string
  id: string
  price: string
  productName: string
  releaseDate: string
}

const formOptions: KpuFormProps = {
  // 默认展开
  collapsed: false,
  fieldMappingTime: [['date', ['start', 'end']]],
  schema: [
    {
      component: 'Input',
      defaultValue: '1',
      fieldName: 'category',
      label: 'Category',
    },
    {
      component: 'Input',
      fieldName: 'productName',
      label: 'ProductName',
    },
    {
      component: 'Input',
      fieldName: 'price',
      label: 'Price',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: 'Color1',
            value: '1',
          },
          {
            label: 'Color2',
            value: '2',
          },
        ],
        placeholder: '请选择',
      },
      fieldName: 'color',
      label: 'Color',
    },
    {
      component: 'RangePicker',
      defaultValue: [dayjs().subtract(7, 'days'), dayjs()],
      fieldName: 'date',
      label: 'Date',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
}

const gridOptions: VxeTableGridOptions<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', title: 'id', type: 'checkbox', width: 100 },
    { field: 'category', title: 'Category' },
    { field: 'color', title: 'Color' },
    { field: 'productName', title: 'Product Name' },
    { field: 'price', title: 'Price' },
    { field: 'releaseDate', formatter: 'formatDateTime', sortable: true, title: 'Date' },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: ({ page, sorts, filters }, formValues) => {
        const requestPayload: any = {
          model: { ...formValues },
        }

        const sortOption = sorts[0]
        if (sortOption) {
          requestPayload.sort = sortOption.field
          requestPayload.order = sortOption.order
        }

        requestPayload.size = page.pageSize
        requestPayload.current = page.currentPage

        filters.forEach(({ field, values }) => {
          requestPayload[field] = values.join(',')
        })

        return getExampleTableApi(requestPayload).then((response) => {
          response.total = Number(response.total)
          return response
        })
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    search: true,
    zoom: true,
  },
}

const [Grid] = useKpuVxeGrid({
  formOptions,
  gridOptions,
})
</script>

<template>
  <div class="absolute-container">
    <Grid />
  </div>
</template>

<style scoped>
.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow-y: auto;
}
</style>
