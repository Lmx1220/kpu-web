<script setup lang="ts">
defineOptions({
  name: 'LoginSwitcher',
})
const route = useRoute()
const router = useRouter()

function command(name: string) {
  router.replace({ name })
}
const items = computed(() => {
  return [[
    { label: '风格1', handle: () => command('login'), disabled: route.name === 'login' },
    { label: '风格2', handle: () => command('login2'), disabled: route.name === 'login2' },
  ]]
})
</script>

<template>
  <div>
    <HDropdownMenu
      :items="items"
    >
      <HButton outline>
        切换登录页风格
        <SvgIcon class="el-icon--right" name="i-ep:arrow-down" />
      </HButton>
    </HDropdownMenu>
  </div>
</template>
