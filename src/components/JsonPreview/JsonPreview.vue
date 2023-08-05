<script lang="ts" setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

defineProps({
  data: Object,
})
defineOptions({
  name: 'JsonPreview',
})
</script>

<template>
  <VueJsonPretty :data="data" :deep="3" :show-length="true" path="res" />
</template>
