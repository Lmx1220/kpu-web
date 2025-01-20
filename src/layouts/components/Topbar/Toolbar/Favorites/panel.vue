<script setup lang="ts">
import useFavoritesStore from '@/store/modules/favorites'
import Sortable from 'sortablejs'

defineOptions({
  name: 'FavoritesPanel',
})

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()
const { t } = useI18n()
const { generateI18nTitle } = useMenu()

const favoritesContainerRef = ref()

// let favoritesSortable: Sortable
watch(() => favoritesContainerRef.value, (val) => {
  if (val) {
    // eslint-disable-next-line no-new
    new Sortable(favoritesContainerRef.value, {
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
        {{ t('app.favorites.title') }}
      </div>
      <template v-if="favoritesStore.canAdd(route.fullPath)">
        <SvgIcon v-if="!favoritesStore.isAdd(route.fullPath)" class="cursor-pointer text-xl" name="i-mdi:star-plus-outline" :title="t('app.favorites.add')" @click="favoritesStore.add(route)" />
        <SvgIcon v-else class="cursor-pointer text-xl" name="i-mdi:star-remove" :title="t('app.favorites.remove')" @click="favoritesStore.remove(route.fullPath)" />
      </template>
    </div>
    <KScrollArea class="max-h-220px">
      <div v-if="favoritesStore.list.length > 0" ref="favoritesContainerRef" class="flex flex-wrap items-center justify-between gap-2 px-4 pb-4">
        <div
          v-for="item in favoritesStore.list" :key="item.fullPath" :title="generateI18nTitle(item.title)"
          class="group draggable-item relative w-[calc(50%-0.25rem)] flex cursor-pointer items-center gap-1 rounded-lg px-2 py-2 ring-1 ring-border ring-inset hover-bg-accent" @click="router.push(item.fullPath)"
        >
          <SvgIcon v-if="item.icon" :name="item.icon" :size="18" />
          <div class="flex-1 truncate pe-4 text-sm group-hover:[mask-image:linear-gradient(90deg,#000_calc(100%-80px),transparent)]">
            {{ generateI18nTitle(item.title) }}
          </div>
          <div class="absolute right-2 h-5 w-5 rounded-full text-secondary-foreground hidden group-hover:flex-center hover:bg-secondary hover:ring-1">
            <SvgIcon name="i-ep:delete" :size="14" @click.stop="favoritesStore.remove(item.fullPath)" />
          </div>
        </div>
      </div>
      <div v-else class="flex-col-center py-6 text-secondary-foreground">
        <SvgIcon name="i-tabler:mood-empty" :size="40" />
        <p class="m-2 text-base">
          {{ t('app.favorites.empty') }}
        </p>
        <p v-show="favoritesStore.canAdd(route.fullPath)" class="m-0 flex-center text-sm op-75">
          {{ t('app.favorites.addToFavorites') }}
          <SvgIcon name="i-mdi:star-plus-outline" :size="20" class="mx-1 text-secondary-foreground" />
          {{ t('app.favorites.addCurrentPage') }}
        </p>
      </div>
    </KScrollArea>
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
