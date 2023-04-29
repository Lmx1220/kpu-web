<script setup lang="ts" name="LoginSwitcher">
const route = useRoute()
const router = useRouter()
function command(name: string) {
  router.replace({ name })
}
</script>

<template>
  <div>
    <el-dropdown @command="command">
      <el-button>
        切换登录页风格
        <el-icon class="el-icon--right">
          <svg-icon name="i-ep:arrow-down" />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="route.name === 'login'" command="login">
            风格1
          </el-dropdown-item>
          <el-dropdown-item :disabled="route.name === 'login2'" command="login2">
            风格2
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
