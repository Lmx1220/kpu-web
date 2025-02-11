import type {
  KpuFormSchema as FormSchema,
  KpuFormProps,
} from '@/ui/form-ui/index'
import type { ComponentType } from './component'
import { $t } from '@/locales'

import { setupKpuForm, useKpuForm as useForm, z } from '@/ui/form-ui/index'

setupKpuForm<ComponentType>({
  config: {
    modelPropNameMap: {
      Upload: 'fileList',
      CheckboxGroup: 'value',
      // CheckboxGroup: 'model-value',
    },
  },
  defineRules: {
    required: (value, _params, ctx) => {
      if (value === undefined || value === null || value.length === 0) {
        return $t('ui.formRules.required', [ctx.label])
      }
      return true
    },
    selectRequired: (value, _params, ctx) => {
      if (value === undefined || value === null) {
        return $t('ui.formRules.selectRequired', [ctx.label])
      }
      return true
    },
  },
})

const useKpuForm = useForm<ComponentType>

export { useKpuForm, z }

export type KpuFormSchema = FormSchema<ComponentType>
export type { KpuFormProps }
