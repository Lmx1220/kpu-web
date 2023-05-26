<script setup lang="ts">
const router = useRouter()

defineOptions({
  name: 'KeepAliveExampleDetail',
})
</script>

<template>
  <page-main>
    <el-button @click="router.go(-1)">
      返回
    </el-button>
  </page-main>
</template>
