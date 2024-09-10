<script setup lang="ts">
import Sortable from 'sortablejs'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import useFavoritesStore from '@/store/modules/favorites'

defineOptions({
  name: 'FavoritesPanel',
})

const route = useRoute()
const appWindow = useWindow()
const favoritesStore = useFavoritesStore()

const { generateI18nTitle } = useMenu()

const favoritesContainerRef = ref()

// eslint-disable-next-line unused-imports/no-unused-vars
let favoritesSortable: Sortable
watch(() => favoritesContainerRef.value, (val) => {
  if (val) {
    favoritesSortable = new Sortable(favoritesContainerRef.value, {
      animation: 200,
      ghostClass: 'draggable-ghost',
      draggable: '.draggable-item',
      onUpdate: (e) => {
        if (e.newIndex !== undefined && e.oldIndex !== undefined) {
          favoritesStore.sort(e.newIndex, e.oldIndex)
        }
      },
    })
  }
})
</script>

<template>
  <div class="favorites-container w-80">
    <div class="flex items-center justify-between px-4 py-3">
      <div class="text-sm font-bold">
        我的收藏夹
      </div>
    </div>
    <OverlayScrollbarsComponent :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }" defer class="max-h-220px">
      <div v-if="favoritesStore.list.length > 0" ref="favoritesContainerRef" class="flex flex-wrap items-center justify-between gap-2 px-4 pb-4">
        <div
          v-for="item in favoritesStore.list" :key="item.windowName" :title="generateI18nTitle(item.title)" class="draggable-item relative w-[calc(50%-0.25rem)] flex cursor-pointer items-center gap-1 rounded px-2 py-2 ring-1 ring-stone-3 ring-inset hover-bg-stone-1 dark-ring-stone-7 dark-hover-bg-dark/50"
          @click="appWindow.add(item.windowName)"
        >
          <!--          <SvgIcon v-if="item.icon" :name="item.icon" :size="18" /> -->
          <div class="name flex-1 truncate pe-4">
            {{ generateI18nTitle(item.title) }}
          </div>
          <div class="right-1 h-5 w-6 rounded-full text-stone-3 !absolute dark-text-stone-7 hover-text-stone-7 dark-hover-text-stone-3">
            <SvgIcon name="i-ep:delete" :size="14" @click.stop="favoritesStore.remove(item.windowName)" />
          </div>
        </div>
      </div>
      <div v-else flex="center col" py-6 text-stone-5>
        <SvgIcon name="i-tabler:mood-empty" :size="40" />
        <p m-2 text-base>
          收藏夹是空的
        </p>
        <p v-show="favoritesStore.canAdd(route.fullPath)" m-0 flex-center text-sm op-75>
          点击右上角
          <SvgIcon name="i-mdi:star-plus-outline" :size="20" mx-1 text-stone-6 dark-text-stone-4 />
          将当前页面添加到收藏夹
        </p>
      </div>
    </OverlayScrollbarsComponent>
  </div>
</template>

<style scoped>
.draggable-ghost {
  opacity: 0;
}

.name {
  mask-image: linear-gradient(to right, #000 calc(100% - 80px), transparent);
}
</style>
