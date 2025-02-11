<script lang="ts" setup>
import type { ActionItem, PopConfirm } from './tableAction.ts'
import { isBoolean, isFunction } from '@/utils'
import { computed, toRaw } from 'vue'
// import { usePermission } from '/@/hooks/web/usePermission'

const props = withDefaults(
  defineProps<{
    actions?: ActionItem[]
    dropDownActions?: ActionItem[]
    divider?: boolean
  }>(),
  {
    // actions: null,
    // dropDownActions: null,
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
        // type: 'primary',
        link: action.link || true,
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
  // newPopConfirm.teleported = false
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
function getButton(actionItem: ActionItem) {
  const newActionItem = {
    type: actionItem.type || 'primary',
    ...actionItem,

  }
  delete newActionItem.icon
  return newActionItem
}

function onCellClick(command: number) {
  const dropdown = getDropdownList.value[command]
  if (dropdown.onClick && isFunction(dropdown.onClick)) {
    dropdown.onClick()
  }
}
</script>

<template>
  <div class="m-table-action">
    <el-space wrap>
      <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
        <ElPopconfirm v-if="action.popConfirm" v-bind="getPopconfirm(action.popConfirm)">
          <template #reference>
            <ElButton>
              <template v-if="action.label">
                {{ action.label }}
              </template>
              <KpuIcon v-if="action.icon" :name="action.icon" />
            </ElButton>
          </template>
        </ElPopconfirm>
        <ElButton v-else v-bind="getButton(action)" @click="action.onClick">
          <template v-if="action.label">
            {{ action.label }}
          </template>
          <KpuIcon v-if="action.icon" :name="action.icon" />
        </ElButton>
      </template>
    </el-space>
    <el-dropdown v-if="getDropdownList.length > 0" trigger="click" :hide-on-click="false" @command="onCellClick">
      <template #default>
        <slot name="more">
          <span class="el-dropdown-link">
            <KpuIcon class="icon-more text-4" name="i-ant-design:more-outlined" />
          </span>
        </slot>
      </template>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(dropdown, index) in getDropdownList"
            :key="index"
            :command="index"
          >
            <ElPopconfirm v-if="dropdown.popConfirm" v-bind="getPopconfirm(dropdown.popConfirm)">
              <template #reference>
                <div :class="dropdown.disabled ? 'cursor-not-allowed text-gray-300' : ''">
                  <KpuIcon v-if="dropdown.icon" :name="dropdown.icon" />
                  <span class="ml-1">{{ dropdown.text }}</span>
                </div>
              </template>
            </ElPopconfirm>
            <div v-else :class="dropdown.disabled ? 'cursor-not-allowed text-gray-300' : ''">
              <KpuIcon v-if="dropdown.icon" :name="dropdown.icon" />
              {{ dropdown.label }}
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.m-table-action {
  display: flex;
  align-items: center;

  .action-divider {
    display: table;
  }

  &.left {
    justify-content: flex-start;
  }

  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-end;
  }

  button {
    display: flex;
    align-items: center;

    span {
      margin-left: 0 !important;
    }
  }

  button.ant-btn-circle {
    span {
      margin: auto !important;
    }
  }

  .ant-divider,
  .ant-divider-vertical {
    margin: 0 2px;
  }
}
</style>
