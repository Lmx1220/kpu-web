<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    value: string | number | boolean
  }>(),
  {},
)

const visible = computed(() => {
  switch (typeof props.value) {
    case 'string':
      return props.value.length > 0
    case 'number':
      return props.value > 0
    case 'boolean':
      return props.value
    default:
      return props.value !== undefined && props.value !== null
  }
})
const transitionClass = ref({
  enterActiveClass: 'ease-in-out duration-500',
  enterFromClass: 'opacity-0',
  enterToClass: 'opacity-100',
  leaveActiveClass: 'ease-in-out duration-500',
  leaveFromClass: 'opacity-100',
})
</script>

<template>
  <div class="relative inline-flex">
    <slot name="default" />
    <Transition v-bind="transitionClass">
      <template v-if="visible" #default>
        <span
          :class="{ '-indent-9999 w-1.5 h-1.5 px-0! left-[100%]! -translate-x-[50%] before:content-empty before:block before:bg-ui-primary before:w-full before:h-full before:rounded-full before:absolute before:left-0 before:top-0 before:animate-ping': value === true }"
          class="absolute top-0 left-[50%] z-20 -translate-y-[50%] whitespace-nowrap bg-ui-primary text-ui-text ring-1 ring-light dark:ring-dark px-1.5 text-xs rounded-full"
        >
          {{ value }}
        </span>
      </template>
    </Transition>
  </div>
</template>
