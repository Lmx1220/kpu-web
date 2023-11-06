<script setup lang="ts">
defineOptions({
  name: 'LoginSwitcher',
})
const route = useRoute()
const router = useRouter()
function command(name: string) {
  router.replace({ name })
}
</script>

<template>
  <div>
    <ElDropdown @command="command">
      <ElButton>
        切换登录页风格
        <SvgIcon class="el-icon--right" name="i-ep:arrow-down" />
      </ElButton>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem :disabled="route.name === 'login'" command="login">
            风格1
          </ElDropdownItem>
          <ElDropdownItem :disabled="route.name === 'login2'" command="login2">
            风格2
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>
