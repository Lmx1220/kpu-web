<script setup lang="ts">
import { useI18n } from '@/locales/utils'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/ui/shadcn/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

defineOptions({
  name: 'RegisterForm',
})

const props = defineProps<{
  account?: string
}>()

const emits = defineEmits<{
  onLogin: [account?: string]
  onRegister: [account?: string]
}>()

const { t } = useI18n()
const loading = ref(false)

const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      account: z.string().min(1, t('registerForm.rules.account')),
      captcha: z.string().min(6, t('registerForm.rules.captcha')),
      password: z.string().min(1, t('registerForm.rules.password')).min(6, t('registerForm.rules.passwordLength')).max(18, t('registerForm.rules.passwordLength')),
      checkPassword: z.string().min(1, t('registerForm.rules.checkPassword')),
    }).refine(data => data.password === data.checkPassword, {
      message: t('registerForm.rules.checkPasswordError'),
      path: ['checkPassword'],
    }),
  ),
  initialValues: {
    account: props.account ?? '',
    captcha: '',
    password: '',
    checkPassword: '',
  },
})
const onSubmit = form.handleSubmit((values) => {
  loading.value = true
  emits('onRegister', values.account)
})
</script>

<template>
  <div class="min-h-500px w-full flex-col-stretch-center p-12">
    <form @submit="onSubmit">
      <div class="mb-8 space-y-2">
        <h3 class="text-4xl color-[var(--el-text-color-primary)] font-bold">
          {{ t('registerForm.intro') }}
        </h3>
        <p class="text-sm text-muted-foreground lg:text-base">
          演示系统未提供该功能
        </p>
      </div>
      <FormField v-slot="{ componentField, errors }" name="account">
        <FormItem class="relative pb-6 space-y-0">
          <FormControl>
            <KpuInput type="text" :placeholder="t('registerForm.form.account')" class="w-full" :class="errors.length && 'border-destructive'" v-bind="componentField" />
          </FormControl>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="absolute bottom-1 text-xs" />
          </Transition>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField, value, errors }" name="password">
        <FormItem class="relative pb-6 space-y-0">
          <FormControl>
            <KpuInput type="password" :placeholder="t('registerForm.form.password')" class="w-full" :class="errors.length && 'border-destructive'" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            <KpuPasswordStrength :password="value" class="mt-2" />
          </FormDescription>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="absolute bottom-1 text-xs" />
          </Transition>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField, errors }" name="checkPassword">
        <FormItem class="relative pb-6 space-y-0">
          <FormControl>
            <KpuInput type="password" :placeholder="t('registerForm.form.checkPassword')" class="w-full" :class="errors.length && 'border-destructive'" v-bind="componentField" />
          </FormControl>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="absolute bottom-1 text-xs" />
          </Transition>
        </FormItem>
      </FormField>
      <KpuButton :loading="loading" size="lg" class="mt-4 w-full" type="submit">
        {{ t('registerForm.form.register') }}
      </KpuButton>
      <div class="mt-4 flex-center gap-2 text-sm">
        <span class="text-secondary-foreground op-50">  {{ t('registerForm.hasAccount') }}</span>
        <KpuButton variant="link" class="h-auto p-0" @click="emits('onLogin', form.values.account)">
          {{ t('registerForm.login') }}
        </KpuButton>
      </div>
    </form>
  </div>
</template>
