<script setup lang="ts">
import { split, uniqueId } from 'lodash-es'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import type { FormInstance } from 'element-plus'
import { useDialogInner } from '@/components/Dialog/hooks/useDialog.ts'
import { findSystemApi } from '@/api/modules/common/general.ts'
import { findOnlineService } from '@/api/modules/common/gateway.ts'
import type { DefResourceApiVO } from '@/api/modules/devOperation/application/model/defResourceModel.ts'
import type { RecursivePartial } from '#/global'
import { HTTP_TAG_MAP } from '@/enums/httpEnum.ts'

const emits = defineEmits<{
  success: [any[]]
  register: any
}>()

const { t } = useI18n()

const currentService = ref<string>('base') // 当前的服务
const currentController = ref<string>('') // 当前的控制器类
const serviceControllerListMap = ref<Recordable>({}) // 服务 对应的控制器类
const apiMap = ref<Recordable>({}) // 后端返回集合
const selectedData = ref<Recordable[]>([])

const [registerDialog, { setDialogProps, closeDialog }] = useDialogInner((data) => {
  data && onDataReceive(data)
  setDialogProps({ confirmLoading: false, minHeight: 300 })
})

function onDataReceive(data: any) {
  selectedData.value = data?.selectedData
}
const formRef = ref<FormInstance>()
function onOk() {
  try {
    setDialogProps({ confirmLoading: true })
    formRef.value?.resetFields()
    closeDialog()
    emits('success', unref(selectedData))
  }
  finally {
    setDialogProps({ confirmLoading: false })
  }
}

const formData = ref<RecursivePartial<DefResourceApiVO>>({})

const controllerOptions = ref<Recordable[]>([])

async function handleServiceChange(value: string) {
  currentService.value = value
  controllerOptions.value = []

  apiMap.value = await findSystemApi(value)

  for (const controller in unref(apiMap)) {
    controllerOptions.value.push({
      value: controller,
      key: controller,
      label: controller,
    })
  }

  serviceControllerListMap.value[value] = apiMap.value
  if (formData.value) {
    formData.value.controller = undefined
    formData.value.uri = undefined
  }
}

const uriOptions = ref<Recordable[]>([])
let oldUri: string[] = []
function handleControllerChange(value: string) {
  uriOptions.value = []
  currentController.value = value
  for (const controller in unref(apiMap)) {
    if (controller === value) {
      const map = unref(apiMap)
      const uriList = map[controller]
      for (const uri of uriList) {
        uriOptions.value.push({
          value: `${uri.springApplicationName}#${uri.controller}#${uri.uri}#${uri.requestMethod}#${uri.name}`,
          key: uri.springApplicationName + uri.uri + uri.requestMethod,
          label: `${uri.uri}【${uri.requestMethod}】(${uri.name})`,
        })
      }
    }
  }
  const selectedOptions = getSelectedOptions(value)
  if (formData.value) {
    formData.value.uri = selectedOptions as any
    oldUri = selectedOptions
  }
}

function getSelectedOptions(controller: string) {
  const selectedOptions: string[] = []
  // 已选列表
  for (const selected of unref(selectedData)) {
    // 后台返回的所有的uri
    // for (const uri of unref(serviceControllerListMap)?.[currentService.value]?.[controller]) {
    for (const uri of unref(apiMap)?.[controller]) {
      if (
        selected.springApplicationName === uri.springApplicationName
        && selected.uri === uri.uri
        && selected.requestMethod === uri.requestMethod
      ) {
        selectedOptions.push(
          `${uri.springApplicationName}#${uri.controller}#${uri.uri}#${uri.requestMethod}#${uri.name}`,
        )
      }
    }
  }
  return selectedOptions
}

// 添加
function addSelectedData(obj: any) {
  let flag = false
  for (const selected of unref(selectedData)) {
    if (
      selected.springApplicationName === obj.springApplicationName
      && selected.uri === obj.uri
      && selected.requestMethod === obj.requestMethod
    ) {
      flag = true
      break
    }
  }
  if (!flag) {
    selectedData.value.push(obj)
  }
}

async function delSelectedDataByCard(obj: any) {
  const uris = formData.value?.uri as any
  if (uris) {
    const index = uris.findIndex((uri: string) => {
      const selected = split(uri, '#')
      return (
        selected[0] === obj.springApplicationName
        && selected[2] === obj.uri
        && selected[3] === obj.requestMethod
      )
    })
    if (index > -1) {
      uris.splice(index, 1)
    }

    if (uris && uris.length > 0) {
      formData.value && (formData.value.uri = uris as any)
    }
    else {
      formData.value && (formData.value.uri = undefined)
    }
  }
  delSelectedData(obj)
}

function delSelectedData(obj: any) {
  const index = unref(selectedData).findIndex(
    selected =>
      selected.springApplicationName === obj.springApplicationName
      && selected.uri === obj.uri
      && selected.requestMethod === obj.requestMethod,
  )

  if (index > -1) {
    selectedData.value.splice(index, 1)
  }
}

