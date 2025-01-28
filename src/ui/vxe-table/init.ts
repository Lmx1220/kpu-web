import type { useKpuForm } from '../form-ui'

import type { SetupVxeTable } from './types'

// import { usePreferences } from '@vben/preferences'

import useSettingsStore from '@/store/modules/settings.ts'

import { defineComponent, watch } from 'vue'
import {
  VxeButton,
  VxeCheckbox,

  // VxeFormGather,
  // VxeForm,
  // VxeFormItem,
  VxeIcon,
  VxeInput,
  VxeLoading,
  VxeModal,
  VxeNumberInput,
  VxePager,
  // VxeList,
  // VxeModal,
  // VxeOptgroup,
  // VxeOption,
  // VxePulldown,
  // VxeRadio,
  // VxeRadioButton,
  VxeRadioGroup,
  VxeSelect,
  VxeTooltip,
  VxeUI,
  VxeUpload,
  // VxeSwitch,
  // VxeTextarea,
} from 'vxe-pc-ui'
import enUS from 'vxe-pc-ui/lib/language/en-US'
// 导入默认的语言
import zhCN from 'vxe-pc-ui/lib/language/zh-CN'

import {
  VxeColgroup,
  VxeColumn,
  VxeGrid,
  VxeTable,
  VxeToolbar,
} from 'vxe-table'
import { extendsDefaultFormatter } from './extends'

// 是否加载过
let isInit = false

// eslint-disable-next-line import/no-mutable-exports
export let useTableForm: typeof useKpuForm

// 部分组件，如果没注册，vxe-table 会报错，这里实际没用组件，只是为了不报错，同时可以减少打包体积
function createVirtualComponent(name = '') {
  return defineComponent({
    name,
  })
}

export function initVxeTable() {
  if (isInit) {
    return
  }

  VxeUI.component(VxeTable)
  VxeUI.component(VxeColumn)
  VxeUI.component(VxeColgroup)
  VxeUI.component(VxeGrid)
  VxeUI.component(VxeToolbar)

  VxeUI.component(VxeButton)
  // VxeUI.component(VxeButtonGroup);
  VxeUI.component(VxeCheckbox)
  // VxeUI.component(VxeCheckboxGroup);
  VxeUI.component(createVirtualComponent('VxeForm'))
  // VxeUI.component(VxeFormGather);
  // VxeUI.component(VxeFormItem);
  VxeUI.component(VxeIcon)
  VxeUI.component(VxeInput)
  // VxeUI.component(VxeList);
  VxeUI.component(VxeLoading)
  VxeUI.component(VxeModal)
  VxeUI.component(VxeNumberInput)
  // VxeUI.component(VxeOptgroup);
  // VxeUI.component(VxeOption);
  VxeUI.component(VxePager)
  // VxeUI.component(VxePulldown);
  // VxeUI.component(VxeRadio);
  // VxeUI.component(VxeRadioButton);
  VxeUI.component(VxeRadioGroup)
  VxeUI.component(VxeSelect)
  // VxeUI.component(VxeSwitch);
  // VxeUI.component(VxeTextarea);
  VxeUI.component(VxeTooltip)
  VxeUI.component(VxeUpload)

  isInit = true
}

export function setupKpuVxeTable(setupOptions: SetupVxeTable) {
  const { configVxeTable, useKpuForm } = setupOptions

  initVxeTable()
  useTableForm = useKpuForm

  // const preference = usePreferences()

  const settingsStore = useSettingsStore()
  const localMap = {
    'zh-cn': zhCN,
    'en': enUS,
  }

  watch(
    [() => settingsStore.settings.app.colorScheme, () => settingsStore.settings.app.defaultLang],
    ([theme, locale]) => {
      VxeUI.setTheme(theme === 'dark' ? 'dark' : 'light')
      VxeUI.setI18n(locale, localMap[locale as 'zh-cn' | 'en'])
      VxeUI.setLanguage(locale)
    },
    {
      immediate: true,
    },
  )

  extendsDefaultFormatter(VxeUI)

  configVxeTable(VxeUI)
}
