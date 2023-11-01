<template>
  <VDropdown :delay="200" :popper-triggers="['hover']" :triggers="['hover']" v-bind="$attrs">
    <slot />
    <template #popper>
      <slot name="dropdown" />
    </template>
  </VDropdown>
</template>
