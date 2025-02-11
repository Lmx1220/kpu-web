<script lang="ts" setup>
import type { SetupContext } from 'vue'

import type {
  VxeGridDefines,
  VxeGridInstance,
  VxeGridListeners,
  VxeGridPropTypes,
  VxeGridProps as VxeTableGridProps,
  VxeToolbarPropTypes,
} from 'vxe-table'

import type { KpuFormProps } from '../form-ui'

import type { ExtendedVxeGridApi, VxeGridProps } from './types'

import EmptyIcon from '@/assets/icons/empty-icon.vue'
import { $t } from '@/locales'
import useSettingsStore from '@/store/modules/settings.ts'
import { KpuLoading } from '@/ui/components/KpuSpinner/index.ts'

import KpuHelpTooltip from '@/ui/components/KpuTooltip/help-tooltip.vue'

import { cloneDeep, cn, mergeWithArrayOverride } from '@/utils'
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  toRaw,
  useSlots,
  useTemplateRef,
  watch,
} from 'vue'

import { VxeGrid, VxeUI } from 'vxe-table'
import { extendProxyOptions } from './extends'
import { useTableForm } from './init'
import 'vxe-table/styles/cssvar.scss'
import 'vxe-pc-ui/styles/cssvar.scss'
import './style.css'

const props = withDefaults(defineProps<Props>(), {})

interface Props extends VxeGridProps {
  api: ExtendedVxeGridApi
}

const FORM_SLOT_PREFIX = 'form-'

const TOOLBAR_ACTIONS = 'toolbar-actions'
const TOOLBAR_TOOLS = 'toolbar-tools'

const gridRef = useTemplateRef<VxeGridInstance>('gridRef')

const state = props.api?.useStore?.()

const {
  gridOptions,
  class: className,
  gridClass,
  gridEvents,
  formOptions,
  tableTitle,
  tableTitleHelp,
  showSearchForm,
} = usePriorityValues(props, state)

const { mode } = useSettingsStore()

const slots: SetupContext['slots'] = useSlots()

