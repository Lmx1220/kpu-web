<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'ColorScheme',
})

const settingsStore = useSettingsStore()

function toggleColorScheme(event: MouseEvent) {
  const { startViewTransition } = useViewTransition(() => {
    settingsStore.currentColorScheme && settingsStore.setColorScheme(settingsStore.currentColorScheme === 'dark' ? 'light' : 'dark')
  })
  startViewTransition()?.ready.then(() => {
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: settingsStore.settings.app.colorScheme !== 'dark' ? clipPath : clipPath.reverse(),
      },
      {
        duration: 300,
        easing: 'ease-out',
        pseudoElement: settingsStore.settings.app.colorScheme !== 'dark' ? '::view-transition-new(root)' : '::view-transition-old(root)',
      },
    )
  })
}
</script>

<template>
  <KPopover class="min-w-auto flex-center cursor-pointer px-2 py-1">
    <KButton variant="ghost" size="icon" @click="toggleColorScheme">
      <SvgIcon
        :name="{
          'light': 'i-ri:sun-line',
          'dark': 'i-ri:moon-line',
          '': 'i-codicon:color-mode',
        }[settingsStore.settings.app.colorScheme]" :size="16"
      />
    </KButton>
    <template #panel>
      <KTabs
        v-model="settingsStore.settings.app.colorScheme"
        :list="[
          { icon: 'i-ri:sun-line', label: '', value: 'light' },
          { icon: 'i-ri:moon-line', label: '', value: 'dark' },
          { icon: 'i-codicon:color-mode', label: '', value: '' },
        ]"
        class="h-full"
      />
    </template>
  </KPopover>
</template>
