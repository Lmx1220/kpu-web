<script setup lang="ts">
defineOptions({
  name: 'Reload',
})
const router = useRouter()

onMounted(() => {
  router.go(-1)
})
</script>

<template>
  <div />
</template>
