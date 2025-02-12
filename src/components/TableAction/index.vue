<script lang="ts" setup>
import type { ActionItem, PopConfirm } from './tableAction.ts'
import { isBoolean, isFunction } from '@/utils'
import { computed, toRaw } from 'vue'

const props = withDefaults(
  defineProps<{
    actions?: ActionItem[]
    dropDownActions?: ActionItem[]
    divider?: boolean
  }>(),
  {
    divider: true,
  },
)
const { auth } = useAuth()
// r m
function isIfShow(action: ActionItem): boolean {
  const ifShow = action.ifShow

  let isIfShow = true

  if (isBoolean(ifShow)) {
    isIfShow = ifShow
  }
  if (isFunction(ifShow)) {
    isIfShow = ifShow(action)
  }
  return isIfShow
}

// const { isPermission } = usePermission()
// u
const getActions = computed(() => {
  return (toRaw(props.actions) || [])
    .filter((action) => {
      return auth(action.auth) && isIfShow(action)
    })
    .map((action) => {
      const { popConfirm } = action
      return {
        type: 'link',
        ...action,
        ...(popConfirm || {}),
        onConfirm: popConfirm?.confirm,
        onCancel: popConfirm?.cancel,
        enable: !!popConfirm,
      }
    })
})

const getDropdownList = computed((): any[] => {
  const list = (toRaw(props.dropDownActions) || []).filter((action) => {
    return auth(action.auth) && isIfShow(action)
  })
  return list.map((action, index) => {
    const { label, popConfirm } = action
    if (popConfirm) {
      popConfirm.placement = popConfirm.placement != null ? popConfirm.placement : 'left'
    }
    return {
      ...action,
      ...popConfirm,
      onConfirm: popConfirm?.confirm,
      onCancel: popConfirm?.cancel,
      text: label,
      divider: index < list.length - 1 ? props.divider : false,
    }
  })
})

function getPopconfirm(popConfirm: PopConfirm) {
  const newPopConfirm: any = popConfirm
  delete newPopConfirm.icon
  if (popConfirm.confirm && isFunction(popConfirm.confirm)) {
    newPopConfirm.onConfirm = popConfirm.confirm
    delete newPopConfirm.confirm
  }
  if (popConfirm.cancel && isFunction(popConfirm.cancel)) {
    newPopConfirm.onCancel = popConfirm.cancel
    delete newPopConfirm.cancel
  }
  return newPopConfirm
}
function getButton(actionItem: any) {
  const newActionItem = {
    type: actionItem.type || 'primary',
    ...actionItem,

  }
  delete newActionItem.icon
  return newActionItem
}

function handleMenuClick(e: any) {
  const dropdown = getDropdownList.value[e.key]
  if (dropdown.onClick && isFunction(dropdown.onClick)) {
    dropdown.onClick()
  }
}
</script>

<template>
  <div class="m-table-action">
    <ASpace :size="getActions.some(item => item.type === 'link') ? 0 : 8">
      <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
        <APopconfirm v-if="action.popConfirm" v-bind="getPopconfirm(action.popConfirm)">
          <AButton v-bind="getButton(action)">
            <template v-if="action.label">
              {{ action.label }}
            </template>
            <template #icon>
              <KpuIcon v-if="action.icon" :name="action.icon" />
            </template>
          </AButton>
        </APopconfirm>
        <AButton v-else v-bind="getButton(action)" @click="action.onClick">
          <template v-if="action.label">
            {{ action.label }}
          </template>
          <template #icon>
            <KpuIcon v-if="action.icon" :name="action.icon" />
          </template>
        </AButton>
      </template>
    </ASpace>
    <ADropdown v-if="getDropdownList.length > 0" trigger="hover">
      <slot name="more">
        <AButton type="link" size="small">
          <KpuIcon class="icon-more text-4" name="i-ant-design:more-outlined" />
        </AButton>
      </slot>

      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item
            v-for="(dropdown, index) in getDropdownList"
            :key="index"
            :command="index"
          >
            <APopconfirm v-if="dropdown.popConfirm" v-bind="getPopconfirm(dropdown.popConfirm)">
              <div :class="dropdown.disabled ? 'cursor-not-allowed text-gray-300' : ''">
                <KpuIcon v-if="dropdown.icon" :name="dropdown.icon" />
                <span class="ml-1">{{ dropdown.text }}</span>
              </div>
            </APopconfirm>
            <div v-else :class="dropdown.disabled ? 'cursor-not-allowed text-gray-300' : ''">
              <KpuIcon v-if="dropdown.icon" :name="dropdown.icon" />
              {{ dropdown.label }}
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </ADropdown>
  </div>
</template>

<style scoped>
/* scss */
</style>
