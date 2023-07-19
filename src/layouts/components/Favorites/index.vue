<script setup lang="ts">
import Sortable from 'sortablejs'
import useFavoritesStore from '@/store/modules/favorites'

defineOptions({
  name: 'Favorites',
})

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()
const { generateI18nTitle } = useI18nTitle()
const favoritesContainer = ref()
const isDragging = ref(false)
watch(() => favoritesContainer.value, (value) => {
  value && new Sortable(favoritesContainer.value.$el, {
    animation: 200,
    ghostClass: 'ghost',
    draggable: '.item',
    onStart: () => {
      isDragging.value = true
    },
    onEnd: () => {
      isDragging.value = false
    },
    onUpdate: (e: Sortable.SortableEvent) => {
      if (e.newIndex && e.oldIndex) {
        favoritesStore.sort(e.newIndex, e.oldIndex)
      }
    },
  })
})
</script>

<template>
  <div class="favorites-container">
    <div class="title-bar">
      <div class="title">
        我的收藏夹
      </div>
      <div v-show="favoritesStore.canAdd(route.fullPath)" class="icons">
        <svg-icon
          v-if="favoritesStore.isAdd(route.fullPath)" name="i-mdi:star-remove" title="从收藏夹移除"
          @click="favoritesStore.remove(route.fullPath)"
        />
        <svg-icon v-else name="i-mdi:star-plus-outline" title="添加到收藏夹" @click="favoritesStore.add(route)" />
      </div>
    </div>
    <el-scrollbar v-if="favoritesStore.list.length > 0" :max-height="300">
      <TransitionGroup
        ref="favoritesContainer" :name="isDragging ? '' : 'dropdown-tab'" tag="div" class="list"
        :class="{ dragging: isDragging }"
      >
        <div
          v-for="favorites in favoritesStore.list" :key="favorites.fullPath" class="item"
          :title="generateI18nTitle(favorites.i18n, favorites.title)"
          @click="router.push(favorites.fullPath)"
        >
          <svg-icon :name="favorites.icon ?? ''" />
          <el-text class="name" truncated>
            {{ generateI18nTitle(favorites.i18n, favorites.title) }}
          </el-text>
          <svg-icon class="delete" name="i-ep:delete" @click.stop="favoritesStore.remove(route.fullPath)" />
        </div>
      </TransitionGroup>
    </el-scrollbar>
    <div v-else class="empty">
      <svg-icon name="i-tabler:mood-empty" />
      <ElText>
        收藏夹是空的
      </ElText>
      <ElText v-show="favoritesStore.canAdd(route.fullPath)" class="tips">
        点击右上角
        <svg-icon name="i-mdi:star-plus-outline" />
        将当前页面添加到收藏夹
      </ElText>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.favorites-container {
  width: 300px;

  .el-scrollbar__wrap {
    width: 100%;
    overscroll-behavior: contain;
  }

  .title-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 12px;
    margin-bottom: -6px;

    .title {
      font-size: 14px;
      font-weight: 700;
    }

    .icons {
      display: flex;
      align-items: center;

      .icon {
        font-size: 20px;
        cursor: pointer;
      }
    }

  }

  :deep(.el-scrollbar__wrap) {
    width: 100%;
    overscroll-behavior: contain
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 12px;
    margin-bottom: 6px;

    .item {
      position: relative;
      width: calc(50% - 6px);
      height: 36px;
      padding: 0 8px;
      margin: 5px 0;
      display: flex;
      align-items: center;
      border: 1px solid var(--el-border-color);
      border-radius: 4px;
      background-color: var(--el-bg-color);
      cursor: pointer;
      transition: var(--el-transition-color), var(--el-transition-border);

      &:hover {
        border: 1px solid var(--el-color-primary);
      }

      &.ghost {
        opacity: 0;
      }

      * {
        user-select: none;
      }

      .icon {
        font-size: 18px;
      }

      .name {
        flex: 1;
        margin: 0 16px 0 8px;
        color: var(--el-text-color-primary);
        mask-image: linear-gradient(to right, #000 calc(100% - 20px), transparent);
      }

      .delete {
        position: absolute;
        right: 5px;
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        font-size: 14px;
        color: var(--el-text-color-disabled);
        transition: var(--el-transition-color), background-color .3s;

        &:hover {
          color: var(--el-text-color-primary);
          background-color: var(--el-fill-color);
        }
      }

    }
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    color: var(--el-text-color-placeholder);

    .icon {
      font-size: 40px;
    }

    .el-text {
      margin-top: 10px;
      display: flex;
      align-items: center;
      color: var(--el-text-color-placeholder);

      &.tips {
        color: var(--el-text-color-disabled);
      }

      .icon {
        margin: 0 4px;
        font-size: 18px;
        color: var(--el-text-color-primary);
      }
    }
  }
}
</style>
