import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { isArray, isObject, isString } from './is.ts'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function classNames(...args: any[]): string {
  const classes = []
  for (let i = 0; i < args.length; i++) {
    const value = args[i]
    if (!value) {
      continue
    }
    if (isString(value)) {
      classes.push(value)
    }
    else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const inner: any = classNames(value[i])
        if (inner) {
          classes.push(inner)
        }
      }
    }
    else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          classes.push(name)
        }
      }
    }
  }
  return classes.join(' ')
}

export default classNames

// eslint-disable-next-line import/no-mutable-exports
export let defaultNamespace = 'y1'
const statePrefix = 'is-'

export function setDefaultNamespace(val: string) {
  defaultNamespace = val
}

function _bem(namespace: string, block: string, blockSuffix: string, element: string, modifier: string) {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export const namespaceContextKey: InjectionKey<Ref<string | undefined>> = Symbol('namespaceContextKey')

export function useGetDerivedNamespace(namespaceOverrides?: Ref<string | undefined>) {
  const derivedNamespace
    = namespaceOverrides
    || (getCurrentInstance() ? inject(namespaceContextKey, ref(defaultNamespace)) : ref(defaultNamespace))
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace
  })
  return namespace
}

export function useNamespace(block: string, namespaceOverrides?: Ref<string | undefined>) {
  const namespace = useGetDerivedNamespace(namespaceOverrides)
  const b = (blockSuffix = '') => _bem(namespace.value, block, blockSuffix, '', '')
  const e = (element?: string) => (element ? _bem(namespace.value, block, '', element, '') : '')
  const m = (modifier?: string) => (modifier ? _bem(namespace.value, block, '', '', modifier) : '')
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, '') : ''
  const em = (element?: string, modifier?: string) =>
    element && modifier ? _bem(namespace.value, block, '', element, modifier) : ''
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, '', modifier) : ''
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : ''
  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  // for css var
  // --el-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key]
      }
    }
    return styles
  }
  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key]
      }
    }
    return styles
  }

  const cssVarName = (name: string) => `--${namespace.value}-${name}`
  const cssVarBlockName = (name: string) => `--${namespace.value}-${block}-${name}`

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  }
}

export type UseNamespaceReturn = ReturnType<typeof useNamespace>