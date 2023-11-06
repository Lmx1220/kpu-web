<script setup lang="ts">
defineOptions({
  name: 'KeepAliveExampleDetail',
})

const router = useRouter()
</script>

<template>
  <PageMain>
    <ElButton @click="router.go(-1)">
      返回
    </ElButton>
  </PageMain>
</template>
