<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import type { FormSchemaExt } from '@/api/modules/common/formValidateService'
import { getValidateRuleObj } from '@/api/modules/common/formValidateService'
import { ActionEnum, VALIDATE_API } from '@/enums/commonEnum'
import yesOrNoEnum from '@/enums/common/yesOrNoEnum'
import { dictComponentProps } from '@/util/common'
import type { FormConfig } from '#/global'
import crudDefApplication, { Api } from '@/api/modules/devOperation/application/defApplication'

export interface Props {
  id?: string
  type?: ActionEnum
}

defineOptions({
  name: 'DetailForm',
})

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: ActionEnum.ADD,
})

function customFormSchemaRules(_: ActionEnum): Partial<FormSchemaExt>[] {
  return []
}

const { t } = useI18n()
const data = ref<FormConfig>({
  loading: false,
  form: {
    id: props.id,
  },
  rules: {
  },
})
const form = ref<FormInstance>()

onMounted(async () => {
  if (unref(props.type) !== ActionEnum.VIEW) {
    const validateApi = Api[VALIDATE_API[unref(props.type)]]
    await getValidateRuleObj(validateApi, customFormSchemaRules(props.type)).then((rules: any) => {
      rules && (data.value.rules = rules)
      setTimeout(() => {
        form.value?.clearValidate()
      }, 200)
    })
  }
  if (data.value.form.id !== '') {
    getInfo()
  }
})

function getInfo() {
  data.value.loading = true
  crudDefApplication.detail(data.value.form.id).then((res) => {
    data.value.loading = false
    data.value.form = res
  })
}

defineExpose({
  submit(callback: any) {
    form.value?.validate(async (valid) => {
      if (valid) {
        if (props.type !== ActionEnum.VIEW) {
          if (props.type === ActionEnum.EDIT) {
            await crudDefApplication.update(data.value.form)
          }
          else {
            await crudDefApplication.save(data.value.form)
          }
          ElMessage.success({
            message: t(`common.tips.${props.type}Success`),
            center: true,
          })
          callback && callback()
        }
        else {
          callback && callback(false)
        }
      }
    })
  },
})
</script>

<template>
  <div v-loading="data.loading">
    <el-form ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="120px">
      <el-row>
        <el-col>
          <el-form-item prop="appKey" :label="t('devOperation.application.defApplication.appKey')">
            <ElInput
              v-model="data.form.appKey"
              :placeholder="t('common.inputText')"
              :disabled="props.type === 'view'"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="appSecret" :label="t('devOperation.application.defApplication.appSecret')">
            <ElInput
              v-model="data.form.appSecret"
              :placeholder="t('common.inputText')"
              :disabled="props.type === 'view'"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="name" :label="t('devOperation.application.defApplication.name')">
            <ElInput
              v-model="data.form.name"
              :placeholder="t('common.inputText')"
              :disabled="props.type === 'view'"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="version" :label="t('devOperation.application.defApplication.version')">
            <ElInput
              v-model="data.form.version"
              :placeholder="t('common.inputText')"
              :disabled="props.type === 'view'"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="type" :label="t('devOperation.application.defApplication.type')">
            <ApiRadioGroup
              v-model="data.form.type"
              v-bind="dictComponentProps('APPLICATION_TYPE')"
              :placeholder="t('common.chooseText')"
              :disabled="props.type === 'view'"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="redirect" :label="t('devOperation.application.defApplication.redirect')">
            <ElInput
              v-model="data.form.redirect"
              :placeholder="t('common.inputText')"
              :disabled="props.type === 'view'"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="introduce" :label="t('devOperation.application.defApplication.introduce')">
            <ElInput
              v-model="data.form.introduce"
              :placeholder="t('common.inputText')"
              :disabled="props.type === 'view'"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="remark" :label="t('devOperation.application.defApplication.remark')">
            <ElInput
              v-model="data.form.remark"
              type="textarea"
              :placeholder="t('common.inputText')"
              :disabled="props.type === 'view'"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="url" :label="t('devOperation.application.defApplication.url')">
            <ElInput
              v-model="data.form.url"
              :placeholder="t('common.inputText')"
              :disabled="props.type === 'view'"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="isGeneral" :label="t('devOperation.application.defApplication.isGeneral')">
            <ElRadioGroup
              v-model="data.form.isGeneral"
              :placeholder="t('common.inputText')"
              :disabled="props.type === 'view'"
            >
              <el-radio-button v-for="(item, index) in yesOrNoEnum.enum()" :key="index" :value="item.value">
                {{ item.label }}
              </el-radio-button>
            </ElRadioGroup>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="isVisible" :label="t('devOperation.application.defApplication.isVisible')">
            <ElRadioGroup
              v-model="data.form.isVisible"
              :placeholder="t('common.inputText')"
              :disabled="props.type === 'view'"
            >
              <el-radio-button v-for="(item, index) in yesOrNoEnum.enum()" :key="index" :value="item.value">
                {{ item.label }}
              </el-radio-button>
            </ElRadioGroup>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="sortValue" :label="t('devOperation.application.defApplication.sortValue')">
            <ElInput
              v-model="data.form.sortValue"
              :placeholder="t('common.inputText')"
              :disabled="props.type === 'view'"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
