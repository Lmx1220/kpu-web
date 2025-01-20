<script setup lang="ts">
defineOptions({
  name: 'KeepAliveExampleDetail',
})

const router = useRouter()
</script>

<template>
  <KPageMain>
    <KButton @click="router.go(-1)">
      返回
    </KButton>
  </KPageMain>
</template>
