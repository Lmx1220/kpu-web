<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import Message from 'vue-m-message'

defineOptions({
  name: 'ResetPasswordForm',
})

const props = defineProps<{
  account?: string
}>()

const emits = defineEmits<{
  onLogin: [account: string]
  onResetPassword: [account: string]
}>()
const { t } = useI18n()
const loading = ref(false)

const formRef = ref<FormInstance>()
const form = ref({
  account: props.account ?? localStorage.login_account ?? '',
  captcha: '',
  newPassword: '',
})
const rules = ref<FormRules>({
  account: [
    { required: true, trigger: 'blur', message: t('resetPasswordForm.rules.account') },
  ],
  captcha: [
    { required: true, trigger: 'blur', message: t('resetPasswordForm.rules.captcha') },
  ],
  newPassword: [
    { required: true, trigger: 'blur', message: t('resetPasswordForm.rules.newPassword') },
    { min: 6, max: 18, trigger: 'blur', message: t('resetPasswordForm.rules.newPasswordLength') },
  ],
})
function handleReset() {
  Message({
    message: '重置密码仅提供界面演示，无实际功能，需开发者自行扩展',
    type: 'info',
  })
  formRef.value?.validate((valid) => {
    if (valid) {
      // 这里编写业务代码
      emits('onResetPassword', form.value.account)
    }
  })
}
</script>

<template>
  <ElForm ref="formRef" :model="form" :rules="rules" class="min-h-500px w-full flex-col-stretch-center p-12">
    <h3 class="mb-8 text-xl color-[var(--el-text-color-primary)] font-bold">
      {{ t('resetPasswordForm.intro') }}
    </h3>
    <div>
      <ElFormItem prop="account">
        <ElInput v-model="form.account" size="large" :placeholder="t('resetPasswordForm.form.account')" type="text" tabindex="1">
          <template #prefix>
            <SvgIcon name="i-ri:user-3-fill" />
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="captcha">
        <ElInput v-model="form.captcha" size="large" :placeholder="t('resetPasswordForm.form.captcha')" type="text" tabindex="2">
          <template #prefix>
            <SvgIcon name="i-ic:baseline-verified-user" />
          </template>
          <template #append>
            <ElButton>{{ t('resetPasswordForm.form.sendCaptcha') }}</ElButton>
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="newPassword">
        <ElInput v-model="form.newPassword" type="password" size="large" :placeholder="t('resetPasswordForm.form.newPassword')" tabindex="3" show-password>
          <template #prefix>
            <SvgIcon name="i-ri:lock-2-fill" />
          </template>
        </ElInput>
      </ElFormItem>
    </div>
    <ElButton :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;" @click.prevent="handleReset">
      {{ t('resetPasswordForm.form.confirm') }}
    </ElButton>
    <div class="mt-4 flex-center gap-2 text-sm color-[var(--el-text-color-secondary)]">
      <ElLink type="primary" :underline="false" @click="emits('onLogin', form.account)">
        {{ t('resetPasswordForm.login') }}
      </ElLink>
    </div>
  </ElForm>
</template>
