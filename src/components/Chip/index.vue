<script setup lang="ts">
defineOptions({
  name: 'Chip',
})
const props = withDefaults(
  defineProps<{
    closable?: boolean
  }>(), {

  },
)

const emits = defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="chip inline-block rounded-999 bg-stone-1 px-3 vertical-mid transition-background-color dark-bg-stone-8">
    <div class="content h-8 flex items-center gap-2 text-xs">
      <slot />
      <span
        v-if="props.closable"
        class="closable h-6 w-6 flex-center cursor-pointer rounded-1/2 bg-stone-2 text-sm text-initial transition-background-color -mr-1.5 dark-bg-stone-9 hover-op-70"
        @click="emits('close')"
      >
        <SvgIcon
          name="i-ep:close-bold"
        />
      </span>
    </div>
  </div>
</template>
