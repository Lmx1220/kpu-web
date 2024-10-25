<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import Message from 'vue-m-message'

defineOptions({
  name: 'RegisterForm',
})

const props = defineProps<{
  account?: string
}>()

const emits = defineEmits<{
  onLogin: [account: string]
  onRegister: [account: string]
}>()

const { t } = useI18n()
const loading = ref(false)

const formRef = ref<FormInstance>()
const form = ref({
  account: props.account ?? '',
  captcha: '',
  password: '',
  checkPassword: '',
})
const rules = ref<FormRules>({
  account: [
    { required: true, trigger: 'blur', message: t('registerForm.rules.account') },
  ],
  captcha: [
    { required: true, trigger: 'blur', message: () => t('registerForm.rules.captcha') },
  ],
  password: [
    { required: true, trigger: 'blur', message: t('registerForm.rules.password') },
    { min: 6, max: 18, trigger: 'blur', message: t('registerForm.rules.passwordLength') },
  ],
  checkPassword: [
    { required: true, trigger: 'blur', message: t('registerForm.rules.checkPassword') },
    {
      validator: (_rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error(t('registerForm.rules.checkPasswordError')))
        }
        else {
          callback()
        }
      },
    },
  ],
})
function handleRegister() {
  Message({
    message: '注册模块仅提供界面演示，无实际功能，需开发者自行扩展',
    type: 'warning',
  })
  formRef.value?.validate((valid) => {
    if (valid) {
      // 这里编写业务代码
      emits('onRegister', form.value.account)
    }
  })
}
</script>

<template>
  <ElForm ref="formRef" :model="form" :rules="rules" class="min-h-500px w-full flex-col-stretch-center p-12">
    <h3 class="mb-8 text-xl color-[var(--el-text-color-primary)] font-bold">
      {{ t('registerForm.intro') }}
    </h3>
    <div>
      <ElFormItem prop="account">
        <ElInput v-model="form.account" size="large" :placeholder="t('registerForm.form.account')" tabindex="1">
          <template #prefix>
            <SvgIcon name="i-ri:user-3-fill" />
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="captcha">
        <ElInput v-model="form.captcha" size="large" :placeholder="t('registerForm.form.captcha')" tabindex="2">
          <template #prefix>
            <SvgIcon name="i-ic:baseline-verified-user" />
          </template>
          <template #append>
            <ElButton>{{ t('registerForm.form.sendCaptcha') }}</ElButton>
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput v-model="form.password" type="password" size="large" :placeholder="t('registerForm.form.password')" tabindex="3" show-password>
          <template #prefix>
            <SvgIcon name="i-ri:lock-2-fill" />
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="checkPassword">
        <ElInput v-model="form.checkPassword" type="password" size="large" :placeholder="t('registerForm.form.checkPassword')" tabindex="4" show-password>
          <template #prefix>
            <SvgIcon name="i-ri:lock-2-fill" />
          </template>
        </ElInput>
      </ElFormItem>
    </div>
    <ElButton :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;" @click.prevent="handleRegister">
      {{ t('registerForm.form.register') }}
    </ElButton>
    <div class="mt-4 flex-center gap-2 text-sm color-[var(--el-text-color-secondary)]">
      {{ t('registerForm.hasAccount') }}
      <ElLink type="primary" :underline="false" @click="emits('onLogin', form.account)">
        {{ t('registerForm.login') }}
      </ElLink>
    </div>
  </ElForm>
</template>