const [Form, formApi] = useTableForm({
  compact: true,
  handleSubmit: async () => {
    const formValues = await formApi.getValues()
    formApi.setLatestSubmissionValues(toRaw(formValues))
    props.api.reload(formValues)
  },
  handleReset: async () => {
    await formApi.resetForm()
    const formValues = await formApi.getValues()
    formApi.setLatestSubmissionValues(formValues)
    props.api.reload(formValues)
  },
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  showCollapseButton: true,
  submitButtonOptions: {
    content: computed(() => $t('common.search')),
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
})

const showTableTitle = computed(() => {
  return !!slots.tableTitle?.() || tableTitle.value
})

const showToolbar = computed(() => {
  return (
    !!slots[TOOLBAR_ACTIONS]?.()
    || !!slots[TOOLBAR_TOOLS]?.()
    || showTableTitle.value
  )
})

const toolbarOptions = computed(() => {
  const slotActions = slots[TOOLBAR_ACTIONS]?.()
  const slotTools = slots[TOOLBAR_TOOLS]?.()
  const searchBtn: VxeToolbarPropTypes.ToolConfig = {
    code: 'search',
    icon: 'vxe-icon--search',
    circle: true,
    status: showSearchForm.value ? 'primary' : undefined,
    title: $t('common.search'),
  }
  // 将搜索按钮合并到用户配置的toolbarConfig.tools中
  const toolbarConfig: VxeGridPropTypes.ToolbarConfig = {
    tools: (gridOptions.value?.toolbarConfig?.tools
      ?? []) as VxeToolbarPropTypes.ToolConfig[],
  }
  if (gridOptions.value?.toolbarConfig?.search && !!formOptions.value) {
    toolbarConfig.tools = Array.isArray(toolbarConfig.tools)
      ? [...toolbarConfig.tools, searchBtn]
      : [searchBtn]
  }

  if (!showToolbar.value) {
    return { toolbarConfig }
  }

  // 强制使用固定的toolbar配置，不允许用户自定义
  // 减少配置的复杂度，以及后续维护的成本
  toolbarConfig.slots = {
    ...(slotActions || showTableTitle.value
      ? { buttons: TOOLBAR_ACTIONS }
      : {}),
    ...(slotTools ? { tools: TOOLBAR_TOOLS } : {}),
  }
  return { toolbarConfig }
})

const options = computed(() => {
  const globalGridConfig = VxeUI?.getConfig()?.grid ?? {}

  const mergedOptions: VxeTableGridProps = cloneDeep(
    mergeWithArrayOverride(
      {},
      toRaw(toolbarOptions.value),
      toRaw(gridOptions.value),
      globalGridConfig,
    ),
  )

  if (mergedOptions.proxyConfig) {
    const { ajax } = mergedOptions.proxyConfig
    mergedOptions.proxyConfig.enabled = !!ajax
    // 不自动加载数据, 由组件控制
    mergedOptions.proxyConfig.autoLoad = false
  }

  if (mergedOptions.pagerConfig) {
    const mobileLayouts = [
      'PrevJump',
      'PrevPage',
      'Number',
      'NextPage',
      'NextJump',
    ] as any
    const layouts = [
      'Total',
      'Sizes',
      'Home',
      ...mobileLayouts,
      'End',
    ] as readonly string[]
    mergedOptions.pagerConfig = mergeWithArrayOverride(
      {},
      mergedOptions.pagerConfig,
      {
        pageSize: 20,
        background: true,
        pageSizes: [10, 20, 30, 50, 100, 200],
        className: 'mt-2 w-full',
        layouts: mode !== 'pc' ? mobileLayouts : layouts,
        size: 'mini' as const,
      },
    )
  }
  if (mergedOptions.formConfig) {
    mergedOptions.formConfig.enabled = false
  }
  return mergedOptions
})

function onToolbarToolClick(event: VxeGridDefines.ToolbarToolClickEventParams) {
  if (event.code === 'search') {
    props.api?.toggleSearchForm?.()
  }
  (
    gridEvents.value?.toolbarToolClick as VxeGridListeners['toolbarToolClick']
  )?.(event)
}

const events = computed(() => {
  return {
    ...gridEvents.value,
    toolbarToolClick: onToolbarToolClick,
  }
})

const delegatedSlots = computed(() => {
  const resultSlots: string[] = []

  for (const key of Object.keys(slots)) {
    if (!['empty', 'form', 'loading', TOOLBAR_ACTIONS].includes(key)) {
      resultSlots.push(key)
    }
  }
  return resultSlots
})

const delegatedFormSlots = computed(() => {
  const resultSlots: string[] = []

  for (const key of Object.keys(slots)) {
    if (key.startsWith(FORM_SLOT_PREFIX)) {
      resultSlots.push(key)
    }
  }
  return resultSlots.map(key => key.replace(FORM_SLOT_PREFIX, ''))
})

async function init() {
  await nextTick()
  const globalGridConfig = VxeUI?.getConfig()?.grid ?? {}
  const defaultGridOptions: VxeTableGridProps = mergeWithArrayOverride(
    {},
    toRaw(gridOptions.value),
    toRaw(globalGridConfig),
  )
  // 内部主动加载数据，防止form的默认值影响
  const autoLoad = defaultGridOptions.proxyConfig?.autoLoad
  const enableProxyConfig = options.value.proxyConfig?.enabled
  if (enableProxyConfig && autoLoad) {
    props.api.grid.commitProxy?.(
      '_init',
      formOptions.value ? ((await formApi.getValues()) ?? {}) : {},
    )
    // props.api.reload(formApi.form?.values ?? {});
  }

  // form 由 kpu-form代替，所以不适配formConfig，这里给出警告
  const formConfig = gridOptions.value?.formConfig
  // 处理某个页面加载多个Table时，第2个之后的Table初始化报出警告
  // 因为第一次初始化之后会把defaultGridOptions和gridOptions合并后缓存进State
  if (formConfig && formConfig.enabled) {
    console.warn(
      '[Vben Vxe Table]: The formConfig in the grid is not supported, please use the `formOptions` props',
    )
  }
  props.api?.setState?.({ gridOptions: defaultGridOptions })
  // form 由 kpu-form 代替，所以需要保证query相关事件可以拿到参数
  extendProxyOptions(props.api, defaultGridOptions, () =>
    formApi.getLatestSubmissionValues())
}

// formOptions支持响应式
watch(
  formOptions,
  () => {
    formApi.setState((prev) => {
      const finalFormOptions: KpuFormProps = mergeWithArrayOverride(
        {},
        formOptions.value,
        prev,
      )
      return {
        ...finalFormOptions,
        collapseTriggerResize: !!finalFormOptions.showCollapseButton,
      }
    })
  },
  {
    immediate: true,
  },
)

const isCompactForm = computed(() => {
  return formApi.getState()?.compact
})

onMounted(() => {
  props.api?.mount?.(gridRef.value, formApi)
  init()
})

onUnmounted(() => {
  formApi?.unmount?.()
  props.api?.unmount?.()
})
</script>

<template>
  <div :class="cn('bg-card h-full rounded-md', className)">
    <VxeGrid
      ref="gridRef"
      :class="
        cn(
          'p-2',
          {
            'pt-0': showToolbar && !formOptions,
          },
          gridClass,
        )
      "
      v-bind="options"
      v-on="events"
    >
      <!-- 左侧操作区域或者title -->
      <template v-if="showToolbar" #toolbar-actions="slotProps">
        <slot v-if="showTableTitle" name="table-title">
          <div class="mr-1 pl-1 text-[1rem]">
            {{ tableTitle }}
            <KpuHelpTooltip v-if="tableTitleHelp" trigger-class="pb-1">
              {{ tableTitleHelp }}
            </KpuHelpTooltip>
          </div>
        </slot>
        <slot name="toolbar-actions" v-bind="slotProps" />
      </template>

      <!-- 继承默认的slot -->
      <template
        v-for="(slotName) in delegatedSlots"
        :key="slotName"
        #[slotName]="slotProps"
      >
        <slot :name="slotName" v-bind="slotProps" />
      </template>

      <!-- form表单 -->
      <template #form>
        <div
          v-if="formOptions"
          v-show="showSearchForm !== false"
          :class="cn('relative rounded py-3', isCompactForm ? 'pb-6' : 'pb-4')"
        >
          <slot name="form">
            <Form>
              <template
                v-for="slotName in delegatedFormSlots"
                :key="slotName"
                #[slotName]="slotProps"
              >
                <slot
                  :name="`${FORM_SLOT_PREFIX}${slotName}`"
                  v-bind="slotProps"
                />
              </template>
              <template #reset-before="slotProps">
                <slot name="reset-before" v-bind="slotProps" />
              </template>
              <template #submit-before="slotProps">
                <slot name="submit-before" v-bind="slotProps" />
              </template>
              <template #expand-before="slotProps">
                <slot name="expand-before" v-bind="slotProps" />
              </template>
              <template #expand-after="slotProps">
                <slot name="expand-after" v-bind="slotProps" />
              </template>
            </Form>
          </slot>
          <div
            class="absolute bottom-1 z-100 h-2 w-[calc(100%+1rem)] overflow-hidden bg-[var(--g-main-area-bg)] -left-2 md:bottom-2 md:h-3"
          />
        </div>
      </template>
      <!-- loading -->
      <template #loading>
        <slot name="loading">
          <KpuLoading :spinning="true" />
        </slot>
      </template>
      <!-- 统一控状态 -->
      <template #empty>
        <slot name="empty">
          <!--          <EmptyIcon class="mx-auto" /> -->
          <EmptyIcon class="mx-auto" />
          <div class="mt-2">
            {{ $t('common.noData') }}
          </div>
        </slot>
      </template>
    </VxeGrid>
  </div>
</template>
