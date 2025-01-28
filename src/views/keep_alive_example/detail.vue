<script setup lang="ts">
defineOptions({
  name: 'KeepAliveExampleDetail',
})

const router = useRouter()
</script>

<template>
  <KpuPageMain>
    <KpuButton @click="router.go(-1)">
      返回
    </KpuButton>
  </KpuPageMain>
</template>
