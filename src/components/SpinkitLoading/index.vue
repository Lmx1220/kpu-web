<script setup lang="ts">
import 'spinkit/spinkit.min.css'

defineOptions({
  name: 'SpinkitLoading',
})
withDefaults(
  defineProps<{
    type: 'plane' | 'chase' | 'bounce' | 'wave' | 'pulse' | 'flow' | 'swing' | 'circle' | 'circle-fade' | 'grid' | 'fold' | 'wander'
    size: number
    color: string
    text?: any
  }>(), {
    type: 'plane',
    size: 50,
    color: '#fff',
  },
)
</script>

<template>
  <div class="fixed bottom-0 top-0 z-10010 w-full bg-stone-2/75 dark-bg-stone-8/75">
    <div class="absolute left-1/2 top-1/2 flex-col-center gap-4 -translate-x-1/2 -translate-y-1/2">
      <div
        class="flex-center"
        :style="{
          '--sk-size': `${size}px`,
          '--sk-color': color,
        }"
      >
        <div v-if="type === 'plane'" class="sk-plane" />
        <div v-else-if="type === 'chase'" class="sk-chase">
          <div class="sk-chase-dot" />
          <div class="sk-chase-dot" />
          <div class="sk-chase-dot" />
          <div class="sk-chase-dot" />
          <div class="sk-chase-dot" />
          <div class="sk-chase-dot" />
        </div>
        <div v-else-if="type === 'bounce'" class="sk-bounce">
          <div class="sk-bounce-dot" />
          <div class="sk-bounce-dot" />
        </div>
        <div v-else-if="type === 'wave'" class="sk-wave">
          <div class="sk-wave-rect" />
          <div class="sk-wave-rect" />
          <div class="sk-wave-rect" />
          <div class="sk-wave-rect" />
          <div class="sk-wave-rect" />
        </div>
        <div v-else-if="type === 'pulse'" class="sk-pulse" />
        <div v-else-if="type === 'flow'" class="sk-flow">
          <div class="sk-flow-dot" />
          <div class="sk-flow-dot" />
          <div class="sk-flow-dot" />
        </div>
        <div v-else-if="type === 'swing'" class="sk-swing">
          <div class="sk-swing-dot" />
          <div class="sk-swing-dot" />
        </div>
        <div v-else-if="type === 'circle'" class="sk-circle">
          <div class="sk-circle-dot" />
          <div class="sk-circle-dot" />
          <div class="sk-circle-dot" />
          <div class="sk-circle-dot" />
          <div class="sk-circle-dot" />
          <div class="sk-circle-dot" />
          <div class="sk-circle-dot" />
          <div class="sk-circle-dot" />
          <div class="sk-circle-dot" />
          <div class="sk-circle-dot" />
          <div class="sk-circle-dot" />
          <div class="sk-circle-dot" />
        </div>
        <div v-else-if="type === 'circle-fade'" class="sk-circle-fade">
          <div class="sk-circle-fade-dot" />
          <div class="sk-circle-fade-dot" />
          <div class="sk-circle-fade-dot" />
          <div class="sk-circle-fade-dot" />
          <div class="sk-circle-fade-dot" />
          <div class="sk-circle-fade-dot" />
          <div class="sk-circle-fade-dot" />
          <div class="sk-circle-fade-dot" />
          <div class="sk-circle-fade-dot" />
          <div class="sk-circle-fade-dot" />
          <div class="sk-circle-fade-dot" />
          <div class="sk-circle-fade-dot" />
        </div>
        <div v-else-if="type === 'grid'" class="sk-grid">
          <div class="sk-grid-cube" />
          <div class="sk-grid-cube" />
          <div class="sk-grid-cube" />
          <div class="sk-grid-cube" />
          <div class="sk-grid-cube" />
          <div class="sk-grid-cube" />
          <div class="sk-grid-cube" />
          <div class="sk-grid-cube" />
          <div class="sk-grid-cube" />
        </div>
        <div v-else-if="type === 'fold'" class="sk-fold">
          <div class="sk-fold-cube" />
          <div class="sk-fold-cube" />
          <div class="sk-fold-cube" />
          <div class="sk-fold-cube" />
        </div>
        <div v-else-if="type === 'wander'" class="sk-wander">
          <div class="sk-wander-cube" />
          <div class="sk-wander-cube" />
          <div class="sk-wander-cube" />
        </div>
      </div>
      <span v-if="text" class="text-lg" :style="{ color }">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
