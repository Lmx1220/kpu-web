<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import Message from 'vue-m-message'
import storage from '@/util/storage'
import useUserStore from '@/store/modules/user'
import Copyright from '@/layouts/components/Copyright/index.vue'
import useSettingsStore from '@/store/modules/settings.ts'

defineOptions({
  name: 'Login',
})
const { t } = useI18n()
const logo = new URL('../assets/images/logo.png', import.meta.url).href
const banner = new URL('../assets/images/login-banner.png', import.meta.url).href
const title = import.meta.env.VITE_APP_TITLE
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

// 登录方式，default 账号密码登录，qrcode 扫码登录
const loginType = ref('PASSWORD')

// 表单类型，login 登录，register 注册，reset 重置密码
const formType = ref('login')
const loading = ref(false)
const redirect = ref(route.query.redirect?.toString() ?? settingsStore.settings.home.fullPath)

// 登录
const loginFormRef = ref<FormInstance>()
const loginForm = ref({
  account: storage.local.get('login_account') ?? '',
  password: '',
  remember: storage.local.has('login_account'),
})
const loginRules = ref<FormRules>({
  account: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    // { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
})

function handleLogin() {
  loginFormRef.value && loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      try {
        userStore.login({ username: loginForm.value.account, password: loginForm.value.password, grantType: loginType.value }).then(() => {
          loading.value = false
          if (loginForm.value.remember) {
            storage.local.set('login_account', loginForm.value.account ?? '')
          }
          else {
            storage.local.remove('login_account')
          }
          router.push(redirect.value)
        }).catch(() => {
          loading.value = false
        })
      }
      catch (e) {
        console.error(e)
      }
    }
  })
}
// 注册
const registerFormRef = ref<FormInstance>()
const registerForm = ref({
  account: '',
  captcha: '',
  password: '',
  checkPassword: '',
})
const registerRules = ref<FormRules>({
  account: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
  ],
  captcha: [
    { required: true, trigger: 'blur', message: '请输入验证码' },
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    // { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  checkPassword: [
    { required: true, trigger: 'blur', message: '请再次输入密码' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        }
        else {
          callback()
        }
      },
    },
  ],
})

function handleRegister() {
  Message.warning('注册模块仅提供界面演示，无实际功能，需开发者自行扩展')
  registerFormRef.value && registerFormRef.value.validate((valid) => {
    if (valid) {
      // 这里编写业务代码
    }
  })
}

// 重置密码
const resetFormRef = ref<FormInstance>()
const resetForm = ref({
  account: storage.local.get('login_account') ?? '',
  captcha: '',
  newPassword: '',
})
const resetRules = ref<FormRules>({
  account: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
  ],
  captcha: [
    { required: true, trigger: 'blur', message: '请输入验证码' },
  ],
  newPassword: [
    { required: true, trigger: 'blur', message: '请输入新密码' },
    // { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
})

function handleReset() {
  Message.warning('重置密码模块仅提供界面演示，无实际功能，需开发者自行扩展')
  resetFormRef.value && resetFormRef.value.validate((valid) => {
    if (valid) {
      // 这里编写业务代码
    }
  })
}

function testAccount(account: string) {
  loginForm.value.account = account
  loginForm.value.password = 'kpu'
  handleLogin()
}
</script>

