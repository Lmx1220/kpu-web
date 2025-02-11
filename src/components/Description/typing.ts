// import type { CollapseContainerOptions } from '@/components/Container/index'
// import type { DescriptionProps as DescriptionsProps } from 'element-plus'
import type { CSSProperties, VNode } from 'vue'

export interface DescItem {
  labelMinWidth?: number
  contentMinWidth?: number
  labelStyle?: CSSProperties
  field: string
  label?: string
  // Merge column
  span?: number
  show?: (...arg: any) => boolean
  component?: any
  componentProps?: Recordable
  // render
  render?: (
    val: any,
    data: Recordable,
  ) => VNode | undefined | JSX.Element | Element | string | number
}

// export interface DescriptionProps extends DescriptionsProps {
export interface DescriptionProps {
  // Whether to include the collapse component
  useCollapse?: boolean

  field: string
  label?: string
  /**
   * item configuration
   * @type DescItem
   */
  children: DescItem[]
  /**
   * 数据
   * @type object
   */
  // data: Recordable
  /**
   * Built-in CollapseContainer component configuration
   * @type CollapseContainerOptions
   */
  // collapseOptions?: CollapseContainerOptions
}

export interface DescInstance {
  setDescProps: (descProps: Partial<DescriptionProps>) => void
}

export type Register = (descInstance: DescInstance) => void

/**
 * @description:
 */
export type UseDescReturnType = [Register, DescInstance]
