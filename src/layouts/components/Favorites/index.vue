<script setup lang="ts">
import Sortable from 'sortablejs'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import useFavoritesStore from '@/store/modules/favorites'
import { i18nTitleInjectionKey } from '@/layouts/components/Menu/types.ts'

defineOptions({
  name: 'Favorites',
})

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()
const i18nTitle = inject(i18nTitleInjectionKey)!
const favoritesContainer = ref()
watch(() => favoritesContainer.value, (value) => {
  value && new Sortable(favoritesContainer.value, {
    animation: 200,
    ghostClass: 'draggable-ghost',
    draggable: '.draggable-item',
    onUpdate: (event: Sortable.SortableEvent) => {
      if (event.newIndex !== undefined && event.oldIndex !== undefined) {
        favoritesStore.sort(event.newIndex, event.oldIndex)
      }
    },
  })
})
</script>

<template>
  <div class="favorites-container w-80">
    <div class="flex items-center justify-between px-4 py-3">
      <div class="text-sm font-bold">
        我的收藏夹
      </div>
      <template v-if="favoritesStore.canAdd(route.fullPath)">
        <SvgIcon
          v-if="favoritesStore.isAdd(route.fullPath)" class="cursor-pointer text-xl" name="mdi:star-remove"
          title="从收藏夹移除"
          @click="favoritesStore.remove(route.fullPath)"
        />

        <SvgIcon
          v-else class="cursor-pointer text-xl" name="mdi:star-plus-outline" title="添加到收藏夹"
          @click="favoritesStore.add(route)"
        />
      </template>
    </div>
    <OverlayScrollbarsComponent
      v-if="favoritesStore.list.length > 0"
      :options=" {
        scrollbars: {
          autoHide: 'leave',
          autoHideDelay: 300,
        },
      }"
      class="max-h-220px" defer
    >
      <div ref="favoritesContainer" class="flex flex-wrap items-center justify-between gap-2 px-4 pb-4">
        <div
          v-for="favorites in favoritesStore.list" :key="favorites.fullPath"
          class="draggable-item relative w-[calc(50%-0.25rem)] flex cursor-pointer items-center gap-1 rounded px-2 py-2 ring-1 ring-stone-3 ring-inset hover:bg-stone-1 dark-ring-stone-7 dark-hover:bg-dark/50"
          :title="i18nTitle(favorites.title)"
          @click="router.push(favorites.fullPath)"
        >
          <SvgIcon :name="favorites.icon ?? ''" :size="18" />
          <div class="name flex-1 truncate pe-4">
            {{ favorites.icon }}
            {{ i18nTitle(favorites.title) }}
          </div>
          <SvgIcon
            :size="14"
            class="right-1 h-5 w-6 rounded-full text-stone-3 !absolute dark-text-stone-7 hover:text-stone-7 dark-hover:text-stone-3" name="ep:delete" @click.stop="favoritesStore.remove(favorites.fullPath)"
          />
        </div>
      </div>
    </OverlayScrollbarsComponent>
    <div v-else flex="center col" py-6 text-stone-5>
      <SvgIcon :size="40" name="i-tabler:mood-empty" />
      <p m-2 text-base>
        收藏夹是空的
      </p>
      <p v-show="favoritesStore.canAdd(route.fullPath)" m-0 flex-center text-sm op-75>
        点击右上角
        <SvgIcon :size="20" name="mdi:star-plus-outline" mx-1 text-stone-6 dark-text-stone-4 />
        将当前页面添加到收藏夹
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
[data-overlayscrollbars-viewport] {
  overscroll-behavior: contain;
}

.draggable-ghost {
  opacity: 0;
}

.name {
  mask-image: linear-gradient(to right, #000 calc(100% - 80px), transparent);
}
</style>
