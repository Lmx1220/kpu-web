<script lang="ts" setup>
defineOptions({
  name: 'Auth',
})

const props = defineProps<{
  value: string | string[]
}>()

function check() {
  return useAuth().auth(props.value)
}
</script>

<template>
  <div>
    <slot v-if="check()" />
    <slot v-else name="no-auth" />
  </div>
</template>
