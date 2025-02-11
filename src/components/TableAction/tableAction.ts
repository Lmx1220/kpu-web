import type { AnyNormalFunction } from '#/index'
// import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes'
// import type { TooltipProps } from 'ant-design-vue/es/tooltip/Tooltip'

import type { ElButton } from 'element-plus'

type ElButtonProps = ExtractPropTypes<typeof ElButton.props>
export interface ActionItem extends ElButtonProps {
  onClick?: AnyNormalFunction
  label?: string
  color?: 'success' | 'error' | 'warning'
  icon?: string
  popConfirm?: PopConfirm
  disabled?: boolean
  divider?: boolean
  // 权限编码控制是否显示
  auth?: string | string[]
  // authMode?: PermModeEnum
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean)
  // tooltip?: string | TooltipProps
}

export interface PopConfirm {
  title: string
  confirmButtonText?: string
  cancelButtonText?: string
  confirm: AnyNormalFunction
  cancel?: AnyNormalFunction
  icon?: string
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
    | 'bottomLeft'
    | 'bottomRight'
}