<template>
  <div>
    <div class="bg-banner" />
    <I18nSelector class="i18n-selector">
      <SvgIcon name="i-ri:translate" />
    </I18nSelector>
    <div id="login-box">
      <div class="login-banner">
        <img :src="logo" class="logo">
        <img :src="banner" class="banner">
      </div>
      <ElForm
        v-show="formType === 'login'" ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form"
        autocapitalize="on"
      >
        <div class="title-container">
          <h3 class="title">
            欢迎来到 {{ title }} ! 👋🏻
          </h3>
        </div>
        <div>
          <ElFormItem prop="account">
            <ElInput v-model="loginForm.account" :placeholder="t('app.account')" autocomplete="on" tabindex="1" text>
              <template #prefix>
                <SvgIcon name="i-ri:user-3-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput
              v-model="loginForm.password" type="password" :placeholder="t('app.password')" tabindex="2"
              autocomplete="on" show-password @keyup.enter="handleLogin"
            >
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
        </div>
        <div class="flex-bar">
          <ElCheckbox v-model="loginForm.remember">
            记住我
          </ElCheckbox>
          <ElLink :underline="false" type="primary" @click="formType = 'reset'">
            忘记密码了?
          </ElLink>
        </div>
        <ElButton :loading="loading" size="large" style="width: 100%;" type="primary" @click.prevent="handleLogin">
          {{ t('app.login') }}
        </ElButton>
        <div class="sub-link">
          <span class="text">还没有帐号?</span>
          <ElLink :underline="false" type="primary" @click="formType = 'register'">
            创建新帐号
          </ElLink>
        </div>
        <div style="margin-top: 20px; margin-bottom: -20px; text-align: center;">
          <ElDivider>演示账号一键登录</ElDivider>
          <ElButton plain size="small" type="primary" @click="testAccount('kpu')">
            kpu
          </ElButton>
          <ElButton plain size="small" @click="testAccount('test')">
            test
          </ElButton>
        </div>
      </ElForm>
      <ElForm
        v-show="formType === 'register'" ref="registerFormRef" :model="registerForm" :rules="registerRules"
        class="login-form" auto-complete="on"
      >
        <div class="title-container">
          <h3 class="title">
            探索从这里开始! 🚀
          </h3>
        </div>
        <div>
          <ElFormItem prop="account">
            <ElInput v-model="registerForm.account" autocomplete="on" placeholder="用户名" tabindex="1">
              <template #prefix>
                <SvgIcon name="ep:user" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="captcha">
            <ElInput v-model="registerForm.captcha" autocomplete="on" placeholder="验证码" tabindex="2">
              <template #prefix>
                <SvgIcon name="ep:key" />
              </template>
              <template #append>
                <ElButton>发送验证码</ElButton>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput
              v-model="registerForm.password" type="password" placeholder="密码" tabindex="3" autocomplete="on"
              show-password
            >
              <template #prefix>
                <SvgIcon name="ep:lock" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="checkPassword">
            <ElInput
              v-model="registerForm.checkPassword" type="password" placeholder="确认密码" tabindex="4"
              autocomplete="on" show-password
            >
              <template #prefix>
                <SvgIcon name="ep:lock" />
              </template>
            </ElInput>
          </ElFormItem>
        </div>
        <ElButton
          :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;"
          @click.prevent="handleRegister"
        >
          注册
        </ElButton>
        <div class="sub-link">
          <span class="text">已经有帐号?</span>
          <ElLink :underline="false" type="primary" @click="formType = 'login'">
            去登录
          </ElLink>
        </div>
      </ElForm>
      <ElForm
        v-show="formType === 'reset'" ref="resetFormRef" :model="resetForm" :rules="resetRules" class="login-form"
        auto-complete="on"
      >
        <div class="title-container">
          <h3 class="title">
            忘记密码了? 🔒
          </h3>
        </div>
        <div>
          <ElFormItem prop="account">
            <ElInput v-model="resetForm.account" autocomplete="on" placeholder="用户名" tabindex="1">
              <template #prefix>
                <SvgIcon name="ep:user" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="captcha">
            <ElInput v-model="resetForm.captcha" autocomplete="on" placeholder="验证码" tabindex="2">
              <template #prefix>
                <SvgIcon name="ep:key" />
              </template>
              <template #append>
                <ElButton>发送验证码</ElButton>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="newPassword">
            <ElInput
              v-model="resetForm.newPassword" type="password" placeholder="新密码" tabindex="3" autocomplete="on"
              show-password
            >
              <template #prefix>
                <SvgIcon name="ep:lock" />
              </template>
            </ElInput>
          </ElFormItem>
        </div>
        <ElButton
          :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;"
          @click.prevent="handleReset"
        >
          确认
        </ElButton>
        <div class="sub-link">
          <ElLink :underline="false" type="primary" @click="formType = 'login'">
            返回登录
          </ElLink>
        </div>
      </ElForm>
    </div>
    <Copyright />
    <LoginSwitcher class="login-switcher" />
  </div>
</template>

<style lang="scss" scoped>
[data-mode="mobile"] {
  #login-box {
    position: relative;
    top: inherit;
    left: inherit;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
    transform: translateX(0) translateY(0);

    .login-banner {
      width: 100%;
      padding: 20px 0;

      .banner {
        position: relative;
        top: inherit;
        right: inherit;
        display: inherit;
        width: 100%;
        max-width: 375px;
        margin: 0 auto;
        transform: translateY(0);
      }
    }

    .login-form {
      width: 100%;
      min-height: auto;
      padding: 30px;
    }
  }

  .copyright {
    position: relative;
  }

  .login-switcher {
    display: none;
  }
}

.bg-banner {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--g-container-bg), var(--g-bg));
}

:deep(.i18n-selector) {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  font-size: 18px;
  color: var(--el-text-color-primary);
  cursor: pointer;
}

#login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background-color: var(--g-container-bg);
  border-radius: 10px;
  box-shadow: var(--el-box-shadow);
  transform: translate(-50%) translateY(-50%);

  .login-banner {
    position: relative;
    width: 450px;
    background-color: var(--g-bg);

    .banner {
      width: calc(100%);

      @include position-center(y);
    }

    .logo {
      position: absolute;
      top: 20px;
      left: 20px;
      height: 30px;
      border-radius: 4px;
      box-shadow: var(--el-box-shadow-light);
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    min-height: 500px;
    padding: 50px;
    overflow: hidden;

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 30px;
        font-size: 1.3em;
        font-weight: 700;
        color: var(--el-text-color-primary);
      }
    }
  }

  .el-form-item {
    margin-bottom: 24px;

    :deep(.el-input) {
      width: 100%;
      height: 48px;
      line-height: inherit;

      input {
        height: 48px;
      }

      .el-input__prefix,
      .el-input__suffix {
        display: flex;
        align-items: center;
      }

      .el-input__prefix {
        left: 10px;
      }

      .el-input__suffix {
        right: 10px;
      }
    }
  }

  .flex-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  :deep(.el-divider__text) {
    background-color: var(--g-container-bg);
  }

  .sub-link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 14px;
    color: var(--el-text-color-secondary);

    .text {
      margin-right: 10px;
    }
  }
}

.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  margin: 0;
}

.login-switcher {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
