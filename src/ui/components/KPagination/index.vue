<script setup lang="ts">
import { Pagination, PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem, PaginationNext, PaginationPrev } from './pagination'

defineOptions({
  name: 'KPagination',
})

defineProps<{
  // page?: number
  size?: number
  total?: number
}>()
// pageChange
// const slots = defineSlots<{
//   title?: () => VNode
//   description?: () => VNode
//   default?: () => VNode
// }>()
const emits = defineEmits(['pageChange'])
const page = defineModel<number>()
</script>

<template>
  <Pagination :total="total" :sibling-count="1" show-edges :default-page="page" :items-per-page="size" @update:page="(page1:number) => emits('pageChange', page1)">
    <template #default="{ page: currentPage }">
      <PaginationList v-slot="{ items }" class="flex-center gap-1">
        <PaginationFirst class="h-8 w-8 p-0" />
        <PaginationPrev class="h-8 w-8 p-0" />
        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <KButton
              :variant="item.value === currentPage ? 'default' : 'outline'"
              class="h-8 w-8 p-0"
            >
              {{ item.value }}
            </KButton>
          </PaginationListItem>
          <PaginationEllipsis
            v-else
            :key="item.type"
            :index="index"
            class="size-5"
          />
        </template>
        <PaginationNext class="h-8 w-8 p-0" />
        <PaginationLast class="h-8 w-8 p-0" />
      </PaginationList>
    </template>
  </Pagination>
</template>
