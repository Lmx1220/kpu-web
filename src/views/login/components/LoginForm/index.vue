<script setup lang="ts">
import { $t } from '@/locales'
import useUserStore from '@/store/modules/user.ts'
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/shadcn/ui/form'
import storage from '@/utils/storage.ts'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

defineOptions({
  name: 'LoginForm',
})

const props = defineProps<{
  account?: string
}>()

const emits = defineEmits<{
  onLogin: [account?: string]
  onRegister: [account?: string]
  onResetPassword: [account?: string]
}>()
const userStore = useUserStore()

const title = import.meta.env.VITE_APP_TITLE
const loading = ref(false)

// 登录方式，default 账号密码登录，qrcode 扫码登录
const type = ref<'default' | 'qrcode'>('default')
const form = useForm({
  validationSchema: toTypedSchema(z.object({
    account: z.string().min(1, $t('loginFrom.rules.account')),
    password: z.string().min(1, $t('loginFrom.rules.password')),
    remember: z.boolean(),
  })),
  initialValues: {
    account: props.account ?? storage.local.get('login_account') ?? '',
    password: '',
    remember: !!storage.local.get('login_account'),
  },
})
const onSubmit = form.handleSubmit((values) => {
  loading.value = true
  userStore.login({ username: values.account, password: values.password }).then(() => {
    if (values.remember) {
      storage.local.set('login_account', values.account)
    }
    else {
      storage.local.remove('login_account')
    }
    emits('onLogin', values.account)
  }).finally(() => {
    loading.value = false
  })
})

function testAccount(account: string) {
  form.setFieldValue('account', account)
  form.setFieldValue('password', '123456')
  onSubmit()
}
</script>

<template>
  <div class="min-h-500px w-full flex-col-stretch-center p-12">
    <div class="mb-6 space-y-2">
      <h3 class="text-4xl color-[var(--el-text-color-primary)] font-bold">
        {{ $t('loginFrom.intro') }}
      </h3>
      <p class="text-sm text-muted-foreground lg:text-base">
        {{ title }}
      </p>
    </div>
    <div class="mb-4">
      <KpuTabs
        v-model="type" :list="[
          { label: $t('loginFrom.accountLogin'), value: 'default' },
          { label: $t('loginFrom.qrcodeLogin'), value: 'qrcode' },
        ]" class="inline-flex"
      />
    </div>
    <div v-show="type === 'default'">
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField, errors }" name="account">
          <FormItem class="relative pb-6 space-y-0">
            <FormControl>
              <KpuInput type="text" :placeholder="$t('loginFrom.form.account')" class="w-full" :class="errors.length && 'border-destructive'" v-bind="componentField" />
            </FormControl>
            <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
              <FormMessage class="absolute bottom-1 text-xs" />
            </Transition>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField, errors }" name="password">
          <FormItem class="relative pb-6 space-y-0">
            <FormControl>
              <KpuInput type="password" :placeholder="$t('loginFrom.form.password')" class="w-full" :class="errors.length && 'border-destructive'" v-bind="componentField" />
            </FormControl>
            <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
              <FormMessage class="absolute bottom-1 text-xs" />
            </Transition>
          </FormItem>
        </FormField>
        <div class="mb-4 flex-center-between">
          <div class="flex-center-start">
            <FormField v-slot="{ componentField }" type="checkbox" name="remember">
              <FormItem>
                <FormControl>
                  <KpuCheckbox v-bind="componentField">
                    {{ $t('loginFrom.remember') }}
                  </KpuCheckbox>
                </FormControl>
              </FormItem>
            </FormField>
          </div>
          <KpuButton variant="link" class="h-auto p-0" type="button" @click="emits('onResetPassword', form.values.account)">
            {{ $t('loginFrom.forget') }}
          </KpuButton>
        </div>
        <KpuButton :loading="loading" size="lg" class="w-full" type="submit">
          {{ $t('loginFrom.form.login') }}
        </KpuButton>
        <div class="mt-4 flex-center gap-2 text-sm">
          <span class="text-secondary-foreground op-50"> {{ $t('loginFrom.noAccount') }}</span>
          <KpuButton variant="link" class="h-auto p-0" type="button" @click="emits('onRegister', form.values.account)">
            {{ $t('loginFrom.register') }}
          </KpuButton>
        </div>
      </form>
      <div class="mt-4 text-center -mb-4">
        <KpuDivider>{{ $t('loginFrom.testLogin') }}</KpuDivider>
        <div class="space-x-2">
          <KpuButton variant="default" size="sm" plain @click="testAccount('kpu')">
            kpu
          </KpuButton>
          <KpuButton variant="outline" size="sm" plain @click="testAccount('test')">
            test
          </KpuButton>
        </div>
      </div>
    </div>
    <div v-show="type === 'qrcode'">
      <div class="flex-col-center">
        <img src="https://s2.loli.net/2024/04/26/GsahtuIZ9XOg5jr.png" class="h-[250px] w-[250px]">
        <div class="mt-2 text-sm text-secondary-foreground op-50">
          {{ $t('loginFrom.wechatQrcode') }}
        </div>
      </div>
    </div>
  </div>
</template>
