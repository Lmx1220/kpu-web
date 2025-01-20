<script lang="ts" setup>
import useKeepAliveStore from '@/store/modules/keepAlive'

defineOptions({
  name: 'TabExampleNested1',
})

const keepAliveStore = useKeepAliveStore()
</script>

<template>
  <div>
    <KPageMain>
      <div>层级：1</div>
      <RouterView v-slot="{ Component }">
        <KeepAlive :include="keepAliveStore.list">
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </KPageMain>
  </div>
</template>
