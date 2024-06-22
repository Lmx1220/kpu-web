<script setup lang="ts">
defineOptions({
  name: 'ColorfulCard',
})
const props = withDefaults(
  defineProps<{
    colorFrom?: string
    colorTo?: string
    header?: number | string
    num?: number
    tip?: string
    icon?: string
  }>(), {
    colorFrom: '#843cf6',
    colorTo: '#759bff',
    header: '',
    num: 0,
    tip: '',
    icon: '',

  },
)
</script>

<template>
  <div
    class="group relative cursor-pointer of-hidden rounded px-6 py-5 c-white text-shadow-[0_0_2px_#000] transition-shadow hover-shadow-lg"
    :style="{ background: `linear-gradient(50deg, ${props.colorFrom}, ${props.colorTo})` }"
  >
    <div class="text-lg">
      {{ props.header }}
    </div>
    <div class="relative z-1 py-4 text-8">
      {{ props.num }}
    </div>
    <div class="text-sm">
      {{ props.tip }}
    </div>
    <div v-if="props.icon" class="text-sm">
      <SvgIcon
        :name="props.icon"
        :size="120"
        :rotate="20"
        class="transition-all absolute! -right-7 -top-2 group-hover-right-0 group-hover-top-0"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
