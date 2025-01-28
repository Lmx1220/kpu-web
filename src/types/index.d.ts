export type * from './config'
export type * from './helper'

export type ClassType = Array<object | string> | object | string

export type LabelValueOptions = {
  label: string
  value: any
  [key: string]: string | number | boolean
}[]

export type TargetContext = '_self' | '_blank'
