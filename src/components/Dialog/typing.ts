import type { ButtonProps } from 'element-plus'
import type { CSSProperties, ComputedRef, VNodeChild } from 'vue'

export interface DialogMethods {
  setDialogProps: (props: Partial<DialogProps>) => void
  emitVisible?: (visible: boolean, uid: number) => void
  redoDialogHeight?: () => void
}

export type RegisterFn = (dialogMethods: DialogMethods, uuid: string) => void

export interface ReturnMethods extends DialogMethods {
  openDialog: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void
  closeDialog: () => void
  getVisible?: ComputedRef<boolean>
}

export type UseDialogReturnType = [RegisterFn, ReturnMethods]

export interface ReturnInnerMethods extends DialogMethods {
  closeDialog: () => void
  changeLoading: (loading: boolean) => void
  changeOkLoading: (loading: boolean) => void
  getVisible?: ComputedRef<boolean>
  redoDialogHeight: () => void
}

export type UseDialogInnerReturnType = [RegisterFn, ReturnInnerMethods]

export interface DialogProps {
  minHeight?: number
  height?: number
  // 启用wrapper后 底部可以适当增加高度
  wrapperFooterOffset?: number
  draggable?: boolean
  scrollTop?: boolean

  // 是否可以进行全屏
  canFullscreen?: boolean
  defaultFullscreen?: boolean
  visible?: boolean
  // 温馨提醒信息
  helpMessage: string | string[]

  // 是否使用dialogWrapper
  useWrapper: boolean

  loading: boolean
  loadingTip?: string

  wrapperProps: Omit<DialogWrapperProps, 'loading'>

  showOkBtn: boolean
  showCancelBtn: boolean
  closeFunc: () => Promise<any>

  /**
     * Specify a function that will be called when dialog is closed completely.
     * @type Function
     */
  afterClose?: () => any

  /**
     * Body style for dialog body element. Such as height, padding etc.
     * @default {}
     * @type object
     */
  bodyStyle?: CSSProperties

  /**
     * Text of the Cancel button
     * @default 'cancel'
     * @type string
     */
  cancelText?: string

  /**
     * Centered Dialog
     * @default false
     * @type boolean
     */
  centered?: boolean

  /**
     * Whether a close (x) button is visible on top right of the dialog or not
     * @default true
     * @type boolean
     */
  closable?: boolean
  /**
     * Whether a close (x) button is visible on top right of the dialog or not
     */
  // closeIcon?: VNodeChild | JSX.Element

  /**
     * Whether to apply loading visual effect for OK button or not
     * @default false
     * @type boolean
     */
  confirmLoading?: boolean

  /**
     * Whether to unmount child components on onClose
     * @default false
     * @type boolean
     */
  destroyOnClose?: boolean

  /**
     * Footer content, set as :footer="null" when you don't need default buttons
     * @default OK and Cancel buttons
     * @type any (string | slot)
     */
  footer?: VNodeChild | JSX.Element

  /**
     * Return the mount node for Dialog
     * @default () => document. Body
     * @type Function
     */
  getContainer?: (instance: any) => HTMLElement

  /**
     * Whether show mask or not.
     * @default true
     * @type boolean
     */
  mask?: boolean

  /**
     * Whether to close the dialog when the mask (area outside the dialog) is clicked
     * @default true
     * @type boolean
     */
  closeOnClickModal?: boolean

  /**
     * Style for dialog's mask element.
     * @default {}
     * @type object
     */
  maskStyle?: CSSProperties

  /**
     * Text of the OK button
     * @default 'OK'
     * @type string
     */
  okText?: string

  /**
     * Button type of the OK button
     * @default 'primary'
     * @type string
     */
  okType?: 'primary' | 'danger' | 'dashed' | 'ghost' | 'default'

  /**
     * The ok button props, follow jsx rules
     * @type object
     */
  okButtonProps?: Partial<ButtonProps>

  /**
     * The cancel button props, follow jsx rules
     * @type object
     */
  cancelButtonProps?: Partial<ButtonProps>

  /**
     * The dialog's title
     * @type any (string | slot)
     */
  title?: string | VNodeChild | JSX.Element

  /**
     * Width of the dialog
     * @default 520
     * @type string | number
     */
  width?: string | number
  /**
     * The z-index of the Dialog
     * @default 1000
     * @type number
     */
  zIndex?: number
}

export interface DialogWrapperProps {
  footerOffset?: number
  loading: boolean
  dialogHeaderHeight: number
  dialogFooterHeight: number
  minHeight: number
  height: number
  visible: boolean
  fullscreen: boolean
  useWrapper: boolean
}
