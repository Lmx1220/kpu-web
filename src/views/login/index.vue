<script setup lang="ts">
import Copyright from '@/layouts/components/Copyright/index.vue'
import ColorScheme from '@/layouts/components/Topbar/Toolbar/ColorScheme/index.vue'
import I18n from '@/layouts/components/Topbar/Toolbar/I18n/index.vue'
import useSettingsStore from '@/store/modules/settings.ts'
import LoginForm from '@/views/login/components/LoginForm/index.vue'
import RegisterForm from '@/views/login/components/RegisterForm/index.vue'
import ResetPasswordForm from '@/views/login/components/ResetPasswordForm/index.vue'

defineOptions({
  name: 'Login',
})
const route = useRoute()
const router = useRouter()
const settingsStore = useSettingsStore()

const layout = ref<'right' | 'center' | 'left'>('center')
const redirect = ref(route.query.redirect?.toString() ?? settingsStore.settings.home.fullPath)

// 表单类型，login 登录，register 注册，reset 重置密码
const formType = ref<'login' | 'register' | 'resetPassword'>('login')
const account = ref<string>()
const formRef = ref()
</script>

<template>
  <div class="bg-banner" />
  <div class="absolute right-4 top-4 z-1 flex-center rounded-full bg-[var(--g-container-bg)] p-1 text-base ring-1 ring-stone-2 dark-ring-stone-8">
    <HDropdownMenu
      v-if="settingsStore.mode === 'pc'" :items="[
        [{
          label: '左侧布局',
          disabled: layout === 'left',
          handle: () => {
            layout = 'left'
          },
        }, {
          label: '居中布局',
          disabled: layout === 'center',
          handle: () => {
            layout = 'center'
          },
        }, {
          label: '右侧布局',
          disabled: layout === 'right',
          handle: () => {
            layout = 'right'
          },
        }],
      ]"
      class="cursor-pointer rounded-full p-2 hover-bg-[var(--g-bg)]"
    >
      <svg-icon
        :name="{
          left: 'i-icon-park-outline:left-bar',
          center: 'i-icon-park-outline:square',
          right: 'i-icon-park-outline:right-bar',
        }[layout]"
      />
    </HDropdownMenu>

    <I18n v-if="settingsStore.settings.toolbar.i18n" class="rounded-full hover-bg-[var(--g-bg)]" />
    <ColorScheme v-if="settingsStore.settings.toolbar.colorScheme" class="rounded-full hover-bg-[var(--g-bg)]" />
  </div>

  <div class="login-box" :class="layout">
    <div class="login-banner">
      <img src="@/assets/images/logo.png" class="absolute left-4 top-4 h-30px rounded ring ring-stone-2 dark-ring-stone-8">
      <img src="@/assets/images/login-banner.png" class="banner">
      <Copyright v-if="settingsStore.mode === 'pc' && ['left', 'right'].includes(layout)" />
    </div>
    <div class="login-form flex-col-center">
      <Transition name="fade" mode="out-in">
        <LoginForm
          v-if="formType === 'login'"
          ref="formRef"
          :account
          @on-login="router.push(redirect)"
          @on-register="(account) => { formType = 'register'; account = account }"
          @on-reset-password="(account) => { formType = 'resetPassword'; account = account }"
        />
        <RegisterForm
          v-else-if="formType === 'register'"
          ref="formRef"
          :account
          @on-register="(account) => { formType = 'login'; account = account }"
          @on-login="formType = 'login'"
        />
        <ResetPasswordForm
          v-else-if="formType === 'resetPassword'"
          ref="formRef"
          :account
          @on-reset-password="(account) => { formType = 'login'; account = account }"
          @on-login="formType = 'login'"
        />
      </Transition>
    </div>
  </div>
  <Copyright v-if="settingsStore.mode === 'mobile' || 'center' === layout" />
</template>

<style scoped>
.bg-banner {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--g-container-bg), var(--g-bg));
}

[data-mode="mobile"] {
  .login-box {
    position: relative;
    flex-direction: column;
    justify-content: start;
    width: 100%;

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
    }
  }

  .copyright {
    position: relative;
  }
}

.login-box {
  position: absolute;
  display: flex;
  overflow: hidden;
  background-color: var(--g-container-bg);

  [data-mode="pc"] & {
    &.center {
      top: 50%;
      left: 50%;
      border-radius: 10px;
      box-shadow: var(--el-box-shadow);
      transform: translate(-50%) translateY(-50%);
    }

    &.left,
    &.right {
      width: 100%;
      height: 100%;

      .login-banner {
        flex: 1;

        .banner {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50%;
          height: 50%;
          object-fit: contain;
          transform: translate(-50%) translateY(-50%);
        }
      }
    }

    &.left {
      flex-direction: row-reverse;
    }
  }

  .login-banner {
    position: relative;
    width: 450px;
    overflow: hidden;
    background-color: var(--g-bg);

    .banner {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
    }
  }

  .login-form {
    width: 500px;
    transition: height 0.15s ease;
  }
}

.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