// 选择 uri
async function handleUriChange(values: string[]) {
  // 当前选中的值
  if (values && values.length > oldUri.length) {
    for (const value of values) {
      const valueList = split(value, '#')
      addSelectedData({
        springApplicationName: valueList[0],
        controller: valueList[1],
        uri: valueList[2],
        requestMethod: valueList[3],
        name: valueList[4],
        isInput: false,
        tempId: uniqueId(),
      })
    }
  }
  else if (values.length > 0) {
    // oldUri 和 values 没有的值 进行删除
    const diff = oldUri.filter(v => !values.includes(v))
    for (const value of diff) {
      handleUriDeselect(value)
    }
  }
  else {
    // 取消了所有
    const apiList = apiMap.value[currentController.value]
    for (const api of apiList) {
      delSelectedData(api)
    }
  }
  oldUri = values
}
// 选择 uri
function handleUriDeselect(value: string) {
  // 取消的数据
  const valueList = split(value, '#')
  delSelectedData({
    springApplicationName: valueList[0],
    controller: valueList[1],
    uri: valueList[2],
    requestMethod: valueList[3],
    name: valueList[4],
  })
}
</script>

<template>
  <BaseDialog
    v-bind="$attrs"
    loading-tip="加载"
    title="选择API" width="80%"
    class="resourceApiSelect"
    @ok="onOk"
    @register="registerDialog"
  >
    <ElRow>
      <ElCol :span="16">
        <div class="ml-4 mr-4">
          <ElForm ref="formRef" :model="formData">
            <ElFormItem prop="service" :label="t('system.resourceApi.controller')">
              <template #label>
                {{ t('system.resourceApi.controller') }}
                <ElTooltip placement="top">
                  <template #content>
                    kpu-cloud: 自动查询后台已经正常启动并注册到nacos中的服务 <br>
                    kpu-boot: 后台写死lamp-boot-server返回即可
                  </template>
                  <SvgIcon name="i-ri:question-line" />
                </ElTooltip>
              </template>
              <ApiSelect v-model="formData.service" :api="findOnlineService" show-search @change="handleServiceChange" />
            </ElFormItem>
            <ElFormItem prop="controller" :label="t('system.resourceApi.controller')">
              <ElSelect v-model="formData.controller" clearable filterable @change="handleControllerChange">
                <ElOption v-for="item in controllerOptions" :key="item.key" :value="item.value" :label="item.label" />
              </ElSelect>
            </ElFormItem>
            <ElFormItem prop="uri" :label="t('system.resourceApi.uri')">
              <ElSelect v-model="formData.uri" multiple clearable filterable @change="handleUriChange">
                <ElOption v-for="item in uriOptions" :key="item.key" :value="item.value" :label="item.label" />
              </ElSelect>
            </ElFormItem>
          </ElForm>
        </div>
      </ElCol>
      <ElCol :span="8">
        <OverlayScrollbarsComponent
          :options="{
            scrollbars: {
              autoHide: 'leave',
              autoHideDelay: 300,
            },
          }"
          class="max-h-485px"
        >
          <div class="ml-4 mr-4">
            <h4>已选接口 ({{ selectedData.length }})：</h4>
            <ElCard
              v-for="api in selectedData"
              :key="api.springApplicationName + api.uri + api.requestMethod"
              style="margin-bottom: 0.5rem;"
              hoverable
              size="small"
              :title="api.name"
            >
              <template #header>
                <div class="card-header">
                  <span>{{ api.name }}</span>
                  <a href="javascript:void(0);" @click="delSelectedDataByCard(api)">删除</a>
                </div>
              </template>
              <template #default>
                <div class="card-meta-title">
                  {{ t('system.resourceApi.springApplicationName') }}：
                  {{ api.springApplicationName }} <br>
                  {{ t('system.resourceApi.controller') }}：{{ api.controller }}
                </div>
                <div
                  class="cardDesc"
                  :title="`(${api.requestMethod}) ${api.uri} (${api.controller})`"
                >
                  <ElTag :color="HTTP_TAG_MAP.get(api.requestMethod)">
                    {{ api.requestMethod }}
                  </ElTag>
                  {{ api.uri }}
                </div>
              </template>
            </ElCard>
          </div>
        </OverlayScrollbarsComponent>
      </ElCol>
    </elrow>
  </BaseDialog>
</template>

<style lang="scss" scoped>
.resourceApiSelect {
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    a{
      text-decoration: inherit;
    }
  }

  .card-meta-title {
    overflow: hidden;
    font-size: 16px;
    font-weight: 500;
    color: rgb(0 0 0 / 85%);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cardDesc {
    max-width: 100%;
    overflow: hidden;
    font-size: 14px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: rgb(97 175 254 / 10%);
  }
}

:deep(.el-card) {
  .el-card__header {
    --at-apply: p-x-2 p-y-3;
  }

  .el-card__body {
    --at-apply: p-4;

    > div:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .el-card__footer {
    --at-apply: p0 border-t-0;
  }
}
</style>
