<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings.ts'
import useUserStore from '@/store/modules/user'
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/shadcn/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const emits = defineEmits<{
  onAfterLogin: [string]
}>()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const { t } = useI18n()
const loading = ref(false)

// 登录方式，default 账号密码登录，qrcode 扫码登录
const type = ref<'default' | 'qrcode'>('default')

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    account: z.string().min(1, t('loginAgainFrom.rules.account')),
    password: z.string().min(1, t('loginAgainFrom.rules.password')),
  })),
  initialValues: {
    account: userStore.account,
    password: '',
  },
})
const onSubmit = form.handleSubmit((values) => {
  loading.value = true
  userStore.login({ username: values.account, password: values.password }).then(async () => {
    settingsStore.settings.app.enablePermission && await userStore.getPermissions()
    // settingsStore.settings.userPreferences.enable && await userStore.getPreferences()
    emits('onAfterLogin', values.account)
  }).finally(() => {
    loading.value = false
  })
})
</script>

<template>
  <div class="w-full flex-col-stretch-center p-12">
    <div class="mb-6 space-y-2">
      <h3 class="text-4xl color-[var(--el-text-color-primary)] font-bold">
        {{ t('loginAgainFrom.intro') }}
      </h3><p class="text-sm text-muted-foreground lg:text-base">
        {{ t('loginAgainFrom.subIntro') }}
      </p>
    </div>
    <div class="mb-4">
      <KTabs
        v-model="type" :list="[
          { label: t('loginAgainFrom.accountLogin'), value: 'default' },
          { label: t('loginAgainFrom.qrcodeLogin'), value: 'qrcode' },
        ]" class="inline-flex"
      />
    </div>
    <div v-show="type === 'default'">
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField, errors }" name="account">
          <FormItem class="relative pb-6 space-y-0">
            <FormControl>
              <KInput type="text" :placeholder="t('loginAgainFrom.form.account')" class="w-full" disabled :class="errors.length && 'border-destructive'" v-bind="componentField" />
            </FormControl>
            <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
              <FormMessage class="absolute bottom-1 text-xs" />
            </Transition>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField, errors }" name="password">
          <FormItem class="relative pb-6 space-y-0">
            <FormControl>
              <KInput type="password" :placeholder="t('loginAgainFrom.form.password')" class="w-full" :class="errors.length && 'border-destructive'" v-bind="componentField" />
            </FormControl>
            <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
              <FormMessage class="absolute bottom-1 text-xs" />
            </Transition>
          </FormItem>
        </FormField>
        <KButton :loading="loading" size="lg" class="w-full" type="submit">
          {{ t('loginAgainFrom.form.login') }}
        </KButton>
      </form>
    </div>
    <div v-show="type === 'qrcode'">
      <div class="flex-col-center">
        <img src="https://s2.loli.net/2024/04/26/GsahtuIZ9XOg5jr.png" class="h-[250px] w-[250px]">
        <div class="mt-2 text-sm text-secondary-foreground op-50">
          {{ t('loginAgainFrom.wechatQrcode') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
